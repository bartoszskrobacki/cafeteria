"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

type Status = "idle" | "sending" | "success" | "error";

export const ContactForm = () => {
  const t = useTranslations("contact.form");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "", website: "" });

  const update =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot — boty wypełnią ukryte pole; ludzie nie.
    if (form.website) return;

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("error");
      setErrorMsg(t("validationRequired"));
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setStatus("error");
      setErrorMsg(t("validationEmail"));
      return;
    }
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus("error");
      setErrorMsg(t("error"));
      return;
    }

    setStatus("sending");
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        { from_name: form.name, reply_to: form.email, message: form.message },
        { publicKey: PUBLIC_KEY }
      );
      setStatus("success");
      setForm({ name: "", email: "", message: "", website: "" });
    } catch {
      setStatus("error");
      setErrorMsg(t("error"));
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
      <div>
        <Label htmlFor="name" className="text-light-gray mb-2">
          {t("name")}
        </Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder={t("namePlaceholder")}
          className="w-full"
          value={form.name}
          onChange={update("name")}
          required
        />
      </div>

      <div>
        <Label htmlFor="email" className="text-light-gray mb-2">
          {t("email")}
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder={t("emailPlaceholder")}
          className="w-full"
          value={form.email}
          onChange={update("email")}
          required
        />
      </div>

      <div>
        <Label htmlFor="message" className="text-light-gray mb-2">
          {t("message")}
        </Label>
        <Textarea
          id="message"
          name="message"
          placeholder={t("messagePlaceholder")}
          rows={6}
          className="w-full"
          value={form.message}
          onChange={update("message")}
          required
        />
      </div>

      {/* Honeypot — ukryte przed użytkownikami, pułapka na boty. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={update("website")}
        />
      </div>

      <Button
        type="submit"
        disabled={status === "sending"}
        className="bg-primary hover:bg-primary/90 text-white px-8 py-6 uppercase tracking-wider disabled:opacity-60"
      >
        {status === "sending" ? t("sending") : t("submit")}
      </Button>

      <div aria-live="polite" className="min-h-6">
        {status === "success" && <p className="text-green-600 text-sm">{t("success")}</p>}
        {status === "error" && <p className="text-red-600 text-sm">{errorMsg}</p>}
      </div>
    </form>
  );
};
