export const sections = [
  { id: 'home', label: 'Home', light: false },
  { id: 'about', label: 'About', light: true },
  { id: 'skills', label: 'Skills', light: false },
  { id: 'projects', label: 'Projects', light: false },
  { id: 'experience', label: 'Experience', light: true },
  { id: 'contact', label: 'Contact', light: true },
];

export function getActiveSection(elements, marker) {
  return elements.reduce((active, element) => element.getBoundingClientRect().top <= marker ? element.id : active, 'home');
}

export function createEmailDraft({ name, email, service, message }) {
  const subject = `Portfolio enquiry${service ? ` — ${service}` : ''} from ${name.trim()}`;
  const body = `Hi Madni,\n\n${message.trim()}\n\n${service ? `Interested in: ${service}\n` : ''}From: ${name.trim()}\nReply to: ${email.trim()}`;
  return `mailto:madnikumboh@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
