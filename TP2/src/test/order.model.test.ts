import { describe, it, expect } from "vitest";
import { Order } from "../models/order.model";

describe("Order Model", () => {
    it("debería crear una orden con datos correctos", () => {
        const orderData: Order = {
        id: "1",
        size: "L",
        toppings: ["Muzza", "Jamon Crudo"],
        address: "9 de julio 203",
        status: "pending",
        price: 30000
        };

        const order = new Order(orderData);

        expect(order.id).toBe("1");
        expect(order.size).toBe("L");
        expect(order.toppings).toEqual(["Muzza", "Jamon Crudo"]);
        expect(order.address).toBe("9 de julio 203");
        expect(order.status).toBe("pending");
        expect(order.price).toBe(30000);
    });
});
