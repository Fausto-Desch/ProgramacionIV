import { describe, it, expect, beforeEach, vi } from "vitest";
import { Request, Response } from "express";
import { createOrder, getOrder, cancelOrder, getByStatus, orderDeliveried} from "../controllers/order.controller";
import { Order, orders } from "../models/order.model";

// Empezamos preparando los mocks de express para testear
const mockResponse = () => {
  const res: Partial<Response> = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res as Response;
};

// Creamos una "Orden de base" para poder probar diferentes metodos
const baseOrder : Order = {
  id: "1",
  size: "L",
  toppings: ["muzza"],
  address: "Calle Panama 32",
  status: "pending",
  price: 27500
};

describe("Order Controller", () => {
  let req: Partial<Request>;
  let res: Response;

  beforeEach(() => {
    req = {};
    res = mockResponse();
  });

  it("esto deberia crear una orden correctamente", async () => {
    const req = { body: baseOrder } as unknown as Request;
    const res = mockResponse();

    createOrder(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalled();
    const [jsonArg] = (res.json as any).mock.calls[0];
    expect(jsonArg).toEqual(expect.objectContaining({
      id: "1",
      address: "Calle Panama 32",
      size: "L",
      toppings: ["muzza"],
      status: "pending",
    }));
    expect(jsonArg.price).toBe(27500);
    expect(orders.length).toBe(1);
  });

  it("esto deberia obtener una orden existente", async () => {
    orders.push(baseOrder);
    const req = { params: { id: "1" } } as unknown as Request;
    const res = mockResponse();

    getOrder(req, res);

    expect(res.json).toHaveBeenCalled();
    const [jsonArg] = (res.json as any).mock.calls[0];
    expect(jsonArg).toEqual(expect.objectContaining({ id: "1", status: "pending" }));
  });

  it("esto deberia cancelar una orden correctamente", async () => {
    //Cargamos el mock con una orden pendiente
    orders.push(baseOrder);
    const req = { params: { id: "1" } } as unknown as Request;
    const res = mockResponse();

    cancelOrder(req, res);

    expect(res.json).toHaveBeenCalled();
    const [jsonArg] = (res.json as any).mock.calls[0];
    expect(jsonArg.status).toBe("cancelled");
  });

  it("esto deberia marcar una orden como entregada", async () => {
    //Cargamos el mock con una orden pendiente
    orders.length = 0;
    orders.push(baseOrder);
    const req = { params: { id: "1" } } as unknown as Request;
    const res = mockResponse();

    orderDeliveried(req, res);
    expect(baseOrder.status).toBe("delivered");
    expect(res.json).toBeCalledWith(
      expect.objectContaining({
        id:"1",
        status: "delivered"
      })
    ); 
  });

  it("esto deberia filtrar por estado (getByStatus)", () => {
    orders.length = 0;
    orders.push({ id: "50", size: "M", toppings: ["mussa"], address: "DireccionAAA", status: "pending", price: 12 } as any);
    orders.push({ id: "51", size: "L", toppings: ["capprecce"], address: "DireccionBBB", status: "delivered", price: 15 } as any);
    orders.push({ id: "52", size: "S", toppings: ["mostaza"], address: "DireccionCCC", status: "delivered", price: 10 } as any);

    const req = { query: { status: "delivered" } } as unknown as Request;
    const res = mockResponse();

    getByStatus(req, res);

    expect(res.json).toHaveBeenCalled();
    const [jsonArg] = (res.json as any).mock.calls[0];
    // jsonArg es el array de ordenes devuelto
    expect(Array.isArray(jsonArg)).toBe(true);
    expect(jsonArg.length).toBe(2);
    expect(jsonArg.every((o: any) => o.status === "delivered")).toBe(true);
  });
});
