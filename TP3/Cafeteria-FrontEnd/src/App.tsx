import React, { useState } from 'react';
import { Menu } from './components/menu';
import { Order } from './components/Orden';
import { Total } from './components/Total';
import { OrderProvider, useOrder } from './context/OrdenContext';

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => (
  <button className="main-button" {...props} />
);

function AppContent() {
  const { order, clear } = useOrder();
  const [message, setMessage] = useState('');

const sendOrder = async () => {
  try {
    const res = await fetch('http://localhost:4000/api/orders', { // ✅ URL completa
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    });

    if (res.ok) {
      setMessage('☕ Pedido confirmado');
      clear();
    } else {
      setMessage(' Error al enviar el pedido');
    }
  } catch (err) {
    console.error(err);
    setMessage(' Error de conexion con el servidor');
  }
};

  return (
    <div className="app-card">
      <h1 className="title">☕ Cafetería</h1>
      <div className="menu-section">
        <Menu />
      </div>

      <div className="order-section">
        <h2>Tu pedido</h2>
        <Order />
        <Total />
        <Button onClick={sendOrder} disabled={order.length === 0}>
          Enviar pedido
        </Button>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <OrderProvider>
      <main className="app-container">
        <AppContent />
      </main>
    </OrderProvider>
  );
}
