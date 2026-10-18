// Skills are taken from the user's supplied list and uploaded resume.
export const skillGroups = [
  { id: 'programming', name: 'Programming Languages', short: 'Programming', icon: 'code', wide: true, items: ['C', 'C++', 'Java', 'JavaScript', 'TypeScript', 'PHP', 'Python'] },
  { id: 'web', name: 'Web Development', short: 'Web Development', icon: 'globe', wide: true, items: ['HTML', 'CSS', 'React', 'Next.js', 'Node.js', 'Express.js', 'Tailwind CSS', 'Bootstrap', 'REST APIs', 'WebSockets', 'JWT'] },
  { id: 'databases', name: 'Databases & Data Tools', short: 'Databases', icon: 'database', wide: true, items: ['MongoDB', 'PostgreSQL', 'MySQL', 'SQL', 'SQL Server', 'ChromaDB', 'MySQL Workbench', 'MongoDB Compass', 'SQL Server Management Studio'] },
  { id: 'platforms', name: 'CMS & Ecommerce', short: 'CMS & Ecommerce', icon: 'bag', items: ['WordPress', 'Shopify'] },
  { id: 'foundations', name: 'Software Engineering Foundations', short: 'Core Concepts', icon: 'layers', items: ['Object-Oriented Programming', 'Data Structures', 'Algorithms', 'Problem Solving'] },
  { id: 'ai', name: 'AI & Automation', short: 'AI & Automation', icon: 'brain', wide: true, items: ['n8n', 'OpenAI', 'Prompt Engineering', 'MCP', 'ElevenLabs', 'LLMs', 'NLP', 'Chatbots'] },
  { id: 'devops', name: 'DevOps & Development Tools', short: 'DevOps & Tools', icon: 'box', wide: true, items: ['Git', 'GitHub', 'Docker', 'Postman', 'Vercel', 'DevOps', 'VS Code', 'IntelliJ IDEA', 'Eclipse IDE'] },
  { id: 'design', name: 'Design & Creative', short: 'Design & Creative', icon: 'palette', items: ['Figma', 'UI/UX Design', 'Graphic Design'] },
  { id: 'testing', name: 'Software Testing & Quality', short: 'Software Testing', icon: 'test', items: ['Automated Software Testing', 'Debugging'] },
  { id: 'assistants', name: 'AI Coding & Research', short: 'AI Coding & Research', icon: 'sparkles', wide: true, items: ['Claude Code', 'GitHub Copilot', 'Perplexity', 'Manus.ai'] },
];

export function filterSkills(category, query) {
  const term = query.trim().toLowerCase();
  return skillGroups.filter(group => category === 'all' || group.id === category)
    .map(group => ({ ...group, items: group.items.filter(item => !term || item.toLowerCase().includes(term) || group.name.toLowerCase().includes(term)) }))
    .filter(group => group.items.length > 0);
}

export const totalSkills = new Set(skillGroups.flatMap(group => group.items)).size;
