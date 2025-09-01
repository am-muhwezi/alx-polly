// User types
export interface User {
  id: string;
  email: string;
  username: string;
  name?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthUser extends User {
  isAuthenticated: boolean;
}

// Poll types
export interface PollOption {
  id: string;
  text: string;
  votes: number;
  pollId: string;
}

export interface Poll {
  id: string;
  title: string;
  description?: string;
  options: PollOption[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  endsAt?: Date;
  isActive: boolean;
  allowMultipleChoices: boolean;
  requireAuth: boolean;
  totalVotes: number;
}

export interface CreatePollData {
  title: string;
  description?: string;
  options: string[];
  endsAt?: Date;
  allowMultipleChoices: boolean;
  requireAuth: boolean;
}

export interface UpdatePollData {
  title?: string;
  description?: string;
  endsAt?: Date;
  isActive?: boolean;
}

// Vote types
export interface Vote {
  id: string;
  pollId: string;
  optionId: string;
  userId?: string;
  sessionId?: string;
  createdAt: Date;
}

export interface VoteData {
  pollId: string;
  optionIds: string[];
}

// Auth types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  username: string;
  password: string;
  name?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Form types
export interface FormState {
  isLoading: boolean;
  error?: string;
  success?: string;
}

// Dashboard types
export interface DashboardStats {
  totalPolls: number;
  totalVotes: number;
  activePolls: number;
  recentPolls: Poll[];
}
