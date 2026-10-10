import { SEO } from '@/components/SEO';
import { Reveal } from '@/components/ui/Primitives';
import { siteConfig } from '@/config/site';

export function PrivacyPolicyPage() {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="How ONDRINAI collects, uses, and protects data through the contact and volunteer forms."
      />

      <section className="bg-cream pt-32 pb-16 sm:pt-36 sm:pb-20">
        <div className="container-max container-px">
          <Reveal>
            <p className="eyebrow text-accent-dark mb-5">Legal</p>
            <h1 className="text-4xl sm:text-5xl font-serif font-medium text-forest text-balance">
              Privacy Policy
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="bg-off-white py-16 sm:py-24">
        <div className="container-max container-px">
          <div className="max-w-3xl space-y-10">
            <Reveal>
              <div>
                <p className="text-sm text-charcoal/50 mb-2">Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p className="text-base text-charcoal/70 leading-relaxed">
                  {siteConfig.brandName} respects your privacy. This policy explains what data we collect through our forms, why we collect it, and how you can request changes or deletion.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div>
                <h2 className="text-xl font-serif font-semibold text-forest mb-3">Data we collect</h2>
                <p className="text-base text-charcoal/70 leading-relaxed">
                  Through the contact form, we collect your name, email address, reason for contacting, and message content. Through the volunteer registration form (hosted externally), the data collected is determined by that form&rsquo;s own settings and privacy practices.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div>
                <h2 className="text-xl font-serif font-semibold text-forest mb-3">Why we collect it</h2>
                <p className="text-base text-charcoal/70 leading-relaxed">
                  We use the information from the contact form solely to respond to your enquiry. We do not use it for marketing, do not sell it to third parties, and do not share it without your consent unless required by law.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div>
                <h2 className="text-xl font-serif font-semibold text-forest mb-3">How enquiries are handled</h2>
                <p className="text-base text-charcoal/70 leading-relaxed">
                  Contact form submissions are directed to our official email address and reviewed by ONDRINAI team members. We retain enquiry records only as long as needed to respond and follow up.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div>
                <h2 className="text-xl font-serif font-semibold text-forest mb-3">Your rights</h2>
                <p className="text-base text-charcoal/70 leading-relaxed">
                  You may request to see, correct, or delete any personal information you have shared with us at any time. To make a request, email us at{' '}
                  <a href={`mailto:${siteConfig.email}`} className="text-forest underline hover:text-deep-green">
                    {siteConfig.email}
                  </a>.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div>
                <h2 className="text-xl font-serif font-semibold text-forest mb-3">External services</h2>
                <p className="text-base text-charcoal/70 leading-relaxed">
                  The volunteer registration form is hosted by an external service (such as Google Forms). Data submitted through that form is subject to the hosting service&rsquo;s own privacy policy. We encourage you to review their terms before submitting information.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div>
                <h2 className="text-xl font-serif font-semibold text-forest mb-3">Changes to this policy</h2>
                <p className="text-base text-charcoal/70 leading-relaxed">
                  We may update this policy as our practices evolve. Any changes will be reflected on this page with an updated date.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div className="bg-cream/50 border border-forest/10 p-6">
                <p className="text-sm text-charcoal/60 leading-relaxed">
                  {siteConfig.brandName} is a student-led community initiative. This privacy policy is provided in good faith and does not constitute legal advice. {siteConfig.brandName} does not claim a formal legal entity name or registered charity status unless verified.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
