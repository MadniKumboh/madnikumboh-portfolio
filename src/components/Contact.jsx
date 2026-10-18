import React, { useState } from 'react';
import { Icon } from './Visuals.jsx';
import { createEmailDraft } from '../model.js';

const details = [
  { icon: 'mail', label: 'Email', value: 'madnikumboh@gmail.com', href: 'mailto:madnikumboh@gmail.com' },
  { icon: 'map-pin', label: 'Location', value: 'Lahore, Pakistan · UTC+5' },
  { icon: 'linkedin', label: 'LinkedIn', value: 'linkedin.com/in/madnikumboh', href: 'https://www.linkedin.com/in/madnikumboh/' },
  { icon: 'github', label: 'GitHub', value: 'github.com/madnikumboh', href: 'https://github.com/madnikumboh' },
];
const socials = [
  { icon: 'instagram', label: '@madnikumboh', href: 'https://www.instagram.com/madnikumboh/' },
  { icon: 'instagram', label: '@madnikumboh.zzz', href: 'https://www.instagram.com/madnikumboh.zzz/' },
  { icon: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/madnikumboh' },
];
const services = ['Full stack web development (MERN)', 'SaaS application', 'AI & n8n automation', 'WordPress & Shopify', 'API integration or chatbot', 'Dashboard or business system', 'Something else'];

export default function Contact() {
  const [status, setStatus] = useState('');
  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const fields = Object.fromEntries(['name', 'email', 'service', 'message'].map(key => [key, String(data.get(key) || '').trim()]));
    if (!fields.name || !fields.message) { setStatus('Please add your name and a message before opening your email draft.'); return; }
    const link = document.createElement('a');
    link.href = createEmailDraft(fields);
    document.body.appendChild(link); link.click(); link.remove();
    setStatus('Your email draft is ready. Complete sending in your email app. If it didn’t open, use the direct email link below.');
  }
  return <div className="page contact-page container">
    <div className="section-heading"><div><p className="eyebrow">GET IN TOUCH <span className="section-number">06 / 06</span></p><h2 className="section-title" id="contact-heading">Let’s build something<br/><span className="underlined">meaningful together.</span></h2><p>Have a project, an opportunity, or just want to say hi?<br/>I’m always open to a good conversation.</p></div><div className="contact-doodle" aria-hidden="true">Your idea,<br/>our next project.<Icon name="corner-down-left"/></div></div>
    <div className="contact-layout">
      <div className="contact-details">{details.map(item => {
        const content = <><Icon className="contact-icon" name={item.icon}/><span><strong>{item.label}</strong><span>{item.value}</span></span>{item.href && <Icon className="contact-row-arrow" name="arrow-up-right"/>}</>;
        return item.href ? <a key={item.label} className="contact-row" href={item.href} {...(item.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{content}</a> : <div key={item.label} className="contact-row">{content}</div>;
      })}<div className="contact-socials">{socials.map(item => <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" aria-label={`${item.icon} ${item.label}`}><Icon name={item.icon}/><span>{item.label}</span></a>)}</div></div>
      <form className="contact-form" id="contact-form" onSubmit={handleSubmit}>
        <div className="form-title"><h3>Tell me about your idea.</h3><Icon name="sparkles"/></div>
        <div className="form-pair"><label>Your name<input name="name" autoComplete="name" placeholder="Your name" maxLength={100} required/></label><label>Your email<input name="email" type="email" autoComplete="email" placeholder="you@example.com" maxLength={200} required/></label></div>
        <label>What can I help with?<select name="service" defaultValue=""><option value="">Select a service (optional)</option>{services.map(service => <option key={service} value={service}>{service}</option>)}</select></label>
        <label>Your message<textarea name="message" placeholder="A little about your project, goals and timeline..." rows={4} maxLength={5000} required/></label>
        <div className="form-bottom"><button className="button button-dark" type="submit">Let’s Connect <Icon name="arrow-up-right"/></button><span>Opens a draft in your email app.</span></div>
        <p className="form-status" aria-live="polite">{status}</p><a className="email-fallback" href="mailto:madnikumboh@gmail.com">Or email me directly at madnikumboh@gmail.com <Icon name="arrow-up-right"/></a>
      </form>
    </div>
    <div className="contact-banner"><div><p>Good ideas turn into useful products<br/>when the right people work together.</p><span className="scribble-underline"/></div><a href="mailto:madnikumboh@gmail.com" className="banner-arrow" aria-label="Email Madni"><Icon name="arrow-up-right"/></a></div>
  </div>;
}
