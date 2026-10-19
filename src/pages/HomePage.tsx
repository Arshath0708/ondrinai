import { Link } from 'react-router-dom';
import { ArrowRight, Sprout, Heart, Users, Footprints, HandCoins, Package, Sparkles, MessageCircle } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Reveal, SectionHeading, CTASection, BotanicalDivider } from '@/components/ui/Primitives';
import { ActivityCard } from '@/components/ActivityCard';
import { PartnersSection } from '@/components/PartnersSection';
import { siteConfig, pillars, involvementPaths, WHATSAPP_COMMUNITY_URL, ASSETS } from '@/config/site';
import { activities } from '@/data/activities';

const pillarIcons = {
  heart: Heart,
  sprout: Sprout,
  users: Users,
};

const involvementIcons = {
  'footprints': Footprints,
  'hand-coins': HandCoins,
  'package': Package,
  'sparkles': Sparkles,
};

export function HomePage() {
  return (
    <>
      <SEO
        title="Together, We Create a Better Tomorrow"
        description={siteConfig.description}
        image={ASSETS.logo}
      />

      {/* ===== HERO ===== */}
      <section className="bg-cream pt-12 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-32 overflow-hidden border-b border-forest/10">
        <div className="container-max container-px">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left: copy */}
            <div className="lg:col-span-6 order-1">
              <Reveal>
                <p className="eyebrow text-accent-dark mb-5 tracking-editorial">
                  PEOPLE &bull; PLANET &bull; FUTURE
                </p>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-medium text-forest text-balance leading-[1.08]">
                  Small actions.<br />A better tomorrow.
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-6 text-base sm:text-lg text-charcoal/80 max-w-lg text-pretty leading-relaxed">
                  {siteConfig.description}
                </p>
              </Reveal>
              <Reveal delay={240}>
                <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <a
                    href={WHATSAPP_COMMUNITY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary group"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Join Our Community
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <Link to="/activities" className="btn-secondary">
                    Explore Our Work
                  </Link>
                </div>
                <p className="text-xs text-charcoal/60 mt-3.5 max-w-md">
                  {siteConfig.volunteerExplanation}
                </p>
              </Reveal>
              <Reveal delay={320}>
                <div className="mt-10 pt-8 border-t border-forest/15">
                  <p className="font-serif text-lg sm:text-xl text-forest italic">
                    &ldquo;{siteConfig.tagline}&rdquo;
                  </p>
                  <p className="font-tamil text-sm text-charcoal/60 mt-2">
                    {siteConfig.tamilTagline}
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Right: authentic imagery composition */}
            <div className="lg:col-span-6 order-2">
              <Reveal delay={200}>
                <div className="relative">
                  <div className="relative overflow-hidden border border-forest/20 shadow-xl bg-forest aspect-[4/3] sm:aspect-[5/4]">
                    <img
                      src={ASSETS.activity2}
                      alt="ONDRINAI volunteers during Panai seed planting initiative in Madurai"
                      className="w-full h-full object-cover"
                      fetchPriority="high"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-green/80 via-deep-green/20 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                      <div className="bg-off-white/95 backdrop-blur-sm px-4 py-3 shadow-md border border-forest/10 max-w-[280px]">
                        <p className="text-[11px] font-sans font-bold uppercase tracking-wider text-forest">
                          Student-Led Community
                        </p>
                        <p className="text-xs text-charcoal/80 font-serif mt-0.5">
                          Active in Madurai, Tamil Nadu
                        </p>
                      </div>
                      <span className="hidden sm:inline-block bg-forest/90 text-cream text-xs font-mono px-3 py-1.5 backdrop-blur-sm border border-cream/20">
                        3 Activities Completed
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MISSION PILLARS: FEED • PLANT • BUILD ===== */}
      <section className="bg-off-white py-20 sm:py-28">
        <div className="container-max container-px">
          <Reveal>
            <SectionHeading
              eyebrow="Core Pillars"
              title="FEED &bull; PLANT &bull; BUILD"
              intro="Three foundational paths through which we organize ground action and community care."
              className="mb-14"
            />
          </Reveal>

          <div className="space-y-8 lg:space-y-12">
            {pillars.map((pillar, i) => {
              const Icon = pillarIcons[pillar.icon as keyof typeof pillarIcons];
              const isReversed = i % 2 === 1;
              return (
                <Reveal key={pillar.id} delay={i * 100}>
                  <div className={`grid lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-cream/30 border border-forest/10 p-6 sm:p-8 ${isReversed ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                    <div className="lg:col-span-7">
                      <div className="relative overflow-hidden aspect-[16/10] bg-sage/20 border border-forest/10">
                        <img
                          src={pillar.image}
                          alt={pillar.imageAlt}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="lg:col-span-5">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="inline-flex items-center justify-center w-11 h-11 bg-forest text-cream">
                          {Icon && <Icon className="w-5 h-5" />}
                        </span>
                        <span className="text-2xl font-serif font-bold text-forest tracking-wide">
                          {pillar.name}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-serif text-charcoal leading-snug">
                        {pillar.title}
                      </h3>
                      <p className="mt-4 text-sm text-charcoal/70 leading-relaxed">
                        {pillar.description}
                      </p>
                      <Link to={pillar.link} className="link-underline mt-6 inline-flex items-center gap-1.5">
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

      {/* ===== ACTIVITY HIGHLIGHTS ===== */}
      <section className="bg-cream py-20 sm:py-28 border-y border-forest/10">
        <div className="container-max container-px">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
              <SectionHeading
                eyebrow="Verified Work"
                title="Action speaks louder than promises."
                intro="We believe meaningful change begins with doing what we can, where we are. Here are our documented activities."
              />
              <div className="flex items-center gap-3 shrink-0">
                <Link to="/gallery" className="btn-outline text-xs hidden sm:inline-flex">
                  View Photo Gallery
                </Link>
                <Link to="/activities" className="btn-secondary shrink-0 hidden md:inline-flex">
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
              <Link to="/activities" className="btn-secondary w-full justify-center">
                View All Activities
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/gallery" className="btn-outline w-full justify-center text-xs">
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
        primaryLabel="Join Our WhatsApp Community"
        primaryLink={WHATSAPP_COMMUNITY_URL}
        secondaryLabel="Contribute Toward a Cause"
        secondaryLink="/donate"
        variant="dark"
      />

      {/* ===== HOW TO GET INVOLVED ===== */}
      <section className="bg-off-white py-20 sm:py-28">
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
                  <div className="border border-forest/15 bg-cream/50 p-7 sm:p-8 card-hover h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <span className="inline-flex items-center justify-center w-12 h-12 shrink-0 bg-forest text-cream">
                          {Icon && <Icon className="w-5 h-5" />}
                        </span>
                        <h3 className="text-base font-sans font-bold tracking-wide text-forest uppercase">
                          {path.label}
                        </h3>
                      </div>
                      <p className="text-sm text-charcoal/70 leading-relaxed">
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
              <Link to="/get-involved" className="btn-primary">
                Explore All Ways to Get Involved
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/donate" className="btn-secondary">
                View Contribution Benchmarks
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== PARTNERS & ALLIANCES SECTION ===== */}
      <PartnersSection />

      {/* ===== CLOSING BRAND SECTION ===== */}
      <section className="bg-forest text-cream py-24 sm:py-32 relative overflow-hidden">
        <div className="container-max container-px text-center relative z-10">
          <Reveal>
            <BotanicalDivider className="mb-8 opacity-70" />
            <p className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium italic text-balance max-w-3xl mx-auto leading-relaxed">
              &ldquo;{siteConfig.philosophy}&rdquo;
            </p>
            <p className="mt-6 text-sm sm:text-base text-cream/70 tracking-wide font-medium">
              {siteConfig.brandName} &mdash; {siteConfig.tagline}
            </p>
            <p className="mt-2 font-tamil text-cream/60 text-sm">
              {siteConfig.tamilTagline}
            </p>
            <div className="mt-10">
              <a
                href={WHATSAPP_COMMUNITY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-light inline-flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Join Our Volunteer Community
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <p className="text-xs text-cream/50 mt-4 max-w-md mx-auto">
              {siteConfig.volunteerExplanation}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
