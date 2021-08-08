const youTube = document.getElementById('youtube');
const twitter = document.getElementById('twitter');
const main = document.getElementById('main');
const footer = document.getElementById('footer');
const heading = document.getElementById('heading');
const loader = document.getElementById('loading');

const formatName = (productName) => {
    if (productName.includes('(')) {
        productName = productName.split('(')[0]
    }
    return productName.substring(0, 25).trim()
}

const twInflator = () => {
    tweetsSearchResults.forEach(sr => {
        main.innerHTML += 
        `<a href=${sr.link} target="_blank" style="text-decoration: none; color: black">
            <div class="card" id="twt-card">
                <div class="twt-thumbnail">
                    <div class="pfp" style="background: url('${sr.pfp}'); background-position: center; background-size: contain;">
                    </div>
                </div>
                <div class="twt-info">
                    <div class="twt-name">
                        ${sr.text.substring(0, 20)}...
                    </div>
                    <div class="twt-username">
                        ${sr.user}
                    </div>
                </div>
            </div>
        </a>`
    })
}

const ytInflator = () => {
    ytSearchResults.forEach(sr => {
        main.innerHTML += 
        `<a href=${sr.link} target="_blank" style="text-decoration: none; color: black">
            <div class="card" id="yt-card">
                <div class="yt-thumbnail" style="background: url('${sr.thumbnail}'); background-size: cover;">
                </div>
                <div class="yt-info">
                    <div class="yt-video-name">
                        ${sr.title.substring(0, 20)}...
                    </div>
                    <div class="yt-channel-name">
                        ${sr['length']}
                    </div>
                </div>
            </div>
        </a>`
    })
}

let ytSearchResults = [];
let tweetsSearchResults = [];

twitter.addEventListener('click', () => {
    main.innerHTML = ``
    twitter.style.backgroundColor = '#7AC7F6'
    youTube.style.backgroundColor = '#C3E2F5'
    main.style.backgroundColor = '#7AC7F6'
    footer.style.backgroundColor = '#C3E2F5'
    heading.style.backgroundColor = '#C3E2F5'
    twInflator()
});

youtube.addEventListener('click', () => {
    main.innerHTML = ``
    twitter.style.backgroundColor = '#FFE8E8'
    youTube.style.backgroundColor = '#FAB4B4'
    main.style.backgroundColor = '#FAB4B4'
    footer.style.backgroundColor = '#FFE8E8'
    heading.style.backgroundColor = '#FFE8E8'
    ytInflator()  
})

window.onload = () => {
    chrome.tabs.query({currentWindow: true, active: true}, (tabs) => { 
        const url = tabs[0].url 
        if (url.includes('https://www.amazon.in' || 'https://amazon.in')) {
            chrome.tabs.executeScript({
                code: 'document.getElementById("productTitle").innerHTML'
            }, (results) => {
                if (results[0]) {
                    main.style.backgroundColor = '#FAB4B4'
                    main.style.overflowY = 'scroll'
                    document.getElementById('tabs').style.display = 'flex'
                    document.getElementById('logo').style.display = 'none'
                    const productName = results[0].trim()
                    document.getElementById('productName').innerText = formatName(productName) + '...'
                    loader.style.display = 'flex';
                    fetch(`https://kaufer.anshulsaha.repl.co/yt?productName=${productName}`)
                    .then(async (resp) => {
                        const response = await resp.json()
                        ytSearchResults = response
                        loader.style.display = 'none';
                        ytInflator()
                        fetch(`https://kaufer.anshulsaha.repl.co/tw?productName=${productName}`)
                        .then(async (twresp) => {
                            const twresponse = await twresp.json()
                            tweetsSearchResults = twresponse
                        })
                        .catch(err => alert(err))
                    })
                    .catch(err => alert(err))
                } else {
                    document.getElementById('productName').innerText = 'Extension will only work on Amazon product pages.'
                    document.getElementById('tabs').style.display = 'none'
                    document.getElementById('logo').style.display = 'block'
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