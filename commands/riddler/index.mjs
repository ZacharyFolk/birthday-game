import {
	getScreen,
	showTemplateScreen,
	addTemplate,
	clear
} from "../../util/screens.js";

import { prompt, input, type, waitForKey } from "../../util/io.js";
import say from "../../util/speak.js";
import pause from "../../util/pause.js";
const hobbitMusic = new Audio("./sound/Gollums_Riddle_from_The_Hobbit.mp3");

const output = [
	// "Loading...",
	// "   ",
	// "Cages......................... OK",
	// "Sounds........................ OK",
	// "Awesomeness................... OK",
	// "   ",
	// "   "
];

var result = "";
async function riddler() {
	clear();
	// hobbitMusic.play();
	// var timer = setInterval(function () {
	// 	hobbitMusic.volume = 0.5;
	// 	clearInterval(timer);
	// }, 63200);
	let container = document.getElementById("chalkboard");

	return new Promise(async (resolve) => {
		let mainScreen = await showTemplateScreen("cave");

		await type([
			"I am programmed to understand.",
			"I will play you a song instead."
		]);
		clear();
		await riddleOne();
		//	pause(10);
		//	await waitForKey();
	});
}

async function riddleOne() {
	let answer1 = await prompt(
		"Can I ask you a question",
		false,
		false,
		".chalkboard"
	);

	if (answer1 == "eggs" || answer1 == "egg") {
		await checkAnswer(answer1);
	}
}

async function checkAnswer(answer1) {
	console.log(answer1);
}

// // need timer to wait to fetch voices - bug?
// var timer = setInterval(function () {
// 	var voices = speechSynthesis.getVoices();
// 	if (voices.length !== 0) {
// 		//	console.log(voices);
// 		var msg = new SpeechSynthesisUtterance("Hello old chap.");
// 		msg.voice = voices[6];
// 		msg.pitch = 0.4;
// 		msg.rate = 0.6;
// 		msg.volue = 0.4;
// 		speechSynthesis.speak(msg);
// 		clearInterval(timer);
// 	}
// }, 200);
const templates = ["caves"];

export default riddler;
export { result, output, templates };
