export interface Skill {
  name: string;
  icon: string; // Lucide icon name or emoji or custom representation
  category: 'frontend' | 'backend' | 'database' | 'framework';
  color: string; // Custom glow color
}

export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  imageUrl: string;
  repoUrl: string;
}

export interface StormStats {
  rainDensity: number;
  isStormActive: boolean;
  soundEnabled: boolean;
}
