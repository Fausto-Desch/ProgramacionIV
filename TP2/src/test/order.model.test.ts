import { describe, it, expect, beforeEach, vi } from "vitest";
import { IOrder, iOrders, Order } from "../models/order.model";
import { createOrder, getOrder, cancelOrder, getByStatus, orderDeliveried} from '../controllers/order.controller';
import { Request, Response } from 'express';
import { CreateOrderInput } from '../schemas/order.schema';
/*
// Test -> Nivel ROJO
describe("Order Model", () => {
  it("Creemos una orden con datos correctos", () => {
    // Preparamos una orden
    const orderData = {
      id: 1,
      customerName: "andy",
      items: ["Pizza", "Coquita"],
      total: 22500
    };

    // Creamos la nueva orden
    const order = new Order(orderData);

    // Y lo que esperamos de ella
    expect(order.id).toBe(1);
    expect(order.customerName).toBe("andy");
    expect(order.items).toEqual(["Pizza", "Coquita"]);
    expect(order.total).toBe(22500);
  });
});
*/

//Mockeamos todos los objetos de Express para simular el REQ Y RES
const mockResponse = () => {
    const res: Partial<Response> = {};
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    return res as Response;
};

// Datos base para algunas pruebas
const baseOrderData: CreateOrderInput = {
    size: "M",
    toppings: ["Mussa","Salame"],
    address: "Hirigoyen 14"
};

//Limpiamos el array de ordenes antes de los test
beforeEach(() => {
    iOrders.length = 0;
    vi.clearAllMocks();
});

//Test Orden Model
describe("Orden Model", () => {
  it("Creemos una orden con datos correctos", () => {
    // Preparamos una orden
    const orderData: IOrder = {
      id: "1",
      size: "L",
      toppings: ["Papas fritas","Huevo frito"],
      address: "9 de Juli 203 Puan",
      status: "delivered",
      price: 22500
    };

    // Creamos la nueva orden
    const order = new Order(orderData);

    // Y lo que esperamos de ella
    expect(order.id).toBe("1");
    expect(order.size).toBe("L");
    expect(order.toppings).toEqual(["Papas fritas","Huevo frito"]);
    expect(order.address).toBe("9 de Juli 203 Puan");
    expect(order.status).toBe("delivered");
    expect(order.price).toBe(22500);
  });
});

//Test createOrder
describe('createOrder', () => {
it('Creamos una nueva orden con ID secuencial, status "pending" y calcular el precio', () => {
    const req = { body: baseOrderData } as Request;
    const res = mockResponse();

    createOrder(req, res);

    expect(iOrders).toHaveLength(1);
    const newOrder = iOrders[0];
    
    if(newOrder){
        // Verificaciones de propiedades esenciales
        expect(newOrder.id).toBe("1");
        expect(newOrder.status).toBe("pending");
        // Verificación del cálculo de precio: 12 (Base M) + 2*3 (Toppings) = 18
        expect(newOrder.price).toBe(18); 

        // Verificación de respuesta HTTP
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        id: "1",
        size: "M",
        }));
    }else{
        throw new Error("La orden es undefinded")
    }
    });
});

//Test getOrder
describe('getOrder', () => {
  it('Retornaremos una orden existente por ID', () => {
    // 1. Arrange: Crear la orden de prueba
    iOrders.push({ 
        id: "10", 
        size: "L", 
        toppings: [], 
        address: "Test", 
        status: "pending", 
        price: 15 
    });

    const req = { params: { id: "10" } } as unknown as Request; // Usamos 'unknown as' para simular Express
    const res = mockResponse();

    getOrder(req, res);

    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      id: "10",
      size: "L",
    }));
  });

  it('Debe retornar un error 404 si la orden no existe', () => {
    const req = { params: { id: "999" } } as unknown as Request;
    const res = mockResponse();

    const result = getOrder(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "No se encontro el pedido" });
    expect(result).toBeUndefined(); // Verifica que retorna del handler
  });
});

//Tert cancelar orden
describe('cancelOrder', () => {
  it('Debe cambiar el status de una orden pendiente a "cancelled"', () => {
    // 1. Arrange: Crear orden pendiente
    const pendingOrder = { 
        id: "20", 
        size: "M", 
        toppings: [], 
        address: "Test", 
        status: "pending", 
        price: 12 
    };
    orders.push(pendingOrder);

    const req = { params: { id: "20" } } as unknown as Request;
    const res = mockResponse();

    cancelOrder(req, res);

    expect(pendingOrder.status).toBe("cancelled");
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      status: "cancelled",
    }));
  });

  it('Debe retornar un error 409 si la orden ya está "delivered"', () => {
    // 1. Arrange: Crear orden entregada
    orders.push({ 
        id: "21", 
        size: "L", 
        toppings: [], 
        address: "Test", 
        status: "delivered", 
        price: 15 
    });

    const req = { params: { id: "21" } } as unknown as Request;
    const res = mockResponse();

    cancelOrder(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({ error: "No se puede cancelar un pedido entregado" });
  });
});

//Test orderDeliveried
describe('orderDeliveried', () => {
  it('Debe cambiar el status de una orden a "delivered"', () => {
    // 1. Arrange: Crear orden pendiente
    const pendingOrder = { 
        id: "30", 
        size: "M", 
        toppings: [], 
        address: "Test", 
        status: "pending", 
        price: 12 
    };
    orders.push(pendingOrder);

    const req = { params: { id: "30" } } as unknown as Request;
    const res = mockResponse();

    orderDeliveried(req, res);

    expect(pendingOrder.status).toBe("delivered");
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      status: "delivered",
    }));
  });

  it('Debe retornar un error 409 si la orden está "cancelled"', () => {
    // 1. Arrange: Crear orden cancelada
    iOrders.push({ 
        id: "31", 
        size: "S", 
        toppings: [], 
        address: "Test", 
        status: "cancelled", 
        price: 10 
    });

    const req = { params: { id: "31" } } as unknown as Request;
    const res = mockResponse();

    orderDeliveried(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({ error: "No se puede entregar un pedido cancelado" });
  });
});

// Test getByStatus

describe('getByStatus', () => {
  it('Debe retornar todas las órdenes si no se proporciona un query de status', () => {
    // 1. Arrange: Llenar el array con varias órdenes
    iOrders.push({ id: "40", size: "M", toppings: [], address: "A", status: "pending", price: 12 });
    iOrders.push({ id: "41", size: "L", toppings: [], address: "B", status: "delivered", price: 15 });

    const req = { query: {} } as unknown as Request; // Sin query
    const res = mockResponse();

    getByStatus(req, res);

    // Esperamos 2 órdenes
    const [result] = res.json.mock.calls;
    expect(result[0]).toHaveLength(2); 
  });

  it('Debe retornar solo las órdenes con el status especificado ("delivered")', () => {
    // 1. Arrange: Llenar el array
    iOrders.push({ id: "50", size: "M", toppings: [], address: "A", status: "pending", price: 12 });
    iOrders.push({ id: "51", size: "L", toppings: [], address: "B", status: "delivered", price: 15 });
    iOrders.push({ id: "52", size: "S", toppings: [], address: "C", status: "delivered", price: 10 });

    const req = { query: { status: "delivered" } } as unknown as Request;
    const res = mockResponse();

    getByStatus(req, res);

    // Esperamos 2 órdenes entregadas
    const [result] = res.json.mock.calls;
    expect(result[0]).toHaveLength(2);
    expect(result[0].every((o: any) => o.status === "delivered")).toBe(true);
  });
});