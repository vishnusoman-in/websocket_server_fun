const WebSocket = require('ws');

const PORT = process.env.PORT || 8080;

const wss = new WebSocket.Server({ port: PORT });

// wss.on('connection', (ws) => {
//   console.log('Client connected');

//   ws.on('message', (message) => {
//     console.log(`Received message: ${message}`);
//     ws.send(`Server received: ${message}`);
//   });

//   ws.send('Welcome to the WebSocket server!');
// });

// wss.on('error', (err) => {
//   console.error('WebSocket server error:', err);
// });

// Map to store client IDs and their WebSocket connections
wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);

    // Parse the JSON data
    const data = JSON.parse(message);

    // Check for the 'command' key
    if (data.command === 'get_status') {
      // Handle the 'get_status' command
      const status = {
        uptime: 12345, // Replace with actual uptime value
        memory: 2048, // Replace with actual memory usage
        // Add any other status information you want to send
      };

      ws.send(JSON.stringify(status));
    }
  });

  ws.send('Welcome to the WebSocket server!');
});



console.log(`WebSocket server started on port ${PORT}`);