import * as bodyParser from "body-parser";
import * as debug from "debug";
import * as express from "express";
import * as helmet from "helmet";

const logDebug = debug("codingforall::debug");
const logTrace = debug("codingforall::trace");

export class App {
    public init(port: number) {
        logTrace("init");
        const server = express().use(bodyParser.json()).use(helmet());
        server.listen(port, () => logDebug("Server is listening on port" + port));
    }
}

logDebug("Starting server...");
const app = new App();
app.init(5555); // TODO make this configurable
