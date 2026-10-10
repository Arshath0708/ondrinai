import { Link } from 'react-router-dom';
import { ArrowRight, Sprout, Heart, Users } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Reveal, SectionHeading, CTASection, BotanicalDivider } from '@/components/ui/Primitives';
import { siteConfig, values, pillars } from '@/config/site';

const pillarIcons = {
  heart: Heart,
  sprout: Sprout,
  users: Users,
};

export function AboutPage() {
  return (
    <>
      <SEO
        title="About ONDRINAI"
        description="ONDRINAI is a student-led community initiative in Madurai, Tamil Nadu, bringing people together around food support, environmental action, and community development."
      />

      {/* Hero */}
      <section className="bg-cream pt-32 pb-16 sm:pt-36 sm:pb-20">
        <div className="container-max container-px">
          <Reveal>
            <p className="eyebrow text-accent-dark mb-5">About ONDRINAI</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium text-forest text-balance max-w-4xl">
              Built on the belief that small actions matter.
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="bg-off-white py-20 sm:py-24">
        <div className="container-max container-px">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="text-lg sm:text-xl text-charcoal/80 leading-relaxed text-pretty">
                  ONDRINAI is a student-led community initiative originating in {siteConfig.foundedLocation}. The name means coming together, unity, and collective action &mdash; and that is exactly what drives the work.
                </p>
                <p className="mt-6 text-base text-charcoal/70 leading-relaxed">
                  ONDRINAI brings people together around three areas of action: sharing food with people in need, taking environmental action through tree and seed planting, and building stronger communities through awareness, education, and meaningful initiatives.
                </p>
                <p className="mt-6 text-base text-charcoal/70 leading-relaxed">
                  The initiative is growing step by step, guided by the belief that you don&rsquo;t need to have money to make a difference. Time, effort, skills, ideas, and a willingness to help can create real change.
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-5">
              <Reveal delay={120}>
                <div className="bg-forest text-cream p-8 sm:p-10">
                  <p className="eyebrow text-sage mb-4">Our Philosophy</p>
                  <p className="font-serif text-xl sm:text-2xl italic leading-relaxed">
                    {siteConfig.philosophy}
                  </p>
                  <BotanicalDivider className="mt-6 opacity-50" />
                  <p className="mt-6 text-sm text-cream/70">
                    {siteConfig.coreMessage}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-cream py-20 sm:py-24">
        <div className="container-max container-px">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <Reveal>
              <div className="border-t-2 border-forest pt-8">
                <p className="eyebrow text-accent-dark mb-4">Mission</p>
                <p className="text-lg sm:text-xl font-serif text-charcoal leading-relaxed text-pretty">
                  To bring people together to create meaningful social and environmental change through practical, transparent, and community-driven action.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="border-t-2 border-forest pt-8">
                <p className="eyebrow text-accent-dark mb-4">Vision</p>
                <p className="text-lg sm:text-xl font-serif text-charcoal leading-relaxed text-pretty">
                  A future where people take shared responsibility for their communities, their environment, and one another.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-off-white py-20 sm:py-28">
        <div className="container-max container-px">
          <Reveal>
            <SectionHeading
              eyebrow="What guides us"
              title="Our values."
              intro="Principles that shape every activity and every interaction."
              className="mb-14"
            />
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <Reveal key={value.name} delay={i * 60}>
                <div className="bg-cream/50 border border-forest/10 p-6 sm:p-7 h-full">
                  <h3 className="text-lg font-serif font-semibold text-forest mb-2">
                    {value.name}
                  </h3>
                  <p className="text-sm text-charcoal/65 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars explanation */}
      <section className="bg-cream py-20 sm:py-24">
        <div className="container-max container-px">
          <Reveal>
            <SectionHeading
              eyebrow="Our approach"
              title="FEED &bull; PLANT &bull; BUILD"
              intro="Three areas of action that guide everything we do."
              align="center"
              className="mb-14"
            />
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-6 lg:gap-8">
            {pillars.map((pillar, i) => {
              const Icon = pillarIcons[pillar.icon as keyof typeof pillarIcons];
              return (
                <Reveal key={pillar.id} delay={i * 100}>
                  <div className="text-center">
                    <span className="inline-flex items-center justify-center w-14 h-14 bg-forest text-cream mb-5">
                      {Icon && <Icon className="w-6 h-6" />}
                    </span>
                    <h3 className="text-lg font-sans font-bold tracking-wide text-forest uppercase mb-3">
                      {pillar.name}
                    </h3>
                    <p className="text-sm text-charcoal/65 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <Reveal delay={200}>
            <div className="mt-12 text-center">
              <Link to="/activities" className="btn-secondary">
                See Our Work
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Be part of what comes next."
        copy="ONDRINAI is built by volunteers who care. Whether you can join on the ground, share a skill, or contribute resources, there is a place for you."
        primaryLabel="Get Involved"
        primaryLink="/get-involved"
        secondaryLabel="See Our Work"
        secondaryLink="/activities"
        variant="dark"
      />
    </>
  );
}
