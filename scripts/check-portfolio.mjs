import { readFileSync, existsSync } from 'node:fs';
import assert from 'node:assert/strict';
import { JSDOM, VirtualConsole } from 'jsdom';
import { skillGroups, totalSkills } from '../src/data/skills.js';

const index = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');
const bundlePath = index.match(/<script[^>]+src="([^"]+)"/)[1];
const code = readFileSync(new URL(`../dist${bundlePath.replace("/madnikumboh-portfolio", "")}`, import.meta.url), 'utf8');
const errors = [];
const virtualConsole = new VirtualConsole();
virtualConsole.on('jsdomError', error => errors.push(error.message));
const dom = new JSDOM(index, { url: 'https://portfolio.test/madnikumboh-portfolio/#/', runScripts: 'outside-only', pretendToBeVisual: true, virtualConsole });
const { window } = dom;
const { document } = window;
let scrollPosition = 0;
let emailDraft = '';
const savedFiles = [];
const blobFiles = new Map();
const ids = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
Object.defineProperty(window, 'scrollY', { get: () => scrollPosition });
Object.defineProperty(window, 'innerHeight', { value: 800 });
Object.defineProperty(document.documentElement, 'scrollHeight', { get: () => 6100 });
window.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} });
window.HTMLElement.prototype.getBoundingClientRect = function () {
  const start = Math.max(0, ids.indexOf(this.id)) * 1000;
  return { top: start - scrollPosition, bottom: start + 1000 - scrollPosition, left: 0, right: 1000, width: 1000, height: 1000 };
};
window.HTMLElement.prototype.scrollIntoView = function () {
  scrollPosition = Math.max(0, ids.indexOf(this.id) * 1000 - 80);
  window.dispatchEvent(new window.Event('scroll'));
};
window.HTMLDialogElement.prototype.showModal = function () { this.setAttribute('open', ''); };
window.HTMLDialogElement.prototype.close = function () { this.removeAttribute('open'); this.dispatchEvent(new window.Event('close')); };
window.URL.createObjectURL = blob => { const url = `blob:https://portfolio.test/resume-${blobFiles.size + 1}`; blobFiles.set(url, blob); return url; };
window.URL.revokeObjectURL = url => blobFiles.delete(url);
window.HTMLAnchorElement.prototype.click = function () {
  if (this.href.startsWith('mailto:')) { emailDraft = this.href; return; }
  if (this.href.startsWith('blob:')) { savedFiles.push({ name: this.download, blob: blobFiles.get(this.href) }); return; }
  this.dispatchEvent(new window.MouseEvent('click', { bubbles: true, cancelable: true, button: 0 }));
};
window.addEventListener('error', event => errors.push(event.error?.stack || event.message));
const waitFor = async (check, message) => {
  for (let attempt = 0; attempt < 60; attempt++) { if (check()) return; await new Promise(resolve => setTimeout(resolve, 15)); }
  assert.ok(check(), message);
};
const click = element => { assert.ok(element, 'Click target exists'); element.dispatchEvent(new window.MouseEvent('click', { bubbles: true, cancelable: true })); };
const button = (selector, text) => [...document.querySelectorAll(selector)].find(element => element.textContent.trim() === text);
window.eval(code);
await waitFor(() => document.querySelectorAll('section.portfolio-section').length === 6, 'React renders all sections');

assert.deepEqual([...document.querySelectorAll('section.portfolio-section')].map(element => element.id), ids);
assert.equal(document.querySelectorAll('section.portfolio-section[hidden]').length, 0);
assert.equal(document.querySelectorAll('h1').length, 1);
assert.equal(document.querySelectorAll('.project-card').length, 7);
for (const link of document.querySelectorAll('a[href^="#"]')) assert.ok(document.getElementById(link.hash.slice(1)), `Anchor target ${link.hash} exists`);
const sourceSkills = new Set(skillGroups.flatMap(group => group.items));
for (const name of ['React', 'TypeScript', 'n8n', 'MCP', 'Docker', 'SQL Server', 'Object-Oriented Programming', 'Data Structures', 'MySQL Workbench', 'IntelliJ IDEA', 'Automated Software Testing']) assert.ok(sourceSkills.has(name), `${name} is listed`);
assert.equal(document.querySelectorAll('.skill-item').length, totalSkills);
assert.match(document.querySelector('.hero-eyebrow').textContent, /Full Stack MERN Developer/);
assert.match(document.querySelector('.about-copy .lead').textContent, /MongoDB, Express\.js, React and Node\.js/);
assert.match(document.querySelector('.skills-summary').textContent, /MERN stack development/);
assert.ok([...document.querySelectorAll('option')].some(option => option.value === 'Full stack web development (MERN)'));

// Check the actual bytes and filename saved by both resume buttons, rather than only file presence.
const originalPDF = readFileSync(new URL('../public/assets/Madni-Kumboh-Resume.pdf', import.meta.url));
const resumeLinks = [...document.querySelectorAll('a[download="Madni-Kumboh-Resume.pdf"]')];
assert.equal(resumeLinks.length, 2);
for (const link of resumeLinks) click(link);
assert.equal(savedFiles.length, 2, 'Both resume links trigger file saving');
for (const saved of savedFiles) {
  assert.equal(saved.name, 'Madni-Kumboh-Resume.pdf');
  assert.equal(saved.blob.type, 'application/pdf');
  const data = await new Promise((resolve, reject) => { const reader = new window.FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = () => reject(reader.error); reader.readAsArrayBuffer(saved.blob); });
  assert.ok(Buffer.from(data).equals(originalPDF), 'Downloaded PDF matches the original resume byte for byte');
}
const pdfFallbacks = [...document.querySelectorAll('.resume-open-link')];
assert.equal(pdfFallbacks.length, 2);
for (const link of pdfFallbacks) { assert.equal(link.getAttribute('href'), '/madnikumboh-portfolio/assets/Madni-Kumboh-Resume.pdf'); assert.equal(link.target, '_blank'); }

// The active navigation changes with scrolling without hiding any section.
scrollPosition = 2200; window.dispatchEvent(new window.Event('scroll'));
await waitFor(() => document.querySelector('.main-nav [aria-current="location"]')?.hash === '#skills', 'Scroll spy identifies Skills');
assert.equal(document.querySelectorAll('section.portfolio-section').length, 6);
scrollPosition = 1250; window.dispatchEvent(new window.Event('scroll'));
await waitFor(() => document.querySelector('.header-shell').classList.contains('theme-light'), 'Header adapts to cream section');
click(document.querySelector('.main-nav a[href="#contact"]'));
await waitFor(() => window.location.hash === '#contact' && document.querySelector('.main-nav [aria-current="location"]')?.hash === '#contact', 'Navigation scrolls to Contact');
assert.equal(document.querySelectorAll('section.portfolio-section[hidden]').length, 0);

click(button('.skill-category', 'Databases'));
await waitFor(() => document.querySelectorAll('.skill-group').length === 1, 'Skill category filter works');
assert.match(document.querySelector('.skills-grid').textContent, /SQL Server/);
click(button('.skill-category', 'All Skills'));
await waitFor(() => document.querySelectorAll('.skill-item').length === totalSkills, 'All skills are restored');
const search = document.getElementById('skill-search');
const setSearch = value => { Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set.call(search, value); search.dispatchEvent(new window.Event('input', { bubbles: true })); };
setSearch('docker');
await waitFor(() => document.querySelectorAll('.skill-item').length === 1, 'React controlled skill search works');
assert.match(document.querySelector('.skills-grid').textContent, /Docker/);
setSearch('no-such-tool');
await waitFor(() => document.querySelector('.empty-state'), 'Empty search state appears');
click(button('.empty-state button', 'Clear search & show all skills'));
await waitFor(() => document.querySelectorAll('.skill-item').length === totalSkills, 'Search reset works');

click(button('.filter-pill', 'Websites'));
await waitFor(() => document.querySelectorAll('.project-card').length === 2, 'Project filter works');
click(button('.filter-pill', 'All'));
await waitFor(() => document.querySelectorAll('.project-card').length === 7, 'All projects restore');
click(document.querySelector('.project-card .project-cover-button'));
await waitFor(() => document.querySelector('.project-dialog[open]'), 'Project dialog opens');
assert.equal(document.body.style.overflow, 'hidden');
const allIDs = [...document.querySelectorAll('[id]')].map(element => element.id);
assert.equal(allIDs.length, new Set(allIDs).size, 'Modal artwork has unique SVG IDs');
click(document.querySelector('.dialog-close'));
await waitFor(() => !document.querySelector('.project-dialog'), 'Project dialog closes');
assert.equal(document.body.style.overflow, '');

click(document.querySelector('.menu-toggle'));
await waitFor(() => document.querySelector('.menu-toggle').getAttribute('aria-expanded') === 'true', 'Mobile menu opens');
document.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
await waitFor(() => document.querySelector('.menu-toggle').getAttribute('aria-expanded') === 'false', 'Escape closes mobile menu');
document.dispatchEvent(new window.KeyboardEvent('keydown', { key: '/', bubbles: true, cancelable: true }));
assert.equal(document.activeElement.id, 'skill-search');

const form = document.getElementById('contact-form');
form.elements.name.value = 'Test Visitor';
form.elements.email.value = 'visitor@example.com';
form.elements.service.value = 'AI & n8n automation';
form.elements.message.value = 'A workflow with spaces & symbols.';
form.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
await waitFor(() => document.querySelector('.form-status').textContent.includes('Complete sending'), 'Email draft confirmation appears');
assert.ok(emailDraft.startsWith('mailto:madnikumboh@gmail.com?'));
assert.match(decodeURIComponent(emailDraft), /visitor@example.com/);
assert.match(decodeURIComponent(emailDraft), /spaces & symbols/);

for (const path of ['/assets/workspace-hero.webp', '/assets/workspace-about.webp', '/assets/Madni-Kumboh-Resume.pdf']) assert.ok(existsSync(new URL(`../dist${path}`, import.meta.url)), `${path} is packaged`);
const stylesheetPath = index.match(/<link[^>]+href="([^"]+\.css)"/)[1];
const styles = readFileSync(new URL(`../dist${stylesheetPath.replace("/madnikumboh-portfolio", "")}`, import.meta.url), 'utf8');
assert.ok(!styles.includes('url(assets/'), 'Background assets use root paths');
assert.deepEqual(errors, [], 'React renders and handles interactions without runtime errors');
console.log(`Passed: original PDF bytes and filename from both resume downloads, viewer fallbacks, MERN profile copy, actual React production rendering, six visible sections, scroll-aware navigation, ${totalSkills} skills, search, filters, dialogs, keyboard/menu controls, email draft, assets and unique IDs.`);
console.log('Verification used JSDOM; browser layout and visual QA remain unverified.');
dom.window.close();
