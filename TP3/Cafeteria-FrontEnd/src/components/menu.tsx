import { useEffect, useState } from 'react';
import type { Productos } from '../types/Productos';
import { useOrder } from '../context/OrdenContext';
const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

export const Menu = () => {
  const [menu, setMenu] = useState<Productos[]>([]);
  const [error, setError] = useState('');
  const { addItem } = useOrder();

  useEffect(() => {
  fetch(`${BASE}/api/menu`)
    .then((res) => {
        if (!res.ok) throw new Error('Error al cargar menú');
        return res.json();
      })
      .then(setMenu)
      .catch(() => setError('Error al cargar menú'));
  }, []);

  if (error) return <p>{error}</p>;
  if (menu.length === 0) return <p>Cargando...</p>;

  return (
    <ul role="list">
      {menu.map((p) => (
        <li key={p.id}>
          {p.name} - ${p.price}
          <button onClick={() => addItem(p)}>Agregar</button>
        </li>
      ))}
    </ul>
  );
};
