import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import AuthForm from '../components/auth/authForm';
import { useAuthStore } from '../store/authStore';
import type { LoginCredentials } from '../types';

const LoginPage: React.FC = () => {
  const { login, isLoading, error, clearError } = useAuthStore();
  const navigate = useNavigate();
  
  const handleLogin = async (data: LoginCredentials) => {
    clearError();
    await login(data);
    navigate('/dashboard');
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
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

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[#f8fafc]">
      <motion.div 
        className="sm:mx-auto sm:w-full sm:max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="flex justify-center"
          variants={itemVariants}
        >
          <div className="w-12 h-12 rounded-full bg-[#dbeafe] flex items-center justify-center">
            <BookOpen className="text-[#2563eb]" size={24} />
          </div>
        </motion.div>
        
        <motion.h2 
          className="mt-6 text-center text-3xl font-heading font-bold text-[#0f172a]"
          variants={itemVariants}
        >
          Sign in to your account
        </motion.h2>
        
        <motion.p 
          className="mt-2 text-center text-sm text-[#475569]"
          variants={itemVariants}
        >
          Or{' '}
          <Link
            to="/register"
            className="font-medium text-[#2563eb] hover:text-[#3b82f6]"
          >
            create a new account
          </Link>
        </motion.p>
      </motion.div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <AuthForm
            type="login"
            onSubmit={handleLogin}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;