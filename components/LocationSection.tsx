"use client";

import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Clock,
  MapPin,
  MessageCircle,
  Navigation,
} from "lucide-react";
import { site, waLink } from "@/lib/site";

export function LocationSection() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const interval = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(interval);
  }, []);

  const today = now
    ? site.hours.find((entry) => entry.days.includes(now.getDay()))
    : undefined;
  const isOpen = now && today
    ? now.getHours() >= today.start && now.getHours() < today.end
    : null;

  return (
    <section className="section location" id="lokasi">
      <div className="container">
        <div className="location__head">
          <div>
            <p className="eyebrow" data-reveal>
              <span className="eyebrow__dot" aria-hidden="true" />
              Lokasi
            </p>
            <h2 className="section-title" data-reveal>
              Mampir, pintunya
              <br />
              selalu terbuka.
            </h2>
          </div>
          <p className="location__intro" data-reveal>
            Di jantung Prawirotaman, sepuluh menit jalan kaki dari Malioboro.
            Parkir motor tersedia, dan ada area outdoor untuk kamu yang ingin
            tetap dekat dengan angin sore.
          </p>
        </div>

        <div className="location__grid">
          <div className="location__map" data-reveal>
            <iframe
              src={site.mapEmbed}
              title="Peta lokasi Kopi Senja di Prawirotaman, Yogyakarta"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="location__map-card">
              <span className="location__map-icon" aria-hidden="true">
                <MapPin size={18} />
              </span>
              <div>
                <strong>Kopi Senja · Prawirotaman</strong>
                <span>Mergangsan, Yogyakarta</span>
              </div>
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Buka lokasi di Google Maps"
              >
                <ArrowUpRight size={17} />
              </a>
            </div>
          </div>

          <div className="location__panel" data-reveal>
            <div
              className={`open-pill${
                isOpen === true
                  ? " is-open"
                  : isOpen === false
                    ? " is-closed"
                    : ""
              }`}
            >
              <span className="open-pill__dot" aria-hidden="true" />
              <span>
                {isOpen === true
                  ? "Buka sekarang"
                  : isOpen === false
                    ? "Tutup sekarang"
                    : "Jam operasional"}
              </span>
              {today && <em>{today.open} WIB</em>}
            </div>

            <div className="location__block">
              <h3>Alamat</h3>
              <p>
                {site.address}
                <br />
                Patokan: seberang galeri batik, gedung bercat krem.
              </p>
            </div>

            <div className="location__block">
              <h3>
                <Clock size={16} aria-hidden="true" />
                Jam buka
              </h3>
              <ul className="hours">
                {site.hours.map((entry) => {
                  const isToday = now
                    ? entry.days.includes(now.getDay())
                    : false;
                  return (
                    <li
                      key={entry.label}
                      className={isToday ? "is-today" : undefined}
                    >
                      <span>
                        {entry.label}
                        {isToday && <em>Hari ini</em>}
                      </span>
                      <strong>{entry.open}</strong>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="location__actions">
              <a
                className="btn btn--primary"
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Navigation size={16} aria-hidden="true" />
                Petunjuk arah
              </a>
              <a
                className="btn btn--ghost"
                href={waLink("Halo Kopi Senja, saya ingin bertanya soal lokasi.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={16} aria-hidden="true" />
                Chat kami
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
