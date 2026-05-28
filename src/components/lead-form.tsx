"use client";

import { FormEvent, useState } from "react";
import {
  formatWhatsAppEnquiry,
  LeadFormData,
  LeadFormErrors,
  serviceTypes,
  validateLeadForm,
  whatsappHref,
} from "@/lib/booking";

const emptyForm: LeadFormData = {
  name: "",
  phone: "",
  email: "",
  serviceType: "Airport transfer",
  pickupSuburb: "",
  destination: "",
  travelDateTime: "",
  passengerCount: "",
  notes: "",
};

export function LeadForm() {
  const [formData, setFormData] = useState<LeadFormData>(emptyForm);
  const [errors, setErrors] = useState<LeadFormErrors>({});
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState("");
  const [statusTone, setStatusTone] = useState<"idle" | "success" | "error">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fallbackHref, setFallbackHref] = useState("");

  const updateField = (field: keyof LeadFormData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
    setStatus("");
    setStatusTone("idle");
    setFallbackHref("");
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateLeadForm(formData);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("Please check the highlighted fields.");
      setStatusTone("error");
      return;
    }

    const message = formatWhatsAppEnquiry(formData);
    const nextFallbackHref = whatsappHref(message);
    setFallbackHref("");
    setIsSubmitting(true);
    setStatus("Sending your enquiry...");
    setStatusTone("idle");

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, website }),
      });
      const result = (await response.json().catch(() => null)) as { message?: string } | null;

      if (!response.ok) {
        setFallbackHref(nextFallbackHref);
        setStatus(
          result?.message ??
            "The email could not be sent right now. You can still send the same details by WhatsApp."
        );
        setStatusTone("error");
        return;
      }

      setFormData(emptyForm);
      setWebsite("");
      setStatus("Enquiry sent. Docklands 1998 will respond by phone or email.");
      setStatusTone("success");
    } catch {
      setFallbackHref(nextFallbackHref);
      setStatus("The email service did not respond. You can still send the same details by WhatsApp.");
      setStatusTone("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-5" noValidate>
      <label className="honeypot" aria-hidden="true">
        Website
        <input
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
        />
      </label>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="field-label">
          Name
          <input
            className={`field ${errors.name ? "field-error" : ""}`}
            value={formData.name}
            onChange={(event) => updateField("name", event.target.value)}
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name ? <span className="error-text">{errors.name}</span> : null}
        </label>

        <label className="field-label">
          Phone
          <input
            className={`field ${errors.phone ? "field-error" : ""}`}
            value={formData.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            autoComplete="tel"
            inputMode="tel"
            aria-invalid={Boolean(errors.phone)}
          />
          {errors.phone ? <span className="error-text">{errors.phone}</span> : null}
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="field-label">
          Email optional
          <input
            className={`field ${errors.email ? "field-error" : ""}`}
            value={formData.email}
            onChange={(event) => updateField("email", event.target.value)}
            autoComplete="email"
            inputMode="email"
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email ? <span className="error-text">{errors.email}</span> : null}
        </label>

        <label className="field-label">
          Service
          <select
            className={`field ${errors.serviceType ? "field-error" : ""}`}
            value={formData.serviceType}
            onChange={(event) => updateField("serviceType", event.target.value)}
            aria-invalid={Boolean(errors.serviceType)}
          >
            {serviceTypes.map((service) => (
              <option key={service}>{service}</option>
            ))}
          </select>
          {errors.serviceType ? <span className="error-text">{errors.serviceType}</span> : null}
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="field-label">
          Pickup
          <input
            className={`field ${errors.pickupSuburb ? "field-error" : ""}`}
            value={formData.pickupSuburb}
            onChange={(event) => updateField("pickupSuburb", event.target.value)}
            placeholder="Docklands, Melbourne Airport, Southbank"
            aria-invalid={Boolean(errors.pickupSuburb)}
          />
          {errors.pickupSuburb ? <span className="error-text">{errors.pickupSuburb}</span> : null}
        </label>

        <label className="field-label">
          Destination
          <input
            className={`field ${errors.destination ? "field-error" : ""}`}
            value={formData.destination}
            onChange={(event) => updateField("destination", event.target.value)}
            placeholder="Yarra Valley, Crown, MCG, home address"
            aria-invalid={Boolean(errors.destination)}
          />
          {errors.destination ? <span className="error-text">{errors.destination}</span> : null}
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="field-label">
          Date and time optional
          <input
            className="field"
            value={formData.travelDateTime}
            onChange={(event) => updateField("travelDateTime", event.target.value)}
            type="datetime-local"
          />
        </label>

        <label className="field-label">
          Passengers optional
          <input
            className="field"
            value={formData.passengerCount}
            onChange={(event) => updateField("passengerCount", event.target.value)}
            type="number"
            min="1"
            inputMode="numeric"
          />
        </label>
      </div>

      <label className="field-label">
        Notes optional
        <textarea
          className="field min-h-32 resize-y"
          value={formData.notes}
          onChange={(event) => updateField("notes", event.target.value)}
          placeholder="Flight number, waiting time, wedding schedule, luggage, child seat, tour stops."
        />
      </label>

      <div className="flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-h-6 text-sm text-[#f3e6cc]/68" role="status" aria-live="polite">
          <p className={statusTone === "success" ? "text-[#ddbd76]" : statusTone === "error" ? "text-[#ffd0bd]" : ""}>
            {status}
          </p>
          {fallbackHref ? (
            <a href={fallbackHref} className="mt-3 inline-flex text-[#ddbd76] underline underline-offset-4">
              Send the same details by WhatsApp
            </a>
          ) : null}
        </div>
        <button type="submit" className="btn btn-gold" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send enquiry"}
        </button>
      </div>
    </form>
  );
}
