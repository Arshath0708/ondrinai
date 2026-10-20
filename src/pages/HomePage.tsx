import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sprout, Heart, Droplets, Users, Footprints, HandCoins, Package, Sparkles, MessageCircle, ShieldCheck } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Reveal, SectionHeading, CTASection, BotanicalDivider } from '@/components/ui/Primitives';
import { ActivityCard } from '@/components/ActivityCard';
import { PartnersSection } from '@/components/PartnersSection';
import { siteConfig, pillars, involvementPaths, WHATSAPP_COMMUNITY_URL, ASSETS } from '@/config/site';
import { activities } from '@/data/activities';
import { teamMembers } from '@/data/team';
import { HomeDirectImpact } from '@/components/HomeDirectImpact';

const pillarIcons = {
  heart: Heart,
  sprout: Sprout,
  droplets: Droplets,
  users: Users,
};

const involvementIcons = {
  'footprints': Footprints,
  'hand-coins': HandCoins,
  'package': Package,
  'sparkles': Sparkles,
};

const HEADLINE_SLIDES = [
  {
    title: 'Every meal is dignity.',
    lead: 'Every meal is',
    accent: 'dignity.',
    accentClass: 'text-amber-500 dark:text-amber-400 italic font-normal',
    tag: '01 • FOOD & NOURISHMENT',
    dotColor: 'bg-amber-500',
    activeGlow: 'shadow-[0_0_15px_rgba(245,158,11,0.7)]',
  },
  {
    title: 'Every seed is a promise.',
    lead: 'Every seed is',
    accent: 'a promise.',
    accentClass: 'text-emerald-700 dark:text-emerald-400 italic font-normal',
    tag: '02 • NATIVE PLANTING',
    dotColor: 'bg-emerald-500',
    activeGlow: 'shadow-[0_0_15px_rgba(16,185,129,0.7)]',
  },
  {
    title: 'Every drop saves the future.',
    lead: 'Every drop saves',
    accent: 'the future.',
    accentClass: 'bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-400 dark:from-sky-400 dark:via-blue-400 dark:to-cyan-300 bg-clip-text text-transparent font-sans not-italic font-extrabold',
    tag: '03 • SAVE WATER MOTIVE',
    dotColor: 'bg-sky-500',
    activeGlow: 'shadow-[0_0_15px_rgba(14,165,233,0.7)]',
  },
];

export function HomePage() {
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [activePillar, setActivePillar] = useState<'FEED' | 'PLANT'>('FEED');

  useEffect(() => {
    const timer = setInterval(() => {
      setHeadlineIndex((prev) => {
        const next = (prev + 1) % HEADLINE_SLIDES.length;
        if (next === 0) setActivePillar('FEED');
        if (next === 1) setActivePillar('PLANT');
        return next;
      });
    }, 4200);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <SEO
        title="Together, We Create a Better Tomorrow"
        description={siteConfig.description}
        image={ASSETS.logo}
      />

      {/* ===== HERO: 2100 SOLARPUNK EMOTIONAL IMPACT ===== */}
      <section className="bg-slate-50 dark:bg-[#03150D] pt-12 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-32 overflow-hidden border-b border-slate-200/80 dark:border-white/10 relative cyber-grid">
        <div className="container-max container-px relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left: copy */}
            <div className="lg:col-span-6 order-1">
              <Reveal>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-semibold tracking-wider mb-5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span>DIRECT CITIZEN ACTION &bull; 100% PROVISIONED</span>
                </div>
              </Reveal>

              {/* Dynamic Headline Slideshow */}
              <Reveal delay={80}>
                <div className="relative min-h-[140px] sm:min-h-[160px] lg:min-h-[180px] flex flex-col justify-center select-none">
                  {HEADLINE_SLIDES.map((slide, idx) => {
                    const isCurrent = headlineIndex === idx;
                    return (
                      <div
                        key={slide.title}
                        className={`transition-all duration-700 ${
                          isCurrent
                            ? 'opacity-100 translate-y-0 relative'
                            : 'opacity-0 translate-y-3 pointer-events-none absolute inset-0'
                        }`}
                      >
                        <div className="inline-flex items-center gap-2 mb-2 text-[11px] font-mono tracking-widest uppercase font-bold text-slate-500 dark:text-slate-400">
                          <span className={`w-2 h-2 rounded-full ${slide.dotColor} ${isCurrent ? 'animate-pulse' : ''}`} />
                          <span>{slide.tag}</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-extrabold text-slate-900 dark:text-white text-balance leading-[1.08] tracking-tight">
                          {slide.lead}{' '}
                          <span className={slide.accentClass}>
                            {slide.accent}
                          </span>
                        </h1>
                      </div>
                    );
                  })}

                  {/* Slideshow Indicator Controls */}
                  <div className="flex items-center gap-2 mt-4 pt-1">
                    {HEADLINE_SLIDES.map((slide, idx) => {
                      const isCurrent = headlineIndex === idx;
                      return (
                        <button
                          key={slide.title}
                          type="button"
                          onClick={() => {
                            setHeadlineIndex(idx);
                            if (idx === 0) setActivePillar('FEED');
                            if (idx === 1) setActivePillar('PLANT');
                          }}
                          aria-label={`Show: ${slide.title}`}
                          className={`h-2 rounded-full transition-all duration-500 ${
                            isCurrent
                              ? `w-10 ${slide.dotColor} ${slide.activeGlow}`
                              : 'w-2.5 bg-slate-300 dark:bg-white/20 hover:bg-slate-400 dark:hover:bg-white/50'
                          }`}
                        />
                      );
                    })}
                    <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500 ml-1.5 font-semibold">
                      0{headlineIndex + 1} / 03
                    </span>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-6 text-base sm:text-lg text-slate-700 dark:text-slate-300 max-w-lg text-pretty leading-relaxed font-sans">
                  Right now, an elderly resident or stray animal in Madurai needs community care, and our groundwater needs future security. In 15 seconds, you can sponsor a hot meal, plant a native tree, or stand with our pledge to save water for future generations.
                </p>
              </Reveal>
              <Reveal delay={240}>
                <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                  <a
                    href="#direct-impact"
                    className="btn-donate text-sm py-3.5 px-6 rounded-xl shadow-lg hover:shadow-[0_0_30px_rgba(245,158,11,0.55)] flex items-center justify-center gap-2 font-bold"
                  >
                    <span>⚡ Sponsor a Meal &bull; ₹30</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href={WHATSAPP_COMMUNITY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary rounded-xl text-sm py-3.5 px-5 flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Join Volunteers</span>
                  </a>
                  <Link to="/activities" className="btn-secondary rounded-xl text-sm py-3.5 px-5 text-center">
                    Explore Work
                  </Link>
                </div>
                
                {/* 2100 Live Ground Micro-Proof */}
                <div className="flex items-center gap-2 mt-4 text-xs font-mono text-slate-600 dark:text-slate-300 bg-white/80 dark:bg-[#032014]/90 backdrop-blur-sm px-3.5 py-2 rounded-lg border border-slate-200/80 dark:border-white/10 w-fit">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-beacon shrink-0" />
                  <span>Direct action: ₹30 meal &bull; ₹70 native sapling &bull; Zero intermediary cuts</span>
                </div>
              </Reveal>
              <Reveal delay={320}>
                <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10">
                  <p className="font-serif text-lg sm:text-xl text-slate-900 dark:text-white italic font-semibold">
                    &ldquo;{siteConfig.tagline}&rdquo;
                  </p>
                  <p className="font-tamil text-sm text-slate-600 dark:text-emerald-400/80 mt-1.5 font-medium">
                    {siteConfig.tamilTagline}
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Right: Futuristic Ground Action HUD Showcase */}
            <div className="lg:col-span-6 order-2 pt-2 sm:pt-4 pb-10 sm:pb-12 lg:py-0 lg:-mt-6 xl:-mt-10">
              <Reveal delay={200}>
                <div className="relative max-w-xl mx-auto lg:max-w-none">
                  {/* Futuristic Multi-layer Ambient Aura Glow */}
                  <div className="absolute -inset-4 sm:-inset-6 bg-gradient-to-tr from-emerald-500/20 via-forest/30 to-amber-500/20 rounded-3xl blur-3xl opacity-75 pointer-events-none animate-aura-pulse" />

                  {/* Main Futuristic Container with Glass & Tech Frame */}
                  <div className="relative bg-forest/95 backdrop-blur-2xl rounded-2xl p-4 sm:p-6 border border-cream/20 shadow-2xl text-cream overflow-hidden">
                    
                    {/* Top Cyber/Editorial HUD Bar: Pillar Switcher Pills & Live Signal */}
                    <div className="flex items-center justify-between gap-3 mb-4 sm:mb-5 pb-3.5 border-b border-cream/15">
                      {/* Interactive Dual-Pillar Capsule Selector */}
                      <div className="flex items-center gap-1.5 p-1 bg-black/50 backdrop-blur-md rounded-full border border-emerald-500/30">
                        <button
                          type="button"
                          onClick={() => {
                            setActivePillar('FEED');
                            setHeadlineIndex(0);
                          }}
                          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                            activePillar === 'FEED'
                              ? 'bg-emerald-400 text-slate-950 shadow-[0_0_14px_rgba(52,211,153,0.6)] font-bold'
                              : 'text-slate-300 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          <Heart className={`w-3.5 h-3.5 ${activePillar === 'FEED' ? 'text-slate-950 fill-slate-950/30' : 'text-emerald-400'}`} />
                          <span>FEED &bull; Dignity</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setActivePillar('PLANT');
                            setHeadlineIndex(1);
                          }}
                          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                            activePillar === 'PLANT'
                              ? 'bg-emerald-400 text-slate-950 shadow-[0_0_14px_rgba(52,211,153,0.6)] font-bold'
                              : 'text-slate-300 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          <Sprout className={`w-3.5 h-3.5 ${activePillar === 'PLANT' ? 'text-slate-950' : 'text-emerald-400'}`} />
                          <span>PLANT &bull; Promise</span>
                        </button>
                      </div>

                      {/* Live Telemetry Status Dot */}
                      <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-cream/10 backdrop-blur-md rounded-full border border-cream/15 text-[11px] font-mono text-sage tracking-wider">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                        </span>
                        <span>ON-GROUND</span>
                      </div>
                    </div>

                    {/* Futuristic Viewport Window with Tech Crosshairs */}
                    <div className="relative rounded-xl overflow-hidden aspect-[4/3] sm:aspect-[16/11] border border-cream/15 group">
                      {/* Corner Bracket Accents */}
                      <div className="absolute top-2 left-2 z-20 text-cream/40 font-mono text-xs select-none pointer-events-none">+</div>
                      <div className="absolute top-2 right-2 z-20 text-cream/40 font-mono text-xs select-none pointer-events-none">+</div>
                      <div className="absolute bottom-2 left-2 z-20 text-cream/40 font-mono text-xs select-none pointer-events-none">+</div>
                      <div className="absolute bottom-2 right-2 z-20 text-cream/40 font-mono text-xs select-none pointer-events-none">+</div>

                      {/* Active Pillar Authentic Photographic Layer */}
                      <img
                        key={activePillar}
                        src={activePillar === 'FEED' ? ASSETS.activity1 : ASSETS.activity2}
                        alt={activePillar === 'FEED' ? 'Food distribution initiative' : 'Panai seed planting initiative'}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                      />
                      
                      {/* Radial Vignette & Gradient Mask */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />

                      {/* Top Telemetry Tag Inside Image */}
                      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
                        <div className="flex items-center gap-2 px-2.5 py-1 bg-deep-green/90 backdrop-blur-md border border-cream/20 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-cream rounded-sm shadow-sm">
                          <ShieldCheck className="w-3.5 h-3.5 text-sage" />
                          <span>{activePillar === 'FEED' ? 'Activity 001 Archive • Food Care' : 'Activity 002 Archive • Native Panai Sowing'}</span>
                        </div>
                      </div>

                      {/* Bottom Holographic Telemetry HUD Card Inside Viewport */}
                      <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-10 bg-black/60 backdrop-blur-xl border border-cream/20 p-3.5 sm:p-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xl">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono text-sage uppercase tracking-wider">
                              {activePillar === 'FEED' ? 'Mission Impact' : 'Ecological Sowing'}
                            </span>
                            <span className="text-cream/30">&bull;</span>
                            <span className="text-[10px] font-mono text-cream/60">Verified Records</span>
                          </div>
                          <p className="text-base sm:text-lg font-serif font-bold text-cream mt-0.5">
                            {activePillar === 'FEED' ? '100+ Warm Meals Shared' : '2,000+ Native Panai Seeds'}
                          </p>
                          <p className="text-xs text-cream/70 font-sans mt-0.5">
                            {activePillar === 'FEED' ? 'Nourishing elderly and street residents with dignity' : 'Restoring native palmyra palms for sustainable earth'}
                          </p>
                        </div>
                        <Link
                          to="/gallery"
                          className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/10 hover:bg-emerald-400 hover:text-slate-950 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-semibold transition-all duration-200"
                        >
                          <span>View Gallery</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>

                    {/* Bottom HUD Dock: Community Avatar Stack & Metric Telemetry */}
                    <div className="mt-4 pt-3.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                      {/* Volunteer Community Avatars Stack */}
                      <div className="flex items-center gap-3">
                        <div className="flex -space-x-2 overflow-hidden">
                          {teamMembers.slice(0, 4).map((member) => (
                            <img
                              key={member.id}
                              src={member.image}
                              alt={member.name}
                              className="inline-block h-8 w-8 rounded-full ring-2 ring-emerald-500/60 object-cover object-top"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
                          ))}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-white leading-tight">
                            {teamMembers.length}+ Dedicated Youth Volunteers
                          </p>
                          <p className="text-[10px] text-emerald-300/80 font-mono">
                            Not one person. All of us, together.
                          </p>
                        </div>
                      </div>

                      {/* Quick Pillar Toggle Progress Indicator */}
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest hidden sm:inline">
                          Pillar:
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setActivePillar('FEED');
                              setHeadlineIndex(0);
                            }}
                            aria-label="Switch to FEED pillar"
                            className={`h-2 rounded-full transition-all duration-300 ${
                              activePillar === 'FEED' ? 'w-7 bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]' : 'w-2 bg-white/30 hover:bg-white/60'
                            }`}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setActivePillar('PLANT');
                              setHeadlineIndex(1);
                            }}
                            aria-label="Switch to PLANT pillar"
                            className={`h-2 rounded-full transition-all duration-300 ${
                              activePillar === 'PLANT' ? 'w-7 bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]' : 'w-2 bg-white/30 hover:bg-white/60'
                            }`}
                          />
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Future Generation Water Motive Callout Card */}
                  <div className={`mt-4 p-4 rounded-2xl bg-gradient-to-r from-sky-950/80 via-slate-900/90 to-blue-950/80 border text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-all duration-500 ${
                    headlineIndex === 2
                      ? 'border-sky-400 ring-2 ring-sky-400/40 shadow-[0_0_25px_rgba(14,165,233,0.35)]'
                      : 'border-sky-500/30'
                  }`}>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center shrink-0 mt-0.5">
                        <Droplets className="w-5 h-5 text-sky-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-sky-300 font-bold">Upcoming Core Motive</span>
                          <span className="text-white/30">&bull;</span>
                          <span className="text-[10px] font-mono text-sky-200">Future Generation Goal</span>
                        </div>
                        <p className="text-sm font-serif font-bold text-white mt-0.5">
                          Save Water &amp; Protect Groundwater Security
                        </p>
                        <p className="text-xs text-sky-200/80 font-sans mt-0.5 max-w-md">
                          We haven&apos;t conducted a water action yet. We are organizing youth volunteer teams to clean water channels and safeguard groundwater for future generations.
                        </p>
                      </div>
                    </div>
                    <Link
                      to="/get-involved"
                      className="shrink-0 px-3.5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold transition-all shadow-md self-end sm:self-auto"
                    >
                      Join Motive &rarr;
                    </Link>
                  </div>

                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DIRECT MICRO-SPONSORSHIPS (THAAGAM MODEL ELEVATED) ===== */}
      <HomeDirectImpact />

      {/* ===== MISSION PILLARS: FEED • PLANT • BUILD • RESPOND ===== */}
      <section className="bg-white dark:bg-[#02110A] py-20 sm:py-28">
        <div className="container-max container-px">
          <Reveal>
            <SectionHeading
              eyebrow="Core Pillars"
              title="FEED &bull; PLANT &bull; BUILD &bull; RESPOND"
              intro="Four foundational paths through which we organize direct community nourishment, environmental action, and youth collaboration."
              className="mb-14"
            />
          </Reveal>

          <div className="space-y-8 lg:space-y-12">
            {pillars.map((pillar, i) => {
              const Icon = pillarIcons[pillar.icon as keyof typeof pillarIcons];
              const isReversed = i % 2 === 1;
              return (
                <Reveal key={pillar.id} delay={i * 100}>
                  <div className={`grid lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-slate-50/70 dark:bg-[#031C11] border border-slate-200/90 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-xs hover:shadow-xl transition-shadow ${isReversed ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                    <div className="lg:col-span-7">
                      <div className="relative overflow-hidden aspect-[16/10] bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-white/10">
                        <img
                          src={pillar.image}
                          alt={pillar.imageAlt}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                      </div>
                    </div>
                    <div className="lg:col-span-5">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-600 to-forest text-white shadow-xs">
                          {Icon && <Icon className="w-5 h-5 text-emerald-200" />}
                        </span>
                        <span className="text-2xl font-serif font-extrabold text-slate-900 dark:text-white tracking-tight">
                          {pillar.name}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-serif font-bold text-slate-800 dark:text-slate-100 leading-snug">
                        {pillar.title}
                      </h3>
                      <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                        {pillar.description}
                      </p>
                      <Link to={pillar.link} className="link-underline mt-6 inline-flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-400">
                        <span>View {pillar.name.toLowerCase()} activities</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== BLUE HORIZON: SAVE WATER FOR FUTURE GENERATIONS (CORE MOTIVE) ===== */}
      <section className="bg-gradient-to-b from-[#021422] via-[#031E2F] to-[#02110A] text-white py-20 sm:py-28 relative overflow-hidden border-y border-sky-500/20">
        {/* Subtle Water Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container-max container-px relative z-10">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-300 text-xs font-mono font-semibold tracking-wider mb-4 shadow-[0_0_20px_rgba(14,165,233,0.2)]">
                <Droplets className="w-4 h-4 text-sky-400 animate-pulse" />
                <span>CORE MOTIVE &bull; SAVE WATER FOR FUTURE GENERATIONS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-white text-balance tracking-tight leading-tight">
                Every drop saved today is life for our children tomorrow.
              </h2>
              <p className="mt-5 text-sm sm:text-base text-sky-100/80 leading-relaxed text-pretty font-sans">
                Till now, ONDRINAI has focused on direct feeding and native Panai tree planting. We haven&apos;t performed a water action yet &mdash; but water security is our defining future motive. We are actively organizing ground plans and youth volunteers to safeguard Madurai&apos;s groundwater table with 100% honesty and zero fake claims.
              </p>
            </div>
          </Reveal>

          {/* 3 Water Strategy Blueprints (Clean Pure CSS Glass Cards) */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto mb-14">
            <Reveal delay={100}>
              <div className="bg-[#021824]/90 backdrop-blur-xl border border-sky-500/30 hover:border-sky-400/60 p-7 rounded-2xl h-full flex flex-col justify-between transition-all hover:-translate-y-1 shadow-lg">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-300 mb-5 font-mono font-bold text-lg">
                    01
                  </div>
                  <h3 className="text-lg font-serif font-bold text-white mb-2">
                    Groundwater Recharge Planning
                  </h3>
                  <p className="text-xs sm:text-sm text-sky-200/80 leading-relaxed font-sans">
                    Surveying local community dry lands and planning volunteer-led rainwater percolation pits to capture seasonal monsoons directly into underground aquifers.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-sky-500/20 flex items-center gap-2 text-[11px] font-mono text-sky-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                  <span>Ground Planning Stage</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="bg-[#021824]/90 backdrop-blur-xl border border-sky-500/30 hover:border-sky-400/60 p-7 rounded-2xl h-full flex flex-col justify-between transition-all hover:-translate-y-1 shadow-lg">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-300 mb-5 font-mono font-bold text-lg">
                    02
                  </div>
                  <h3 className="text-lg font-serif font-bold text-white mb-2">
                    Inlet Channel Revival
                  </h3>
                  <p className="text-xs sm:text-sm text-sky-200/80 leading-relaxed font-sans">
                    Organizing youth cleanup squads to unblock neglected lake inlets and traditional pond bunds in rural Madurai so rainwater flows freely without flash runoff.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-sky-500/20 flex items-center gap-2 text-[11px] font-mono text-sky-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                  <span>Volunteer Mobilization</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="bg-[#021824]/90 backdrop-blur-xl border border-sky-500/30 hover:border-sky-400/60 p-7 rounded-2xl h-full flex flex-col justify-between transition-all hover:-translate-y-1 shadow-lg">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-300 mb-5 font-mono font-bold text-lg">
                    03
                  </div>
                  <h3 className="text-lg font-serif font-bold text-white mb-2">
                    Youth Conservation Pledge
                  </h3>
                  <p className="text-xs sm:text-sm text-sky-200/80 leading-relaxed font-sans">
                    Instilling water-saving values in youth, students, and neighborhood families to eliminate waste and protect water as our most precious community inheritance.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-sky-500/20 flex items-center gap-2 text-[11px] font-mono text-sky-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                  <span>Community Education</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Action Callout */}
          <Reveal delay={350}>
            <div className="p-6 sm:p-8 rounded-3xl bg-[#02131F]/90 border border-sky-500/40 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-2xl">
              <div>
                <p className="text-base font-serif font-bold text-white">
                  Want to help lead our first water drive?
                </p>
                <p className="text-xs text-sky-200/80 mt-1 max-w-md font-sans">
                  We need environmental students, local residents, and enthusiastic youth to plan our inaugural water conservation project in Madurai.
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <a
                  href={WHATSAPP_COMMUNITY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition-all shadow-[0_0_20px_rgba(14,165,233,0.5)] flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Join Water Wing</span>
                </a>
                <Link
                  to="/get-involved"
                  className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-all"
                >
                  Get Involved &rarr;
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== ACTIVITY HIGHLIGHTS ===== */}
      <section className="bg-slate-50 dark:bg-[#03160E] py-20 sm:py-28 border-y border-slate-200/80 dark:border-white/10">
        <div className="container-max container-px">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
              <SectionHeading
                eyebrow="Verified Work"
                title="Action speaks louder than promises."
                intro="We believe meaningful change begins with doing what we can, where we are. Here are our documented activities."
              />
              <div className="flex items-center gap-3 shrink-0">
                <Link to="/gallery" className="btn-secondary rounded-xl text-xs hidden sm:inline-flex">
                  View Photo Gallery
                </Link>
                <Link to="/activities" className="btn-primary rounded-xl shrink-0 hidden md:inline-flex text-xs">
                  View All Activities
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {activities.map((activity, i) => (
              <Reveal key={activity.id} delay={i * 100}>
                <ActivityCard activity={activity} index={i} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 md:hidden">
              <Link to="/activities" className="btn-primary rounded-xl w-full justify-center">
                View All Activities
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/gallery" className="btn-secondary rounded-xl w-full justify-center text-xs">
                View Photo Gallery
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== COMMUNITY INVITATION ===== */}
      <CTASection
        title="Change begins when we come together."
        copy="You don't need to contribute money to make a difference. Give your time, share your skills, contribute supplies, or join us on the ground. Every sincere effort matters."
        primaryLabel="Join Volunteer WhatsApp Community"
        primaryLink={WHATSAPP_COMMUNITY_URL}
        secondaryLabel="Sponsor a Meal • ₹30"
        secondaryLink="/donate"
        variant="dark"
      />

      {/* ===== HOW TO GET INVOLVED ===== */}
      <section className="bg-slate-50 dark:bg-[#02110A] py-20 sm:py-28">
        <div className="container-max container-px">
          <Reveal>
            <SectionHeading
              eyebrow="Participation Paths"
              title="Find your way to help."
              intro="Participation does not require a financial contribution. Every form of sincere effort is welcome."
              className="mb-14"
            />
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
            {involvementPaths.map((path, i) => {
              const Icon = involvementIcons[path.icon];
              return (
                <Reveal key={path.id} delay={i * 80}>
                  <div className="border border-slate-200/90 dark:border-white/10 bg-white dark:bg-[#031C11] p-7 sm:p-8 rounded-2xl shadow-xs hover:shadow-xl transition-all h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <span className="inline-flex items-center justify-center w-12 h-12 shrink-0 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300">
                          {Icon && <Icon className="w-5 h-5" />}
                        </span>
                        <h3 className="text-base font-sans font-bold tracking-wide text-slate-900 dark:text-white uppercase">
                          {path.label}
                        </h3>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                        {path.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={200}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              <Link to="/get-involved" className="btn-primary rounded-xl">
                Explore All Ways to Get Involved
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/donate" className="btn-secondary rounded-xl">
                View Contribution Benchmarks
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== PARTNERS & ALLIANCES SECTION ===== */}
      <PartnersSection />

      {/* ===== CLOSING BRAND SECTION ===== */}
      <section className="bg-[#02180E] text-white py-24 sm:py-32 relative overflow-hidden cyber-grid-dark">
        <div className="container-max container-px text-center relative z-10">
          <Reveal>
            <BotanicalDivider className="mb-8 opacity-70" />
            <p className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium italic text-balance max-w-3xl mx-auto leading-relaxed text-emerald-100">
              &ldquo;{siteConfig.philosophy}&rdquo;
            </p>
            <p className="mt-6 text-sm sm:text-base text-slate-300 tracking-wide font-medium">
              {siteConfig.brandName} &mdash; {siteConfig.tagline}
            </p>
            <p className="mt-2 font-tamil text-emerald-400/80 text-sm">
              {siteConfig.tamilTagline}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/donate?cause_breakfast-person=1"
                className="btn-donate text-sm py-3.5 px-6 rounded-xl shadow-lg"
              >
                ⚡ Sponsor a Meal &bull; ₹30
              </Link>
              <a
                href={WHATSAPP_COMMUNITY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-light rounded-xl inline-flex items-center gap-2 py-3.5 px-6 text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                Join Our Volunteer Community
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <p className="text-xs text-slate-400 mt-4 max-w-md mx-auto font-mono">
              {siteConfig.volunteerExplanation}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
