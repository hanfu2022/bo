document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('video-url');
    const videoContainer = document.getElementById('video-container');
    const videoElement = document.getElementById('video');

    document.querySelectorAll('.player-box').forEach(playerBox => {
        playerBox.addEventListener('click', () => {
            const videoUrl = urlInput.value;
            if (!videoUrl) {
                alert('Please enter a U3M8 video URL.');
                return;
            }

            // 清空视频元素内容
            videoContainer.innerHTML = '<video id="video" controls width="600"></video>';

            // 选择播放器
            switch (playerBox.id) {
                case 'flowplayer':
                    loadFlowplayer(videoUrl);
                    break;
                case 'shaka':
                    loadShakaPlayer(videoUrl);
                    break;
                case 'clappr':
                    loadClapprPlayer(videoUrl);
                    break;
                case 'videojs':
                    loadVideoJsPlayer(videoUrl);
                    break;
                case 'hlsjs':
                    loadHlsJsPlayer(videoUrl);
                    break;
            }
        });
    });

    // 初始化 Hls.js 播放器
    function loadHlsJsPlayer(url) {
        const video = document.getElementById('video');
        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(url);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, function() {
                video.play();
            });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = url;
            video.addEventListener('loadedmetadata', function() {
                video.play();
            });
        }
    }

    // 初始化 Shaka Player
    function loadShakaPlayer(url) {
        const video = document.getElementById('video');
        const player = new shaka.Player(video);
        player.load(url).then(() => {
            video.play();
        }).catch(error => {
            console.error('Error loading Shaka Player:', error);
        });
    }

    // 初始化 Clappr Player
    function loadClapprPlayer(url) {
        const player = new Clappr.Player({
            source: url,
            parentId: '#video-container',
            autoPlay: true
        });
    }

    // 初始化 Video.js
    function loadVideoJsPlayer(url) {
        const video = document.getElementById('video');
        video.src = url;
        videojs(video, {}, function() {
            this.play();
        });
    }

    // Flowplayer 初始化（需要配置或使用订阅账户）
    function loadFlowplayer(url) {
        alert('Flowplayer integration requires specific configuration or subscription.');
    }
});
