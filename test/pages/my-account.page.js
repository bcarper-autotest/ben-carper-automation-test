const Page = require('./page')

class MyAccountPage extends Page {
    get btnPersonalInformation() { return $("//a[@title='Information']") }
    get btnAddresses() { return $("//a[@title='Addresses']") }

    async clickPersonalInformation() {
        await this.btnPersonalInformation.click()
    }

    async clickAddresses() {
        await this.btnAddresses.click()
    }

    async open() {
        super.open()
        await browser.url('my-account')
    }
}

module.exports = new MyAccountPage();