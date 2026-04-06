export interface AboutData {
  name: string;
  title: string;
  bio: string;
  current_role: {
    position: string;
    company: string;
    period: string;
    description: string;
  };
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  photo: string;
  education: Array<{
    degree: string;
    institution: string;
    period: string;
    status: string;
  }>;
  stats: {
    projects: number;
    languages: number;
    icpc_finals: number;
    years_coding: number;
  };
  stats_labels: {
    projects: string;
    languages: string;
    icpc_finals: string;
    years_coding: string;
  };
}

export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  long_description: string;
  tech: string[];
  category: string;
  category_color: string;
  github: string | null;
  live: string | null;
  status: string;
  features: string[];
  stats: Record<string, number>;
  images: Array<{
    src: string;
    alt: string;
  }>;
}

export interface SkillCategory {
  name: string;
  icon: string;
  skills: string[];
}

export interface Achievement {
  id: string;
  title: string;
  event: string;
  year: string;
  rank: string | null;
  place: string | null;
  type: "rank" | "place" | "certification";
  description: string;
  icon: string;
  color: string;
}
