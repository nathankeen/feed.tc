const express = require('express');
const fetch = require('node-fetch');
const FeedParser = require('feedparser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/feed', async (req, res) => {
    try {
        const response = await fetch('https://theconversation.com/feeds/nz/tonic-media-network/articles.atom');
        if (response.ok) {
            const feedparser = new FeedParser();
            response.body.pipe(feedparser);

            let latestEntry = null;
            feedparser.on('readable', function () {
                const stream = this;
                const item = stream.read();
                if (item && !latestEntry) {
                    latestEntry = item;
                }
            });

            feedparser.on('end', function () {
                if (latestEntry) {
                    res.json({
                        title: latestEntry.title,
                        link: latestEntry.link,
                    });
                } else {
                    res.status(404).send('No entries found');
                }
            });

            feedparser.on('error', function (error) {
                console.error('Error parsing feed:', error);
                res.status(500).send('Error parsing feed');
            });
        } else {
            console.error('Error fetching feed:', response.status);
            res.status(response.status).send('Error fetching feed');
        }
    } catch (error) {
        console.error('Error fetching feed:', error.message);
        res.status(500).send('Error fetching feed');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
