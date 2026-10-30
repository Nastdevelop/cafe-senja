import {
  Coffee,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { InstagramIcon } from "./icons";
import { site, waLink } from "@/lib/site";

const LINKS = [
  { href: "#tentang", label: "Tentang" },
  { href: "#menu", label: "Menu" },
  { href: "#promo", label: "Promo" },
  { href: "#lokasi", label: "Lokasi" },
  { href: "#kontak", label: "Kontak" },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <a className="brand" href="#home">
            <span className="brand__mark" aria-hidden="true">
              <Coffee size={20} strokeWidth={2} />
            </span>
            <span className="brand__text">
              <strong>Kopi Senja</strong>
              <small>Coffee &amp; Eatery</small>
            </span>
          </a>
          <p>
            Kopi yang diseduh dengan sabar, ruang untuk cerita yang tidak ingin
            cepat selesai.
          </p>
          <div className="footer__socials">
            <a
              href={waLink("Halo Kopi Senja!")}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Kopi Senja"
            >
              <MessageCircle size={17} />
            </a>
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Kopi Senja"
            >
              <InstagramIcon size={17} />
            </a>
            <a href={`mailto:${site.email}`} aria-label="Email Kopi Senja">
              <Mail size={17} />
            </a>
          </div>
        </div>

        <nav className="footer__nav" aria-label="Navigasi footer">
          <h3>Jelajahi</h3>
          <ul>
            {LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__visit">
          <h3>Kunjungi</h3>
          <p>
            <MapPin size={16} aria-hidden="true" />
            {site.address}
          </p>
          <p>
            <Coffee size={16} aria-hidden="true" />
            Senin–Kamis 07.00–22.00
            <br />
            Jumat–Sabtu 07.00–23.00
            <br />
            Minggu 08.00–22.00
          </p>
          <a
            className="footer__wa"
            href={waLink("Halo Kopi Senja, saya ingin reservasi.")}
            target="_blank"
            rel="noopener noreferrer"
          >
            Reservasi meja
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>
          © {new Date().getFullYear()} Kopi Senja. Dibuat dengan kopi &amp;
          React.
        </p>
        <p>Yogyakarta, Indonesia</p>
      </div>
    </footer>
  );
}
