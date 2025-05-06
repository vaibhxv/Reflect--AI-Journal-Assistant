import React from 'react';
import { motion } from 'framer-motion';
import type { Message } from '../../types';
import { formatDistanceToNow } from 'date-fns';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  const bubbleVariants = {
    hidden: { 
      opacity: 0, 
      y: 10,
      x: isUser ? 10 : -10
    },
    visible: { 
      opacity: 1, 
      y: 0,
      x: 0,
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };
  
  const formattedTime = formatDistanceToNow(
    new Date(message.createdAt),
    { addSuffix: true }
  );

  return (
    <motion.div
      className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
      initial="hidden"
      animate="visible"
      variants={bubbleVariants}
    >
      <div 
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-[#2563eb] text-black rounded-tr-none'
            : 'bg-[#e2e8f0] text-[#1e293b] rounded-tl-none'
        }`}
      >
        <p className="text-sm sm:text-base whitespace-pre-wrap">{message.content}</p>
        <div className={`text-xs mt-1 ${isUser ? 'text-[#bfdbfe]' : 'text-[#64748b]'}`}>
          {formattedTime}
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;