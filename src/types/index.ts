export interface Domain {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  courses: number;
  color: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  domain: string;
  domainId: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  lessons: Lesson[];
  thumbnail: string;
  tags: string[];
  comingSoon?: boolean;
}

export interface Lesson {
  id: string;
  number: number;
  title: string;
  duration: string;
  description: string;
}
