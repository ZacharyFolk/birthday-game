import {
	getScreen,
	showTemplateScreen,
	addTemplate,
	clear
} from "../../util/screens.js";

import { prompt, input, type, waitForKey } from "../../util/io.js";
import pause from "../../util/pause.js";
const gameboy = new Audio("./sound/gameboy_by_omka.mp3");

const output = [
	"Loading dad talk...",
	"..........................",
	" ",
	"Initiate Virtual Dad...",
	"..........................",
	" ",
	"Loading amazing assets... ",
	"......................................."
];

async function dadtalk() {
	clear();
	gameboy.play();
	return new Promise(async (resolve) => {
		let mainScreen = await showTemplateScreen("dadscreen");

		const container = document.querySelector(".textbox");
		await pause(10);
		await type(
			[
				"Happy birthday my wonderful son!",
				"This is the last part of the program..",
				"It has been a blast to make it for you.",
				"You are an excellent muse :)",
				"And an amazing artist!"
			],
			{
				wait: 100,
				clearContainer: true,
				lineWait: 2000,
				finalWait: 5000
			},
			container
		);
		clear();

		await type(
			[
				"Henry, you are a gift to the universe.",
				"The ideas from your brain are as unique as your fingerprints.",
				"I want to help you and inspire you",
				"To express and share your creative powers"
			],
			{
				wait: 100,
				clearContainer: true,
				lineWait: 2000,
				finalWait: 5000
			},
			container
		);
		clear();

		await type(
			[
				"So without much more dad talk",
				"Other than.. I love you very much",
				"💖 💖 💖",
				"I have one more present for you...",
				"A tool to help you on your journey",
				"Here is your clue!"
			],
			{
				wait: 100,
				clearContainer: true,
				lineWait: 2000,
				finalWait: 5000
			},
			container
		);
		clear();

		let keys = document.querySelector(".keys");
		keys.classList.add("keyfob");
		await type(
			["Press any key to continue"],
			{
				wait: 100,
				clearContainer: true,
				lineWait: 2000,
				finalWait: 5000
			},
			container
		);
		await waitForKey();
		await type(
			[
				"Ok you probably want to play with that now..",
				"Returning to main terminal... ",
				"Type help at anytime for more commands."
			],
			{
				wait: 100,
				clearContainer: true,
				lineWait: 2000,
				finalWait: 5000
			},
			container
		);
		mainScreen.remove();
		resolve();
	});
}

const templates = ["dadscreen"];

export default dadtalk;
export { output, templates };
