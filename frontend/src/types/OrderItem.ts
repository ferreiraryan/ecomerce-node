import type { Order } from "./Order";
import type { Product } from "./Product";

export interface OrderItem {
  id: string;
  order: Order;
  orderId: string;
  product: Product;
  productId: string;
  quantity: number;
  price: number;
}
