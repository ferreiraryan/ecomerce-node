import type { OrderItem } from "./OrderItem";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string | null;
  orderItems?: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

