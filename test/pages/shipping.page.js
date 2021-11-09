const Page = require('./page')

class ShippingPage extends Page {
    get chkTermsOfService() { return $("//input[@name='cgv']") }
    get btnProceedToCheckout() { return $("//button[@name='processCarrier']") }

    async clickTermsOfService() {
        await this.chkTermsOfService.click()
    }

    async clickProceedToCheckout() {
        await this.btnProceedToCheckout.click()
    }
}

module.exports = new ShippingPage()