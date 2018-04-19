import * as express from "express";
import * as logger from "./Logger.js";
import * as http from "http";
import * as helmet from "helmet";
import {Session} from "./Session";
import * as uuid from "uuid/v1";

logger.debug("Starting server...");

const sessions: {[index: string]: Session} = {};
let numSessions = 0;
const maxSessions = 10; // TODO make this configurable

const app = express().use(helmet()).use(express.static("public"));
const server = new http.Server(app);
// TODO put port into a config file
app.listen(process.env.PORT || 5555, () => logger.debug("Server listening"));

app.post("/sessions", function (req, res) {
    logger.trace("Handling POST to /sessions");
    // Create new session and redirect to get /sessions/:id for newly-created session
    if (numSessions < maxSessions) {
        const id: string = uuid();
        sessions[id] = new Session(server, id);
        numSessions++;
        res.redirect("/sessions/" + id);
    } else {
        // TODO this should return an HTML page saying same
        res.status(403).json({error: "Too many sessions exist, please try again later!"});
    }
});

app.get("/sessions/:id", function (req, res) {
    // TODO
    logger.trace("Handling GET to /sessions/:id");
    // Create player and add to session if there is room
    res.status(404).end();
});
