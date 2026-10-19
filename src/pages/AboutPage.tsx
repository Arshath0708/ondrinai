import { Link } from 'react-router-dom';
import { Sprout, Heart, Users } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Reveal, SectionHeading, CTASection, BotanicalDivider } from '@/components/ui/Primitives';
import { siteConfig, values, pillars, WHATSAPP_COMMUNITY_URL, ASSETS } from '@/config/site';

const pillarIcons = {
  heart: Heart,
  sprout: Sprout,
  users: Users,
};

export function AboutPage() {
  return (
    <>
      <SEO
        title="About Us — Our Mission, Values & Founder"
        description="Learn about ONDRINAI, a student-led community initiative in Madurai, Tamil Nadu, driven by collective action around food, environment, and community building."
        image={ASSETS.logo}
      />

      {/* Hero */}
      <section className="bg-cream pt-32 pb-16 sm:pt-36 sm:pb-20 border-b border-forest/10">
        <div className="container-max container-px">
          <Reveal>
            <p className="eyebrow text-accent-dark mb-5">About ONDRINAI</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium text-forest text-balance max-w-4xl">
              Built on the belief that small actions matter.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-charcoal/75 max-w-2xl text-pretty leading-relaxed">
              &ldquo;Not one person. Not one team. All of us, together.&rdquo;
            </p>
          </Reveal>
        </div>
      </section>

      {/* Story & Philosophy */}
      <section className="bg-off-white py-20 sm:py-24">
        <div className="container-max container-px">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow text-accent-dark mb-4">Who We Are</p>
                <p className="text-lg sm:text-xl text-charcoal/85 leading-relaxed text-pretty font-serif">
                  ONDRINAI is a growing, student-led community initiative founded in {siteConfig.foundedLocation}. The name symbolizes unity, coming together, and shared responsibility.
                </p>
                <p className="mt-6 text-base text-charcoal/70 leading-relaxed">
                  We are not an established corporate NGO or an exclusive group. We are students, youth, and caring individuals who believe that when people unite around practical problems, real change follows.
                </p>
                <p className="mt-6 text-base text-charcoal/70 leading-relaxed">
                  Every initiative is driven by collective participation. You don&rsquo;t need wealth or credentials to contribute; sincere effort, time, ideas, and presence are what make our activities possible.
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-5">
              <Reveal delay={120}>
                <div className="bg-forest text-cream p-8 sm:p-10 border border-forest/20 shadow-lg">
                  <p className="eyebrow text-sage mb-4">Our Philosophy</p>
                  <p className="font-serif text-xl sm:text-2xl italic leading-relaxed text-balance">
                    &ldquo;{siteConfig.philosophy}&rdquo;
                  </p>
                  <BotanicalDivider className="my-6 opacity-40" />
                  <p className="text-sm text-cream/75 leading-relaxed">
                    {siteConfig.tamilTagline}
                  </p>
                  <div className="mt-6 pt-6 border-t border-cream/15">
                    <p className="text-xs text-sage uppercase tracking-wider font-semibold">Location</p>
                    <p className="text-sm text-cream/90 mt-1">{siteConfig.location}</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-cream py-20 sm:py-24 border-y border-forest/10">
        <div className="container-max container-px">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <Reveal>
              <div className="border-t-2 border-forest pt-8 bg-off-white p-8 h-full shadow-sm">
                <p className="eyebrow text-accent-dark mb-4">Our Mission</p>
                <h2 className="text-2xl sm:text-3xl font-serif font-medium text-forest mb-4">
                  Community-Driven Action
                </h2>
                <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed text-pretty">
                  To bring people together to create meaningful social and environmental change through practical, transparent, and community-driven action.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="border-t-2 border-forest pt-8 bg-off-white p-8 h-full shadow-sm">
                <p className="eyebrow text-accent-dark mb-4">Our Vision</p>
                <h2 className="text-2xl sm:text-3xl font-serif font-medium text-forest mb-4">
                  Shared Responsibility
                </h2>
                <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed text-pretty">
                  A future where people take shared responsibility for their communities, their environment, and one another, working side-by-side with honesty and compassion.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Meet the Founder Section */}
      <section className="bg-off-white py-20 sm:py-28">
        <div className="container-max container-px">
          <Reveal>
            <div className="max-w-5xl mx-auto bg-cream/50 border border-forest/15 p-8 sm:p-12 lg:p-14 shadow-sm">
              <div className="grid md:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Founder Photo */}
                <div className="md:col-span-5 flex justify-center">
                  <div className="relative w-56 sm:w-64 aspect-[4/5] overflow-hidden rounded-md border-2 border-forest/20 shadow-md bg-forest/10">
                    <img
                      src={ASSETS.founder}
                      alt="Arshath Abdulla A, Founder of ONDRINAI"
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-green/40 via-transparent to-transparent opacity-60" />
                  </div>
                </div>

                {/* Founder Text */}
                <div className="md:col-span-7">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-forest/10 text-forest text-xs font-semibold uppercase tracking-wider mb-3">
                    A Note from Our Founder
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-forest">
                    {siteConfig.founderName}
                  </h2>
                  <p className="text-xs sm:text-sm font-sans uppercase tracking-wider text-charcoal/60 font-semibold mt-0.5 mb-5">
                    {siteConfig.founderRole} &bull; ONDRINAI Community Initiative
                  </p>

                  <div className="space-y-4 text-sm sm:text-base text-charcoal/80 leading-relaxed">
                    <p>
                      &ldquo;ONDRINAI started with a simple thought: we don&rsquo;t need to wait for big organizations or large funds to start caring for the people and places around us. Small, honest steps taken together can create lasting change.&rdquo;
                    </p>
                    <p>
                      &ldquo;Our initiative is built around three core focus areas &mdash; <strong className="text-forest">FEED</strong>, <strong className="text-forest">PLANT</strong>, and <strong className="text-forest">BUILD</strong>. Whether we are sharing a meal with elderly residents, planting Panai seeds with youth groups, or standing together for a neighbor in need, the goal is always collective responsibility.&rdquo;
                    </p>
                    <p className="font-serif italic text-forest font-medium pt-1">
                      &ldquo;ONDRINAI is not about one person or one leader. It belongs to every volunteer, contributor, and community member who believes in doing good where they are.&rdquo;
                    </p>
                  </div>

                  <div className="mt-6 pt-5 border-t border-forest/15 flex flex-wrap items-center justify-between gap-4">
                    <div className="text-xs text-charcoal/60">
                      <span className="font-semibold text-forest">Focus Areas:</span> FEED &bull; PLANT &bull; BUILD
                    </div>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-forest hover:text-deep-green"
                    >
                      <span>Get in touch</span>
                      &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="bg-cream py-20 sm:py-28 border-t border-forest/10">
        <div className="container-max container-px">
          <Reveal>
            <SectionHeading
              eyebrow="Guiding Principles"
              title="Our Values"
              intro="These six values guide every single decision, activity, and interaction we undertake."
              className="mb-14"
            />
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <Reveal key={value.name} delay={i * 60}>
                <div className="bg-off-white border border-forest/15 p-6 sm:p-7 h-full flex flex-col justify-between shadow-sm">
                  <div>
                    <span className="text-xs font-mono font-bold text-accent-dark tracking-wider">
                      0{i + 1}
                    </span>
                    <h3 className="text-lg font-serif font-semibold text-forest mt-2 mb-2">
                      {value.name}
                    </h3>
                    <p className="text-sm text-charcoal/70 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars overview */}
      <section className="bg-off-white py-20 sm:py-24 border-t border-forest/10">
        <div className="container-max container-px">
          <Reveal>
            <SectionHeading
              eyebrow="Our Action Pillars"
              title="FEED &bull; PLANT &bull; BUILD"
              intro="Three core areas where our community focuses practical energy and resources."
              align="center"
              className="mb-14"
            />
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-6 lg:gap-8">
            {pillars.map((pillar, i) => {
              const Icon = pillarIcons[pillar.icon as keyof typeof pillarIcons];
              return (
                <Reveal key={pillar.id} delay={i * 100}>
                  <div className="bg-cream/40 p-7 text-center border border-forest/15 h-full flex flex-col justify-between shadow-sm">
                    <div>
                      <span className="inline-flex items-center justify-center w-14 h-14 bg-forest text-cream mb-5">
                        {Icon && <Icon className="w-6 h-6" />}
                      </span>
                      <h3 className="text-lg font-sans font-bold tracking-wide text-forest uppercase mb-3">
                        {pillar.name}
                      </h3>
                      <p className="text-sm text-charcoal/70 leading-relaxed mb-4">
                        {pillar.description}
                      </p>
                    </div>
                    <Link to={pillar.link} className="link-underline mt-4 text-xs uppercase tracking-wider justify-center">
                      View {pillar.name.toLowerCase()} work
                    </Link>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection
        title="Be part of what comes next."
        copy="ONDRINAI is built by volunteers who care. Join our WhatsApp group to hear about upcoming activities, share ideas, and participate when you can."
        primaryLabel="Join Our Volunteer Community"
        primaryLink={WHATSAPP_COMMUNITY_URL}
        secondaryLabel="Explore Our Work"
        secondaryLink="/activities"
        variant="dark"
      />
    </>
  );
}
