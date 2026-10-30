export type Promo = {
  id: string;
  title: string;
  description: string;
  code: string;
  price?: number;
  normalPrice?: number;
  note: string;
  image: string;
};

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const PROMOS: Promo[] = [
  {
    id: "pastry-hour",
    title: "Pastry Happy Hour",
    description: "Diskon 30% untuk semua pastry, setiap hari pukul 15.00–18.00.",
    code: "PASTRY30",
    note: "Berlaku untuk dine-in",
    image: img("1555507036-ab1f4038808a"),
  },
  {
    id: "beans-to-go",
    title: "Beans to Go",
    description: "Beli 250g biji pilihan, gratis satu manual brew favoritmu.",
    code: "BEANS250",
    note: "Selama stok tersedia",
    image: img("1447933601403-0c6688de566e"),
  },
];
