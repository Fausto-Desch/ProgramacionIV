export interface Order {
  id: string;
  size: "S" | "M" | "L";
  toppings: string[];
  address: string;
  status: "pending" | "delivered" | "cancelled";
  price: number;
}

export const orders: Order[] = [];
