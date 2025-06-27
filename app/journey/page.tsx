"use client";

import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Journey() {
  const experiences = [
    {
      title: "Senior Full Stack Developer",
      company: "TShree Nandi Marketing Services",
      companyLink: "https://techinnovators.com",
      period: "2021 - Present",
      description: `Leading development of enterprise-scale applications using modern technologies.
        Responsible for architecting and implementing scalable solutions that serve millions of users.
        Mentoring junior developers and establishing best practices across the development team.`,
      achievements: [
        {
          text: "Reduced application load time by 60% through performance optimization",
          link: "https://web.dev/measure"
        },
        {
          text: "Implemented microservices architecture leading to 40% improved scalability",
          link: "https://microservices.io"
        },
        {
          text: "Mentored 10+ junior developers who are now senior developers",
          link: "https://mentorship.guide"
        },
        {
          text: "Introduced automated testing resulting in 80% reduction in production bugs",
          link: "https://www.cypress.io"
        },
        {
          text: "Led the migration to Next.js improving SEO scores by 30%",
          link: "https://nextjs.org/learn"
        }
      ]
    },
    {
      title: "Full Stack Developer",
      company: "Digital Solutions Ltd.",
      companyLink: "https://digitalsolutions.com",
      period: "2019 - 2021",
      description: `Developed and maintained multiple client projects using React and Node.js.
        Worked directly with clients to gather requirements and deliver solutions.
        Implemented automated testing and continuous integration pipelines.`,
      achievements: [
        {
          text: "Delivered 15+ successful projects on time and within budget",
          link: "https://www.atlassian.com/software/jira"
        },
        {
          text: "Introduced automated testing reducing QA time by 50%",
          link: "https://www.selenium.dev"
        },
        {
          text: "Improved code quality standards leading to 70% fewer bugs",
          link: "https://sonarcloud.io"
        },
        {
          text: "Optimized database queries resulting in 45% faster response times",
          link: "https://www.postgresql.org/docs/performance.html"
        },
        {
          text: "Implemented real-time features using WebSocket technology",
          link: "https://socket.io"
        }
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-yellow-500 mb-6">Professional Journey</h1>
          <p className="text-gray-400 max-w-3xl mx-auto">
            A timeline of my professional growth and achievements in the tech industry.
          </p>
        </motion.div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative pl-8 border-l-2 border-yellow-500/20"
            >
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-yellow-500" />
              <motion.div 
                className="bg-yellow-500/5 rounded-xl p-6 border border-yellow-500/10 transition-all duration-300 hover:bg-yellow-500/10 hover:border-yellow-500/30 hover:shadow-lg hover:shadow-yellow-500/5 group"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-yellow-500 group-hover:text-yellow-400 transition-colors">{exp.title}</h3>
                  <span className="text-gray-500 flex items-center group-hover:text-yellow-500/70 transition-colors">
                    <Calendar className="w-4 h-4 mr-2" />
                    {exp.period}
                  </span>
                </div>
                <Link 
                  href={exp.companyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-yellow-500 transition-colors mb-4 block group-hover:text-yellow-500/70"
                >
                  {exp.company}
                </Link>
                <p className="text-gray-500 mb-4 whitespace-pre-line group-hover:text-gray-400 transition-colors">{exp.description}</p>
                <ul className="space-y-2">
                  {exp.achievements.map((achievement, i) => (
                    <motion.li 
                      key={i}
                      whileHover={{ x: 10 }}
                      className="text-gray-400 flex items-start space-x-2 group/item"
                    >
                      <ArrowRight className="w-4 h-4 text-yellow-500 mt-1 flex-shrink-0 group-hover/item:text-yellow-400 transition-colors" />
                      <Link
                        href={achievement.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-yellow-500 transition-colors flex-1 group-hover/item:text-gray-300"
                      >
                        {achievement.text}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}