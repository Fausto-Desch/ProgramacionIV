import { createContext, useContext, useState, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { Productos } from '../types/Productos';

type OrderContextType = {
  order: Productos[];
  add: (item: Productos) => void;
  removeItem: (index: number) => void; 
  clear: () => void;
  total: number;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error('useOrder must be used within OrderProvider');
  return context;
};

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [order, setOrder] = useState<Productos[]>([]);

  const add = (item: Productos) => setOrder(prev => [...prev, item]);
  const removeItem = (index: number) => {
  setOrder(prev => prev.filter((_, i) => i !== index));
};

  const clear = () => setOrder([]);


  const total = useMemo(() => {
    return order.reduce((sum, item) => sum + item.price, 0);
  }, [order]);

  return (
    <OrderContext.Provider value={{ order, add, removeItem, clear, total }}>
      {children}
    </OrderContext.Provider>
  );
};
