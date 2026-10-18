import React, { useMemo, useState } from 'react';
import { Icon, Brand } from './Visuals.jsx';
import { skillGroups, totalSkills, filterSkills } from '../data/skills.js';

export default function Skills() {
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => filterSkills(category, query), [category, query]);
  const resultCount = new Set(filtered.flatMap(group => group.items)).size;
  const categories = [{ id: 'all', short: 'All Skills', icon: 'layers' }, ...skillGroups];
  return <div className="page skills-page container">
    <div className="section-heading skills-heading">
      <div><p className="eyebrow">MY SKILLS <span className="section-number">03 / 06</span></p><h2 id="skills-heading" className="section-title">Technologies I work with<span className="accent-text">.</span></h2><p>A growing toolkit of {totalSkills} languages, technologies and skills.<br className="desktop-break"/>From the first interface to the final integration.</p></div>
      <label className="search-field"><Icon name="search"/><input id="skill-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search skills..." autoComplete="off" aria-label="Search skills"/><kbd>/</kbd></label>
    </div>
    <div className="skills-summary" aria-label="Skill areas"><span>MERN stack development</span><span>AI & workflow automation</span><span>Design & user experience</span><span>Testing & developer tools</span></div>
    <div className="skills-layout">
      <div className="skill-categories" role="group" aria-label="Filter skills by category">{categories.map(group => <button key={group.id} className="skill-category" aria-pressed={category === group.id} onClick={() => setCategory(group.id)}><Icon name={group.icon}/><span>{group.short}</span></button>)}</div>
      <div className="skills-results">
        <div className="skills-grid">{filtered.map(group => <article key={group.id} className="skill-group" data-wide={group.wide || false}><Icon name={group.icon} className="skill-group-icon"/><div className="skill-group-content"><h3>{group.name}</h3><div className="skill-items">{group.items.map(item => <div className="skill-item" key={item}><Brand name={item}/><span>{item}</span></div>)}</div></div></article>)}</div>
        {!filtered.length && <div className="empty-state"><p>No skills match your search.</p><button className="inline-link" onClick={() => { setQuery(''); setCategory('all'); }}>Clear search & show all skills <Icon name="arrow-right"/></button></div>}
        <div className="skills-footnote"><span className="available-dot"/>Always adding to the toolkit.<span className="skills-count" aria-live="polite">{resultCount} {resultCount === 1 ? 'skill' : 'skills'} {query ? 'found' : 'in view'}</span></div>
      </div>
    </div>
  </div>;
}
