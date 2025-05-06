import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest, JwtPayload } from '../types';

const protect = (req: AuthRequest, res: Response, next: NextFunction) => {
  let token;
  
  // Check for token in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  
  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
  
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallbacksecret') as JwtPayload;
    
    // Set the user ID in the request
    req.user = { id: decoded.id };
    
    next();
  } catch (error) {
    console.error('Auth token error:', error);
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

export { protect };