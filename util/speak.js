var synth = window.speechSynthesis;
var voices = synth.getVoices();

let volume = 0;

function say(text, pitch = 1, rate = 1, volume = 0) {
	if (volume === 0) return;
	if (synth.speaking) {
		synth.pause();
		synth.cancel();
	}
	let spokenText = text;
	if (Array.isArray(spokenText)) {
		spokenText = spokenText.join(".");
	}
	let speech = new SpeechSynthesisUtterance(spokenText);
	speech.voice = voices[0];

	console.log(speech);
	speech.pitch = pitch;
	speech.rate = rate;
	speech.volume = volume;
	speech.lang = "en-US";
	synth.speak(speech);
}

function stopSpeaking() {
	console.log("stop talking");
	if (synth) {
		console.log("synth");
		synth.pause();
		synth.cancel();
	}
}

function setVolume(value) {
	volume = value;
}
export { stopSpeaking, setVolume };
export default say;
