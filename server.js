const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import MongoDB connection utility
const connectDB = require('./lib/mongo');

// Import routes
const contactRoutes = require('./routes/contactRoutes');
const chatRoutes = require('./routes/chatRoutes');
const authRoutes = require('./routes/authRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Allowed origins for CORS
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((o) => o.trim())
  : ['http://localhost:3000'];

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. curl, mobile apps)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin) || process.env.NODE_ENV === 'development') {
      return callback(null, true);
    }
    callback(new Error('Origin not allowed by CORS policy'));
  },
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-auth-token', 'Authorization'],
}));
app.use(express.json());

// Connect to MongoDB
connectDB();

// API Routes
app.use('/api/contact', contactRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/newsletter', newsletterRoutes);

// Socket.io setup for real-time chat
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: allowedOrigins.length === 1 && process.env.NODE_ENV === 'development'
      ? '*'
      : allowedOrigins,
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('A user connected');
  
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  socket.on('send-message', async (messageData) => {
    try {
      const ChatMessage = require('./models/ChatMessage');
      const { user, message, room } = messageData;
      const newMessage = new ChatMessage({ user, message, room: room || 'general' });
      await newMessage.save();
      io.to(messageData.room || 'general').emit('receive-message', newMessage);
    } catch (error) {
      console.error('Error handling socket message:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Serve static files from the 'public' directory if needed
app.use(express.static('public'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong on the server',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});