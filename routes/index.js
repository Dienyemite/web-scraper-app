const express = require('express');
const router = express.Router();
const scraperController = require('../controllers/scraperController');

router.get('/', (req, res) => {
    res.render('index');
});

router.post('/scrape', scraperController.scrapeAndInteract);

module.exports = router;