const Page = require('./page')

class MyAddressesPage extends Page {
    get addressesRow() { return $("//div[@class='addresses']") }

    async open(maximize=true) {
        await super.open('addresses', maximize)
    }
    
    async getNumAddresses() {
        const addresses = this.addressesRow.$$("//a[@title='Update']")
        return addresses.length
    }

    async clickUpdateAddress(idx) {
        const address = this.addressesRow.$$("//a[@title='Update']")[idx]
        await address.click()
    }
}

module.exports = new MyAddressesPage();
