let buttonSound = new Audio("./sound/button.mp3");
let clickSound = new Audio("./sound/click.mp3");
let tadaSound = new Audio("./sound/tada.mp3");
let eightbitsurf = new Audio("./sound/8-bit-surf.mp3");
let fearcastle = new Audio("./sound/castle-of-fear.mp3");
let spacey = new Audio("./sound/spacey.mp3");
let bday = new Audio("./sound/hb128.mp3");

let keys = [
	new Audio("./sound/key1.mp3"),
	new Audio("./sound/key2.mp3"),
	new Audio("./sound/key3.mp3"),
	new Audio("./sound/key4.mp3")
];

function button() {
	buttonSound.play();
}
function click() {
	clickSound.play();
}

function tada() {
	tadaSound.play();
}

function birthdaysong(){
bday.play();
}
function phuntermusic(){
	eightbitsurf.play();
}
function typeSound() {
	let i = Math.floor(Math.random() * keys.length);
	keys[i].currentTime = 0;
	keys[i].play();
}

export { button, click, tada, phuntermusic,birthdaysong, typeSound };
