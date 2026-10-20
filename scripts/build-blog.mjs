#!/usr/bin/env node
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const blogFile = resolve(root, 'blog.json');
const repo = 'https://github.com/drenepiedra/noteLink';
const apiRepo = 'drenepiedra/noteLink';
const COMMIT_LIMIT = 80;

const headers = {
  accept: 'application/vnd.github+json',
  'user-agent': 'notelink-blog-builder'
};
if (process.env.GITHUB_TOKEN) headers.authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

const response = await fetch(
  `https://api.github.com/repos/${apiRepo}/commits?per_page=${COMMIT_LIMIT}`,
  { headers }
);

if (!response.ok) {
  console.error(`GitHub API error: ${response.status} ${response.statusText}`);
  process.exit(1);
}

const commits = await response.json();

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

for (const commit of commits) {
  if (!commit || !commit.sha) continue;
  if ((commit.parents || []).length > 1) continue;

  const message = (commit.commit && commit.commit.message) || '';
  const lines = message.split('\n');
  const subject = (lines.shift() || '').trim();
  const text = lines.join('\n').trim();
  const date = commit.commit && commit.commit.author ? commit.commit.author.date : undefined;

  if (!subject || !date) continue;
  if (/^chore: update blog/i.test(subject)) continue;

  if (known.has(commit.sha)) {
    posts.push(known.get(commit.sha));
    seen.add(commit.sha);
    continue;
  }

  const title = titleFor(subject);
  posts.push({
    sha: commit.sha,
    date,
    tag: tagFor(`${subject} ${text}`),
    url: `${repo}/commit/${commit.sha}`,
    es: { title, ...(text ? { body: text } : {}) },
    en: { title, ...(text ? { body: text } : {}) },
    auto: true
  });
  seen.add(commit.sha);
  added += 1;
}

for (const post of existing.posts || []) {
  if (!seen.has(post.sha)) posts.push(post);
}

posts.sort((a, b) => new Date(b.date) - new Date(a.date));

writeFileSync(
  blogFile,
  `${JSON.stringify({ repo, updatedAt: new Date().toISOString(), posts }, null, 2)}\n`,
  'utf8'
);

console.log(`blog.json updated: ${posts.length} posts (${added} new from GitHub).`);
