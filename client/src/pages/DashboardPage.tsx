import React, { useEffect } from 'react';
import { useConversationStore } from '../store/conversationStore';
import ConversationList from '../components/chat/ConversationList';
import ConversationPanel from '../components/chat/ConversationPanel';

const DashboardPage: React.FC = () => {
  const { 
    conversations, 
    currentConversation,
    isLoading,
    getConversations,
    getConversation,
    startNewConversation,
    sendUserMessage,
    sendGuidedPrompt
  } = useConversationStore();
  
  useEffect(() => {
    getConversations();
  }, [getConversations]);
  
  const handleSelectConversation = (id: string) => {
    getConversation(id);
  };
  
  const handleNewConversation = () => {
    startNewConversation();
  };
  
  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-120px)] bg-white rounded-lg shadow-sm overflow-hidden border border-[#e2e8f0]">
      {/* Sidebar */}
      <div className="w-full md:w-80 md:border-r border-[#e2e8f0] md:h-full overflow-hidden">
        <ConversationList
          conversations={conversations}
          currentConversationId={currentConversation?._id}
          onSelectConversation={handleSelectConversation}
          onNewConversation={handleNewConversation}
          isLoading={isLoading}
        />
      </div>
      
      {/* Main chat area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <ConversationPanel 
          conversation={currentConversation}
          onSendMessage={sendUserMessage}
          onPromptSelect={sendGuidedPrompt}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default DashboardPage;