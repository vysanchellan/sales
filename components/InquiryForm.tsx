"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, AlertCircle, Loader2 } from "lucide-react";
import { MagneticButton } from "./animations/MagneticButton";

// ---------------------------------------------------------------------------
// TODO: wire to a static-site form handler before going live.
// Options: Formspree (https://formspree.io), Web3Forms, or EmailJS.
// 1. Create an account and a form, then paste the endpoint / access key below.
// 2. On Vercel, prefer an env var (NEXT_PUBLIC_FORMSPREE_ID) over hardcoding.
// While FORM_ENDPOINT is empty the form runs in "demo" mode: it validates and
// shows the success state without actually sending anything.
// ---------------------------------------------------------------------------
const FORM_ENDPOINT =
  process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || ""; // e.g. "https://formspree.io/f/xxxxxx"

type State = "idle" | "submitting" | "success" | "error";

interface Props {
  propertyTitle?: string;
  propertySlug?: string;
  compact?: boolean;
}

export function InquiryForm({ propertyTitle, propertySlug, compact = false }: Props) {
  const [state, setState] = useState<State>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      if (!FORM_ENDPOINT) {
        // Demo mode — no endpoint configured yet.
        await new Promise((r) => setTimeout(r, 900));
        setState("success");
        form.reset();
        return;
      }
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setState("success");
        form.reset();
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {state === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-3 rounded-lg border border-gold/25 bg-gold/5 p-8 text-center"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold text-onaccent">
              <Check size={22} />
            </span>
            <h3 className="font-display text-xl text-cloud">Thank you</h3>
            <p className="max-w-sm text-sm text-mist">
              Your enquiry has reached us. An advisor will be in touch, discreetly, within one
              business day.
            </p>
            <button
              onClick={() => setState("idle")}
              className="mt-2 text-sm text-gold hover:underline"
            >
              Send another
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {propertyTitle && (
              <input type="hidden" name="property" value={`${propertyTitle} (${propertySlug})`} />
            )}
            <div className={compact ? "space-y-4" : "grid gap-4 sm:grid-cols-2"}>
              <Field name="name" label="Name" type="text" required />
              <Field name="email" label="Email" type="email" required />
            </div>
            <div className={compact ? "space-y-4" : "grid gap-4 sm:grid-cols-2"}>
              <Field name="phone" label="Phone" type="tel" />
              <Field
                name="subject"
                label="Interested in"
                type="text"
                defaultValue={propertyTitle ? `Enquiry — ${propertyTitle}` : undefined}
              />
            </div>
            <label className="block">
              <span className="mb-1 block text-xs uppercase tracking-wider text-mist/70">
                Message
              </span>
              <textarea
                name="message"
                required
                rows={compact ? 3 : 4}
                placeholder={
                  propertyTitle
                    ? `I'd like to arrange a private viewing of ${propertyTitle}…`
                    : "Tell us what you're looking for…"
                }
                className="w-full resize-none rounded-xl border border-cloud/15 bg-ink/50 px-4 py-3 text-sm text-cloud outline-none transition-colors placeholder:text-mist/50 focus:border-gold/50"
              />
            </label>

            {state === "error" && (
              <p className="flex items-center gap-2 text-sm text-red-400">
                <AlertCircle size={16} /> Something went wrong. Please try again or email
                hello@virelle.com.
              </p>
            )}

            <MagneticButton
              as="button"
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gold px-6 py-3 text-sm font-medium text-onaccent disabled:opacity-70"
            >
              {state === "submitting" ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Sending…
                </>
              ) : (
                "Send enquiry"
              )}
            </MagneticButton>
            {!FORM_ENDPOINT && (
              <p className="text-center text-[11px] text-mist/50">
                Demo mode — connect a form handler to receive submissions.
              </p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  name,
  label,
  type,
  required,
  defaultValue,
}: {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs uppercase tracking-wider text-mist/70">
        {label}
        {required && <span className="text-gold"> *</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        className="w-full rounded-xl border border-cloud/15 bg-ink/50 px-4 py-2.5 text-sm text-cloud outline-none transition-colors placeholder:text-mist/50 focus:border-gold/50"
      />
    </label>
  );
}
