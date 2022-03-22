const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const audioElement = document.querySelector('audio');
const canvasElement = document.querySelector('canvas');
const canvasCtx = canvasElement.getContext('2d');
const playPauseButton = document.querySelector('.play-pause');
const seekbar = document.querySelector('.seekbar');
const volumeBar = document.querySelector('.volume');


const pauseIcon = `<svg class="material-icons" style="height:20px;transform: translate(0px, -2px);" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"></path></svg>`;
const playIcon = `<svg class="material-icons" style="height:20px;transform: translate(0px, -2px);" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path></svg>`;
const replayIcon = `<<svg class="material-icons" style="height:20px;transform: translate(0px, -2px);" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path><</svg>`;


const WIDTH = canvasElement.clientWidth;
const HEIGHT = canvasElement.clientHeight;
seekbar.value = 0;
volumeBar.value = 100;

let audioState = {
    isReplay : false,
    isPaused : true,
};


playPauseButton.addEventListener('click', togglePlayPause);

audioElement.addEventListener('timeupdate', setProgress);
audioElement.addEventListener('ended', onEnd);
audioElement.addEventListener('canplay',setDuration);
seekbar.addEventListener('input', onSeek);
volumeBar.addEventListener('input', onVolumeSeek);

const source = audioCtx.createMediaElementSource(audioElement);
const analyser = audioCtx.createAnalyser();
analyser.fftSize = 256;

source.connect(analyser);
analyser.connect(audioCtx.destination);

const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

function draw() {
    analyser.getByteFrequencyData(dataArray);
    canvasCtx.fillStyle = 'rgb(32, 36, 39)';
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

    const barWidth = (WIDTH / bufferLength) * 2.5;
    let barHeight;
    let x = 0;

    for(let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 2.8;
        canvasCtx.fillStyle = `rgb(198, 91, 91)`;
        canvasCtx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

        x += barWidth + 1;
    }

    requestAnimationFrame(draw);
}
draw();

function togglePlayPause() {
    audioCtx.resume().then(() => {
        if(audioState.isPaused) {
            playPauseButton.innerHTML = pauseIcon;
            audioElement.play();
        } else {
            if(audioState.isReplay) { // Replay
                playPauseButton.innerHTML = pauseIcon;
                audioElement.play();
                audioState.isReplay = false;
                return;
            }
            playPauseButton.innerHTML = playIcon;
            audioElement.pause();
        }
    
        audioState.isPaused = !audioState.isPaused;
    });
}

function setProgress() {
    seekbar.value =  audioElement.currentTime;
}
function setDuration() {
    seekbar.max = audioElement.duration;
}


function onEnd() {
    playPauseButton.innerHTML = replayIcon;
    audioElement.currentTime = 0;
    seekbar.value = 0;
    audioState.isReplay = true;
}
function onSeek(evt) {
    audioElement.currentTime = evt.target.value;
}

function onVolumeSeek(evt) {
    audioElement.volume = evt.target.value / 100;
}
