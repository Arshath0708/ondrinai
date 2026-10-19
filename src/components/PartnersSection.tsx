import { Link } from 'react-router-dom';
import { Handshake, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';
import { partners } from '@/data/partners';
import { Reveal, SectionHeading } from '@/components/ui/Primitives';

interface PartnersSectionProps {
  className?: string;
}

export function PartnersSection({ className = '' }: PartnersSectionProps) {
  return (
    <section className={`py-16 sm:py-20 bg-cream/40 border-t border-forest/10 ${className}`}>
      <div className="container-max container-px">
        <Reveal>
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="eyebrow text-accent-dark inline-flex items-center gap-1.5 mb-3">
              <Handshake className="w-4 h-4 text-forest" />
              Community Alliances
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-forest text-balance">
              Collaborations &amp; Community Partners
            </h2>
            <p className="mt-4 text-sm sm:text-base text-charcoal/70 leading-relaxed text-pretty">
              Real community change thrives on genuine collaboration. We partner with grassroots groups and volunteers with complete honesty.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-12 gap-8 items-stretch max-w-4xl mx-auto">
          {/* Confirmed Collaborator Card */}
          {partners.map((partner) => (
            <div key={partner.id} className="md:col-span-7">
              <Reveal>
                <div className="h-full bg-off-white border border-forest/15 p-7 sm:p-8 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-forest/10">
                      <span className="text-xs uppercase font-mono font-bold text-forest tracking-wider inline-flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-forest" />
                        Verified Collaborator
                      </span>
                      {partner.activitySlug && (
                        <Link
                          to={`/activities/${partner.activitySlug}`}
                          className="text-xs font-semibold text-forest hover:text-deep-green inline-flex items-center gap-1"
                        >
                          View Activity &rarr;
                        </Link>
                      )}
                    </div>
                    <h3 className="text-xl font-serif font-bold text-forest mb-2">
                      {partner.name}
                    </h3>
                    <p className="text-sm text-charcoal/75 leading-relaxed mb-4">
                      {partner.description}
                    </p>
                    {partner.collaborationDetail && (
                      <p className="text-xs text-charcoal/60 bg-cream/60 p-3 border-l-2 border-forest/40 italic">
                        {partner.collaborationDetail}
                      </p>
                    )}
                  </div>
                </div>
              </Reveal>
            </div>
          ))}

          {/* Invitation to Partner Card */}
          <div className="md:col-span-5">
            <Reveal delay={100}>
              <div className="h-full bg-forest text-cream p-7 sm:p-8 border border-forest/30 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center mb-4">
                    <HeartHandshake className="w-5 h-5 text-sage" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-cream mb-2">
                    Partner With ONDRINAI
                  </h3>
                  <p className="text-xs sm:text-sm text-cream/75 leading-relaxed mb-6">
                    We welcome colleges, environmental student clubs, and local social groups to co-organize tree planting, food relief drives, and community care initiatives.
                  </p>
                </div>
                <div>
                  <Link
                    to="/contact"
                    className="btn-light text-xs sm:text-sm w-full justify-center"
                  >
                    <span>Propose a Collaboration</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <p className="text-[11px] text-cream/50 text-center mt-3">
                    We only list verified partners after confirmed on-ground participation.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
