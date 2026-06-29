export interface Project {
  id: string
  name: string
  categories: Category[];
  tools: string[];
  context?: string;
  roles?: string[],
  team?: TeamMember[],
  intro?: string;
  description: string;
  details?: string;
  year?: number;
  poster?: Asset;
  assets?: Asset[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color?: string;
  count?: number;
}
export type Asset = {
  src: string;
  alt: string;
  type?: "img" | "vimeo_video" | "yt_video";
};


type TeamMember = {
  name: string;
  role: string;
}
export type PageTransition = "fade" | "slideFromRight"
