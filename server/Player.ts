import * as logger from "./Logger.js";
import {Socket} from "socket.io";

export class Player {
    private id: string;
    private name: string;
    private socket: Socket;
    private votes: number;
    private board: boolean[][]; // row-column order
    private xBound: number;
    private yBound: number;

    constructor(id: string, name: string, socket: Socket, xBound: number, yBound: number) {
        logger.trace("Player::constructor()");
        this.id = id;
        this.name = name;
        this.socket = socket;
        this.votes = 0;
        this.xBound = xBound;
        this.yBound = yBound;
        for (let i = 0; i < xBound; i++) {
            for (let j = 0; j < yBound; j++) {
                this.board[i][j] = false;
            }
        }
    }

    public draw(pos: IPos) {
        logger.trace("Player::draw()");
        this.board[pos.y][pos.x] = true;
    }

    public erase(pos: IPos) {
        logger.trace("Player::erase()");
        this.board[pos.y][pos.x] = false;
    }

    public display(player: string, pos: IPos) {
        // NOTE player here refers to player's id NOT actual player object
        this.socket.emit("display", player, pos);
    }
}

export interface IPos {
    x: number;
    y: number;
}
