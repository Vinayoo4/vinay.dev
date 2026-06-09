import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-yellow-500 mb-8">Let's Connect</h2>
          <p className="text-gray-400 mb-8">
            I'm always interested in hearing about new projects and opportunities.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a
              href="mailto:contact@vinay.dev"
              className="flex items-center justify-center space-x-3 p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/10 hover:bg-yellow-500/10 transition-colors"
            >
              <Mail className="w-6 h-6 text-yellow-500" />
              <span className="text-gray-300">contact@vinay.dev</span>
            </a>
            <a
              href="#"
              className="flex items-center justify-center space-x-3 p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/10 hover:bg-yellow-500/10 transition-colors"
            >
              <MapPin className="w-6 h-6 text-yellow-500" />
              <span className="text-gray-300">Haryana, IN</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 