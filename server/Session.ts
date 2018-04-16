import * as http from "http";
import * as logger from "./Logger.js";
import * as sio from "socket.io";
import {Player} from "./Player.js";

// represents a single session of the game
class Session {
    private players: Player[];
    private socket: sio.Server;

    constructor(server: http.Server) {
        logger.trace("Session constructor");
        this.players = [];
        this.socket = sio(server);
        this.socket.on("connection", this.bindSocketEvents.bind(this));
    }

    private bindSocketEvents(socket: sio.Socket) {
        logger.trace("Session::bindSocketEvents()");
        logger.debug("Player connected");
        const id = socket.id;
        this.createPlayer(socket.id);
        socket.on("disconnect", this.disconnectPlayer.bind(this, socket.id));
        // TODO bind events
    }

    private createPlayer(id: string) {
        // TODO
        logger.trace("Session::createPlayer()");
    }

    private disconnectPlayer(id: string) {
        // TODO
        logger.trace("Session::disconnectUser()");
    }
}
