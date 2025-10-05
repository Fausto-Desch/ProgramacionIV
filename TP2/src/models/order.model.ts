export interface IOrder {
  id: string;
  size: "S" | "M" | "L";
  toppings: string[];
  address: string;
  status: "pending" | "delivered" | "cancelled";
  price: number;
}

export class Order implements IOrder {
  id: string;
  size: "S" | "M" | "L";
  toppings: string[];
  address: string;
  status: "pending" | "delivered" | "cancelled";
  price: number;

  constructor(data: IOrder) {
    this.id = data.id;
    this.size = data.size;
    this.toppings = data.toppings;
    this.address = data.address;
    this.status = data.status;
    this.price = data.price;
  }
}

export const iOrders: IOrder[] = [];
export const orders: Order[] = [];
