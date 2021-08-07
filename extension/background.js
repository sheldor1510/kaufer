if (window.location.href.includes('https://www.amazon.in' || 'https://amazon.in')) {
    const productName = document.getElementById('productTitle').innerText
    const productPrice = document.getElementById('priceblock_dealprice').innerText
    if (productName && productPrice) {
        console.log(productName, productPrice)
    } else {
        console.log("nah")
    }
}