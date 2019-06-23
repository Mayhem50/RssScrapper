const request = require('request');
const FeedParser = require('feedparser');

module.exports = (url) => {
    const req = request(url);
    const feedparser = new FeedParser();

    req.on('error', function (error) {
        console.log(error);
    });

    req.on('response', function (res) {
        var stream = this;

        if (res.statusCode !== 200) {
            this.emit('error', new Error('Bad status code'));
        }
        else {
            stream.pipe(feedparser);
        }
    });

    feedparser.on('error', function (error) {
        console.log(error);
    });

    feedparser.on('readable', function () {
        // This is where the action is!
        var stream = this; // `this` is `feedparser`, which is a stream
        var items = [];
        var item;
        while (item = stream.read()) {
            const bodyContent = {
                content: item,
                source: url,
                guid: item.guid
            };

            items.push(bodyContent);
        }

        request({
            method: 'POST',
            url: 'http://localhost:5000/api/rss',
            body: JSON.stringify(items),
            headers: {
                'Content-Type': 'application/json'
            },
        },
            (error, response, body) => { }
        );
    });
}

