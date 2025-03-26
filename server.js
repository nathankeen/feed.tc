const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Route to fetch the Atom feed and return it
app.get('/get-feed', async (req, res) => {
    try {
        // Fetch the Atom feed from the URL
        const response = await axios.get('https://theconversation.com/feeds/nz/tonic-media-network/articles.atom');

        // Send the raw feed XML as the response
        res.set('Content-Type', 'application/xml');  // Set the response type to XML
        res.send(response.data);
    } catch (error) {
        console.error("Error fetching the feed:", error);
        res.status(500).send("Error fetching the feed.");
    }
});

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
