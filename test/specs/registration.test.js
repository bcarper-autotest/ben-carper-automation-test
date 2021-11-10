const LoginPage = require('../pages/login.page');
const CreateAccountPage = require('../pages/create-account.page')
const MyAccountPage = require('../pages/my-account.page')
const MyAddressesPage = require('../pages/my-addresses.page')
const faker = require('faker');
const UpdateAddressPage = require('../pages/update-address.page');
const PersonalInformationPage = require('../pages/personal-information.page');
const Utils = require('../utils/utils')

describe('Registration', () => {
    it('should successfully register account and save information', async () => {
        await LoginPage.open();

        // variables used for validation later on
        const userId = Math.round(10000000 + Math.random() * 89999999)
        const firstName = faker.name.firstName()
        const lastName = faker.name.lastName()
        const company = faker.company.companyName()
        const password = "password"
        const emailAddress = `bcat1121_${firstName}_${lastName}_${userId}@maildrop.cc`
        const address1 = faker.address.streetAddress()
        const address2 = faker.address.secondaryAddress()
        const city = faker.address.cityName()
        const mobile = Math.round(1000000000 + Math.random() * 8999999999)
        const phone = Math.round(1000000000 + Math.random() * 8999999999)
        const state = 15
        const zip = Math.round(10000 + Math.random() * 89999)
        const alias = "test alias"
        const dobDay = 1
        const dobMonth = 10
        const dobYear = 1990
        const additionalInfo = "test additional info"

        // Fill out account creation information
        await LoginPage.setEmailAddressCreate(emailAddress)
        await LoginPage.clickCreateAccount()
        await CreateAccountPage.setFirstName(firstName)
        await CreateAccountPage.setLastName(lastName)
        await CreateAccountPage.setPassword(password)
        await CreateAccountPage.setCompany(company)
        await CreateAccountPage.clickMr()
        await CreateAccountPage.setDOBDay(dobDay)
        await CreateAccountPage.setDOBMonth(dobMonth)
        await CreateAccountPage.setDOBYear(dobYear)
        await CreateAccountPage.setMobile(mobile)
        await CreateAccountPage.setPhone(phone)
        await CreateAccountPage.setCountry(1)
        await CreateAccountPage.setAddress1(address1)
        await CreateAccountPage.setAddress2(address2)
        await Utils.retry(async () => await CreateAccountPage.setState(state))
        await CreateAccountPage.setCity(city)
        await CreateAccountPage.setZip(zip)
        await CreateAccountPage.setAlias(alias)
        await CreateAccountPage.setAdditionalInformation(additionalInfo)
        await CreateAccountPage.clickOptIn()
        await CreateAccountPage.clickSubmitAccount()

        // Verify address information matches what was used for account creation
        await MyAccountPage.clickAddresses()

        const count = await MyAddressesPage.getNumAddresses()
        expect(count).toEqual(1)
        await MyAddressesPage.clickUpdateAddress(0)

        // Get name and address information
        var firstNameVal = await UpdateAddressPage.getFirstName()
        var lastNameVal = await UpdateAddressPage.getLastName()
        var companyVal = await UpdateAddressPage.getCompany()
        var address1Val = await UpdateAddressPage.getAddress1()
        var address2Val = await UpdateAddressPage.getAddress2()
        var cityVal = await UpdateAddressPage.getCity()
        var stateVal = await UpdateAddressPage.getState()
        var zipVal = await UpdateAddressPage.getZip()
        var homeVal = await UpdateAddressPage.getPhone()
        var mobileVal = await UpdateAddressPage.getMobile()
        var otherVal = await UpdateAddressPage.getAdditionalInformation()
        var aliasVal = await UpdateAddressPage.getAlias()

        // Verify name and address information is correct
        expect(firstNameVal).toEqual(firstName)
        expect(lastNameVal).toEqual(lastName)
        expect(companyVal).toEqual(company)
        expect(address1Val).toEqual(address1)
        expect(address2Val).toEqual(address2)
        expect(cityVal).toEqual(city)
        expect(Number(stateVal)).toEqual(state)
        expect(zipVal).toEqual(String(zip))
        expect(homeVal).toEqual(String(phone))
        expect(mobileVal).toEqual(String(mobile))
        expect(otherVal).toEqual(additionalInfo)
        expect(aliasVal).toEqual(alias)

        // Navigate to personal information
        await MyAccountPage.open()
        await MyAccountPage.clickPersonalInformation()

        // Get email and date of birth along with opt in status
        var emailVal = await PersonalInformationPage.getEmail()
        var dobDayVal = await PersonalInformationPage.getDOBDay()
        var dobMonthVal = await PersonalInformationPage.getDOBMonth()
        var dobYearVal = await PersonalInformationPage.getDOBYear()
        var optIn = await PersonalInformationPage.isOptInChecked()

        // Verify what appears is what was submitted
        expect(emailVal).toEqual(emailAddress)
        expect(Number(dobDayVal)).toEqual(dobDay)
        expect(Number(dobMonthVal)).toEqual(dobMonth)
        expect(Number(dobYearVal)).toEqual(dobYear)
        expect(optIn).toEqual(true)
    });
});