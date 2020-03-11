const keys = document.querySelectorAll('.key');
keys.forEach((key) => {
    key.addEventListener('click', () => {
        playAudio(key);
    });
});

function playAudio(keyDiv){
    console.log('key ', keyDiv);
    keyDiv.classList.toggle('active')
    let note = keyDiv.getAttribute('data-note');
    console.log(note)
    let audioToPlay = document.getElementById(note);
    console.log(audioToPlay)
    audioToPlay.currentTime = 0;
    audioToPlay.play();
}
