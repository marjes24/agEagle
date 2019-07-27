import express from "express";
import weather from "./routes/weather";

const app = express();

app.set("port", process.env.PORT || 3500);
app.use("/weather", weather);

export default app;