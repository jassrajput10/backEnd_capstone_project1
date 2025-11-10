// import the express application and type definition
import express, { Express } from "express";
import morgan from "morgan";

// initialize the express application
const app: Express = express();

app.use(morgan("combined"));

// Ensures incoming body is correctly parsed to JSON, otherwise req.body would be undefined
app.use(express.json());

// respond to GET request at endpoint "/" with message
app.get("/", (req, res) => {
    res.send("Hello World");
});




export default app;