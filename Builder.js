import puppeteer from 'puppeteer';

export default class Builder {
  static async build(viewPort) {
    const lunchOptions = {
      headless: true,
      slowMo: 0,
      ignoreHTTPSErrors: true,
      args: [
        '--no-sandbox',
        '--disable-setui-sandbox',
        '--disable-web-security'
      ]
    };
    const browser = await puppeteer.launch(lunchOptions);
    const page = await browser.newPage();
    const extendedPage = new Builder(page);
    await page.setDefaultTimeout(10000);
    await page.setDefaultNavigationTimeout(20000)
    switch (viewPort) {
      case 'Mobile':
        const mobileViewPort = puppeteer.devices['iPhone X'];
        await page.emulate(mobileViewPort);
        break;

      case 'Tablet':
        const tabletViewPort = puppeteer.devices['iPad landscape'];
        await page.emulate(tabletViewPort);
        break;

      case 'Desktop':
        await page.setViewport({ width: 800, height: 600 });
        break;

      default:
        throw new Error('Supported devices are only Mobile | Tablet | Desktop');
    }

    return new Proxy(extendedPage, {
      get: function (_target, property) {
        return extendedPage[property] || browser[property] || page[property];
      }
    });
  }
  constructor(page) {
    this.page = page;
  }

  async waitAndClick(selector) {
    await this.page.waitForSelector(selector);
    await this.page.click(selector);
  }

  async waitAndType(selector, text) {
    await this.page.waitForSelector(selector);
    await this.page.type(selector, text);
  }

  async getText(selector) {
    await this.page.waitForSelector(selector);
    const text = await this.page.$eval(selector, e => e.innerHTML);
    return text;
  }

  async getCount(selector) {
    await this.page.waitForSelector(selector);
    const count = await this.page.$$eval(selector, items => items.length);
    return count;
  }

  async waitForXPathAndClick(xpath) {
    await this.page.waitForXPath(selector);
    const element = await this.page.$x(xpath);
    if (element.length > 1) {
      console.warn('waitForXPathAndClick returned more than one result');
    }
    await elements[0].click();
  }

  async isElementVisible(selector) {
    let visible = true;
    await this.page
      .waitForSelector(selector, { visible: true, timeout: 3000 })
      .catch(() => {
        visible = false;
      });
    return visible;
  }

  async isPathVisible(selector) {
    let visible = true;
    await this.page
      .waitForSelector(selector, { visible: true, timeout: 3000 })
      .catch(() => {
        visible = false;
      });
    return visible;
  }
}
