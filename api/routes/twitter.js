const express = require('express');
const router = express.Router();
const axios = require('axios')
const { formatName } = require('../controllers/formatName');

router.get('/', async (req, res) => {
    let productName = req.query.productName || undefined;
    if (productName) {
        productName = formatName(productName)
        console.log(productName)
        var config = {
            method: 'get',
            url: `https://api.twitter.com/1.1/search/tweets.json?q=${productName} -is:retweet&count=20`,
            headers: { 
              'Authorization': `Bearer ${process.env.TWITTER_ACCESS_TOKEN}`,
            }
        };
        const resp = await axios(config)
        const parsedTweets = []
        resp.data.statuses.forEach((tweet) => {
            parsedTweets.push({
                text: tweet.text,
                user: `@${tweet.user.screen_name}`,
                pfp: tweet.user.profile_image_url_https.replace('normal', '400x400'),
                link: `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`
            })
        })
        res.json(parsedTweets)
    } else {
        res.send({error: 'no product name'})
    }
})

module.exports = router;