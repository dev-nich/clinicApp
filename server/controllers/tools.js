const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../utils/config");
const router = require("express").Router();
const puppeteer = require("puppeteer-core")

const BROWSER_PATH = '/usr/bin/google-chrome'; 

router.get("/pdf", async (req, res) => {
  const targetUrl = req.query.url || 'https://example.com';
    let browser;

    try {
        // Launch using the explicit executable path
        browser = await puppeteer.launch({
            executablePath: BROWSER_PATH,
            args: ['--no-sandbox', '--disable-setuid-sandbox'] // Required for many server environments
        });

        const page = await browser.newPage();
        await page.goto(targetUrl, { waitUntil: 'networkidle0' });
        
        const screenshot = await page.screenshot({ type: 'png' });
        
        res.contentType('image/png');
        res.send(screenshot);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Failed to capture screenshot');
    } finally {
        if (browser) await browser.close();
    }
});


module.exports = router;
