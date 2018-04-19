import * as http from "http";
import * as logger from "./Logger.js";
import * as sio from "socket.io";
import {Player, IPos} from "./Player.js";

// represents a single session of the game
export class Session {
    private id: string;
    private players: {[index: string]: Player};
    private socket: sio.Server;
    private activePlayer: string;

    constructor(server: http.Server, id: string) {
        logger.trace("Session::constructor()");
        this.id = id;
        this.players = {};
        this.socket = sio(server);
        this.socket.of("/" + this.id);
        this.socket.on("connection", this.bindSocketEvents.bind(this));
        this.activePlayer = ""; // "" means "no active player"
    }

    private bindSocketEvents(socket: sio.Socket) {
        logger.trace("Session::bindSocketEvents()");
        logger.debug("Player connected");
        const id = socket.id;
        socket.on("register", this.createPlayer.bind(this, socket.id));
        socket.on("disconnect", this.disconnectPlayer.bind(this, socket.id));
        socket.on("draw", this.handleDrawEvent.bind(this, socket.id));
        // TODO bind events
    }

    private createPlayer(id: string, username: string) {
        logger.trace("Session::createPlayer()");
        // TODO session size limit
        // TODO x/y bounds for player grid in a more principled way
        this.players[id] = new Player(id, username, 640, 640);
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
