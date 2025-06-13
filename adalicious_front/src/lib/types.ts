export interface MenuItem {
  id: number;
  plate: string;
  description: string;
  image: string;
  price?: number;
  created_at?: Date;
}

export interface Order {
  id: string;
  customer_name: string;
  menu_item_id: number;
  menu_item?: MenuItem;
  status: OrderStatus;
  created_at: Date;
  updated_at: Date;
}

export enum OrderStatus {
  PENDING = 'pending',
  IN_PREPARATION = 'in_preparation',
  READY = 'ready',
  DELIVERED = 'delivered'
}

export interface CreateOrderRequest {
  customer_name: string;
  menu_item_id: number;
}

export interface UpdateOrderRequest {
  status: OrderStatus;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}