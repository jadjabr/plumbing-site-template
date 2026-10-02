"use client";

import {
  useId,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type SubmitEvent,
} from "react";
import { site } from "../lib/site";
import { categories } from "../lib/services";
import {
  AlertCircleIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ClockIcon,
  PhoneIcon,
  ShieldCheckIcon,
} from "./icons";

type PropertyType = (typeof categories)[number]["id"];

export type QuoteRequest = {
  name: string;
  phone: string;
  email: string;
  propertyType: PropertyType;
  service: string;
  message: string;
};

type Field = keyof QuoteRequest;
type Errors = Partial<Record<Field, string>>;

const OTHER_SERVICE = "Other / Not sure";
const MESSAGE_MAX = 1000;

const initialValues: QuoteRequest = {
  name: "",
  phone: "",
  email: "",
  propertyType: "residential",
  service: "",
  message: "",
};

// Order matters: on submit, focus jumps to the first invalid field in this list.
const fieldOrder: Field[] = ["name", "phone", "email", "service", "message"];

// North American numbers: 10 digits, optionally prefixed with country code 1.
function phoneDigits(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.length === 11 && digits.startsWith("1")
    ? digits.slice(1)
    : digits;
}

function formatPhone(value: string) {
  const d = phoneDigits(value);
  return d.length === 10
    ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`
    : value;
}

function validate(values: QuoteRequest): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = "Please enter your name.";

  if (!values.phone.trim()) errors.phone = "Please enter a phone number.";
  else if (phoneDigits(values.phone).length !== 10)
    errors.phone = "Enter a 10-digit phone number, e.g. (780) 555-0123.";

  if (!values.email.trim()) errors.email = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
    errors.email = "Enter a valid email, e.g. name@example.com.";

  if (!values.service) errors.service = "Please choose a service.";

  if (values.message.length > MESSAGE_MAX)
    errors.message = `Please keep details under ${MESSAGE_MAX} characters.`;
  return errors;
}

// Placeholder: submissions aren't delivered anywhere yet. Replace this with
// the real delivery (email, database, CRM) when the backend is wired up.
async function submitQuote(request: QuoteRequest): Promise<void> {
  void request;
}

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

// text-base (16px) on inputs stops iOS Safari zooming in on focus.
const controlBase =
  "block w-full rounded-lg border bg-ink-800/60 text-base text-white placeholder:text-white/35 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30";
const controlState = (invalid: boolean) =>
  invalid
    ? "border-danger/70 hover:border-danger"
    : "border-ink-600 hover:border-white/25";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 flex items-start gap-1.5 text-sm text-danger">
      <AlertCircleIcon className="mt-0.5 size-4 shrink-0" />
      {message}
    </p>
  );
}

export default function Quote() {
  const [values, setValues] = useState<QuoteRequest>(initialValues);
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );
  const uid = useId();
  const id = (field: string) => `${uid}-${field}`;

  const errors = validate(values);
  const visibleError = (field: Field) =>
    touched[field] || submitAttempted ? errors[field] : undefined;
  const errorCount = fieldOrder.filter((f) => errors[f]).length;

  const services =
    categories.find((c) => c.id === values.propertyType)?.services ?? [];

  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setValues((prev) => {
      const next = { ...prev, [name]: value };
      // Switching property type clears a service that isn't offered for it.
      if (name === "propertyType") {
        const offered = categories
          .find((c) => c.id === value)
          ?.services.some((s) => s.name === prev.service);
        if (!offered && prev.service !== OTHER_SERVICE) next.service = "";
      }
      return next;
    });
  };

  const onBlur = (
    e: FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const name = e.target.name as Field;
    setTouched((prev) => ({ ...prev, [name]: true }));
    if (name === "phone")
      setValues((prev) => ({ ...prev, phone: formatPhone(prev.phone) }));
  };

  const onSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitAttempted(true);
    const firstInvalid = fieldOrder.find((f) => errors[f]);
    if (firstInvalid) {
      document.getElementById(id(firstInvalid))?.focus();
      return;
    }
    setStatus("submitting");
    await submitQuote({
      ...values,
      name: values.name.trim(),
      email: values.email.trim(),
      phone: formatPhone(values.phone),
      message: values.message.trim(),
    });
    setStatus("success");
  };

  const reset = () => {
    setValues(initialValues);
    setTouched({});
    setSubmitAttempted(false);
    setStatus("idle");
  };

  // Shared props for text inputs, select and textarea.
  const control = (field: Field) => {
    const err = visibleError(field);
    return {
      id: id(field),
      name: field,
      value: values[field],
      onChange,
      onBlur,
      "aria-invalid": err ? true : undefined,
      "aria-describedby": err ? id(`${field}-error`) : undefined,
    };
  };

  return (
    <section
      id="quote"
      aria-labelledby="quote-heading"
      className="border-t border-white/10 bg-ink-900/40"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-10 lg:px-8">
        {/* Intro. On mobile the order is intro → form → reassurance so the form
            is right under the heading; on desktop the form spans the right column. */}
        <div className="lg:col-start-1 lg:row-start-1">
          <p className="text-sm font-semibold text-accent">Free Quote</p>
          <h2
            id="quote-heading"
            className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-balance text-white sm:text-4xl lg:text-5xl"
          >
            Request a Free Quote
          </h2>
          <p className="mt-4 text-base leading-relaxed text-pretty text-white/70 sm:text-lg">
            No obligation, fast response. Tell us what&apos;s going on and
            we&apos;ll come back with a clear, upfront price.
          </p>
        </div>

        {/* Reassurance + emergency call */}
        <div className="order-last lg:order-none lg:col-start-1 lg:row-start-2">
          <ul className="space-y-4">
            {[
              {
                icon: ClockIcon,
                title: "Fast response",
                text: "We get back to quote requests quickly, usually the same day.",
              },
              {
                icon: ShieldCheckIcon,
                title: "No obligation",
                text: "Free estimates, no pressure and no hidden fees.",
              },
            ].map(({ icon: ItemIcon, title, text }) => (
              <li key={title} className="flex gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-ink-800 text-accent ring-1 ring-white/10">
                  <ItemIcon className="size-5" />
                </span>
                <div>
                  <p className="font-semibold text-white">{title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-white/60">
                    {text}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-10 rounded-xl border border-white/10 bg-ink-900/60 p-6">
            <p className="font-semibold text-white">
              Plumbing emergency? Don&apos;t wait on a form.
            </p>
            <p className="mt-1 text-sm text-white/60">
              We answer 24/7. Call and we&apos;ll dispatch a plumber right away.
            </p>
            <a
              href={site.phone.href}
              className={`mt-4 inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-ink-600 bg-ink-800/60 px-5 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-ink-700 ${focusRing}`}
            >
              <PhoneIcon className="size-4 shrink-0 text-accent" />
              <span className="tabular-nums">Call {site.phone.display}</span>
            </a>
          </div>
        </div>

        {/* Form card */}
        <div className="rounded-2xl lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start border border-white/10 bg-ink-900/70 p-5 shadow-[0_24px_60px_-30px_rgb(0_0_0/0.8)] sm:p-8">
          {status === "success" ? (
            <div
              role="status"
              className="flex flex-col items-start py-6 sm:py-10"
            >
              <span className="grid size-12 place-items-center rounded-full bg-accent/15 text-accent">
                <CheckCircleIcon className="size-6" />
              </span>
              <h3 className="mt-5 text-2xl font-semibold tracking-tight text-white">
                Thanks, {values.name.trim().split(/\s+/)[0]}. We&apos;ve got
                your request.
              </h3>
              <p className="mt-3 max-w-md leading-relaxed text-white/70">
                We&apos;ll be in touch at{" "}
                <span className="whitespace-nowrap text-white">
                  {values.phone}
                </span>{" "}
                or {values.email} shortly. If it&apos;s urgent, call us at{" "}
                <a
                  href={site.phone.href}
                  className={`whitespace-nowrap rounded font-semibold text-accent hover:text-accent-hover ${focusRing}`}
                >
                  {site.phone.display}
                </a>
                .
              </p>
              <button
                type="button"
                onClick={reset}
                className={`mt-8 inline-flex h-11 items-center rounded-lg border border-ink-600 bg-ink-800/60 px-5 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-ink-700 ${focusRing}`}
              >
                Send another request
              </button>
            </div>
          ) : (
            <form noValidate onSubmit={onSubmit} className="space-y-6">
              <p className="text-sm text-white/50">
                All fields are required unless marked optional.
              </p>

              {submitAttempted && errorCount > 0 && (
                <div
                  role="alert"
                  className="flex items-start gap-2 rounded-lg border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-danger"
                >
                  <AlertCircleIcon className="mt-0.5 size-4 shrink-0" />
                  Please fix{" "}
                  {errorCount === 1 ? "the field" : `${errorCount} fields`}{" "}
                  highlighted below.
                </div>
              )}

              <div>
                <label
                  htmlFor={id("name")}
                  className="block text-sm font-medium text-white"
                >
                  Full name
                </label>
                <input
                  {...control("name")}
                  type="text"
                  autoComplete="name"
                  placeholder="Jane Smith"
                  className={`mt-2 h-12 px-4 ${controlBase} ${controlState(!!visibleError("name"))}`}
                />
                <FieldError
                  id={id("name-error")}
                  message={visibleError("name")}
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor={id("phone")}
                    className="block text-sm font-medium text-white"
                  >
                    Phone
                  </label>
                  <input
                    {...control("phone")}
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="(780) 555-0123"
                    className={`mt-2 h-12 px-4 ${controlBase} ${controlState(!!visibleError("phone"))}`}
                  />
                  <FieldError
                    id={id("phone-error")}
                    message={visibleError("phone")}
                  />
                </div>
                <div>
                  <label
                    htmlFor={id("email")}
                    className="block text-sm font-medium text-white"
                  >
                    Email
                  </label>
                  <input
                    {...control("email")}
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    autoCapitalize="none"
                    spellCheck={false}
                    placeholder="you@example.com"
                    className={`mt-2 h-12 px-4 ${controlBase} ${controlState(!!visibleError("email"))}`}
                  />
                  <FieldError
                    id={id("email-error")}
                    message={visibleError("email")}
                  />
                </div>
              </div>

              <fieldset>
                <legend className="text-sm font-medium text-white">
                  Property type
                </legend>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  {categories.map(({ id: typeId, label, icon: TypeIcon }) => (
                    <label
                      key={typeId}
                      className="flex h-12 cursor-pointer items-center justify-center gap-2 rounded-lg border border-ink-600 bg-ink-800/60 text-sm font-semibold text-white/60 transition-colors hover:border-white/25 hover:text-white has-checked:border-accent has-checked:bg-accent/10 has-checked:text-white has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent"
                    >
                      <input
                        type="radio"
                        name="propertyType"
                        value={typeId}
                        checked={values.propertyType === typeId}
                        onChange={onChange}
                        className="peer sr-only"
                      />
                      <TypeIcon className="size-4 shrink-0 peer-checked:text-accent" />
                      {label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div>
                <label
                  htmlFor={id("service")}
                  className="block text-sm font-medium text-white"
                >
                  Service needed
                </label>
                <div className="relative mt-2">
                  <select
                    {...control("service")}
                    className={`h-12 appearance-none pl-4 pr-11 ${controlBase} ${controlState(!!visibleError("service"))} ${values.service ? "" : "text-white/35"} [&>option]:bg-ink-800 [&>option]:text-white`}
                  >
                    <option value="" disabled>
                      Choose a service…
                    </option>
                    {services.map((s) => (
                      <option key={s.name} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                    <option value={OTHER_SERVICE}>{OTHER_SERVICE}</option>
                  </select>
                  <ChevronDownIcon className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-white/50" />
                </div>
                <FieldError
                  id={id("service-error")}
                  message={visibleError("service")}
                />
              </div>

              <div>
                <div className="flex items-baseline justify-between gap-4">
                  <label
                    htmlFor={id("message")}
                    className="block text-sm font-medium text-white"
                  >
                    Details{" "}
                    <span className="font-normal text-white/50">
                      (optional)
                    </span>
                  </label>
                  <span
                    className={`text-xs tabular-nums ${values.message.length > MESSAGE_MAX ? "text-danger" : "text-white/40"}`}
                  >
                    {values.message.length}/{MESSAGE_MAX}
                  </span>
                </div>
                <textarea
                  {...control("message")}
                  rows={4}
                  placeholder="What's happening, where in the property, and any timing constraints."
                  className={`mt-2 resize-y px-4 py-3 leading-relaxed ${controlBase} ${controlState(!!visibleError("message"))}`}
                />
                <FieldError
                  id={id("message-error")}
                  message={visibleError("message")}
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className={`inline-flex h-14 w-full items-center justify-center rounded-lg bg-accent px-7 text-base font-semibold text-accent-ink shadow-[0_0_0_1px_rgb(255_255_255/0.08)_inset,0_10px_30px_-10px_var(--color-accent)] transition-colors hover:bg-accent-hover disabled:cursor-wait disabled:opacity-70 ${focusRing}`}
                >
                  {status === "submitting"
                    ? "Sending…"
                    : "Request My Free Quote"}
                </button>
                <p className="mt-3 text-center text-xs text-white/45">
                  We&apos;ll only use your details to respond to this request.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
