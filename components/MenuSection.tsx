"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { Plus } from "lucide-react";
import {
  CATEGORIES,
  CATEGORY_LABEL,
  MENU,
  type MenuCategory,
} from "@/data/menu";
import { formatIDR } from "@/lib/format";
import { useCart } from "./CartProvider";

type Filter = MenuCategory | "semua";

export function MenuSection() {
  const [active, setActive] = useState<Filter>("semua");
  const { addItem } = useCart();

  const items =
    active === "semua" ? MENU : MENU.filter((item) => item.category === active);

  return (
    <section className="section section--soft menu" id="menu">
      <div className="container">
        <div className="menu__head">
          <div>
            <p className="eyebrow" data-reveal>
              <span className="eyebrow__dot" aria-hidden="true" />
              Menu Kami
            </p>
            <h2 className="section-title" data-reveal>
              Diseduh pelan,
              <br />
              dinikmati lama.
            </h2>
          </div>
          <div className="menu__intro" data-reveal>
            <p>
              Dari espresso klasik sampai camilan hangat—semua dibuat dengan
              bahan yang kami percaya. Pilih, tambahkan ke pesanan, lalu
              lanjutkan lewat WhatsApp.
            </p>
            <span>Harga belum termasuk pajak 10%.</span>
          </div>
        </div>

        <div
          className="filters"
          role="group"
          aria-label="Filter kategori menu"
          data-reveal
        >
          {CATEGORIES.map((category) => {
            const total =
              category.id === "semua"
                ? MENU.length
                : MENU.filter((item) => item.category === category.id).length;

            return (
              <button
                key={category.id}
                type="button"
                className={`filter${active === category.id ? " is-active" : ""}`}
                onClick={() => setActive(category.id)}
                aria-pressed={active === category.id}
              >
                {category.label}
                <span>{total}</span>
              </button>
            );
          })}
        </div>

        <div className="menu__grid">
          {items.map((item, index) => (
            <article
              className="menu-card"
              key={item.id}
              style={{ "--i": index } as CSSProperties}
            >
              <div className="menu-card__media">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(min-width: 980px) 33vw, (min-width: 600px) 45vw, 90vw"
                  className="menu-card__img cover"
                />
                {item.badge && (
                  <span className="menu-card__badge">{item.badge}</span>
                )}
              </div>

              <div className="menu-card__body">
                <span className="menu-card__cat">
                  {CATEGORY_LABEL[item.category]}
                </span>
                <div className="menu-card__top">
                  <h3>{item.name}</h3>
                  <span className="menu-card__price">
                    {formatIDR(item.price)}
                  </span>
                </div>
                <p className="menu-card__desc">{item.description}</p>

                <button
                  type="button"
                  className="menu-card__add"
                  onClick={() =>
                    addItem({
                      id: item.id,
                      name: item.name,
                      price: item.price,
                      image: item.image,
                    })
                  }
                  aria-label={`Tambah ${item.name} ke pesanan`}
                >
                  <Plus size={15} strokeWidth={2.6} aria-hidden="true" />
                  Tambah
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
