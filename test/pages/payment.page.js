const Page = require('./page')

class PaymentPage extends Page {
    get lblTotalProducts() { return $("//td[@id='total_product']") }
    get btnBankWire() { return $("//a[@class='bankwire']") }
    get btnCheck() { return $("//a[@class='cheque']") }
    get btnSubmit() { return $("//p[contains(@class, 'cart_navigation')]/button[@type='submit']") }
    get btnBackToOrders() { return $("//a[@title='Back to orders']") }

    async getItemTotal(idx) {
        const xpath = "//td[@data-title='Total']/span"
        return $$(xpath)[idx].getText()
    }

    async getItemUnitPrice(idx) {
        const xpath = "//td[@data-title='Unit price']/span"
        return $$(xpath)[idx].getText()
    }

    async getItemQuantity(idx) {
        const xpath = "//td[contains(@class, 'cart_quantity')]/span"
        return $$(xpath)[idx].getText()
    }

    async clickPayByBankWire() {
        await this.btnBankWire.click()
    }

    async clickPayByCheck() {
        await this.btnCheck.click()
    }

    async clickConfirmOrder() {
        await this.btnSubmit.click()
    }

    async clickBackToOrders() {
        await this.btnBackToOrders.click()
    }
}

module.exports = new PaymentPage()