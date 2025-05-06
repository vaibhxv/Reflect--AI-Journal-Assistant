import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthState, LoginCredentials, RegisterCredentials } from '../types';
import { loginUser, registerUser, logoutUser } from '../services/authService';

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const useAuthStore = create<
  AuthState & {
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (credentials: RegisterCredentials) => Promise<void>;
    logout: () => Promise<void>;
    clearError: () => void;
  }
>()(
  persist(
    (set) => ({
      ...initialState,
      
      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const { user, token } = await loginUser(credentials);
          set({ 
            user, 
            token, 
            isAuthenticated: true, 
            isLoading: false 
          });
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'Login failed' 
          });
        }
      },
      
      register: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const { user, token } = await registerUser(credentials);
          set({ 
            user, 
            token, 
            isAuthenticated: true, 
            isLoading: false 
          });
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'Registration failed' 
          });
        }
      },
      
      logout: async () => {
        set({ isLoading: true });
        try {
          await logoutUser();
          set({ ...initialState, isLoading: false });
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'Logout failed' 
          });
        }
      },
      
      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, token: state.token, isAuthenticated: state.isAuthenticated }),
    }
  )
);