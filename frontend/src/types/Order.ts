import type { OrderItem } from "./OrderItem";
import type { User } from "./User";

export interface Order {
  id: string;
  user: User;
  userId: string;
  items: OrderItem[];
  status: string
  total: number;
  shippingAddress: string;
  createdAt: string;
}
