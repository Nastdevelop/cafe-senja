export const site = {
  name: "Kopi Senja",
  tagline: "Coffee & Eatery",
  city: "Yogyakarta",
  phone: "6281234567890",
  phoneDisplay: "+62 812-3456-7890",
  email: "hello@kopisenja.id",
  instagram: "@kopisenja.id",
  instagramUrl: "https://instagram.com/kopisenja.id",
  address: "Jl. Prawirotaman No. 24, Mergangsan, Yogyakarta 55153",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=-7.7965%2C110.375",
  mapEmbed:
    "https://www.openstreetmap.org/export/embed.html?bbox=110.3650%2C-7.8040%2C110.3850%2C-7.7890&layer=mapnik&marker=-7.7965%2C110.3750",
  hours: [
    { label: "Senin – Kamis", open: "07.00 – 22.00", start: 7, end: 22, days: [1, 2, 3, 4] },
    { label: "Jumat – Sabtu", open: "07.00 – 23.00", start: 7, end: 23, days: [5, 6] },
    { label: "Minggu", open: "08.00 – 22.00", start: 8, end: 22, days: [0] },
  ],
};

export const waLink = (message: string) =>
  `https://wa.me/${site.phone}?text=${encodeURIComponent(message)}`;
