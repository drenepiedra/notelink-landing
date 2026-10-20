#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const blogFile = resolve(root, 'blog.json');
const repo = 'https://github.com/drenepiedra/noteLink';
const COMMIT_LIMIT = 80;

const candidates = [process.env.REPO_PATH, resolve(root, '..', 'noteLink')].filter(Boolean);
const source = candidates.find((path) => existsSync(resolve(path, '.git')));

if (!source) {
  console.error('Could not find the noteLink git repository. Set REPO_PATH to its checkout.');
  process.exit(1);
}

const raw = execFileSync(
  'git',
  ['log', '--no-merges', `-n`, String(COMMIT_LIMIT), '--pretty=format:%H%x1f%aI%x1f%s%x1f%b%x1e'],
  { cwd: source, encoding: 'utf8' }
);

const existing = existsSync(blogFile) ? JSON.parse(readFileSync(blogFile, 'utf8')) : { posts: [] };
const known = new Map((existing.posts || []).map((post) => [post.sha, post]));

const prefixes = /^(feat|fix|chore|docs|style|refactor|perf|test|build|ci|revert)(\([^)]*\))?!?:\s*/i;

function tagFor(text) {
  const value = text.toLowerCase();
  if (/(revenuecat|google play|pago|purchase|paywall|suscrip|billing|checkout)/.test(value)) return 'pago';
  if (/(fix|arregl|correc|bug|error)/.test(value)) return 'fix';
  if (/(ui|ux|dise|design|estilo|style|animac|colaps|zoom|layout)/.test(value)) return 'ui';
  return 'novedad';
}

function titleFor(subject) {
  const clean = subject.replace(prefixes, '').trim();
  if (!clean) return 'Nuevo cambio';
  return clean.charAt(0).toUpperCase() + clean.slice(1);
}

let added = 0;
const posts = [];
const seen = new Set();

for (const chunk of raw.split('\x1e')) {
  const [sha, date, subject, body] = chunk.trim().split('\x1f');
  if (!sha || !date || !subject) continue;
  if (/^chore: update blog/i.test(subject)) continue;
  if (known.has(sha)) {
    posts.push(known.get(sha));
    seen.add(sha);
    continue;
  }
  const title = titleFor(subject);
  const text = (body || '').trim();
  posts.push({
    sha,
    date,
    tag: tagFor(`${subject} ${text}`),
    url: `${repo}/commit/${sha}`,
    es: { title, ...(text ? { body: text } : {}) },
    en: { title, ...(text ? { body: text } : {}) },
    auto: true
  });
  seen.add(sha);
  added += 1;
}

for (const post of existing.posts || []) {
  if (!seen.has(post.sha)) posts.push(post);
}

posts.sort((a, b) => new Date(b.date) - new Date(a.date));

if (existing.repo === repo && JSON.stringify(existing.posts || []) === JSON.stringify(posts)) {
  console.log('blog.json is already up to date.');
  process.exit(0);
}

writeFileSync(
  blogFile,
  `${JSON.stringify({ repo, updatedAt: new Date().toISOString(), posts }, null, 2)}\n`,
  'utf8'
);

console.log(`blog.json updated: ${posts.length} posts (${added} new from git).`);
