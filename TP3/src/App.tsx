import { Menu } from './components/menu';
import { Order } from './components/Orden';
import { Total } from './components/Total';
import { OrderProvider, useOrder } from './context/OrdenContext';
import { useState } from 'react';

function AppContent() {
  const { order, clear } = useOrder();
  const [message, setMessage] = useState('');

  const sendOrder = async () => {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    });

    if (res.ok) {
      setMessage('Pedido confirmado');
      clear();
    }
  };

  return (
    <div>
      <h1>Cafetería</h1>
      <Menu />
      <h2>Tu pedido</h2>
      <Order />
      <Total />
      <button onClick={sendOrder} disabled={order.length === 0}>
        Enviar pedido
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default function App() {
  return (
    <OrderProvider>
      <AppContent />
    </OrderProvider>
  );
}
