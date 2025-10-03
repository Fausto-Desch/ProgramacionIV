import { Order, orders } from "../models/order";
import { Request, Response } from "express";
import { CreateOrderInput, OrderIdParam, OrderQuery, FullOrder } from "../schemas/order.schema";
import { error } from "console";

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
  res.status(201).json(newOrder);
}

export const getOrder = (req: Request, res: Response) =>{
  const { id } = req.params as OrderIdParam;
  const order = orders.find((o) => o.id === id)

  if (!order){
    return(res.status(404).json({error: "No se encontro el pedido"}))
  }

  res.json
}