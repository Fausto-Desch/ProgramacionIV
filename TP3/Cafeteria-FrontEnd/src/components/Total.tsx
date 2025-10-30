import { useOrder } from '../context/OrdenContext';

export const Total = () => {
  const { total } = useOrder();
  return <p>Total: ${total}</p>;
};
