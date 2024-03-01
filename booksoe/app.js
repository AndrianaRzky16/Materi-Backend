import express from "express";
import db from "./config/database.js";
import router from "./app/router/router.js";

const app = express();
app.use(express.json());

app.use("/", router);

export default app;
