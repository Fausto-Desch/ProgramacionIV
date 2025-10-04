import { Order, orders } from "../models/order.model";
import { Request, Response } from "express";
import { CreateOrderInput, OrderIdParam, OrderQuery,clientViewOrderSchema } from "../schemas/order.schema";
import z from "zod";

const calculatePrice = (size: "S" | "M" | "L", toppings: string[]): number => {
  const basePrice:number = size === "S" ? 10 : size === "M" ? 12 : 15
  const toppingsPrice:number = toppings.length * 3
  const price:number = basePrice + toppingsPrice
  return (price)
}


export const createOrder = (req: Request, res: Response) => {
  const data = req.body as CreateOrderInput;
  const { size, toppings, address } = data;

  const newOrder: Order = {
    id: (orders.length + 1).toString(),
    size,
    toppings,
    address,
    status: "pending",
    price: calculatePrice(size, toppings),
  };

  orders.push(newOrder);

  const safeOrder = clientViewOrderSchema.parse(newOrder)

  res.status(201).json(safeOrder);
}

export const getOrder = (req: Request, res: Response) =>{
  const { id } = req.params as OrderIdParam;
  const order = orders.find((o) => o.id === id)

  if (!order){
    return(res.status(404).json({error: "No se encontro el pedido"}))
  }

  const safeOrder = clientViewOrderSchema.parse(order);

  res.json(safeOrder);
}

export const cancelOrder = (req: Request, res: Response) => {
  const { id } = req.params as OrderIdParam;
  const order = orders.find((o) => o.id === id)

  if (!order){
    return(res.status(404).json({error: "No se encontro pedido"}))
  }

  if (order.status === "delivered"){
    return(res.status(409).json({error: "No se puede cancelar un pedido entregado"}))
  }

  order.status = "cancelled"

  const safeOrder = clientViewOrderSchema.parse(order);

  res.json(safeOrder);
}

export const getByStatus = (req: Request, res: Response) => {
  const { status } = req.query as OrderQuery

  let pedidos = orders

  if (status){
    pedidos = orders.filter((o) => o.status === status)
  }

  const safeOrders = z.array(clientViewOrderSchema).parse(pedidos);

  res.json(safeOrders);
}

export const orderDeliveried = (req: Request, res: Response) => {
  const { id } = req.params as OrderIdParam;
  const order = orders.find((o) => o.id === id)

  if (!order){
    return(res.status(404).json({error: "No se encontro pedido"}))
  }

  if (order.status === "cancelled"){
    return(res.status(409).json({error: "No se puede entregar un pedido cancelado"}))
  }

  order.status = "delivered"

  const safeOrder = clientViewOrderSchema.parse(order);

  res.json(safeOrder);
}