const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/feed', async (req, res) => {
    try {
        const response = await axios.get('https://theconversation.com/feeds/nz/tonic-media-network/articles.atom');
        res.set('Content-Type', 'application/xml');
        res.send(response.data);
    } catch (error) {
        res.status(500).send('Error fetching the feed');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
