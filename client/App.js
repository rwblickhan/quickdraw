import React, { Component } from "react";

class App extends Component {
    constructor(props) {
        super(props);
        // TODO
        console.log("Attempting to create socket connection...");
        this.socket = io(); // io() comes from socket.io included in index.html
        // TODO bind socket messages
    }
}

export default App;