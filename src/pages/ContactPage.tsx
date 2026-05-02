import { useState } from "react";
import { z } from "zod";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { COMPANY, PRODUCTS } from "@/lib/site";
import { PageHero } from "./AboutPage";
import { DiagonalPattern } from "@/components/Illustrations";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(7, "Please enter a valid phone").max(20),
  product: z.string().trim().min(1, "Please select a product"),
  message: z.string().trim().min(10, "Please share a few details (10+ chars)").max(1500),
});

type FormState = z.infer<typeof schema>;

const initial: FormState = { name: "", company: "", email: "", phone: "", product: "", message: "" };

export const ContactPage = () => {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) {
      const errs: Partial<Record<keyof FormState, string>> = {};
      r.error.issues.forEach((iss) => {
        const k = iss.path[0] as keyof FormState;
        if (!errs[k]) errs[k] = iss.message;
      });
      setErrors(errs);
      return;
    }
    setSubmitted(true);
    setForm(initial);
  };

  return (
    <div className="page-fade">
      <PageHero title="GET IN TOUCH" subtitle="Tell us about your line. Our engineers reply within one working day."  backgroundImage="/contact.png"/>

      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-5 border border-border">
            {/* Left panel */}
            <div className="lg:col-span-2 bg-primary text-primary-foreground p-10 lg:p-12 relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none">
                <DiagonalPattern className="absolute inset-0 w-full h-full opacity-50" />
              </div>
              <div className="relative">
                <div className="font-display font-bold text-3xl mb-2">V TECH INDUSTRIES</div>
                <p className="font-label text-[11px] text-white/70 mb-10">Solution Partner for Your Process</p>

                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <span className="w-10 h-10 bg-white/10 flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4" />
                    </span>
                    <div>
                      <div className="font-label text-[10px] text-white/70">Phone</div>
                      {COMPANY.phones.map((p) => (
                        <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="block hover:text-white/80 transition-colors">{p}</a>
                      ))}
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="w-10 h-10 bg-white/10 flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4" />
                    </span>
                    <div>
                      <div className="font-label text-[10px] text-white/70">Email</div>
                      <a href={`mailto:${COMPANY.email}`} className="hover:text-white/80 transition-colors break-all">{COMPANY.email}</a>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="w-10 h-10 bg-white/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4" />
                    </span>
                    <div>
                      <div className="font-label text-[10px] text-white/70">Location</div>
                      <p>{COMPANY.address}</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="w-10 h-10 bg-white/10 flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4" />
                    </span>
                    <div>
                      <div className="font-label text-[10px] text-white/70">Working Hours</div>
                      <p>{COMPANY.hours}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right panel form */}
            <div className="lg:col-span-3 bg-white p-10 lg:p-12">
              {submitted ? (
                <Reveal>
                  <div className="h-full flex flex-col items-center justify-center text-center py-16">
                    <CheckCircle2 className="w-16 h-16 text-primary mb-6" />
                    <h3 className="font-display font-bold text-3xl text-ink">Enquiry received.</h3>
                    <p className="text-ink-secondary mt-3 max-w-md">
                      Thank you. One of our engineers will get back to you within one working day.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-8 font-label text-[11px] border border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 py-3 transition-colors"
                    >
                      Send Another
                    </button>
                  </div>
                </Reveal>
              ) : (
                <form onSubmit={onSubmit} noValidate className="space-y-5">
                  <div>
                    <span className="font-label text-[11px] text-primary">Send Enquiry</span>
                    <h2 className="font-display font-bold text-3xl md:text-4xl mt-2 text-ink">Let's talk about your line.</h2>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Name" id="name" error={errors.name}>
                      <input id="name" maxLength={100} value={form.name} onChange={(e) => update("name", e.target.value)} className={inputCls(errors.name)} />
                    </Field>
                    <Field label="Company Name" id="company" error={errors.company} optional>
                      <input id="company" maxLength={120} value={form.company} onChange={(e) => update("company", e.target.value)} className={inputCls(errors.company)} />
                    </Field>
                    <Field label="Email" id="email" error={errors.email}>
                      <input id="email" type="email" maxLength={255} value={form.email} onChange={(e) => update("email", e.target.value)} className={inputCls(errors.email)} />
                    </Field>
                    <Field label="Phone" id="phone" error={errors.phone}>
                      <input id="phone" type="tel" maxLength={20} value={form.phone} onChange={(e) => update("phone", e.target.value)} className={inputCls(errors.phone)} />
                    </Field>
                  </div>

                  <Field label="Product Interest" id="product" error={errors.product}>
                    <select id="product" value={form.product} onChange={(e) => update("product", e.target.value)} className={inputCls(errors.product)}>
                      <option value="">Select a product…</option>
                      {PRODUCTS.map((p) => (
                        <option key={p.id} value={p.name}>{p.name}</option>
                      ))}
                      <option value="Other">Other / Custom Solution</option>
                    </select>
                  </Field>

                  <Field label="Message" id="message" error={errors.message}>
                    <textarea
                      id="message"
                      rows={5}
                      maxLength={1500}
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      className={inputCls(errors.message)}
                      placeholder="Throughput, product type, footprint, timeline…"
                    />
                  </Field>

                  <button
                    type="submit"
                    className="w-full font-label text-[12px] bg-primary text-primary-foreground hover:bg-primary-dark px-6 py-4 transition-colors inline-flex items-center justify-center gap-2"
                  >
                    Send Enquiry <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-surface">
        <div className="w-full h-[400px] md:h-[480px]">
          <iframe
            title="V Tech Industries — Chennai location"
            src="https://maps.google.com/maps?q=Thirumazhisai,Chennai&output=embed"
            className="w-full h-full border-0 grayscale-[20%]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </div>
  );
};

const Field = ({
  label,
  id,
  error,
  optional,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) => (
  <div>
    <label htmlFor={id} className="font-label text-[10px] text-ink-secondary mb-2 flex items-baseline justify-between">
      <span>{label}</span>
      {optional && <span className="text-ink-muted normal-case tracking-normal text-[10px]">optional</span>}
    </label>
    {children}
    {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
  </div>
);

const inputCls = (err?: string) =>
  `w-full bg-white border ${err ? "border-destructive" : "border-border"} px-4 py-3 text-ink focus:outline-none focus:border-primary transition-colors`;
