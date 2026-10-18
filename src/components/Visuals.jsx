import React, { useId } from 'react';
import { paths, brands, icon } from '../data/icons.js';
import { projectVisual } from '../data/visuals.js';

export function Icon({ name, className = '', ...props }) {
  return <span className={className} {...props}><svg viewBox="0 0 24 24" aria-hidden="true" dangerouslySetInnerHTML={{ __html: paths[name] || paths.code }} /></span>;
}

export function Brand({ name }) {
  const mark = brands[name] || { color: '#c6b59c', text: name.length > 18 ? name.split(' ').map(word => word[0]).join('').slice(0, 3) : name.slice(0, 2), kind: 'outline' };
  const art = mark.svg ? `<svg viewBox="0 0 24 24" aria-hidden="true">${mark.svg}</svg>` : mark.icon ? icon(mark.icon) : null;
  return <span className={`brand-mark ${mark.kind ? `brand-${mark.kind}` : ''}`} style={{ '--brand': mark.color, '--brand-ink': mark.ink || '#111' }} aria-hidden="true">{art ? <span className="brand-art" dangerouslySetInnerHTML={{ __html: art }} /> : mark.text}</span>;
}

export function ProjectPreview({ kind }) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  // Project previews are trusted, project-owned artwork, isolated from user input.
  return <div className="project-art" dangerouslySetInnerHTML={{ __html: projectVisual(kind).replaceAll('__ID__', id) }} />;
}

export function Tags({ items }) {
  return <span className="project-tags">{items.map(item => <span className="project-tag" key={item}>{item}</span>)}</span>;
}
