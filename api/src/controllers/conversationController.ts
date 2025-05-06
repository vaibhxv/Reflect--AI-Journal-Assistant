import { Response } from 'express';
import { AuthRequest } from '../types';
import Conversation from '../models/Conversation';
import { generateAIResponse } from '../services/geminiService';
import mongoose from 'mongoose';

// @desc    Get all conversations for a user
// @route   GET /api/conversations
// @access  Private
export const getConversations = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    const conversations = await Conversation.find({ userId: req.user.id })
      .sort({ updatedAt: -1 });
    
    res.json(conversations);
  } catch (error) {
    console.error('Get conversations error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get a single conversation
// @route   GET /api/conversations/:id
// @access  Private
export const getConversation = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    const conversation = await Conversation.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });
    
    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }
    
    res.json(conversation);
  } catch (error) {
    console.error('Get conversation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a new conversation
// @route   POST /api/conversations
// @access  Private
export const createConversation = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    const conversation = await Conversation.create({
      userId: new mongoose.Types.ObjectId(req.user.id),
      title: 'New Journal Entry',
      messages: [],
    });
    
    res.status(201).json(conversation);
  } catch (error) {
    console.error('Create conversation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Send a message in a conversation
// @route   POST /api/conversations/:id/messages
// @access  Private
export const sendMessage = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    const { content, mood } = req.body;
    
    if (!content) {
      return res.status(400).json({ message: 'Message content is required' });
    }
    
    // Find the conversation
    const conversation = await Conversation.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });
    
    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }
    
    // Add user message
    const userMessage = {
      _id: new mongoose.Types.ObjectId(),
      content,
      mood,
      sender: 'user' as const,
      createdAt: new Date(),
    };
    
    conversation.messages.push(userMessage);
    
    // Generate AI response
    const aiResponse = await generateAIResponse(
      content,
      conversation.messages.map(msg => ({
        content: msg.content,
        sender: msg.sender,
        mood: msg.mood,
      }))
    );
    
    // Add AI message
    const aiMessage = {
      _id: new mongoose.Types.ObjectId(),
      content: aiResponse,
      sender: 'ai' as const,
      createdAt: new Date(),
    };
    
    conversation.messages.push(aiMessage);
    
    // Update title if it's the first message
    if (conversation.messages.length <= 2 && content.length > 0) {
      // Create a title from the first few words of the first message
      const titlePreview = content.substring(0, 30);
      conversation.title = titlePreview + (content.length > 30 ? '...' : '');
    }
    
    await conversation.save();
    
    // Return both messages
    res.json({
      userMessage: {
        id: conversation.messages[conversation.messages.length - 2]._id,
        content,
        mood,
        sender: 'user',
        createdAt: conversation.messages[conversation.messages.length - 2].createdAt,
      },
      aiMessage: {
        id: conversation.messages[conversation.messages.length - 1]._id,
        content: aiResponse,
        sender: 'ai',
        createdAt: conversation.messages[conversation.messages.length - 1].createdAt,
      },
    });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};