# Personal Portfolio with MongoDB Backend

This is a personal portfolio website built with Next.js and MongoDB. It includes features like contact form submission and a real-time chat system.

## Features

- Modern UI with Tailwind CSS and Framer Motion animations
- Real-time chat functionality with Socket.io
- Contact form with MongoDB storage
- Responsive design for all devices

## Tech Stack

### Frontend
- Next.js 13
- React
- Tailwind CSS
- Framer Motion for animations
- Socket.io client for real-time communication

### Backend
- Express.js
- MongoDB with Mongoose
- Socket.io for real-time chat
- RESTful API architecture

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the root directory with the following variables:
     ```
     MONGODB_URI=your_mongodb_connection_string
     PORT=5000
     ```
   - Create a `.env.local` file in the root directory with:
     ```
     NEXT_PUBLIC_API_URL=http://localhost:5000
     ```

### Running the Application

1. Start the development server:
   ```bash
   npm run dev:full
   ```
   This will start both the Next.js frontend and Express backend concurrently.

2. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
# Build the Next.js frontend
npm run build

# Start the production server
npm run start
```

## Project Structure

```
/
├── app/                  # Next.js pages and components
├── components/           # Reusable UI components
├── lib/                  # Utility functions and API services
├── models/               # MongoDB models
├── public/               # Static assets
├── server.js             # Express backend server
├── .env                  # Backend environment variables
└── .env.local            # Frontend environment variables
```

## API Endpoints

### Contact API
- `POST /api/contact` - Submit a contact form message

### Chat API
- `GET /api/chat/:roomId` - Get all messages for a specific chat room
- `POST /api/chat` - Send a new chat message

## Socket.io Events

- `join-room` - Join a specific chat room
- `send-message` - Send a message to a room
- `receive-message` - Receive a message in a room

## License

This project is licensed under the MIT License.