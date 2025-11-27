const webSocket = require("ws");

const socketServer = new webSocket.Server({port:8000});

socketServer.on("connection",(socket)=>{
    try {
        console.log("client connected !");
        socket.send("hii client");
        socket.on("message",(message)=>{
            console.log("message:",message);
                socket.send("Hellow from Server !");
        })
    } catch (error) {
        console.log("error:",error)
    }
});

const socket =  new webSocket("ws://localhost:8000");

socket.onmessage = (event) => {
    console.log("event:",event);
    console.log("Hellow from the server !");
};
module.exports = socketServer;