import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import type { Conversation } from '../../types';
import { PlusCircle } from 'lucide-react';

interface ConversationListProps {
  conversations: Conversation[];
  currentConversationId?: string;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  isLoading: boolean;
}

const ConversationList: React.FC<ConversationListProps> = ({ 
  conversations, 
  currentConversationId, 
  onSelectConversation,
  onNewConversation,
  isLoading
}) => {
  // Animation variants for list items
  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3
      }
    })
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-[#e2e8f0]">
        <button
          onClick={onNewConversation}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white py-2 px-4 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <PlusCircle size={18} />
          <span>New Journal Entry</span>
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-6 text-[#64748b]">
            <p>No journal entries yet</p>
            <p className="text-sm mt-1">Start by creating a new entry!</p>
          </div>
        ) : (
          <ul className="divide-y divide-[#e2e8f0]">
            {conversations.map((conversation, i) => {
              // Extract first user message as title or use default
              const firstUserMessage = conversation.messages.find(m => m.sender === 'user');
              const title = firstUserMessage 
                ? firstUserMessage.content.substring(0, 30) + (firstUserMessage.content.length > 30 ? '...' : '')
                : 'New journal entry';
                
              return (
                <motion.li
                  key={conversation._id}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={listItemVariants}
                >
                  <button
                    onClick={() => onSelectConversation(conversation._id)}
                    className={`w-full p-4 text-left transition hover:bg-[#cbd5e1] ${
                      conversation._id === currentConversationId ? 'bg-[#f1f5f9]' : ''
                    }`}
                  >
                    <h3 className="text-sm font-medium text-[#0f172a] line-clamp-1">
                      {title}
                    </h3>
                    <p className="text-xs text-[#64748b] mt-1">
                      {format(new Date(conversation.updatedAt), 'MMM d, yyyy • h:mm a')}
                    </p>
                  </button>
                </motion.li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ConversationList;