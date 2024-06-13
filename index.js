import express from 'express';
import fetchOLXTransports from './scraper.js';

const app = express();
const URL = 'https://www.olx.kz/transport/';

let parsedTransports = [];
let fetchTime = new Date().toLocaleString();

app.get('/fetch', (req, res) => {
    fetchOLXTransports(URL).then(transports => {
        fetchTime = new Date().toLocaleString();
        parsedTransports = transports;
    });
    res.send("Fetching articles...");
});

app.get('/lastfetch', (req, res) => {
    res.send("Last fetch time: " + fetchTime + "\n");
});

app.get('/articles', (req, res) => {
    res.send(parsedTransports);
});

app.get("/", (req, res) => {
    res.send("Health check");
});

const PORT = 3003;    
app.listen(PORT, () => {
    console.log(`Server runs at http://localhost:${PORT}`);
});
