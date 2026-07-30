import { User, Vehicle, VehicleCreate, VehicleUpdate, LoginResponse, SearchFilters } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

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
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ email, password }),
    });
    return this.handleResponse<User>(response);
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ email, password }),
    });
    return this.handleResponse<LoginResponse>(response);
  }

  async getVehicles(token: string, page = 1, limit = 50): Promise<Vehicle[]> {
    const response = await fetch(`${API_BASE_URL}/api/vehicles?page=${page}&limit=${limit}`, {
      headers: this.getHeaders(token),
    });
    return this.handleResponse<Vehicle[]>(response);
  }

  async searchVehicles(token: string, filters: SearchFilters): Promise<Vehicle[]> {
    const params = new URLSearchParams();
    if (filters.make) params.append('make', filters.make);
    if (filters.model) params.append('model', filters.model);
    if (filters.category) params.append('category', filters.category);
    if (filters.min_price !== undefined && filters.min_price !== null) params.append('min_price', filters.min_price.toString());
    if (filters.max_price !== undefined && filters.max_price !== null) params.append('max_price', filters.max_price.toString());

    const response = await fetch(`${API_BASE_URL}/api/vehicles/search?${params.toString()}`, {
      headers: this.getHeaders(token),
    });
    return this.handleResponse<Vehicle[]>(response);
  }

  async createVehicle(token: string, vehicle: VehicleCreate): Promise<Vehicle> {
    const response = await fetch(`${API_BASE_URL}/api/vehicles`, {
      method: 'POST',
      headers: this.getHeaders(token),
      body: JSON.stringify(vehicle),
    });
    return this.handleResponse<Vehicle>(response);
  }

  async updateVehicle(token: string, id: string, vehicle: VehicleUpdate): Promise<Vehicle> {
    const response = await fetch(`${API_BASE_URL}/api/vehicles/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(token),
      body: JSON.stringify(vehicle),
    });
    return this.handleResponse<Vehicle>(response);
  }

  async deleteVehicle(token: string, id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/vehicles/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(token),
    });
    return this.handleResponse<void>(response);
  }

  async purchaseVehicle(token: string, id: string, quantity = 1): Promise<Vehicle> {
    const response = await fetch(`${API_BASE_URL}/api/vehicles/${id}/purchase`, {
      method: 'POST',
      headers: this.getHeaders(token),
      body: JSON.stringify({ quantity }),
    });
    return this.handleResponse<Vehicle>(response);
  }

  async restockVehicle(token: string, id: string, quantity: number): Promise<Vehicle> {
    const response = await fetch(`${API_BASE_URL}/api/vehicles/${id}/restock`, {
      method: 'POST',
      headers: this.getHeaders(token),
      body: JSON.stringify({ quantity }),
    });
    return this.handleResponse<Vehicle>(response);
  }
}

export const api = new ApiClient();
