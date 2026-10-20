import { Link } from 'react-router-dom';
import { Sprout, Heart, Users, ArrowRight, Linkedin, Youtube, Facebook, Instagram } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Reveal, SectionHeading, CTASection, BotanicalDivider } from '@/components/ui/Primitives';
import { siteConfig, values, pillars, WHATSAPP_COMMUNITY_URL, ASSETS } from '@/config/site';
import { teamMembers } from '@/data/team';

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
      <section className="bg-slate-50 dark:bg-[#0B0F19] pt-32 pb-16 sm:pt-36 sm:pb-20 border-b border-slate-200/80 dark:border-slate-800 relative editorial-mesh">
        <div className="container-max container-px relative z-10">
          <Reveal>
            <p className="eyebrow text-emerald-700 dark:text-emerald-400 mb-5 font-mono font-bold">About ONDRINAI &bull; Grassroots Action</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-slate-900 dark:text-white text-balance max-w-4xl tracking-tight">
              Built on the belief that small actions matter.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-700 dark:text-slate-300 max-w-2xl text-pretty leading-relaxed">
              &ldquo;Not one person. Not one team. All of us, together.&rdquo;
            </p>
          </Reveal>
        </div>
      </section>

      {/* Story & Philosophy */}
      <section className="bg-white dark:bg-[#0B0F19] py-20 sm:py-24">
        <div className="container-max container-px">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow text-emerald-700 dark:text-emerald-400 mb-4 font-mono font-bold">Who We Are</p>
                <p className="text-lg sm:text-xl text-slate-900 dark:text-white leading-relaxed text-pretty font-serif font-bold">
                  ONDRINAI is a growing, student-led community initiative founded in {siteConfig.foundedLocation}. The name symbolizes unity, coming together, and shared responsibility.
                </p>
                <p className="mt-6 text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                  We are not an established corporate NGO or an exclusive group. We are students, youth, and caring individuals who believe that when people unite around practical problems, real change follows.
                </p>
                <p className="mt-6 text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                  Every initiative is driven by collective participation. You don&rsquo;t need wealth or credentials to contribute; sincere effort, time, ideas, and presence are what make our activities possible.
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-5">
              <Reveal delay={120}>
                <div className="bg-slate-900 text-white p-8 sm:p-10 rounded-2xl border border-emerald-500/30 shadow-xl">
                  <p className="eyebrow text-emerald-400 mb-4 font-mono">Our Philosophy</p>
                  <p className="font-serif text-xl sm:text-2xl italic leading-relaxed text-balance font-medium text-emerald-100">
                    &ldquo;{siteConfig.philosophy}&rdquo;
                  </p>
                  <BotanicalDivider className="my-6 opacity-40" />
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {siteConfig.tamilTagline}
                  </p>
                  <div className="mt-6 pt-6 border-t border-white/15">
                    <p className="text-xs text-emerald-400 uppercase tracking-wider font-mono font-semibold">Location</p>
                    <p className="text-sm text-white mt-1 font-sans">{siteConfig.location}</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-slate-50 dark:bg-[#0B0F19] py-20 sm:py-24 border-y border-slate-200/80 dark:border-slate-800">
        <div className="container-max container-px">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <Reveal>
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl h-full shadow-xs hover:shadow-lg transition-all border-t-4 border-t-emerald-600">
                <p className="eyebrow text-emerald-700 dark:text-emerald-400 mb-4 font-mono font-bold">Our Mission</p>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white mb-4">
                  Community-Driven Action
                </h2>
                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed text-pretty font-sans">
                  To bring people together to create meaningful social and environmental change through practical, transparent, and community-driven action.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl h-full shadow-xs hover:shadow-lg transition-all border-t-4 border-t-emerald-600">
                <p className="eyebrow text-emerald-700 dark:text-emerald-400 mb-4 font-mono font-bold">Our Vision</p>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white mb-4">
                  Shared Responsibility
                </h2>
                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed text-pretty font-sans">
                  A future where people take shared responsibility for their communities, their environment, and one another, working side-by-side with honesty and compassion.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Meet the Founder Section */}
      <section className="bg-white dark:bg-[#0B0F19] py-20 sm:py-28">
        <div className="container-max container-px">
          <Reveal>
            <div className="max-w-5xl mx-auto bg-slate-50 dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-8 sm:p-12 lg:p-14 shadow-xs">
              <div className="grid md:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Founder Photo */}
                <div className="md:col-span-5 flex justify-center">
                  <div className="relative w-56 sm:w-64 aspect-[4/5] overflow-hidden rounded-2xl border-2 border-slate-300 dark:border-slate-700 shadow-md bg-slate-900">
                    <img
                      src={ASSETS.founder}
                      alt="Arshath Abdulla A, Founder of ONDRINAI"
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                  </div>
                </div>

                {/* Founder Text */}
                <div className="md:col-span-7">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-semibold uppercase tracking-wider mb-3 rounded-full">
                    A Note from Our Founder
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white">
                    {siteConfig.founderName}
                  </h2>
                  <p className="text-xs sm:text-sm font-sans uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold mt-0.5 mb-5">
                    {siteConfig.founderRole} &bull; ONDRINAI Community Initiative
                  </p>

                  <div className="space-y-4 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                    <p>
                      &ldquo;ONDRINAI started with a simple thought: we don&rsquo;t need to wait for big organizations or large funds to start caring for the people and places around us. Small, honest steps taken together can create lasting change.&rdquo;
                    </p>
                    <p>
                      &ldquo;Our initiative is built around direct ground focus areas &mdash; <strong className="text-emerald-700 dark:text-emerald-400">FEED</strong>, <strong className="text-emerald-700 dark:text-emerald-400">PLANT</strong>, and <strong className="text-emerald-700 dark:text-emerald-400">BUILD</strong>, alongside our defining future generation motive to <strong className="text-sky-600 dark:text-sky-400">SAVE WATER</strong>. Whether we are sharing a meal with elderly residents, planting Panai seeds with youth groups, or preparing volunteer drives for water conservation, the goal is always collective responsibility.&rdquo;
                    </p>
                    <p className="font-serif italic text-emerald-800 dark:text-emerald-300 font-medium pt-1">
                      &ldquo;ONDRINAI is not about one person or one leader. It belongs to every volunteer, contributor, and community member who believes in doing good where they are.&rdquo;
                    </p>
                  </div>

                  <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                      <span className="font-semibold text-slate-900 dark:text-white">Follow:</span>
                      <a
                        href={siteConfig.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="ONDRINAI on LinkedIn"
                        className="text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                      <a
                        href={siteConfig.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="ONDRINAI on YouTube"
                        className="text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors"
                      >
                        <Youtube className="w-4 h-4" />
                      </a>
                      <a
                        href={siteConfig.facebookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="ONDRINAI on Facebook"
                        className="text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors"
                      >
                        <Facebook className="w-4 h-4" />
                      </a>
                      <a
                        href={siteConfig.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="ONDRINAI on Instagram"
                        className="text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors"
                      >
                        <Instagram className="w-4 h-4" />
                      </a>
                    </div>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 hover:text-emerald-800"
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

      {/* Our Team Section - Single Line Train */}
      <section className="bg-slate-50 dark:bg-[#0B0F19] py-20 sm:py-28 border-t border-slate-200/80 dark:border-slate-800 overflow-hidden relative">
        <div className="container-max container-px mb-12">
          <Reveal>
            <div className="max-w-2xl mx-auto text-center">
              <span className="eyebrow text-emerald-700 dark:text-emerald-400 inline-flex items-center gap-1.5 mb-2 font-mono font-bold">
                <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                The People Behind ONDRINAI
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-slate-900 dark:text-white text-balance tracking-tight">
                Our Dedicated Volunteer Team
              </h2>
            </div>
          </Reveal>
        </div>

        {/* Single-Line Train Carousel Track */}
        <div className="relative w-full overflow-hidden py-4">
          {/* Subtle gradient edge masks for clean blending */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-slate-50 dark:from-[#0B0F19] to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-slate-50 dark:from-[#0B0F19] to-transparent z-10" />

          <div className="flex gap-6 sm:gap-8 animate-train items-center">
            {/* Seamless train loop showing only photo and name */}
            {[...teamMembers, ...teamMembers].map((member, i) => (
              <div
                key={`${member.id}-${i}`}
                className="w-56 sm:w-64 shrink-0 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-3 sm:p-4 shadow-xs hover:shadow-lg hover:border-emerald-500/40 transition-all duration-300"
              >
                <div className="aspect-[4/5] overflow-hidden rounded-xl bg-slate-900">
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-serif font-bold text-slate-900 dark:text-white text-base sm:text-lg text-center mt-3 tracking-tight">
                  {member.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white dark:bg-[#0B0F19] py-20 sm:py-28 border-t border-slate-200/80 dark:border-slate-800">
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
                <div className="bg-slate-50/70 dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-7 sm:p-8 rounded-2xl h-full flex flex-col justify-between shadow-xs hover:shadow-lg transition-all">
                  <div>
                    <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800 tracking-wider">
                      0{i + 1}
                    </span>
                    <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-white mt-3 mb-2">
                      {value.name}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
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
      <section className="bg-slate-50 dark:bg-[#0B0F19] py-20 sm:py-24 border-t border-slate-200/80 dark:border-slate-800">
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
                  <div className="bg-white dark:bg-slate-900 p-8 text-center border border-slate-200/90 dark:border-slate-800 rounded-2xl h-full flex flex-col justify-between shadow-xs hover:shadow-lg transition-all">
                    <div>
                      <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-emerald-700 text-white mb-5 shadow-xs">
                        {Icon && <Icon className="w-6 h-6" />}
                      </span>
                      <h3 className="text-lg font-sans font-bold tracking-wide text-slate-900 dark:text-white uppercase mb-3">
                        {pillar.name}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 font-sans">
                        {pillar.description}
                      </p>
                    </div>
                    <Link to={pillar.link} className="link-underline mt-4 text-xs font-bold uppercase tracking-wider justify-center text-emerald-700 dark:text-emerald-400">
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
        primaryLabel="Join Volunteer Community"
        primaryLink={WHATSAPP_COMMUNITY_URL}
        secondaryLabel="Sponsor a Meal • ₹30"
        secondaryLink="/donate"
        variant="dark"
      />
    </>
  );
}
