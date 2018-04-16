import * as logger from "./Logger.js";

export class Player {
    private name: string;
    private id: string;
    private board: boolean[][];
    private xBound: number;
    private yBound: number;

    constructor(name: string, id: string, xBound: number, yBound: number) {
        logger.trace("Player constructor");
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
}
