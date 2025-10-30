import { Menu } from './components/menu';
import { Order } from './components/Orden';
import { Total } from './components/Total';
import { OrderProvider, useOrder } from './context/OrdenContext';
import { useState } from 'react';

function AppContent() {
  const { order, clear } = useOrder();
  const [message, setMessage] = useState('');

 const enviarPedido = async () => {
  try {
const res = await fetch('http://localhost:4000/api/orders', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(order),
});


    if (res.ok) {
      setMessage(' Pedido enviado con exito');
      clear();
    } else {
      const errorText = await res.text();
      console.error('Error del servidor:', errorText);
      setMessage(' Error al enviar el pedido');
    }
  } catch (err) {
    console.error('Error de conexión:', err);
    setMessage(' No se pudo conectar con el servidor');
  }

  setTimeout(() => setMessage(''), 3000);
};


  return (
    <div style={{ padding: 20 }}>
      <h1>Cafeteria</h1>
      <Menu />
      <h2>Tu pedido</h2>
      <Order />
      <Total />
      <button onClick={enviarPedido} disabled={order.length === 0}>
        Enviar pedido
      </button>
      {message && <p style={{ marginTop: 10 }}>{message}</p>}
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
