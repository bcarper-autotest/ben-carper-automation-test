class Utils {
    wait(timeMs) {
        return new Promise(resolve => setTimeout(resolve, timeMs))
    }

    async retry(fn, retries=5) {
        for (var i = 0; i < retries; i++) {
            try {
                fn()
                break
            } catch (err) {
                if (i == retries - 1) {
                    throw err
                }
            }

            await this.wait(1000)
        }
    }
}

module.exports = new Utils()