import * as http from "http";
import * as logger from "./Logger.js";
import * as sio from "socket.io";
import {Player, IPos} from "./Player.js";

// represents a single session of the game
class Session {
    private players: {[index: string]: Player};
    private socket: sio.Server;
    private drawingActive: boolean;

    constructor(server: http.Server) {
        logger.trace("Session::constructor()");
        this.players = {};
        this.socket = sio(server);
        this.socket.on("connection", this.bindSocketEvents.bind(this));
        this.drawingActive = false;
    }

    private bindSocketEvents(socket: sio.Socket) {
        logger.trace("Session::bindSocketEvents()");
        logger.debug("Player connected");
        const id = socket.id;
        this.createPlayer(socket.id);
        socket.on("disconnect", this.disconnectPlayer.bind(this, socket.id));
        socket.on("draw", this.handleDrawEvent.bind(this, socket.id));
        // TODO bind events
    }

    private createPlayer(id: string) {
        logger.trace("Session::createPlayer()");
        // TODO
    }

    private disconnectPlayer(id: string) {
        logger.trace("Session::disconnectUser()");
        // TODO
    }

    private handleDrawEvent(id: string, pos: IPos) {
        logger.trace("Session::handleDrawEvent()");
        if (this.drawingActive) {
            this.players[id].draw(pos);
        }
    }
}
