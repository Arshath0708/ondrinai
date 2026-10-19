import { useState } from 'react';
import { Mail, Phone, MessageCircle, Send, AlertCircle, CheckCircle2, User } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Reveal, SectionHeading } from '@/components/ui/Primitives';
import { siteConfig, WHATSAPP_COMMUNITY_URL, ASSETS } from '@/config/site';

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

export function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    reason: '',
    message: '',
    consent: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = 'Please enter your name.';
    if (!form.email.trim()) {
      e.email = 'Please enter your email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = 'Please enter a valid email address.';
    }
    if (!form.reason.trim()) e.reason = 'Please select a reason for contacting.';
    if (!form.message.trim()) {
      e.message = 'Please enter a message.';
    } else if (form.message.trim().length < 10) {
      e.message = 'Please provide at least 10 characters so we can understand your request.';
    }
    if (!form.consent) e.consent = 'Please check the box to agree to being contacted regarding your enquiry.';
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

    setSubmitted(true);

    const subject = `ONDRINAI enquiry: ${form.reason} - from ${form.name}`;
    const body = `Name: ${form.name}\nEmail: ${form.email}\nReason: ${form.reason}\n\nMessage:\n${form.message}`;
    const mailtoLink = `mailto:${siteConfig.founderEmail}?cc=${siteConfig.email}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open user's email client directly with all entered information pre-filled
    window.location.href = mailtoLink;
  };

  return (
    <>
      <SEO
        title="Contact Us — Reach ONDRINAI"
        description="Get in touch with ONDRINAI in Madurai. Contact founder Arshath Abdulla A via email or phone, or join our official WhatsApp volunteer group."
        image={ASSETS.logo}
      />

      {/* Hero */}
      <section className="bg-cream pt-32 pb-16 sm:pt-36 sm:pb-20 border-b border-forest/10">
        <div className="container-max container-px">
          <Reveal>
            <p className="eyebrow text-accent-dark mb-5">Get in Touch</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium text-forest text-balance max-w-3xl">
              We&rsquo;d love to hear from you.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-charcoal/80 max-w-2xl text-pretty leading-relaxed">
              Questions, ideas, partnership proposals, or volunteering enquiries &mdash; reach out directly via email, phone, or WhatsApp.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Contact content */}
      <section className="bg-off-white py-16 sm:py-24">
        <div className="container-max container-px">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Left: contact info & direct channels */}
            <div className="lg:col-span-5 space-y-6">
              <Reveal>
                <SectionHeading
                  eyebrow="Direct Channels"
                  title="Contact Information"
                  className="mb-8"
                />

                <div className="space-y-5">
                  {/* Founder & Direct Contact */}
                  <div className="bg-cream/50 border border-forest/15 p-6 shadow-sm">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-forest mb-2">
                      <User className="w-4 h-4" />
                      Direct Contact &bull; {siteConfig.founderName}
                    </div>
                    <p className="text-xs text-charcoal/60 mb-4">
                      {siteConfig.founderRole}
                    </p>

                    <div className="space-y-3">
                      <div>
                        <span className="block text-[11px] uppercase tracking-wider font-semibold text-charcoal/50">
                          Email
                        </span>
                        <a
                          href={`mailto:${siteConfig.founderEmail}`}
                          className="inline-flex items-center gap-2 text-sm sm:text-base font-medium text-forest hover:text-deep-green transition-colors break-all mt-0.5"
                        >
                          <Mail className="w-4 h-4 text-forest shrink-0" />
                          {siteConfig.founderEmail}
                        </a>
                      </div>

                      <div className="pt-2 border-t border-forest/10">
                        <span className="block text-[11px] uppercase tracking-wider font-semibold text-charcoal/50">
                          Phone / Mobile
                        </span>
                        <a
                          href={`tel:${siteConfig.founderPhoneTel}`}
                          className="inline-flex items-center gap-2 text-sm sm:text-base font-medium text-forest hover:text-deep-green transition-colors mt-0.5"
                        >
                          <Phone className="w-4 h-4 text-forest shrink-0" />
                          {siteConfig.founderPhone}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Organisational Email */}
                  <div className="bg-cream/30 border border-forest/15 p-6 shadow-sm">
                    <p className="text-xs uppercase tracking-wider font-semibold text-charcoal/70 mb-1">
                      General Community Email
                    </p>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="inline-flex items-center gap-2 text-sm font-medium text-forest hover:text-deep-green transition-colors break-all mt-1"
                    >
                      <Mail className="w-4 h-4 text-forest shrink-0" />
                      {siteConfig.email}
                    </a>
                  </div>

                  {/* WhatsApp Community */}
                  <div className="bg-forest text-cream p-6 border border-forest/30 shadow-sm">
                    <p className="text-xs uppercase tracking-wider font-semibold text-sage mb-2">
                      Volunteer WhatsApp Community
                    </p>
                    <p className="text-sm text-cream/80 mb-4 leading-relaxed">
                      {siteConfig.volunteerExplanation}
                    </p>
                    <a
                      href={WHATSAPP_COMMUNITY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-light text-xs sm:text-sm w-full justify-center"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Join Volunteer Group
                    </a>
                  </div>

                  {/* Location & Presence */}
                  <div className="bg-cream/30 border border-forest/10 p-5">
                    <p className="text-xs uppercase tracking-wider font-semibold text-charcoal/60 mb-1">
                      Base of Operations
                    </p>
                    <p className="text-sm font-serif font-medium text-forest">
                      {siteConfig.location}
                    </p>
                    <p className="text-xs text-charcoal/50 mt-1">
                      Student-led community initiative &bull; Non-governmental
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right: form */}
            <div className="lg:col-span-7">
              <Reveal delay={100}>
                <div className="bg-cream/40 border border-forest/15 p-7 sm:p-9 shadow-sm">
                  <h2 className="text-2xl font-serif font-medium text-forest mb-2">
                    Send an Enquiry
                  </h2>
                  <p className="text-sm text-charcoal/70 mb-6">
                    Fill out the form below. Submitting will open your default email app with the details pre-filled to send directly to our team.
                  </p>

                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-forest mb-1.5">
                        Your Full Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={form.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className={`w-full bg-off-white border ${errors.name ? 'border-red-500' : 'border-forest/20'} px-4 py-3 text-sm text-charcoal focus:border-forest focus:outline-none transition-colors`}
                        placeholder="e.g. Anandha Kumar"
                        aria-invalid={!!errors.name}
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-forest mb-1.5">
                        Your Email Address <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={form.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className={`w-full bg-off-white border ${errors.email ? 'border-red-500' : 'border-forest/20'} px-4 py-3 text-sm text-charcoal focus:border-forest focus:outline-none transition-colors`}
                        placeholder="you@example.com"
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="reason" className="block text-xs font-bold uppercase tracking-wider text-forest mb-1.5">
                        Reason for Contacting <span className="text-red-600">*</span>
                      </label>
                      <select
                        id="reason"
                        value={form.reason}
                        onChange={(e) => handleChange('reason', e.target.value)}
                        className={`w-full bg-off-white border ${errors.reason ? 'border-red-500' : 'border-forest/20'} px-4 py-3 text-sm text-charcoal focus:border-forest focus:outline-none transition-colors`}
                        aria-invalid={!!errors.reason}
                      >
                        <option value="">Select a reason</option>
                        <option value="Volunteering Enquiry">Volunteering Enquiry</option>
                        <option value="Community Partnership">Community Partnership</option>
                        <option value="Material Contribution">Material Contribution</option>
                        <option value="Media or Press">Media or Press</option>
                        <option value="General Question">General Question</option>
                        <option value="Feedback">Feedback</option>
                      </select>
                      {errors.reason && (
                        <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.reason}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-forest mb-1.5">
                        Message <span className="text-red-600">*</span>
                      </label>
                      <textarea
                        id="message"
                        value={form.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        rows={4}
                        className={`w-full bg-off-white border ${errors.message ? 'border-red-500' : 'border-forest/20'} px-4 py-3 text-sm text-charcoal focus:border-forest focus:outline-none transition-colors resize-y`}
                        placeholder="Tell us what you have in mind..."
                        aria-invalid={!!errors.message}
                      />
                      {errors.message && (
                        <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="flex items-start gap-3 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={form.consent}
                          onChange={(e) => handleChange('consent', e.target.checked)}
                          className="mt-1 w-4 h-4 accent-forest rounded"
                          aria-invalid={!!errors.consent}
                        />
                        <span className="text-xs text-charcoal/75 leading-relaxed">
                          I consent to ONDRINAI contacting me via email regarding this enquiry.
                        </span>
                      </label>
                      {errors.consent && (
                        <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.consent}
                        </p>
                      )}
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="btn-primary w-full sm:w-auto"
                      >
                        <span>Open in Email App</span>
                        <Send className="w-4 h-4" />
                      </button>
                    </div>

                    {submitted && (
                      <div className="mt-4 p-4 bg-sage/20 border border-sage/40 flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                        <p className="text-xs text-charcoal/80 leading-relaxed">
                          Opening your email client... If it doesn&rsquo;t launch automatically, feel free to email directly at <strong>{siteConfig.founderEmail}</strong> or call <strong>{siteConfig.founderPhone}</strong>.
                        </p>
                      </div>
                    )}
                  </form>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
