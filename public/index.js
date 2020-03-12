const keys = document.querySelectorAll('.key');
const blackKeys = ['s', 'd', 'g', 'h', 'j'];
const whiteKeys = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];
const blackDivs = document.querySelectorAll('.black');
const whiteDivs = document.querySelectorAll('.white');
const recordButton = document.querySelector('.record-button');
const playButton = document.querySelector(".play-button");
const saveButton = document.querySelector(".save-button");

let recordingStartTime;
let songNotes;
const keyMap = [...keys].reduce((map, key) => {
    map[key.dataset.note] = key;
    return map;
}, {})
recordButton.addEventListener('click', toggleRecording);
playButton.addEventListener('click', playSongBack);
saveButton.addEventListener('click', saveSong);
function saveSong(){
    
}
function playSongBack(){
    if(songNotes.length < 1) return;
    playButton.classList.toggle('active');
    if(playButton.classList.contains('active')){
        playSong();
    }
}
function toggleRecording(){
    recordButton.classList.toggle('active');
    playButton.classList.remove('show');
    playButton.classList.remove("active");

    saveButton.classList.remove('show');
    if(isRecording() === true){
        startRecording();
    } else {
        stopRecording();
    }
};
function isRecording(){
    return recordButton.classList.contains('active');
};
function startRecording(){
    recordingStartTime = Date.now();
    songNotes = [];
};
function stopRecording(){
    playButton.classList.add('show');
    saveButton.classList.add('show')
};
function playSong(){
    if(songNotes.length === 0) return;
    songNotes.forEach((note) => {
        setTimeout(() => {
            playAudio(keyMap[note.key])
        }, note.startTime)
    })
}
function recordNote(note) {
  songNotes.push({
    key: note,
    startTime: Date.now() - recordingStartTime
  });
}

keys.forEach((key) => {
    key.addEventListener('click', () => {
        playAudio(key);
    });
});

function playAudio(keyDiv){
    let note = keyDiv.getAttribute('data-note');
    let audioToPlay = document.getElementById(note);
    if(isRecording()){
        recordNote(note);
    } 
    keyDiv.classList.toggle('active')
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