export type MenuCategory = "kopi" | "non-kopi" | "makanan" | "dessert";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  image: string;
  badge?: string;
};

export const CATEGORIES: { id: MenuCategory | "semua"; label: string }[] = [
  { id: "semua", label: "Semua" },
  { id: "kopi", label: "Kopi" },
  { id: "non-kopi", label: "Non-Kopi" },
  { id: "makanan", label: "Makanan" },
  { id: "dessert", label: "Dessert" },
];

export const CATEGORY_LABEL: Record<MenuCategory, string> = {
  kopi: "Kopi",
  "non-kopi": "Non-Kopi",
  makanan: "Makanan",
  dessert: "Dessert",
};

const img = (id: string, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const MENU: MenuItem[] = [
  {
    id: "es-kopi-susu-senja",
    name: "Es Kopi Susu Senja",
    description:
      "Espresso ganda, susu segar, dan gula aren cair. Manisnya pas, pahitnya bikin kangen.",
    price: 22000,
    category: "kopi",
    image: img("1517701550927-30cf4ba1dba5"),
    badge: "Best seller",
  },
  {
    id: "cappuccino",
    name: "Cappuccino",
    description:
      "Espresso seimbang dengan microfoam lembut dan taburan kayu manis di atasnya.",
    price: 26000,
    category: "kopi",
    image: img("1541167760496-1628856ab772"),
  },
  {
    id: "v60-gayo",
    name: "V60 Gayo",
    description:
      "Manual brew biji Gayo. Notes jeruk manis, cokelat hitam, dan aftertaste yang bersih.",
    price: 32000,
    category: "kopi",
    image: img("1495474472287-4d71bcdd2085"),
    badge: "Baru",
  },
  {
    id: "espresso",
    name: "Espresso",
    description:
      "Dua shot pekat dari house blend kami. Untuk kamu yang suka tanpa basa-basi.",
    price: 20000,
    category: "kopi",
    image: img("1510707577719-ae7c14805e3a"),
  },
  {
    id: "matcha-latte",
    name: "Matcha Latte",
    description:
      "Matcha grade ceremonial dari Uji, dikocok tangan, dipadu susu yang creamy.",
    price: 28000,
    category: "non-kopi",
    image: img("1515823064-d6e0c04616a7"),
  },
  {
    id: "cokelat-klasik",
    name: "Cokelat Klasik",
    description:
      "Dark chocolate 70% dilelehkan perlahan, disajikan hangat dengan marshmallow.",
    price: 27000,
    category: "non-kopi",
    image: img("1542990253-0d0f5be5f0ed"),
  },
  {
    id: "butter-croissant",
    name: "Butter Croissant",
    description:
      "Laminasi 27 lapis, dipanggang setiap pagi. Renyah di luar, lembut di dalam.",
    price: 24000,
    category: "makanan",
    image: img("1555507036-ab1f4038808a"),
    badge: "Fresh daily",
  },
  {
    id: "truffle-fries",
    name: "Truffle Fries",
    description:
      "Kentang goreng renyah dengan minyak truffle, parmesan, dan irisan daun bawang.",
    price: 32000,
    category: "makanan",
    image: img("1573080496219-bb080dd4f877"),
  },
  {
    id: "caesar-salad",
    name: "Caesar Salad",
    description:
      "Romaine segar, crouton sourdough, parmesan, dan dressing Caesar rumahan.",
    price: 42000,
    category: "makanan",
    image: img("1546069901-ba9599a7e63c"),
  },
  {
    id: "chicken-sandwich",
    name: "Chicken Sandwich",
    description:
      "Ayam panggang, tomat, selada, dan saus aioli dalam sourdough panggang.",
    price: 38000,
    category: "makanan",
    image: img("1528735602780-2552fd46c7af"),
  },
  {
    id: "basque-cheesecake",
    name: "Basque Cheesecake",
    description:
      "Cheesecake burnt ala Basque dengan karamel alami dan tekstur yang lumer.",
    price: 34000,
    category: "dessert",
    image: img("1578985545062-69928b1d9587"),
  },
  {
    id: "banana-pancake",
    name: "Banana Pancake",
    description:
      "Tumpukan pancake pisang dengan madu hutan dan whipped cream lembut.",
    price: 36000,
    category: "dessert",
    image: img("1567620905732-2d1ec7ab7445"),
  },
];
