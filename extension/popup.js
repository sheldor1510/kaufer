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

window.onload = () => {
    chrome.tabs.query({currentWindow: true, active: true}, (tabs) => { 
        const url = tabs[0].url 
        if (url.includes('https://www.amazon.in' || 'https://amazon.in')) {
            chrome.tabs.executeScript({
                code: 'document.getElementById("productTitle").innerHTML'
            }, (results) => {
                if (results[0]) {
                    const productName = results[0].trim()
                    document.getElementById('productName').innerText = formatName(productName) + '...'
                    fetch(`https://kaufer.anshulsaha.repl.co/yt?productName=${productName}`)
                    .then(async (resp) => {
                        const response = await resp.json()
                        alert(response)
                    })
                    .catch(err => alert(err))
                } else {
                    document.getElementById('productName').innerText = 'details will show up only on an amazon product page'
                }
            });
            chrome.tabs.executeScript({
                code: 'document.getElementById("priceblock_dealprice").innerHTML'
            }, (results) => {
                if (results[0]) {
                    document.getElementById('productPrice').innerText = results[0].trim();
                }
            });         
        }
    });
}