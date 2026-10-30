import Image from "next/image";
import { Check, Coffee } from "lucide-react";

const VALUES = [
  "Biji lokal dari petani Gayo, Toraja, dan Kintamani",
  "Barista yang hafal pesanan langgananmu",
  "Ruang tenang untuk kerja, bincang, dan bertemu",
];

export function About() {
  return (
    <section className="section about" id="tentang">
      <div className="container about__inner">
        <div className="about__media" data-reveal>
          <div className="about__media-main">
            <Image
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=85"
              alt="Interior Kopi Senja dengan meja kayu dan lampu hangat"
              fill
              sizes="(min-width: 980px) 480px, 90vw"
              className="cover"
            />
          </div>
          <div className="about__media-sub">
            <Image
              src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=600&q=80"
              alt="Secangkir kopi di atas meja kayu"
              fill
              sizes="(min-width: 980px) 220px, 42vw"
              className="cover"
            />
          </div>
          <div className="about__badge">
            <Coffee size={16} aria-hidden="true" />
            Sejak 2019
          </div>
        </div>

        <div className="about__copy">
          <p className="eyebrow" data-reveal>
            <span className="eyebrow__dot" aria-hidden="true" />
            Tentang Kami
          </p>
          <h2 className="section-title" data-reveal>
            Bukan sekadar
            <br />
            tempat ngopi.
          </h2>
          <p className="about__lead" data-reveal>
            Kopi Senja lahir dari kebiasaan kecil: duduk berdua sambil menunggu
            matahari turun. Kami ingin setiap orang punya sudut favorit di sini —
            untuk membaca, menulis, atau sekadar diam sejenak.
          </p>
          <p className="about__text" data-reveal>
            Semua kopi disangrai dalam batch kecil, dua kali seminggu, supaya
            rasanya tetap segar. Dapur kami juga membuat pastry sendiri setiap
            pagi. Tidak ada yang instan, karena cerita yang baik butuh waktu.
          </p>

          <ul className="about__list" data-reveal>
            {VALUES.map((value) => (
              <li key={value}>
                <span aria-hidden="true">
                  <Check size={14} strokeWidth={3} />
                </span>
                {value}
              </li>
            ))}
          </ul>

          <p className="about__sign" data-reveal>
            Rani &amp; Bagas <span>Pendiri Kopi Senja</span>
          </p>
        </div>
      </div>
    </section>
  );
}
