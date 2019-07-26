import app from "./app";

const port = app.get("port");

const server = app.listen(app.get("port"), () => {
    console.log("Server is listening on port: %s", port);
});

export default server;