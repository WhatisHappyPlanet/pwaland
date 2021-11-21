const puppeteer = require('puppeteer');
const { get } = require('httpie');
const url = require('url');

const timeout = 20;

const checkPwa = async (inputLink) => {
  inputLink = 'https://' + inputLink;
  // Step 1: launch browser and open a new page.
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  // Step 2: Go to a URL and wait for a service worker to register.

  await page.goto(inputLink)
  const swTarget = await browser.waitForTarget(target => target.type() === 'service_worker', { timeout })

  // Step 3: If a service worker is registered, print URL of SW file to the console 
  if(swTarget && swTarget._targetInfo['url']) {
    const manifest = await page.$('[rel="manifest"]');
    const manifestUrl = await manifest.evaluate(node => node.href);

    const { data } = await get(manifestUrl);

    let icon = '';

    if(!data.name) throw new Error('Name is not existed in the manifest');

    if(!data.icons || !data.icons.length) throw new Error('Icons are not existed in the manifest');

    if(!data.icons[0].src) throw new Error('The Icon is not existed in the manifest');
    
    icon = data.icons[0].src;
    const reHttps = /(http|https):\/\/([\w.]+\/?)\S*/;
    if(!reHttps.test(icon)){
      icon = url.resolve(inputLink, icon);
    } 
    // Step 4: Done. Close.
    await browser.close();

    return {
      title: data.name,
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
  if(url) {
    checkPwa(url)
    .then((output) => {
      res.status(200).json(output);
    })
    .catch((err) => {
      res.status(500).json({
        message: 'This is not a PWA',
        "error-message": err.message
      });
    })
  } else {
    res.status(500).json({
      message: 'url is required'
    });
  }
}