# Kopi Senja — Coffee & Eatery

Website landing page untuk coffee shop, dibangun dengan **Next.js 16 (App Router)**, TypeScript, dan CSS custom (tanpa framework UI). Mobile-first, responsif, dengan mode terang/gelap.

## Menjalankan

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # jalankan hasil build
```

## Fitur

- **Hero** dengan foto, rating, jam buka, statistik, dan badge berputar.
- **Tentang** dengan kolase foto dan nilai-nilai café.
- **Menu** 12 item dengan filter kategori (Kopi, Non-Kopi, Makanan, Dessert), harga, badge, dan tombol tambah ke pesanan.
- **Promo** dengan hitung mundur otomatis ke akhir bulan dan tombol salin kode promo.
- **Lokasi** dengan peta OpenStreetMap, jam buka yang menyorot hari ini, dan status buka/tutup otomatis.
- **Kontak** dengan validasi form; pesan diteruskan ke WhatsApp (tanpa backend).
- **Keranjang** interaktif: ubah jumlah, hapus item, subtotal, checkout WhatsApp, tersimpan di `localStorage`.
- Mode gelap/terang (mengikuti preferensi sistem, bisa diubah manual).
- Navigasi mobile full-screen, scroll spy, reveal on scroll, back-to-top, toast.
- Menghormati `prefers-reduced-motion` dan dilengkapi skip link serta label aksesibilitas.

## Struktur

```text
app/
  layout.tsx        # metadata, font, theme script, CartProvider
  page.tsx          # komposisi halaman
  globals.css       # design system & seluruh styling
components/
  SiteHeader.tsx    # navigasi, tema, tombol keranjang
  Hero.tsx
  Marquee.tsx
  About.tsx
  MenuSection.tsx   # filter menu + add to cart
  PromoSection.tsx  # countdown + copy kode
  LocationSection.tsx
  ContactSection.tsx
  Footer.tsx
  CartDrawer.tsx
  CartProvider.tsx  # state keranjang + toast
  ScrollReveal.tsx
  BackToTop.tsx
data/
  menu.ts           # daftar menu & kategori
  promos.ts         # promo
lib/
  site.ts           # nama, telepon, alamat, jam buka, peta
  format.ts         # format Rupiah
```

## Kustomisasi cepat

- **Identitas, alamat, telepon, jam buka, link peta** → `lib/site.ts`.
- **Menu, harga, kategori, foto** → `data/menu.ts`.
- **Promo & kode** → `data/promos.ts`.
- **Warna, radius, font, spacing** → variabel CSS di bagian atas `app/globals.css`.
- **Foto** memakai Unsplash. Ganti URL di data/komponen; jika memakai domain baru, tambahkan di `next.config.ts` (`images.remotePatterns`).

## Catatan

- Nomor WhatsApp, email, dan alamat di proyek ini adalah placeholder. Ganti sebelum dipublikasikan.
- Form kontak tidak menyimpan data; submit akan membuka WhatsApp dengan pesan yang sudah terisi.
- Gambar diambil dari Unsplash dan memerlukan koneksi internet saat runtime.
- Hitung mundur promo berakhir pada tanggal terakhir bulan berjalan (23.59 waktu lokal pengunjung).
