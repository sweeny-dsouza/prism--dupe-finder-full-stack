import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [, setIsInitialized] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleStorageChange = (e: StorageEvent | CustomEvent) => {
      if (e instanceof StorageEvent) {
        if (e.key === key && e.newValue) {
          setStoredValue(JSON.parse(e.newValue));
        }
      } else if (e.detail && e.detail.key === key) {
        setStoredValue(e.detail.newValue);
      }
    };

    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
    }
    
    setIsInitialized(true);

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('local-storage-update', handleStorageChange as EventListener);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('local-storage-update', handleStorageChange as EventListener);
    };
  }, [key]);

  const setValue = (value: T | ((prev: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        window.dispatchEvent(new CustomEvent('local-storage-update', { 
          detail: { key, newValue: valueToStore } 
        }));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

export function useSavedProducts(): {
  savedProducts: string[];
  toggleSaved: (productId: string) => void;
  isSaved: (productId: string) => boolean;
  clearSaved: () => void;
} {
  const [savedProducts, setSavedProducts] = useLocalStorage<string[]>('prism_saved_products', []);

  const toggleSaved = (productId: string) => {
    setSavedProducts(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      }
      return [...prev, productId];
    });
  };

  const isSaved = (productId: string) => savedProducts.includes(productId);

  const clearSaved = () => setSavedProducts([]);

  return { savedProducts, toggleSaved, isSaved, clearSaved };
}

export function useRecentSearches(): {
  recentSearches: string[];
  addSearch: (query: string) => void;
  clearSearches: () => void;
} {
  const [recentSearches, setRecentSearches] = useLocalStorage<string[]>('prism_recent_searches', []);

  const addSearch = (query: string) => {
    if (!query.trim()) return;
    setRecentSearches(prev => {
      const filtered = prev.filter(s => s.toLowerCase() !== query.toLowerCase());
      return [query, ...filtered].slice(0, 10);
    });
  };

  const clearSearches = () => setRecentSearches([]);

  return { recentSearches, addSearch, clearSearches };
}

export function useUser(): {
  user: { name: string; email: string; isLoggedIn: boolean } | null;
  login: (name: string, email: string) => void;
  logout: () => void;
  updateUser: (updates: Partial<{ name: string; email: string }>) => void;
} {
  const [user, setUser] = useLocalStorage<{ name: string; email: string; isLoggedIn: boolean } | null>('prism_user', null);

  const login = (name: string, email: string) => {
    setUser({ name, email, isLoggedIn: true });
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (updates: Partial<{ name: string; email: string }>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  return { user, login, logout, updateUser };
}

export function useCart(): {
  cart: import('@/types').CartItem[];
  addToCart: (product: import('@/types').Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
} {
  const [cart, setCart] = useLocalStorage<import('@/types').CartItem[]>('prism_cart', []);

  const addToCart = (product: import('@/types').Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === product.id);
      if (existing) {
        return prev.map(item => 
          item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, {
        productId: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: 1
      }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setCart(prev => prev.map(item => 
      item.productId === productId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return { cart, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice };
}

export function useOrders(): {
  orders: import('@/types').Order[];
  addOrder: (order: import('@/types').Order) => void;
  getOrder: (orderId: string) => import('@/types').Order | undefined;
} {
  const [orders, setOrders] = useLocalStorage<import('@/types').Order[]>('prism_orders', []);

  const addOrder = (order: import('@/types').Order) => {
    setOrders(prev => [order, ...prev]);
  };

  const getOrder = (orderId: string) => {
    return orders.find(o => o.id === orderId);
  };

  return { orders, addOrder, getOrder };
}

export function useTheme(): {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
} {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('prism_theme', 'light');

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return { theme, toggleTheme };
}
