import { Link } from 'react-router-dom';
import { ArrowRight, Footprints, HandCoins, Package, Sparkles, Check } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Reveal, SectionHeading, CTASection } from '@/components/ui/Primitives';
import { VOLUNTEER_FORM_URL, faqItems, siteConfig } from '@/config/site';

const paths = [
  {
    letter: 'A',
    title: 'Volunteer on the ground',
    description:
      'Join verified activities, help coordinate logistics, assist with distribution, participate in planting, and support community work.',
    icon: Footprints,
  },
  {
    letter: 'B',
    title: 'Contribute financially',
    description:
      'Support specific activity requirements voluntarily. We explain the activity\u2019s purpose and intended budget before collecting money. Contributions are not tax-deductible.',
    icon: HandCoins,
  },
  {
    letter: 'C',
    title: 'Contribute materials',
    description:
      'Offer appropriate food supplies, seeds, saplings, and other resources needed for a confirmed activity.',
    icon: Package,
  },
  {
    letter: 'D',
    title: 'Share your skills',
    description:
      'Help with graphic design, photography, video editing, outreach, partnerships, website development, logistics, documentation, or other useful skills.',
    icon: Sparkles,
  },
];

export function GetInvolvedPage() {
  const volunteerUrl = VOLUNTEER_FORM_URL;

  return (
    <>
      <SEO
        title="Get Involved"
        description="Join ONDRINAI as a volunteer in Madurai. Contribute through ground work, financial support, materials, or skills. You don't need money to make a difference."
      />

      {/* Hero */}
      <section className="bg-cream pt-32 pb-16 sm:pt-36 sm:pb-20">
        <div className="container-max container-px">
          <Reveal>
            <p className="eyebrow text-accent-dark mb-5">Get Involved</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium text-forest text-balance max-w-3xl">
              Your contribution can take many forms.
            </h1>
            <p className="mt-6 text-lg text-charcoal/70 max-w-2xl text-pretty">
              You don&rsquo;t need to do everything. Just do what you can.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Volunteer CTA banner */}
      <section className="bg-forest text-cream py-10">
        <div className="container-max container-px">
          <Reveal>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <p className="text-lg sm:text-xl font-serif text-balance max-w-xl">
                Ready to join? Register as a volunteer and we&rsquo;ll keep you informed about upcoming activities.
              </p>
              {volunteerUrl ? (
                <a
                  href={volunteerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-light shrink-0"
                >
                  Register as a Volunteer
                  <ArrowRight className="w-4 h-4" />
                </a>
              ) : (
                <Link to="/contact" className="btn-light shrink-0">
                  Contact us to register
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Four paths */}
      <section className="bg-off-white py-20 sm:py-28">
        <div className="container-max container-px">
          <Reveal>
            <SectionHeading
              eyebrow="Ways to participate"
              title="Four ways to help."
              intro="Participation does not require a financial contribution. Every form of sincere effort is welcome."
              className="mb-14"
            />
          </Reveal>

          <div className="space-y-6 lg:space-y-8">
            {paths.map((path, i) => {
              const Icon = path.icon;
              const isReversed = i % 2 === 1;
              return (
                <Reveal key={path.letter} delay={i * 80}>
                  <div className={`grid lg:grid-cols-12 gap-8 items-center ${isReversed ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                    <div className="lg:col-span-8">
                      <div className="flex items-start gap-5">
                        <span className="inline-flex items-center justify-center w-12 h-12 shrink-0 bg-forest text-cream">
                          <Icon className="w-5 h-5" />
                        </span>
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-xs font-mono font-bold text-accent-dark tracking-wider">
                              {path.letter}
                            </span>
                            <h3 className="text-xl sm:text-2xl font-serif font-medium text-forest">
                              {path.title}
                            </h3>
                          </div>
                          <p className="text-base text-charcoal/70 leading-relaxed text-pretty">
                            {path.description}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="lg:col-span-4">
                      <div className="bg-cream/50 border border-forest/10 p-6 text-center">
                        <p className="text-sm text-charcoal/60 leading-relaxed">
                          No financial contribution required to participate.
                        </p>
                        <p className="mt-2 text-xs text-charcoal/40">
                          Your time and effort are equally valuable.
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream py-20 sm:py-24">
        <div className="container-max container-px">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <Reveal>
                <SectionHeading
                  eyebrow="Common questions"
                  title="FAQ"
                />
              </Reveal>
            </div>
            <div className="lg:col-span-8">
              <div className="space-y-6">
                {faqItems.map((faq, i) => (
                  <Reveal key={i} delay={i * 60}>
                    <div className="border-b border-forest/15 pb-6">
                      <h3 className="text-base font-semibold text-forest mb-2">
                        {faq.question}
                      </h3>
                      <p className="text-sm text-charcoal/70 leading-relaxed">
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
        title="Every sincere effort matters."
        copy="You don't need to have money to make a difference. Your time, effort, skills, ideas, and willingness to help can create real change."
        primaryLabel={volunteerUrl ? 'Register as a Volunteer' : 'Contact Us to Register'}
        primaryLink={volunteerUrl || '/contact'}
        secondaryLabel="See Our Work"
        secondaryLink="/activities"
        variant="dark"
      />
    </>
  );
}
