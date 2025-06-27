import { motion } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";

const projects = [
  {
    title: "Me",
    description: "Personal Portfolio",
    link: "https://me-sigma-red.vercel.app/",
    tags: ["Next.js", "Resume" , "Vue.js"]
  },
  {
    title: "ResumeGen",
    description: "Generate beautiful resumes quickly and efficiently.",
    link: "https://vinayoo4.github.io/resumegen/",
    tags: ["React", "Resume"]
  },
  {
    title: "Virtual Whiteboard",
    description: "Collaborative online whiteboard for brainstorming and teaching.",
    link: "https://vinayoo4.github.io/Virtualwhiteboard/",
    tags: ["Canvas", "Collaboration"]
  },
  {
    title: "Coding Editor",
    description: "A web-based code editor for fast prototyping and learning.",
    link: "https://vinayoo4.github.io/Codingeditr/",
    tags: ["Editor", "Web"]
  },
  {
    title: "EmailDB",
    description: "Managed and organized your email lists for marketing with ease.",
    link: "https://vinayoo4.github.io/Emaildb/",
    tags: ["Database", "Email"]
  },
  {
    title: "Edit Pro",
    description: "Small video editor.",
    link: "https://vinayoo4.github.io/edit_pro/",
    tags: ["Editor", "Web"]
  },
  {
    title: "Button Page",
    description: "A collection of useful web tools and quick links.",
    link: "https://buttonpage-n6xbpcxv4-vinayoo4s-projects.vercel.app/",
    tags: ["Tools", "Links"]
  },
  {
    title: "Daily Automation (GitHub)",
    description: "Automate your daily tasks with open-source scripts and workflows.",
    link: "https://github.com/Vinayoo4/Daily_automation",
    tags: ["Automation", "Scripts"]
  },
  {
    title: "Invoice Billing (GitHub)",
    description: "A simple and effective invoice billing system.",
    link: "https://github.com/Vinayoo4/inovice_billing",
    tags: ["Billing", "Node.js"]
  },
  {
    title: "Product Page (GitHub)",
    description: "A modern product landing page template.",
    link: "https://github.com/Vinayoo4/product_page",
    tags: ["Landing Page", "React"]
  },
  {
    title: "TaskPro-Flow (PartyRock)",
    description: "AI-powered task management and workflow automation.",
    link: "https://partyrock.aws/u/thelrnr/P30EwNXs2/TaskPro-Flow",
    tags: ["AI", "Productivity"]
  },
  {
    title: "InterviewPrep-Pro (PartyRock)",
    description: "Prepare for interviews with AI-generated questions and feedback.",
    link: "https://partyrock.aws/u/thelrnr/JeuE2DHvn/InterviewPrep-Pro",
    tags: ["AI", "Interview"]
  },
  {
    title: "ConvoStarter (PartyRock)",
    description: "AI tool to help you start and maintain engaging conversations.",
    link: "https://partyrock.aws/u/thelrnr/gBm97lCJh/ConvoStarter",
    tags: ["AI", "Chat"]
  },
  {
    title: "Shreenandi Marketing",
    description: "A web app for a marketing agency, built with Three.js and modern JavaScript frameworks. Features interactive 3D visuals and a dynamic user experience.",
    link: "https://shreenandimarketing.netlify.app",
    tags: ["Three.js", "JavaScript", "WebGL", "Marketing"]
  }
];

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-yellow-500">Featured Projects</h2>
          <p className="mt-4 text-gray-400">Showcasing innovation through code</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-xl bg-yellow-500/5 border border-yellow-500/10 p-6 flex flex-col justify-between shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Inner abstract design */}
              <div className="w-full flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 via-yellow-200 to-yellow-500 flex items-center justify-center shadow-md">
                  <span className="text-2xl font-bold text-yellow-900 opacity-70 select-none">
                    {project.title.charAt(0)}
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-yellow-500 mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                {project.tags && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs rounded-full bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center text-yellow-400 hover:text-yellow-300 text-sm font-medium transition"
              >
                Visit <FiExternalLink className="ml-1" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 