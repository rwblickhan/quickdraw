class Player {
    private name: string;
    private board: boolean[][];
    private xBound: number;
    private yBound: number;

    constructor(name: string, xBound: number, yBound: number) {
        this.name = name;
        this.xBound = xBound;
        this.yBound = yBound;
        for (let i = 0; i < xBound; i++) {
            for (let j = 0; j < yBound; j++) {
                this.board[i][j] = false;
            }
        }
    }
}
