import winston from "winston";

const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.printf(({ level, message, timestamp }) => {
            return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        }),
    ),
    transports: [
        new winston.transports.Console({ format: winston.format.simple() }),
        new winston.transports.File({ filename: "error.log", level: "error" }),
        new winston.transports.File({ filename: "app.log" }),
    ],
});

export default logger;
