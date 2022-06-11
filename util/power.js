import { click } from "../sound/index.js";
import { boot, clear } from "./screens.js";
import { stopSpeaking } from "./speak.js";
import pause from "./pause.js";

/** Turn on the terminal */
async function on() {
	click();
	await power();
	document.getElementById("switch").blur(); // get focus off power button to avoid accidental press with keyboard
	boot();
}

/** Turn off the terminal */
function off() {
	click();
	clear();
	stopSpeaking();
	power(false);

	// this is :poop: but not sure how to kill the async functions that are still running
	location.reload();
}

async function power(on = true) {
	// @FIXME use a single class on the #monitor to detect on/off
	document.querySelector("#slider").classList.toggle("on", on);
	document.querySelector("#switch").checked = !on;
	await pause(0.1);

	document.getElementById("monitor").classList.toggle("turn-off", !on);
	document.getElementById("monitor").classList.toggle("off", !on);
	return;
}

export { power, on, off };
