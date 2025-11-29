"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className="py-20 sm:py-32 bg-slate-900 text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-12 text-center bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
            About
          </h2>

          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <motion.div
              className="flex-shrink-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-gradient-to-br from-orange-500 to-purple-600 p-1">
                <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-slate-700 flex items-center justify-center text-slate-400">
                    <span className="text-4xl">👤</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="flex-1 text-center md:text-left"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-4">
                お客様のビジネスをWebの力で成長させるお手伝いをします。
              </p>
              <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
                最新の技術とクリエイティブなデザインで、あなたのビジネスに最適なWebソリューションを提供します。
                ユーザー体験を重視し、成果につながるWebサイトを制作いたします。
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

