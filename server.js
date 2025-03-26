onst express = require('express');
const axios = require('axios');
const xml2js = require('xml2js');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/feed', async (req, res) => {
    try {
        const response = await axios.get('https://theconversation.com/feeds/nz/tonic-media-network/articles.atom');
        const xml = response.data;
        xml2js.parseString(xml, (err, result) => {
            if (err) {
                console.error('Error parsing XML:', err);
                return res.status(500).json({ error: 'Error parsing feed' });
            }
            const latestEntry = result.feed.entry[0];
            if (latestEntry) {
                const title = latestEntry.title[0];
                const link = latestEntry.link[0].$.href;
                res.json({ title, link });
            } else {
                res.status(404).json({ error: 'No entries found' });
            }
        });
    } catch (error) {
        console.error('Error fetching feed:', error.message);
        res.status(500).json({ error: 'Error fetching feed' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
