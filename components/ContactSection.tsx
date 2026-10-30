"use client";

import { useState, type FormEvent } from "react";
import {
  ArrowUpRight,
  Check,
  Mail,
  MessageCircle,
  Send,
} from "lucide-react";
import { InstagramIcon } from "./icons";
import { site, waLink } from "@/lib/site";

type Errors = {
  name?: string;
  email?: string;
  message?: string;
};

const TOPICS = [
  "Reservasi meja",
  "Pesanan dalam jumlah besar",
  "Kolaborasi & acara",
  "Pertanyaan lain",
];

export function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: TOPICS[0],
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const update = (key: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: Errors = {};
    if (form.name.trim().length < 2) {
      nextErrors.name = "Tolong isi nama kamu.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = "Alamat email belum valid.";
    }
    if (form.message.trim().length < 10) {
      nextErrors.message = "Ceritakan sedikit lebih detail (min. 10 karakter).";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      const first = Object.keys(nextErrors)[0];
      document.getElementById(first)?.focus();
      return;
    }

    setErrors({});
    setStatus("sending");

    const text = [
      "Halo Kopi Senja!",
      `Nama: ${form.name.trim()}`,
      `Email: ${form.email.trim()}`,
      `Topik: ${form.topic}`,
      "",
      form.message.trim(),
    ].join("\n");

    window.open(waLink(text), "_blank", "noopener,noreferrer");
    setStatus("success");
  };

  const reset = () => {
    setForm({ name: "", email: "", topic: TOPICS[0], message: "" });
    setStatus("idle");
    setErrors({});
  };

  return (
    <section className="contact" id="kontak">
      <div className="container contact__inner">
        <div className="contact__copy">
          <p className="eyebrow" data-reveal>
            <span className="eyebrow__dot" aria-hidden="true" />
            Hubungi Kami
          </p>
          <h2 className="contact__title" data-reveal>
            Ada pertanyaan?
            <br />
            <em>Ngobrol</em> saja.
          </h2>
          <p className="contact__text" data-reveal>
            Mau reservasi meja untuk acara kecil, pesan dalam jumlah banyak,
            atau sekadar tanya menu hari ini? Kami senang mendengarnya. Balasan
            paling lambat 1×24 jam.
          </p>

          <ul className="contact__links" data-reveal>
            <li>
              <a
                href={waLink("Halo Kopi Senja, saya ingin bertanya.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="contact__icon" aria-hidden="true">
                  <MessageCircle size={18} />
                </span>
                <span className="contact__link-text">
                  <small>WhatsApp</small>
                  <strong>{site.phoneDisplay}</strong>
                </span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`}>
                <span className="contact__icon" aria-hidden="true">
                  <Mail size={18} />
                </span>
                <span className="contact__link-text">
                  <small>Email</small>
                  <strong>{site.email}</strong>
                </span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </li>
            <li>
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="contact__icon" aria-hidden="true">
                  <InstagramIcon size={18} />
                </span>
                <span className="contact__link-text">
                  <small>Instagram</small>
                  <strong>{site.instagram}</strong>
                </span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>

        <div className="contact__form-wrap" data-reveal>
          {status === "success" ? (
            <div className="contact__success" role="status">
              <span className="contact__success-icon" aria-hidden="true">
                <Check size={26} strokeWidth={2.5} />
              </span>
              <h3>Terima kasih, {form.name.trim().split(" ")[0]}!</h3>
              <p>
                Pesanmu sudah disiapkan di WhatsApp. Kalau tab baru tidak
                terbuka, cek pengaturan popup browser kamu.
              </p>
              <button type="button" className="btn btn--ghost btn--sm" onClick={reset}>
                Kirim pesan lain
              </button>
            </div>
          ) : (
            <form className="contact__form" onSubmit={handleSubmit} noValidate>
              <div className="contact__form-head">
                <h3>Kirim pesan</h3>
                <span>Kami baca satu per satu.</span>
              </div>

              <div className="form-row">
                <div className="field">
                  <label htmlFor="name">Nama</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Nama kamu"
                    autoComplete="name"
                    value={form.name}
                    onChange={(event) => update("name", event.target.value)}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <p className="field__error" id="name-error">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="nama@email.com"
                    autoComplete="email"
                    value={form.email}
                    onChange={(event) => update("email", event.target.value)}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <p className="field__error" id="email-error">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="field">
                <label htmlFor="topic">Topik</label>
                <select
                  id="topic"
                  name="topic"
                  value={form.topic}
                  onChange={(event) => update("topic", event.target.value)}
                >
                  {TOPICS.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label htmlFor="message">Pesan</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Tulis kebutuhanmu di sini…"
                  value={form.message}
                  onChange={(event) => update("message", event.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                />
                {errors.message && (
                  <p className="field__error" id="message-error">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="btn btn--primary btn--block"
                disabled={status === "sending"}
              >
                <Send size={16} aria-hidden="true" />
                {status === "sending" ? "Menyiapkan…" : "Kirim pesan"}
              </button>
              <p className="contact__form-note">
                Pesan akan dibuka di WhatsApp. Tidak ada data yang disimpan di
                situs ini.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
