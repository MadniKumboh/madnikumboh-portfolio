import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Home, About, Experience } from './components/StaticSections.jsx';
import Skills from './components/Skills.jsx';
import Projects, { ProjectDialog } from './components/Projects.jsx';
import Contact from './components/Contact.jsx';
import { Icon } from './components/Visuals.jsx';
import { sections, getActiveSection } from './model.js';

export default function App() {
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectId, setProjectId] = useState(null);
  const [progress, setProgress] = useState(0);
  const shellRef = useRef(null);
  const activeSection = sections.find(section => section.id === active);
  const closeProject = useCallback(() => setProjectId(null), []);

  const scrollToSection = useCallback((id, updateHistory = true) => {
    const target = document.getElementById(id);
    if (!target) return;
    setMenuOpen(false);
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    if (updateHistory && window.location.hash !== `#${id}`) window.history.pushState(null, '', `#${id}`);
    if (id === 'main') target.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const elements = sections.map(section => document.getElementById(section.id)).filter(Boolean);
      const marker = Math.min(200, Math.max(110, window.innerHeight * 0.24));
      const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 5 && window.scrollY > 0;
      setActive(atBottom ? 'contact' : getActiveSection(elements, marker));
      setScrolled(window.scrollY > 28);
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0);
      frame = 0;
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    update();
    const initial = window.location.hash.slice(1);
    const initialFrame = window.requestAnimationFrame(() => {
      if (initial && (initial === 'main' || sections.some(section => section.id === initial))) document.getElementById(initial)?.scrollIntoView({ behavior: 'instant', block: 'start' });
      schedule();
    });
    const restore = () => scrollToSection(window.location.hash.slice(1) || 'home', false);
    window.addEventListener('popstate', restore);
    return () => { window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); window.removeEventListener('popstate', restore); window.cancelAnimationFrame(frame); window.cancelAnimationFrame(initialFrame); };
  }, [scrollToSection]);

  useEffect(() => {
    document.body.dataset.activeSection = active;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', activeSection.light ? '#f7f4ec' : '#0b0e10');
  }, [active, activeSection.light]);

  useEffect(() => {
    const handleKey = event => {
      if (event.key === 'Escape') setMenuOpen(false);
      if (event.key === '/' && !event.ctrlKey && !event.metaKey && !event.altKey && !projectId && !/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName)) {
        event.preventDefault();
        scrollToSection('skills');
        document.getElementById('skill-search')?.focus({ preventScroll: true });
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [projectId, scrollToSection]);

  function handleClick(event) {
    const link = event.target.closest('a[href^="#"]');
    if (link && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) {
      const id = link.getAttribute('href').slice(1);
      if (document.getElementById(id)) { event.preventDefault(); scrollToSection(id); }
    }
    if (!event.target.closest('.main-nav') && !event.target.closest('.menu-toggle')) setMenuOpen(false);
  }

  return <div ref={shellRef} className="site-shell" onClick={handleClick}>
    <a className="skip-link" href="#main">Skip to content</a>
    <div className={`header-shell ${activeSection.light ? 'theme-light' : 'theme-dark'} ${scrolled ? 'is-scrolled' : ''}`}>
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Madni Kumboh home">M<span>K</span><i/></a>
        <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} id="main-nav" aria-label="Main navigation">{sections.map(section => <a key={section.id} href={`#${section.id}`} aria-current={active === section.id ? 'location' : undefined}>{section.label}</a>)}</nav>
        <a className="button button-small header-cta" href="#contact">Let’s Talk <Icon name="arrow-right"/></a>
        <button className="menu-toggle icon-button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-controls="main-nav" aria-expanded={menuOpen} onClick={() => setMenuOpen(open => !open)}><Icon name={menuOpen ? 'x' : 'menu'}/></button>
      </header>
      <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true"/>
    </div>
    <main id="main" tabIndex={-1}>
      <section className="portfolio-section home-section theme-dark" id="home" aria-labelledby="home-heading"><Home/><a className="scroll-cue" href="#about"><span>SCROLL TO EXPLORE</span><Icon name="arrow-down"/></a></section>
      <section className="portfolio-section theme-light" id="about" aria-labelledby="about-heading"><About/></section>
      <section className="portfolio-section theme-dark" id="skills" aria-labelledby="skills-heading"><Skills/></section>
      <section className="portfolio-section theme-dark" id="projects" aria-labelledby="projects-heading"><Projects onProjectOpen={setProjectId}/></section>
      <section className="portfolio-section theme-light" id="experience" aria-labelledby="experience-heading"><Experience onProjectOpen={setProjectId}/></section>
      <section className="portfolio-section theme-light" id="contact" aria-labelledby="contact-heading"><Contact/></section>
    </main>
    <footer className="site-footer container"><span>© {new Date().getFullYear()} Madni Kumboh</span><a className="footer-motto" href="#home">Back to top <Icon name="arrow-up-right"/></a><div><a href="https://github.com/madnikumboh" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Icon name="github"/></a><a href="https://www.linkedin.com/in/madnikumboh/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Icon name="linkedin"/></a><a href="mailto:madnikumboh@gmail.com" aria-label="Email"><Icon name="mail"/></a></div></footer>
    <ProjectDialog projectId={projectId} onClose={closeProject}/>
  </div>;
}
