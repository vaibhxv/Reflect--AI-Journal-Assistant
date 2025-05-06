import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Conversation } from '../../types';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import { Bot } from 'lucide-react';

interface ConversationPanelProps {
  conversation: Conversation | null;
  onSendMessage: (content: string) => Promise<void>;
  onPromptSelect: (promptType: 'summarize' | 'motivate' | 'improve') => Promise<void>;
  isLoading: boolean;
}

const ConversationPanel: React.FC<ConversationPanelProps> = ({
  conversation,
  onSendMessage,
  onPromptSelect,
  isLoading,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversation?.messages]);

  // Welcome animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  if (!conversation) {
    return (
      <div className="flex flex-col h-full">
        <motion.div 
          className="flex-1 flex flex-col items-center justify-center p-6 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="w-16 h-16 bg-[#dbeafe] rounded-full flex items-center justify-center text-[#2563eb] mb-4"
            variants={itemVariants}
          >
            <Bot size={32} />
          </motion.div>
          <motion.h2 
            className="text-2xl font-heading font-semibold text-[#1e293b] mb-2"
            variants={itemVariants}
          >
            Welcome to your AI Journal
          </motion.h2>
          <motion.p 
            className="text-[#475569] max-w-md"
            variants={itemVariants}
          >
            Start a new journal entry to reflect on your day with the help of your AI assistant.
          </motion.p>
        </motion.div>
        
        <div className="border-t border-[#e2e8f0]">
          <MessageInput 
            onSendMessage={onSendMessage} 
            onPromptSelect={onPromptSelect}
            isLoading={isLoading} 
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        {conversation.messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <h3 className="text-lg font-medium text-[#1e293b] mb-2">New Journal Entry</h3>
            <p className="text-[#475569]">Write about your day and get AI-powered reflections.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {conversation.messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      
      <MessageInput 
        onSendMessage={onSendMessage} 
        onPromptSelect={onPromptSelect}
        isLoading={isLoading} 
      />
    </div>
  );
};

export default ConversationPanel;