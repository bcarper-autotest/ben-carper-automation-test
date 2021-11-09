const Page = require('./page')

class ProductPage extends Page {    
    get btnAddToCart() { return $("//span[text()='Add to cart']/parent::button")}    
    get txtPrice() { return $("//span[@id='our_price_display']") }
    get btnContinueShopping() { return $("//span[@title='Continue shopping']") }
    get btnCheckout() { return $("//a[@title='Proceed to checkout']") }

    async clickAddToCart() { return this.btnAddToCart.click() }

    async clickContinueShopping() {
        await this.btnContinueShopping.waitForDisplayed()
        await this.btnContinueShopping.click()
    }

    async clickCheckout() {
        await this.btnCheckout.waitForDisplayed()
        await this.btnCheckout.click()
    }

    async getPrice() {
        return this.txtPrice.getText()
    }
}

module.exports = new ProductPage();