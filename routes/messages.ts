import express from "express";
import {promises as fs} from "fs";
import {Message} from "../types";

const messagesRouter = express.Router();
const path = './messages';

messagesRouter.post('/', async (req, res) => {
    const newMessage: Message = {
        message: req.body.message,
        datetime: new Date().toISOString(),
    };

    try {
        await fs.writeFile(`${path}/${newMessage.datetime}.txt`, JSON.stringify(newMessage));
    } catch (e) {
        console.error(e);
    }

    return res.send(newMessage);
});

export default messagesRouter;