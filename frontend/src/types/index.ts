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
  stock: number;
  isAvailable?: boolean;
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  category: string;
  color?: string;
  image_url?: string;
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
  image_url?: string;
  price: number;
  quantity: number;
}

export interface VehicleUpdate {
  make?: string;
  model?: string;
  category?: string;
  color?: string;
  image_url?: string;
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

export interface PaymentDetails {
  method: 'card' | 'bank' | 'crypto';
  cardName?: string;
  cardNumber?: string;
  expiry?: string;
  cvc?: string;
  streetAddress?: string;
  city?: string;
  state?: string;
  zip?: string;
}

export interface PurchaseReceipt {
  orderId: string;
  vehicle: Vehicle;
  selectedColor: string;
  selectedImage: string;
  paymentMethod: string;
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
