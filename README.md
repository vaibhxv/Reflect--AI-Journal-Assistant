# JournalMind 🧠

> Your AI-powered journaling companion for meaningful daily reflections.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

## 📝 Overview

JournalMind is a personal journaling application built on the MERN stack (MongoDB, Express.js, React.js, Node.js) that leverages Google's Gemini API to provide an AI-powered journaling experience. Users can have meaningful conversations with an AI assistant that helps them document and reflect on their daily experiences, challenges, and achievements.

## ✨ Features

- **User Authentication**
  - Secure signup/login process using JWT
  - Protected routes and user-specific content

- **Intuitive Chat Interface**
  - Clean, responsive 2-column layout
  - Real-time messaging experience
  - Markdown support for rich text formatting

- **AI-Powered Journaling**
  - Empathetic and constructive AI responses via Gemini API
  - Special commands for deeper reflection:
    - "Summarize my day" - Get an AI-generated summary of your entries
    - "Give me motivation for tomorrow" - Receive personalized encouragement
    - "What can I improve this week?" - Get constructive feedback based on your entries

- **Comprehensive Chat History**
  - All conversations stored securely in MongoDB
  - Easy access to past journal entries

## 🚀 Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- MongoDB (local instance or MongoDB Atlas)
- Google Cloud account (for Gemini API access)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/vaibhxv/Reflect--AI-Journal-Assistant.git
cd Reflect--AI-Journal-Assistant
```

2. **Install dependencies**

```bash
# Install server dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..
```

3. **Environment Setup**

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Connection
MONGO_URI=your_mongodb_connection_string

# JWT Secret
JWT_SECRET=your_jwt_secret

# Gemini API
GEMINI_API_KEY=your_gemini_api_key
```

4. **Run the application**

```bash
# Run server
npm start

# Run client
npm run dev
```

The application should now be running on `http://localhost:3000`, with the server on `http://localhost:5000`.
