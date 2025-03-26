const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;

app.get("/get-feed", async (req, res) => {
    try {
        // Fetch the Atom feed using axios
        const response = await axios.get('https://theconversation.com/feeds/nz/tonic-media-network/articles.atom', {
            headers: {
                'Content-Type': 'application/xml',
            }
        });
        
        // Return the feed data as raw text
        res.send(response.data);
    } catch (error) {
        console.error("Error fetching the feed:", error);
        res.status(500).send("Error fetching the feed.");
    }
});

app.use(express.static('public')); // Serve static files (HTML, CSS, JS)

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
