import express from "express";
import bodyParser from "body-parser";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

//MiddleWare
app.set('view engine', 'ejs');
app.set('views', './views');
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Path to audio folder
const audioFolder = path.join(__dirname, "/static/audio/");

app.get('/', (req,res) => {
    let songList = () => {
    try {
        let songs = fs.readdirSync(audioFolder).filter(file => {
            return (
                file.endsWith(".mp3") ||
                file.endsWith(".wav") ||
                file.endsWith(".m4a") ||
                file.endsWith(".webm")
            );
        });
        console.log(`Created playlist from audio files: ${songs}`);
        return songs;
    } catch (error) {
        console.error(`Error reading directory: ${error}`);
        return [];
    }
    };
    res.render('index.ejs', {
        songs: songList(), 
        audioFolder: audioFolder})
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});