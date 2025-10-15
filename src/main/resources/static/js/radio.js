document.addEventListener("DOMContentLoaded", function () {
    var titleElement = document.getElementById("videoTitle");
    var playBtn = document.getElementById("playBtn");
    var pauseBtn = document.getElementById("pauseBtn");
    var playerContainer = document.getElementById("player-container");

    var playlistId = "RDCLAK5uy_kb7EBi6y3GrtJri4_ZH56Ms786DFEimbM";
    var playlistLength = 95; // total number of songs
    var player;

    const video = document.getElementById("bg-video");
    const changeBtn = document.getElementById("changeBgBtn");

    // List of background video paths
    const videos = [
        "/videos/background.mp4",           
        "/videos/background2.mp4",       
        "/videos/background3.mp4",       
    ];

    let currentIndex = 0;

    changeBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % videos.length;
        video.classList.add("opacity-0"); // fade out

        setTimeout(() => {
            video.setAttribute("src", videos[currentIndex]);
            video.load();
            video.play();
            video.classList.remove("opacity-0");
        }, 500); // fade duration
    });

    // Load YouTube IFrame API
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = function () {
        player = new YT.Player('player', {
            height: '315',
            width: '560',
            playerVars: {
                listType: 'playlist',
                list: playlistId,
                autoplay: 1,
                mute: 0
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    };

    function onPlayerReady(event) {
        // Start random song
        var randomIndex = Math.floor(Math.random() * playlistLength);
        player.playVideoAt(randomIndex);

        updateTitle();
    }

    function onPlayerStateChange(event) {
        if (event.data === YT.PlayerState.PLAYING) {
            updateTitle();
        }
    }

    function updateTitle() {
        if (player && player.getVideoData) {
            var data = player.getVideoData();
            titleElement.textContent = data.title || "Unknown Track";
        }
    }

    // Buttons
    playBtn.addEventListener('click', function () {
        player.unMute();
        player.playVideo();
        updateTitle();
    });

    var nextBtn = document.getElementById("nextBtn");

    // Next Button
    nextBtn.addEventListener('click', function () {
        if (player && player.nextVideo) {
            player.nextVideo();   // skips to next video in the playlist
            updateTitle();        // updates title immediately
        }
    });

    pauseBtn.addEventListener('click', function () {
        player.pauseVideo();
    });
});
