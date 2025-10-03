import { z } from "zod";

export const orderSchema = z.object({
  size: z.enum(["S", "M", "L"]),
  toppings: z.array(z.string())
    .max(5, "Máximo 5 toppings"),
  address: z.string()
    .min(10, "La dirección debe tener al menos 10 caracteres"),
});

export const createOrderSchema = orderSchema;

export const orderIdParamSchema = z.object({
  id: z.string({
    required_error: "El id es obligatorio",
  }),
});

export const orderQuerySchema = z.object({
  status: z
    .enum(["pending", "delivered", "cancelled"])
    .optional(),
});

export const clientViewOrderSchema = orderSchema.extend({
  id: z.string(),
  price: z.number().nonnegative(),
  status: z.enum(["pending", "delivered", "cancelled"]),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type OrderIdParam = z.infer<typeof orderIdParamSchema>;
export type OrderQuery = z.infer<typeof orderQuerySchema>;
export type FullOrder = z.infer<typeof clientViewOrderSchema>;