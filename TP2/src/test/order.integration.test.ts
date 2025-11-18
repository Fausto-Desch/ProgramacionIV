import request from "supertest";
import express from "express";
import { describe, it, expect, beforeEach, vi } from "vitest";
import orderRouter from "../routes/order.route";
import { orders } from "../models/order.model";

const app = express();
app.use(express.json());
app.use("/orders", orderRouter);

// Orden para hacer las pruebas
const baseOrder = {
    size: "L",
    toppings: ["muzza", "jamoncito"],
    address: "mi vivienda",
};

describe("Integracion de ordenes test (Rutas + Controladores + Middleware)", () => {
    beforeEach(() => {
        // Limpiamos el array de órdenes antes de cada prueba para asegurar el aislamiento
        orders.length = 0;
    });

   // Creacion de ordenes

    it("Esto deberia de crear una orden y devolver 'creado(201)' ", async () => {
        const response = await request(app)
        .post("/orders")
        .send(baseOrder)
        .expect("Content-Type", /json/)
        .expect(201);

        expect(response.body).toEqual(
        expect.objectContaining({
            id: "1",
            size: "L",
            address: "mi vivienda",
            status: "pending",
        })
        );
        expect(response.body.price).toBeGreaterThan(0);
        expect(orders.length).toBe(1);
    });

    // Validacion de middlware

    it("Esto deberia devolver 422 si la direccion es demasiado corta", async () => {
        const invalidOrder = { ...baseOrder, address: "corto" };

        const response = await request(app)
        .post("/orders")
        .send(invalidOrder)
        .expect("Content-Type", /json/)
        .expect(422); // Codigo de error devuelto por zon-middlware

        expect(orders.length).toBe(0);
    });

    // Obtener las ordenes existentes

    it("Esto deberia de obtener una orden por ID y devolver creado (200)", async () => {
        // Pre-carga una orden
        await request(app).post("/orders").send(baseOrder);
        
        const response = await request(app)
        .get("/orders/1")
        .expect("Content-Type", /json/)
        .expect(200);

        expect(response.body.id).toBe("1");
        expect(response.body.status).toBe("pending");
    });

    // Prueba de obtener ordenes existentes

    it("Esto deberia devolver 404 si la orden no existe", async () => {
        await request(app)
        .get("/orders/999") // ID no existente, por ahora
        .expect("Content-Type", /json/)
        .expect(404);
    });

    // Prueba de  cancelar una orden

    it("Esto deberia cancelar una orden pendiente", async () => {
        await request(app).post("/orders").send(baseOrder);

        const response = await request(app)
        .post("/orders/1/cancel")
        .expect("Content-Type", /json/)
        .expect(200);

        expect(response.body.status).toBe("cancelled");

        expect(orders.find(o => o.id === "1")?.status).toBe("cancelled"); //Esto verifica en el array, la orden esta cancelada
    });

    // Prueba de entregar una orden
    
    it("Esto deberia de marcar una orden como entregada", async () => {
        await request(app).post("/orders").send(baseOrder);

        const response = await request(app)
        .post("/orders/1/delivered") //Marcamos como entregada
        .expect("Content-Type", /json/)
        .expect(200);

        expect(response.body.status).toBe("delivered");
        expect(orders.find(o => o.id === "1")?.status).toBe("delivered"); //Esto verifica en el array, la orden esta entregada
    });
});