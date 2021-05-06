import 'mocha';
import * as chai from 'chai';
import chaiAsPromise from 'chai-as-promised';

import * as dependencyAnalyser from './index';
import { html } from 'cheerio';

const expect = chai.expect;
chai.use(chaiAsPromise);

describe('Dependency Analyzer Tests', () => {
  it('Get analytics from HTML content', () => {
    const fakeHtmlContent = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <title>Document</title>
                <script src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/js/spirit/1b8afc8d50cb06ec3194865320689db2/spirit.js"></script>
                <script src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/js/0586e64c06075d49fd7e86e4ab5469f7/underscore.min.js"></script>
            </head>
            <body>
                <script src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/js/analytics/gas/15c0e0db441ee400502c9cd0dfc4e7bc/gasWrapper.js"></script>
                <script src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/js/analytics/gas/2974a992b3c995b23683b681f6b80621/initGasWrapper.js"></script>
            </body>
            <script src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/js/analytics/d6da7679310d33e2493c6ae4b75eae8d/googleAnalytics.js"></script>
            <script src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/js/b2a034b5e460f074937b7bc1b61d488b/jquery.min.js"></script>
            <script src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/js/d48e93d7cff906f56a79ed6e4591e0b6/languagePicker.js"></script>
            </html>
        `;

    const analytics = dependencyAnalyser.getAnalyticsFrom(fakeHtmlContent);

    expect(analytics).not.to.be.undefined;
    expect(analytics)
      .to.be.an('object')
      .that.has.all.keys('dependencies', 'length');

    const { length, dependencies } = analytics;

    expect(length).to.be.greaterThan(0);
    expect(dependencies).to.be.an('array');

    // getting dependencies
    expect(dependencies.length).to.equal(7);
    expect(dependencies.sort()).to.have.members(
      [
        'languagePicker.js  ',
        'jquery.min.js',
        'googleAnalytics.js',
        'initGasWrapper.js',
        'gasWrapper.js',
        'underscore.min.js',
        'spirit.js',
      ].sort(),
    );

    // // getting frequencies
    // expect(frequency).to.deep.equal({
    //   'languagePicker.j': 1,
    //   'jquery.min.js': 1,
    //   'googleAnalytics.js': 1,
    //   'initGasWrapper.js': 1,
    //   'gasWrapper.js': 1,
    //   'underscore.min.js': 1,
    //   'spirit.js': 1,
    // });
  });
  it('Get HTML Content From OS', async () => {
    const pathFile = './trello/index.html';
    const htmlContent = await dependencyAnalyser.getHTMLContentFromOS(pathFile);
    expect(htmlContent).to.not.be.empty;
  });

  it('Get HTML Content from HTTP request', async () => {
    const pathFile = 'trello/index.html';
    const htmlContent = await dependencyAnalyser.getHTMLContentFromHTTP(
      pathFile,
    );
    expect(htmlContent).to.not.be.empty;
  });
});
