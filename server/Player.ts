import * as logger from "./Logger.js";
import {IPos} from "./Session";
import {Socket} from "socket.io";

export class Player {
    private id: string;
    private name: string;
    private socket: Socket;
    private points: number;

    constructor(id: string, name: string, socket: Socket) {
        logger.trace("Player::constructor()");
        this.id = id;
        this.name = name;
        this.socket = socket;
        this.points = 0;
    }

    public display(player: string, pos: IPos) {
        logger.trace("Player::display()");
        // NOTE player here refers to player's id NOT actual player object
        this.socket.emit("display", player, pos);
    }
}
