const WebSocket = require('ws');

const PORT = process.env.PORT || 8080;

const wss = new WebSocket.Server({ port: PORT });

///////////////////////////////////////////////////////////////

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

/////////////////////////////////////////////////////////////////

// Map to store client IDs and their WebSocket connections
// wss.on('connection', (ws) => {
//   console.log('Client connected');

//   ws.on('message', (message) => {
//     console.log(`Received message: ${message}`);

//     // Parse the JSON data
//     const data = JSON.parse(message);

//     // Check for the 'command' key
//     if (data.command === 'get_status') {
//       // Handle the 'get_status' command
//       const status = {
//         uptime: 12345, // Replace with actual uptime value
//         memory: 2048, // Replace with actual memory usage
//         // Add any other status information you want to send
//       };

//       ws.send(JSON.stringify(status));
//     }
//   });

//   ws.send('Welcome to the WebSocket server!');
// });

//////////////////////////////////////////////////////////

// Set to store all connected clients
// const clients = new Set();

// wss.on('connection', (ws) => {
//   // Add the new client to the set
//   clients.add(ws);

//   ws.on('message', (message) => {
//     try {
//       const data = JSON.parse(message);
//       console.log(`Received message: ${JSON.stringify(data)}`);
//       if (data.command === 'get_status') {
//               // Handle the 'get_status' command
//                const status = {
//                  uptime: 12345, // Replace with actual uptime value
//                  memory: 2048, // Replace with actual memory usage
//                  // Add any other status information you want to send
//                };

              
//       // Broadcast the message to all connected clients
//       const broadcastData = JSON.stringify(status);
//       clients.forEach((client) => {
//         if (client === ws && client.readyState === WebSocket.OPEN) { //client !== ws
//           client.send(broadcastData);
//         }
//       });

//     }
//     } catch (error) {
//       console.error('Invalid JSON message:', message);
//     }
//   });

//   ws.on('close', () => {
//     // Remove the disconnected client from the set
//     clients.delete(ws);
//   });
// });

///////////////////////////////////////////////////////////

// Map to store WebSocket instances and their associated identifiers
const clients = new Map();
let nextId = 1; // Counter for generating unique identifiers

wss.on('connection', (ws) => {
  // Check if the WebSocket instance is already in the map
  const existingClient = [...clients.values()].find(client => client === ws);

  if (existingClient) {
    console.log('Duplicate WebSocket connection detected, ignoring...');
    return;
  }

  // Generate a unique identifier for the new connection
  const clientId = nextId++;

  // Store the WebSocket instance and its identifier in the map
  clients.set(clientId, ws);

  ws.on('message', (message) => {

    try{
     // console.log(`Received message from client ${clientId}: ${message}`);
      const data = JSON.parse(message);
       console.log(`Received message: ${JSON.stringify(data)}`);

       if (data.command === 'get_status') {
               // Handle the 'get_status' command
                const status = {
                  uptime: 12345, // Replace with actual uptime value
                  memory: 2048, // Replace with actual memory usage
                  clientno: clientId,// Add any other status information you want to send
               };       
      // Broadcast the message to all connected clients
      const broadcastData = JSON.stringify(status);
      clients.forEach((client, id) => {
        if (id === clientId && client.readyState === WebSocket.OPEN) {//id !== clientId
          client.send(broadcastData);
        }
      });
    }

  }
    catch (error) {
             console.error('Invalid JSON message:', message);
           }    
  });

  ws.on('close', () => {
    // Remove the disconnected client from the map
    clients.delete(clientId);
  });

});


console.log(`WebSocket server started on port ${PORT}`);