// import the express application and type definition
import express, { Express } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";

dotenv.config();


import playerRoutes from "./api/v1/routes/playerRoutes";
import matchRoutes from "./api/v1/routes/matchRoutes";
import tournamentRoutes from "./api/v1/routes/tournamentRoutes";
import errorHandler from "./api/v1/middleware/errorHandler";
import userRoutes from "./api/v1/routes/userRoutes";
import adminRoutes from "./api/v1/routes/adminRoutes";
import {
    accessLogger,
    errorLogger,
    consoleLogger,
} from "./api/v1/middleware/logger";
import { getHelmetConfig } from "../config/helmetConfig";
import { getCorsConfig } from "../config/corsConfig";
import setupSwagger from "../config/swagger";
import limiter from "../src/api/v1/middleware/expressRatelimit"


// initialize the express application
const app: Express = express();

// Interface for health check response
// An interface in TypeScript defines the structure or "shape" of an object.
interface HealthCheckResponse {
    status: string;
    uptime: number;
    timestamp: string;
    version: string;
}
// Middleware START
// Apply basic Helmet security
app.use(helmet());
app.use(helmet(getHelmetConfig()));
app.use(cors());
app.use(cors(getCorsConfig()));

app.use(accessLogger);
app.use(errorLogger);
app.use(consoleLogger);
app.use("/api", limiter);

// Ensures incoming body is correctly parsed to JSON, otherwise req.body would be undefined
app.use(express.json());

// Middleware END

// respond to GET request at endpoint "/" with message
app.get("/", (req, res) => {
    res.send("Hello World");
});

/**
 * Health check endpoint that returns server status information
 * @returns JSON response with server health metrics
 */
app.get("/api/v1/health", (req, res) => {
    const healthData: HealthCheckResponse = {
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    };

    res.json(healthData);
});

// Setup Swagger
setupSwagger(app);

// "/api/v1/players" will prefix all player routes
app.use("/api/v1/players", playerRoutes);
// "/api/v1/matches" will prefix all match routes
app.use("/api/v1/matches", matchRoutes);
// "/api/v1/tournaments" will prefix all match routes
app.use("/api/v1/tournaments", tournamentRoutes);

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/admin", adminRoutes);

// Setup Swagger
setupSwagger(app);



app.use(errorHandler);

export default app;