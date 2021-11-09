const Page = require('./page')

class OrderHistoryPage extends Page {
    async open(maximize=true) {
        await super.open("history", maximize)
    }

    async getOrderReference(idx) {
        const xpath = "//a[@class='color-myaccount']"
        return $$(xpath)[idx].getText()
    }

    async getOrderCount() {
        const xpath = "//a[@class='color-myaccount']"
        return $$(xpath).length
    }

    async getOrderPrice(idx) {
        const xpath = "//td[@class='history_price']/span"
        return $$(xpath)[idx].getText()
    }
}

module.exports = new OrderHistoryPage();