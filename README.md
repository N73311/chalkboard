# Chalkboard

A real-time collaborative drawing application built with React, Socket.IO, and p5.js.

## Overview

Chalkboard is a web-based drawing application that allows multiple users to draw together in real-time. Built with a React frontend and Express/Socket.IO backend, it demonstrates real-time communication, collaborative features, and interactive canvas manipulation. Users can join drawing sessions, select tools, choose colors, and see other users' drawings instantly.

## Features

- **Real-Time Collaboration** - Multiple users can draw simultaneously with instant synchronization
- **Drawing Tools** - Support for freehand drawing, circles, and squares
- **Color Picker** - Full color palette with React Color picker integration
- **User Presence** - See who's currently drawing with username display
- **Canvas Controls** - Clear canvas and tool switching capabilities
- **Responsive Design** - Works on desktop and tablet devices
- **Rate Limiting** - Protection against spam and abuse
- **Security Headers** - Helmet.js integration for secure headers

## Getting Started

### Prerequisites

- Node.js (v12 or higher)
- Yarn package manager
- Modern web browser with WebSocket support

### Installation

```bash
# Clone the repository
git clone https://github.com/N73311/chalkboard.git
cd chalkboard

# Install dependencies for all workspaces
yarn install

# Install client dependencies
cd client && yarn install

# Install server dependencies
cd ../server && yarn install
```

### Development

```bash
# Start the server (from server directory)
cd server
yarn dev

# In a new terminal, start the client (from client directory)
cd client
yarn start

# The app will open at http://localhost:3000
```

### Production

```bash
# Build the client
yarn build

# Start the production server
yarn start
```

## Project Structure

```
chalkboard/
├── client/                    # React frontend application
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── App/         # Main application component
│   │   │   ├── Chalkboard/  # Canvas drawing component
│   │   │   ├── Dialog/      # Username dialog
│   │   │   ├── Header/      # Application header
│   │   │   ├── ToolPalette/ # Drawing tools selector
│   │   │   └── UserPalette/ # Active users display
│   │   ├── index.js         # Application entry point
│   │   └── variables.scss   # Shared styles
│   └── package.json
├── server/                   # Express backend server
│   ├── app.js               # Express app configuration
│   ├── index.js             # Server entry & Socket.IO setup
│   └── package.json
├── Dockerfile               # Container configuration
└── package.json             # Root workspace configuration
```

## Architecture

### Frontend (React + p5.js)

The client uses React for UI components and p5.js for canvas drawing:
- **React Components**: Handle UI state, user interactions, and Socket.IO communication
- **p5.js Integration**: Manages canvas drawing operations through react-p5 wrapper
- **Socket.IO Client**: Maintains real-time connection with the server
- **Material-UI**: Provides consistent UI components

### Backend (Express + Socket.IO)

The server handles WebSocket connections and broadcasts drawing events:
- **Express Server**: Serves static files and handles HTTP requests
- **Socket.IO**: Manages real-time bidirectional communication
- **User Management**: Tracks connected users and manages presence
- **Security**: Implements rate limiting, CORS, and security headers

### Real-Time Communication

Drawing events flow through Socket.IO:
1. User draws on canvas (mouse/touch events)
2. Client emits drawing data via Socket.IO
3. Server broadcasts to all connected clients
4. Other clients receive and render the drawing

## Technologies Used

### Frontend
- **React** - UI framework
- **p5.js** - Creative coding library for canvas manipulation
- **Socket.IO Client** - WebSocket client for real-time communication
- **Material-UI** - React component library
- **React Color** - Color picker component
- **SCSS** - Styling with variables and nesting

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- **Socket.IO** - Real-time bidirectional communication
- **Helmet** - Security headers middleware
- **Compression** - Response compression
- **CORS** - Cross-origin resource sharing
- **Express Rate Limit** - Rate limiting middleware

## Drawing Tools

- **Pen Tool**: Freehand drawing with smooth lines
- **Circle Tool**: Draw perfect circles from center point
- **Square Tool**: Create rectangles with click and drag
- **Color Picker**: Full spectrum color selection
- **Clear Canvas**: Reset the drawing surface

## Security Considerations

- Rate limiting prevents spam (100 requests per hour per IP)
- XSS protection through xss-clean middleware
- Security headers via Helmet.js
- CORS enabled for cross-origin requests
- Input sanitization for usernames

## Performance Optimizations

- Compression middleware for smaller payloads
- Efficient Socket.IO event handling
- Canvas rendering optimizations in p5.js
- Production build with React optimizations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Requires WebSocket support

## Known Limitations

- Canvas state is not persisted (clears on refresh)
- No drawing history or undo functionality
- Limited to basic shapes (lines, circles, squares)
- User presence relies on active connections

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Acknowledgments

- Built with Socket.IO for real-time capabilities
- p5.js for creative coding features
- Inspired by collaborative drawing applications
- Material-UI for component design
