import { Link } from 'react-router-dom';
import { ArrowRight, Footprints, HandCoins, Package, Sparkles, MessageCircle, HelpCircle } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Reveal, SectionHeading, CTASection } from '@/components/ui/Primitives';
import { WHATSAPP_COMMUNITY_URL, faqItems, siteConfig, ASSETS } from '@/config/site';

const paths = [
  {
    letter: 'A',
    title: 'Ground Work',
    subtitle: 'Be there in person',
    description:
      'Join actual on-ground activities in Madurai — pack and distribute food, dig pits and plant native seeds/saplings, assist with on-site coordination, and engage with the community directly.',
    icon: Footprints,
  },
  {
    letter: 'B',
    title: 'Financial Contributions',
    subtitle: 'Support documented needs',
    description:
      'Voluntarily support specific, documented activity needs. We communicate the purpose and budget transparently before accepting funds. Contributions are not tax-exempt or certified.',
    icon: HandCoins,
  },
  {
    letter: 'C',
    title: 'Material Contributions',
    subtitle: 'Provide goods & resources',
    description:
      'Provide food grains, idli provisions, native seeds (such as Panai), saplings, eco-friendly packaging, transport assistance, or other confirmed supplies for scheduled activities.',
    icon: Package,
  },
  {
    letter: 'D',
    title: 'Skills & Partnerships',
    subtitle: 'Contribute your talents',
    description:
      'Lend your skills in graphic design, photography, video editing, social media outreach, web development, logistics, community documentation, or collaborate as an educational institution or grassroots group.',
    icon: Sparkles,
  },
];

export function GetInvolvedPage() {
  return (
    <>
      <SEO
        title="Get Involved — Volunteer With ONDRINAI"
        description="Join ONDRINAI as a volunteer in Madurai. Contribute through ground work, materials, skills, or financial support. You don't need money to make a difference."
        image={ASSETS.logo}
      />

      {/* Hero */}
      <section className="bg-cream pt-32 pb-16 sm:pt-36 sm:pb-20 border-b border-forest/10">
        <div className="container-max container-px">
          <Reveal>
            <p className="eyebrow text-accent-dark mb-5">Get Involved</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium text-forest text-balance max-w-3xl">
              Your contribution can take many forms.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-charcoal/80 max-w-2xl text-pretty leading-relaxed">
              You don&rsquo;t need to contribute money to make a difference. Every sincere effort, hour of time, and creative idea counts.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Primary Volunteer WhatsApp CTA Banner */}
      <section className="bg-forest text-cream py-12 border-y border-forest/20">
        <div className="container-max container-px">
          <Reveal>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-deep-green/60 p-8 sm:p-10 border border-cream/15">
              <div className="max-w-2xl">
                <span className="text-xs uppercase tracking-wider text-sage font-mono font-semibold">
                  Official Volunteer Channel
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-medium mt-2 text-cream">
                  Join Our Volunteer WhatsApp Community
                </h2>
                <p className="text-sm sm:text-base text-cream/75 mt-3 leading-relaxed">
                  {siteConfig.volunteerExplanation}
                </p>
              </div>
              <div className="shrink-0">
                <a
                  href={WHATSAPP_COMMUNITY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-light inline-flex items-center gap-2.5 text-sm sm:text-base"
                >
                  <MessageCircle className="w-5 h-5 text-forest" />
                  Join Volunteer Group
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Four Participation Paths */}
      <section className="bg-off-white py-20 sm:py-28">
        <div className="container-max container-px">
          <Reveal>
            <SectionHeading
              eyebrow="Ways to Participate"
              title="Four ways to make an impact."
              intro="Choose the path that matches your skills, availability, and interests. We welcome everyone with open arms."
              className="mb-14"
            />
          </Reveal>

          <div className="space-y-6 lg:space-y-8">
            {paths.map((path, i) => {
              const Icon = path.icon;
              const isReversed = i % 2 === 1;
              return (
                <Reveal key={path.letter} delay={i * 80}>
                  <div className={`grid lg:grid-cols-12 gap-8 items-center bg-cream/40 border border-forest/15 p-7 sm:p-9 ${isReversed ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                    <div className="lg:col-span-8">
                      <div className="flex items-start gap-5">
                        <span className="inline-flex items-center justify-center w-12 h-12 shrink-0 bg-forest text-cream shadow-sm">
                          <Icon className="w-6 h-6" />
                        </span>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-xs font-mono font-bold text-accent-dark tracking-wider">
                              PATH {path.letter}
                            </span>
                            <span className="text-xs text-charcoal/50 uppercase tracking-wider font-semibold">
                              &bull; {path.subtitle}
                            </span>
                          </div>
                          <h3 className="text-xl sm:text-2xl font-serif font-medium text-forest">
                            {path.title}
                          </h3>
                          <p className="mt-3 text-base text-charcoal/75 leading-relaxed text-pretty">
                            {path.description}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="lg:col-span-4">
                      <div className="bg-off-white border border-forest/10 p-6 text-center shadow-sm">
                        {path.letter === 'B' ? (
                          <>
                            <p className="text-xs font-semibold uppercase tracking-wider text-forest mb-1">
                              Transparent Causes
                            </p>
                            <p className="text-xs text-charcoal/60 leading-relaxed">
                              Choose specific causes or sponsor an entire activity.
                            </p>
                            <Link
                              to="/donate"
                              className="btn-primary mt-4 text-xs w-full justify-center"
                            >
                              <span>View Contribution Causes</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          </>
                        ) : path.letter === 'A' ? (
                          <>
                            <p className="text-xs font-semibold uppercase tracking-wider text-forest mb-1">
                              Zero financial barrier
                            </p>
                            <p className="text-xs text-charcoal/60 leading-relaxed">
                              Your presence, time, and sincere dedication matter most.
                            </p>
                            <a
                              href={WHATSAPP_COMMUNITY_URL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-primary mt-4 text-xs w-full justify-center"
                            >
                              <span>Join via WhatsApp</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </a>
                          </>
                        ) : path.letter === 'C' ? (
                          <>
                            <p className="text-xs font-semibold uppercase tracking-wider text-forest mb-1">
                              Direct Resources
                            </p>
                            <p className="text-xs text-charcoal/60 leading-relaxed">
                              Coordinate seeds, food grains, or transport supplies.
                            </p>
                            <Link
                              to="/contact"
                              className="btn-outline mt-4 text-xs w-full justify-center"
                            >
                              <span>Coordinate Supplies</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          </>
                        ) : (
                          <>
                            <p className="text-xs font-semibold uppercase tracking-wider text-forest mb-1">
                              Shared Talents
                            </p>
                            <p className="text-xs text-charcoal/60 leading-relaxed">
                              Lend technical, creative, or institutional partnership.
                            </p>
                            <Link
                              to="/contact"
                              className="btn-outline mt-4 text-xs w-full justify-center"
                            >
                              <span>Propose Partnership</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-cream py-20 sm:py-24 border-t border-forest/10">
        <div className="container-max container-px">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <Reveal>
                <div className="flex items-center gap-2 mb-3">
                  <HelpCircle className="w-5 h-5 text-accent-dark" />
                  <p className="eyebrow text-accent-dark">Clarifications</p>
                </div>
                <h2 className="text-3xl sm:text-4xl font-serif font-medium text-forest">
                  Frequently Asked Questions
                </h2>
                <p className="mt-4 text-sm text-charcoal/70 leading-relaxed">
                  Have other questions about participating or partnering? Reach out to us directly through email or our WhatsApp group.
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-8">
              <div className="space-y-6">
                {faqItems.map((faq, i) => (
                  <Reveal key={i} delay={i * 60}>
                    <div className="bg-off-white border border-forest/10 p-6 shadow-sm">
                      <h3 className="text-base sm:text-lg font-serif font-semibold text-forest mb-2">
                        {faq.question}
                      </h3>
                      <p className="text-sm text-charcoal/75 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTASection
        title="Ready to make a real difference?"
        copy="Join our growing volunteer community in Madurai. Stay updated on upcoming activities and contribute whenever you are available."
        primaryLabel="Join Volunteer Community on WhatsApp"
        primaryLink={WHATSAPP_COMMUNITY_URL}
        secondaryLabel="Explore Our Past Work"
        secondaryLink="/activities"
        variant="dark"
      />
    </>
  );
}
