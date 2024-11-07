const audioPlayer = document.getElementById('audioPlayer');
const playPauseButton = document.getElementById('playPauseButton');
const progressBar = document.getElementById('progressBar');
const progress = document.getElementById('progress');
const currentTimeDisplay = document.getElementById('currentTime');
const durationDisplay = document.getElementById('duration');

let isPlaying = false;
let currentTrack = 0;
const tracks = [
    "./Audio/bensound-brighterthanever.mp3",
    "./Audio/bensound-colorbeams.mp3",
    "./Audio/bensound-getwhatyouwant.mp3"
];

audioPlayer.src = tracks[currentTrack];

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = Math.floor(seconds % 60);
    return `${minutes < 10 ? '0' + minutes : minutes}:${secondsLeft < 10 ? '0' + secondsLeft : secondsLeft}`;
}

audioPlayer.addEventListener('loadedmetadata', () => {
    const duration = audioPlayer.duration;
    if (!isNaN(duration)) {
        durationDisplay.textContent = formatTime(duration);
    }
});

audioPlayer.ontimeupdate = function () {
    const currentTime = audioPlayer.currentTime;
    const duration = audioPlayer.duration;

    if (!isNaN(duration) && !isNaN(currentTime)) {
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = progressPercent + '%';
        currentTimeDisplay.textContent = formatTime(currentTime);
    }
};

function togglePlayPause() {
    if (isPlaying) {
        audioPlayer.pause();
        playPauseButton.innerHTML = '▶️';
    } else {
        audioPlayer.play();
        playPauseButton.innerHTML = '⏸️';
    }
    isPlaying = !isPlaying;
}

function nextTrack() {
    currentTrack = (currentTrack + 1) % tracks.length;
    audioPlayer.src = tracks[currentTrack];
    audioPlayer.play();
    isPlaying = true;
    playPauseButton.innerHTML = '⏸️';
}


function previousTrack() {
    currentTrack = (currentTrack - 1 + tracks.length) % tracks.length; 
    audioPlayer.src = tracks[currentTrack];
    audioPlayer.play();
    isPlaying = true;
    playPauseButton.innerHTML = '⏸️';
}


audioPlayer.addEventListener('ended', () => {
    playPauseButton.innerHTML = '▶️';
    isPlaying = false;
});


progressBar.addEventListener('click', (e) => {
    const rect = progressBar.getBoundingClientRect(); 
    const offsetX = e.clientX - rect.left; 
    const width = rect.width; 
    const duration = audioPlayer.duration; 
    const clickPosition = (offsetX / width) * duration;
    audioPlayer.currentTime = clickPosition; 
});
