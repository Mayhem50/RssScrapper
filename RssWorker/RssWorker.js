const FeedParser = require('feedparser');
const request = require('request'); // for fetching the feed

const json = require('./feeds.json');

console.log(json);

const feeds = require('./feeds');

function getFeeds(){
  json.feeds.forEach(url => {
    console.log(url);
    feeds(url);
  });
}

setInterval(getFeeds, 5000);

