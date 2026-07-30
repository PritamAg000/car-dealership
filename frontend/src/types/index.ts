export interface User {
  id: string;
  email: string;
  role: 'customer' | 'admin';
  created_at?: string;
}

export type UserRole = 'customer' | 'admin';

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  category: string;
  price: number;
  quantity: number;
  created_at?: string;
  updated_at?: string;
}

export interface VehicleCreate {
  make: string;
  model: string;
  category: string;
  price: number;
  quantity: number;
}

export interface VehicleUpdate {
  make?: string;
  model?: string;
  category?: string;
  price?: number;
  quantity?: number;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface SearchFilters {
  make?: string;
  model?: string;
  category?: string;
  min_price?: number;
  max_price?: number;
}
