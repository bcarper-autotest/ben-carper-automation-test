const Page = require('./page')

class MyAccountPage extends Page {
    get btnPersonalInformation() { return $("//a[@title='Information']") }
    get btnAddresses() { return $("//a[@title='Addresses']") }
    get btnSignIn() { return $("//a[@class='login']") }

    async clickPersonalInformation() {
        await this.btnPersonalInformation.click()
    }

    async clickAddresses() {
        await this.btnAddresses.click()
    }

    async clickLogin() { 
        await this.btnSignIn.click()
    }

    async getNumProducts() {
        const products = $$("//ul[@id='homefeatured']//div[@class='product-container']//img")
        return products.length
    }

    async clickProduct(idx) {
        const product = $$("//div[@class='product-container']")[idx]
        await product.click()
    }
}

module.exports = new MyAccountPage();