const formatName = (productName) => {
    if (productName.includes('(')) {
        productName = productName.split('(')[0]
    }
    if (productName.split(' ').length > 3) {
        let newProductName = ''
        productName.split(' ').forEach((word, index) => {
            if (index < 3) {
                newProductName += word + ' '
            }
        })
        return newProductName
    }
    return productName
}

module.exports = { formatName };