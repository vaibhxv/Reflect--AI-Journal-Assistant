import { Request } from 'express';
import mongoose, { Document, Types } from 'mongoose';

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface ConversationDocument extends Document {
  userId: Types.ObjectId;
  title: string;
  messages: {
    _id: Types.ObjectId;
    content: string;
    mood?: string;
    sender: 'user' | 'ai';
    createdAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthRequest extends Request {
  headers: Request['headers'];
  params: {
    [key: string]: string;
  };
  body: {
    [key: string]: any;
    content?: string;
  };
  user?: {
    id: string;
  };
}

export interface JwtPayload {
  id: string;
  iat?: number;
  exp?: number;
}