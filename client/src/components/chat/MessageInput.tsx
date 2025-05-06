import React, { useState, useRef, useEffect } from 'react';
import { Send, Plus, Sun, Moon, Coffee, Zap, Brain, ThumbsUp, ThumbsDown } from 'lucide-react';
import Button from '../ui/Button';

interface MessageInputProps {
  onSendMessage: (message: string, mood?: string) => void;
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
  const [showMoodSelector, setShowMoodSelector] = useState(false);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const promptsRef = useRef<HTMLDivElement>(null);
  
  const moods = [
    { icon: Sun, label: 'Happy', color: 'text-yellow-500' },
    { icon: Coffee, label: 'Tired', color: 'text-orange-500' },
    { icon: Zap, label: 'Energetic', color: 'text-blue-500' },
    { icon: Brain, label: 'Focused', color: 'text-purple-500' },
    { icon: ThumbsUp, label: 'Great', color: 'text-green-500' },
    { icon: ThumbsDown, label: 'Stressed', color: 'text-red-500' },
    { icon: Moon, label: 'Calm', color: 'text-indigo-500' },
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message, selectedMood || undefined);
      setMessage('');
      setSelectedMood(null);
    }
  };
  
  const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (promptsRef.current && !promptsRef.current.contains(event.target as Node)) {
        setShowPrompts(false);
        setShowMoodSelector(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="border-t border-[#e2e8f0] bg-white p-4">
      {/* Quick Prompt Buttons */}
      <div className="flex gap-2 mb-4">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onPromptSelect('summarize')}
          className="text-sm"
        >
          Summarize my day
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onPromptSelect('motivate')}
          className="text-sm"
        >
          Motivate me
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onPromptSelect('improve')}
          className="text-sm"
        >
          What to improve?
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        <div className="relative" ref={promptsRef}>
          <Button 
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowMoodSelector(!showMoodSelector)}
            className={`text-[#64748b] hover:text-[#2563eb] ${selectedMood ? 'bg-[#eff6ff]50' : ''}`}
          >
            <Plus size={20} />
          </Button>
          
          {showMoodSelector && (
            <div className="absolute bottom-full left-0 mb-2 w-48 rounded-lg bg-white shadow-lg border border-[#e2e8f0] overflow-hidden z-10">
              <div className="p-2 text-sm font-medium text-[#334155] border-b">
                How are you feeling?
              </div>
              <div className="p-2 grid grid-cols-2 gap-1">
                {moods.map((mood) => (
                  <button
                    key={mood.label}
                    type="button"
                    className={`flex items-center gap-2 p-2 rounded-md text-sm transition ${
                      selectedMood === mood.label
                        ? 'bg-[#eff6ff]50 text-[#2563eb]'
                        : 'hover:bg-[#f8fafc]50'
                    }`}
                    onClick={() => {
                      setSelectedMood(mood.label);
                      setShowMoodSelector(false);
                    }}
                  >
                    <mood.icon className={`${mood.color}`} size={16} />
                    <span>{mood.label}</span>
                  </button>
                ))}
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