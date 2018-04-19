import * as http from "http";
import * as logger from "./Logger.js";
import * as sio from "socket.io";
import {Player, IPos} from "./Player.js";

// represents a single session of the game
export class Session {
    private id: string;
    private players: {[index: string]: Player};
    private numPlayers: number;
    private socket: sio.Namespace;
    private activePlayer: string;

    constructor(server: http.Server, id: string) {
        logger.trace("Session::constructor()");
        this.id = id;
        this.players = {};
        this.numPlayers = 0;
        this.socket = sio(server).of("/" + this.id);
        this.socket.on("connection", this.bindSocketEvents.bind(this));
        this.activePlayer = ""; // "" means "no active player"
    }

    private bindSocketEvents(socket: sio.Socket) {
        logger.trace("Session::bindSocketEvents()");
        logger.debug("Player connected");
        socket.on("register", this.createPlayer.bind(this, socket.id, socket));
        socket.on("disconnect", this.disconnectPlayer.bind(this, socket.id));
        socket.on("draw", this.handleDrawEvent.bind(this, socket.id));
        // TODO bind events
    }

    private createPlayer(id: string, socket: sio.Socket, username: string) {
        logger.trace("Session::createPlayer()");
        // TODO session size limit
        // TODO x/y bounds for player grid in a more principled way
        this.players[id] = new Player(id, username, socket, 640, 640);
        this.numPlayers++;
        // TODO make max players configurable
        if (this.numPlayers === 4) {
            // TODO start the game
        }
    }

    private disconnectPlayer(id: string) {
        logger.trace("Session::disconnectUser()");
        this.numPlayers--;
        // TODO
    }

    private handleDrawEvent(id: string, pos: IPos) {
        logger.trace("Session::handleDrawEvent()");
        if (id === this.activePlayer) {
            this.players[id].draw(pos);
            // TODO iterate over this.players, call display() as appropriate for each
        }
    }
}
