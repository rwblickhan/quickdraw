import * as debug from "debug";

const logDebug = debug("gameio::debug");
const logTrace = debug("gameio::trace");

export class App {
    public init(port: number) {
        logTrace("init()");
    }
}

logDebug("Starting server...");
const app = new App();
app.init(5555); // TODO make this configurable
