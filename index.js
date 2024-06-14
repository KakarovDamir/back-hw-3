import express from 'express';
import fetchDNSTransports from './scraper.js';  // Make sure the path to your scraper file is correct
import cron from 'node-cron';

const app = express();
const URL = 'https://www.dns-shop.kz/catalog/actual/13963825-4034-4ce1-94d0-41fc78eb6d15/?stock=now-today-tomorrow-later&category=17a892f816404e77';

let parsedTransports = [];
let fetchTime = new Date().toLocaleString();

const fetchData = async () => {
    try {
        const transports = await fetchDNSTransports(URL);
        fetchTime = new Date().toLocaleString();
        parsedTransports = transports;
        console.log("Data fetched at", fetchTime);
    } catch (error) {
        console.error('Error fetching DNS articles:', error);
    }
};

// Schedule the task to run every 2 hours
cron.schedule('0 */2 * * *', fetchData);

app.get('/fetch', (req, res) => {
    fetchData()
        .then(() => res.send("Fetching articles completed."))
        .catch(error => res.status(500).send('Error fetching articles.'));
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
