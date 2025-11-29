"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Globe, FileText, Smartphone, Settings } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Webサイト制作",
    description: "企業サイトからコーポレートサイトまで、目的に応じたWebサイトを制作します。",
  },
  {
    icon: FileText,
    title: "LP（ランディングページ）制作",
    description: "コンバージョンを最大化するランディングページを制作します。",
  },
  {
    icon: Smartphone,
    title: "レスポンシブ対応",
    description: "スマートフォン、タブレット、PCなど、あらゆるデバイスで最適な表示を実現します。",
  },
  {
    icon: Settings,
    title: "保守・運用サポート",
    description: "サイト公開後の更新やメンテナンス、SEO対策などのサポートを提供します。",
  },
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="services"
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
          Services
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                className="group relative bg-slate-700/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-slate-600/50 hover:border-orange-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/20 hover:-translate-y-2"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <div className="mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 text-white group-hover:text-orange-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

