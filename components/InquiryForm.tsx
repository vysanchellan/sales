"use client";

import { useState } from "react";
import { IconCheck, IconArrowRight } from "./Icons";

// While FORM_ENDPOINT is empty the form runs in demo mode: it validates and
// shows the success state without sending. Set NEXT_PUBLIC_FORMSPREE_ENDPOINT
// to wire it to Formspree / Web3Forms.
const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || "";

type State = "idle" | "submitting" | "success" | "error";

function Field({
  name,
  label,
  type = "text",
  required,
  defaultValue,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
}) {
  const id = `f-${name}`;
  return (
    <div>
      <label htmlFor={id} className="t-label block text-ink-soft">
        {label}
        {required && <span className="text-bronze"> *</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        className="t-small mt-2 w-full border-b border-rule-strong bg-transparent py-2.5 text-ink outline-none transition-colors focus:border-bronze"
      />
    </div>
  );
}

export function InquiryForm({
  propertyTitle,
  propertySlug,
  compact = false,
}: {
  propertyTitle?: string;
  propertySlug?: string;
  compact?: boolean;
}) {
  const [state, setState] = useState<State>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      if (!FORM_ENDPOINT) {
        await new Promise((r) => setTimeout(r, 700));
        setState("success");
        form.reset();
        return;
      }
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      setState(res.ok ? "success" : "error");
      if (res.ok) form.reset();
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="border-y border-rule py-14 text-center">
        <IconCheck size={26} className="mx-auto text-bronze" />
        <h3 className="t-display t-d3 mt-5 text-ink">Thank you</h3>
        <p className="t-small mx-auto mt-3 max-w-[38ch] text-ink-soft">
          Your enquiry has reached us. An advisor will be in touch, discreetly,
          within one business day.
        </p>
        <button
          onClick={() => setState("idle")}
          className="t-label mt-6 text-bronze underline-offset-4 hover:underline"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      {propertyTitle && (
        <input
          type="hidden"
          name="property"
          value={`${propertyTitle} (${propertySlug})`}
        />
      )}

      <div className={compact ? "space-y-7" : "grid gap-7 sm:grid-cols-2"}>
        <Field name="name" label="Name" required />
        <Field name="email" label="Email" type="email" required />
      </div>
      <div className={compact ? "space-y-7" : "grid gap-7 sm:grid-cols-2"}>
        <Field name="phone" label="Telephone" type="tel" />
        <Field
          name="subject"
          label="Interested in"
          defaultValue={propertyTitle ? `Enquiry — ${propertyTitle}` : undefined}
        />
      </div>

      <div>
        <label htmlFor="f-message" className="t-label block text-ink-soft">
          Message<span className="text-bronze"> *</span>
        </label>
        <textarea
          id="f-message"
          name="message"
          required
          rows={compact ? 3 : 4}
          placeholder={
            propertyTitle
              ? `I would like to arrange a private viewing of ${propertyTitle}…`
              : "Tell us what you are looking for…"
          }
          className="t-small mt-2 w-full resize-none border-b border-rule-strong bg-transparent py-2.5 text-ink outline-none transition-colors placeholder:text-ink-soft/60 focus:border-bronze"
        />
      </div>

      {state === "error" && (
        <p className="t-small text-bronze" role="alert">
          Something went wrong. Please try again, or write to hello@virelle.com.
        </p>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="t-label group inline-flex items-center gap-3 border-b border-bronze pb-2 text-bronze disabled:opacity-60"
      >
        {state === "submitting" ? "Sending" : "Send enquiry"}
        <IconArrowRight
          size={16}
          className="transition-transform duration-500 group-hover:translate-x-1"
        />
      </button>

      {!FORM_ENDPOINT && (
        <p className="t-label text-ink-soft/70">
          Demo mode — no handler connected
        </p>
      )}
    </form>
  );
}
