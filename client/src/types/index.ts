export interface User {
  _id: string;
  email: string;
  name?: string;
  createdAt: string;
  updatedAt: string;
}
  
  export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
  }
  
  export interface Message {
    id: string;
    content: string;
    sender: 'user' | 'ai';
    createdAt: string;
    mood?: string;
  }
  
  export interface Conversation {
    _id: string;
    userId: string;
    title: string;
    messages: Message[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  
  export interface ConversationState {
    conversations: Conversation[];
    currentConversation: Conversation | null;
    isLoading: boolean;
    error: string | null;
  }
  
  export interface AuthResponse {
    user: User;
    token: string;
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface RegisterCredentials extends LoginCredentials {
    name?: string;
  }