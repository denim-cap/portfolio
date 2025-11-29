'use client';

import React, { useEffect, useRef, useState, ReactNode } from 'react';
import { 
  Github, 
  Linkedin, 
  Instagram,
  ExternalLink, 
  ChevronDown,
  Palette,
  Globe,
  Database
} from 'lucide-react';

// X (formerly Twitter) icon component
const XIcon = ({ size = 24 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// TikTok icon component
const TikTokIcon = ({ size = 24 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

// スクロールアニメーション用フック
const useScrollAnimation = (threshold = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // 初期チェック: すでに画面内にあるかどうか
    const checkInitialVisibility = () => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setIsVisible(true);
        return true;
      }
      return false;
    };

    // 初期チェックで表示されていればオブザーバー不要
    if (checkInitialVisibility()) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};

// フェードインアニメーションコンポーネント
const FadeIn = ({ 
  children, 
  delay = 0, 
  direction = 'up',
  className = '' 
}: { 
  children: ReactNode; 
  delay?: number; 
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}) => {
  const { ref, isVisible } = useScrollAnimation();
  
  const directionStyles = {
    up: 'translate-y-10',
    down: '-translate-y-10',
    left: 'translate-x-10',
    right: '-translate-x-10',
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className} ${
        isVisible 
          ? 'opacity-100 translate-x-0 translate-y-0' 
          : `opacity-0 ${directionStyles[direction]}`
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// タイピングアニメーションコンポーネント
const TypeWriter = ({ text, className = '' }: { text: string; className?: string }) => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const { ref, isVisible } = useScrollAnimation();

  useEffect(() => {
    if (!isVisible) return;
    
    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [isVisible, text]);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorTimer);
  }, []);

  return (
    <span ref={ref} className={className}>
      {displayText}
      <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} text-orange-400`}>|</span>
    </span>
  );
};

// シマーテキストコンポーネント（光が流れる効果）
const ShimmerText = ({ children, className = '' }: { children: ReactNode; className?: string }) => {
  return (
    <span className={`shimmer-text relative inline-block ${className}`}>
      {children}
    </span>
  );
};

// グローテキストコンポーネント（ゆっくり光る効果）
const GlowText = ({ children, className = '' }: { children: ReactNode; className?: string }) => {
  return (
    <span className={`glow-text relative inline-block ${className}`}>
      {children}
    </span>
  );
};

// スタガーアニメーション用コンテナ
const StaggerContainer = ({ children, className = '' }: { children: ReactNode; className?: string }) => {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <div ref={ref} className={`${className} ${isVisible ? 'stagger-visible' : 'stagger-hidden'}`}>
      {children}
    </div>
  );
};

// 文字がバラバラに出現するアニメーション
const ScrambleText = ({ text, className = '' }: { text: string; className?: string }) => {
  const [displayText, setDisplayText] = useState(text);
  const { ref, isVisible } = useScrollAnimation();
  const chars = '01!@#$%^&*()_+-=[]{}|;:,.<>?';

  useEffect(() => {
    if (!isVisible) return;

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            if (char === ' ') return ' ';
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [isVisible, text]);

  return (
    <span ref={ref} className={`font-mono ${className}`}>
      {displayText}
    </span>
  );
};

// マトリックス風バイナリ背景コンポーネント
const BinaryBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // キャンバスサイズを設定
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 文字のサイズと列の設定
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    
    // 各列のy位置を追跡
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    // 色のバリエーション（オレンジ系）
    const colors = [
      '#ff6b00', // オレンジ
      '#ff9500', // ゴールデンオレンジ
      '#ffb347', // ライトオレンジ
      '#ff4500', // レッドオレンジ
    ];

    const draw = () => {
      // 半透明の黒で覆い、フェード効果を作る
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px "Courier New", monospace`;

      for (let i = 0; i < drops.length; i++) {
        // 0か1をランダムに選択
        const text = Math.random() > 0.5 ? '1' : '0';
        
        // 列ごとに異なる色を割り当て（ただし変化も加える）
        const colorIndex = Math.floor(Math.random() * colors.length);
        const alpha = 0.8 + Math.random() * 0.2;
        ctx.fillStyle = colors[colorIndex];
        ctx.globalAlpha = alpha;

        // 文字を描画
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        
        ctx.fillText(text, x, y);

        // 先頭の文字をより明るく
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = 0.9;
        ctx.fillText(text, x, y);
        
        ctx.globalAlpha = 1;

        // 画面外に出たらリセット（ランダム性を加える）
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        // 落下速度（列によって異なる）
        drops[i] += 0.5 + Math.random() * 0.5;
      }
    };

    // アニメーションループ
    const interval = setInterval(draw, 50);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 50%, #000000 100%)' }}
    />
  );
};

const Portfolio = () => {
  // Contact form state
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: 'メッセージを送信しました！' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus({ type: 'error', message: data.error || '送信に失敗しました' });
      }
    } catch {
      setSubmitStatus({ type: 'error', message: 'ネットワークエラーが発生しました' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen text-slate-200 font-sans selection:bg-orange-500 selection:text-white overflow-x-hidden">
      {/* ===== バイナリ背景 ===== */}
      <BinaryBackground />
      
      {/* グロー効果のオーバーレイ */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-amber-500/10 rounded-full blur-[100px]" />
      </div>

      {/* Hero Section */}
      <section id="home" className="relative z-10 min-h-screen flex flex-col justify-center items-center px-6">
        <div className="text-center space-y-6">
          <FadeIn delay={0}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-orange-400 via-amber-500 to-yellow-500 bg-clip-text text-transparent animate-gradient-x glow-text-hero">
              Takuya Yamaguchi
            </h1>
          </FadeIn>
          
          <FadeIn delay={300}>
            <p className="text-xl md:text-2xl text-slate-400 tracking-wide">
              <TypeWriter text="Web Creator / Developer" />
            </p>
          </FadeIn>
          
          <FadeIn delay={600}>
            <p className="text-lg text-orange-400 font-medium tracking-wider animate-pulse-slow">
              <ScrambleText text="denimcap" />
            </p>
          </FadeIn>
        </div>

        <div className="absolute bottom-10 animate-bounce">
          <ChevronDown className="text-slate-500" size={32} />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <FadeIn direction="left">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 to-amber-600 rounded-2xl opacity-20 group-hover:opacity-40 blur-xl transition duration-500"></div>
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-sm shadow-2xl">
                <img 
                  src="/favicon_d.png" 
                  alt="Takuya Yamaguchi"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </FadeIn>
          
          <div className="space-y-8">
            <FadeIn direction="right">
              <h2 className="text-3xl md:text-5xl font-bold">
                <ShimmerText>About</ShimmerText> <span className="text-orange-400">Me</span>
              </h2>
            </FadeIn>
            <StaggerContainer className="space-y-4 text-slate-400 text-lg leading-relaxed">
              <FadeIn delay={100} direction="right">
                <p className="stagger-item">
                  こんにちは。Webクリエイター/デベロッパーのTakuya Yamaguchiです。
                </p>
              </FadeIn>
              <FadeIn delay={200} direction="right">
                <p className="stagger-item">
                  「機能性」と「美しさ」の融合をテーマに、ReactやTypeScriptを用いたモダンな開発と、
                  細部までこだわったインタラクションデザインを得意としています。
                </p>
              </FadeIn>
              <FadeIn delay={300} direction="right">
                <p className="stagger-item">
                  新しい技術への探究心は尽きず、常にユーザーにとって最適なソリューションを模索し続けています。
                  コードを書くことは、私にとってデジタル空間における建築のようなものです。
                </p>
              </FadeIn>
            </StaggerContainer>
            
            <FadeIn delay={400} direction="up">
              <div className="flex gap-4 pt-4">
                <a href="https://github.com/denim-cap/portfolio" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-800/50 backdrop-blur-sm rounded-full hover:bg-slate-700/50 hover:text-orange-400 transition-colors hover:scale-110 transform duration-300">
                  <Github size={24} />
                </a>
                <a href="https://x.com/denimcap1947" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-800/50 backdrop-blur-sm rounded-full hover:bg-slate-700/50 hover:text-orange-400 transition-colors hover:scale-110 transform duration-300">
                  <XIcon size={24} />
                </a>
                <a href="https://www.linkedin.com/in/takuya-yamaguchi-a9a57339b/" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-800/50 backdrop-blur-sm rounded-full hover:bg-slate-700/50 hover:text-orange-400 transition-colors hover:scale-110 transform duration-300">
                  <Linkedin size={24} />
                </a>
                <a href="https://www.instagram.com/denimcap1947/" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-800/50 backdrop-blur-sm rounded-full hover:bg-slate-700/50 hover:text-orange-400 transition-colors hover:scale-110 transform duration-300">
                  <Instagram size={24} />
                </a>
                <a href="https://www.tiktok.com/@denim_cap" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-800/50 backdrop-blur-sm rounded-full hover:bg-slate-700/50 hover:text-orange-400 transition-colors hover:scale-110 transform duration-300">
                  <TikTokIcon size={24} />
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <FadeIn>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                <ShimmerText>My</ShimmerText> <span className="text-amber-500">Skills</span>
              </h2>
            </FadeIn>
            <FadeIn delay={200}>
              <p className="text-slate-400 max-w-2xl mx-auto">
                プロジェクトの要件に応じて、最適な技術選定を行います。
                デザインからバックエンド連携まで、一貫した開発が可能です。
              </p>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Frontend */}
            <FadeIn delay={0} direction="up">
              <div className="bg-slate-900/30 backdrop-blur-md border border-white/5 rounded-2xl p-8 hover:border-orange-500/30 transition-all duration-300 group card-hover">
                <div className="w-14 h-14 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-400 mb-6 group-hover:scale-110 transition-transform group-hover:animate-pulse-glow">
                  <Globe size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4"><ScrambleText text="Frontend" /></h3>
                <ul className="space-y-2 text-slate-400">
                  <li className="flex items-center gap-2 skill-item"><div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-ping-slow"></div>React / Next.js</li>
                  <li className="flex items-center gap-2 skill-item" style={{ animationDelay: '100ms' }}><div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>TypeScript</li>
                  <li className="flex items-center gap-2 skill-item" style={{ animationDelay: '200ms' }}><div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>Tailwind CSS / SCSS</li>
                  <li className="flex items-center gap-2 skill-item" style={{ animationDelay: '300ms' }}><div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>Framer Motion / GSAP</li>
                  <li className="flex items-center gap-2 skill-item" style={{ animationDelay: '400ms' }}><div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>Three.js / WebGL</li>
                </ul>
              </div>
            </FadeIn>

            {/* Design */}
            <FadeIn delay={150} direction="up">
              <div className="bg-slate-900/30 backdrop-blur-md border border-white/5 rounded-2xl p-8 hover:border-amber-500/30 transition-all duration-300 group card-hover">
                <div className="w-14 h-14 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform group-hover:animate-pulse-glow">
                  <Palette size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4"><ScrambleText text="Design" /></h3>
                <ul className="space-y-2 text-slate-400">
                  <li className="flex items-center gap-2 skill-item"><div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>Figma / Adobe XD</li>
                  <li className="flex items-center gap-2 skill-item" style={{ animationDelay: '100ms' }}><div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>UI / UX Design</li>
                  <li className="flex items-center gap-2 skill-item" style={{ animationDelay: '200ms' }}><div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>Responsive Layout</li>
                  <li className="flex items-center gap-2 skill-item" style={{ animationDelay: '300ms' }}><div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>Iconography</li>
                  <li className="flex items-center gap-2 skill-item" style={{ animationDelay: '400ms' }}><div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>Prototyping</li>
                </ul>
              </div>
            </FadeIn>

            {/* Backend & Others */}
            <FadeIn delay={300} direction="up">
              <div className="bg-slate-900/30 backdrop-blur-md border border-white/5 rounded-2xl p-8 hover:border-yellow-500/30 transition-all duration-300 group card-hover">
                <div className="w-14 h-14 bg-yellow-500/10 rounded-xl flex items-center justify-center text-yellow-400 mb-6 group-hover:scale-110 transition-transform group-hover:animate-pulse-glow">
                  <Database size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4"><ScrambleText text="Backend & Tools" /></h3>
                <ul className="space-y-2 text-slate-400">
                  <li className="flex items-center gap-2 skill-item"><div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>Node.js / Express</li>
                  <li className="flex items-center gap-2 skill-item" style={{ animationDelay: '100ms' }}><div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>Firebase / Supabase</li>
                  <li className="flex items-center gap-2 skill-item" style={{ animationDelay: '200ms' }}><div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>Git / GitHub</li>
                  <li className="flex items-center gap-2 skill-item" style={{ animationDelay: '300ms' }}><div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>Docker</li>
                  <li className="flex items-center gap-2 skill-item" style={{ animationDelay: '400ms' }}><div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>Vercel / AWS</li>
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Works Section */}
      <section id="works" className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <FadeIn direction="left">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                  <ShimmerText>Demo</ShimmerText> <span className="text-orange-400">Pages</span>
                </h2>
                <p className="text-slate-400">様々な業種に対応したWebサイトのデモページです。</p>
              </div>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 飲食店向けWebサイト */}
            <FadeIn delay={0} direction="up">
              <div className="group relative bg-slate-900/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/5 hover:border-orange-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-900/20 card-hover">
                <div className="aspect-video bg-slate-800/50 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-60 z-10"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2670&auto=format&fit=crop" 
                    alt="飲食店向けWebサイト" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                
                <div className="p-6 relative z-20">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-orange-400 transition-colors">飲食店向けWebサイト</h3>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                    メニュー紹介、店舗情報、オンライン予約機能などを備えた、飲食店向けのモダンなWebサイトデモです。
                  </p>
                  <div className="flex justify-end items-center mt-4 pt-4">
                    <a href="/demo/restaurant" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors link-hover">
                      <ExternalLink size={16} /> デモを見る
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* 士業向けコーポレートサイト */}
            <FadeIn delay={150} direction="up">
              <div className="group relative bg-slate-900/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/5 hover:border-orange-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-900/20 card-hover">
                <div className="aspect-video bg-slate-800/50 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-60 z-10"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000" 
                    alt="士業向けコーポレートサイト" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                
                <div className="p-6 relative z-20">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-orange-400 transition-colors">士業向けコーポレートサイト</h3>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                    弁護士・税理士・行政書士などの専門性を際立たせる、信頼感のあるコーポレートサイトのデモです。
                  </p>
                  <div className="flex justify-end items-center mt-4 pt-4">
                    <a href="/demo/legal" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors link-hover">
                      <ExternalLink size={16} /> デモを見る
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* 企業サイト */}
            <FadeIn delay={300} direction="up">
              <div className="group relative bg-slate-900/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/5 hover:border-orange-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-900/20 card-hover">
                <div className="aspect-video bg-slate-800/50 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-60 z-10"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
                    alt="企業サイト" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                
                <div className="p-6 relative z-20">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-orange-400 transition-colors">企業サイト</h3>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                    企業のブランド力を高める、洗練されたデザインとパフォーマンスを兼ね備えた企業サイトのデモです。
                  </p>
                  <div className="flex justify-end items-center mt-4 pt-4">
                    <a href="/demo/corporation" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors link-hover">
                      <ExternalLink size={16} /> デモを見る
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-24 px-6">
        <FadeIn>
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <ShimmerText><span className="text-amber-500">Contact</span></ShimmerText>
            </h2>
            <p className="text-slate-400 text-lg">
              新しいプロジェクトのご相談や、技術的なご質問など、お気軽にご連絡ください。<br />
              共に素晴らしいものを作り上げましょう。
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={200} direction="up">
          <div className="max-w-2xl mx-auto bg-slate-900/30 backdrop-blur-lg border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl card-hover">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Name</label>
                  <input 
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-slate-950/30 backdrop-blur-sm border border-slate-700/50 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all input-focus-glow"
                    placeholder="山田 太郎"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Email</label>
                  <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-slate-950/30 backdrop-blur-sm border border-slate-700/50 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all input-focus-glow"
                    placeholder="hello@example.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full bg-slate-950/30 backdrop-blur-sm border border-slate-700/50 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all resize-none input-focus-glow"
                  placeholder="プロジェクトの詳細やご相談内容をご記入ください..."
                ></textarea>
              </div>

              {submitStatus && (
                <div className={`p-4 rounded-xl text-center ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}>
                  {submitStatus.message}
                </div>
              )}

              <button 
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl font-bold text-lg transition-all transform ${
                  isSubmitting 
                    ? 'opacity-70 cursor-not-allowed' 
                    : 'hover:shadow-[0_0_20px_rgba(251,146,60,0.5)] hover:-translate-y-1 btn-pulse'
                }`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </FadeIn>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6">
        <FadeIn>
          <div className="max-w-7xl mx-auto flex flex-col items-center gap-4">
            <div className="text-2xl font-bold text-slate-200 tracking-tighter">
              <ShimmerText>Takuya Yamaguchi　/　denimcap</ShimmerText>
            </div>
            <div className="text-slate-500 text-sm animate-pulse-slow">
              © {new Date().getFullYear()} Takuya Yamaguchi. All rights reserved.
            </div>
          </div>
        </FadeIn>
      </footer>
    </div>
  );
};

export default Portfolio;
