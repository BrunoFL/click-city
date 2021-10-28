const port = process.env.PORT || 3000;
const express = require("express");
const app = express();

const { createServer } = require("http");
const httpServer = createServer(app);

const io = require("socket.io")(httpServer, {
	cors: {
		origin: "http://localhost:8080",
		methods: ["GET", "POST"],
	},
});
console.log("start");

/*
 *  Serve /dist/ folder
 */
app.use(express.static(__dirname + "/dist"));
app.get(/.*/, (req, res) => {
	res.sendFile(__dirname + "/dist/index.html");
});

httpServer.listen(port, () => {
	console.log(`Listening on port ${port}`);
});

let clients = [];

io.on("connection", (socket) => {
	/*
	 *  ✨ Handle new connected client
	 */
	console.log(`Client ${socket.id} connected to the server.`);

	// Push new connected socket to socketList
	clients.push({ id: socket.id, value: 0, pseudo: null });

	// Emit the updated client list to *ALL* connected clients.
	io.emit("update_clients", clients);

	// Listen to increment_counter event, fired by `increment()` in 'Counter.vue'
	socket.on("increment_counter", () => {
		let clientsTmp = [];
		let reset = false;
		for (const client of clients) {
			if (client.id === socket.id) {
				if (client.value === 99) {
					reset = true;
				} else {
					clientsTmp.push({ ...client, value: client.value + 1 });
				}
			} else {
				clientsTmp.push(client);
			}
		}
		if (reset) {
			clientsTmp = [];
			for (const client of clients) {
				clientsTmp.push({ ...client, value: 0 });
			}
		}
		clients = clientsTmp;
		io.emit("update_clients", clients);
	});

	socket.on("update_pseudo", pseudo => {
		let clientsTmp = [];
		for (const client of clients) {
			if (client.id === socket.id) {
				clientsTmp.push({ ...client, pseudo: pseudo });
			} else {
				clientsTmp.push(client);
			}
		}
		clients = clientsTmp;
		io.emit("update_clients", clients);
	})

	// Listen to disconnect event. 'disconnecting' is a reserved event,
	// again refer to https://socket.io/docs/emit-cheatsheet/
	socket.on("disconnecting", () => {
		// Remove the disconnected client from the client list
		clients = clients.filter((client) => {
			return client.id !== socket.id;
		});
		// Emit the updated client list to all connected clients *EXCEPT* sender.
		socket.broadcast.emit("update_clients", clients);
		console.log(`Client ${socket.id} disconnected from the server.`);
	});
});
