const xmultiple = require('xmultiple');
const locators = require('../locators/results.locators');

const Page = require('./page');
const SearchBar = require('./searchBar.page');

class ResultsPage extends xmultiple(Page, SearchBar) {
    get textResultsCount() { return $(locators.TEXT_RESULTS_COUNT) }
    get resultsList() { return $$(locators.RESULTS_LIST) }

    async getResultsCountText() {
        return await this.textResultsCount.getText();
    }

    async getResultsList() {
        return await this.resultsList;
    }

    async getFirstItemData() {
        const firstItem = await this.resultsList[0];

        const title = await firstItem.$(locators.FIRST_ITEM.TITLE).getText();
        const price = await firstItem.$(locators.FIRST_ITEM.PRICE).getText();
        const bestOffer = await firstItem.$(locators.FIRST_ITEM.BEST_OFFER).getText();
        const logisticsCost = await firstItem.$(locators.FIRST_ITEM.LOGISTICS_COST).getText();
        const location = await firstItem.$(locators.FIRST_ITEM.LOCATION).getText();
        const image = await firstItem.$(locators.FIRST_ITEM.IMAGE).getAttribute('src');

        return { title, price, bestOffer, logisticsCost, location, image };
    }
}

module.exports = new ResultsPage();