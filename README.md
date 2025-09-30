# Chalkboard

A real-time collaborative drawing application built with React, Socket.IO, and p5.js.

[View Portfolio](https://zachayers.io) | [Live Demo](https://www.chalkboard.zachayers.io)

## About

Chalkboard is a web-based drawing application enabling multiple users to draw together in real-time. Features drawing tools, color selection, user presence, and instant synchronization across all connected clients.

## Built With

- React
- Socket.IO
- p5.js (react-p5)
- Express.js
- Material-UI
- Node.js
- Yarn Workspaces

## Getting Started

### Prerequisites

- Node.js 12.x or higher
- Yarn package manager

### Installation

```bash
git clone https://github.com/N73311/chalkboard.git
cd chalkboard
yarn install
```

### Development

Start server:
```bash
cd server
yarn dev
```

Start client (in new terminal):
```bash
cd client
yarn start
```

Application runs at `http://localhost:3000`.

### Build

```bash
yarn build
yarn start
```

## Project Structure

```
chalkboard/
├── client/        # React frontend
│   ├── src/
│   │   └── components/
│   └── package.json
├── server/        # Express backend
│   ├── app.js
│   ├── index.js
│   └── package.json
└── package.json   # Workspace root
```

## License

Licensed under the Apache License, Version 2.0. See [LICENSE](LICENSE) for details.

## Author

Zachariah Ayers - [zachayers.io](https://zachayers.io)