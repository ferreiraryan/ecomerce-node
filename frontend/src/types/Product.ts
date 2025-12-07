import type { OrderItem } from "./OrderItem";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string | null;
  stock: number;
  orderItems?: OrderItem[];
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}

