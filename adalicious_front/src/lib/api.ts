import { MenuItem, Order, CreateOrderRequest, UpdateOrderRequest, ApiResponse } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

class ApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }
      
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Menu endpoints
  async getMenu(): Promise<ApiResponse<MenuItem[]>> {
    return this.request<MenuItem[]>('/menu');
  }

  // Order endpoints
  async getOrders(): Promise<ApiResponse<Order[]>> {
    return this.request<Order[]>('/order');
  }

  async getOrderById(id: string): Promise<ApiResponse<Order>> {
    return this.request<Order>(`/order/${id}`);
  }

  async createOrder(orderData: CreateOrderRequest): Promise<ApiResponse<Order>> {
    return this.request<Order>('/order', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async updateOrder(id: string, orderData: UpdateOrderRequest): Promise<ApiResponse<Order>> {
    return this.request<Order>(`/order/${id}`, {
      method: 'PUT',
      body: JSON.stringify(orderData),
    });
  }

  async deleteOrder(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/order/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient();