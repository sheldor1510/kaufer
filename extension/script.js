const youTube = document.getElementById('youtube');
const twitter = document.getElementById('twitter');
const main = document.getElementById('main');
const footer = document.getElementById('footer');
const heading = document.getElementById('heading');

twitter.addEventListener('click', ()=>{
    main.innerHTML = ``
    twitter.style.backgroundColor = '#7AC7F6'
    youTube.style.backgroundColor = '#C3E2F5'
    main.style.backgroundColor = '#7AC7F6'
    footer.style.backgroundColor = '#C3E2F5'
    heading.style.backgroundColor = '#C3E2F5'
    for(i=0; i<5; i++){
        main.innerHTML += `<div class="card" id="twt-card">
        <div class="twt-thumbnail">
            <div class="pfp" style="background: url('https://github.com/gigabite-pro.png'); background-position: center; background-size: contain;">
            </div>
        </div>
        <div class="twt-info">
            <div class="twt-name">
                HP Pavilion Gaming Laptop
            </div>
            <div class="twt-username">
                Vaibhav Sharma
            </div>
        </div>
    </div>`
    }
});

youtube.addEventListener('click', ()=>{
    main.innerHTML = ``
    twitter.style.backgroundColor = '#FFE8E8'
    youTube.style.backgroundColor = '#FAB4B4'
    main.style.backgroundColor = '#FAB4B4'
    footer.style.backgroundColor = '#FFE8E8'
    heading.style.backgroundColor = '#FFE8E8'
    for(i=0; i<5; i++){
        main.innerHTML += `<div class="card" id="yt-card">
        <div class="yt-thumbnail">
        </div>
        <div class="yt-info">
            <div class="yt-video-name">
                HP Pavilion Gaming Laptop
            </div>
            <div class="yt-channel-name">
                Vaibhav Sharma
            </div>
        </div>
    </div>`
    }
})
