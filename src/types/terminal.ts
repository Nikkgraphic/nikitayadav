export interface TerminalLine {
  type: 'command' | 'output' | 'error' | 'success' | 'info' | 'warning' | 'system';
  content: string;
}

export interface Command {
  name: string;
  description: string;
  aliases?: string[];
  execute: (args: string[]) => Promise<TerminalLine | string>;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  github?: string;
  image?: string;
  featured?: boolean;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  location: string;
  bio: string;
  education: string[];
  experience: string[];
}