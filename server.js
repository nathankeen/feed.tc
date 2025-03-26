const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Route to fetch the Atom feed and return it
app.get('/get-feed', async (req, res) => {
    console.log("Received request for /get-feed...");

    try {
        // Fetch the Atom feed from the URL
        const response = await axios.get('https://theconversation.com/feeds/nz/tonic-media-network/articles.atom');
        
        // Log the raw response data for debugging
        console.log("Raw Feed Data:", response.data);
        
        // Set the appropriate content type for XML response
        res.set('Content-Type', 'application/xml');
        
        // Send the raw feed XML as the response
        res.send(response.data);
    } catch (error) {
        console.error("Error fetching the feed:", error);
        // Send an error response if the feed retrieval fails
        res.status(500).send("Error fetching the feed.");
    }
});

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
