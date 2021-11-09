const Page = require('./page')

class LoginPage extends Page {
    get txtEmail() { return $("//input[@id='email']") }
    get txtPassword() { return $("//input[@id='passwd']") }
    get txtEmaiAddressCreate() { return $("//input[@id='email_create']") }
    get btnCreateAccount() { return $("//button[@id='SubmitCreate']") }
    get lblInvalidEmailAddress() { return $("//div[@id='create_account_error']//li") }
    get btnSignIn() { return $("//button[@id='SubmitLogin']") }

    async setEmailAddress(email) {
        await this.txtEmail.setValue(email)
    }

    async setPassword(password) {
        await this.txtPassword.setValue(password)
    }

    async setEmailAddressCreate(email) {
        await this.txtEmaiAddressCreate.setValue(email)
    }

    async clickCreateAccount() {
        await this.btnCreateAccount.click()
    }

    async getCreateAccountError() {
        return this.lblInvalidEmailAddress.getText()
    }

    async clickSignIn() {
        await this.btnSignIn.click()
    }

    async open (maximize=true) {
        await super.open("authentication", maximize)
    }
}

module.exports = new LoginPage();
