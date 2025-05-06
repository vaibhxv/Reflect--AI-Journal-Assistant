import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export const generateAIResponse = async (userMessage: string, conversationHistory: { content: string; sender: string }[]): Promise<string> => {
  try {
    // Use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    
    // Create chat history from the conversation
    const chatHistory = conversationHistory.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));
    
    // Start a chat session
    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
      },
    });
    
    // Generate a response based on the user's message and system prompt
    const systemPrompt = `You are a thoughtful, empathetic AI journaling assistant.
    Your goal is to help the user reflect on their day and gain insights.
    Respond in a warm, supportive manner, showing understanding and asking
    follow-up questions that encourage deeper reflection.
    
    If the user asks you to "summarize my day", provide a thoughtful summary based on their journal entries.
    If they ask for "motivation for tomorrow", provide encouragement and perspective.
    If they ask "what can I improve", offer constructive feedback based on patterns you've noticed.
    
    Always focus on being helpful, empathetic, and concise in your responses.`;
    
    // Send the system prompt and user message to the model
    const result = await chat.sendMessage(`${systemPrompt}\n\nUser message: ${userMessage}`);
    const response = result.response.text();
    
    return response;
  } catch (error) {
    console.error('Error generating AI response:', error);
    return 'I apologize, but I encountered an issue while processing your message. Please try again later.';
  }
};