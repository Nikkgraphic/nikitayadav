import { Command, TerminalLine, Project, Skill, PersonalInfo } from '../types/terminal';

// Portfolio data - customize this with your actual information
const personalInfo: PersonalInfo = {
  name: "Alex Developer",
  title: "Full Stack Developer & AI Enthusiast",
  email: "alex@example.com",
  location: "San Francisco, CA",
  bio: "Passionate developer with 5+ years of experience building scalable web applications and AI-powered solutions. Love creating immersive user experiences and solving complex problems.",
  education: [
    "B.S. Computer Science - Stanford University (2019)",
    "Machine Learning Certification - Coursera (2021)"
  ],
  experience: [
    "Senior Developer at TechCorp (2021-Present)",
    "Full Stack Developer at StartupXYZ (2019-2021)",
    "Software Engineering Intern at BigTech (2018)"
  ]
};

const skills: Skill[] = [
  {
    category: "Frontend",
    items: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Three.js", "Vue.js"]
  },
  {
    category: "Backend", 
    items: ["Node.js", "Python", "PostgreSQL", "MongoDB", "Redis", "GraphQL"]
  },
  {
    category: "AI/ML",
    items: ["OpenAI API", "TensorFlow", "PyTorch", "LangChain", "Computer Vision"]
  },
  {
    category: "DevOps",
    items: ["Docker", "AWS", "Vercel", "GitHub Actions", "Kubernetes"]
  },
  {
    category: "Tools",
    items: ["Git", "VS Code", "Figma", "Postman", "Linear", "Notion"]
  }
];

const projects: Project[] = [
  {
    id: "1",
    name: "AI Code Assistant",
    description: "Built an intelligent code completion tool using OpenAI's GPT-4. Features include real-time code suggestions, bug detection, and documentation generation.",
    technologies: ["React", "Node.js", "OpenAI API", "TypeScript"],
    url: "https://ai-assistant.demo.com",
    github: "https://github.com/alex/ai-assistant",
    featured: true
  },
  {
    id: "2", 
    name: "3D Portfolio Website",
    description: "Interactive terminal-style portfolio with Three.js animations and AI-powered chat functionality.",
    technologies: ["React", "Three.js", "Framer Motion", "Tailwind CSS"],
    url: "https://portfolio.demo.com",
    github: "https://github.com/alex/portfolio",
    featured: true
  },
  {
    id: "3",
    name: "E-commerce Platform",
    description: "Full-stack e-commerce solution with real-time inventory, payment processing, and admin dashboard.",
    technologies: ["Next.js", "PostgreSQL", "Stripe", "Prisma"],
    url: "https://shop.demo.com",
    github: "https://github.com/alex/ecommerce"
  }
];


// Command implementations
const commands: Command[] = [
  {
    name: "help",
    description: "Show available commands",
    aliases: ["h", "?"],
    execute: async () => {
      const helpText = `
Available commands:

  about     - Show personal information and bio
  skills    - Display technical skills and expertise  
  projects  - List portfolio projects
  resume    - View resume and download link
  contact   - Get contact information
  clear     - Clear the terminal screen
  theme     - Toggle light/dark theme
  chat      - Start AI-powered conversation
  ascii     - Display ASCII art
  whoami    - Show current user info
  date      - Show current date and time
  help      - Show this help message

Navigation:
  ↑/↓ arrows - Navigate command history
  Tab        - Auto-complete commands (coming soon)

Type any command to get started!
      `;
      return { type: 'info', content: helpText.trim() };
    }
  },
  {
    name: "about",
    description: "Show personal information",
    execute: async () => {
      const aboutText = `
Name: ${personalInfo.name}
Title: ${personalInfo.title}
Location: ${personalInfo.location}

Bio:
${personalInfo.bio}

Education:
${personalInfo.education.map(item => `  • ${item}`).join('\n')}

Experience:
${personalInfo.experience.map(item => `  • ${item}`).join('\n')}
      `;
      return { type: 'output', content: aboutText.trim() };
    }
  },
  {
    name: "skills",
    description: "Display technical skills",
    execute: async () => {
      let skillsText = "\nTechnical Skills & Expertise\n\n";
      
      skills.forEach(skill => {
        skillsText += `${skill.category}:\n`;
        skillsText += skill.items.map(item => `  • ${item}`).join('\n');
        skillsText += '\n\n';
      });
      
      return { type: 'output', content: skillsText.trim() };
    }
  },
  {
    name: "projects",
    description: "List portfolio projects",
    execute: async () => {
      let projectsText = "\nPortfolio Projects\n\n";
      
      projects.forEach((project, index) => {
        projectsText += `${index + 1}. ${project.name}${project.featured ? ' (Featured)' : ''}\n`;
        projectsText += `   ${project.description}\n`;
        projectsText += `   Tech: ${project.technologies.join(', ')}\n`;
        if (project.url) projectsText += `   Live: ${project.url}\n`;
        if (project.github) projectsText += `   Code: ${project.github}\n`;
        projectsText += '\n';
      });
      
      return { type: 'output', content: projectsText.trim() };
    }
  },
  {
    name: "resume",
    description: "View resume information",
    execute: async () => {
      const resumeText = `
Resume & Experience

${personalInfo.name}
${personalInfo.title}
${personalInfo.email} | ${personalInfo.location}

Professional Experience:
${personalInfo.experience.map(item => `  • ${item}`).join('\n')}

Education:
${personalInfo.education.map(item => `  • ${item}`).join('\n')}

Key Skills: ${skills.flatMap(s => s.items).slice(0, 8).join(', ')}

Download full resume: /resume.pdf
LinkedIn: /linkedin
GitHub: /github
      `;
      return { type: 'output', content: resumeText.trim() };
    }
  },
  {
    name: "contact",
    description: "Show contact information",
    execute: async () => {
      const contactText = `
Let's Connect!

Email: ${personalInfo.email}
Location: ${personalInfo.location}

I'm always open to discussing:
  • New opportunities
  • Exciting projects  
  • Tech collaborations
  • AI/ML innovations

Find me online:
  • LinkedIn: linkedin.com/in/alexdev
  • GitHub: github.com/alexdev
  • Twitter: @alexdev
  • Portfolio: alexdev.com

Feel free to reach out anytime!
      `;
      return { type: 'output', content: contactText.trim() };
    }
  },
  {
    name: "clear",
    description: "Clear the terminal screen",
    aliases: ["cls"],
    execute: async () => {
      // This will be handled specially in the terminal component
      return { type: 'system', content: 'CLEAR_SCREEN' };
    }
  },
  {
    name: "theme",
    description: "Toggle theme",
    execute: async () => {
      return "Theme switching coming soon! Currently using terminal dark theme.";
    }
  },
  {
    name: "chat",
    description: "Start AI conversation",
    aliases: ["ai"],
    execute: async () => {
      return `
🤖 AI Chat Mode

I'd love to integrate OpenAI here! To add AI-powered chat:

1. Connect this project to Supabase (click the green button ↗️)
2. Add your OpenAI API key to Supabase secrets
3. I'll create an edge function for secure AI interactions

For now, you can explore other commands like:
  • about - Learn about me
  • projects - See my work  
  • skills - View my expertise

Type 'help' for all available commands!
      `;
    }
  },
  {
    name: "whoami",
    description: "Show current user",
    execute: async () => {
      return `portfolio-visitor@alexdev-terminal:~$`;
    }
  },
  {
    name: "date",
    description: "Show current date and time",
    execute: async () => {
      return new Date().toLocaleString();
    }
  },
  {
    name: "ls",
    description: "List directory contents",
    execute: async () => {
      return `
drwxr-xr-x  portfolio/
drwxr-xr-x  projects/
drwxr-xr-x  skills/
-rw-r--r--  resume.pdf
-rw-r--r--  contact.txt
-rw-r--r--  about.md
      `;
    }
  }
];

export const commandHandler = async (input: string): Promise<TerminalLine | string> => {
  const [commandName, ...args] = input.toLowerCase().trim().split(' ');
  
  if (!commandName) {
    return { type: 'error', content: 'Please enter a command. Type "help" for available commands.' };
  }

  // Handle clear command specially
  if (commandName === 'clear' || commandName === 'cls') {
    return { type: 'system', content: 'CLEAR_SCREEN' };
  }

  // Find command by name or alias
  const command = commands.find(cmd => 
    cmd.name === commandName || (cmd.aliases && cmd.aliases.includes(commandName))
  );

  if (command) {
    try {
      return await command.execute(args);
    } catch (error) {
      return { type: 'error', content: `Error executing command: ${error}` };
    }
  }

  // Unknown command - could integrate AI here
  return { 
    type: 'error', 
    content: `Command '${commandName}' not found. Type 'help' for available commands.` 
  };
};

export { commands };