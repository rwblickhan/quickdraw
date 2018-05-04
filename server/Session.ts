import * as http from "http";
import * as logger from "./Logger.js";
import * as sio from "socket.io";
import {Player} from "./Player.js";

// represents a single session of the game
export class Session {
    private id: string;
    private players: { [index: string]: Player };
    private numPlayers: number;
    private socket: sio.Namespace;
    private activePlayerLeft: string;
    private activePlayerRight: string;
    private leftBoard: boolean[][]; // row-column order
    private rightBoard: boolean[][];
    // TODO make this configurable
    private xBound: number = 640;
    private yBound: number = 640;

    constructor(server: http.Server, id: string) {
        logger.trace("Session::constructor()");
        this.id = id;
        this.players = {};
        this.numPlayers = 0;
        this.socket = sio(server).of("/" + this.id);
        this.socket.on("connection", this.bindSocketEvents.bind(this));
        this.activePlayerLeft = ""; // "" means "no active player"
        this.activePlayerRight = "";
        for (let i = 0; i < this.xBound; i++) {
            for (let j = 0; j < this.yBound; j++) {
                this.leftBoard[i][j] = false;
                this.rightBoard[i][j] = false;
            }
        }
    }

    private bindSocketEvents(socket: sio.Socket) {
        logger.trace("Session::bindSocketEvents()");
        logger.debug("Player connected");
        socket.on("register", this.createPlayer.bind(this, socket.id, socket));
        socket.on("disconnect", this.disconnectPlayer.bind(this, socket.id));
        socket.on("draw", this.handleDrawEvent.bind(this, socket.id));
        // TODO bind more events
    }

    private createPlayer(id: string, socket: sio.Socket, username: string) {
        logger.trace("Session::createPlayer()");
        // TODO session size limit
        this.players[id] = new Player(id, username, socket);
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
        if (id === this.activePlayerLeft) {
            this.leftBoard[pos.y][pos.x] = true;
        } else if (id === this.activePlayerRight) {
            this.rightBoard[pos.y][pos.x] = true;
        }
        // TODO iterate over all players and call display()
    }
}

export interface IPos {
    x: number;
    y: number;
}
