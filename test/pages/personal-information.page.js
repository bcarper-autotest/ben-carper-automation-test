const Page = require('./page')

class PersonalInformationPage extends Page {
    get txtFirstName() { return $("//input[@id='firstname']") }
    get txtLastName() { return $("//input[@id='lastname']") }
    get txtEmail() { return $("//input[@id='email']") }
    get txtCurrentPassword() { return $("//input[@id='old_passwd']") }
    get txtNewPassword() { return $("//input[@id='passwd']") }
    get txtConfirmation() { return $("//input[@id='confirmation']") }
    get lstDay() { return $("//select[@id='days']") }    
    get lstMonth() { return $("//select[@id='months']") }    
    get lstYear() { return $("//select[@id='years']") }
    get rdbMr() { return $("//input[@id='id_gender1']") }
    get rdbMrs() { return $("//input[@id='id_gender2']") }
    get pageHeading() { return $("//h1") }
    get btnSave() { return $("//button[@id='submitIdentity']") }
    get chkNewsletter() { return $("//input[@id='newsletter']") }
    get chkNewsletterContainer() { return $("//input[@id='newsletter']/parent::span[@class='checked']") }
    get chkOptIn() { return $("//input[@id='optin']") }
    get chkOptInContainer() { return $("//input[@id='optin']/parent::span[@class='checked']") }

    async open(maximize=true) {
        await super.open('identity', maximize)
    }

    async isNewsletterChecked() {
        return this.chkNewsletterContainer.isExisting()
    }

    async isOptInChecked() {
        return this.chkOptInContainer.isExisting()
    }
    
    async getFirstName() {
        return this.txtFirstName.getValue()
    }

    async getLastName() {
        return this.txtLastName.getValue()
    }

    async getEmail() {
        return this.txtEmail.getValue()
    }

    async getDOBDay() {
        return this.lstDay.getValue()
    }

    async getDOBMonth() {
        return this.lstMonth.getValue()
    }

    async getDOBYear() {
        return this.lstYear.getValue()
    }

    async clickSaveAccount() {
        await this.btnSave.click()
    }
}

module.exports = new PersonalInformationPage();