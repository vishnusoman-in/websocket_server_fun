const WebSocket = require('ws');

const PORT = process.env.PORT || 8080;

const wss = new WebSocket.Server({ port: PORT });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
    ws.send(`Server received: ${message}`);
  });

  ws.send('Welcome to the WebSocket server!');
});

wss.on('error', (err) => {
  console.error('WebSocket server error:', err);
});

console.log(`WebSocket server started on port ${PORT}`);