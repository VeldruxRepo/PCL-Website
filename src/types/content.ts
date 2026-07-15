export type LinkItem = { label: string; href: string };
export type ButtonItem = LinkItem & { variant?: "primary" | "secondary" };
export type IconTextItem = { title: string; description: string; icon?: string };
export type ServiceItem = { title: string; description: string; number: string };
export type ProcessItem = { number: string; title: string; description: string };
export type CaseStudy = {
  category: string;
  title: string;
  challenge: string;
  work: string;
  metrics: { value: string; label: string }[];
};
export type Experiment = {
  status: "RUNNING" | "WINNER" | "PLANNED";
  lift: string;
  hypothesis: string;
  variants: string[];
  confidence: string;
};
export type Testimonial = {
  quote: string;
  role: string;
  company: string;
  result: string;
};
export type FaqItem = { question: string; answer: string };
