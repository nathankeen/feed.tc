// server.js

const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Serve static files (e.g., HTML, JS) from the public folder
app.use(express.static('public'));

// Endpoint to fetch Atom feed and send to frontend
app.get('/get-feed', async (req, res) => {
    const feedUrl = 'https://theconversation.com/feeds/nz/tonic-media-network/articles.atom';
    
    try {
        // Fetch the feed using Axios
        const response = await axios.get(feedUrl, { headers: { 'Accept': 'application/xml' } });

        // Send the raw feed XML to the frontend
        res.header('Content-Type', 'application/xml');
        res.send(response.data);
    } catch (error) {
        console.error('Error fetching the feed:', error);
        res.status(500).send('Error fetching feed.');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
