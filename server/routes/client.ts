import express, { Router } from "express";
import path from "path";

const route = Router();

route.use(express.static(path.join(__dirname, '../client/build')));

route.get('/', function (req, res) {
    console.log(path.join(__dirname, '../client/build', 'index.html'))
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

export default route;