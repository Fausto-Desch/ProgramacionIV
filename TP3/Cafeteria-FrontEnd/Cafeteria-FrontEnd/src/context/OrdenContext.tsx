import { createContext, useContext, useState } from 'react';
import type { Productos } from '../types/Productos';

type OrderContextType = {
  order: Productos[];
  addItem: (item: Productos) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  total: number;
};

const OrderContext = createContext<OrderContextType | null>(null);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [order, setOrder] = useState<Productos[]>([]);

  const addItem = (item: Productos) => setOrder((prev) => [...prev, item]);
  const removeItem = (id: string) => setOrder((prev) => prev.filter((p) => p.id !== id));
  const clear = () => setOrder([]);

  const total = order.reduce((acc, p) => acc + p.price, 0);

  return (
    <OrderContext.Provider value={{ order, addItem, removeItem, clear, total }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error('useOrder debe usarse dentro de OrderProvider');
  return ctx;
};
