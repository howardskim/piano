const keys = document.querySelectorAll('.key');
const blackKeys = ['s', 'd', 'g', 'h', 'j'];
const whiteKeys = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];
const blackDivs = document.querySelectorAll('.black');
const whiteDivs = document.querySelectorAll('.white')
keys.forEach((key) => {
    key.addEventListener('click', () => {
        playAudio(key);
    });
});

function playAudio(keyDiv){
    keyDiv.classList.toggle('active')
    let note = keyDiv.getAttribute('data-note');
    let audioToPlay = document.getElementById(note);
    audioToPlay.currentTime = 0;
    audioToPlay.play();
    audioToPlay.addEventListener('ended', () => {
        keyDiv.classList.remove('active')
    })
}
document.addEventListener('keydown', (e) => {
   if(e.repeat) return;
   let keyPressed = e.key;
   let whiteIndex = whiteKeys.indexOf(keyPressed);
   let blackIndex = blackKeys.indexOf(keyPressed)
   if(whiteIndex > -1){
        playAudio(whiteDivs[whiteIndex])
   } else if (blackIndex > -1){
       playAudio(blackDivs[blackIndex])
   } else {
       return;
   }
})