"use client";

import { useState } from "react";

function isValidEmail(email: string) {
  // pragmatic validator (not perfect RFC, but solid for forms)
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email.trim());
}

export function QuoteForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | "success" | "error">(null);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const [emailError, setEmailError] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    setErrorMsg("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      mobile: String(formData.get("mobile") || "").trim(),
      eventDate: String(formData.get("eventDate") || "").trim(),
      suburb: String(formData.get("suburb") || "").trim(),
      eventType: String(formData.get("eventType") || "").trim(),
      message: String(formData.get("message") || "").trim(),
    };

    // Front-end email validation
    if (!isValidEmail(payload.email)) {
      setEmailError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let data: any = {};
      try {
        data = await res.json();
      } catch {
        // ignore JSON parse error
      }

      if (!res.ok || data?.ok !== true) {
        throw new Error(data?.error || "Failed to send.");
      }

      // Success
      setStatus("success");
      setEmailError("");
      setErrorMsg("");
      form.reset();
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  const inputBase =
    "rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm " +
    "text-slate-900 caret-slate-900 " +
    "placeholder-slate-500 placeholder-opacity-100 " +
    "focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange";

  return (
    <div className="rounded-3xl bg-white p-6 ring-1 ring-slate-200">
      <form onSubmit={onSubmit} className="grid gap-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            name="name"
            className={inputBase}
            placeholder="Name"
            required
          />

          <input
            name="email"
            type="email"
            required
            className={
              inputBase +
              (emailError ? " border-red-400 focus:border-red-400 focus:ring-red-200/60" : "")
            }
            placeholder="Email"
            onChange={(e) => {
              const v = e.target.value;
              if (!v) return setEmailError("");
              setEmailError(isValidEmail(v) ? "" : "Please enter a valid email address.");
            }}
          />
        </div>

        {emailError && (
          <div className="text-sm font-semibold text-red-600">{emailError}</div>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="relative">
            <label
              htmlFor="eventDate"
              className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-600"
            >
              Event date
            </label>

            <input
              id="eventDate"
              type="date"
              name="eventDate"
              className={inputBase}
            />
          </div>
          <input
            name="suburb"
            className={inputBase}
            placeholder="Suburb / Postcode"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-900">I need:</label>

          <div className="space-y-2">
            <label className="flex cursor-pointer items-center gap-2 text-gray-900">
              <input
                type="radio"
                name="eventType"
                value="Delivered ready-made balloons"
                defaultChecked
                className="accent-orange-500"
              />
              <span className="text-gray-900">Delivered ready-made balloons</span>
            </label>

            <label className="flex cursor-pointer items-center gap-2 text-gray-900">
              <input
                type="radio"
                name="eventType"
                value="Live balloon twisting "
                className="accent-orange-500"
              />
              <span className="text-gray-900">Live balloon twisting for (party / event)</span>
            </label>
          </div>
        </div>

        <input
          type="tel"
          name="mobile"
          className={inputBase}
          placeholder="Mobile number (e.g. 0412 345 678)"
          inputMode="tel"
          pattern="^0[0-9]{9}$"
        />
        <textarea
          name="message"
          className={"min-h-[110px] " + inputBase}
          placeholder="Theme/colours, balloon count, venue notes, etc."
        />

        <button
          type="submit"
          disabled={loading || !!emailError}
          className="mt-2 rounded-2xl bg-yellow-400 px-6 py-3 text-sm font-extrabold text-slate-900 shadow-lg transition hover:bg-yellow-300 disabled:opacity-60"
        >
          {loading ? "Sending..." : "Get a quote"}
        </button>

        {status === "success" && (
          <div className="text-sm font-semibold text-emerald-700">
            Sent! We’ll get back to you soon.
          </div>
        )}

        {status === "error" && (
          <div className="text-sm font-semibold text-red-600">
            {errorMsg}
          </div>
        )}
      </form>
    </div>
  );
}
