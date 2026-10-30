import Image from "next/image";
import {
  ArrowRight,
  Clock,
  Coffee,
  MapPin,
  Sparkles,
  Star,
} from "lucide-react";

const AVATARS = [
  "1494790108377-be9c29b29330",
  "1500648767791-00dcc994a43e",
  "1534528741775-53994a69daeb",
];

export function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero__glow" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="eyebrow" data-reveal>
            <span className="eyebrow__dot" aria-hidden="true" />
            Coffee &amp; Eatery · Yogyakarta
          </p>

          <h1 className="hero__title" data-reveal>
            Secangkir kopi,
            <br />
            sejuta <em>cerita</em>.
          </h1>

          <p className="hero__text" data-reveal>
            Kopi single origin yang diseduh dengan sabar, ruang hangat untuk
            bertemu, dan camilan yang bikin ingin kembali. Selamat datang di
            rumah kedua.
          </p>

          <div className="hero__cta" data-reveal>
            <a className="btn btn--primary" href="#menu">
              Jelajahi Menu
              <ArrowRight size={17} aria-hidden="true" />
            </a>
            <a
              className="btn btn--ghost"
              href="#lokasi"
            >
              <MapPin size={16} aria-hidden="true" />
              Kunjungi Kami
            </a>
          </div>

          <div className="hero__proof" data-reveal>
            <div className="avatars" aria-hidden="true">
              {AVATARS.map((id) => (
                <span className="avatars__item" key={id}>
                  <Image
                    src={`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=80&h=80&q=70`}
                    alt=""
                    width={40}
                    height={40}
                  />
                </span>
              ))}
            </div>
            <div>
              <div className="stars" aria-label="Rating 4,9 dari 5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    size={13}
                    fill="currentColor"
                    strokeWidth={0}
                    aria-hidden="true"
                  />
                ))}
                <strong>4.9</strong>
              </div>
              <p>Dari 1.200+ ulasan pengunjung</p>
            </div>
          </div>
        </div>

        <div className="hero__visual" data-reveal>
          <div className="hero__photo">
            <Image
              src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1100&q=85"
              alt="Barista menuangkan latte art ke dalam cangkir kopi"
              fill
              priority
              sizes="(min-width: 980px) 480px, 92vw"
              className="cover"
            />
            <div className="hero__shade" aria-hidden="true" />

            <div className="hero__float hero__float--bean">
              <span className="hero__float-icon" aria-hidden="true">
                <Coffee size={18} />
              </span>
              <div>
                <strong>Single origin</strong>
                <span>Gayo · Toraja · Kintamani</span>
              </div>
            </div>

            <div className="hero__float hero__float--rating">
              <span className="hero__float-icon" aria-hidden="true">
                <Clock size={18} />
              </span>
              <div>
                <strong>Buka setiap hari</strong>
                <span>07.00 – 22.00 WIB</span>
              </div>
            </div>
          </div>

          <div className="hero__seal" aria-hidden="true">
            <svg viewBox="0 0 120 120">
              <defs>
                <path
                  id="seal-circle"
                  d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0"
                />
              </defs>
              <text>
                <textPath href="#seal-circle" startOffset="0%">
                  FRESHLY ROASTED · SINCE 2019 · KOPI SENJA ·
                </textPath>
              </text>
            </svg>
            <span>
              <Sparkles size={20} />
            </span>
          </div>
        </div>
      </div>

      <div className="container">
        <ul className="hero__stats" data-reveal>
          <li>
            <strong>12+</strong>
            <span>Single origin pilihan</span>
          </li>
          <li>
            <strong>4.9/5</strong>
            <span>Rating di Google</span>
          </li>
          <li>
            <strong>7 th</strong>
            <span>Menemani cerita kota</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
