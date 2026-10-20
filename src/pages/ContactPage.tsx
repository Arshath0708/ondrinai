import { useState } from 'react';
import { Mail, Phone, MessageCircle, Send, AlertCircle, CheckCircle2, User, Instagram, Linkedin, Youtube, Facebook } from 'lucide-react';
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
      <section className="bg-slate-50 dark:bg-[#03150D] pt-32 pb-16 sm:pt-36 sm:pb-20 border-b border-slate-200/80 dark:border-white/10 relative cyber-grid">
        <div className="container-max container-px relative z-10">
          <Reveal>
            <p className="eyebrow text-emerald-700 dark:text-emerald-400 mb-5 font-mono font-bold">Get in Touch &bull; Direct Connection</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-slate-900 dark:text-white text-balance max-w-3xl tracking-tight">
              We&rsquo;d love to hear from you.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-700 dark:text-slate-300 max-w-2xl text-pretty leading-relaxed">
              Questions, ideas, partnership proposals, or volunteering enquiries &mdash; reach out directly via email, phone, or WhatsApp.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Contact content */}
      <section className="bg-white dark:bg-[#02110A] py-16 sm:py-24">
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
                  <div className="bg-slate-50 dark:bg-[#031C11] border border-slate-200/90 dark:border-white/10 rounded-2xl p-6 shadow-xs">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-mono font-bold text-emerald-800 dark:text-emerald-300 mb-2">
                      <User className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      Direct Contact &bull; {siteConfig.founderName}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 font-sans">
                      {siteConfig.founderRole}
                    </p>

                    <div className="space-y-3">
                      <div>
                        <span className="block text-[11px] uppercase tracking-wider font-mono font-bold text-slate-400">
                          Email
                        </span>
                        <a
                          href={`mailto:${siteConfig.founderEmail}`}
                          className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-slate-900 dark:text-white hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors break-all mt-0.5"
                        >
                          <Mail className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          {siteConfig.founderEmail}
                        </a>
                      </div>

                      <div className="pt-2 border-t border-slate-200 dark:border-white/10">
                        <span className="block text-[11px] uppercase tracking-wider font-mono font-bold text-slate-400">
                          Phone / Mobile
                        </span>
                        <a
                          href={`tel:${siteConfig.founderPhoneTel}`}
                          className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-slate-900 dark:text-white hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors mt-0.5"
                        >
                          <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          {siteConfig.founderPhone}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Organisational Email */}
                  <div className="bg-slate-50 dark:bg-[#031C11] border border-slate-200/90 dark:border-white/10 rounded-2xl p-6 shadow-xs">
                    <p className="text-xs uppercase tracking-wider font-mono font-bold text-slate-500 dark:text-slate-400 mb-1">
                      General Community Email
                    </p>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors break-all mt-1"
                    >
                      <Mail className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      {siteConfig.email}
                    </a>
                  </div>

                  {/* WhatsApp Community */}
                  <div className="bg-gradient-to-br from-[#063D24] to-[#032014] text-white p-6 rounded-2xl border border-emerald-500/30 shadow-lg">
                    <p className="text-xs uppercase tracking-wider font-mono font-bold text-emerald-300 mb-2">
                      Volunteer WhatsApp Community
                    </p>
                    <p className="text-sm text-white/80 mb-4 leading-relaxed font-sans">
                      {siteConfig.volunteerExplanation}
                    </p>
                    <a
                      href={WHATSAPP_COMMUNITY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-light text-xs sm:text-sm w-full justify-center rounded-xl"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Join Volunteer Group
                    </a>
                  </div>

                  {/* Official Social Channels */}
                  <div className="bg-slate-50 dark:bg-[#031C11] border border-slate-200/90 dark:border-white/10 rounded-2xl p-6 shadow-xs">
                    <p className="text-xs uppercase tracking-wider font-mono font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Official Social Channels
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed font-sans">
                      Follow our ground stories, videos, and community updates on all our official platforms.
                    </p>
                    <div className="grid grid-cols-2 gap-2.5">
                      <a
                        href={siteConfig.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-2.5 bg-white dark:bg-[#02140C] border border-slate-200 dark:border-white/10 hover:border-emerald-500 hover:text-emerald-700 rounded-xl transition-all text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-2xs"
                      >
                        <Linkedin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span className="truncate">LinkedIn</span>
                      </a>
                      <a
                        href={siteConfig.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-2.5 bg-white dark:bg-[#02140C] border border-slate-200 dark:border-white/10 hover:border-emerald-500 hover:text-emerald-700 rounded-xl transition-all text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-2xs"
                      >
                        <Youtube className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span className="truncate">YouTube</span>
                      </a>
                      <a
                        href={siteConfig.facebookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-2.5 bg-white dark:bg-[#02140C] border border-slate-200 dark:border-white/10 hover:border-emerald-500 hover:text-emerald-700 rounded-xl transition-all text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-2xs"
                      >
                        <Facebook className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span className="truncate">Facebook</span>
                      </a>
                      <a
                        href={siteConfig.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-2.5 bg-white dark:bg-[#02140C] border border-slate-200 dark:border-white/10 hover:border-emerald-500 hover:text-emerald-700 rounded-xl transition-all text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-2xs"
                      >
                        <Instagram className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span className="truncate">Instagram</span>
                      </a>
                    </div>
                  </div>

                  {/* Location & Presence */}
                  <div className="bg-slate-50 dark:bg-[#031C11] border border-slate-200/90 dark:border-white/10 rounded-2xl p-5">
                    <p className="text-xs uppercase tracking-wider font-mono font-bold text-slate-500 dark:text-slate-400 mb-1">
                      Base of Operations
                    </p>
                    <p className="text-sm font-serif font-bold text-slate-900 dark:text-white">
                      {siteConfig.location}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">
                      Student-led community initiative &bull; Non-governmental
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right: form */}
            <div className="lg:col-span-7">
              <Reveal delay={100}>
                <div className="bg-slate-50 dark:bg-[#031C11] border border-slate-200/90 dark:border-white/10 rounded-3xl p-7 sm:p-9 shadow-xs">
                  <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-2">
                    Send an Enquiry
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 font-sans">
                    Fill out the form below. Submitting will open your default email app with the details pre-filled to send directly to our team.
                  </p>

                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider font-mono text-slate-700 dark:text-slate-300 mb-1.5">
                        Your Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={form.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className={`w-full bg-white dark:bg-[#02140C] rounded-xl border ${errors.name ? 'border-red-500 ring-1 ring-red-400' : 'border-slate-200 dark:border-white/10 focus:border-emerald-600 dark:focus:border-emerald-400'} px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none transition-colors shadow-2xs`}
                        placeholder="e.g. Anandha Kumar"
                        aria-invalid={!!errors.name}
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-xs text-red-600 dark:text-red-400 flex items-center gap-1 font-mono">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider font-mono text-slate-700 dark:text-slate-300 mb-1.5">
                        Your Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={form.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className={`w-full bg-white dark:bg-[#02140C] rounded-xl border ${errors.email ? 'border-red-500 ring-1 ring-red-400' : 'border-slate-200 dark:border-white/10 focus:border-emerald-600 dark:focus:border-emerald-400'} px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none transition-colors shadow-2xs`}
                        placeholder="you@example.com"
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-xs text-red-600 dark:text-red-400 flex items-center gap-1 font-mono">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="reason" className="block text-xs font-bold uppercase tracking-wider font-mono text-slate-700 dark:text-slate-300 mb-1.5">
                        Reason for Contacting <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="reason"
                        value={form.reason}
                        onChange={(e) => handleChange('reason', e.target.value)}
                        className={`w-full bg-white dark:bg-[#02140C] rounded-xl border ${errors.reason ? 'border-red-500 ring-1 ring-red-400' : 'border-slate-200 dark:border-white/10 focus:border-emerald-600 dark:focus:border-emerald-400'} px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none transition-colors shadow-2xs`}
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
                        <p className="mt-1.5 text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.reason}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider font-mono text-slate-700 dark:text-slate-300 mb-1.5">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        value={form.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        rows={4}
                        className={`w-full bg-white dark:bg-[#02140C] rounded-xl border ${errors.message ? 'border-red-500 ring-1 ring-red-400' : 'border-slate-200 dark:border-white/10 focus:border-emerald-600 dark:focus:border-emerald-400'} px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none transition-colors shadow-2xs resize-y`}
                        placeholder="Tell us what you have in mind..."
                        aria-invalid={!!errors.message}
                      />
                      {errors.message && (
                        <p className="mt-1.5 text-xs text-red-600 dark:text-red-400 flex items-center gap-1 font-mono">
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
                          className="mt-1 w-4 h-4 accent-emerald-600 rounded"
                          aria-invalid={!!errors.consent}
                        />
                        <span className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          I consent to ONDRINAI contacting me via email regarding this enquiry.
                        </span>
                      </label>
                      {errors.consent && (
                        <p className="mt-1.5 text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
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
                      <div className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
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
