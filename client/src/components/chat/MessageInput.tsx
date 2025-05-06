import React, { useState, useRef, useEffect } from 'react';
import { Send, Plus } from 'lucide-react';
import Button from '../ui/Button';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  onPromptSelect: (promptType: 'summarize' | 'motivate' | 'improve') => void;
  isLoading: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ 
  onSendMessage, 
  onPromptSelect,
  isLoading 
}) => {
  const [message, setMessage] = useState('');
  const [showPrompts, setShowPrompts] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const promptsRef = useRef<HTMLDivElement>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };
  
  const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  
  // Auto-resize textarea as content grows
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);
  
  // Close prompts dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (promptsRef.current && !promptsRef.current.contains(event.target as Node)) {
        setShowPrompts(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handlePromptClick = (promptType: 'summarize' | 'motivate' | 'improve') => {
    onPromptSelect(promptType);
    setShowPrompts(false);
  };

  return (
    <div className="border-t border-[#e2e8f0] bg-white p-4">
      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        <div className="relative" ref={promptsRef}>
          <Button 
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowPrompts(!showPrompts)}
            className="text-[#64748b] hover:text-[#2563eb]"
          >
            <Plus size={20} />
          </Button>
          
          {showPrompts && (
            <div className="absolute bottom-full left-0 mb-2 w-60 rounded-lg bg-white shadow-lg border border-[#e2e8f0] overflow-hidden z-10">
              <div className="p-2 text-sm font-medium text-[#334155] border-b">
                AI Prompts
              </div>
              <div className="flex flex-col">
                <button
                  type="button"
                  className="p-3 text-left hover:bg-[#f1f5f9] text-sm transition"
                  onClick={() => handlePromptClick('summarize')}
                >
                  <div className="font-medium">Summarize my day</div>
                  <div className="text-xs text-[#64748b]">Get a summary of today's journal</div>
                </button>
                <button
                  type="button"
                  className="p-3 text-left hover:bg-[#f1f5f9] text-sm transition"
                  onClick={() => handlePromptClick('motivate')}
                >
                  <div className="font-medium">Give me motivation</div>
                  <div className="text-xs text-[#64748b]">Get motivated for tomorrow</div>
                </button>
                <button
                  type="button"
                  className="p-3 text-left hover:bg-[#f1f5f9] text-sm transition"
                  onClick={() => handlePromptClick('improve')}
                >
                  <div className="font-medium">What can I improve?</div>
                  <div className="text-xs text-[#64748b]">Get improvement suggestions</div>
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex-grow">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleTextareaKeyDown}
            placeholder="Write your journal entry..."
            className="w-full rounded-lg border border-[#cbd5e1] p-3 focus:border-[#3b82f6] focus:ring focus:ring-[#bfdbfe] focus:ring-opacity-50 resize-none overflow-hidden min-h-[44px] max-h-[200px] transition-all"
            rows={1}
            disabled={isLoading}
          />
        </div>
        
        <Button
          type="submit"
          disabled={!message.trim() || isLoading}
          variant="primary"
          size="md"
          isLoading={isLoading}
          className="rounded-full w-10 h-10 p-0 flex items-center justify-center"
        >
          <Send size={18} />
        </Button>
      </form>
    </div>
  );
};

export default MessageInput;