document.addEventListener("DOMContentLoaded", function () {
    var titleElement = document.getElementById("videoTitle");
    var playBtn = document.getElementById("playBtn");
    var pauseBtn = document.getElementById("pauseBtn");
    var playerContainer = document.getElementById("player-container");

    var playlistId = "PLOzDu-MXXLlj7croDcwz33c-a5rpNEBNe";
    var playlistLength = 10; // total number of songs
    var player;

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
                mute: 1
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

    pauseBtn.addEventListener('click', function () {
        player.pauseVideo();
    });
});
