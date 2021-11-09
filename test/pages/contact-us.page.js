const Page = require('./page')

class ContactUsPage extends Page {
    get lstOrderReferences() { return $("//select[@name='id_order']") }
    get lstProduct() { return $("//select[@name='id_product']") }
    get txtFileUpload() { return $("//input[@name='fileUpload']") }
    get successAlert() { return $("//p[@class='alert alert-success']")}
    get txtMessage() { return $("//textarea[@id='message']") }
    get btnSubmitMessage() { return $("//button[@name='submitMessage']") }
    get txtEmail() { return $("//input[@id='email']") }
    get lstSubject() { return $("//select[@id='id_contact']") }

    async open(maximize=true) {
        await super.open('contact', maximize)
    }

    async clickSubmitMessage() {
        await this.btnSubmitMessage.click()
    }

    async selectWebmasterHeading() {
        this.lstSubject.selectByAttribute("value", "1")
    }

    async selectCustomerServiceHeading() {
        this.lstSubject.selectByAttribute('value', "2")
    }

    async setEmail(email) {
        await this.txtEmail.setValue(email)
    }

    async getEmail() {
        return this.txtEmail.getValue()
    }

    async getNumOrders() {
        return $$("//select[@name='id_order']/option").length
    }

    async getNumProducts() {
        return $$("//select[@name='id_product']/option").length
    }

    async selectProduct(idx) {
        await this.lstProduct.selectByIndex(idx)
    }

    async selectOrder(idx) {
        await this.lstOrderReferences.selectByIndex(idx)
    }

    async getAlertText() {
        return this.successAlert.getText()
    }

    async setFilePath(path) {
        await this.txtFileUpload.setValue(path)
    }

    async setMessage(message) {
        await this.txtMessage.setValue(message)
    }
}

module.exports = new ContactUsPage()