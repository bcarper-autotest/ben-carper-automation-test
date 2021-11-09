const utils = require('../utils/utils')
const Page = require('./page')

class ShoppingCartPage extends Page {    
    get btnDelete() { return "//a[@title='Delete']"; }
    get lblTotalShipping() { return $("//td[@id='total_shipping']") }
    get lblTotalProducts() { return $("//td[@id='total_product']") }
    get btnProceedToCheckout() { return $("//span[text()='Proceed to checkout']")}
    get lblFinalPrice() { return $("//span[@id='total_price']") }
    get lblTax() { return $("//td[@id='total_tax']") }

    async getNumProducts() {
        return $$(this.btnDelete).length
    }
    
    async deleteProduct(idx) {
        const xpath = "//a[@title='Delete']"
        await $$(xpath)[idx].click()
    }

    async clickIncreaseQuantity(idx) {
        const xpath = "//a[contains(@class, 'cart_quantity_up')]"
        await $$(xpath)[idx].click()
    }

    async clickDecreaseQuantity(idx) {
        const xpath = "//a[contains(@class, 'cart_quantity_down')]"
        await $$(xpath)[idx].click()
    }

    async setProductQuantity(idx, quantity) {
        const xpath = "//input[contains(@class, 'cart_quantity_input')]"
        await $$(xpath)[idx].setValue(quantity)
    }

    async getProductQuantity(idx) {
        const xpath = "//input[contains(@class, 'cart_quantity_input')]"
        return $$(xpath)[idx].getValue()
    }

    async getTotalProducts() {
        return this.lblTotalProducts.getText()
    }

    async getUnitPrice(idx) {
        const xpath = "//td[@data-title='Unit price']/span[@class='price' and text()]"
        return $$(xpath)[idx].getText()
    }

    async getLineTotalPrice(idx) {
        const xpath = "//td[@data-title='Total']/span[@class='price' and text()]"
        return $$(xpath)[idx].getText()
    }

    async getTotalShipping() {
        return this.lblTotalShipping.getText()
    }

    async getFinalPrice() {
        return this.lblFinalPrice.getText()
    }

    async getTax() {
        return this.lblTax.getText()
    }

    async clickProceedToCheckout() {
        await this.btnProceedToCheckout.click()
    }
}

module.exports = new ShoppingCartPage();