import * as debug from "debug";
import * as websocket from "ws";

const logDebug = debug("gameio::debug");
const logTrace = debug("gameio::trace");

export class App {
    public init(port: number) {
        logTrace("init");
        const server = new websocket.Server({port});
        server.on("connection", (socket, _) => {
            logDebug("New connection");
            socket.on("message", (msg) => {
                logDebug("New message");
            });
        });
    }
}

logDebug("Starting server...");
const app = new App();
app.init(5555); // TODO make this configurable
