import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const themeScript = `(function(){try{var t=localStorage.getItem('kopi-senja-theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t;}catch(e){}})();`;

export const metadata: Metadata = {
  title: "Kopi Senja — Coffee & Eatery di Yogyakarta",
  description:
    "Kopi single origin, pastry harian, dan ruang hangat di Prawirotaman, Yogyakarta. Buka setiap hari, 07.00–22.00 WIB.",
  keywords: [
    "coffee shop yogyakarta",
    "cafe prawirotaman",
    "kopi senja",
    "single origin",
    "cafe aesthetic jogja",
  ],
  openGraph: {
    title: "Kopi Senja — Coffee & Eatery di Yogyakarta",
    description:
      "Kopi single origin, pastry harian, dan ruang hangat di Prawirotaman, Yogyakarta.",
    locale: "id_ID",
    type: "website",
    siteName: "Kopi Senja",
    images: [
      {
        url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Latte art di Kopi Senja",
      },
    ],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf6ee" },
    { media: "(prefers-color-scheme: dark)", color: "#110d0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${fraunces.variable} ${jakarta.variable}`}>
        <a className="skip-link" href="#main">
          Lewati ke konten
        </a>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
