import express from "express";
import weather from "./routes/weather";
import client from "./routes/client";
import key from "./routes/key";

const app = express();

app.set("port", process.env.PORT || 5000);

// Add routes to use
app.use("/weather", weather);
app.use("/key", key);

if(process.env.NODE_ENV === "production") {
    app.use("/", client);
}

export default app;