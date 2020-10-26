const msg = document.getElementById('msg');

const randomNum = getRandomNumber();

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

recognition.start();

function onSpeek(e) {
    const message = e.results[0][0].transcript;
    writeMessage(message);
    checkNumber(message);
}

function writeMessage(message) {
    msg.innerHTML = `
    <div>You Said:</div>
    <span class="box">${message}</span>
    `;
}

function checkNumber(message){
    const num = +message;

    if(Number.isNaN(num)){
        msg.innerHTML += '<div>That is not a valid number</div>';
        return;
    }

    if(num > 100 || num < 1){
        msg.innerHTML += '<div>Number must be between 1 and 100</div>';
        return;
    }

    if(num === randomNum ){
        document.body.innerHTML = `
        <h2>Congrats! You have gussed the number!<br><br>It was ${num}</h2>
        <button class="play-again" id="play-again">Play Again</button>
        `;
    } else if(num > randomNum){
        msg.innerHTML += '<div>GO LOWER</div>';
    } else {
        msg.innerHTML += '<div>GO HIGHER</div>';
    }
}

function getRandomNumber() {
    return Math.floor(Math.random() * 101);
}

console.log(randomNum);


recognition.addEventListener('result', onSpeek);

recognition.addEventListener('end', ()=>{
    recognition.start();
});

document.body.addEventListener('click', (e)=>{
    if(e.target.id == 'play-again'){
        window.location.reload();
    }
});