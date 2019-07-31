import express from "express";
import weather from "./routes/weather";
import key from "./routes/key";

const app = express();

app.set("port", process.env.PORT || 5000);

// Add routes to use
app.use("/weather", weather);
app.use("/key", key);

export default app;