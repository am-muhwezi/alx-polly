import { User, AuthUser, LoginCredentials, RegisterCredentials, AuthResponse } from '@/types'
import { api } from './api'

export interface AuthContext {
  user: AuthUser | null
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>
  register: (credentials: RegisterCredentials) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isLoading: boolean
}

const AUTH_TOKEN_KEY = 'auth_token'
const AUTH_USER_KEY = 'auth_user'

export class AuthService {
  private static instance: AuthService
  private user: AuthUser | null = null
  private listeners: Set<(user: AuthUser | null) => void> = new Set()

  private constructor() {
    // Initialize auth state from localStorage if available
    if (typeof window !== 'undefined') {
      this.initializeFromStorage()
    }
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  private initializeFromStorage(): void {
    try {
      const token = localStorage.getItem(AUTH_TOKEN_KEY)
      const userString = localStorage.getItem(AUTH_USER_KEY)

      if (token && userString) {
        const userData = JSON.parse(userString)
        this.user = {
          ...userData,
          isAuthenticated: true,
        }
      }
    } catch (error) {
      console.error('Failed to initialize auth from storage:', error)
      this.clearStorage()
    }
  }

  private saveToStorage(user: User, token: string): void {
    try {
      localStorage.setItem(AUTH_TOKEN_KEY, token)
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user))
    } catch (error) {
      console.error('Failed to save auth to storage:', error)
    }
  }

  private clearStorage(): void {
    try {
      localStorage.removeItem(AUTH_TOKEN_KEY)
      localStorage.removeItem(AUTH_USER_KEY)
    } catch (error) {
      console.error('Failed to clear auth storage:', error)
    }
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.user))
  }

  subscribe(listener: (user: AuthUser | null) => void): () => void {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  getCurrentUser(): AuthUser | null {
    return this.user
  }

  getToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(AUTH_TOKEN_KEY)
  }

  async login(credentials: LoginCredentials): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await api.post<AuthResponse>('/auth/login', credentials)

      const authUser: AuthUser = {
        ...response.user,
        isAuthenticated: true,
      }

      this.user = authUser
      this.saveToStorage(response.user, response.token)
      this.notifyListeners()

      return { success: true }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed'
      return { success: false, error: errorMessage }
    }
  }

  async register(credentials: RegisterCredentials): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await api.post<AuthResponse>('/auth/register', credentials)

      const authUser: AuthUser = {
        ...response.user,
        isAuthenticated: true,
      }

      this.user = authUser
      this.saveToStorage(response.user, response.token)
      this.notifyListeners()

      return { success: true }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed'
      return { success: false, error: errorMessage }
    }
  }

  async logout(): Promise<void> {
    try {
      // Call logout endpoint to invalidate token on server
      await api.post('/auth/logout')
    } catch (error) {
      console.error('Logout API call failed:', error)
    } finally {
      // Always clear local state regardless of API call success
      this.user = null
      this.clearStorage()
      this.notifyListeners()
    }
  }

  async refreshToken(): Promise<boolean> {
    try {
      const response = await api.post<AuthResponse>('/auth/refresh')

      const authUser: AuthUser = {
        ...response.user,
        isAuthenticated: true,
      }

      this.user = authUser
      this.saveToStorage(response.user, response.token)
      this.notifyListeners()

      return true
    } catch (error) {
      console.error('Token refresh failed:', error)
      await this.logout()
      return false
    }
  }

  async checkAuth(): Promise<AuthUser | null> {
    if (!this.getToken()) {
      return null
    }

    try {
      const response = await api.get<{ user: User }>('/auth/me')

      const authUser: AuthUser = {
        ...response.user,
        isAuthenticated: true,
      }

      this.user = authUser
      this.notifyListeners()

      return authUser
    } catch (error) {
      console.error('Auth check failed:', error)
      await this.logout()
      return null
    }
  }

  isAuthenticated(): boolean {
    return this.user?.isAuthenticated ?? false
  }

  hasRole(role: string): boolean {
    // Placeholder for role-based access control
    // Implement based on your user model
    return this.isAuthenticated()
  }

  canAccessResource(resourceId: string): boolean {
    // Placeholder for resource-based access control
    // Implement based on your authorization logic
    return this.isAuthenticated()
  }
}

// Export singleton instance
export const authService = AuthService.getInstance()

// Helper functions
export function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    const currentTime = Date.now() / 1000
    return payload.exp < currentTime
  } catch {
    return true
  }
}

export function requireAuth(): AuthUser {
  const user = authService.getCurrentUser()
  if (!user?.isAuthenticated) {
    throw new Error('Authentication required')
  }
  return user
}

export function withAuth<T extends (...args: any[]) => any>(
  handler: (user: AuthUser, ...args: Parameters<T>) => ReturnType<T>
): T {
  return ((...args: Parameters<T>) => {
    const user = requireAuth()
    return handler(user, ...args)
  }) as T
}

// Auth guards for pages
export function redirectToLogin(): never {
  if (typeof window !== 'undefined') {
    window.location.href = '/login'
  }
  throw new Error('Redirecting to login')
}

export function redirectToDashboard(): never {
  if (typeof window !== 'undefined') {
    window.location.href = '/dashboard'
  }
  throw new Error('Redirecting to dashboard')
}
