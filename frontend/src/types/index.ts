export interface User {
  id: string;
  email: string;
  role: 'customer' | 'admin';
  created_at?: string;
}

export type UserRole = 'customer' | 'admin';

export interface ColorVariant {
  name: string;
  hex: string;
  image: string;
  filter?: string;
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  category: string;
  color?: string;
  colors?: ColorVariant[];
  price: number;
  quantity: number;
  created_at?: string;
  updated_at?: string;
}

export interface VehicleCreate {
  make: string;
  model: string;
  category: string;
  color?: string;
  price: number;
  quantity: number;
}

export interface VehicleUpdate {
  make?: string;
  model?: string;
  category?: string;
  color?: string;
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

export interface PurchaseReceipt {
  orderId: string;
  vehicle: Vehicle;
  selectedColor: string;
  selectedImage: string;
  selectedFilter?: string;
  buyerEmail: string;
  purchaseDate: string;
  deliveryDate: string;
  warranty: string;
  specifications: {
    drivetrain: string;
    engine: string;
    acceleration: string;
  };
}
