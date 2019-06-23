const express = require('express');
const Feed = require('../models/feed')();
const router = express.Router();

router.post('/rss', (req, res, next) => {
    const items = req.body;

    try {
        items.forEach(item => {
            const feed = Feed();

            feed.source = item.source;
            feed.guid = item.guid;
            feed.content = item.content;

            Feed.findOne({ source: feed.source, guid: feed.guid })
                .then(document => {
                    if (!document) {
                        feed.save()
                            .then(res.send({ feed: feed }))
                            .catch(err => {
                                console.log(err);
                                next(err);
                            });
                    }
                });
        });
    }
    catch (exception) {
        console.log(exception);
        res.sendStatus(400);
    }
});

module.exports = router;