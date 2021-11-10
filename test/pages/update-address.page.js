class UpdateAddressesPage {
    get addressesRow() { return $("//div[@class='addresses']") }
    get txtFirstName() { return $("//input[@id='firstname']") }
    get txtLastName() { return $("//input[@id='lastname']") }
    get txtCompany() { return $("//input[@id='company']") }
    get txtAddress1() { return $("//input[@id='address1']") }
    get txtAddress2() { return $("//input[@id='address2']") }
    get txtCity() { return $("//input[@id='city']") }
    get lstState() { return $("//select[@id='id_state']") }
    get txtZip() { return $("//input[@id='postcode']") }
    get lstCountry() { return $("//select[@id='id_country']") }
    get txtPhone() { return $("//input[@id='phone']") }
    get txtMobile() { return $("//input[@id='phone_mobile']") }
    get txtOther() { return $("//textarea[@id='other']") }
    get txtAlias() { return $("//input[@id='alias']") }
    get btnSubmitAddress() { return $("//button[@id='submitAddress']") }
    get txtOther() { return $("//textarea[@name='other']") }

    async setOther(other) {
        await this.txtOther.setValue(other)
    }

    async clickSubmitAddress() {
        await this.btnSubmitAddress.click()
    }
    
    async getNumAddresses() {
        const addresses = this.addressesRow.$$("//a[@title='Update']")
        return addresses.length
    }

    async clickUpdateAddress(idx) {
        const address = this.addressesRow.$$("//a[@title='Update']")[idx]
        await address.click()
    }

    async setFirstName(firstName) {
        await this.txtFirstName.setValue(firstName)
    }

    async getFirstName() {
        return this.txtFirstName.getValue()
    }

    async setLastName(lastName) {
        await this.txtLastName.setvalue(lastName)
    }

    async getLastName() {
        return this.txtLastName.getValue()
    }

    async setCompany(company) {
        await this.txtCompany.setValue(company)
    }

    async getCompany() {
        return this.txtCompany.getValue()
    }

    async setAddress1(address) {
        await this.txtAddress1.setValue(address)
    }

    async getAddress1() {
        return this.txtAddress1.getValue()
    }

    async setAddress2(address) {
        await this.txtAddress2.setValue(address)
    }

    async getAddress2() {
        return this.txtAddress2.getValue()
    }

    async setCity(city) {
        await this.txtCity.setValue(city)
    }

    async getCity() {
        return this.txtCity.getValue()
    }

    async setState(idx) {
        await this.lstState.selectByAttribute("value", String(idx))
    }

    async getState() {
        return this.lstState.getValue()
    }

    async setZip(zip) {
        await this.txtZip.setValue(zip)
    }

    async getZip() {
        return this.txtZip.getValue()
    }

    async getCountry() {
        return this.lstCountry.getValue()
    }

    async setPhone(phone) {
        await this.txtPhone.setValue(phone)
    }

    async getPhone() {
        return this.txtPhone.getValue()
    }

    async setMobile(phone) {
        await this.txtMobile.setValue(phone)
    }

    async getMobile() {
        return this.txtMobile.getValue()
    }

    async setAdditionalInformation(info) {
        await this.txtOther.setValue(info)
    }

    async getAdditionalInformation() {
        return this.txtOther.getValue()
    }

    async setAlias(alias) {
        this.txtAlias.setValue(alias)
    }

    async getAlias() {
        return this.txtAlias.getValue()
    }
}

module.exports = new UpdateAddressesPage();
