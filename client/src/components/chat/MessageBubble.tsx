import React from 'react';
import { motion } from 'framer-motion';
import type { Message } from '../../types';
import { formatDistanceToNow } from 'date-fns';
import { Sun, Coffee, Zap, Brain, ThumbsUp, ThumbsDown, Moon } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  console.log('MessageBubble', {message})
  const isUser = message.sender === 'user';
  
  const moodIcons = {
    'Happy': { icon: Sun, color: 'text-yellow-500' },
    'Tired': { icon: Coffee, color: 'text-orange-500' },
    'Energetic': { icon: Zap, color: 'text-blue-500' },
    'Focused': { icon: Brain, color: 'text-purple-500' },
    'Great': { icon: ThumbsUp, color: 'text-green-500' },
    'Stressed': { icon: ThumbsDown, color: 'text-red-500' },
    'Calm': { icon: Moon, color: 'text-indigo-500' },
  };
  
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
            ? 'bg-[#2563eb] text-white rounded-tr-none'
            : 'bg-[#e2e8f0] text-[#1e293b] rounded-tl-none'
        }`}
      >
        {isUser && message.mood && moodIcons[message.mood as keyof typeof moodIcons] && (
          <div className="flex items-center gap-1 mb-1">
            {React.createElement(moodIcons[message.mood as keyof typeof moodIcons].icon, {
              size: 16,
              className: `${moodIcons[message.mood as keyof typeof moodIcons].color} opacity-50`
            })}
            <span className="text-xs opacity-50">{message.mood}</span>
          </div>
        )}
        <p className="text-sm sm:text-base whitespace-pre-wrap">{message.content}</p>
        <div className={`text-xs mt-1 ${isUser ? 'text-[#bfdbfe]' : 'text-[#64748b]'}`}>
          {formattedTime}
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;