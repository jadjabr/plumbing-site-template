import { areas, RADIUS_KM } from "../lib/areas";
import { site } from "../lib/site";
import { ArrowRightIcon, ChevronDownIcon, PhoneIcon } from "./icons";

const areaList = new Intl.ListFormat("en-CA", { type: "conjunction" }).format(
  areas.filter((a) => a.name !== "Edmonton").map((a) => a.name),
);

// Each answer names the business and restates the subject so it stands on its
// own when quoted by search engines or AI assistants. Placeholder claims to
// confirm with the client before launch: response time, insurance details,
// and financing.
const faqs = [
  {
    question: "Do you offer 24/7 emergency plumbing service?",
    answer: `Yes. ${site.name} offers 24/7 emergency plumbing, including nights, weekends and holidays. Call ${site.phone.display} any time and a licensed plumber will be dispatched to you.`,
  },
  {
    question: "Do you charge for estimates?",
    answer: `No. ${site.name} provides free, no-obligation estimates, and you approve an upfront price before any work begins.`,
  },
  {
    question: "Are you licensed and insured?",
    answer: `Yes. Every ${site.name} technician is a certified journeyperson plumber in Alberta, and the company is fully insured with liability and WCB Alberta coverage.`,
  },
  {
    question: "Do you service both residential and commercial properties?",
    answer: `Yes. ${site.name} handles residential work such as leak repair, drain cleaning and water heaters, as well as commercial work including drain and sewer service, backflow testing, grease traps and maintenance contracts.`,
  },
  {
    question: "How quickly can you respond to an emergency call?",
    answer: `For emergency calls in Edmonton, ${site.name} typically has a plumber on site within 60 to 90 minutes, depending on your location, the time of day and road conditions.`,
  },
  {
    question: "What areas do you serve?",
    answer: `${site.name} serves Edmonton and the surrounding communities of ${areaList}, within roughly ${RADIUS_KM} km of central Edmonton. If your area isn't listed, call ${site.phone.display} and we may still be able to help.`,
  },
  {
    question: "Do you offer financing for larger jobs?",
    answer: `Yes. ${site.name} offers financing on larger jobs such as water heater replacements, sewer line repairs and re-piping, subject to credit approval. Ask about payment options when you request your quote.`,
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

// Keep the phone number on one line in the visible answers (the JSON-LD
// keeps a plain space).
const unbreakablePhone = (text: string) =>
  text.replaceAll(
    site.phone.display,
    site.phone.display.replace(" ", "\u00a0"),
  );

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export default function FAQ() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="border-t border-white/10 bg-ink-900/40"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 lg:px-8">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-sm font-semibold text-accent">FAQ</p>
          <h2
            id="faq-heading"
            className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-balance text-white sm:text-4xl lg:text-5xl"
          >
            Frequently asked questions.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-pretty text-white/70 sm:text-lg">
            Straight answers about pricing, response times and what we cover.
          </p>

          <div className="mt-8 rounded-xl border border-white/10 bg-ink-900/60 p-6">
            <p className="font-semibold text-white">Still have a question?</p>
            <p className="mt-1 text-sm text-white/60">
              Talk to a real person. We answer 24/7.
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={site.phone.href}
                className={`inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-ink-600 bg-ink-800/60 px-5 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-ink-700 ${focusRing}`}
              >
                <PhoneIcon className="size-4 shrink-0 text-accent" />
                <span className="tabular-nums">{site.phone.display}</span>
              </a>
              <a
                href={site.quoteHref}
                className={`group inline-flex h-12 items-center justify-center gap-1.5 rounded-lg px-2 text-sm font-semibold text-accent transition-colors hover:text-accent-hover ${focusRing}`}
              >
                Get a Free Quote
                <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
              </a>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <details
              key={faq.question}
              // First answer open so it's obvious the questions expand.
              open={i === 0}
              className="group rounded-xl border border-white/10 bg-ink-900/60 transition-colors open:border-accent/40 open:bg-ink-900"
            >
              <summary
                className={`flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-5 py-4 text-white transition-colors hover:text-accent-hover sm:px-6 sm:py-5 [&::-webkit-details-marker]:hidden ${focusRing}`}
              >
                <h3 className="text-base font-semibold sm:text-lg">
                  {faq.question}
                </h3>
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-ink-800 text-accent ring-1 ring-white/10">
                  <ChevronDownIcon className="size-4 transition-transform duration-300 group-open:rotate-180 motion-reduce:transition-none" />
                </span>
              </summary>
              <p className="px-5 pb-5 text-base leading-relaxed text-pretty text-white/70 sm:px-6 sm:pb-6">
                {unbreakablePhone(faq.answer)}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
