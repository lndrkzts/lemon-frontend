const HomePage = require('../pageobjects/home.page');
const ResultsPage = require('../pageobjects/results.page');

const { getNumberFromResultsCountText } = require('../utils/utils');

describe('Ebay searchs', () => {
  const searchTexts = ['Lemon tree', 'Lemon seed'];

  searchTexts.forEach(text => {
    it(`search ${text}`, async () => {
      await HomePage.open();
      await HomePage.search(text);

      await expect(browser).toHaveUrlContaining('sch/i.html?');
      await expect(browser).toHaveUrlContaining(`_nkw=${text.replace(' ', '+')}`);

      await ResultsPage.waitForPageLoad();

      const inputSearchValue = await ResultsPage.getInputSearchValue();
      const resultsCountText = await ResultsPage.getResultsCountText();
      const resultsList = await ResultsPage.getResultsList();
      
      const resultsTotalNumber = getNumberFromResultsCountText(resultsCountText);

      await expect(inputSearchValue.toLowerCase()).toBe(text.toLowerCase());
      await expect(resultsCountText).toContain(`resultados para ${text.toLowerCase()}`);
      await expect(resultsList.length).toBeGreaterThan(0);
      await expect(typeof resultsTotalNumber).toBe('number');
    });
  })

  it('do search with many results', async () => {
    const text = 'telefono';

    await HomePage.open();
    await HomePage.search(text);

    await expect(browser).toHaveUrlContaining('sch/i.html?');
    await expect(browser).toHaveUrlContaining(`_nkw=${text}`);

    await ResultsPage.waitForPageLoad();

    const inputSearchValue = await ResultsPage.getInputSearchValue();
    const resultsCountText = (await ResultsPage.getResultsCountText()).toLowerCase();
    const resultsList = await ResultsPage.getResultsList();

    const resultsTotalNumber = getNumberFromResultsCountText(resultsCountText);

    await expect(inputSearchValue).toBe(text);
    await expect(resultsCountText).toContain(`+ results for ${text.toLowerCase()}`);
    await expect(resultsList.length).toBeGreaterThan(0);
    await expect(typeof resultsTotalNumber).toBe('number');
  });

  it('do search with 0 results', async () => {
    const text = 'qweasdqwe';

    await HomePage.open();
    await HomePage.search(text);

    await expect(browser).toHaveUrlContaining('sch/i.html?');
    await expect(browser).toHaveUrlContaining(`_nkw=${text}`);

    await ResultsPage.waitForPageLoad();

    const inputSearchValue = await ResultsPage.getInputSearchValue();
    const resultsCountText = (await ResultsPage.getResultsCountText()).toLowerCase();
    const resultsList = await ResultsPage.getResultsList();

    await expect(inputSearchValue).toBe(text);
    await expect(resultsCountText).toBe(`0 resultados para ${text.toLowerCase()}`);
    await expect(resultsList.length).toBe(0);
  });

  it('validate first item data', async () => {
    await HomePage.open();
    await HomePage.search('Lemon tree');
  
    await ResultsPage.waitForPageLoad();

    const {
      title, 
      price, 
      bestOffer, 
      logisticsCost, 
      location, 
      image 
    } = await ResultsPage.getFirstItemData();

    await expect(title).toBeDefined();
    await expect(price).toBeDefined();
    await expect(bestOffer).toBeDefined();
    await expect(logisticsCost).toBeDefined();
    await expect(location).toBeDefined();
    await expect(image).toBeDefined();

    await expect(typeof title).toBe('string');
    await expect(price).toContain('USD');
    await expect(bestOffer.toLowerCase()).toContain('mejor oferta');
    await expect(logisticsCost.toLowerCase()).toContain('+usd');
    await expect(typeof location).toBe('string');
    await expect(typeof image).toBe('string');
  });
})