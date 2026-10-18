import React from "react";
import { Icon, Brand } from "./Visuals.jsx";
import ResumeDownload from "./ResumeDownload.jsx";

function Toolkit() {
 return <div className="toolkit-logos">{["React","Node.js","TypeScript","MongoDB","PostgreSQL","Docker","n8n","Figma"].map(name => <a key={name} href="#skills" className="toolkit-item" aria-label={`Explore ${name} and other skills`}><Brand name={name}/><span>{name === "Node.js" ? "node" : name === "TypeScript" ? "TS" : name}</span></a>)}</div>;
}

export function Home() {
  return (<div className="page home-page" aria-labelledby="home-heading">
        <div className="hero-photo" aria-hidden="true"></div>
        <div className="hero-inner container">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow"><span className="status-dot"></span>Full Stack MERN Developer & Creator</p>
            <h1 id="home-heading">Hi, I’m<br /><strong>Madni <span>Kumboh</span></strong><span className="headline-period">.</span></h1>
            <p className="hero-description">I build full stack MERN applications,<br className="desktop-break" /> automate workflows and craft digital experiences.</p>
            <div className="hero-actions">
              <a className="button button-accent" href="#projects">View My Work <Icon name="arrow-up-right" /></a>
              <ResumeDownload className="button button-outline">Download CV</ResumeDownload>
            </div>
            <div className="hero-availability"><span className="available-dot"></span>Open to projects & opportunities</div>
          </div>
          <div className="hero-scribble" aria-hidden="true">Ideas<br />Code<br />Design<br />Automate<br />Build<span className="scribble-underline"></span></div>
          <a className="explore-hint" href="#about"><span>GET TO KNOW ME</span><Icon name="arrow-down" /></a>
        </div>
        <div className="home-bottom container">
          <div className="stat-strip">
            <div className="stat"><Icon className="stat-icon" name="sparkles" /><div><strong>7</strong><span>Selected projects</span></div></div>
            <div className="stat"><Icon className="stat-icon" name="graduation" /><div><strong>2026</strong><span>UCP graduate</span></div></div>
            <div className="stat"><Icon className="stat-icon" name="code" /><div><strong>MERN stack</strong><span>Full stack web development</span></div></div>
            <div className="stat"><Icon className="stat-icon" name="workflow" /><div><strong>AI & n8n</strong><span>Automation focused</span></div></div>
          </div>
          <div className="toolkit-strip"><span className="toolkit-caption">Tools I build with</span><Toolkit /><a href="#skills" className="toolkit-more" aria-label="Explore all skills"><Icon name="arrow-up-right" /></a></div>
        </div>
      </div>);
}

export function About() {
  return (<div className="page about-page container" aria-labelledby="about-heading">
        <div className="about-intro">
          <div className="about-copy">
            <p className="eyebrow">ABOUT ME <span className="tiny-line"></span></p>
            <h2 className="section-title" id="about-heading">Curious mind.<br />Problem solver.<br /><span className="underlined">Builder at core.</span></h2>
            <p className="lead">I’m Madni Kumboh, a full stack MERN developer and digital creator from Lahore, Pakistan. I build complete web applications with MongoDB, Express.js, React and Node.js.</p>
            <p>I develop modern digital solutions for businesses, startups and brands, working across responsive interfaces, backend services, REST APIs and databases. My focus includes SaaS applications, ecommerce websites, custom dashboards and business systems that make everyday work simpler.</p>
            <p>Alongside MERN development, I work with WordPress, Shopify and PHP, and explore AI integrations, chatbots and n8n workflow automation. I enjoy connecting tools and services to turn repetitive tasks into practical, connected workflows.</p>
            <p>My background in graphic design and UI/UX shapes how I approach software: clear layouts, intuitive interactions and careful attention to the people using the product. I aim to bring thoughtful design and reliable functionality together in every project.</p>
            <p>I hold a Bachelor’s degree in Software Engineering from the University of Central Punjab (UCP). My project work includes FLEX, an AI-based smart browser extension, as well as ecommerce and reservation systems—experiences that have strengthened my problem-solving, collaboration and full stack development skills.</p>
            <p>I’m always learning and refining my craft. I’m open to projects and opportunities where I can help turn a strong idea into useful software and support a business as it grows.</p>
          </div>
          <figure className="about-photo about-portrait"><img loading="lazy" src="assets/madni-kumboh-portrait.webp" alt="Madni Kumboh" width="1024" height="1024" /><figcaption className="photo-caption">Madni Kumboh<span>Full Stack MERN Developer</span></figcaption></figure>
        </div>
        <div className="value-grid">
          <article className="value-card"><Icon className="value-icon" name="code" /><h2>Build</h2><p>Full stack MERN apps,<br />SaaS & business systems</p></article>
          <article className="value-card"><Icon className="value-icon" name="palette" /><h2>Design</h2><p>Clean interfaces.<br />Considered experiences.</p></article>
          <article className="value-card"><Icon className="value-icon" name="workflow" /><h2>Automate</h2><p>AI integrations &<br />n8n workflows</p></article>
          <article className="value-card"><Icon className="value-icon" name="zap" /><h2>Solve</h2><p>Practical software for<br />real business problems</p></article>
        </div>
        <div className="about-bottom"><div className="personal-note"><span className="quote-mark">“</span><p>Always learning, experimenting and building.<br />That’s how I turn curiosity into something useful.<strong>— Madni Kumboh</strong></p></div><div className="about-services"><span className="eyebrow">ALSO IN MY TOOLBOX</span><p>WordPress & Shopify <span>·</span> API integrations <span>·</span> Chatbots <span>·</span> Custom dashboards</p></div></div>
      </div>);
}

export function Experience({ onProjectOpen }) {
  return (<div className="page experience-page container" aria-labelledby="experience-heading">
        <div className="section-heading"><div><p className="eyebrow">EXPERIENCE & EDUCATION</p><h2 className="section-title" id="experience-heading">My journey<span className="accent-text">.</span></h2><p>A timeline of learning, projects and the people behind the work.</p></div><ResumeDownload className="text-link">Download resume</ResumeDownload></div>
        <div className="journey-layout">
          <div className="timeline">
            <article className="timeline-item"><span className="timeline-dot"></span><p className="timeline-date">PROJECT EXPERIENCE</p><h2>MERN stack & full stack web development</h2><p className="timeline-place">Independent & university projects</p><p>Developing full stack web applications with MongoDB, Express.js, React and Node.js, alongside PHP ecommerce and university software projects. Working across interfaces, APIs, authentication and databases.</p><div className="timeline-tags"><span>MongoDB</span><span>Express.js</span><span>React</span><span>Node.js</span><span>PHP</span></div></article>
            <article className="timeline-item"><span className="timeline-dot"></span><p className="timeline-date">FINAL YEAR PROJECT</p><h2>FLEX — AI smart browser extension</h2><p className="timeline-place">Project team lead · University of Central Punjab</p><p>Leading teamwork and contributing to an AI-based browser extension. Bringing a challenging idea from research into a working university project.</p><button className="inline-link" onClick={() => onProjectOpen("flex")}>Explore the project <Icon name="arrow-up-right" /></button></article>
            <article className="timeline-item"><span className="timeline-dot"></span><p className="timeline-date">SEPTEMBER 2025</p><h2>Community volunteer</h2><p className="timeline-place">Akhuwat UCP · Volunteer in Service</p><p>Helped donate, pack and distribute ration boxes to families affected by flooding.</p></article>
            <article className="timeline-item"><span className="timeline-dot"></span><p className="timeline-date">NOVEMBER 2021 – JULY 2026</p><h2>BS Software Engineering</h2><p className="timeline-place">University of Central Punjab · Lahore</p><p>Coursework in OOP, data structures, web engineering, DevOps and automated software testing.</p></article>
            <article className="timeline-item"><span className="timeline-dot"></span><p className="timeline-date">SEPTEMBER 2019 – JULY 2021</p><h2>Intermediate in Computer Science</h2><p className="timeline-place">Punjab Group of Colleges · Lahore</p><p>Building the foundation for a future in software and technology.</p></article>
          </div>
          <aside className="journey-aside"><div className="direction-card"><Icon className="value-icon" name="target" /><h2>Where I’m headed</h2><ul><li>Build useful digital products</li><li>Work on AI & automation</li><li>Help businesses grow</li><li>Keep learning & improving</li><li>Create value through technology</li></ul><a className="inline-link" href="#contact">Let’s build together <Icon name="arrow-right" /></a></div><div className="beyond-card"><Icon className="beyond-icon" name="camera" /><h2>Beyond work</h2><p>Photography, graphic design, art, chess and travelling. A different perspective always sparks a new idea.</p><div className="mountain-art" aria-hidden="true"><svg viewBox="0 0 500 300" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="mountain-sky" x2="0" y2="1"><stop stopColor="#18212d"/><stop offset="1" stopColor="#b68c67"/></linearGradient><linearGradient id="mountain-road" x2="1" y2="1"><stop stopColor="#c6a67d"/><stop offset="1" stopColor="#463a34"/></linearGradient></defs><path fill="url(#mountain-sky)" d="M0 0h500v300H0z"/><path fill="#3d444c" d="M0 170 60 112 109 165 188 72 253 145 315 38 420 142 469 105 500 141v159H0z"/><path fill="#b6aca2" opacity=".7" d="m188 72-34 69 32-25 19 18 20-13zm127-34-42 72 26-20 17 12 19-8 22 12z"/><path fill="#202a32" d="m0 213 79-51 64 49 65-59 115 82 77-66 100 34v98H0z"/><path fill="#121c21" d="m0 260 130-47 73 40 89-31 83 34 125-32v76H0z"/><path fill="url(#mountain-road)" d="M174 300c127-67 71-35 114-63 7-7-30-12-8-20 7-2 13-3 18-4-17 8 11 10 5 22-14 20-15 34-5 65z"/></svg></div></div></aside>
        </div>
      </div>);
}
