"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import {
  ArrowUpRight,
  Coffee,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import { formatIDR } from "@/lib/format";
import { waLink } from "@/lib/site";
import { useCart } from "./CartProvider";

export function CartDrawer() {
  const {
    items,
    count,
    subtotal,
    isOpen,
    closeCart,
    increase,
    decrease,
    removeItem,
  } = useCart();
  const closeRef = useRef<HTMLButtonElement>(null);
  const hasOpened = useRef(false);

  useEffect(() => {
    if (isOpen) {
      hasOpened.current = true;
      const timer = setTimeout(() => closeRef.current?.focus(), 380);
      return () => clearTimeout(timer);
    }

    if (hasOpened.current) {
      document.getElementById("cart-trigger")?.focus();
    }
  }, [isOpen]);

  const message = [
    "Halo Kopi Senja! Saya mau pesan:",
    ...items.map(
      (line, index) =>
        `${index + 1}. ${line.name} x${line.qty} — ${formatIDR(
          line.price * line.qty,
        )}`,
    ),
    "",
    `Subtotal: ${formatIDR(subtotal)}`,
    "Mohon info ketersediaan dan estimasi waktunya. Terima kasih!",
  ].join("\n");

  return (
    <>
      <div
        className={`cart-overlay${isOpen ? " is-open" : ""}`}
        onClick={closeCart}
        aria-hidden="true"
      />

      <aside
        className={`cart${isOpen ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        aria-hidden={!isOpen}
      >
        <header className="cart__header">
          <div>
            <span className="eyebrow eyebrow--plain">Pesananmu</span>
            <h2 id="cart-title">
              Keranjang{" "}
              {count > 0 && <span className="cart__badge">{count} item</span>}
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="icon-btn"
            onClick={closeCart}
            aria-label="Tutup keranjang"
          >
            <X size={19} />
          </button>
        </header>

        <div className="cart__body">
          {items.length === 0 ? (
            <div className="cart__empty">
              <span className="cart__empty-icon" aria-hidden="true">
                <Coffee size={28} />
              </span>
              <h3>Keranjangmu masih kosong</h3>
              <p>
                Pilih kopi atau camilan favoritmu, lalu lanjutkan pesanan lewat
                WhatsApp.
              </p>
              <a className="btn btn--soft btn--sm" href="#menu" onClick={closeCart}>
                <ShoppingBag size={16} aria-hidden="true" />
                Lihat menu
              </a>
            </div>
          ) : (
            <ul className="cart__list">
              {items.map((line) => (
                <li className="cart-item" key={line.id}>
                  <div className="cart-item__thumb">
                    <Image
                      src={line.image}
                      alt={line.name}
                      fill
                      sizes="72px"
                      className="cover"
                    />
                  </div>
                  <div className="cart-item__info">
                    <div className="cart-item__top">
                      <h3>{line.name}</h3>
                      <button
                        type="button"
                        className="cart-item__remove"
                        onClick={() => removeItem(line.id)}
                        aria-label={`Hapus ${line.name} dari keranjang`}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                    <p className="cart-item__price">
                      {formatIDR(line.price * line.qty)}
                    </p>
                    <div className="qty">
                      <button
                        type="button"
                        onClick={() => decrease(line.id)}
                        aria-label={`Kurangi ${line.name}`}
                      >
                        <Minus size={13} strokeWidth={2.5} />
                      </button>
                      <span aria-label={`Jumlah ${line.name}`}>{line.qty}</span>
                      <button
                        type="button"
                        onClick={() => increase(line.id)}
                        aria-label={`Tambah ${line.name}`}
                      >
                        <Plus size={13} strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <footer className="cart__footer">
          <div className="cart__row">
            <span>Subtotal</span>
            <strong>{formatIDR(subtotal)}</strong>
          </div>
          <p className="cart__note">
            Belum termasuk pajak 10%. Pembayaran dikonfirmasi lewat WhatsApp.
          </p>
          <a
            className={`btn btn--primary btn--block${
              items.length === 0 ? " is-disabled" : ""
            }`}
            href={
              items.length === 0
                ? undefined
                : waLink(message)
            }
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={items.length === 0}
            tabIndex={items.length === 0 ? -1 : 0}
          >
            Pesan via WhatsApp
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
          <button
            type="button"
            className="cart__continue"
            onClick={closeCart}
          >
            Lanjut pilih menu
          </button>
        </footer>
      </aside>
    </>
  );
}
