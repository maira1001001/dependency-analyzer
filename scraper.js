const options = {
  urls: [
    { url: 'https://www.facebook.com/index.html', filename: 'index.html' },
  ],
  directory: './facebook',
  recursive: false,
};

const scraper = require('website-scraper');

scraper(options);
