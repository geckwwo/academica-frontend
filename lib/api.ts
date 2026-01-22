const API_BASE = 'http://localhost:8000/api';

interface TokenResponse {
  access: string;
  refresh: string;
}

interface RegisterData {
  email: string;
  username: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface ProfileData {
  full_name?: string;
  country?: string;
  city?: string;
  university?: string;
  level?: 'school' | 'bachelor' | 'master';
  bio?: string;
}

interface Opportunity {
  id: number;
  title: string;
  description: string;
  requirements?: string;
  category: 'internship' | 'grant' | 'hackathon' | 'job' | 'mentor' | 'event';
  deadline: string;
  country: string;
  city?: string;
  source_url?: string;
  trust_status: 'official' | 'trusted' | 'unverified';
  moderation_status: 'pending' | 'approved' | 'rejected';
  created_by: number;
  created_at: string;
}

interface User {
  id: number;
  email: string;
  username: string;
  role: 'user' | 'publisher' | 'moderator' | 'admin';
}

class ApiService {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  constructor() {
    this.accessToken = localStorage.getItem('access_token');
    this.refreshToken = localStorage.getItem('refresh_token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    allowPublic = false
  ): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.accessToken) {
      (headers as Record<string, string>)['Authorization'] = `Bearer ${this.accessToken}`;
    }

    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
    });

    if (response.status === 401 && this.refreshToken && !allowPublic) {
      const refreshed = await this.refreshTokens();
      if (refreshed) {
        (headers as Record<string, string>)['Authorization'] = `Bearer ${this.accessToken}`;
        const retryResponse = await fetch(`${API_BASE}${endpoint}`, {
          ...options,
          headers,
        });
        if (!retryResponse.ok) {
          throw new Error(`API Error: ${retryResponse.status}`);
        }
        return retryResponse.json();
      }
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.detail || `API Error: ${response.status}`);
    }

    return response.json();
  }

  private async refreshTokens(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE}/auth/refresh/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh: this.refreshToken }),
      });

      if (response.ok) {
        const data: TokenResponse = await response.json();
        this.setTokens(data.access, this.refreshToken!);
        return true;
      }
    } catch {
      // Refresh failed
    }
    this.clearTokens();
    return false;
  }

  setTokens(access: string, refresh: string) {
    this.accessToken = access;
    this.refreshToken = refresh;
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
  }

  clearTokens() {
    this.accessToken = null;
    this.refreshToken = null;
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  isAuthenticated(): boolean {
    return !!this.accessToken;
  }

  async login(data: LoginData): Promise<TokenResponse> {
    const response = await this.request<TokenResponse>('/auth/login/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    this.setTokens(response.access, response.refresh);
    return response;
  }

  async register(data: RegisterData): Promise<{ id: number; email: string; username: string }> {
    return this.request('/auth/register/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getProfile(): Promise<ProfileData> {
    return this.request('/auth/me/profile');
  }

  async updateProfile(data: ProfileData): Promise<ProfileData> {
    return this.request('/auth/me/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async getOpportunities(category?: string): Promise<Opportunity[]> {
    const params = category ? `?category=${category}` : '';
    return this.request<Opportunity[]>(`/opportunities/${params}`, {}, true);
  }

  async getOpportunity(id: number): Promise<Opportunity> {
    return this.request<Opportunity>(`/opportunities/${id}/`, {}, true);
  }

  async createOpportunity(data: Partial<Opportunity>): Promise<Opportunity> {
    return this.request<Opportunity>('/opportunities/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  logout() {
    this.clearTokens();
  }
}

export const api = new ApiService();
export type { TokenResponse, RegisterData, LoginData, ProfileData, Opportunity, User };
