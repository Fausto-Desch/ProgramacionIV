import { useOrder } from '../context/OrdenContext';

export const Order = () => {
    const { order, removeItem } = useOrder();

    if (order.length === 0) return <p>No hay productos en el pedido</p>;

    return (
        <ul role="list">
       {order.map((p, index) => (
  <li key={`${p.id}-${index}`}>
    {p.name} - ${p.price}
  <button className="small-button" onClick={() => removeItem(index)}>Eliminar</button>
  </li>
))}

        </ul>
    );
};
