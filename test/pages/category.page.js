const Page = require('./page')

class CategoryPage extends Page {
    get subcategories() { return $("//div[@id='subcategories']") }
    
    async getNumProducts() {
        const products = $$("//div[@class='product-container']//img")
        return products.length
    }

    async clickProduct(idx) {
        const product = $$("//div[@class='product-container']")[idx]
        await product.$("//img").click()
    }

    async getNumSubcategories() {
        this.subcategories.$$("//a[@class='subcategory-name']").length
    }

    async clickSubcategory(idx) {
        category = this.subcategories.$$("//a[@class='subcategory-name']")[idx]
        await category.click()
    }
}

module.exports = new CategoryPage();