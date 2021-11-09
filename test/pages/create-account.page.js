class CreateAccountPage {
    get txtFirstName() { return $("//input[@id='customer_firstname']") }
    get txtLastName() { return $("//input[@id='customer_lastname']") }
    get txtPassword() { return $("//input[@id='passwd']") }
    get txtZip() { return $("//input[@id='postcode']") }
    get lstCountry() { return $("//select[@id='id_country']") }
    get txtOther() { return $("//textarea[@id='other']") }
    get txtPhone() { return $("//input[@id='phone']") }
    get txtMobile() { return $("//input[@id='phone_mobile']") }
    get txtAlias() { return $("//input[@id='alias']") }
    get txtCompany() { return $("//input[@id='company']") }
    get txtAddress1() { return $("//input[@id='address1']") }
    get txtAddress2() { return $("//input[@id='address2']") }
    get txtCity() { return $("//input[@id='city']") }
    get lstDay() { return $("//select[@id='days']") }
    get lstMonth() { return $("//select[@id='months']") }
    get lstYear() { return $("//select[@id='years']") }
    get lstState() { return $("//select[@id='id_state']") }
    get rdbMr() { return $("//input[@id='id_gender1']") }
    get rdbMrs() { return $("//input[@id='id_gender2']") }
    get chkNewsletter() { return $("//input[@id='newsletter']") }
    get chkOptIn() { return $("//input[@id='optin']") }
    get pageHeading() { return $("//h1") }
    get btnSubmitAccount() { return $("//button[@id='submitAccount']") }

    async getPageHeading() {
        return this.pageHeading.getText()
    }

    async setFirstName(first) {
        await this.txtFirstName.setValue(first)
    }

    async setLastName(last) {
        await this.txtLastName.setValue(last)
    }    

    async setPassword(password) {
        await this.txtPassword.setValue(password)
    }

    async setZip(zip) {
        await this.txtZip.setValue(zip)
    }

    async setAdditionalInformation(info) {
        await this.txtOther.setValue(info)
    }

    async setPhone(phone) {
        await this.txtPhone.setValue(phone)
    }

    async setMobile(phone) {
        await this.txtMobile.setValue(phone)
    }

    async setAlias(alias) {
        await this.txtAlias.setValue(alias)
    }

    async setCompany(company) {
        await this.txtCompany.setValue(company)
    }

    async setAddress1(address1) {
        await this.txtAddress1.setValue(address1)
    }

    async setAddress2(address2) {
        await this.txtAddress2.setValue(address2)
    }

    async setCity(city) {
        await this.txtCity.setValue(city)
    }

    async setCountry(idx) {
        await this.lstCountry.selectByIndex(idx)
    }

    async setDOBDay(day) {
        await this.lstDay.selectByAttribute('value', day)
    }

    async setDOBMonth(month) {
        await this.lstMonth.selectByAttribute('value', month)
    }

    async setDOBYear(year) {
        await this.lstYear.selectByAttribute('value', year)
    }

    async clickSignUpForNewsletter() {
        await this.chkNewsletter.click()
    }

    async clickOptIn() {
        await this.chkOptIn.click()
    }

    async setState(idx) {
        await this.lstState.selectByAttribute("value", String(idx))
    }

    async clickMr() {
        await this.rdbMr.click()
    }

    async clickMrs() {
        await this.rdbMrs.click()
    }

    async clickSubmitAccount() {
        await this.btnSubmitAccount.click()
    }
}

module.exports = new CreateAccountPage();