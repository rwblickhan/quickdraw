import React, { Component } from "react";

class DisplayArea extends Component {
    // represents area displaying another player's drawing
    constructor(props) {
        super(props);
        // TODO
    }

    componentDidMount() {
        // TODO
        this.bindSocketEvents(this.props.socket);
    }

    bindSocketEvents(socket) {
        // TODO
    }
}
