'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  ArrowRight, 
  Leaf, 
  Users, 
  Scale,
  ChevronDown
} from 'lucide-react';

// ========================================
// カスタムフック
// ========================================

// カウンターアニメーション用フック
const useCounter = (target: number, duration: number = 2000, inView: boolean = false) => {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // easeOut
      setCount(Math.floor(target * easeProgress));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [target, duration, inView]);

  return count;
};

// ========================================
// アニメーションコンポーネント
// ========================================

// フェードインアニメーション
const FadeInSection = ({ 
  children, 
  delay = 0,
  direction = 'up',
  className = ''
}: { 
  children: React.ReactNode; 
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const directionVariants = {
    up: { y: 50, x: 0 },
    down: { y: -50, x: 0 },
    left: { x: 50, y: 0 },
    right: { x: -50, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directionVariants[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// カウンターコンポーネント
const Counter = ({ target, suffix = '' }: { target: number; suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const count = useCounter(target, 2000, isInView);

  return (
    <span ref={ref} className="text-5xl md:text-7xl font-light font-montserrat">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

// ========================================
// メインコンポーネント
// ========================================

export default function CorporationPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // パララックス用
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);

  // ローディング完了後のアニメーション
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // スクロール検知
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // メニュー開閉時のbody overflow制御
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isMenuOpen]);

  const navLinks = [
    { href: '#philosophy', label: 'PHILOSOPHY' },
    { href: '#business', label: 'BUSINESS' },
    { href: '#sustainability', label: 'SUSTAINABILITY' },
    { href: '#news', label: 'NEWS' },
  ];

  const newsItems = [
    {
      date: '2024.11.15',
      category: 'PRESS',
      categoryColor: 'text-[#112240] border-[#112240]',
      title: '次世代型データセンターの建設着工に関するお知らせ'
    },
    {
      date: '2024.11.01',
      category: 'IR',
      categoryColor: 'text-gray-500 border-gray-300',
      title: '2025年3月期 第2四半期決算短信'
    },
    {
      date: '2024.10.28',
      category: 'SUSTAINABILITY',
      categoryColor: 'text-green-600 border-green-600',
      title: '「気候関連財務情報開示タスクフォース（TCFD）」提言への賛同表明'
    }
  ];

  return (
    <>
      {/* Google Fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400;600;800&family=Noto+Sans+JP:wght@300;400;500;700&display=swap');
        
        .font-montserrat {
          font-family: 'Montserrat', sans-serif;
        }
        .font-noto {
          font-family: 'Noto Sans JP', sans-serif;
        }
        
        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        ::-webkit-scrollbar-thumb {
          background: #8892B0;
          border-radius: 4px;
        }

        /* Hero Text Stroke */
        .hero-text-stroke {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
          color: transparent;
        }

        /* Clip Diagonal */
        .clip-diagonal {
          clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
        }

        /* Glass Effect */
        .glass {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.3);
        }
      `}</style>

      <div className="font-noto antialiased bg-[#f8f9fa] text-[#112240] overflow-x-hidden">
        {/* ===== Loading Screen ===== */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              className="fixed inset-0 z-[9999] bg-[#0A192F] flex justify-center items-center"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            >
              <motion.div
                className="text-[#E6F1FF] font-montserrat font-extralight tracking-[0.5em] text-2xl md:text-4xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, filter: 'blur(10px)' }}
                transition={{ duration: 1 }}
              >
                AESTHETIX GLOBAL
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===== Navigation ===== */}
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'glass py-4' : 'py-6'}`}>
          <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
            {/* Logo */}
            <a href="#" className="group flex items-center gap-2 z-50">
              <div className="w-8 h-8 bg-[#112240] text-white flex items-center justify-center font-bold font-montserrat text-lg">
                A
              </div>
              <span className="font-montserrat font-semibold tracking-[0.25em] text-[#112240] group-hover:opacity-70 transition-opacity">
                AESTHETIX
              </span>
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8 lg:gap-12">
              {navLinks.map((link) => (
                <a 
                  key={link.href}
                  href={link.href} 
                  className="text-sm font-montserrat tracking-[0.25em] hover:text-[#8892B0] transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a 
                href="#contact" 
                className="px-6 py-2 border border-[#112240] text-[#112240] text-sm font-montserrat tracking-[0.25em] hover:bg-[#112240] hover:text-white transition-all duration-300"
              >
                CONTACT
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden z-50 text-[#112240]"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </nav>

        {/* ===== Mobile Menu Overlay ===== */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="fixed inset-0 bg-white z-40 flex flex-col justify-center items-center gap-8"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-montserrat tracking-[0.25em] text-[#112240]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setIsMenuOpen(false)}
                className="text-xl font-montserrat tracking-[0.25em] text-[#112240] border-b border-[#112240] pb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                CONTACT
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===== Hero Section ===== */}
        <header className="relative w-full h-screen overflow-hidden bg-[#0A192F] text-white clip-diagonal">
          {/* Background Image with Parallax */}
          <motion.div 
            className="absolute inset-0 z-0"
            style={{ y: heroY }}
          >
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
              alt="Architecture" 
              className="w-full h-[120%] object-cover opacity-40 scale-105"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A192F]/90 to-transparent z-10" />

          <div className="relative z-20 container mx-auto px-6 md:px-12 h-full flex flex-col justify-center">
            <motion.h2
              className="text-sm md:text-base font-montserrat tracking-[0.3em] text-[#64FFDA] mb-4"
              initial={{ opacity: 0, y: 50 }}
              animate={!isLoading ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
            >
              EST. 1924 TOKYO
            </motion.h2>

            <motion.h1
              className="text-5xl md:text-7xl lg:text-9xl font-montserrat font-bold leading-tight"
              initial={{ opacity: 0, y: 80 }}
              animate={!isLoading ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.4 }}
            >
              DESIGNING <br />
              <span className="hero-text-stroke">THE FUTURE</span>
            </motion.h1>

            <motion.p
              className="mt-8 max-w-xl text-gray-300 text-base md:text-lg leading-loose font-light"
              initial={{ opacity: 0, x: -20 }}
              animate={!isLoading ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.8 }}
            >
              テクノロジーと美学の融合。<br />
              私たちAESTHETIXは、100年先の社会基盤を創造する<br />
              グローバル・イノベーション・カンパニーです。
            </motion.p>

            <motion.a
              href="#philosophy"
              className="mt-12 inline-flex items-center gap-4 text-white hover:text-[#64FFDA] transition-colors group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={!isLoading ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 1 }}
            >
              <span className="w-12 h-[1px] bg-white group-hover:bg-[#64FFDA] transition-colors" />
              <span className="font-montserrat tracking-[0.25em] text-sm">SCROLL DOWN</span>
            </motion.a>
          </div>

          {/* Scroll Indicator */}
          <motion.div 
            className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="text-white/50" size={32} />
          </motion.div>
        </header>

        {/* ===== Philosophy Section ===== */}
        <section id="philosophy" className="py-24 md:py-40 bg-white">
          <div className="container mx-auto px-6 md:px-12">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
              <FadeInSection className="lg:w-1/3" direction="left">
                <span className="block text-[#112240] font-montserrat font-bold text-xs tracking-[0.2em] mb-4 border-l-2 border-[#112240] pl-4">
                  OUR PHILOSOPHY
                </span>
                <h2 className="text-3xl md:text-5xl font-bold leading-snug text-[#112240]">
                  美意識が、<br />世界を変える。
                </h2>
              </FadeInSection>

              <FadeInSection className="lg:w-2/3 space-y-8" delay={0.2} direction="right">
                <p className="text-base md:text-lg leading-loose text-gray-600 font-light text-justify">
                  複雑化する現代社会において、真の豊かさとは何か。私たちは創業以来、機能性だけでなく「美しさ」こそが持続可能な価値を生み出す源泉であると信じてきました。
                  <br /><br />
                  都市開発から先端マテリアル、そしてAIソリューションまで。AESTHETIXグループは、論理と感性を高度に統合し、まだ見ぬ未来のスタンダードを実装し続けます。
                </p>
                <div className="pt-8">
                  <a href="#" className="inline-flex items-center gap-2 border-b border-[#112240] pb-1 text-[#112240] font-montserrat tracking-[0.25em] hover:text-[#8892B0] hover:border-[#8892B0] transition-colors">
                    READ MORE <ArrowRight size={16} />
                  </a>
                </div>
              </FadeInSection>
            </div>
          </div>
        </section>

        {/* ===== Key Figures Section ===== */}
        <section className="relative py-32 bg-[#112240] text-white overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[#172a4f] -skew-x-12 transform origin-top translate-x-1/4" />

          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <FadeInSection delay={0}>
                <p className="text-[#64FFDA] font-montserrat text-sm tracking-[0.25em] mb-2">FOUNDED</p>
                <Counter target={1924} />
              </FadeInSection>

              <FadeInSection delay={0.2}>
                <p className="text-[#64FFDA] font-montserrat text-sm tracking-[0.25em] mb-2">GLOBAL LOCATIONS</p>
                <Counter target={42} />
              </FadeInSection>

              <FadeInSection delay={0.4}>
                <p className="text-[#64FFDA] font-montserrat text-sm tracking-[0.25em] mb-2">EMPLOYEES</p>
                <Counter target={15000} suffix="+" />
              </FadeInSection>
            </div>
          </div>
        </section>

        {/* ===== Business Section ===== */}
        <section id="business" className="py-24 md:py-40 bg-[#f8f9fa]">
          <div className="container mx-auto px-6 md:px-12">
            <div className="mb-20 flex flex-col md:flex-row justify-between items-end gap-8">
              <FadeInSection direction="left">
                <span className="block text-[#112240] font-montserrat font-bold text-xs tracking-[0.2em] mb-4 border-l-2 border-[#112240] pl-4">
                  BUSINESS DOMAINS
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-[#112240]">事業領域</h2>
              </FadeInSection>
              <FadeInSection delay={0.2} direction="right">
                <p className="text-gray-500 text-sm max-w-md">
                  多角的なアプローチで、グローバルな課題解決に取り組んでいます。
                </p>
              </FadeInSection>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <FadeInSection delay={0}>
                <div className="group relative overflow-hidden h-[500px] cursor-pointer">
                  <img 
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    alt="Urban Development"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/90 via-transparent to-transparent opacity-90" />
                  <div className="absolute bottom-0 left-0 p-8 w-full transform transition-transform duration-500 group-hover:-translate-y-4">
                    <span className="text-[#64FFDA] font-montserrat text-xs tracking-[0.25em] block mb-2">01</span>
                    <h3 className="text-2xl text-white font-bold mb-4">Urban Development</h3>
                    <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-2">
                      次世代型スマートシティの構築と、環境共生型アーキテクチャの提案。
                    </p>
                    <div className="mt-6 w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </FadeInSection>

              {/* Card 2 */}
              <FadeInSection delay={0.15}>
                <div className="group relative overflow-hidden h-[500px] cursor-pointer md:mt-16">
                  <img 
                    src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    alt="Advanced Tech"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/90 via-transparent to-transparent opacity-90" />
                  <div className="absolute bottom-0 left-0 p-8 w-full transform transition-transform duration-500 group-hover:-translate-y-4">
                    <span className="text-[#64FFDA] font-montserrat text-xs tracking-[0.25em] block mb-2">02</span>
                    <h3 className="text-2xl text-white font-bold mb-4">Advanced Tech</h3>
                    <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-2">
                      AI、量子コンピューティング分野への投資と実用化支援。
                    </p>
                    <div className="mt-6 w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </FadeInSection>

              {/* Card 3 */}
              <FadeInSection delay={0.3}>
                <div className="group relative overflow-hidden h-[500px] cursor-pointer">
                  <img 
                    src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=2070&auto=format&fit=crop" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    alt="Energy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/90 via-transparent to-transparent opacity-90" />
                  <div className="absolute bottom-0 left-0 p-8 w-full transform transition-transform duration-500 group-hover:-translate-y-4">
                    <span className="text-[#64FFDA] font-montserrat text-xs tracking-[0.25em] block mb-2">03</span>
                    <h3 className="text-2xl text-white font-bold mb-4">Green Energy</h3>
                    <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-2">
                      再生可能エネルギーインフラの整備と水素社会の実現に向けて。
                    </p>
                    <div className="mt-6 w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </FadeInSection>
            </div>
          </div>
        </section>

        {/* ===== Sustainability Section ===== */}
        <section id="sustainability" className="py-24 md:py-40 bg-white overflow-hidden">
          <div className="container mx-auto px-6 md:px-12">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
              {/* Image Side */}
              <FadeInSection className="lg:w-1/2 relative" direction="left">
                <div className="relative overflow-hidden group">
                  <img 
                    src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070&auto=format&fit=crop" 
                    alt="Sustainability" 
                    className="w-full h-[600px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#112240]/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                {/* Decorative Element */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#E6F1FF] -z-10" />
                <div className="absolute -top-10 -left-10 w-full h-full border border-gray-200 -z-10" />
              </FadeInSection>

              {/* Content Side */}
              <FadeInSection className="lg:w-1/2" delay={0.2} direction="right">
                <span className="block text-[#112240] font-montserrat font-bold text-xs tracking-[0.2em] mb-4 border-l-2 border-[#112240] pl-4">
                  SUSTAINABILITY
                </span>
                <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-8 text-[#112240]">
                  100年後の地球に、<br />
                  責任を持つ。
                </h2>
                <p className="text-base md:text-lg leading-loose text-gray-600 font-light mb-8 text-justify">
                  私たちは、技術革新と環境保全は対立するものではなく、共鳴しあうものだと考えます。<br />
                  カーボンニュートラルへの挑戦、ダイバーシティの推進、そして透明性の高いガバナンス。<br />
                  AESTHETIXは、事業活動のすべてにおいて「持続可能性」を最優先事項として掲げています。
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4 group cursor-pointer">
                    <div className="w-12 h-12 flex-shrink-0 bg-[#E6F1FF] flex items-center justify-center text-[#112240] rounded-full group-hover:bg-[#112240] group-hover:text-white transition-colors duration-300">
                      <Leaf size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-[#112240] mb-1">Environmental</h4>
                      <p className="text-sm text-gray-500">2050年までのカーボンニュートラル実現に向けたロードマップ</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group cursor-pointer">
                    <div className="w-12 h-12 flex-shrink-0 bg-[#E6F1FF] flex items-center justify-center text-[#112240] rounded-full group-hover:bg-[#112240] group-hover:text-white transition-colors duration-300">
                      <Users size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-[#112240] mb-1">Social</h4>
                      <p className="text-sm text-gray-500">多様な人材が能力を最大限発揮できる環境の整備</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group cursor-pointer">
                    <div className="w-12 h-12 flex-shrink-0 bg-[#E6F1FF] flex items-center justify-center text-[#112240] rounded-full group-hover:bg-[#112240] group-hover:text-white transition-colors duration-300">
                      <Scale size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-[#112240] mb-1">Governance</h4>
                      <p className="text-sm text-gray-500">透明性と公正性を確保する強固なコーポレートガバナンス</p>
                    </div>
                  </div>
                </div>

                <div className="pt-10">
                  <a href="#" className="inline-block border border-[#112240] px-8 py-3 text-[#112240] font-montserrat tracking-[0.25em] text-sm hover:bg-[#112240] hover:text-white transition-all duration-300">
                    VIEW SUSTAINABILITY
                  </a>
                </div>
              </FadeInSection>
            </div>
          </div>
        </section>

        {/* ===== News Section ===== */}
        <section id="news" className="py-24 md:py-32 bg-white">
          <div className="container mx-auto px-6 md:px-12 max-w-5xl">
            <FadeInSection className="mb-16 text-center">
              <span className="text-[#112240] font-montserrat font-bold text-xs tracking-[0.2em] mb-2 block">
                LATEST NEWS
              </span>
              <h2 className="text-3xl font-bold text-[#112240]">ニュースリリース</h2>
            </FadeInSection>

            <div className="space-y-0 border-t border-gray-200">
              {newsItems.map((item, index) => (
                <FadeInSection key={index} delay={index * 0.1}>
                  <a 
                    href="#" 
                    className="group flex flex-col md:flex-row md:items-center py-8 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-300 px-4"
                  >
                    <div className="md:w-1/4 mb-2 md:mb-0">
                      <time className="text-sm font-montserrat text-gray-400">{item.date}</time>
                      <span className={`ml-4 text-xs font-bold border px-2 py-0.5 ${item.categoryColor}`}>
                        {item.category}
                      </span>
                    </div>
                    <div className="md:w-3/4 flex justify-between items-center">
                      <p className="text-base font-medium text-[#112240] group-hover:translate-x-2 transition-transform duration-300">
                        {item.title}
                      </p>
                      <ArrowRight 
                        className="text-[#112240] opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0" 
                        size={18} 
                      />
                    </div>
                  </a>
                </FadeInSection>
              ))}
            </div>

            <FadeInSection className="mt-12 text-center" delay={0.3}>
              <a href="#" className="inline-block text-sm font-montserrat tracking-[0.25em] text-[#8892B0] hover:text-[#112240] transition-colors border-b border-transparent hover:border-[#112240]">
                VIEW ALL NEWS
              </a>
            </FadeInSection>
          </div>
        </section>

        {/* ===== Contact / Footer Section ===== */}
        <section id="contact" className="bg-[#0A192F] text-white pt-24 pb-12">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
              <FadeInSection direction="left">
                <h2 className="text-4xl md:text-6xl font-montserrat font-bold mb-8">
                  Let&apos;s build<br />the future.
                </h2>
                <p className="text-gray-400 mb-8 max-w-md">
                  事業に関するお問い合わせ、協業のご相談、採用情報についてはこちらからご連絡ください。
                </p>
                <a 
                  href="#" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#0A192F] font-bold font-montserrat tracking-[0.25em] hover:bg-[#64FFDA] transition-colors duration-300"
                >
                  CONTACT US
                </a>
              </FadeInSection>

              <FadeInSection direction="right" delay={0.2}>
                <div className="grid grid-cols-2 gap-8 text-sm text-gray-400 font-light">
                  <ul>
                    <li className="mb-4 text-white font-bold font-montserrat">CORPORATE</li>
                    <li className="mb-2"><a href="#" className="hover:text-[#64FFDA] transition-colors">会社概要</a></li>
                    <li className="mb-2"><a href="#" className="hover:text-[#64FFDA] transition-colors">役員一覧</a></li>
                    <li className="mb-2"><a href="#" className="hover:text-[#64FFDA] transition-colors">グループ企業</a></li>
                    <li className="mb-2"><a href="#" className="hover:text-[#64FFDA] transition-colors">沿革</a></li>
                  </ul>
                  <ul>
                    <li className="mb-4 text-white font-bold font-montserrat">INVESTORS</li>
                    <li className="mb-2"><a href="#" className="hover:text-[#64FFDA] transition-colors">経営方針</a></li>
                    <li className="mb-2"><a href="#" className="hover:text-[#64FFDA] transition-colors">財務・業績情報</a></li>
                    <li className="mb-2"><a href="#" className="hover:text-[#64FFDA] transition-colors">IRライブラリ</a></li>
                    <li className="mb-2"><a href="#" className="hover:text-[#64FFDA] transition-colors">株式情報</a></li>
                  </ul>
                  <ul>
                    <li className="mb-4 text-white font-bold font-montserrat">SUSTAINABILITY</li>
                    <li className="mb-2"><a href="#" className="hover:text-[#64FFDA] transition-colors">トップメッセージ</a></li>
                    <li className="mb-2"><a href="#" className="hover:text-[#64FFDA] transition-colors">環境への取り組み</a></li>
                    <li className="mb-2"><a href="#" className="hover:text-[#64FFDA] transition-colors">社会への取り組み</a></li>
                    <li className="mb-2"><a href="#" className="hover:text-[#64FFDA] transition-colors">ガバナンス</a></li>
                  </ul>
                  <ul>
                    <li className="mb-4 text-white font-bold font-montserrat">RECRUIT</li>
                    <li className="mb-2"><a href="#" className="hover:text-[#64FFDA] transition-colors">新卒採用</a></li>
                    <li className="mb-2"><a href="#" className="hover:text-[#64FFDA] transition-colors">キャリア採用</a></li>
                  </ul>
                </div>
              </FadeInSection>
            </div>

            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
              <p>&copy; 2024 AESTHETIX GLOBAL HOLDINGS. All Rights Reserved.</p>
              <div className="flex gap-6 mt-4 md:mt-0 font-montserrat">
                <a href="#" className="hover:text-white transition-colors">PRIVACY POLICY</a>
                <a href="#" className="hover:text-white transition-colors">TERMS OF USE</a>
                <a href="#" className="hover:text-white transition-colors">SITEMAP</a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

