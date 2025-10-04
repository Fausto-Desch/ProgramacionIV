import { Router } from "express";
import { validate } from "../middleware/validate";
import { createOrder, getOrder, cancelOrder, getByStatus, orderDeliveried } from "../controllers/order.controller";
import { createOrderSchema, orderIdParamSchema, orderQuerySchema } from "../schemas/order.schema";

const router = Router()

router.post("/", validate(createOrderSchema, "body"), createOrder)
router.get("/:id", validate(orderIdParamSchema, "params"), getOrder)
router.post("/:id/cancel", validate(orderIdParamSchema, "params"), cancelOrder)
router.post("/:id/delivered", validate(orderIdParamSchema, "params"), orderDeliveried)
router.get("/", validate(orderQuerySchema, "query"), getByStatus)


export default router
