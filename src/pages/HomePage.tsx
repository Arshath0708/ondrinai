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

export function HomePage() {
  const [activePillar, setActivePillar] = useState<'FEED' | 'PLANT'>('FEED');

  return (
    <>
      <SEO
        title="Together, We Create a Better Tomorrow"
        description={siteConfig.description}
        image={ASSETS.logo}
      />

      {/* ===== HERO: THAAGAM-GRADE INSTITUTIONAL VALUE & PROOF ===== */}
      <section className="bg-slate-50 dark:bg-[#0B0F19] pt-10 pb-14 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-28 overflow-hidden border-b border-slate-200/80 dark:border-slate-800 relative editorial-mesh">
        <div className="container-max container-px relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left: Authoritative Institutional Copy */}
            <div className="lg:col-span-6 order-1">
              <Reveal>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs font-mono font-semibold tracking-wider mb-4">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                  </span>
                  <span>MADURAI CITIZEN AID &bull; ZERO SALARIES &bull; 100% DIRECT</span>
                </div>
              </Reveal>

              <Reveal delay={80}>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-slate-900 dark:text-white leading-[1.12] tracking-tight text-balance">
                  Direct Citizen Aid.
                  <br />
                  <span className="text-amber-600 dark:text-amber-400">
                    Real On-Ground Impact.
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={140}>
                <p className="mt-4 sm:mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl text-pretty leading-relaxed font-sans">
                  We are students and youth from Madurai running an independent community movement. We take zero salaries and zero admin cuts &mdash; every rupee contributed directly feeds an elderly street resident, nourishes starving stray animals, and plants native Palmyra trees across Tamil Nadu.
                </p>
              </Reveal>

              {/* Thaagam Foundation 4-Point Verified Metric Proof Strip */}
              <Reveal delay={200}>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 my-6 sm:my-8 p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm">
                  <div className="p-2 sm:p-2.5 text-center">
                    <div className="text-2xl sm:text-3xl font-serif font-extrabold text-amber-600 dark:text-amber-400">25+</div>
                    <div className="text-[11px] sm:text-xs font-sans text-slate-600 dark:text-slate-400 mt-0.5 leading-tight">Fresh Meals Shared</div>
                  </div>
                  <div className="p-2 sm:p-2.5 text-center border-l border-slate-200 dark:border-slate-800">
                    <div className="text-2xl sm:text-3xl font-serif font-extrabold text-orange-600 dark:text-orange-400">2,000+</div>
                    <div className="text-[11px] sm:text-xs font-sans text-slate-600 dark:text-slate-400 mt-0.5 leading-tight">Panai Seeds Sown</div>
                  </div>
                  <div className="p-2 sm:p-2.5 text-center border-l border-slate-200 dark:border-slate-800">
                    <div className="text-2xl sm:text-3xl font-serif font-extrabold text-amber-600 dark:text-amber-400">₹0</div>
                    <div className="text-[11px] sm:text-xs font-sans text-slate-600 dark:text-slate-400 mt-0.5 leading-tight">Admin Deductions</div>
                  </div>
                  <div className="p-2 sm:p-2.5 text-center border-l border-slate-200 dark:border-slate-800">
                    <div className="text-2xl sm:text-3xl font-serif font-extrabold text-sky-600 dark:text-sky-400">100%</div>
                    <div className="text-[11px] sm:text-xs font-sans text-slate-600 dark:text-slate-400 mt-0.5 leading-tight">Ground Verified</div>
                  </div>
                </div>
              </Reveal>

              {/* Action Buttons (Full-width on mobile, flex on desktop) */}
              <Reveal delay={240}>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <a
                    href="#direct-impact"
                    className="btn-donate text-sm py-3.5 px-6 rounded-xl shadow-lg flex items-center justify-center gap-2 font-bold"
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
                    <span>Join Volunteer Movement</span>
                  </a>
                  <Link to="/activities" className="btn-secondary rounded-xl text-sm py-3.5 px-5 text-center">
                    Explore Work
                  </Link>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800">
                  <p className="font-serif text-base sm:text-lg text-slate-800 dark:text-slate-200 italic font-semibold">
                    &ldquo;{siteConfig.tagline}&rdquo;
                  </p>
                  <p className="font-tamil text-xs sm:text-sm text-slate-500 dark:text-amber-400/90 mt-1 font-medium">
                    {siteConfig.tamilTagline}
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Right: Institutional Ground Showcase Card */}
            <div className="lg:col-span-6 order-2">
              <Reveal delay={200}>
                <div className="relative max-w-xl mx-auto lg:max-w-none">
                  {/* Subtle Background Glow */}
                  <div className="absolute -inset-4 bg-gradient-to-tr from-amber-500/10 via-orange-600/10 to-amber-500/10 rounded-3xl blur-2xl opacity-60 pointer-events-none" />

                  {/* Main Container */}
                  <div className="relative bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
                    
                    {/* Top Switcher Bar */}
                    <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                        <button
                          type="button"
                          onClick={() => setActivePillar('FEED')}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                            activePillar === 'FEED'
                              ? 'bg-amber-600 text-white shadow-sm font-bold'
                              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                          }`}
                        >
                          <Heart className="w-3.5 h-3.5" />
                          <span>Feed &bull; Meals</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setActivePillar('PLANT')}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                            activePillar === 'PLANT'
                              ? 'bg-amber-600 text-white shadow-sm font-bold'
                              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                          }`}
                        >
                          <Sprout className="w-3.5 h-3.5" />
                          <span>Plant &bull; Trees</span>
                        </button>
                      </div>

                      <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 dark:bg-amber-950/60 rounded-full border border-amber-200 dark:border-amber-800/80 text-[11px] font-mono font-semibold text-amber-800 dark:text-amber-300">
                        <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                        <span>ON-GROUND</span>
                      </div>
                    </div>

                    {/* Viewport Window */}
                    <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/11] bg-slate-900 border border-slate-200 dark:border-slate-800 group">
                      <img
                        key={activePillar}
                        src={activePillar === 'FEED' ? ASSETS.activity1 : ASSETS.activity2}
                        alt={activePillar === 'FEED' ? 'Food distribution initiative in Madurai' : 'Panai seed planting initiative in Madurai'}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                      {/* Location Tag */}
                      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-black/70 backdrop-blur-md border border-white/20 text-[11px] font-semibold text-white rounded-lg shadow-sm">
                          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                          <span>{activePillar === 'FEED' ? '📍 Madurai Streets • Fresh Meal Drive' : '📍 Madurai Bypass • Native Panai Sowing'}</span>
                        </div>
                      </div>

                      {/* Bottom Info Ribbon */}
                      <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-10 bg-slate-950/80 backdrop-blur-xl border border-white/15 p-3 sm:p-4 rounded-xl flex items-center justify-between gap-3 text-white">
                        <div>
                          <div className="text-[10px] font-mono text-amber-400 uppercase tracking-wider font-bold">
                            {activePillar === 'FEED' ? 'Dignity Action' : 'Ecological Sowing'}
                          </div>
                          <p className="text-sm sm:text-base font-serif font-bold mt-0.5">
                            {activePillar === 'FEED' ? '100+ Warm Meals Shared' : '2,000+ Native Panai Seeds'}
                          </p>
                        </div>
                        <Link
                          to="/gallery"
                          className="shrink-0 inline-flex items-center gap-1 px-3 py-1.5 bg-white/10 hover:bg-amber-500 hover:text-white text-amber-300 border border-white/20 rounded-lg text-xs font-semibold transition-all"
                        >
                          <span>Gallery</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>

                    {/* Team Volunteer Strip */}
                    <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className="flex -space-x-2 overflow-hidden">
                          {teamMembers.slice(0, 4).map((member) => (
                            <img
                              key={member.id}
                              src={member.image}
                              alt={member.name}
                              className="inline-block h-8 w-8 rounded-full ring-2 ring-amber-500/80 object-cover object-top"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
                          ))}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                            {teamMembers.length}+ Dedicated Youth Volunteers
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">
                            Not one person. All of us, together.
                          </p>
                        </div>
                      </div>

                      <a
                        href="#direct-impact"
                        className="text-xs font-semibold text-amber-700 dark:text-amber-400 hover:underline inline-flex items-center gap-1"
                      >
                        <span>Sponsor directly</span>
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>

                  </div>

                  {/* Future Generation Water Motive Callout Card */}
                  <div className="mt-4 p-4 rounded-2xl bg-slate-900 border border-sky-500/30 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center shrink-0 mt-0.5">
                        <Droplets className="w-4 h-4 text-sky-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-sky-400 font-bold">Upcoming Core Motive</span>
                          <span className="text-white/30">&bull;</span>
                          <span className="text-[10px] font-mono text-sky-200">Future Generation Goal</span>
                        </div>
                        <p className="text-sm font-serif font-bold text-white mt-0.5">
                          Save Water &amp; Groundwater Security
                        </p>
                        <p className="text-xs text-slate-300 font-sans mt-0.5 max-w-md">
                          We are preparing youth volunteer teams to clean water channels and protect groundwater in Madurai.
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
      <section className="bg-white dark:bg-[#0B0F19] py-20 sm:py-28">
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
                  <div className={`grid lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs hover:shadow-xl transition-shadow ${isReversed ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                    <div className="lg:col-span-7">
                      <div className="relative overflow-hidden aspect-[16/10] bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800">
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
                        <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-700 text-white shadow-xs">
                          {Icon && <Icon className="w-5 h-5 text-amber-100" />}
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
                      <Link to={pillar.link} className="link-underline mt-6 inline-flex items-center gap-1.5 font-bold text-amber-600 dark:text-amber-400">
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
      <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-[#0B0F19] text-white py-20 sm:py-28 relative overflow-hidden border-y border-sky-500/20">
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
              <div className="bg-slate-900/90 backdrop-blur-xl border border-sky-500/30 hover:border-sky-400/60 p-7 rounded-2xl h-full flex flex-col justify-between transition-all hover:-translate-y-1 shadow-lg">
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
              <div className="bg-slate-900/90 backdrop-blur-xl border border-sky-500/30 hover:border-sky-400/60 p-7 rounded-2xl h-full flex flex-col justify-between transition-all hover:-translate-y-1 shadow-lg">
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
              <div className="bg-slate-900/90 backdrop-blur-xl border border-sky-500/30 hover:border-sky-400/60 p-7 rounded-2xl h-full flex flex-col justify-between transition-all hover:-translate-y-1 shadow-lg">
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
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-sky-500/40 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-2xl">
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
      <section className="bg-slate-50 dark:bg-[#0B0F19] py-20 sm:py-28 border-y border-slate-200/80 dark:border-slate-800">
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
      <section className="bg-slate-50 dark:bg-[#0B0F19] py-20 sm:py-28">
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
                  <div className="border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-7 sm:p-8 rounded-2xl shadow-xs hover:shadow-xl transition-all h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <span className="inline-flex items-center justify-center w-12 h-12 shrink-0 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300">
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
      <section className="bg-slate-950 dark:bg-[#0B0F19] text-white py-24 sm:py-32 relative overflow-hidden border-t border-slate-800">
        <div className="container-max container-px text-center relative z-10">
          <Reveal>
            <BotanicalDivider className="mb-8 opacity-70" />
            <p className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium italic text-balance max-w-3xl mx-auto leading-relaxed text-amber-100">
              &ldquo;{siteConfig.philosophy}&rdquo;
            </p>
            <p className="mt-6 text-sm sm:text-base text-slate-300 tracking-wide font-medium">
              {siteConfig.brandName} &mdash; {siteConfig.tagline}
            </p>
            <p className="mt-2 font-tamil text-amber-400/80 text-sm">
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
