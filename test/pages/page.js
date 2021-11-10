const utils = require("../utils/utils")

module.exports = class Page {
    get mnuWomen() { return $("//a[@title='Women']") }
    get mnuDresses() { return $("//a[@title='Dresses']/parent::li") }
    get btnTShirts() { return $("//a[@title='T-shirts']") }
    get btnBlouses() { return $("//a[@title='Blouses']") }
    get btnEveningDresses() { return $("//a[@title='Evening Dresses']") }
    get btnCasualDresses() { return $("//a[@title='Casual Dresses']") }
    get btnSummerDresses() { return $("//a[@title='Summer Dresses']") }
    get btnContactUs() { return $("//a[@title='Contact Us']") }
    get btnSignOut() { return $("//a[@title='Log me out']") }

    async clickSignOut() {
        await this.btnSignOut.click()
    }

    async clickDresses() {
        await this.mnuDresses.click()
    }

    async clickWomen() {
        await this.mnuWomen.click()
    }

    async clickTShirts() {
        await this.mnuWomen.moveTo()
        await this.btnTShirts.waitForDisplayed()
        await this.btnTShirts.click()
    }

    async clickBlouses() {
        await this.mnuWomen.moveTo()
        await this.btnBlouses.waitForDisplayed()
        await this.btnBlouses.click()
    }

    async clickEveningDresses() {
        await this.mnuDresses.moveTo()
        await this.btnEveningDresses.waitForDisplayed()
        await this.btnEveningDresses.click()
    }

    async clickCasualDresses() {
        await this.mnuDresses.moveTo()
        await this.btnEveningDresses.waitForDisplayed()
        await this.btnEveningDresses.click()
    }

    async clickSummerDresses() {
        await this.mnuDresses.moveTo()
        await this.btnSummerDresses.waitForDisplayed()
        await this.btnSummerDresses.click()
    }

    async clickContactUs() {
        await this.btnContactUs.click()
    }

    async open(controller="", maximize=true) {
        const url = `http://automationpractice.com/index.php${controller === "" ? "" : `?controller=${controller}`}`
        await browser.url(url)

        if (maximize) {
            await browser.maximizeWindow()
        }
    }
}