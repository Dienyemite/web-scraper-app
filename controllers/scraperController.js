require ('dotenv').config();
API_KEY = process.env.OLOSTEP_API_KEY;
const puppeteer = require('puppeteer');
const InteractionData = require('../models/interactionData');

exports.scrapeAndInteract = async (req, res) => {
    const { url } = req.body;
    const apiKey = API_KEY;

    /*await page.setExtraHTTPHeaders({
        'Authorization': `Bearer ${apiKey}`
    });*/

    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        
        await page.setExtraHTTPHeaders({ 'Authorization': `Bearer ${apiKey}` });

        await page.goto(url, { timeout: 60000 });

        // Example: scraping the page title and first form input name
        const scrapedData = await page.evaluate(() => {
            const title = document.title;
            const firstInputName = document.querySelector('input')?.name || 'No input found';
            return { title, firstInputName };
        });

        // Example: clicking a button if it exists
        if (await page.$('button#exampleButton') !== null) {
            await page.click('button#exampleButton');
        }

        // Example: filling out a form
        if (await page.$('input[name="exampleInput"]') !== null) {
            await page.type('input[name="exampleInput"]', 'Test Data');
            await page.click('button#submitForm');
        }

        await browser.close();

        // Save to MongoDB
        const interaction = new InteractionData({ url, scrapedData, userActions: ['clicked button #exampleButton', 'filled form exampleInput'] });
        await interaction.save();

        res.render('result', { url, scrapedData });

    } catch (err) {
        console.error('Error during scraping: ', err.message);
        console.error(err.stack);
        res.status(500).send('Error occurred during scraping');
    }
};