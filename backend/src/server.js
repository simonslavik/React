const http = require('http');
const WebSocket = require('ws');


const url = require('url');
const { connect } = require('http2');
const uuidv4 = require("uuid").v4

const server = http.createServer();
const wsServer = new WebSocket.Server({ server });
const port = 8000;

const connections = {};
const users = {};



const broadcast = () => {
    Object.keys(connections).forEach(uuid => {
        const connection = connections[uuid];
        const message = JSON.stringify(
            users
        )
        connection.send(message);
    })
}


const handleClose = (uuid) => {

    console.log(`${users[uuid].username} disconnected.`);
    delete connections[uuid];
    delete users[uuid];

    broadcast();
};



const handleMessage = (bytes, uuid) => {
    const message = JSON.parse(bytes.toString());

    const user = users[uuid]
    user.state = message

    broadcast();


    console.log(message);
};


wsServer.on('connection', (connection, request) => {
    const {username} = url.parse(request.url, true).query;

    const uuid = uuidv4();
    console.log(username)
    console.log(uuid);

    //broadcast
    connections[uuid] = connection

    users[uuid] = {
        username,

        state: {
            
        }

    }

    connection.on('message' , (message) => handleMessage(message, uuid));

    connection.on('close', () => handleClose(uuid));


});

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});