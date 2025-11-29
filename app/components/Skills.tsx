"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skills = [
  { name: "HTML / CSS", level: 95 },
  { name: "JavaScript / TypeScript", level: 90 },
  { name: "React / Next.js", level: 85 },
  { name: "Tailwind CSS", level: 90 },
  { name: "Figma", level: 80 },
  { name: "Git / GitHub", level: 85 },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="skills"
      ref={ref}
      className="py-20 sm:py-32 bg-slate-800 text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl sm:text-5xl md:text-6xl font-black mb-16 text-center bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          Skills
        </motion.h2>

        <div className="max-w-3xl mx-auto space-y-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-semibold text-white">
                  {skill.name}
                </span>
                <span className="text-sm text-slate-400">{skill.level}%</span>
              </div>
              <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                  transition={{ duration: 1.5, delay: index * 0.1 + 0.3, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* タグ形式の表示も追加 */}
        <motion.div
          className="mt-16 flex flex-wrap justify-center gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {skills.map((skill) => (
            <span
              key={skill.name}
              className="px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-full text-sm sm:text-base text-slate-300 hover:bg-orange-500/20 hover:border-orange-500/50 hover:text-orange-400 transition-all duration-300"
            >
              {skill.name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

