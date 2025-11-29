"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";

const works = [
  {
    title: "飲食店向けWebサイト",
    category: "飲食店",
    description: "レストラン向けのレスポンシブWebサイト",
    image: "/placeholder-work-1.jpg",
    link: "#",
  },
  {
    title: "士業向けコーポレートサイト",
    category: "士業",
    description: "法律事務所向けのプロフェッショナルなサイト",
    image: "/placeholder-work-2.jpg",
    link: "#",
  },
  {
    title: "ECサイト構築",
    category: "EC",
    description: "オンラインストアの構築とデザイン",
    image: "/placeholder-work-3.jpg",
    link: "#",
  },
  {
    title: "ブランディングサイト",
    category: "ブランディング",
    description: "企業ブランドを表現するクリエイティブなサイト",
    image: "/placeholder-work-4.jpg",
    link: "#",
  },
];

export default function Works() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="works"
      ref={ref}
      className="py-20 sm:py-32 bg-slate-900 text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl sm:text-5xl md:text-6xl font-black mb-16 text-center bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          Works
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {works.map((work, index) => (
            <motion.a
              key={work.title}
              href={work.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block bg-slate-800 rounded-2xl overflow-hidden border border-slate-700/50 hover:border-orange-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/20"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <div className="aspect-video bg-gradient-to-br from-slate-700 to-slate-800 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-slate-500 text-4xl">
                  🖼️
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ExternalLink className="w-6 h-6 text-orange-500" />
                </div>
              </div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 bg-orange-500/20 text-orange-400 text-xs font-semibold rounded-full mb-3">
                  {work.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white group-hover:text-orange-400 transition-colors">
                  {work.title}
                </h3>
                <p className="text-slate-400 text-sm sm:text-base">
                  {work.description}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

