"use client";

import { motion } from "framer-motion";
import { FiExternalLink, FiGithub, FiGlobe, FiCode, FiTool, FiZap, FiStar, FiDownload, FiInfo, FiClock, FiUsers, FiTag } from "react-icons/fi";
import { useState } from "react";

// Type definitions for better TypeScript support
interface RelatedTool {
  name: string;
  link: string;
  type: string;
}

interface AdditionalInfo {
  lastUpdated: string;
  adminNotes: string;
  downloads?: string;
  rating?: string;
  stars?: string;
  forks?: string;
  usage?: string;
}

interface Tool {
  title: string;
  description: string;
  link: string;
  tags: string[];
  type: string;
  features: string[];
  relatedTools: RelatedTool[];
  additionalInfo: AdditionalInfo;
}

interface CategoryData {
  icon: any;
  color: string;
  tools: Tool[];
}

// Categorized tools and projects data
const toolCategories: Record<string, CategoryData> = {
  "Web Tools": {
    icon: FiGlobe,
    color: "from-blue-400 to-blue-600",
    tools: [
      {
        title: "ResumeGen",
        description: "Generate beautiful resumes quickly and efficiently with customizable templates.",
        link: "https://vinayoo4.github.io/resumegen/",
        tags: ["React", "Resume Builder", "PDF Export"],
        type: "web",
        features: ["Multiple Templates", "Real-time Preview", "Export to PDF", "Custom Styling"],
        relatedTools: [
          { name: "Canva", link: "https://canva.com", type: "Design" },
          { name: "LinkedIn", link: "https://linkedin.com", type: "Professional" },
          { name: "Indeed", link: "https://indeed.com", type: "Job Search" }
        ],
        additionalInfo: {
          lastUpdated: "2024-01-15",
          downloads: "2.5k+",
          rating: "4.8/5",
          adminNotes: "Popular tool for students and professionals. Consider adding more templates."
        }
      },
      {
        title: "Virtual Whiteboard",
        description: "Collaborative online whiteboard for brainstorming and teaching.",
        link: "https://vinayoo4.github.io/Virtualwhiteboard/",
        tags: ["Canvas", "Collaboration", "Real-time"],
        type: "web",
        features: ["Real-time Collaboration", "Drawing Tools", "Text & Shapes", "Export Options"],
        relatedTools: [
          { name: "Miro", link: "https://miro.com", type: "Collaboration" },
          { name: "Figma", link: "https://figma.com", type: "Design" },
          { name: "Notion", link: "https://notion.so", type: "Productivity" }
        ],
        additionalInfo: {
          lastUpdated: "2024-01-10",
          downloads: "1.8k+",
          rating: "4.6/5",
          adminNotes: "Great for remote teams. Add video conferencing integration."
        }
      },
      {
        title: "Coding Editor",
        description: "A web-based code editor for fast prototyping and learning.",
        link: "https://vinayoo4.github.io/Codingeditr/",
        tags: ["Editor", "Syntax Highlighting", "Web"],
        type: "web",
        features: ["Syntax Highlighting", "Multiple Languages", "Live Preview", "Code Sharing"],
        relatedTools: [
          { name: "CodePen", link: "https://codepen.io", type: "Code Editor" },
          { name: "JSFiddle", link: "https://jsfiddle.net", type: "Code Editor" },
          { name: "Replit", link: "https://replit.com", type: "IDE" }
        ],
        additionalInfo: {
          lastUpdated: "2024-01-20",
          downloads: "3.2k+",
          rating: "4.7/5",
          adminNotes: "Excellent for teaching programming. Add more language support."
        }
      },
      {
        title: "EmailDB",
        description: "Manage and organize your email lists for marketing with ease.",
        link: "https://vinayoo4.github.io/Emaildb/",
        tags: ["Database", "Email Marketing", "CRM"],
        type: "web",
        features: ["Email Validation", "List Management", "Export Options", "Analytics"],
        relatedTools: [
          { name: "Mailchimp", link: "https://mailchimp.com", type: "Email Marketing" },
          { name: "ConvertKit", link: "https://convertkit.com", type: "Email Marketing" },
          { name: "Airtable", link: "https://airtable.com", type: "Database" }
        ],
        additionalInfo: {
          lastUpdated: "2024-01-05",
          downloads: "1.2k+",
          rating: "4.5/5",
          adminNotes: "Useful for small businesses. Add GDPR compliance features."
        }
      },
      {
        title: "Edit Pro",
        description: "Small video editor for quick edits and basic video processing.",
        link: "https://vinayoo4.github.io/edit_pro/",
        tags: ["Video Editor", "Web-based", "Media"],
        type: "web",
        features: ["Video Trimming", "Filters & Effects", "Export Options", "No Installation"],
        relatedTools: [
          { name: "CapCut", link: "https://capcut.com", type: "Video Editor" },
          { name: "DaVinci Resolve", link: "https://blackmagicdesign.com", type: "Video Editor" },
          { name: "Canva Video", link: "https://canva.com", type: "Video Editor" }
        ],
        additionalInfo: {
          lastUpdated: "2024-01-12",
          downloads: "900+",
          rating: "4.3/5",
          adminNotes: "Good for quick edits. Consider adding more advanced features."
        }
      },
      {
        title: "Button Page",
        description: "A collection of useful web tools and quick links for developers.",
        link: "https://buttonpage-n6xbpcxv4-vinayoo4s-projects.vercel.app/",
        tags: ["Tools", "Quick Links", "Developer"],
        type: "web",
        features: ["Tool Collection", "Quick Access", "Bookmarkable", "Responsive"],
        relatedTools: [
          { name: "Dev.to", link: "https://dev.to", type: "Developer Community" },
          { name: "GitHub", link: "https://github.com", type: "Code Repository" },
          { name: "Stack Overflow", link: "https://stackoverflow.com", type: "Q&A" }
        ],
        additionalInfo: {
          lastUpdated: "2024-01-18",
          downloads: "1.5k+",
          rating: "4.9/5",
          adminNotes: "Very popular among developers. Keep adding new tools regularly."
        }
      }
    ]
  },
  "Development Tools": {
    icon: FiCode,
    color: "from-green-400 to-green-600",
    tools: [
      {
        title: "Daily Automation",
        description: "Automate your daily tasks with open-source scripts and workflows.",
        link: "https://github.com/Vinayoo4/Daily_automation",
        tags: ["Automation", "Scripts", "Productivity"],
        type: "github",
        features: ["Task Automation", "Scheduled Jobs", "Cross-platform", "Open Source"],
        relatedTools: [
          { name: "GitHub Actions", link: "https://github.com/features/actions", type: "CI/CD" },
          { name: "Cron", link: "https://crontab.guru", type: "Scheduler" },
          { name: "Zapier", link: "https://zapier.com", type: "Automation" }
        ],
        additionalInfo: {
          lastUpdated: "2024-01-08",
          stars: "150+",
          forks: "45",
          adminNotes: "Growing community. Add more automation templates."
        }
      },
      {
        title: "Invoice Billing",
        description: "A simple and effective invoice billing system for small businesses.",
        link: "https://github.com/Vinayoo4/inovice_billing",
        tags: ["Billing", "Node.js", "Business"],
        type: "github",
        features: ["Invoice Generation", "Payment Tracking", "Client Management", "Reports"],
        relatedTools: [
          { name: "Stripe", link: "https://stripe.com", type: "Payment" },
          { name: "QuickBooks", link: "https://quickbooks.intuit.com", type: "Accounting" },
          { name: "FreshBooks", link: "https://freshbooks.com", type: "Invoicing" }
        ],
        additionalInfo: {
          lastUpdated: "2024-01-14",
          stars: "89",
          forks: "23",
          adminNotes: "Good for small businesses. Add multi-currency support."
        }
      },
      {
        title: "Product Page",
        description: "A modern product landing page template with responsive design.",
        link: "https://github.com/Vinayoo4/product_page",
        tags: ["Landing Page", "React", "Template"],
        type: "github",
        features: ["Responsive Design", "Modern UI", "Customizable", "SEO Optimized"],
        relatedTools: [
          { name: "Vercel", link: "https://vercel.com", type: "Deployment" },
          { name: "Netlify", link: "https://netlify.com", type: "Deployment" },
          { name: "Framer", link: "https://framer.com", type: "Design" }
        ],
        additionalInfo: {
          lastUpdated: "2024-01-16",
          stars: "234",
          forks: "67",
          adminNotes: "Popular template. Consider adding more variants."
        }
      }
    ]
  },
  "AI Tools": {
    icon: FiZap,
    color: "from-purple-400 to-purple-600",
    tools: [
      {
        title: "TaskPro-Flow",
        description: "AI-powered task management and workflow automation platform.",
        link: "https://partyrock.aws/u/thelrnr/P30EwNXs2/TaskPro-Flow",
        tags: ["AI", "Productivity", "Workflow"],
        type: "partyrock",
        features: ["AI Task Prioritization", "Smart Scheduling", "Progress Tracking", "Team Collaboration"],
        relatedTools: [
          { name: "Notion AI", link: "https://notion.so", type: "AI Productivity" },
          { name: "ClickUp", link: "https://clickup.com", type: "Project Management" },
          { name: "Asana", link: "https://asana.com", type: "Task Management" }
        ],
        additionalInfo: {
          lastUpdated: "2024-01-19",
          usage: "5k+ sessions",
          rating: "4.8/5",
          adminNotes: "High user engagement. Consider adding more AI features."
        }
      },
      {
        title: "InterviewPrep-Pro",
        description: "Prepare for interviews with AI-generated questions and personalized feedback.",
        link: "https://partyrock.aws/u/thelrnr/JeuE2DHvn/InterviewPrep-Pro",
        tags: ["AI", "Interview", "Learning"],
        type: "partyrock",
        features: ["Custom Questions", "AI Feedback", "Practice Sessions", "Progress Analytics"],
        relatedTools: [
          { name: "LeetCode", link: "https://leetcode.com", type: "Coding Practice" },
          { name: "HackerRank", link: "https://hackerrank.com", type: "Coding Practice" },
          { name: "Pramp", link: "https://pramp.com", type: "Mock Interviews" }
        ],
        additionalInfo: {
          lastUpdated: "2024-01-17",
          usage: "3.2k+ sessions",
          rating: "4.7/5",
          adminNotes: "Popular among job seekers. Add more industry-specific questions."
        }
      },
      {
        title: "ConvoStarter",
        description: "AI tool to help you start and maintain engaging conversations.",
        link: "https://partyrock.aws/u/thelrnr/gBm97lCJh/ConvoStarter",
        tags: ["AI", "Chat", "Social"],
        type: "partyrock",
        features: ["Conversation Starters", "Context Awareness", "Topic Suggestions", "Response Ideas"],
        relatedTools: [
          { name: "ChatGPT", link: "https://chat.openai.com", type: "AI Chat" },
          { name: "Claude", link: "https://claude.ai", type: "AI Assistant" },
          { name: "Character.ai", link: "https://character.ai", type: "AI Characters" }
        ],
        additionalInfo: {
          lastUpdated: "2024-01-13",
          usage: "2.1k+ sessions",
          rating: "4.5/5",
          adminNotes: "Fun and engaging tool. Add more conversation scenarios."
        }
      }
    ]
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case "github":
      return FiGithub;
    case "partyrock":
      return FiZap;
    default:
      return FiExternalLink;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "github":
      return "text-gray-400";
    case "partyrock":
      return "text-purple-400";
    default:
      return "text-blue-400";
  }
};

export default function PortfolioSection() {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Function to determine floating window position based on card index and grid layout
  const getFloatingWindowPosition = (cardIndex: number, totalCards: number, screenSize: 'mobile' | 'tablet' | 'desktop') => {
    if (screenSize === 'mobile') {
      // On mobile, always center the window
      return {
        left: '50%',
        transform: 'translateX(-50%)',
        right: 'auto'
      };
    }

    if (screenSize === 'tablet') {
      // On tablet (2 columns), check if it's left or right column
      const isLeftColumn = cardIndex % 2 === 0;
      if (isLeftColumn) {
        // Left column - show window on right
        return {
          left: '100%',
          transform: 'translateX(0)',
          right: 'auto'
        };
      } else {
        // Right column - show window on left
        return {
          left: 'auto',
          transform: 'translateX(-100%)',
          right: '100%'
        };
      }
    }

    if (screenSize === 'desktop') {
      // On desktop (3 columns), check position in the row
      const positionInRow = cardIndex % 3;
      if (positionInRow === 0) {
        // Left column - show window on right
        return {
          left: '100%',
          transform: 'translateX(0)',
          right: 'auto'
        };
      } else if (positionInRow === 1) {
        // Middle column - center the window
        return {
          left: '50%',
          transform: 'translateX(-50%)',
          right: 'auto'
        };
      } else {
        // Right column - show window on left
        return {
          left: 'auto',
          transform: 'translateX(-100%)',
          right: '100%'
        };
      }
    }

    // Default fallback
    return {
      left: '50%',
      transform: 'translateX(-50%)',
      right: 'auto'
    };
  };

  // Function to get screen size based on window width
  const getScreenSize = () => {
    if (typeof window === 'undefined') return 'desktop';
    const width = window.innerWidth;
    if (width < 640) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  };

  return (
    <section id="portfolio" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-black/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-yellow-500">Featured Tools & Projects</h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-400">Discover useful tools and innovative projects</p>
        </motion.div>

        {/* Category Filter Buttons - Responsive */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onClick={() => setSelectedCategory(null)}
            className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-full border transition-all duration-300 text-xs sm:text-sm ${
              selectedCategory === null
                ? "bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-yellow-500/40 text-yellow-400"
                : "bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border-yellow-500/20 text-yellow-400 hover:from-yellow-500/20 hover:to-yellow-600/20"
            }`}
          >
            <FiStar className="w-3 h-3 sm:w-5 sm:h-5" />
            <span className="font-medium">All</span>
          </motion.button>
          
          {Object.entries(toolCategories).map(([category, data]) => {
            const IconComponent = data.icon;
            return (
              <motion.button
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onClick={() => setSelectedCategory(category)}
                className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-full border transition-all duration-300 text-xs sm:text-sm ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-yellow-500/40 text-yellow-400"
                    : "bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border-yellow-500/20 text-yellow-400 hover:from-yellow-500/20 hover:to-yellow-600/20"
                }`}
              >
                <IconComponent className="w-3 h-3 sm:w-5 sm:h-5" />
                <span className="font-medium hidden sm:inline">{category}</span>
                <span className="sm:hidden">{category.split(' ')[0]}</span>
                <span className="ml-1 sm:ml-2 px-1 sm:px-2 py-0.5 sm:py-1 text-xs bg-yellow-500/20 rounded-full">
                  {data.tools.length}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Tools Grid - Responsive */}
        <div className="space-y-8 sm:space-y-12">
          {Object.entries(toolCategories).map(([category, data], categoryIndex) => {
            // Skip if category is selected and this isn't it
            if (selectedCategory && selectedCategory !== category) return null;
            
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                {!selectedCategory && (
                  <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
                    <div className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r ${data.color} flex items-center justify-center`}>
                      <data.icon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-yellow-500">{category}</h3>
                  </div>
                )}
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {data.tools.map((tool, index) => {
                    const TypeIcon = getTypeIcon(tool.type);
                    const typeColor = getTypeColor(tool.type);
                    const screenSize = getScreenSize();
                    const windowPosition = getFloatingWindowPosition(index, data.tools.length, screenSize);
                    
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: (categoryIndex * 0.1) + (index * 0.05) }}
                        className="group relative"
                        onMouseEnter={() => setHoveredTool(`${category}-${index}`)}
                        onMouseLeave={() => setHoveredTool(null)}
                      >
                        {/* Main Card */}
                        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-yellow-500/5 to-yellow-600/5 border border-yellow-500/10 p-4 sm:p-6 h-full transition-all duration-300 hover:border-yellow-500/30 hover:shadow-2xl hover:shadow-yellow-500/10 hover:-translate-y-1">
                          {/* Hover Effect Background */}
                          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          
                          {/* Tool Icon */}
                          <div className="relative z-10 w-full flex justify-center mb-3 sm:mb-4">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-yellow-400 via-yellow-200 to-yellow-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                              <span className="text-lg sm:text-2xl font-bold text-yellow-900 opacity-70 select-none">
                                {tool.title.charAt(0)}
                              </span>
                            </div>
                          </div>

                          {/* Tool Content */}
                          <div className="relative z-10 flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="text-lg sm:text-xl font-semibold text-yellow-500 group-hover:text-yellow-400 transition-colors">
                                {tool.title}
                              </h3>
                              <TypeIcon className={`w-4 h-4 sm:w-5 sm:h-5 ${typeColor} group-hover:scale-110 transition-transform`} />
                            </div>
                            
                            <p className="text-gray-400 mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed">
                              {tool.description}
                            </p>
                            
                            {/* Tags */}
                            <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                              {tool.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs rounded-full bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 group-hover:bg-yellow-500/20 transition-colors"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Visit Link */}
                          <div className="relative z-10 mt-3 sm:mt-4">
                            <a
                              href={tool.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-yellow-400 hover:text-yellow-300 text-xs sm:text-sm font-medium transition-colors group-hover:translate-x-1 duration-300"
                            >
                              Try Tool <FiExternalLink className="ml-1" />
                            </a>
                          </div>
                        </div>

                        {/* Floating Window - Dynamic Positioning */}
                        {hoveredTool === `${category}-${index}` && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 10 }}
                            className="absolute -top-4 z-50 w-[90vw] max-w-[800px] sm:w-[800px] bg-black/95 border border-yellow-500/30 rounded-xl shadow-2xl shadow-yellow-500/20 backdrop-blur-sm overflow-hidden"
                            style={{
                              ...windowPosition,
                              // Add responsive adjustments
                              ...(screenSize === 'mobile' && {
                                left: '50%',
                                transform: 'translateX(-50%)',
                                right: 'auto'
                              }),
                              // Ensure window doesn't go off-screen
                              ...(screenSize === 'tablet' && {
                                ...(index % 2 === 0 && {
                                  left: '100%',
                                  transform: 'translateX(0)',
                                  right: 'auto'
                                }),
                                ...(index % 2 === 1 && {
                                  left: 'auto',
                                  transform: 'translateX(-100%)',
                                  right: '100%'
                                })
                              }),
                              ...(screenSize === 'desktop' && {
                                ...(index % 3 === 0 && {
                                  left: '100%',
                                  transform: 'translateX(0)',
                                  right: 'auto'
                                }),
                                ...(index % 3 === 1 && {
                                  left: '50%',
                                  transform: 'translateX(-50%)',
                                  right: 'auto'
                                }),
                                ...(index % 3 === 2 && {
                                  left: 'auto',
                                  transform: 'translateX(-100%)',
                                  right: '100%'
                                })
                              })
                            }}
                          >
                            {/* Header */}
                            <div className="flex items-center gap-2 sm:gap-3 p-4 sm:p-6 border-b border-yellow-500/20">
                              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r ${data.color} flex items-center justify-center`}>
                                <data.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-lg sm:text-xl font-semibold text-yellow-500 truncate">{tool.title}</h4>
                                <p className="text-xs sm:text-sm text-gray-400">{tool.type} Tool</p>
                              </div>
                              <a
                                href={tool.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-yellow-400 hover:text-yellow-300 text-xs sm:text-sm font-medium transition-colors flex-shrink-0"
                              >
                                Open <FiExternalLink className="ml-1" />
                              </a>
                            </div>

                            {/* Two Column Content - Responsive */}
                            <div className="flex flex-col lg:flex-row">
                              {/* Left Column - Project Information */}
                              <div className="flex-1 p-4 sm:p-6 lg:border-r border-yellow-500/20">
                                <h5 className="text-base sm:text-lg font-semibold text-yellow-400 mb-3">Project Information</h5>
                                
                                <p className="text-gray-300 text-xs sm:text-sm mb-4 leading-relaxed">
                                  {tool.description}
                                </p>
                                
                                {/* Features */}
                                <div className="mb-4">
                                  <h6 className="text-xs sm:text-sm font-semibold text-yellow-400 mb-2">Key Features</h6>
                                  <ul className="space-y-1">
                                    {tool.features.map((feature, idx) => (
                                      <li key={idx} className="text-xs text-gray-400 flex items-center gap-2">
                                        <FiStar className="w-3 h-3 text-yellow-500 flex-shrink-0" />
                                        <span>{feature}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                
                                {/* Tags */}
                                <div>
                                  <h6 className="text-xs sm:text-sm font-semibold text-yellow-400 mb-2">Technologies</h6>
                                  <div className="flex flex-wrap gap-1 sm:gap-2">
                                    {tool.tags.map((tag) => (
                                      <span
                                        key={tag}
                                        className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              {/* Right Column - Related Tools */}
                              <div className="w-full lg:w-80 p-4 sm:p-6 bg-black/50 lg:bg-black/50">
                                <h5 className="text-base sm:text-lg font-semibold text-yellow-400 mb-3">Related Tools</h5>
                                <div className="space-y-2 sm:space-y-3">
                                  {tool.relatedTools.map((relatedTool, idx) => (
                                    <a
                                      key={idx}
                                      href={relatedTool.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="block p-2 sm:p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/10 hover:bg-yellow-500/10 hover:border-yellow-500/20 transition-all duration-200"
                                    >
                                      <div className="flex items-center justify-between">
                                        <div className="min-w-0 flex-1">
                                          <h6 className="text-xs sm:text-sm font-medium text-yellow-400 truncate">{relatedTool.name}</h6>
                                          <p className="text-xs text-gray-500 truncate">{relatedTool.type}</p>
                                        </div>
                                        <FiExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0 ml-2" />
                                      </div>
                                    </a>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Footer - Additional Admin Information */}
                            <div className="p-4 sm:p-6 border-t border-yellow-500/20 bg-black/30">
                              <h5 className="text-xs sm:text-sm font-semibold text-yellow-400 mb-3 flex items-center gap-2">
                                <FiInfo className="w-3 h-3 sm:w-4 sm:h-4" />
                                Additional Information
                              </h5>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs">
                                <div className="flex items-center gap-2 text-gray-400">
                                  <FiClock className="w-3 h-3 text-yellow-500 flex-shrink-0" />
                                  <span>Updated: {tool.additionalInfo.lastUpdated}</span>
                                </div>
                                {tool.additionalInfo.downloads && (
                                  <div className="flex items-center gap-2 text-gray-400">
                                    <FiDownload className="w-3 h-3 text-yellow-500 flex-shrink-0" />
                                    <span>{tool.additionalInfo.downloads} downloads</span>
                                  </div>
                                )}
                                {tool.additionalInfo.stars && (
                                  <div className="flex items-center gap-2 text-gray-400">
                                    <FiStar className="w-3 h-3 text-yellow-500 flex-shrink-0" />
                                    <span>{tool.additionalInfo.stars} stars</span>
                                  </div>
                                )}
                                {tool.additionalInfo.rating && (
                                  <div className="flex items-center gap-2 text-gray-400">
                                    <FiUsers className="w-3 h-3 text-yellow-500 flex-shrink-0" />
                                    <span>Rating: {tool.additionalInfo.rating}</span>
                                  </div>
                                )}
                                {tool.additionalInfo.usage && (
                                  <div className="flex items-center gap-2 text-gray-400">
                                    <FiUsers className="w-3 h-3 text-yellow-500 flex-shrink-0" />
                                    <span>Usage: {tool.additionalInfo.usage}</span>
                                  </div>
                                )}
                                {tool.additionalInfo.forks && (
                                  <div className="flex items-center gap-2 text-gray-400">
                                    <FiUsers className="w-3 h-3 text-yellow-500 flex-shrink-0" />
                                    <span>{tool.additionalInfo.forks} forks</span>
                                  </div>
                                )}
                              </div>
                              
                              {/* Admin Notes */}
                              <div className="mt-3 p-2 sm:p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/10">
                                <h6 className="text-xs font-semibold text-yellow-400 mb-1 flex items-center gap-2">
                                  <FiTag className="w-3 h-3" />
                                  Admin Notes
                                </h6>
                                <p className="text-xs text-gray-400 leading-relaxed">
                                  {tool.additionalInfo.adminNotes}
                                </p>
                              </div>
                            </div>

                            {/* Dynamic Arrow Position */}
                            <div 
                              className="absolute -bottom-2 w-4 h-4 bg-black/95 border-b border-r border-yellow-500/30 rotate-45"
                              style={{
                                ...(screenSize === 'mobile' && {
                                  left: '50%',
                                  transform: 'translateX(-50%) rotate(45deg)'
                                }),
                                ...(screenSize === 'tablet' && {
                                  ...(index % 2 === 0 && {
                                    left: '20px',
                                    transform: 'rotate(45deg)'
                                  }),
                                  ...(index % 2 === 1 && {
                                    right: '20px',
                                    transform: 'rotate(45deg)'
                                  })
                                }),
                                ...(screenSize === 'desktop' && {
                                  ...(index % 3 === 0 && {
                                    left: '20px',
                                    transform: 'rotate(45deg)'
                                  }),
                                  ...(index % 3 === 1 && {
                                    left: '50%',
                                    transform: 'translateX(-50%) rotate(45deg)'
                                  }),
                                  ...(index % 3 === 2 && {
                                    right: '20px',
                                    transform: 'rotate(45deg)'
                                  })
                                })
                              }}
                            />
                          </motion.div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
} 