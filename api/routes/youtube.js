const express = require('express');
const router = express.Router();
const youtubesearchapi = require('youtube-search-api');
const { formatName } = require('../controllers/formatName');

router.get('/', async (req, res) => {
    let productName = req.query.productName || undefined;
    if (productName) {
        productName = formatName(productName)
        console.log(productName)
        const searchResults = await youtubesearchapi.GetListByKeyword(productName + 'review', false);
        const parsedResults = []
        searchResults.items.forEach(result => {
            const video = {
                title: result.title,
                thumbnail: result.thumbnail.thumbnails[result.thumbnail.thumbnails.length - 1].url,
                link: `https://www.youtube.com/watch?v=${result.id}`,
                length: result.length.simpleText,
            }
            parsedResults.push(video)
        })
        res.json(parsedResults)
    } else {
        res.send({error: 'no product name'})
    }
})

module.exports = router;