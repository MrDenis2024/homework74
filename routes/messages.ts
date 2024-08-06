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

messagesRouter.get('/', async (req, res) => {
    let data: Message[] = [];
    try {
        const files = await fs.readdir(path);
        for(const file of files) {
            try {
                const fileContent = await fs.readFile(path + '/' + file);
                data.push(JSON.parse(fileContent.toString()));
            } catch (e) {
                console.error('Ошибка чтения файла', e);
            }
        }
    } catch (e) {
        data = [];
    }

    return res.send(data.slice(-5));
});

export default messagesRouter;