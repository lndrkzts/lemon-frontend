const xmultiple = require('xmultiple');

const Page = require('./page');
const SearchBar = require('./searchBar.page');

class HomePage extends xmultiple(Page, SearchBar) {
    open() {
        return super.open('');
    }
}

module.exports = new HomePage();

