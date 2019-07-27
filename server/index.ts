import app from "./app";

const port = app.get("port");

const server = app.listen(port, () => {
    console.log("Server is listening on port: %s", port);
});

export default server;