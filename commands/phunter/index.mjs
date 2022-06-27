import {
	getScreen,
	showTemplateScreen,
	addTemplate,
	clear
} from "../../util/screens.js";
import { type, waitForKey } from "../../util/io.js";
import say from "../../util/speak.js";
import alert from "../../util/alert.js";
import pause from "../../util/pause.js";
import Game from "./game.mjs";
const eightbitsurf = new Audio("./sound/8-bit-surf.mp3");
const losesong = new Audio("./sound/jingle-lose.wav");
const output = [
	"Loading...",
	"   ",
	"Textures......................... OK",
	"Character models................. OK",
	"Generating random map............ OK",
	"Making a little tune............. OK",
	"Enhancing graphics............... 👌",
	"Making a sandwich................ OK",
	"   ",
	"   ",
	"   "
];

var result = "";
async function phunter() {
	clear();
	say("PRESENT HUNTER", 0.5, 0.8);
	eightbitsurf.play();
	return new Promise(async (resolve) => {
		// LOGO
		let logoScreen = await showTemplateScreen("logo");
		pause(2);

		await waitForKey();
		logoScreen.remove();

		let introScreen = await showTemplateScreen("intro");
		await waitForKey();
		introScreen.remove();

		// Main game screen
		let gameScreen = getScreen("rogue");

		// Create the output for messages
		let output = document.createElement("div");
		output.classList.add("output");
		gameScreen.appendChild(output);

		addTemplate("layout", gameScreen);

		let body = getComputedStyle(document.body);
		let settings = {
			container: document.querySelector(".layout .mid"),
			fg: body.getPropertyValue("--color"),
			wall: body.getPropertyValue("--bg"),
			bg: body.getPropertyValue("--off"),
			fontSize: 24,
			width: 10,
			height: 10,
			forceSquareRatio: true, // display is buggy without this?
			onLose: () => {
				gameScreen.remove();
				result = "lose";
				losesong.play();
				resolve();
			},
			onWin: () => {
				gameScreen.remove();
				result = "win";
				resolve();
			},
			onQuit: () => {
				gameScreen.remove();
				result = "lose";
				resolve();
			},
			onMessage: async (txt) => {
				output.innerHTML = "";
				await type(txt, { initialWait: 0 }, output);
				await pause(2);
				output.innerHTML = "";
			},
			onAlert: async (txt) => {
				say(txt);
				await alert(txt);
			}
		};

		new Game(settings);

		eightbitsurf.pause();
	});
}

const templates = ["phunter"];

export default phunter;
export { result, output, templates };
