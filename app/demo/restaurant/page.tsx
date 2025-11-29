'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, Phone, MapPin, Instagram, Clock, Star } from 'lucide-react';

/* --- デザイン哲学 ---
  Color Palette:
  - Background: Slate 950 (深淵な夜)
  - Text: Slate 50 (雪のような白)
  - Accent: Amber 400 (月明かりのような金)
  - Surface: White/10 (磨りガラス)
*/

// メニューデータの型定義
type MenuItem = {
  name: string;
  desc: string;
  price: string;
};

type MenuData = {
  lunch: MenuItem[];
  dinner: MenuItem[];
  wine: MenuItem[];
};

// メニューデータ
const menuData: MenuData = {
  lunch: [
    { name: "旬彩御膳", desc: "季節の小鉢五種、主菜、炊き込みご飯、甘味", price: "¥4,500" },
    { name: "昼のおまかせ", desc: "先付、お造り、焼物、煮物、食事、デザート", price: "¥8,000" },
    { name: "特選和牛重", desc: "A5ランク黒毛和牛、赤出汁、香の物、サラダ", price: "¥5,800" },
  ],
  dinner: [
    { name: "季 - TOKI -", desc: "当店のスタンダード。旬の食材をふんだんに使用した全9品", price: "¥18,000" },
    { name: "極 - KIWAMI -", desc: "伊勢海老や鮑、厳選和牛など贅を尽くした全11品", price: "¥25,000" },
    { name: "菜 - SAI -", desc: "野菜を中心とした、体に優しいヴィーガン対応コース", price: "¥15,000" },
  ],
  wine: [
    { name: "本日のペアリング (5杯)", desc: "ソムリエがコースに合わせて厳選したワインセット", price: "¥8,000" },
    { name: "プレミアム日本酒ペアリング", desc: "全国の銘酒から希少な古酒まで", price: "¥6,500" },
    { name: "Kenzo Estate 'Rindo'", desc: "Napa Valley, USA - Glass", price: "¥3,200" },
  ]
};

export default function RestaurantDemo() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<keyof MenuData>('dinner');
  const [reservationModalOpen, setReservationModalOpen] = useState(false);

  // スクロール検知
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // モーダル開閉時のbodyスクロール制御
  useEffect(() => {
    if (reservationModalOpen || mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [reservationModalOpen, mobileMenuOpen]);

  // スムーズスクロール
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 antialiased selection:bg-amber-500 selection:text-white overflow-x-hidden">
      
      {/* Custom Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400;500;600;700&family=Cormorant+Garamond:wght@300;400;500;600&display=swap');
        
        .font-serif-jp {
          font-family: 'Noto Serif JP', 'Hiragino Mincho ProN', serif;
        }
        .font-serif-en {
          font-family: 'Cormorant Garamond', 'Times New Roman', serif;
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slow-zoom {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0) translateX(-50%); }
          50% { transform: translateY(10px) translateX(-50%); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s linear infinite alternate;
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s infinite;
        }
      `}</style>

      {/* Navigation */}
      <nav 
        className={`fixed w-full z-50 transition-all duration-500 ${
          isScrolled ? 'bg-slate-950/90 backdrop-blur-md py-4 shadow-2xl border-b border-white/5' : 'bg-transparent py-8'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-serif-jp font-bold tracking-[0.2em] z-50 relative cursor-pointer group">
            <span className="text-amber-400 group-hover:text-white transition-colors duration-300">季</span>
            <span className="text-xs ml-2 tracking-widest font-light opacity-80 font-serif-en">TOKI</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-12 text-sm tracking-widest uppercase font-light">
            {['Concept', 'Menu', 'Space', 'Access'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollToSection(item.toLowerCase())}
                className="relative group overflow-hidden py-1"
              >
                <span className="relative z-10 text-slate-300 group-hover:text-amber-400 transition-colors duration-300 font-serif-en">
                  {item}
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
            <button 
              onClick={() => setReservationModalOpen(true)}
              className="px-6 py-2 border border-amber-400/50 text-amber-400 hover:bg-amber-400 hover:text-slate-900 transition-all duration-300 rounded-sm font-serif-en"
            >
              RESERVE
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden z-50 text-white focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu */}
      <div className={`fixed inset-0 bg-slate-950 z-40 flex flex-col justify-center items-center transition-all duration-500 transform ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
        <div className="flex flex-col space-y-8 text-center">
          {['Concept', 'Menu', 'Space', 'Access'].map((item) => (
            <button 
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="text-3xl font-serif-jp tracking-widest text-slate-300 hover:text-amber-400 transition-colors"
            >
              {item}
            </button>
          ))}
          <button 
            onClick={() => {
              setMobileMenuOpen(false);
              setReservationModalOpen(true);
            }}
            className="mt-8 text-xl text-amber-400 border-b border-amber-400 pb-1"
          >
            Online Reservation
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <header className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax-like fix */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2670&auto=format&fit=crop" 
            alt="Artistic Dark Plating" 
            className="w-full h-full object-cover opacity-60 scale-105 animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
        </div>

        <div className="relative z-10 text-center px-4 animate-fade-in-up">
          <p className="text-amber-400 tracking-[0.4em] text-sm mb-6 uppercase font-light font-serif-en">Modern Kaiseki & Fusion</p>
          <h1 className="text-5xl md:text-8xl font-serif-jp font-bold tracking-widest mb-8 leading-tight">
            五感を<br className="md:hidden" />研ぎ澄ます<br /><span className="text-4xl md:text-7xl font-light">一皿の芸術</span>
          </h1>
          <p className="text-slate-300 max-w-lg mx-auto leading-loose font-light mb-12 text-sm md:text-base">
            伝統と革新が織りなす、<br />
            季節の移ろいを表現した創作和食。
          </p>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <button 
              onClick={() => scrollToSection('menu')}
              className="group relative px-8 py-3 bg-white text-slate-950 overflow-hidden rounded-sm transition-all hover:bg-amber-400"
            >
              <span className="relative z-10 font-bold tracking-widest text-sm flex items-center font-serif-en">
                VIEW MENU <ChevronRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-70 animate-bounce-slow">
          <span className="text-[10px] tracking-[0.3em] uppercase mb-2 font-serif-en">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </header>

      {/* Concept Section */}
      <section id="concept" className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-900/50 -skew-x-12 transform translate-x-20 z-0 pointer-events-none"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
            <div className="w-full md:w-1/2 relative group">
              <div className="absolute -inset-4 border border-amber-400/20 rounded-sm transform translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500"></div>
              <img 
                src="https://images.unsplash.com/photo-1607301406259-dfb186e15de8?q=80&w=2511&auto=format&fit=crop" 
                alt="Chef plating dark" 
                className="w-full h-[500px] object-cover rounded-sm grayscale group-hover:grayscale-0 transition-all duration-700 shadow-2xl"
              />
            </div>
            
            <div className="w-full md:w-1/2 md:pl-10">
              <span className="text-amber-400 tracking-[0.2em] text-xs font-bold uppercase block mb-4 font-serif-en">Our Philosophy</span>
              <h2 className="text-3xl md:text-5xl font-serif-jp font-medium mb-8 leading-snug">
                旬を愛でる、<br />
                <span className="text-slate-400">一期一会の食体験。</span>
              </h2>
              <p className="text-slate-400 leading-relaxed mb-6 font-light">
                「季 - TOKI -」では、その日、その瞬間に最も輝きを放つ食材のみを使用します。
                伝統的な懐石料理の技法をベースに、フレンチのエッセンスを取り入れた独自のスタイル。
              </p>
              <p className="text-slate-400 leading-relaxed mb-8 font-light">
                生産者の想いと、料理人の技術が交差する場所。
                ただ食べるだけではない、心に刻まれる時間をご提供いたします。
              </p>
              
              <div className="flex gap-8 mt-8 border-t border-white/10 pt-8">
                <div>
                  <h4 className="text-xl font-serif-jp mb-2 text-white">産地直送</h4>
                  <p className="text-xs text-slate-500 tracking-wide font-serif-en">FARM TO TABLE</p>
                </div>
                <div>
                  <h4 className="text-xl font-serif-jp mb-2 text-white">完全予約制</h4>
                  <p className="text-xs text-slate-500 tracking-wide font-serif-en">PRIVATE DINING</p>
                </div>
                <div>
                  <h4 className="text-xl font-serif-jp mb-2 text-white">美酒ペアリング</h4>
                  <p className="text-xs text-slate-500 tracking-wide font-serif-en">SOMMELIER SELECT</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 bg-slate-900 relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-amber-400 tracking-[0.2em] text-xs font-bold uppercase font-serif-en">Culinary Journey</span>
            <h2 className="text-3xl md:text-5xl font-serif-jp mt-4 mb-6">お品書き</h2>
            <div className="w-16 h-[1px] bg-amber-400 mx-auto"></div>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-12 space-x-8">
            {(['lunch', 'dinner', 'wine'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-sm md:text-base tracking-[0.2em] uppercase py-2 px-4 transition-all duration-300 border-b font-serif-en ${
                  activeTab === tab 
                    ? 'text-amber-400 border-amber-400' 
                    : 'text-slate-500 border-transparent hover:text-slate-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Menu Content */}
          <div className="max-w-4xl mx-auto min-h-[400px]">
            <div className="grid gap-8 animate-fade-in">
              {menuData[activeTab].map((item, index) => (
                <div key={index} className="group flex justify-between items-baseline border-b border-white/5 pb-4 hover:border-amber-400/30 transition-colors">
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-serif-jp text-slate-200 group-hover:text-amber-200 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs md:text-sm text-slate-500 mt-1 font-light tracking-wide">{item.desc}</p>
                  </div>
                  <div className="text-amber-400 font-light text-lg md:text-xl ml-8 whitespace-nowrap font-serif-en">
                    {item.price}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <p className="text-xs text-slate-500 mb-6">※季節や仕入れ状況により、内容は日替わりとなります。</p>
              <button className="text-sm border border-white/20 px-8 py-3 rounded-sm hover:bg-white hover:text-slate-900 transition-all duration-300 tracking-widest font-serif-en">
                PDF MENU
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Breaker */}
      <section className="grid grid-cols-2 md:grid-cols-3 h-64 md:h-80 w-full">
        {[
          "https://images.unsplash.com/photo-1723881061391-4c05a4a02ba7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://images.unsplash.com/photo-1675870792385-76389bc93f75?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://images.unsplash.com/photo-1681270496598-13c5365730c8?q=80&w=1290&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        ].map((src, i) => (
          <div key={i} className="relative group overflow-hidden h-full">
            <img 
              src={src} 
              alt="Restaurant Atmosphere" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-amber-900/10 transition-colors duration-300"></div>
          </div>
        ))}
      </section>

      {/* Space Section */}
      <section id="space" className="py-24 bg-slate-950 relative">
         <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-start gap-16">
              
              <div className="w-full md:w-1/3 md:sticky md:top-32">
                 <span className="text-amber-400 tracking-[0.2em] text-xs font-bold uppercase block mb-4 font-serif-en">Atmosphere</span>
                 <h2 className="text-3xl md:text-5xl font-serif-jp mb-8 leading-snug">
                   静寂と温もりが<br />
                   調和する、<br />
                   <span className="text-slate-400">大人の隠れ家。</span>
                 </h2>
                 <p className="text-slate-400 leading-relaxed font-light mb-8">
                   都会の喧騒を忘れさせる、凛とした空気が流れる店内。<br />
                   檜の一枚板を使用したカウンター席では、料理人の所作を間近でお楽しみいただけます。
                 </p>
                 <div className="h-[1px] w-20 bg-amber-400/50"></div>
              </div>

              <div className="w-full md:w-2/3 space-y-24">
                 {/* Counter */}
                 <div className="group relative">
                    <div className="overflow-hidden rounded-sm mb-6">
                      <img 
                        src="https://images.unsplash.com/photo-1634714434666-ef41b76b9cc9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                        alt="Counter Seats" 
                        className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="text-2xl font-serif-jp text-white mb-2">Counter</h3>
                    <p className="text-slate-400 font-light">
                      樹齢300年の檜を使用したカウンター席（8席）。<br />
                      目の前で繰り広げられる調理の臨場感とともに、五感で味わう特等席です。
                    </p>
                 </div>

                 {/* Private Room */}
                 <div className="group relative">
                    <div className="overflow-hidden rounded-sm mb-6">
                      <img 
                        src="https://images.unsplash.com/photo-1645816255137-c100ac3ede53?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                        alt="Private Room" 
                        className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="text-2xl font-serif-jp text-white mb-2">Private Room</h3>
                    <p className="text-slate-400 font-light">
                      2名様から6名様までご利用いただける完全個室。<br />
                      接待や記念日など、プライベートな時間を大切にしたい特別なシーンに最適です。
                    </p>
                 </div>
              </div>

            </div>
         </div>
      </section>

      {/* Info & Access */}
      <section id="access" className="py-24 bg-slate-900 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12 bg-slate-950/50 p-8 md:p-16 rounded-sm border border-white/5 shadow-xl">
            
            {/* Contact Info */}
            <div className="w-full md:w-1/2 space-y-8">
              <div>
                <h3 className="text-2xl font-serif-jp text-white mb-6 flex items-center">
                  <span className="w-2 h-8 bg-amber-400 mr-4"></span>
                  Information
                </h3>
              </div>
              
              <div className="space-y-6 text-slate-300 font-light">
                <div className="flex items-start gap-4">
                  <MapPin className="text-amber-400 mt-1 shrink-0" size={20} />
                  <div>
                    <p className="font-bold text-white mb-1">住所</p>
                    <p>〒107-0062 東京都港区南青山 5-XX-XX<br/>フォレストヒルズ 2F</p>
                    <a href="#" className="text-xs text-amber-400/80 hover:text-amber-400 mt-2 inline-block border-b border-amber-400/30">Google Mapsで見る</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Clock className="text-amber-400 mt-1 shrink-0" size={20} />
                  <div>
                    <p className="font-bold text-white mb-1">営業時間</p>
                    <div className="flex justify-between w-full max-w-xs text-sm">
                      <span>Lunch</span>
                      <span>11:30 - 14:30 (L.O. 13:30)</span>
                    </div>
                    <div className="flex justify-between w-full max-w-xs text-sm mt-1">
                      <span>Dinner</span>
                      <span>17:30 - 22:30 (L.O. 21:00)</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">定休日：月曜日・第一火曜日</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="text-amber-400 mt-1 shrink-0" size={20} />
                  <div>
                    <p className="font-bold text-white mb-1">ご予約・お問い合わせ</p>
                    <p className="text-2xl font-serif-jp text-white">03-1234-5678</p>
                    <p className="text-xs text-slate-500 mt-1">受付時間 10:00 - 22:00</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-8">
                <button 
                   onClick={() => setReservationModalOpen(true)}
                   className="w-full bg-amber-400 text-slate-900 py-4 font-bold tracking-widest hover:bg-white transition-colors duration-300 shadow-[0_0_20px_rgba(251,191,36,0.2)]"
                >
                  オンライン予約
                </button>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="w-full md:w-1/2 min-h-[300px] bg-slate-800 relative group overflow-hidden rounded-sm border border-white/10">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.7479754723103!2d139.7126160762319!3d35.65858053704259!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188b6170566367%3A0x66c897621c385207!2sOmotesando%20Station!5e0!3m2!1sen!2sjp!4v1700000000000!5m2!1sen!2sjp" 
                width="100%" 
                height="100%" 
                style={{border:0, filter: "grayscale(100%) invert(92%) contrast(83%)"}} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                title="Restaurant Location Map"
              ></iframe>
              <div className="absolute inset-0 pointer-events-none border border-white/10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-white/5 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-2xl font-serif-jp font-bold tracking-widest text-slate-200">
              季 <span className="text-xs ml-1 font-sans font-normal opacity-50">TOKI</span>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors" aria-label="Review">
                <Star size={20} />
              </a>
            </div>

            <div className="text-xs text-slate-600 tracking-wide font-serif-en">
              &copy; {new Date().getFullYear()} TOKI - Modern Kaiseki. All Rights Reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* Reservation Modal */}
      {reservationModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm" 
            onClick={() => setReservationModalOpen(false)}
          ></div>
          <div className="relative bg-slate-900 border border-amber-400/20 w-full max-w-md p-8 rounded-sm shadow-2xl animate-fade-in-up">
            <button 
              onClick={() => setReservationModalOpen(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-white"
              aria-label="閉じる"
            >
              <X size={24} />
            </button>
            
            <div className="text-center mb-8">
              <h3 className="text-2xl font-serif-jp mb-2 text-amber-400">ご予約</h3>
              <p className="text-xs text-slate-400">Web予約は24時間受け付けております。</p>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-500 mb-1 font-serif-en">人数</label>
                <select className="w-full bg-slate-800 border border-white/10 rounded-sm p-3 text-white focus:border-amber-400 outline-none transition-colors">
                  <option>2名様</option>
                  <option>3名様</option>
                  <option>4名様</option>
                  <option>5名様以上（要電話）</option>
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-500 mb-1 font-serif-en">日時</label>
                <input 
                  type="date" 
                  className="w-full bg-slate-800 border border-white/10 rounded-sm p-3 text-white focus:border-amber-400 outline-none transition-colors" 
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-500 mb-1 font-serif-en">コース</label>
                <select className="w-full bg-slate-800 border border-white/10 rounded-sm p-3 text-white focus:border-amber-400 outline-none transition-colors">
                  <option>おまかせランチコース (¥8,000)</option>
                  <option>季節のディナーコース (¥18,000)</option>
                  <option>季 - TOKI - スペシャル (¥25,000)</option>
                </select>
              </div>
              
              <button 
                type="submit"
                className="w-full bg-amber-400 text-slate-900 font-bold py-3 mt-4 hover:bg-white transition-colors rounded-sm"
              >
                空席を確認する
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

