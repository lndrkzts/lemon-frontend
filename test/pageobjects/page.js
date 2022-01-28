module.exports = class Page {
  open(path) {
    return browser.url(`https://ebay.com/${path}`)
  }

  async waitForPageLoad() {
    await browser.waitUntil(
      () => browser.execute(
        () => document.readyState === 'complete'),
      {
        timeout: 10 * 1000,
        timeoutMsg: 'Page load timeout'
      }
    );
  }
}