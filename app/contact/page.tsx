import { InquiryForm } from "@/components/InquiryForm";
import { DrawnRule } from "@/components/SectionHead";

export const metadata = {
  title: "Contact — Virelle",
  description: "Begin a private conversation with a Virelle advisor.",
};

const offices = [
  { city: "London", detail: "12 Chiltern Street, W1U", phone: "+44 20 7100 4455" },
  { city: "Zürich", detail: "Bahnhofstrasse 21, 8001", phone: "+41 44 500 2210" },
  { city: "Amalfi", detail: "Via dei Mulini 8, 84017", phone: "+39 06 4200 1180" },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[1560px] px-6 pb-32 pt-32 md:px-12 md:pt-40">
      <DrawnRule />
      <p className="t-label pt-5 text-ink-soft">
        <span className="tabular-nums text-bronze">01</span>
        <span className="ml-3">Enquiries</span>
      </p>

      <div className="mt-8 grid gap-x-20 gap-y-16 lg:grid-cols-[1fr_1fr]">
        <div>
          <h1 className="t-display t-d1 max-w-[10ch] text-ink">
            Begin a conversation
          </h1>
          <p className="t-lead mt-10 max-w-[42ch] text-ink-soft">
            Tell us what you are looking for — or what you are ready to let go
            of. An advisor will respond, discreetly, within one business day.
          </p>

          <dl className="mt-14 border-t border-rule">
            <div className="flex items-baseline justify-between border-b border-rule py-4">
              <dt className="t-label text-ink-soft">Email</dt>
              <dd className="m-0">
                <a
                  href="mailto:hello@virelle.com"
                  className="t-small text-ink underline-offset-4 hover:text-bronze hover:underline"
                >
                  hello@virelle.com
                </a>
              </dd>
            </div>
            <div className="flex items-baseline justify-between border-b border-rule py-4">
              <dt className="t-label text-ink-soft">Telephone</dt>
              <dd className="m-0">
                <a
                  href="tel:+442071004455"
                  className="t-small tabular-nums text-ink underline-offset-4 hover:text-bronze hover:underline"
                >
                  +44 20 7100 4455
                </a>
              </dd>
            </div>
          </dl>

          <ul className="mt-14 grid list-none gap-8 p-0 sm:grid-cols-3">
            {offices.map((o) => (
              <li key={o.city} className="border-t border-rule pt-4">
                <p className="t-label text-bronze">{o.city}</p>
                <p className="t-small mt-2 text-ink-soft">{o.detail}</p>
                <p className="t-small tabular-nums text-ink-soft">{o.phone}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:pt-4">
          <h2 className="t-label border-b border-rule pb-3 text-ink-soft">
            Enquiry
          </h2>
          <div className="mt-8">
            <InquiryForm />
          </div>
        </div>
      </div>
    </div>
  );
}
