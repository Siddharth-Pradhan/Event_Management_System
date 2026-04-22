const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
    page.on('requestfailed', request => {
      console.log('REQUEST FAILED:', request.url(), request.failure().errorText);
    });
    page.on('response', response => {
      if (!response.ok()) {
        console.log('RESPONSE FAILED:', response.url(), response.status());
      }
    });

    console.log('Navigating to http://localhost:5173/');
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0', timeout: 30000 });
    
    console.log('Page loaded. Wait a bit...');
    await new Promise(r => setTimeout(r, 2000));

    console.log('Done.');
    await browser.close();
  } catch (error) {
    console.error('Puppeteer error:', error);
    process.exit(1);
  }
})();
