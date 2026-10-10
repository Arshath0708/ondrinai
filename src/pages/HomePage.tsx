import { Link } from 'react-router-dom';
import { ArrowRight, Sprout, Heart, Users, Footprints, HandCoins, Package, Sparkles } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Reveal, SectionHeading, CTASection, CategoryBadge, BotanicalDivider } from '@/components/ui/Primitives';
import { ActivityCard } from '@/components/ActivityCard';
import { siteConfig, pillars, involvementPaths, VOLUNTEER_FORM_URL } from '@/config/site';
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
      <SEO />

      {/* ===== HERO ===== */}
      <section className="bg-cream pt-12 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-32 overflow-hidden">
        <div className="container-max container-px">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left: copy */}
            <div className="lg:col-span-6 order-1">
              <Reveal>
                <p className="eyebrow text-accent-dark mb-6">
                  PEOPLE &bull; PLANET &bull; FUTURE
                </p>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-medium text-forest text-balance leading-[1.08]">
                  Small actions.<br />A better tomorrow.
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-7 text-base sm:text-lg text-charcoal/70 max-w-lg text-pretty leading-relaxed">
                  {siteConfig.description}
                </p>
              </Reveal>
              <Reveal delay={240}>
                <div className="mt-9 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  {VOLUNTEER_FORM_URL ? (
                    <a href={VOLUNTEER_FORM_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
                      Join Our Community
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  ) : (
                    <Link to="/get-involved" className="btn-primary">
                      Join Our Community
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                  <Link to="/activities" className="btn-secondary">
                    Explore Our Work
                  </Link>
                </div>
              </Reveal>
              <Reveal delay={320}>
                <div className="mt-10 pt-8 border-t border-forest/15">
                  <p className="font-serif text-lg sm:text-xl text-forest italic">
                    {siteConfig.tagline}
                  </p>
                  <p className="font-tamil text-sm text-charcoal/50 mt-2">
                    {siteConfig.tamilTagline}
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Right: image */}
            <div className="lg:col-span-6 order-2">
              <Reveal delay={200}>
                <div className="relative">
                  <div className="absolute -inset-4 bg-sage/20 -z-10 hidden lg:block" />
                  <div className="relative overflow-hidden aspect-[4/5] sm:aspect-[5/6] lg:aspect-[4/5]">
                    <img
                      src="https://images.pexels.com/photos/6646952/pexels-photo-6646952.jpeg?auto=compress&cs=tinysrgb&w=900"
                      alt="Volunteers working together during a community food distribution activity"
                      className="w-full h-full object-cover"
                      fetchPriority="high"
                    />
                  </div>
                  <div className="absolute bottom-6 left-6 bg-off-white/95 backdrop-blur-sm px-5 py-4 max-w-[220px] shadow-lg hidden sm:block">
                    <p className="text-xs font-semibold uppercase tracking-wider text-accent-dark mb-1">
                      Student-led
                    </p>
                    <p className="text-sm text-charcoal/80 leading-snug">
                      Based in Madurai, Tamil Nadu
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MISSION PILLARS ===== */}
      <section className="bg-off-white py-20 sm:py-28">
        <div className="container-max container-px">
          <Reveal>
            <SectionHeading
              eyebrow="What we do"
              title="Three ways to create change."
              intro="Different actions. One shared purpose."
              className="mb-14"
            />
          </Reveal>

          <div className="space-y-8 lg:space-y-12">
            {pillars.map((pillar, i) => {
              const Icon = pillarIcons[pillar.icon as keyof typeof pillarIcons];
              const isReversed = i % 2 === 1;
              return (
                <Reveal key={pillar.id} delay={i * 100}>
                  <div className={`grid lg:grid-cols-12 gap-8 lg:gap-12 items-center ${isReversed ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                    <div className="lg:col-span-7">
                      <div className="relative overflow-hidden aspect-[16/10] bg-sage/20">
                        <img
                          src={pillar.image}
                          alt={pillar.imageAlt}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="lg:col-span-5">
                      <div className="flex items-center gap-3 mb-5">
                        <span className="inline-flex items-center justify-center w-10 h-10 bg-forest/10 text-forest">
                          {Icon && <Icon className="w-5 h-5" />}
                        </span>
                        <span className="text-2xl font-serif font-semibold text-forest tracking-wide">
                          {pillar.name}
                        </span>
                      </div>
                      <p className="text-lg sm:text-xl font-serif text-charcoal leading-relaxed text-balance">
                        {pillar.title}
                      </p>
                      <p className="mt-4 text-sm text-charcoal/65 leading-relaxed">
                        {pillar.description}
                      </p>
                      <Link to={pillar.link} className="link-underline mt-6">
                        View {pillar.name.toLowerCase()} activities
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
      <section className="bg-cream py-20 sm:py-28">
        <div className="container-max container-px">
          <Reveal>
            <SectionHeading
              eyebrow="Our work"
              title="Action speaks louder than promises."
              intro="We believe meaningful change begins with doing what we can, where we are."
              className="mb-14"
            />
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {activities.map((activity, i) => (
              <Reveal key={activity.id} delay={i * 100}>
                <ActivityCard activity={activity} index={i} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div className="mt-12 text-center">
              <Link to="/activities" className="btn-secondary">
                Explore All Activities
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== COMMUNITY INVITATION ===== */}
      <CTASection
        title="Change begins when we come together."
        copy="You don't need to have money to make a difference. Give your time, share your skills, contribute resources, or join us on the ground. Every sincere effort matters."
        primaryLabel="Become a Volunteer"
        primaryLink={VOLUNTEER_FORM_URL || '/get-involved'}
        secondaryLabel="Discover Ways to Contribute"
        secondaryLink="/get-involved"
        variant="dark"
      />

      {/* ===== HOW TO GET INVOLVED ===== */}
      <section className="bg-off-white py-20 sm:py-28">
        <div className="container-max container-px">
          <Reveal>
            <SectionHeading
              eyebrow="Get involved"
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
                  <div className="border border-forest/10 bg-cream/50 p-7 sm:p-8 card-hover h-full">
                    <div className="flex items-start gap-4">
                      <span className="inline-flex items-center justify-center w-12 h-12 shrink-0 bg-forest text-cream">
                        {Icon && <Icon className="w-5 h-5" />}
                      </span>
                      <div>
                        <h3 className="text-base font-sans font-bold tracking-wide text-forest uppercase">
                          {path.label}
                        </h3>
                        <p className="mt-2 text-sm text-charcoal/65 leading-relaxed">
                          {path.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={200}>
            <div className="mt-12 text-center">
              <Link to="/get-involved" className="btn-primary">
                Find Your Way to Help
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== CLOSING BRAND SECTION ===== */}
      <section className="bg-forest text-cream py-24 sm:py-32 relative overflow-hidden">
        <div className="container-max container-px text-center relative z-10">
          <Reveal>
            <BotanicalDivider className="mb-8 opacity-70" />
            <p className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium italic text-balance max-w-3xl mx-auto">
              {siteConfig.philosophy}
            </p>
            <p className="mt-8 text-sm sm:text-base text-cream/60 tracking-wide">
              {siteConfig.brandName} &mdash; {siteConfig.tagline}
            </p>
            <div className="mt-10">
              {VOLUNTEER_FORM_URL ? (
                <a href={VOLUNTEER_FORM_URL} target="_blank" rel="noopener noreferrer" className="btn-light">
                  Become a Volunteer
                  <ArrowRight className="w-4 h-4" />
                </a>
              ) : (
                <Link to="/get-involved" className="btn-light">
                  Become a Volunteer
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </Reveal>
        </div>
        {/* Decorative botanical lines */}
        <svg
          className="absolute -left-20 top-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none"
          width="300"
          height="300"
          viewBox="0 0 300 300"
          fill="none"
          aria-hidden="true"
        >
          <path d="M150 0V300M150 0C120 40 100 80 100 120M150 0C180 40 200 80 200 120M100 120C120 130 135 135 150 135M200 120C180 130 165 135 150 135M100 180C120 170 135 165 150 165M200 180C180 170 165 165 150 165M150 135V165" stroke="#F5F1E7" strokeWidth="1" />
        </svg>
        <svg
          className="absolute -right-20 top-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none scale-x-[-1]"
          width="300"
          height="300"
          viewBox="0 0 300 300"
          fill="none"
          aria-hidden="true"
        >
          <path d="M150 0V300M150 0C120 40 100 80 100 120M150 0C180 40 200 80 200 120M100 120C120 130 135 135 150 135M200 120C180 130 165 135 150 135M100 180C120 170 135 165 150 165M200 180C180 170 165 165 150 165M150 135V165" stroke="#F5F1E7" strokeWidth="1" />
        </svg>
      </section>
    </>
  );
}
