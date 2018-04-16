import * as express from "express";
import * as logger from "./Logger.js";
import * as http from "http";
import * as helmet from "helmet";

logger.debug("Starting server...");

const app = express().use(helmet()).use(express.static("public"));
const server = new http.Server(app);
// TODO put port into a config file
app.listen(process.env.PORT || 5555, () => logger.debug("Server listening"));
