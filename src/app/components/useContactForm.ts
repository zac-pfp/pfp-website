"use client";

import { useState } from "react";

export type ContactFormStatus = "idle" | "submitting" | "success" | "error";

interface UseContactFormOptions {
  source?: string;
  industry?: string;
  productInterest?: string;
}

/**
 * Shared submit handler for all PFP contact forms.
 * Pulls field values from the form element by their `name` attribute.
 * Posts to /api/contact and tracks submission state.
 */
export function useContactForm({ source, industry, productInterest }: UseContactFormOptions = {}) {
  const [status, setStatus] = useState<ContactFormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting" || status === "success") return;
    setStatus("submitting");
    setErrorMessage(null);

    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      name: String(fd.get("name") || "").trim(),
      company: String(fd.get("company") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      office: String(fd.get("office") || "").trim(),
      message: String(fd.get("message") || "").trim(),
      industry: industry || String(fd.get("industry") || "").trim(),
      productInterest: productInterest || String(fd.get("productInterest") || "").trim(),
      website: String(fd.get("website") || ""), // honeypot
      source: source || (typeof window !== "undefined" ? window.location.pathname : undefined),
    };

    try {
      const resp = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await resp.json().catch(() => ({}));
      if (!resp.ok || !data.ok) {
        setStatus("error");
        setErrorMessage(data?.error || "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  }

  return { status, errorMessage, handleSubmit };
}
