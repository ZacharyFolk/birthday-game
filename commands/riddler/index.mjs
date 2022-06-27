import {
	getScreen,
	showTemplateScreen,
	addTemplate,
	clear
} from "../../util/screens.js";

import { prompt, input, type, waitForKey } from "../../util/io.js";
import pause from "../../util/pause.js";
const hobbitMusic = new Audio("./sound/Gollums_Riddle_from_The_Hobbit.mp3");

const output = [
	"Loading...",
	"Caves......................... OK",
	"Smeagol....................... OK",
	"Present locations............. OK"
];

var result = "";
async function riddler() {
	clear();

	hobbitMusic.play();
	var timer = setInterval(function () {
		hobbitMusic.volume = 0.1;
		clearInterval(timer);
	}, 61200);
	await pause(3);
	creepSpeak("The Cave of Riddles");
	await pause(2);
	return new Promise(async (resolve) => {
		let mainScreen = await showTemplateScreen("cave");

		const container = document.querySelector(".textbox");

		pause(20);
		await waitForKey();
		await type(
			[
				"Welcome to the caves",
				"You are trapped here until you can answer my riddles"
			],
			{ wait: 80, lineWait: 1000, finalWait: 4000 },
			container
		);
		await waitForKey();

		await type(
			[
				"The correct answers will also serve as clues...",
				"Where you can find your precious....",
				"Here is the first riddle... "
			],
			{
				clearContainer: true,
				lineWait: 1000,
				finalWait: 4000
			},
			container
		);

		clear(container);
		await riddleOne(container);
		await type(
			[
				"Ok, I hope that was fun.",
				"Here is a little video to show you more about it.."
			],
			{
				lineWait: 2000,
				finalWait: 6000,
				clearContainer: true
			},
			container
		);

		let vid = document.querySelector(".vid-screen");

		vid.classList.add("show-it");
		vid.classList.remove("hide-it");

		await pause(20);
		await type(
			[
				"Not big on the instructions it seems...",
				"But this video will give you some ideas."
			],
			{
				lineWait: 2000,
				finalWait: 6000,
				clearContainer: true
			},
			container
		);
		await type(
			[
				"Let's move on.. still so much to do",
				"Another riddle coming your way...."
			],
			{
				lineWait: 2000,
				finalWait: 6000,
				clearContainer: true
			},
			container
		);
		await waitForKey();
		vid.classList.remove("show-it");
		vid.classList.add("hide-it");

		await riddleTwo(container);
		await caveExit(container);
		mainScreen.remove();
		resolve();
	});
}
let wrong = [0];
let wrong2 = [0];
async function riddleOne(container) {
	clear(container);
	let answer1 = await prompt(
		"A box without hinges, key or lid, yet golden treasure inside is hid.",
		null,
		null,
		container
	);

	await checkAnswerOne(answer1, container);
}

async function riddleTwo(container) {
	clear(container);

	let answer2 = await prompt(
		"What has words, but never speaks?",
		null,
		null,
		container
	);
	await checkAnswerTwo(answer2, container);
}

async function checkAnswerOne(answer1, container) {
	if (answer1 == "eggs" || answer1 == "egg" || wrong[0] == 5) {
		clear(container);
		creepSpeak("Yessss, Eggggs!");
		await type(
			[
				"Yes!  Eggs!  Eggs is the answer",
				"Now...",
				"Go find an egg...."
			],
			{
				lineWait: 1000,
				finalWait: 1000,
				clearContainer: true
			},
			container
		);
		await pause(3);
		await waitForKey();
		await type(
			[
				"Stop clicking already!!",
				"Go find it in the real world!",
				"Away from these infernal machines..",
				"I will be waiting... ",
				"Just press any key when you are ready to continue."
			],
			{
				lineWait: 1000,
				finalWait: 2000,
				clearContainer: true
			},
			container
		);

		await waitForKey();
	} else {
		clear(container);
		let incorrect = wrong[0] + 1;
		wrong[0] = incorrect;

		console.log(incorrect);
		if (incorrect == 1) {
			await type(
				[
					answer1 +
						"... " +
						answer1 +
						" is your answer?!! No, no, no.",
					"Try again."
				],
				{ lineWait: 2000, finalWait: 4000 },
				container
			);
			await riddleOne(container);
		}
		if (incorrect == 2) {
			await type(
				[
					"Oh wow ",
					"Not sure how to put this... ",
					"but " +
						answer1 +
						" could not be more wrong.",
					"A small clue for you...",
					"What has to be broken before you can use it?"
				],
				{
					wait: 30,
					lineWait: 1000,
					finalWait: 3000,
					clearContainer: true
				},
				container
			);
			await riddleOne(container);
		}
		if (incorrect == 3) {
			await type(
				[
					"Hrmmmmmmm... " +
						answer1 +
						" is definitely not right.",
					"Another try for you... ",
					"Another clue for you... ",
					"This thing... it may be refrigerated..",
					"And think outside the box.. ",
					"Like it is totally not a box... ",
					"It has no edges... ",
					"It is very ... shaped",
					"..... "
				],
				{
					lineWait: 1000,
					finalWait: 3000,
					clearContainer: true
				},
				container
			);
			await riddleOne(container);
		}
		if (incorrect == 4) {
			await type(
				[
					"Which came first?",
					"The chicken...",
					"Or..."
				],
				{
					lineWait: 1000,
					finalWait: 3000,
					clearContainer: true
				},
				container
			);

			await riddleOne(container);
		}
		if (incorrect == 5) {
			await type(
				[
					"Ok... you win... ",
					"not by knowing the answer.. ",
					"but through sheer persistence...",
					"It has finally paid off."
				],
				{
					lineWait: 2000,
					finalWait: 4000,
					clearContainer: true
				},
				container
			);

			await checkAnswerOne("eggs", container);
		}
	}
}
async function checkAnswerTwo(answer2, container) {
	if (answer2 == "book" || answer2 == "books" || wrong2[0] == 4) {
		clear(container);
		creepSpeak("Boooooks!");
		await type(
			[
				"Excellent!",
				"Hmm I got one of these for you...",
				"Look under the fishes...."
			],
			{
				lineWait: 2000,
				finalWait: 1000,
				clearContainer: true
			},
			container
		);
		await pause(6);
		await type(
			[
				"I will be waiting... ",
				"Press any key when you are ready to continue."
			],
			{
				lineWait: 2000,
				finalWait: 4000,
				clearContainer: true
			},
			container
		);

		await waitForKey();
	} else {
		clear(container);
		let incorrect = wrong2[0] + 1;
		wrong2[0] = incorrect;

		console.log(incorrect);
		if (incorrect == 1) {
			await type(
				[
					answer2 +
						" is absolutely, positively.... ",
					"Not the correct answer."
				],
				{ lineWait: 3000, finalWait: 4000 },
				container
			);
			riddleTwo(container);
		}
		if (incorrect == 2) {
			await type(
				["Nope"],
				{
					wait: 80,
					lineWait: 3000,
					finalWait: 3000,
					clearContainer: true
				},
				container
			);
			riddleTwo(container);
		}
		if (incorrect == 3) {
			creepSpeak("Oh noooooooooo");
			await type(
				[
					"Hrmmmmmmm... " +
						answer2 +
						" is definitely not right.",
					"Another try for you... ",
					"Another clue for you... ",
					"This thing... it may be refrigerated..",
					"And think outside the box.. ",
					"Like it is totally not a box... ",
					"It has no edges... ",
					"It is very ...urm shaped",
					"..... "
				],
				{
					lineWait: 3000,
					finalWait: 3000,
					clearContainer: true
				},
				container
			);
			riddleTwo(container);
		}
	}
}

async function caveExit(container) {
	let cave = document.querySelector(".cave");

	creepSpeak("Congratulations.. ");
	await type(
		[
			"That is all my riddles for now... ",
			"I do have one more thing for you.",
			"But first, lets get out of this cave!"
		],
		{
			lineWait: 2000,
			finalWait: 4000,
			clearContainer: true
		},
		container
	);
	cave.classList.add("zoom");
	await waitForKey();
}
function creepSpeak(text) {
	var timer = setInterval(function () {
		var voices = speechSynthesis.getVoices();
		if (voices.length !== 0) {
			var msg = new SpeechSynthesisUtterance(text);
			msg.voice = voices[6];
			msg.pitch = 0.4;
			msg.rate = 0.4;
			msg.volue = 0.4;
			speechSynthesis.speak(msg);
			clearInterval(timer);
		}
	}, 200);
}
const templates = ["caves"];

export default riddler;
export { result, output, templates };
