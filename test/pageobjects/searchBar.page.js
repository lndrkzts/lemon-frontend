const locators = require('../locators/searchBar.locators');

module.exports = class SearchBar {
    get inputSearch() { return $(locators.INPUT_SEACH); }
    get buttonSearch() { return $(locators.BUTTON_SEARCH); }

    async search (text) {
        await this.inputSearch.setValue(text);
        await this.buttonSearch.click();
    }

    async getInputSearchValue () {
        return await this.inputSearch.getValue();
    }
}