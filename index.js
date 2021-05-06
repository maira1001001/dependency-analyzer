const cheerio = require('cheerio');
const scraper = require('website-scraper');
const fs = require('fs');

export function getAnalyticsFrom(htmlContent) {
  return {
    length: htmlContent.length,
    dependencies: getDependencies(htmlContent),
  };
}

function htmlContentLength(htmlContent) {
  return htmlContent.lenght;
}

function getDependencies(htmlContent) {
  const scriptsTagDependencies = getAllSriptTagDependencies(htmlContent);
  const dependencies = scriptsTagDependencies.map(getDependencyName);
  return dependencies;

  function getAllSriptTagDependencies(htmlContent) {
    const $ = cheerio.load(htmlContent);
    const scriptsContent = $('script[src]');
    const urlsScripts = Object.values(
      scriptsContent.map((i, elem) => elem.attribs.src),
    );
    return urlsScripts.slice(0, 7);
    // TODO: filter only the urls, not eveything
  }

  function getDependencyName(url) {
    const dependency = url.split('/').pop();
    return dependency;
  }
}

function getFrequencies(allDependencies) {
  return {};
}

export async function getHTMLContentFromOS(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

export async function getHTMLContentFromHTTP(fileName) {
  const options = {
    urls: [
      { url: 'https://www.facebook.com/index.html', filename: 'index.html' },
    ],
    directory: './facebook',
    recursive: false,
  };
  scraper(options);
}

export async function dependencyAnalyser() {
  /**
   * osPath = filter OS from CSV
   * httpPath = filter HTTP from CSV
   * osPath.map(dependencies())
   *
   * htmlsFromOS = osPath.map(getHTMLContentFromOS)
   * htmlsFromHTTP = httpPath.map(getHTMLContentFromHTTP)
   *
   * bothHTMLContent = htmlsFromOS.push(htmlFromHTTP)
   *
   * allDependencies = bothHTMLContent.map(getAnalyticsFrom)
   *
   * return allDependencies;
   */
}
x;
