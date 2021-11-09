const Page = require('./page')

class DeliveryAddressPage extends Page {
    get btnAddNewAddress() { return $("//p[contains(@class, 'address_add')]/a") }
    get chkUseDeliveryAsBilling() { return $("//input[@id='addressesAreEquals']") }
    get lstDeliveryAddress() { return $("//select[@id='id_address_delivery']") }
    get lstInvoiceAddress() { return $("//select[@id='id_address_invoice']") }
    get txtOrderComments() { return $("//textarea[@name='message']") }
    get btnProceedToCheckout() { return $("//button[@name='processAddress']") }
    get btnAddNewAddressInvoice() { return $("//div[@id='address_invoice_form']/a")}

    async selectDelieveryAddress(idx) {
        this.lstDeliveryAddress.selectByIndex(idx)
    }

    async selectInvoiceAddress(idx) {
        this.lstInvoiceAddress.selectByIndex(idx)
    }

    async clickAddNewAddress() {
        await this.btnAddNewAddress.click()
    }

    async clickAddNewInvoiceAddress() {
        await this.btnAddNewAddressInvoice.click()
    }
    
    async clickUpdateAddress(idx = 0) {
        const xpath = "//a[@title='Update']"
        await $$(xpath)[idx].click()
    }

    async clickUseDeliveryAddressAsBillingAddress() {
        await this.chkUseDeliveryAsBilling.click()
    }

    async clickProceedToCheckout() {
        await this.btnProceedToCheckout.click()
    }

    async getNumAddresses() {
        const xpath = "//select[@name='id_address_delivery']/option"
        return $$(xpath).length
    }
}

module.exports = new DeliveryAddressPage()