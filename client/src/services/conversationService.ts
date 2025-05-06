import axios from 'axios';
import type { Conversation, Message } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const fetchConversations = async (): Promise<Conversation[]> => {
  try {
    const response = await axios.get<Conversation[]>(`${API_URL}/conversations`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to fetch conversations');
    }
    throw new Error('Network error occurred');
  }
};

export const fetchConversation = async (id: string): Promise<Conversation> => {
  try {
    const response = await axios.get<Conversation>(`${API_URL}/conversations/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to fetch conversation');
    }
    throw new Error('Network error occurred');
  }
};

export const createConversation = async (): Promise<Conversation> => {
  try {
    const response = await axios.post<Conversation>(`${API_URL}/conversations`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to create conversation');
    }
    throw new Error('Network error occurred');
  }
};

export const sendMessage = async (
  conversationId: string, 
  content: string
): Promise<{ userMessage: Message; aiMessage: Message }> => {
  try {
    const response = await axios.post<{ userMessage: Message; aiMessage: Message }>(
      `${API_URL}/conversations/${conversationId}/messages`,
      { content }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to send message');
    }
    throw new Error('Network error occurred');
  }
};