import { Command, TerminalLine, Project, Skill, PersonalInfo } from '../types/terminal';

// Portfolio data - customize this with your actual information
const personalInfo: PersonalInfo = {
  name: "Nikita Yadav",
  title: "Graphic & UI/UX Designer",
  email: "nikkyadav63@gmail.com",
  location: "Indore, Madhya Pradesh, 452001",
  bio: "Creative and detail-oriented Graphic & UI/UX Designer with a strong foundation in digital design tools and a passion for creating user-centered visual experiences. Eager to contribute innovative ideas and artistic skills to a dynamic design team. Currently seeking entry-level opportunities to begin my career in the design industry.",
  education: [
    "Bachelor of Computer Applications (BCA) - Holkar Science College, Indore"
  ],
  experience: [
    "Fresher - Visual Design, Indore. Eager to learn and contribute. Worked on personal and academic projects using professional tools."
  ]
};

const skills: Skill[] = [
  {
    category: "Design Software",
    items: ["Adobe Illustrator", "Adobe Photoshop", "CorelDRAW", "Figma"]
  },
  {
    category: "Design Skills", 
    items: ["UI/UX Design", "Wireframing & Prototyping", "Typography & Layout Design"]
  },
  {
    category: "Languages",
    items: ["Hindi (Fluent)", "English (Fluent)"]
  },
  {
    category: "Certifications",
    items: ["Professional Diploma in Graphic Designing from TechCluster Design Wala"]
  }
];

const projects: Project[] = [
  {
    id: "1",
    name: "Personal Design Portfolio",
    description: "Created a comprehensive visual portfolio showcasing various design projects including logos, posters, and digital artwork. Utilized Adobe Illustrator and Photoshop to demonstrate proficiency in design tools and creative problem-solving.",
    technologies: ["Adobe Illustrator", "Adobe Photoshop", "Typography", "Layout Design"],
    github: "https://github.com/1608Nikita",
    featured: true
  },
  {
    id: "2", 
    name: "UI/UX Design Projects",
    description: "Developed wireframes and prototypes for mobile and web applications using Figma. Focused on user-centered design principles, creating intuitive interfaces and smooth user experiences. Projects include app mockups and website redesigns.",
    technologies: ["Figma", "UI/UX Design", "Wireframing", "Prototyping"],
    github: "https://github.com/1608Nikita",
    featured: true
  },
  {
    id: "3",
    name: "Academic Design Projects",
    description: "Completed various design assignments during BCA coursework and certification program. Projects range from brand identity design to digital illustrations, demonstrating versatility in graphic design applications.",
    technologies: ["CorelDRAW", "Adobe Creative Suite", "Brand Design"],
    github: "https://github.com/1608Nikita"
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
  snake     - Play Snake game
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
    description: "Show contact information or open social links",
    execute: async (args: string[]) => {
      const socialLinks = {
        insta: "https://instagram.com/nikita_designer",
        instagram: "https://instagram.com/nikita_designer",
        linkedin: "https://linkedin.com/in/nikita-yadav-74b3b0356",
        github: "https://github.com/1608Nikita"
      };

      // Handle social media redirection
      if (args.length > 0) {
        const platform = args[0].toLowerCase();
        if (socialLinks[platform as keyof typeof socialLinks]) {
          window.open(socialLinks[platform as keyof typeof socialLinks], '_blank');
          return { type: 'output', content: `Opening ${platform}... 🚀` };
        } else {
          return { type: 'error', content: `Unknown platform: ${platform}. Available: insta, linkedin, github` };
        }
      }

      const contactText = `
Let's Connect!

Email: ${personalInfo.email}
Location: ${personalInfo.location}

I'm always open to discussing:
  • New opportunities
  • Exciting design projects  
  • Creative collaborations
  • UI/UX innovations

Phone: +91 6263002690

Find me online:
  • LinkedIn: https://linkedin.com/in/nikita-yadav-74b3b0356
  • GitHub: https://github.com/1608Nikita
  • Instagram: https://instagram.com/nikita_designer

Usage: 'contact [platform]' to open directly (insta, linkedin, github)

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
      return `portfolio-visitor@nikitayadav-terminal:~$`;
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
  },
  {
    name: "snake",
    description: "Play Snake game",
    execute: async () => {
      return { type: 'system', content: 'LAUNCH_SNAKE_GAME' };
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

  // Handle snake game command specially
  if (commandName === 'snake') {
    return { type: 'system', content: 'LAUNCH_SNAKE_GAME' };
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