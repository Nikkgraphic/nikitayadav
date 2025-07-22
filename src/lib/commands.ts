import { Command, TerminalLine, Project, Skill, PersonalInfo } from '../types/terminal';

// Portfolio data - customize this with your actual information
const personalInfo: PersonalInfo = {
  name: "Suraj Yadav",
  title: "Data Analyst",
  email: "0816surajyadav@gmail.com",
  location: "Indore, India",
  bio: "Highly motivated Data Analyst with hands-on experience in data scraping, preprocessing, and enrichment using Python and APIs like Groq/OpenAI. Skilled in designing data pipelines, cleaning large datasets using Pandas and NumPy, and integrating data into MongoDB for scalable analysis. Proficient in visual analytics using Power BI and Excel, with strong understanding of EDA, cloud workflows, and collaboration in cross-functional teams.",
  education: [
    "Bachelor of Science (B.Sc.) in Computer Science - Holkar Science College, Devi Ahilya Vishwavidyalaya (DAVV), Indore"
  ],
  experience: [
    "Data Analyst Trainee at Debugshala (Feb 2025 – Present)"
  ]
};

const skills: Skill[] = [
  {
    category: "Languages",
    items: ["Python", "SQL"]
  },
  {
    category: "Libraries", 
    items: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Scrapy"]
  },
  {
    category: "Data Tools",
    items: ["Power BI", "Excel (Advanced)", "Google Colab"]
  },
  {
    category: "Databases",
    items: ["MySQL", "MongoDB"]
  },
  {
    category: "Frameworks",
    items: ["Streamlit", "Flask (Basic)", "Django (Learning Phase)"]
  },
  {
    category: "APIs & Concepts",
    items: ["Groq API", "OpenAI API", "RESTful APIs", "EDA", "OOP", "Data Structures", "API Integration", "Error Handling"]
  },
  {
    category: "Version Control",
    items: ["Git", "GitHub"]
  }
];

const projects: Project[] = [
  {
    id: "1",
    name: "US Logistics Tech Strategy Research",
    description: "Scraped data on top US logistics companies from multiple sources using Scrapy. Preprocessed data using Pandas and NumPy to clean and structure key company attributes. Integrated Groq API to enrich company profiles with ARR growth insights and tech stack data. Uploaded structured datasets to MongoDB for scalable access and analysis.",
    technologies: ["Python", "WebScraper", "Pandas", "MongoDB", "Groq API"],
    github: "https://github.com/1608Suraj",
    featured: true
  },
  {
    id: "2", 
    name: "AI Chatbot using Groq & OpenAI",
    description: "Built a conversational chatbot using OpenAI for generating human-like responses. Integrated Groq API for low-latency language processing. Deployed via Streamlit to offer a user-friendly web interface. Designed modular intent handling for extensibility and domain-specific customization.",
    technologies: ["Python", "Groq API", "OpenAI API", "Streamlit"],
    github: "https://github.com/1608Suraj",
    featured: true
  },
  {
    id: "3",
    name: "Email Automation System",
    description: "Automated email sending using Python's SMTP libraries for bulk communication. Integrated Pandas to manage recipient data from Excel sheets. Implemented error handling and logging for failed deliveries and retries. Scheduled scripts to run periodically using task schedulers.",
    technologies: ["Python", "SMTP", "Pandas"],
    github: "https://github.com/1608Suraj"
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
    description: "Show contact information or open social links",
    execute: async (args: string[]) => {
      const socialLinks = {
        insta: "https://www.instagram.com/_suraj.py?igsh=MWd3bzFvangyZHNkeQ==",
        instagram: "https://www.instagram.com/_suraj.py?igsh=MWd3bzFvangyZHNkeQ==",
        linkedin: "https://www.linkedin.com/in/suraj-yadav-5620902b2/",
        github: "https://github.com/1608Suraj"
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
  • Exciting projects  
  • Tech collaborations
  • AI/ML innovations

Phone: +91 8085546767

Find me online:
  • LinkedIn: https://www.linkedin.com/in/suraj-yadav-5620902b2/
  • GitHub: https://github.com/1608Suraj
  • Instagram: https://www.instagram.com/_suraj.py?igsh=MWd3bzFvangyZHNkeQ==

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
      return `portfolio-visitor@surajyadav-terminal:~$`;
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