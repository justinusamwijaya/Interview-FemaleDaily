const express = require('express');
const router = express.Router();
const controllers = require('../controllers');

router.get('/',controllers.getTweet)
router.post('/',controllers.postTweet)
router.get('/:search',controllers.searchTweet)
router.post('/retweet',controllers.reTweet)
router.delete('/destroy',controllers.destroyTweet)

module.exports = router