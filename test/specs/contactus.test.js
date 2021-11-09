const faker = require('faker');
const Utils = require('../utils/utils')
const LoginPage = require('../pages/login.page');
const CreateAccountPage = require('../pages/create-account.page')
const ProductPage = require('../pages/product.page');
const HomePage = require('../pages/home.page');
const ShoppingCartPage = require('../pages/shopping-cart.page');
const DeliveryAddressPage = require('../pages/delivery-address.page');
const ShippingPage = require('../pages/shipping.page');
const PaymentPage = require('../pages/payment.page');
const OrderHistoryPage = require('../pages/order-history.page');
const ContactUsPage = require('../pages/contact-us.page');

describe('Contact Us', () => {
    var emailAddress

    before(async () => {
        await HomePage.open()
        await HomePage.clickProduct(4)
        await ProductPage.clickAddToCart()
        await ProductPage.clickContinueShopping()
        await browser.back()
        await HomePage.clickProduct(2)
        await ProductPage.clickAddToCart()
        await ProductPage.clickCheckout()
        await ShoppingCartPage.clickProceedToCheckout()

        const userId = Math.round(10000000 + Math.random() * 89999999)
        const firstName = faker.name.firstName().replace("'", "")
        const lastName = faker.name.lastName().replace("'", "")
        const company = faker.company.companyName()
        const password = "password"
        emailAddress = `bcat1121_${firstName}_${lastName}_${userId}@maildrop.cc`
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
        await DeliveryAddressPage.clickProceedToCheckout()
        await ShippingPage.clickTermsOfService()
        await ShippingPage.clickProceedToCheckout()
        await PaymentPage.clickPayByBankWire()
        await PaymentPage.clickConfirmOrder()        
        await PaymentPage.clickBackToOrders()
    })

    it('should list order with correct number of products', async () => {        
        await OrderHistoryPage.clickContactUs()
        await ContactUsPage.selectCustomerServiceHeading()
        await ContactUsPage.setMessage('test message')

        var email = await ContactUsPage.getEmail()
        expect(email).toEqual(emailAddress)

        var numOrders = await ContactUsPage.getNumOrders()
        expect(numOrders - 1).toEqual(1)

        await ContactUsPage.selectOrder(1)

        await Utils.retry(async () => {
            var numProducts = await ContactUsPage.getNumProducts()
            expect(numProducts - 1).toEqual(2)
        })

        await ContactUsPage.selectProduct(1)
    })

    it('should successfully send messsage', async () => {
        await ContactUsPage.clickSubmitMessage()
        var text = await ContactUsPage.getAlertText()
        expect(text).toEqual('Your message has been successfully sent to our team.')
    })

    it('should show any new orders in order references', async () => {
        await HomePage.open()
        await HomePage.clickProduct(2)
        await ProductPage.clickAddToCart()
        await ProductPage.clickCheckout()
        await ShoppingCartPage.clickProceedToCheckout()
        await DeliveryAddressPage.clickProceedToCheckout()
        await ShippingPage.clickTermsOfService()
        await ShippingPage.clickProceedToCheckout()
        await PaymentPage.clickPayByBankWire()
        await PaymentPage.clickConfirmOrder()        
        await PaymentPage.clickBackToOrders()    
        await OrderHistoryPage.clickContactUs()
        await ContactUsPage.selectCustomerServiceHeading()
        await ContactUsPage.setMessage('test message')

        var email = await ContactUsPage.getEmail()
        expect(email).toEqual(emailAddress)

        var numOrders = await ContactUsPage.getNumOrders()
        expect(numOrders - 1).toEqual(2)

        await Utils.retry(async () => await ContactUsPage.selectOrder(2))

        await Utils.retry(async () => {
            var numProducts = await ContactUsPage.getNumProducts()
            expect(numProducts - 1).toEqual(1)
        })

        await Utils.retry(async () => await ContactUsPage.selectProduct(1))

        await ContactUsPage.clickSubmitMessage()
        var text = await ContactUsPage.getAlertText()
        expect(text).toEqual('Your message has been successfully sent to our team.')
    })
})