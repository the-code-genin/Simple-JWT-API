import winston, { createLogger, format, transports } from "winston";
import config from "./config";

// Logging format
const timeStampFormat = format.timestamp({ format: "YYYY-MM-DD HH:mm:ss.SS Z" });
const messageFormat = format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`);

// Configure log levels
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

const colors = {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    debug: "white",
};
winston.addColors(colors);

// Configure transports
const myTransports: winston.transport[] = [
    new transports.File({
        filename: "../logs/error.log",
        level: "error",
    }),
    new transports.File({ filename: "../logs/all.log" }),
    new transports.Console({
        format: format.combine(timeStampFormat, format.colorize(), messageFormat),
    }),
];

// Set default log level
let level = "";
switch (config.app.env) {
case "production":
    level = "info";
    break;

case "test":
    level = "debug";
    break;

default:
    level = "http";
    break;
}

const Logger = createLogger({
    level,
    levels,
    format: format.combine(timeStampFormat, messageFormat),
    transports: myTransports,
});

export default Logger;
