import React, { Component } from "react";

class DrawingArea extends Component {
    // represents the area the player will draw into
    constructor(props) {
        super(props);
        // TODO
    }

    componentDidMount() {
        // TODO
        this.bindSocketEvents(this.props.socket);
    }

    bindSocketEvents(socket) {
        document.onmousedown = function (event) {
            // TODO determine which pixel was clicked on
            // TODO socket.emit('draw', {x: ..., y: ...})
        }
    }
}