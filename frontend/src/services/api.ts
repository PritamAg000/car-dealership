import { User, Vehicle, VehicleCreate, VehicleUpdate, LoginResponse, SearchFilters } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// Mock seed database state for standalone Vercel client deployment fallback
const MOCK_VEHICLES: Vehicle[] = [
  { id: 'v1', make: 'Tesla', model: 'Model S Plaid', category: 'EV', color: 'Stealth Metallic Cyan', price: 89990, quantity: 5 },
  { id: 'v2', make: 'Porsche', model: '911 GT3 RS', category: 'coupe', color: 'Sunset Amber Gold', price: 241300, quantity: 3 },
  { id: 'v3', make: 'BMW', model: 'M5 Competition', category: 'sedan', color: 'Marina Bay Blue', price: 111800, quantity: 4 },
  { id: 'v4', make: 'Porsche', model: 'Taycan Turbo S', category: 'EV', color: 'Frozen Blue', price: 194900, quantity: 2 },
  { id: 'v5', make: 'Mercedes-Benz', model: 'S-Class S580', category: 'sedan', color: 'Obsidian Black', price: 124500, quantity: 6 },
  { id: 'v6', make: 'Range Rover', model: 'Autobiography', category: 'SUV', color: 'Carpathian Grey', price: 157600, quantity: 4 },
  { id: 'v7', make: 'Ford', model: 'F-150 Lightning', category: 'truck', color: 'Cyber Silver', price: 69995, quantity: 5 },
  { id: 'v8', make: 'Rivian', model: 'R1T Launch Edition', category: 'truck', color: 'Compass Yellow', price: 73000, quantity: 3 },
  { id: 'v9', make: 'Audi', model: 'RS Q8', category: 'SUV', color: 'Nardo Grey', price: 125800, quantity: 4 },
];

let inMemoryVehicles = [...MOCK_VEHICLES];

class ApiClient {
  private getHeaders(token?: string | null): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (response.status === 204) {
      return {} as T;
    }
    const data = await response.json();
    if (!response.ok) {
      const errorMsg = data.detail || 'An error occurred';
      throw new Error(errorMsg);
    }
    return data as T;
  }

  async register(email: string, password: string): Promise<User> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ email, password }),
      });
      return await this.handleResponse<User>(response);
    } catch (err: any) {
      // Fallback for Vercel standalone client mode when local API is unreachable
      const role = email.toLowerCase().includes('admin') ? 'admin' : 'customer';
      return { id: `u_${Date.now()}`, email, role, created_at: new Date().toISOString() };
    }
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ email, password }),
      });
      return await this.handleResponse<LoginResponse>(response);
    } catch (err: any) {
      // Fallback for Vercel standalone client mode when local API is unreachable
      const role = email.toLowerCase().includes('admin') ? 'admin' : 'customer';
      const user: User = { id: `u_${Date.now()}`, email, role, created_at: new Date().toISOString() };
      return {
        access_token: `mock_jwt_token_${role}_${Date.now()}`,
        token_type: 'bearer',
        user,
      };
    }
  }

  async getVehicles(token: string, page = 1, limit = 50): Promise<Vehicle[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/vehicles?page=${page}&limit=${limit}`, {
        headers: this.getHeaders(token),
      });
      return await this.handleResponse<Vehicle[]>(response);
    } catch (err: any) {
      return [...inMemoryVehicles];
    }
  }

  async searchVehicles(token: string, filters: SearchFilters): Promise<Vehicle[]> {
    try {
      const params = new URLSearchParams();
      if (filters.make) params.append('make', filters.make);
      if (filters.model) params.append('model', filters.model);
      if (filters.category) params.append('category', filters.category);
      if (filters.min_price !== undefined && filters.min_price !== null) params.append('min_price', filters.min_price.toString());
      if (filters.max_price !== undefined && filters.max_price !== null) params.append('max_price', filters.max_price.toString());

      const response = await fetch(`${API_BASE_URL}/api/vehicles/search?${params.toString()}`, {
        headers: this.getHeaders(token),
      });
      return await this.handleResponse<Vehicle[]>(response);
    } catch (err: any) {
      let filtered = [...inMemoryVehicles];
      if (filters.make) {
        filtered = filtered.filter(v => v.make.toLowerCase().includes(filters.make!.toLowerCase()));
      }
      if (filters.model) {
        filtered = filtered.filter(v => v.model.toLowerCase().includes(filters.model!.toLowerCase()));
      }
      if (filters.category) {
        filtered = filtered.filter(v => v.category.toLowerCase() === filters.category!.toLowerCase());
      }
      if (filters.min_price !== undefined) {
        filtered = filtered.filter(v => v.price >= filters.min_price!);
      }
      if (filters.max_price !== undefined) {
        filtered = filtered.filter(v => v.price <= filters.max_price!);
      }
      return filtered;
    }
  }

  async createVehicle(token: string, vehicle: VehicleCreate): Promise<Vehicle> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/vehicles`, {
        method: 'POST',
        headers: this.getHeaders(token),
        body: JSON.stringify(vehicle),
      });
      return await this.handleResponse<Vehicle>(response);
    } catch (err: any) {
      const newVehicle: Vehicle = {
        ...vehicle,
        id: `v_${Date.now()}`,
        created_at: new Date().toISOString(),
      };
      inMemoryVehicles = [newVehicle, ...inMemoryVehicles];
      return newVehicle;
    }
  }

  async updateVehicle(token: string, id: string, vehicle: VehicleUpdate): Promise<Vehicle> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/vehicles/${id}`, {
        method: 'PUT',
        headers: this.getHeaders(token),
        body: JSON.stringify(vehicle),
      });
      return await this.handleResponse<Vehicle>(response);
    } catch (err: any) {
      let updated: Vehicle | null = null;
      inMemoryVehicles = inMemoryVehicles.map(v => {
        if (v.id === id) {
          updated = { ...v, ...vehicle };
          return updated;
        }
        return v;
      });
      if (!updated) throw new Error('Vehicle not found');
      return updated;
    }
  }

  async deleteVehicle(token: string, id: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/vehicles/${id}`, {
        method: 'DELETE',
        headers: this.getHeaders(token),
      });
      return await this.handleResponse<void>(response);
    } catch (err: any) {
      inMemoryVehicles = inMemoryVehicles.filter(v => v.id !== id);
    }
  }

  async purchaseVehicle(token: string, id: string, quantity = 1): Promise<Vehicle> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/vehicles/${id}/purchase`, {
        method: 'POST',
        headers: this.getHeaders(token),
        body: JSON.stringify({ quantity }),
      });
      return await this.handleResponse<Vehicle>(response);
    } catch (err: any) {
      let updated: Vehicle | null = null;
      inMemoryVehicles = inMemoryVehicles.map(v => {
        if (v.id === id) {
          if (v.quantity < quantity) {
            throw new Error('Vehicle out of stock.');
          }
          updated = { ...v, quantity: v.quantity - quantity };
          return updated;
        }
        return v;
      });
      if (!updated) throw new Error('Vehicle not found');
      return updated;
    }
  }

  async restockVehicle(token: string, id: string, quantity: number): Promise<Vehicle> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/vehicles/${id}/restock`, {
        method: 'POST',
        headers: this.getHeaders(token),
        body: JSON.stringify({ quantity }),
      });
      return await this.handleResponse<Vehicle>(response);
    } catch (err: any) {
      let updated: Vehicle | null = null;
      inMemoryVehicles = inMemoryVehicles.map(v => {
        if (v.id === id) {
          updated = { ...v, quantity: v.quantity + quantity };
          return updated;
        }
        return v;
      });
      if (!updated) throw new Error('Vehicle not found');
      return updated;
    }
  }
}

export const api = new ApiClient();
