import { useState } from 'react';
import { Mail, Instagram, Facebook, Youtube, Linkedin, Send, Check, AlertCircle } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Reveal, SectionHeading } from '@/components/ui/Primitives';
import { siteConfig, socialLinks, VOLUNTEER_FORM_URL } from '@/config/site';

const socialIcons = {
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
};

interface FormState {
  name: string;
  email: string;
  reason: string;
  message: string;
  consent: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  reason?: string;
  message?: string;
  consent?: string;
}

type SubmitState = 'idle' | 'submitting' | 'error';

export function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    reason: '',
    message: '',
    consent: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>('idle');

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = 'Please enter your name.';
    if (!form.email.trim()) {
      e.email = 'Please enter your email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = 'Please enter a valid email address.';
    }
    if (!form.reason.trim()) e.reason = 'Please select a reason.';
    if (!form.message.trim()) {
      e.message = 'Please enter a message.';
    } else if (form.message.trim().length < 10) {
      e.message = 'Please provide at least 10 characters.';
    }
    if (!form.consent) e.consent = 'Please consent to being contacted about your enquiry.';
    return e;
  };

  const handleChange = (field: keyof FormState, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitState('submitting');

    // No backend is connected. We use a mailto fallback so the user can send
    // their enquiry through their email client.
    // To connect a real backend (e.g., a Supabase Edge Function), replace
    // this block with a fetch call to your endpoint.
    const subject = `ONDRINAI enquiry: ${form.reason}`;
    const body = `Name: ${form.name}\nEmail: ${form.email}\nReason: ${form.reason}\n\nMessage:\n${form.message}`;
    const mailtoLink = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setTimeout(() => {
      window.location.href = mailtoLink;
      setSubmitState('idle');
    }, 500);
  };

  const hasSocialUrl = (url: string) => url && url.startsWith('http');

  return (
    <>
      <SEO
        title="Contact ONDRINAI"
        description="Get in touch with ONDRINAI. Email us at ondrinaicommunity@gmail.com or connect through our social channels."
      />

      {/* Hero */}
      <section className="bg-cream pt-32 pb-16 sm:pt-36 sm:pb-20">
        <div className="container-max container-px">
          <Reveal>
            <p className="eyebrow text-accent-dark mb-5">Contact</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium text-forest text-balance max-w-3xl">
              Get in touch.
            </h1>
            <p className="mt-6 text-lg text-charcoal/70 max-w-2xl text-pretty">
              Questions, ideas, partnership proposals, or just want to say hello? We&rsquo;d love to hear from you.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Contact content */}
      <section className="bg-off-white py-16 sm:py-24">
        <div className="container-max container-px">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Left: contact info */}
            <div className="lg:col-span-5">
              <Reveal>
                <SectionHeading
                  eyebrow="Reach us"
                  title="Direct contact."
                  className="mb-8"
                />

                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center gap-3 text-base text-forest hover:text-deep-green transition-colors mb-8 group"
                >
                  <span className="inline-flex items-center justify-center w-11 h-11 bg-forest/10 group-hover:bg-forest/15 transition-colors">
                    <Mail className="w-5 h-5 text-forest" />
                  </span>
                  {siteConfig.email}
                </a>

                <div className="mt-8">
                  <p className="eyebrow text-accent-dark mb-4">Social</p>
                  <div className="flex flex-wrap gap-3">
                    {socialLinks.map((social) => {
                      const Icon = socialIcons[social.icon];
                      if (hasSocialUrl(social.url)) {
                        return (
                          <a
                            key={social.label}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${social.label} — ${social.handle}`}
                            className="inline-flex items-center gap-2 px-4 py-2.5 border border-forest/15 text-sm font-medium text-charcoal/70 hover:text-forest hover:border-forest/40 transition-all"
                          >
                            <Icon className="w-4 h-4" />
                            {social.handle}
                          </a>
                        );
                      }
                      return (
                        <span
                          key={social.label}
                          className="inline-flex items-center gap-2 px-4 py-2.5 border border-forest/10 text-sm text-charcoal/30 cursor-not-allowed"
                          title={`${social.label} — link coming soon`}
                        >
                          <Icon className="w-4 h-4" />
                          {social.handle}
                        </span>
                      );
                    })}
                  </div>
                  <p className="mt-4 text-xs text-charcoal/40">
                    Social links will be activated once verified URLs are supplied.
                  </p>
                </div>

                <div className="mt-10 pt-8 border-t border-forest/15">
                  <p className="text-sm text-charcoal/60 leading-relaxed">
                    Want to volunteer? {VOLUNTEER_FORM_URL ? (
                      <a href={VOLUNTEER_FORM_URL} target="_blank" rel="noopener noreferrer" className="link-underline">
                        Register here
                      </a>
                    ) : (
                      <span>Use the contact form below and mention you&rsquo;d like to volunteer.</span>
                    )}
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Right: form */}
            <div className="lg:col-span-7">
              <Reveal delay={100}>
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="bg-cream/50 border border-forest/10 p-7 sm:p-9 space-y-6"
                >
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-forest mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={form.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className="w-full bg-off-white border border-forest/15 px-4 py-3 text-sm text-charcoal focus:border-forest focus:outline-none transition-colors"
                      placeholder="Your name"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-1.5 text-xs text-red-700 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-forest mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={form.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="w-full bg-off-white border border-forest/15 px-4 py-3 text-sm text-charcoal focus:border-forest focus:outline-none transition-colors"
                      placeholder="you@example.com"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1.5 text-xs text-red-700 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="reason" className="block text-sm font-semibold text-forest mb-2">
                      Reason for contacting
                    </label>
                    <select
                      id="reason"
                      value={form.reason}
                      onChange={(e) => handleChange('reason', e.target.value)}
                      className="w-full bg-off-white border border-forest/15 px-4 py-3 text-sm text-charcoal focus:border-forest focus:outline-none transition-colors"
                      aria-invalid={!!errors.reason}
                      aria-describedby={errors.reason ? 'reason-error' : undefined}
                    >
                      <option value="">Select a reason</option>
                      <option value="Volunteering">Volunteering</option>
                      <option value="Partnership">Partnership</option>
                      <option value="Media or press">Media or press</option>
                      <option value="General enquiry">General enquiry</option>
                      <option value="Feedback">Feedback</option>
                    </select>
                    {errors.reason && (
                      <p id="reason-error" className="mt-1.5 text-xs text-red-700 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.reason}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-forest mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      value={form.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      rows={5}
                      className="w-full bg-off-white border border-forest/15 px-4 py-3 text-sm text-charcoal focus:border-forest focus:outline-none transition-colors resize-y"
                      placeholder="Tell us what's on your mind..."
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                    />
                    {errors.message && (
                      <p id="message-error" className="mt-1.5 text-xs text-red-700 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.consent}
                        onChange={(e) => handleChange('consent', e.target.checked)}
                        className="mt-1 w-4 h-4 accent-forest"
                        aria-invalid={!!errors.consent}
                        aria-describedby={errors.consent ? 'consent-error' : undefined}
                      />
                      <span className="text-sm text-charcoal/70 leading-relaxed">
                        I consent to being contacted about this enquiry.
                      </span>
                    </label>
                    {errors.consent && (
                      <p id="consent-error" className="mt-1.5 text-xs text-red-700 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.consent}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={submitState === 'submitting'}
                    className="btn-primary w-full sm:w-auto"
                  >
                    {submitState === 'submitting' ? (
                      <>Sending...</>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-xs text-charcoal/40 leading-relaxed pt-2">
                    This form opens your email app with the message pre-filled. For a fully automated submission system, a backend service needs to be connected.
                  </p>
                </form>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
