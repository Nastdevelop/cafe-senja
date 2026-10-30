"use client";

import { useEffect, useState } from "react";
import {
  Coffee,
  MapPin,
  Menu as MenuIcon,
  Moon,
  Phone,
  ShoppingBag,
  Sun,
  X,
} from "lucide-react";
import { site } from "@/lib/site";
import { useCart } from "./CartProvider";

const NAV = [
  { id: "home", label: "Beranda" },
  { id: "tentang", label: "Tentang" },
  { id: "menu", label: "Menu" },
  { id: "promo", label: "Promo" },
  { id: "lokasi", label: "Lokasi" },
  { id: "kontak", label: "Kontak" },
];

export function SiteHeader() {
  const { count, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const current =
      document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    setTheme(current);
  }, []);

  useEffect(() => {
    const sections = NAV.map((item) => document.getElementById(item.id)).filter(
      (section): section is HTMLElement => Boolean(section),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-38% 0px -55% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("no-scroll--nav", navOpen);
    if (!navOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setNavOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("no-scroll--nav");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [navOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 980) setNavOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("kopi-senja-theme", next);
    } catch {
      /* ignore */
    }
  };

  const handleCart = () => {
    setNavOpen(false);
    openCart();
  };

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="container header__inner">
        <a className="brand" href="#home">
          <span className="brand__mark" aria-hidden="true">
            <Coffee size={20} strokeWidth={2} />
          </span>
          <span className="brand__text">
            <strong>Kopi Senja</strong>
            <small>Coffee &amp; Eatery</small>
          </span>
        </a>

        <nav
          id="primary-nav"
          className={`nav${navOpen ? " is-open" : ""}`}
          aria-label="Navigasi utama"
        >
          <ul className="nav__list">
            {NAV.map((item) => (
              <li key={item.id}>
                <a
                  className={`nav__link${active === item.id ? " is-active" : ""}`}
                  href={`#${item.id}`}
                  aria-current={active === item.id ? "true" : undefined}
                  onClick={() => setNavOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="nav__meta">
            <p>
              <MapPin size={16} aria-hidden="true" />
              {site.address}
            </p>
            <p>
              <Phone size={16} aria-hidden="true" />
              <a href={`tel:+${site.phone}`}>{site.phoneDisplay}</a>
            </p>
            <a
              className="btn btn--primary btn--sm"
              href={`https://wa.me/${site.phone}?text=${encodeURIComponent(
                "Halo Kopi Senja, saya ingin reservasi meja.",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setNavOpen(false)}
            >
              Reservasi via WhatsApp
            </a>
          </div>
        </nav>

        <div className="header__actions">
          <button
            type="button"
            className="icon-btn"
            onClick={toggleTheme}
            aria-label={
              theme === "dark"
                ? "Aktifkan tema terang"
                : "Aktifkan tema gelap"
            }
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            id="cart-trigger"
            type="button"
            className="btn btn--primary btn--sm cart-trigger"
            onClick={handleCart}
            aria-label={`Buka pesanan, ${count} item di keranjang`}
            aria-haspopup="dialog"
          >
            <ShoppingBag size={17} aria-hidden="true" />
            <span className="cart-trigger__label">Pesanan</span>
            {count > 0 && (
              <span className="cart-count" key={count}>
                {count}
              </span>
            )}
          </button>

          <button
            type="button"
            className="icon-btn nav-toggle"
            onClick={() => setNavOpen((open) => !open)}
            aria-expanded={navOpen}
            aria-controls="primary-nav"
            aria-label={navOpen ? "Tutup menu" : "Buka menu"}
          >
            {navOpen ? <X size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
