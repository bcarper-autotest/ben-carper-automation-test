const Page = require('./page')

class MyAccountPage extends Page {
    get btnPersonalInformation() { return $("//a[@title='Information']") }
    get btnAddresses() { return $("//a[@title='Addresses']") }
    get btnSignIn() { return $("//a[@class='login']") }
    get btnAddToCart() { return $("//button[@type='submit']") }
    get btnClose() { return $("//a[@title='Close']") }
    get btnContinueShopping() { return $("//span[@title='Continue shopping']") }
    get btnCheckout() { return $("//a[@title='Proceed to checkout']") }

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

    async clickAddToCart() {
        await this.btnAddToCart.click()
    }

    async clickClose() {
        await this.btnClose.click()
    }

    async clickContinueShopping() {
        await this.btnContinueShopping.waitForDisplayed()
        await this.btnContinueShopping.click()
    }

    async clickCheckout() {
        await this.btnCheckout.waitForDisplayed()
        await this.btnCheckout.click()
    }
}

module.exports = new MyAccountPage();