"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Check } from "lucide-react";
import type { MenuItem } from "@/data/menu";

export type CartLine = Pick<MenuItem, "id" | "name" | "price" | "image"> & {
  qty: number;
};

type CartInput = Pick<MenuItem, "id" | "name" | "price" | "image">;

type CartContextValue = {
  items: CartLine[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: CartInput) => void;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeItem: (id: string) => void;
  notify: (message: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "kopi-senja:cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartLine[];
        if (Array.isArray(parsed)) {
          setItems(
            parsed.filter(
              (line) =>
                typeof line?.id === "string" &&
                typeof line?.price === "number" &&
                typeof line?.qty === "number",
            ),
          );
        }
      }
    } catch {
      /* ignore corrupted storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage might be full or blocked */
    }
  }, [items, hydrated]);

  useEffect(() => {
    if (!isOpen) return;
    document.body.classList.add("no-scroll--cart");

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.classList.remove("no-scroll--cart");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  const notify = useCallback((message: string) => {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  }, []);

  const addItem = useCallback(
    (item: CartInput) => {
      setItems((current) => {
        const existing = current.find((line) => line.id === item.id);
        if (existing) {
          return current.map((line) =>
            line.id === item.id ? { ...line, qty: line.qty + 1 } : line,
          );
        }
        return [...current, { ...item, qty: 1 }];
      });
      notify(`${item.name} masuk pesanan`);
    },
    [notify],
  );

  const increase = useCallback((id: string) => {
    setItems((current) =>
      current.map((line) =>
        line.id === id ? { ...line, qty: line.qty + 1 } : line,
      ),
    );
  }, []);

  const decrease = useCallback((id: string) => {
    setItems((current) =>
      current
        .map((line) =>
          line.id === id ? { ...line, qty: line.qty - 1 } : line,
        )
        .filter((line) => line.qty > 0),
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((current) => current.filter((line) => line.id !== id));
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const count = useMemo(
    () => items.reduce((total, line) => total + line.qty, 0),
    [items],
  );
  const subtotal = useMemo(
    () => items.reduce((total, line) => total + line.price * line.qty, 0),
    [items],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count,
      subtotal,
      isOpen,
      openCart,
      closeCart,
      addItem,
      increase,
      decrease,
      removeItem,
      notify,
    }),
    [
      items,
      count,
      subtotal,
      isOpen,
      openCart,
      closeCart,
      addItem,
      increase,
      decrease,
      removeItem,
      notify,
    ],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
      <div
        className={`toast${toast ? " is-visible" : ""}`}
        role="status"
        aria-live="polite"
      >
        <span className="toast__icon" aria-hidden="true">
          <Check size={15} strokeWidth={3} />
        </span>
        {toast ?? "Pesanan diperbarui"}
      </div>
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart harus dipakai di dalam CartProvider");
  }
  return context;
}
