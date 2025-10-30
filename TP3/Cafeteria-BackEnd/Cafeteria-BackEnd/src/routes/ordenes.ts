import { Router } from 'express';
import { Producto } from '../types/Producto';

const router = Router();

router.post('/', expressJsonGuard, (req, res) => {
    const body = req.body;
    if (!Array.isArray(body)) {
        return res.status(400).json({ message: 'Pedido inválido' });
    }

    console.log('Pedido recibido:', body as Producto[]);

    return res.status(201).json({ message: 'Pedido confirmado' });
    });

    function expressJsonGuard(req: any, res: any, next: any) {
    if (!req.is('application/json') && req.headers['content-type'] !== 'application/json') {
    }
    next();
    }

export default router;
