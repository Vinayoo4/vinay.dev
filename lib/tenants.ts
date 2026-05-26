export type TenantStatus = "mvp" | "future";

export interface Tenant {
  id: string;
  name: string;
  category: string;
  description: string;
  routes: string[];
  status: TenantStatus;
}

export const tenants: Tenant[] = [
  {
    id: "portfolio",
    name: "Personal Portfolio",
    category: "Career",
    description: "Founder profile, projects, and direct contact with Salt guidance.",
    routes: ["/venture/portfolio"],
    status: "mvp",
  },
  {
    id: "ats-resume",
    name: "ATS Resume Checker",
    category: "Career",
    description: "Paste resume text and get keyword + structure feedback.",
    routes: ["/venture/ats-resume"],
    status: "mvp",
  },
  {
    id: "exam-prep",
    name: "Exam Prep Preview",
    category: "Education",
    description: "Quick quiz and micro study-plan suggestions.",
    routes: ["/venture/exam-prep"],
    status: "mvp",
  },
  {
    id: "school-projects",
    name: "School Project Guides",
    category: "Education",
    description: "Step-by-step idea guides for school projects.",
    routes: ["/venture/school-projects"],
    status: "mvp",
  },
  {
    id: "gst-helper",
    name: "GST / HSN Helper",
    category: "Finance & SME Ops",
    description: "Get GST/HSN hints from product descriptions.",
    routes: ["/venture/gst-helper"],
    status: "mvp",
  },
  { id: "accounting-precision-platform", name: "Accounting Precision Platform", category: "Vertical SaaS / Ops", description: "Finance workflow intelligence for SMEs.", routes: [], status: "future" },
  { id: "dentistpro360", name: "DentistPro360", category: "Vertical SaaS / Ops", description: "Practice operations suite for clinics.", routes: [], status: "future" },
  { id: "denttech", name: "DentTech", category: "Vertical SaaS / Ops", description: "Dental-tech integrations and analytics.", routes: [], status: "future" },
  { id: "quantify-ai", name: "Quantify AI", category: "Vertical SaaS / Ops", description: "KPI intelligence and forecasting assistant.", routes: [], status: "future" },
  { id: "aurajam", name: "Aurajam", category: "Creator / Social / Identity", description: "Creator identity and content presence toolkit.", routes: [], status: "future" },
  { id: "snapsnazz", name: "SnapSnazz", category: "Creator / Social / Identity", description: "Fast social content generation workflows.", routes: [], status: "future" },
  { id: "inspoalert", name: "InspoAlert", category: "Creator / Social / Identity", description: "Trend and idea alert feed for creators.", routes: [], status: "future" },
  { id: "vibe-resume", name: "Vibe Resume", category: "Creator / Social / Identity", description: "Future brand direction for resume products.", routes: [], status: "future" },
  { id: "blink-page", name: "Blink Page", category: "Creator / Social / Identity", description: "Micro-page builder for personal brands.", routes: [], status: "future" },
  { id: "devnote-stories", name: "DevNote Stories", category: "Developer Tools / Dev Creator", description: "Narrative dev notes with code context.", routes: [], status: "future" },
  { id: "snap-code-shop", name: "Snap & Code Shop", category: "Developer Tools / Dev Creator", description: "Templates and quick dev assets marketplace.", routes: [], status: "future" },
  { id: "twittable-snippets", name: "Twittable Snippets", category: "Developer Tools / Dev Creator", description: "Share-ready snippet formatter.", routes: [], status: "future" },
  { id: "snippet-collector", name: "Snippet Collector", category: "Developer Tools / Dev Creator", description: "Personal snippet vault with tags.", routes: [], status: "future" },
  { id: "emojify-snippets", name: "Emojify Snippets", category: "Developer Tools / Dev Creator", description: "Tone-friendly snippet enhancer.", routes: [], status: "future" },
  { id: "code-canvas", name: "Code Canvas", category: "Developer Tools / Dev Creator", description: "Visual coding board for explainers.", routes: [], status: "future" },
  { id: "flashfocus", name: "FlashFocus", category: "Developer Tools / Dev Creator", description: "Focus sprint helper for makers.", routes: [], status: "future" },
  { id: "hashtager", name: "Hashtager", category: "Developer Tools / Dev Creator", description: "Hashtag intelligence for developers.", routes: [], status: "future" },
  { id: "microstartup-society", name: "Microstartup Society", category: "Community / Membership", description: "Peer learning community for founders.", routes: [], status: "future" },
  { id: "herbal-living-community", name: "Herbal Living Community", category: "Community / Membership", description: "Lifestyle and wellness knowledge space.", routes: [], status: "future" },
  { id: "educomp-community", name: "EduComp Community", category: "Community / Membership", description: "Education and competition prep network.", routes: [], status: "future" },
  { id: "urban-gardening-club", name: "Urban Gardening Club", category: "Community / Membership", description: "Urban gardening action community.", routes: [], status: "future" },
  { id: "mindfulness-micro-course-series", name: "Mindfulness Micro Course Series", category: "Education / Wellness", description: "Short mindful learning series.", routes: [], status: "future" },
  { id: "student-finance-mentor", name: "Student Finance Mentor", category: "Education / Wellness", description: "Practical finance mentoring for students.", routes: [], status: "future" },
  { id: "reflection-studio", name: "Reflection Studio", category: "Education / Wellness", description: "Structured journaling and growth prompts.", routes: [], status: "future" },
  { id: "ecowise-wealth-digest", name: "EcoWise Wealth Digest", category: "Content / Newsletter / Info Products", description: "Sustainable wealth insights newsletter.", routes: [], status: "future" },
  { id: "meal-prep-starter-kit", name: "Meal Prep Starter Kit", category: "Content / Newsletter / Info Products", description: "Simple healthy prep playbooks.", routes: [], status: "future" },
  { id: "code-space-makeover", name: "Code Space Makeover", category: "Commerce / Curated Marketplace / Physical", description: "Curated productivity workspace ideas.", routes: [], status: "future" },
  { id: "hexcoaster", name: "HexCoaster", category: "Commerce / Curated Marketplace / Physical", description: "Design-led desk utility products.", routes: [], status: "future" },
  { id: "green-thumb-subscription", name: "Green Thumb Subscription", category: "Commerce / Curated Marketplace / Physical", description: "Plant-centric subscription concept.", routes: [], status: "future" },
  { id: "vegan-meal-planning-hub", name: "Vegan Meal Planning Hub", category: "Commerce / Curated Marketplace / Physical", description: "Planning kits for vegan meals.", routes: [], status: "future" },
];

export const mvpTenantIds = tenants.filter((tenant) => tenant.status === "mvp").map((tenant) => tenant.id);
