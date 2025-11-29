'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight, Scale, Shield, Users, BookOpen, Mail, Phone, ChevronRight } from 'lucide-react';

/* --- Custom Hook for Scroll Reveal Animation ---
  要素が画面内に入ったときにクラスを付与するフック
*/
const useOnScreen = (options: IntersectionObserverInit) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, options);

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [options]);

  return [ref, isVisible] as const;
};

/* --- Reusable Components ---
*/

// Fade-in Wrapper
const Reveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
  
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Section Title
const SectionTitle = ({ en, jp }: { en: string; jp: string }) => (
  <div className="mb-12 md:mb-20 text-center">
    <span className="block text-amber-600 text-sm font-medium tracking-widest mb-2 font-sans uppercase">{en}</span>
    <h2 className="text-3xl md:text-4xl font-serif text-slate-800 tracking-wide">{jp}</h2>
    <div className="w-px h-16 bg-slate-300 mx-auto mt-8"></div>
  </div>
);

// Button
const Button = ({ children, primary = false }: { children: React.ReactNode; primary?: boolean }) => (
  <button className={`group relative px-8 py-4 overflow-hidden border transition-all duration-300 ${primary ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-900 text-slate-900 hover:text-white'}`}>
    <span className={`absolute inset-0 w-full h-full bg-slate-900 transform transition-transform duration-300 ease-out ${primary ? '' : 'translate-y-full group-hover:translate-y-0'}`}></span>
    <span className={`relative flex items-center gap-2 font-medium tracking-wider ${primary ? '' : 'group-hover:text-white'}`}>
      {children}
      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
    </span>
  </button>
);

/* --- Main App Component ---
*/
export default function LegalDemo() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // モーダル開閉時のbodyスクロール制御
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Navigation Items
  const navItems = [
    { label: '私たちについて', href: '#about' },
    { label: '取扱分野', href: '#services' },
    { label: '弁護士紹介', href: '#lawyers' },
    { label: 'コラム', href: '#news' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-600 antialiased selection:bg-slate-900 selection:text-white">
      {/* Font Injection */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;500;700&family=Noto+Sans+JP:wght@300;400;500&family=Zen+Kurenaido&display=swap');
        .font-serif { font-family: 'Shippori Mincho', serif; }
        .font-sans { font-family: 'Noto Sans JP', sans-serif; }
        .font-signature { font-family: 'Zen Kurenaido', sans-serif; }
        .vertical-text { writing-mode: vertical-rl; text-orientation: upright; }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slow-zoom {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s linear infinite alternate;
        }
      `}</style>

      {/* Header */}
      <header 
        className={`fixed w-full z-50 transition-all duration-500 ${
          isScrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6 text-white'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#" className={`text-2xl font-serif font-bold tracking-widest flex items-center gap-2 ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
            <div className={`w-8 h-8 border flex items-center justify-center ${isScrolled ? 'border-slate-900' : 'border-white'}`}>
              <span className="text-xs">L</span>
            </div>
            LUMINA
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a 
                key={item.label} 
                href={item.href} 
                className={`text-sm font-medium tracking-wider hover:opacity-70 transition-opacity ${isScrolled ? 'text-slate-800' : 'text-white'}`}
              >
                {item.label}
              </a>
            ))}
            <a href="#contact" className={`px-6 py-2 border text-sm transition-colors ${isScrolled ? 'border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white' : 'border-white text-white hover:bg-white hover:text-slate-900'}`}>
              ご相談予約
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
          >
            {mobileMenuOpen ? <X className="text-slate-900" /> : <Menu className={isScrolled ? 'text-slate-900' : 'text-white'} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-white z-40 transition-transform duration-500 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navItems.map((item) => (
            <a 
              key={item.label} 
              href={item.href} 
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-serif text-slate-900 hover:text-amber-600 transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a 
            href="#contact" 
            onClick={() => setMobileMenuOpen(false)}
            className="mt-8 px-8 py-4 bg-slate-900 text-white text-lg tracking-widest"
          >
            ご相談予約
          </a>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax-like fix */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000" 
            alt="Office" 
            className="w-full h-full object-cover brightness-[0.6] scale-105 animate-slow-zoom"
          />
        </div>

        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center">
          <div className="md:absolute md:right-20 md:top-1/2 md:-translate-y-1/2 hidden md:block text-white/20 font-serif text-9xl font-bold opacity-10 select-none writing-mode-vertical">
            正義と信頼
          </div>
          
          <div className="max-w-3xl text-white mt-20 md:mt-0 animate-fade-in-up">
            <p className="text-amber-500 font-medium tracking-[0.3em] mb-6 uppercase text-sm md:text-base">Lumina Law Office</p>
            <h1 className="text-5xl md:text-7xl font-serif font-medium leading-tight mb-8">
              法と人、<br />
              その<span className="text-amber-500">架け橋</span>となる。
            </h1>
            <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-xl mb-12 border-l-2 border-amber-500 pl-6">
              複雑化する現代社会において、<br className="hidden md:block"/>
              法的な最適解を導き出し、<br className="hidden md:block"/>
              クライアントの未来を守り抜きます。
            </p>
            <a href="#contact" className="inline-block border border-white/30 bg-white/10 backdrop-blur-sm px-8 py-4 text-white hover:bg-white hover:text-slate-900 transition-all duration-300">
              まずは相談する
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/50 flex flex-col items-center gap-2">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-white/50"></div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 md:py-32 relative bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16 md:gap-24 items-center">
            <div className="w-full md:w-1/2 relative">
               <Reveal>
                <div className="aspect-[4/5] relative overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1200" 
                    alt="Our Philosophy" 
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-700 ease-in-out"
                  />
                  <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-slate-50 z-[-1]"></div>
                  <div className="absolute -top-10 -left-10 w-48 h-48 bg-amber-50 z-[-1]"></div>
                </div>
              </Reveal>
            </div>
            
            <div className="w-full md:w-1/2">
              <Reveal delay={200}>
                <span className="text-amber-600 font-bold tracking-widest text-sm block mb-4">OUR PHILOSOPHY</span>
                <h2 className="text-3xl md:text-4xl font-serif text-slate-900 leading-snug mb-8">
                  「誠実」であること。<br/>それが最強の戦略。
                </h2>
                <p className="text-slate-600 leading-8 mb-6 text-justify">
                  私たちは、単なる法律の専門家ではありません。クライアントのビジネスや人生に深く寄り添い、共に課題を解決するパートナーです。
                </p>
                <p className="text-slate-600 leading-8 mb-10 text-justify">
                  短期的な利益よりも、長期的な信頼関係を重視し、常に「誠実」であることを誓います。難解な法律問題を、わかりやすく、かつ戦略的に解決へと導きます。
                </p>
                <Button>事務所概要を見る</Button>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 md:py-32 bg-slate-50">
        <div className="container mx-auto px-6">
          <Reveal>
            <SectionTitle en="Our Services" jp="取扱分野" />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Scale size={32} />, title: "企業法務・顧問", desc: "契約書作成、コンプライアンス対応、労務問題など、企業活動を法的側面から包括的にサポートします。" },
              { icon: <Shield size={32} />, title: "知的財産権", desc: "特許、商標、著作権の保護・活用戦略。ブランド価値を守り、ビジネスの競争力を高めます。" },
              { icon: <Users size={32} />, title: "M&A・事業承継", desc: "合併・買収、組織再編のスキーム策定からデューデリジェンスまで、円滑な事業承継を実現します。" },
              { icon: <BookOpen size={32} />, title: "不動産・建築", desc: "不動産取引、建築紛争、立ち退き交渉など。専門的知見を活かし、迅速な解決を目指します。" },
              { icon: <Mail size={32} />, title: "IT・インターネット", desc: "利用規約の作成、ネット上の誹謗中傷対策、システム開発紛争など、デジタル領域の課題に対応。" },
              { icon: <ChevronRight size={32} />, title: "その他一般民事", desc: "交通事故、相続、債権回収など。個人の生活に関わる法律トラブルも親身に対応いたします。" },
            ].map((service, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div className="group bg-white p-10 h-full border border-slate-100 hover:border-amber-500/30 hover:shadow-xl transition-all duration-500 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-bl-full -mr-12 -mt-12 transition-all group-hover:bg-amber-50"></div>
                  
                  <div className="text-amber-600 mb-6 relative z-10 group-hover:scale-110 transition-transform duration-500 origin-left">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-serif font-bold text-slate-800 mb-4 group-hover:text-amber-700 transition-colors relative z-10">
                    {service.title}
                  </h3>
                  <p className="text-slate-500 leading-7 text-sm relative z-10">
                    {service.desc}
                  </p>
                  
                  <div className="absolute bottom-6 right-6 opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <ArrowRight className="text-amber-600" size={20} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats / Trust Section */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-10 left-10 w-64 h-64 rounded-full border border-white/20"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full border border-white/20"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { num: "30+", label: "所属弁護士数" },
              { num: "500+", label: "顧問契約社数" },
              { num: "2000+", label: "年間相談件数" },
              { num: "98%", label: "顧客満足度" },
            ].map((stat, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div className="flex flex-col items-center">
                  <span className="text-4xl md:text-5xl font-serif font-bold text-amber-500 mb-2">{stat.num}</span>
                  <span className="text-sm tracking-widest text-slate-400">{stat.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lawyers / CEO Section */}
      <section id="lawyers" className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row-reverse gap-16 items-center">
            <div className="w-full md:w-5/12">
               <Reveal>
                <div className="relative">
                  <div className="aspect-[3/4] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                    <img 
                      src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=800" 
                      alt="Representative Lawyer" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 bg-white p-6 shadow-lg max-w-xs">
                    <p className="text-xs text-amber-600 font-bold tracking-widest mb-1">代表弁護士</p>
                    <p className="text-xl font-serif font-bold text-slate-900">神宮寺 健太郎</p>
                    <p className="text-sm text-slate-400 mt-1">Kentaro Jinguji</p>
                  </div>
                </div>
              </Reveal>
            </div>
            
            <div className="w-full md:w-7/12">
              <Reveal delay={200}>
                <SectionTitle en="Representative" jp="代表挨拶" />
                <h3 className="text-2xl font-serif text-slate-800 mb-8 leading-normal">
                  「依頼者の人生を背負う覚悟」<br/>
                  その一点に尽きます。
                </h3>
                <div className="space-y-6 text-slate-600 leading-8">
                  <p>
                    法律事務所を訪れるとき、多くの方は人生の岐路に立たされています。不安、焦り、怒り。様々な感情の中で、私たちを頼ってくださる。その重みを、私たちは決して忘れません。
                  </p>
                  <p>
                    Lumina法律事務所は、従来の「先生業」としての弁護士像を脱却し、クライアントと同じ目線で未来を考えるサービス業としての側面を大切にしています。
                  </p>
                  <p>
                    迅速なレスポンス、明確な費用体系、そして何より、心ある対応。これらを徹底することで、皆様にとって「最も相談しやすいパートナー」であり続けたいと考えています。
                  </p>
                </div>
                <div className="mt-10">
                   <p className="font-signature text-3xl text-slate-700 opacity-70 tracking-wider">
                     神宮寺 健太郎
                   </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section id="news" className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 max-w-5xl">
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
              <div>
                <span className="text-amber-600 font-bold tracking-widest text-sm block mb-2">NEWS & TOPICS</span>
                <h2 className="text-3xl font-serif text-slate-900">お知らせ・コラム</h2>
              </div>
              <a href="#" className="hidden md:flex items-center gap-2 text-sm font-medium hover:text-amber-600 transition-colors mt-4 md:mt-0">
                記事一覧へ <ArrowRight size={16} />
              </a>
            </div>
          </Reveal>

          <div className="space-y-4">
            {[
              { date: "2024.11.15", cat: "お知らせ", title: "オフィスの移転に伴う電話番号変更のお知らせ" },
              { date: "2024.11.08", cat: "解決事例", title: "IT企業におけるM&A（株式譲渡）の成功事例を公開しました" },
              { date: "2024.10.24", cat: "コラム", title: "【2024年改正対応】フリーランス新法について企業が準備すべきこと" },
              { date: "2024.10.10", cat: "セミナー", title: "スタートアップ向け「資本政策と知財戦略」セミナー登壇のお知らせ" },
            ].map((item, idx) => (
              <Reveal key={idx} delay={idx * 50}>
                <a href="#" className="group flex flex-col md:flex-row md:items-center gap-4 bg-white p-6 border border-slate-100 hover:border-amber-500/50 transition-all duration-300 hover:shadow-md">
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-slate-400 font-sans">{item.date}</span>
                    <span className="bg-slate-100 text-slate-600 px-3 py-1 text-xs font-medium min-w-[80px] text-center">{item.cat}</span>
                  </div>
                  <h3 className="flex-1 font-medium text-slate-800 group-hover:text-amber-700 transition-colors">
                    {item.title}
                  </h3>
                  <div className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <ArrowRight size={16} className="text-amber-600" />
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <a href="#" className="inline-flex items-center gap-2 text-sm font-medium hover:text-amber-600 transition-colors">
               記事一覧へ <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* CTA / Contact Section */}
      <section id="contact" className="py-24 bg-slate-900 text-white relative">
        <div className="container mx-auto px-6 relative z-10">
          <Reveal>
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-10 md:p-20 text-center max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-serif mb-8 leading-tight">
                未来への一歩を、<br/>ここから。
              </h2>
              <p className="text-white/70 mb-12 leading-loose">
                初回相談は30分無料です。<br className="md:hidden"/>
                お困りのことがあれば、<br className="md:hidden"/>
                まずはお気軽にお問い合わせください。<br/>
                専門チームが迅速に対応いたします。
              </p>
              
              <div className="flex flex-col md:flex-row justify-center gap-6">
                <div className="flex-1 bg-white text-slate-900 p-8 hover:bg-amber-50 transition-colors duration-300 cursor-pointer group">
                  <div className="flex flex-col items-center">
                    <Phone className="mb-4 text-amber-600 group-hover:scale-110 transition-transform" size={32} />
                    <p className="text-sm text-slate-500 mb-1">お電話でのご予約</p>
                    <p className="text-2xl font-serif font-bold tracking-widest">03-1234-5678</p>
                    <p className="text-xs text-slate-400 mt-2">平日 9:00 - 18:00</p>
                  </div>
                </div>
                
                <div className="flex-1 bg-amber-600 text-white p-8 hover:bg-amber-700 transition-colors duration-300 cursor-pointer group">
                  <div className="flex flex-col items-center">
                    <Mail className="mb-4 text-white group-hover:scale-110 transition-transform" size={32} />
                    <p className="text-sm text-white/80 mb-1">Webからのご予約</p>
                    <p className="text-2xl font-serif font-bold">CONTACT FORM</p>
                    <p className="text-xs text-white/70 mt-2">24時間受付中</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-16 border-t border-white/10 text-sm">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-1">
              <a href="#" className="text-2xl font-serif font-bold text-white tracking-widest flex items-center gap-2 mb-6">
                <div className="w-8 h-8 border border-white flex items-center justify-center">
                  <span className="text-xs">L</span>
                </div>
                LUMINA
              </a>
              <p className="leading-7 mb-4">
                〒100-0005<br/>
                東京都千代田区丸の内1-1-1<br/>
                ルミナタワー 25F
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-6">取扱分野</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-amber-500 transition-colors">企業法務・顧問</a></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors">M&A・事業承継</a></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors">知的財産権</a></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors">IT・インターネット</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-6">事務所について</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-amber-500 transition-colors">私たちについて</a></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors">弁護士紹介</a></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors">採用情報</a></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors">アクセス</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-medium mb-6">その他</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-amber-500 transition-colors">コラム</a></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors">プライバシーポリシー</a></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors">サイトマップ</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; {new Date().getFullYear()} Lumina Law Office. All Rights Reserved.</p>
            <div className="flex gap-6">
              {/* Dummy Social Icons */}
              <div className="w-5 h-5 bg-slate-800 hover:bg-amber-600 transition-colors rounded-full cursor-pointer"></div>
              <div className="w-5 h-5 bg-slate-800 hover:bg-amber-600 transition-colors rounded-full cursor-pointer"></div>
              <div className="w-5 h-5 bg-slate-800 hover:bg-amber-600 transition-colors rounded-full cursor-pointer"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

