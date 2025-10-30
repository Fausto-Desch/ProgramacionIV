import { Router, Request, Response, NextFunction } from 'express';
import { Producto } from '../types/Producto';

const router = Router();


function expressJsonGuard(req: Request, res: Response, next: NextFunction) {
  if (!req.is('application/json')) {
    return res.status(400).json({ message: 'Content-Type debe ser application/json' });
  }
  next();
}

router.post('/', expressJsonGuard, (req: Request, res: Response) => {
  const body = req.body;
  if (!Array.isArray(body)) {
    return res.status(400).json({ message: 'Pedido inválido' });
  }

  console.log('Pedido recibido:', body as Producto[]);
  return res.status(201).json({ message: 'Pedido confirmado', order: body });
});

export default router;
