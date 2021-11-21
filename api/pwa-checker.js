import puppeteer from 'puppeteer';
import fetch from 'node-fetch';
import url from 'url';

const checkPwa = async (inputLink) => {
  // Step 1: launch browser and open a new page.
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  // Step 2: Go to a URL and wait for a service worker to register.

  await page.goto(inputLink)
  const swTarget = await browser.waitForTarget(target => target.type() === 'service_worker', { timeout: 5 })

  // Step 3: If a service worker is registered, print URL of SW file to the console 
  if(swTarget && swTarget._targetInfo['url']) {
    const manifest = await page.$('[rel="manifest"]');
    const manifestUrl = await manifest.evaluate(node => node.href);

    const response = await fetch(manifestUrl);
    const data = await response.json();

    let icon = '';

    if(!data.name) throw new Error('Name is not existed in the manifest');

    if(!data.icons || !data.icons.length) throw new Error('Icons are not existed in the manifest');

    if(!data.icons[0].src) throw new Error('The Icon is not existed in the manifest');
    
    icon = data.icons[0].src;
    const reHttps = /(http|https):\/\/([\w.]+\/?)\S*/;
    if(!reHttps.test(icon)){
      icon = url.resolve(inputLink, icon);
    }

    console.log(data.icons);
    // Step 4: Done. Close.
    await browser.close();

    return {
      name: data.name,
      short_name: data.short_name,
      description: data.description,
      link: inputLink,
      icon: icon
    } 
  } else {
    await browser.close()
    throw new Error('This is not a PWA');
  }
}

export default function handler(req, res) {
  const { url } = req.query;
  checkPwa(url)
  .then((res) => {
    res.status(200).json(res);
  })
  .catch((err) => {
    // The process will timeout after 3s, if no service worker is registered
    console.error(err.message);
    res.status(500).end(err.message);
  });
}