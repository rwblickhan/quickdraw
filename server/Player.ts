import * as logger from "./Logger.js";

export class Player {
    private name: string;
    private id: string;
    private board: boolean[][]; // row-column order
    private xBound: number;
    private yBound: number;

    constructor(name: string, id: string, xBound: number, yBound: number) {
        logger.trace("Player::constructor()");
        this.name = name;
        this.id = id;
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
}

export interface IPos {
    x: number;
    y: number;
}
