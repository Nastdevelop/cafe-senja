"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Check, Copy, Flame, Sparkles, Timer } from "lucide-react";
import { PROMOS } from "@/data/promos";
import { formatIDR } from "@/lib/format";
import { useCart } from "./CartProvider";

type Remaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const ZERO: Remaining = { days: 0, hours: 0, minutes: 0, seconds: 0 };

function getRemaining(): Remaining {
  const now = new Date();
  const end = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
    23,
    59,
    59,
    999,
  );
  const diff = Math.max(0, end.getTime() - now.getTime());

  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function CopyCode({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const { notify } = useCart();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const area = document.createElement("textarea");
      area.value = code;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      document.body.removeChild(area);
    }

    setCopied(true);
    notify(`Kode ${code} disalin`);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2200);
  };

  return (
    <button
      type="button"
      className={`code${copied ? " is-copied" : ""}`}
      onClick={handleCopy}
    >
      <span className="code__value">{code}</span>
      <span className="code__icon" aria-hidden="true">
        {copied ? <Check size={14} strokeWidth={3} /> : <Copy size={14} />}
      </span>
      <span className="code__hint">{copied ? "Tersalin" : "Salin kode"}</span>
    </button>
  );
}

export function PromoSection() {
  const [remaining, setRemaining] = useState<Remaining>(ZERO);

  useEffect(() => {
    const tick = () => setRemaining(getRemaining());
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const cells = [
    { label: "Hari", value: remaining.days },
    { label: "Jam", value: remaining.hours },
    { label: "Menit", value: remaining.minutes },
    { label: "Detik", value: remaining.seconds },
  ];

  return (
    <section className="section promo" id="promo">
      <div className="container">
        <div className="promo__head">
          <div>
            <p className="eyebrow" data-reveal>
              <span className="eyebrow__dot" aria-hidden="true" />
              Promo &amp; Penawaran
            </p>
            <h2 className="section-title" data-reveal>
              Alasan kecil untuk
              <br />
              datang lagi.
            </h2>
          </div>
          <p className="promo__intro" data-reveal>
            <Sparkles size={18} aria-hidden="true" />
            Semua promo bisa dipakai langsung di kasir. Cukup sebutkan kodenya
            saat memesan.
          </p>
        </div>

        <div className="promo__grid">
          <article className="promo-card promo-card--featured" data-reveal>
            <Image
              src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1400&q=85"
              alt="Dua cangkir kopi dan croissant di meja kayu"
              fill
              sizes="(min-width: 900px) 60vw, 92vw"
              className="cover"
            />
            <div className="promo-card__shade" aria-hidden="true" />
            <div className="promo-card__content">
              <span className="promo-tag">
                <Flame size={13} aria-hidden="true" />
                Promo bulan ini
              </span>
              <h3>
                Ngopi Senja
                <br />
                Berdua
              </h3>
              <p>
                Dua Es Kopi Susu Senja + satu Butter Croissant. Cocok untuk
                menemani obrolan sore yang tidak ingin cepat selesai.
              </p>
              <div className="promo-price">
                <strong>{formatIDR(55000)}</strong>
                <s>{formatIDR(68000)}</s>
              </div>

              <div className="countdown" aria-label="Sisa waktu promo">
                <span className="countdown__label">
                  <Timer size={14} aria-hidden="true" />
                  Berakhir dalam
                </span>
                <div className="countdown__cells">
                  {cells.map((cell) => (
                    <div className="countdown__cell" key={cell.label}>
                      <strong>
                        {String(cell.value).padStart(2, "0")}
                      </strong>
                      <span>{cell.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="promo-card__foot">
                <CopyCode code="SENJA55" />
                <span>Berlaku sampai akhir bulan</span>
              </div>
            </div>
          </article>

          {PROMOS.map((promo) => (
            <article
              className="promo-card promo-card--small"
              key={promo.id}
              data-reveal
            >
              <div className="promo-card__thumb">
                <Image
                  src={promo.image}
                  alt={promo.title}
                  fill
                  sizes="(min-width: 900px) 220px, 40vw"
                  className="cover"
                />
              </div>
              <div className="promo-card__body">
                <span className="promo-tag promo-tag--light">
                  <Sparkles size={12} aria-hidden="true" />
                  {promo.note}
                </span>
                <h3>{promo.title}</h3>
                <p>{promo.description}</p>
                <CopyCode code={promo.code} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
