import { ApiResponse } from '../types';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:18080';

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getToken(): string | null {
    return localStorage.getItem('abank_token');
  }

  private async request<T>(path: string, options?: RequestInit): Promise<ApiResponse<T>> {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    const token = this.getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const res = await fetch(`${this.baseUrl}${path}`, { headers, ...options });
    if (!res.ok) {
      if (res.status === 401) {
        localStorage.removeItem('abank_token');
        localStorage.removeItem('abank_user');
      }
      const errorBody = await res.json().catch(() => ({}));
      throw new Error((errorBody as ApiResponse<T>).message || `HTTP ${res.status}`);
    }
    return res.json();
  }

  get<T>(path: string): Promise<ApiResponse<T>> {
    return this.request<T>(path);
  }

  post<T>(path: string, body: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(path, { method: 'POST', body: JSON.stringify(body) });
  }
}

export const api = new ApiClient(API_BASE);
