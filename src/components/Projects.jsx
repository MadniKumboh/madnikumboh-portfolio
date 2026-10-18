import React, { useEffect, useRef, useState } from 'react';
import { Icon, ProjectPreview, Tags } from './Visuals.jsx';
import { projects, projectFilters } from '../data/projects.js';

export default function Projects({ onProjectOpen }) {
  const [filter, setFilter] = useState('all');
  const selected = projects.filter(project => filter === 'all' || project.category === filter);
  return <div className="page projects-page container">
    <div className="section-heading"><div><p className="eyebrow">IDEAS INTO REALITY <span className="section-number">04 / 06</span></p><h2 className="section-title" id="projects-heading">Selected projects<span className="accent-text">.</span></h2><p>A look at my work across web development, AI and software.</p></div><a className="text-link" href="https://github.com/madnikumboh" target="_blank" rel="noopener noreferrer">Explore GitHub <Icon name="arrow-up-right"/></a></div>
    <div className="project-filters" role="group" aria-label="Filter projects">{projectFilters.map(item => <button key={item.id} className="filter-pill" aria-pressed={filter === item.id} onClick={() => setFilter(item.id)}>{item.name}</button>)}</div>
    <div className="project-grid">{selected.map(project => <article className="project-card" key={project.id}><ProjectPreview kind={project.visual}/><div className="project-card-content"><h3 className="project-card-title">{project.title}</h3><p className="project-type">{project.type}</p><div className="project-bottom"><Tags items={project.tags}/><span className="project-arrow" aria-hidden="true"><Icon name="arrow-up-right"/></span></div></div><button className="project-cover-button" aria-label={`Explore ${project.title}`} onClick={() => onProjectOpen(project.id)}/></article>)}</div>
    <p className="project-preview-note"><Icon name="info"/>Interface illustrations represent the projects; actual product screens may differ.</p>
  </div>;
}

export function ProjectDialog({ projectId, onClose }) {
  const ref = useRef(null);
  const project = projects.find(item => item.id === projectId);
  useEffect(() => {
    const dialog = ref.current;
    if (!project) return;
    const opener = document.activeElement;
    const originalOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => { if (dialog.open) dialog.close(); document.body.style.overflow = originalOverflow; if (opener?.isConnected) opener.focus({ preventScroll: true }); };
  }, [project]);
  if (!project) return null;
  return <dialog ref={ref} className="project-dialog" aria-labelledby="dialog-title" onClose={onClose} onCancel={onClose} onClick={event => { if (event.target === ref.current) { const box = ref.current.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) onClose(); } }}>
    <button className="dialog-close icon-button" onClick={onClose} aria-label="Close project details"><Icon name="x"/></button><ProjectPreview kind={project.visual}/>
    <div className="dialog-body"><p className="eyebrow">{project.type}</p><h2 id="dialog-title">{project.title}</h2><p>{project.description}</p><Tags items={project.tags}/><h3>Inside the project</h3><ul>{project.features.map(feature => <li key={feature}>{feature}</li>)}</ul><div className="dialog-actions"><a className="button button-dark" href="https://github.com/madnikumboh" target="_blank" rel="noopener noreferrer">Visit my GitHub <Icon name="arrow-up-right"/></a><a className="inline-link" href={`mailto:madnikumboh@gmail.com?subject=${encodeURIComponent(`Tell me about ${project.title}`)}`}>Ask about this project <Icon name="arrow-right"/></a></div><p className="dialog-note">Illustrative project preview. {project.source} The GitHub link opens my profile; a specific public repository or live demo has not been confirmed.</p></div>
  </dialog>;
}
