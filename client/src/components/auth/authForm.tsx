import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, KeyRound, Mail, AtSign, Eye, EyeOff } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface AuthFormProps {
  type: 'login' | 'register';
  onSubmit: (data: { name?: string; email: string; password: string }) => void;
  isLoading: boolean;
  error: string | null;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit, isLoading, error }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (type === 'login') {
      onSubmit({
        email: formData.email,
        password: formData.password,
      });
    } else {
      onSubmit({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
    }
  };
  
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      className="space-y-4"
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      {type === 'register' && (
        <motion.div variants={itemVariants}>
          <Input
            label="Full Name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            leftIcon={<User size={18} />}
            placeholder="Enter your name"
            required
            fullWidth
          />
        </motion.div>
      )}
      
      <motion.div variants={itemVariants}>
        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          leftIcon={<Mail size={18} />}
          placeholder="Enter your email"
          required
          fullWidth
        />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Input
          label="Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={handleChange}
          leftIcon={<KeyRound size={18} />}
          rightIcon={
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="focus:outline-none"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          }
          placeholder="Enter your password"
          required
          fullWidth
        />
      </motion.div>
      
      {error && (
        <motion.div 
          className="p-3 bg-[#fee2e2] text-[#b91c1c] rounded-md text-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {error}
        </motion.div>
      )}
      
      <motion.div variants={itemVariants}>
        <Button
          type="submit"
          isLoading={isLoading}
          fullWidth
        >
          {type === 'login' ? 'Sign In' : 'Sign Up'}
        </Button>
      </motion.div>
    </motion.form>
  );
};

export default AuthForm;