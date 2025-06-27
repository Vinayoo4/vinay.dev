import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";

const experiences = [
  {
    title: "Senior Full Stack Developer",
    company: "Tech Innovators Inc.",
    period: "2021 - Present",
    description: "Leading development of enterprise-scale applications using modern technologies.",
    achievements: [
      "Reduced application load time by 60%",
      "Implemented microservices architecture",
      "Mentored junior developers"
    ]
  },
  {
    title: "Full Stack Developer",
    company: "Digital Solutions Ltd.",
    period: "2019 - 2021",
    description: "Developed and maintained multiple client projects using React and Node.js.",
    achievements: [
      "Delivered 15+ successful projects",
      "Introduced automated testing",
      "Improved code quality standards"
    ]
  }
];

export default function JourneySection() {
  return (
    <section id="journey" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-yellow-500">Professional Journey</h2>
          <p className="mt-4 text-gray-400">Building success through experience</p>
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
              <div className="bg-yellow-500/5 rounded-xl p-6 border border-yellow-500/10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-yellow-500">{exp.title}</h3>
                  <span className="text-gray-500 flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {exp.period}
                  </span>
                </div>
                <p className="text-gray-400 mb-4">{exp.company}</p>
                <p className="text-gray-500 mb-4">{exp.description}</p>
                <ul className="space-y-2">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="text-gray-400 flex items-start space-x-2">
                      <ArrowRight className="w-4 h-4 text-yellow-500 mt-1 flex-shrink-0" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 