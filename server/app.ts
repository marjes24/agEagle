import express from "express";
import weather from "./routes/weather";

const app = express();

app.set("port", process.env.PORT || 5000);

// Add routes to use
app.use("/weather", weather);

export default app;