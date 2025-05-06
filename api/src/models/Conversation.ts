import mongoose, { Schema } from 'mongoose';
import { ConversationDocument } from '../types';

const ConversationSchema = new Schema<ConversationDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      default: 'New Journal Entry',
    },
    messages: [
      {
        content: {
          type: String,
          required: true,
        },
        mood: {
          type: String,
          required: false,
        },
        sender: {
          type: String,
          enum: ['user', 'ai'],
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ConversationDocument>('Conversation', ConversationSchema);