import { useEffect, useState } from 'react';
import axios from 'axios';
import { useOrder } from '../context/OrdenContext';
import type { Productos } from '../types/Productos';

export function Menu() {
  const [menu, setMenu] = useState<Productos[]>([]);
  const { add } = useOrder();

useEffect(() => {
  axios.get('http://localhost:4000/api/menu') 
    .then((res) => setMenu(res.data))
    .catch((err) => console.error(err));
}, []);

  return (
    <div>
      <h2>Menu</h2>
      {menu.map((item) => (
        <div key={item.id}>
          {item.name} - ${item.price}
         <button className="small-button " onClick={() => add(item)}>Agregar</button>
        </div>
      ))}
    </div>
  );
}
