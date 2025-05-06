import { create } from 'zustand';
import type { ConversationState, Message } from '../types';
import { 
  fetchConversations, 
  fetchConversation, 
  createConversation,
  sendMessage 
} from '../services/conversationService';

const initialState: ConversationState = {
  conversations: [],
  currentConversation: null,
  isLoading: false,
  error: null,
};

export const useConversationStore = create<
  ConversationState & {
    getConversations: () => Promise<void>;
    getConversation: (id: string) => Promise<void>;
    startNewConversation: () => Promise<void>;
    sendUserMessage: (content: string) => Promise<void>;
    sendGuidedPrompt: (promptType: 'summarize' | 'motivate' | 'improve') => Promise<void>;
    clearCurrentConversation: () => void;
    clearError: () => void;
  }
>((set, get) => ({
  ...initialState,
  
  getConversations: async () => {
    set({ isLoading: true, error: null });
    try {
      const conversations = await fetchConversations();
      set({ conversations, isLoading: false });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch conversations' 
      });
    }
  },
  
  getConversation: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const conversation = await fetchConversation(id);
      set({ currentConversation: conversation, isLoading: false });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch conversation' 
      });
    }
  },
  
  startNewConversation: async () => {
    set({ isLoading: true, error: null });
    try {
      const conversation = await createConversation();
      set({ 
        currentConversation: conversation, 
        conversations: [conversation, ...get().conversations], 
        isLoading: false 
      });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to create conversation' 
      });
    }
  },
  
  sendUserMessage: async (content) => {
    if (!get().currentConversation) {
      await get().startNewConversation();
    }
    
    const conversationId = get().currentConversation?._id;
    if (!conversationId) return;
    
    // Optimistically update UI
    const tempId = Date.now().toString();
    const tempMessage: Message = {
      id: tempId,
      content,
      sender: 'user',
      createdAt: new Date().toISOString(),
    };
    
    set(state => ({
      currentConversation: state.currentConversation 
        ? {
            ...state.currentConversation,
            messages: [...state.currentConversation.messages, tempMessage],
          }
        : null
    }));
    
    try {
      const { userMessage, aiMessage } = await sendMessage(conversationId, content);
      
      // Replace temp message with actual message and add AI response
      set(state => ({
        currentConversation: state.currentConversation 
          ? {
              ...state.currentConversation,
              messages: [
                ...state.currentConversation.messages.filter(m => m.id !== tempId),
                userMessage,
                aiMessage
              ],
            }
          : null
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to send message' 
      });
    }
  },
  
  sendGuidedPrompt: async (promptType) => {
    let promptContent = '';
    
    switch (promptType) {
      case 'summarize':
        promptContent = 'Can you summarize my day based on what we\'ve discussed so far?';
        break;
      case 'motivate':
        promptContent = 'Can you give me some motivation for tomorrow?';
        break;
      case 'improve':
        promptContent = 'What can I improve this week based on our conversations?';
        break;
    }
    
    await get().sendUserMessage(promptContent);
  },
  
  clearCurrentConversation: () => {
    set({ currentConversation: null });
  },
  
  clearError: () => set({ error: null }),
}));