import {
	getScreen,
	showTemplateScreen,
	addTemplate,
	clear
} from "../../util/screens.js";
import { waitForKey } from "../../util/io.js";
import say from "../../util/speak.js";
import pause from "../../util/pause.js";
import Game from "./game.mjs";
const psykick = new Audio("./sound/psykick.mp3");

const output = [
	"Loading...",
	"   ",
	"Cages......................... OK",
	"Sounds........................ OK",
	"Awesomeness................... OK",
	"   ",
	"   "
];

var result = "";
async function cagematch() {
	clear();
	say("CAGE MATCH!!", 1, 3, 3);
	psykick.play();

	return new Promise(async (resolve) => {
		// LOGO
		let logoScreen = await showTemplateScreen("cage_intro");
		pause(2);
		await pause(6.8);
		say("CAGE MATCH!!", 1, 3, 3);
		await pause(6);

		await waitForKey();
		logoScreen.remove();
		psykick.pause();

		let gameScreen = getScreen("cards");
		addTemplate("main_game", gameScreen);
		const onGameOver = async () => {
			gameScreen.remove();
			resolve();
		};

		let game = new Game({ onGameOver });
		game.start();
	});
}

const templates = ["cagematch"];

export default cagematch;
export { result, output, templates };
