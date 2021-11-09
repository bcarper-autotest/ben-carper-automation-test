const LoginPage = require('../pages/login.page');
const CreateAccountPage = require('../pages/create-account.page')
const Utils = require('../utils/utils')
const faker = require('faker');
const productPage = require('../pages/product.page');
const homePage = require('../pages/home.page');
const shoppingCartPage = require('../pages/shopping-cart.page');
const deliveryAddressPage = require('../pages/delivery-address.page');
const shippingPage = require('../pages/shipping.page');
const paymentPage = require('../pages/payment.page');
const orderHistoryPage = require('../pages/order-history.page');
const updateAddressPage = require('../pages/update-address.page');

describe('Checkout', () => {
    it.skip('should update price to reflect changes in cart', async () => {        
        await homePage.open()
        await homePage.clickProduct(4)
        await productPage.clickAddToCart()
        await productPage.clickCheckout()

        var unitPriceStr = await shoppingCartPage.getUnitPrice(0)
        var unitPrice = Number(unitPriceStr.slice(1))
        var totalPriceStr = await shoppingCartPage.getLineTotalPrice(0)
        var totalPrice = Number(totalPriceStr.slice(1))
        expect(totalPrice).toEqual(unitPrice)

        await shoppingCartPage.setProductQuantity(0, 2)
        await Utils.retry(async () => {
            totalPriceStr = await shoppingCartPage.getLineTotalPrice(0)
            totalPrice = Number(totalPriceStr.slice(1))
            expect(totalPrice).toEqual(unitPrice * 2)
        })

        await shoppingCartPage.setProductQuantity(0, 1)
        await Utils.retry(async () => {
            totalPriceStr = await shoppingCartPage.getLineTotalPrice(0)
            totalPrice = Number(totalPriceStr.slice(1))
            expect(totalPrice).toEqual(unitPrice)
        })

        await shoppingCartPage.deleteProduct(0)
    })

    it.skip('should remove item when delete is clicked', async () => {        
        await homePage.open()
        await homePage.clickProduct(4)
        await productPage.clickAddToCart()
        await productPage.clickContinueShopping()
        await browser.back()
        await homePage.clickProduct(2)
        await productPage.clickAddToCart()
        await productPage.clickCheckout()

        var numProducts = await shoppingCartPage.getNumProducts()
        expect(numProducts).toEqual(2)

        await shoppingCartPage.deleteProduct(1)
        await Utils.retry(async () => {
            numProducts = await shoppingCartPage.getNumProducts()
            expect(numProducts).toEqual(1)
        })

        await shoppingCartPage.deleteProduct(0)
    })

    it.skip('should remove item from cart when quantity is zero', async () => {        
        await homePage.open()
        await homePage.clickProduct(4)
        await productPage.clickAddToCart()
        await productPage.clickContinueShopping()
        await browser.back()
        await homePage.clickProduct(2)
        await productPage.clickAddToCart()
        await productPage.clickCheckout()

        var numProducts = await shoppingCartPage.getNumProducts()
        expect(numProducts).toEqual(2)

        await shoppingCartPage.clickIncreaseQuantity(1)
        
        await Utils.retry(async () => {
            var quantity = await shoppingCartPage.getProductQuantity(1)
            expect(quantity).toEqual(2)
        })

        await shoppingCartPage.clickDecreaseQuantity(1)
        
        await Utils.retry(async () => {
            var quantity = await shoppingCartPage.getProductQuantity(1)
            expect(quantity).toEqual(1)
        })

        await shoppingCartPage.setProductQuantity(1, 0)
        await Utils.retry(async () => {
            numProducts = await shoppingCartPage.getNumProducts()
            expect(numProducts).toEqual(1)
        })

        await shoppingCartPage.deleteProduct(0)
    })

    it('should successfully check out using bank wire with existing user', async () => {        
        await homePage.open()
        await homePage.clickProduct(4)
        await productPage.clickAddToCart()
        await productPage.clickContinueShopping()
        await browser.back()
        await homePage.clickProduct(2)
        await productPage.clickAddToCart()
        await productPage.clickCheckout()
        var finalPrice = await shoppingCartPage.getFinalPrice()
        await shoppingCartPage.clickProceedToCheckout()
        await LoginPage.setEmailAddress("test0125@maildrop.cc")
        await LoginPage.setPassword("password")
        await LoginPage.clickSignIn()
        await deliveryAddressPage.clickProceedToCheckout()
        await shippingPage.clickTermsOfService()
        await shippingPage.clickProceedToCheckout()
        await paymentPage.clickPayByBankWire()
        await paymentPage.clickConfirmOrder()
        await paymentPage.clickBackToOrders()
        var orderCount = await orderHistoryPage.getOrderCount()
        var orderPrice = await orderHistoryPage.getOrderPrice(0)
        expect(orderCount).toBeGreaterThanOrEqual(1)
        expect(orderPrice).toEqual(finalPrice)
        await orderHistoryPage.clickSignOut()
    })

    it.skip('should successfully check out using pay by bank wire with new user', async () => {        
        await homePage.open()
        await homePage.clickProduct(4)
        await productPage.clickAddToCart()
        await productPage.clickContinueShopping()
        await browser.back()
        await homePage.clickProduct(2)
        await productPage.clickAddToCart()
        await productPage.clickCheckout()
        var finalPrice = await shoppingCartPage.getFinalPrice()
        await shoppingCartPage.clickProceedToCheckout()

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
        await deliveryAddressPage.clickProceedToCheckout()
        await shippingPage.clickTermsOfService()
        await shippingPage.clickProceedToCheckout()
        await paymentPage.clickPayByBankWire()
        await paymentPage.clickConfirmOrder()
        await paymentPage.clickBackToOrders()
        var orderCount = await orderHistoryPage.getOrderCount()
        var orderPrice = await orderHistoryPage.getOrderPrice(0)
        expect(orderCount).toEqual(1)
        expect(orderPrice).toEqual(finalPrice)
        await orderHistoryPage.clickSignOut()
    })

    it.skip('should add new delievery address during checkout', async () => {        
        await homePage.open()
        await homePage.clickProduct(4)
        await productPage.clickAddToCart()
        await productPage.clickContinueShopping()
        await browser.back()
        await homePage.clickProduct(2)
        await productPage.clickAddToCart()
        await productPage.clickCheckout()
        await shoppingCartPage.clickProceedToCheckout()

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

        await deliveryAddressPage.clickUseDeliveryAddressAsBillingAddress()
        var exists = await delieveryAddressPage.btnAddNewAddressInvoice.isExisting()
        expect(exists).toEqual(true)

        await deliveryAddressPage.clickAddNewAddress()        
        
        const address1_new = faker.address.streetAddress()
        const address2_new = faker.address.secondaryAddress()
        const city_new = faker.address.cityName()
        const mobile_new = Math.round(1000000000 + Math.random() * 8999999999)
        const phone_new = Math.round(1000000000 + Math.random() * 8999999999)
        const state_new = 16
        const zip_new = Math.round(10000 + Math.random() * 89999)
        const alias_new = "new alias"
        const additional_new = "test additional info"

        await updateAddressPage.setAddress1(address1_new)
        await updateAddressPage.setAddress2(address2_new)
        await updateAddressPage.setCity(city_new)
        await updateAddressPage.setState(state_new)
        await updateAddressPage.setZip(zip_new)
        await updateAddressPage.setPhone(phone_new)
        await updateAddressPage.setMobile(mobile_new)
        await updateAddressPage.setAlias(alias_new)
        await updateAddressPage.setOther(additional_new)
        await updateAddressPage.clickSubmitAddress()

        const aliasCount = await deliveryAddressPage.getNumAddresses()
        expect(aliasCount).toEqual(2)

        await deliveryAddressPage.selectInvoiceAddress(1)
        await deliveryAddressPage.clickProceedToCheckout()
        await deliveryAddressPage.clickSignOut()
    })

    it.skip('should add new invoice address during checkout', async () => {        
        await homePage.open()
        await homePage.clickProduct(4)
        await productPage.clickAddToCart()
        await productPage.clickContinueShopping()
        await browser.back()
        await homePage.clickProduct(2)
        await productPage.clickAddToCart()
        await productPage.clickCheckout()
        await shoppingCartPage.clickProceedToCheckout()

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

        await deliveryAddressPage.clickUseDeliveryAddressAsBillingAddress()
        var exists = await delieveryAddressPage.btnAddNewAddressInvoice.isExisting()
        expect(exists).toEqual(true)

        await deliveryAddressPage.clickAddNewInvoiceAddress()        
        
        const address1_new = faker.address.streetAddress()
        const address2_new = faker.address.secondaryAddress()
        const city_new = faker.address.cityName()
        const mobile_new = Math.round(1000000000 + Math.random() * 8999999999)
        const phone_new = Math.round(1000000000 + Math.random() * 8999999999)
        const state_new = 16
        const zip_new = Math.round(10000 + Math.random() * 89999)
        const alias_new = "new alias"
        const additional_new = "test additional info"

        await updateAddressPage.setAddress1(address1_new)
        await updateAddressPage.setAddress2(address2_new)
        await updateAddressPage.setCity(city_new)
        await updateAddressPage.setState(state_new)
        await updateAddressPage.setZip(zip_new)
        await updateAddressPage.setPhone(phone_new)
        await updateAddressPage.setMobile(mobile_new)
        await updateAddressPage.setAlias(alias_new)
        await updateAddressPage.setOther(additional_new)
        await updateAddressPage.clickSubmitAddress()

        const aliasCount = await deliveryAddressPage.getNumAddresses()
        expect(aliasCount).toEqual(2)

        await deliveryAddressPage.selectInvoiceAddress(1)
        await deliveryAddressPage.clickProceedToCheckout()
        await deliveryAddressPage.clickSignOut()
    })

    it.skip('should successfully check out using pay by check with new user', async () => {        
        await homePage.open()
        await homePage.clickProduct(4)
        await productPage.clickAddToCart()
        await productPage.clickContinueShopping()
        await browser.back()
        await homePage.clickProduct(2)
        await productPage.clickAddToCart()
        await productPage.clickCheckout()
        var finalPrice = await shoppingCartPage.getFinalPrice()
        await shoppingCartPage.clickProceedToCheckout()

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
        await deliveryAddressPage.clickProceedToCheckout()
        await shippingPage.clickTermsOfService()
        await shippingPage.clickProceedToCheckout()
        await paymentPage.clickPayByCheck()
        await paymentPage.clickConfirmOrder()
        await paymentPage.clickBackToOrders()
        var orderCount = await orderHistoryPage.getOrderCount()
        var orderPrice = await orderHistoryPage.getOrderPrice(0)
        expect(orderCount).toEqual(1)
        expect(orderPrice).toEqual(finalPrice)
        await orderHistoryPage.clickSignOut()
    })
});