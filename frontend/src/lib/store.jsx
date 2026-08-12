import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "@/lib/api";

const StoreContext = createContext(null);

const read = (key, fallback) => {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

export function StoreProvider({ children }) {
  const [hydrated, setHydrated] = useState(false);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function init() {
      setCart(read("mbt.cart", []));
      setWishlist(read("mbt.wishlist", []));
      setOrders(read("mbt.orders", []));

      const token = localStorage.getItem("mbt.token");
      if (token) {
        try {
          const res = await api.get("/auth/me");
          setUser(res.data);
          setCart(res.data.cart || []);
          setWishlist(res.data.wishlist || []);
        } catch {
          localStorage.removeItem("mbt.token");
          setUser(null);
        }
      }

      setHydrated(true);
    }
    init();
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem("mbt.cart", JSON.stringify(cart));
  }, [cart, hydrated]);
  useEffect(() => {
    if (hydrated) window.localStorage.setItem("mbt.wishlist", JSON.stringify(wishlist));
  }, [wishlist, hydrated]);
  useEffect(() => {
    if (hydrated) window.localStorage.setItem("mbt.orders", JSON.stringify(orders));
  }, [orders, hydrated]);

  const value = useMemo(() => {
    const addToCart = (product, qty = 1) =>
      setCart((prev) => {
        const id = `${product.kind}:${product.slug}`;
        const existing = prev.find((i) => i.id === id);
        const next = existing
          ? prev.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i))
          : [
              ...prev,
              {
                id,
                kind: product.kind,
                slug: product.slug,
                name: product.name,
                spec: product.size || product.capacity,
                price: product.price,
                qty,
              },
            ];
        if (user) api.put("/auth/cart", { cart: next }).catch(() => {});
        return next;
      });

    const setQty = (id, qty) =>
      setCart((prev) => {
        const next =
          qty <= 0
            ? prev.filter((i) => i.id !== id)
            : prev.map((i) => (i.id === id ? { ...i, qty } : i));
        if (user) api.put("/auth/cart", { cart: next }).catch(() => {});
        return next;
      });

    const removeFromCart = (id) =>
      setCart((prev) => {
        const next = prev.filter((i) => i.id !== id);
        if (user) api.put("/auth/cart", { cart: next }).catch(() => {});
        return next;
      });

    const clearCart = () => {
      setCart([]);
      if (user) api.put("/auth/cart", { cart: [] }).catch(() => {});
    };

    const toggleWishlist = (product) =>
      setWishlist((prev) => {
        const id = `${product.kind}:${product.slug}`;
        const next = prev.some((i) => i.id === id)
          ? prev.filter((i) => i.id !== id)
          : [...prev, { id, kind: product.kind, slug: product.slug, name: product.name }];
        if (user) api.put("/auth/wishlist", { wishlist: next }).catch(() => {});
        return next;
      });

    const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    const gst = Math.round(subtotal * 0.18);
    const fitting = cart.reduce(
      (sum, i) => sum + (i.kind === "tyre" ? 250 * i.qty : 0),
      0,
    );
    const total = subtotal + gst + fitting;
    const count = cart.reduce((sum, i) => sum + i.qty, 0);

    const login = async (email, password) => {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("mbt.token", res.data.token);
      setUser(res.data.user);
      setCart(res.data.user.cart || []);
      setWishlist(res.data.user.wishlist || []);
    };

    const registerUser = async ({ name, email, phone, password }) => {
      const res = await api.post("/auth/register", { name, email, phone, password });
      localStorage.setItem("mbt.token", res.data.token);
      setUser(res.data.user);
      setCart(res.data.user.cart || []);
      setWishlist(res.data.user.wishlist || []);
    };

    const signOut = () => {
      localStorage.removeItem("mbt.token");
      setUser(null);
    };

    return {
      hydrated,
      cart,
      count,
      subtotal,
      gst,
      fitting,
      total,
      addToCart,
      setQty,
      removeFromCart,
      clearCart,
      wishlist,
      toggleWishlist,
      user,
      login,
      registerUser,
      signOut,
      orders,
      placeOrder: (order) => setOrders((prev) => [order, ...prev]),
    };
  }, [cart, wishlist, user, orders, hydrated]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}