import command from "../cowsay/index.mjs";
import pause from "../../util/pause.js";
import { clear } from "../../util/screens.js";
import say from "../../util/speak.js";

async function partycow() {
	return new Promise(async (resolve) => {
		say("Hello... I am party cowwwww", 3, 0.5, 1);

		command("Hello I am party cow");
		await pause(5);
		clear();
		say("I hope you are amooosed", 3, 0.5, 1);

		command("I hope you are amooosed.");

		await pause(5);
		clear();
		command("Prepare yourself for a most awesome game.");
		await pause(5);
		clear();
		command(
			"Solve it and get clues for something in the real world."
		);
		await pause(5);

		clear();
		command("And as cool as this talking cow is.");
		await pause(5);
		clear();

		command("I don't want to milk it.");
		await pause(7);
		say("Moo", 1, 0.001, 1);

		clear();
		command("So, without further amoo");
		await pause(3);
		clear();
		command("Prepare yourself for PRESENT HUNTER");

		await pause(10);

		clear();
		resolve();
	});
}

export default partycow;
