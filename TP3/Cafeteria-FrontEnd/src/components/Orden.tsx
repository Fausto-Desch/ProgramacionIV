import { useOrder } from '../context/OrdenContext';

export const Order = () => {
    const { order, removeItem } = useOrder();

    if (order.length === 0) return <p>No hay productos en el pedido</p>;

    return (
        <ul role="list">
        {order.map((p) => (
            <li key={p.id}>
            {p.name} - ${p.price}
            <button onClick={() => removeItem(p.id)}>Eliminar</button>
            </li>
        ))}
        </ul>
    );
};
