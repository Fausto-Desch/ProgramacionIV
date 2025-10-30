import { Router } from 'express';
import { Producto } from '../types/Producto';

const router = Router();

const menu: Producto[] = [
    { id: '1', name: 'Café', price: 500 },
    { id: '2', name: 'Té', price: 400 },
    { id: '3', name: 'Medialuna', price: 300 },
];

router.get('/', (_req, res) => {
  res.json(menu);
});

export default router;
