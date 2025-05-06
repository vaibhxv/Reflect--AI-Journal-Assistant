import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu, X, BookOpen, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';

const MainLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuthStore();
  
  const sidebarVariants = {
    closed: {
      x: '-100%',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40
      }
    }
  };
  
  const overlayVariants = {
    closed: { opacity: 0, pointerEvents: 'none' as const },
    open: { opacity: 0.5, pointerEvents: 'auto' as const }
  };
  
  return (
    <div className={`min-h-screen`}>
      <div className="bg-white :bg-[#0f172a] min-h-screen">
        {/* Header */}
        <header className="border-b border-[#e2e8f0] :border-[#1e293b] bg-white :bg-[#0f172a] z-10 relative">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="mr-3 md:hidden text-[#334155] :text-[#cbd5e1] hover:text-[#2563eb] :hover:text-[#60a5fa]"
              >
                <Menu size={24} />
              </button>
              <div className="flex items-center">
                <BookOpen className="text-[#2563eb] :text-[#60a5fa] mr-2" size={24} />
                <h1 className="text-xl font-heading font-semibold text-[#0f172a] :text-white">Reflect</h1>
              </div>
            </div>
            
            <div className="flex items-center gap-2">              
              {user && (
                <button
                  onClick={() => logout()}
                  className="p-2 rounded-full hover:bg-[#f1f5f9] :hover:bg-[#1e293b] text-[#334155] :text-[#cbd5e1]"
                >
                  <LogOut size={20} />
                </button>
              )}
            </div>
          </div>
        </header>
        
        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              className="fixed inset-0 bg-black z-20 md:hidden"
              initial="closed"
              animate="open"
              exit="closed"
              variants={overlayVariants}
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </AnimatePresence>
        
        {/* Mobile Sidebar */}
        <motion.div
          className="fixed top-0 left-0 bottom-0 w-64 bg-white :bg-[#0f172a] z-30 md:hidden border-r border-[#e2e8f0] :border-[#1e293b]"
          initial="closed"
          animate={sidebarOpen ? 'open' : 'closed'}
          variants={sidebarVariants}
        >
          <div className="p-4 border-b border-[#e2e8f0] :border-[#1e293b] flex items-center justify-between">
            <div className="flex items-center">
              <BookOpen className="text-[#2563eb] :text-[#60a5fa] mr-2" size={20} />
              <h1 className="text-lg font-heading font-semibold text-[#0f172a] :text-white">Reflect</h1>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-[#64748b] :text-[#94a3b8] hover:text-[#334155] :hover:text-[#e2e8f0]"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="p-4">
            {user && (
              <div className="px-4 py-3 bg-[#f1f5f9] :bg-[#1e293b] rounded-lg">
                <p className="text-sm font-medium text-[#0f172a] :text-white">
                  {user.name}
                </p>
                <p className="text-xs text-[#64748b] :text-[#94a3b8]">
                  {user.email}
                </p>
              </div>
            )}
          </div>
        </motion.div>
        
        {/* Main Content */}
        <div className="container mx-auto px-4 py-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;