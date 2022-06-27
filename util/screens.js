import { parse, type, prompt, input, waitForKey } from "./io.js";
import pause from "./pause.js";
import alert from "./alert.js";
import say from "./speak.js";
import ageChecker from "../commands/bday/index.mjs";
import partycow from "../commands/partycow/index.mjs";
import command from "./../commands/cowsay/index.mjs";

import { result } from "./../commands/phunter/index.mjs";
import * as textblock from "./../textblocks/index.mjs";
import cagematch from "../commands/cagematch/index.mjs";
import riddlecave from "../commands/riddler/index.mjs";
const USER = "admin";
const PW = "admin";

/** Boot screen */
async function boot() {
	clear();

	await type(textblock.welcome1, {
		wait: 20,
		initialWait: 3000,
		lineWait: 100,
		finalWait: 3000
	});
	await pause(2);
	await type(textblock.loading, { wait: 0, lineWait: 10 });
	clear();

	await type(textblock.welcome2, {
		wait: 30,
		initialWait: 1000,
		lineWait: 500,
		finalWait: 500
	});
	clear();
	await type(textblock.authintro, {
		lineWait: 250,
		wait: 50,
		initialWait: 3000,
		finalWait: 4000
	});
	await pause(2);
	clear();
	await type(textblock.initializeAge, {
		wait: 30,
		lineWait: 150,
		finalWait: 2000
	});
	await pause(3);

	let isH = await ageChecker();

	if (isH) {
		clear();
		await type(textblock.itsHenry, {
			finalWait: 3000,
			lineWait: 400
		});

		clear();
		await type(textblock.funtime, { finalWait: 3000 });

		await parse("matrix");

		await type(textblock.funcheck, {
			lineWait: 300,
			finalWait: 1000
		});
		clear();

		await type(textblock.partyCowIntro, {
			lineWait: 500,
			finalWait: 4000
		});
		clear();

		await type(textblock.partyCowIntro2, {
			lineWait: 500,
			finalWait: 4000
		});
		clear();

		await partycow();
		await parse("phunter");

		if (result == "lose") {
			await type(
				[
					"Oh no.",
					"It appears Roy has ruined everything.",
					"I was going to start the game again..",
					"But there are so many more games for you..."
				],
				{ lineWait: 500, finalWait: 2000 }
			);
			clear();
			await type(
				[
					"But first how about a real present break.",
					"Here is a clue.. ",
					"😼 + 🏠"
				],
				{ lineWait: 800, finalWait: 4000 }
			);
		} else {
			await type(
				[
					"Woo hoo you did it!",
					"Now go find a present in the real world.",
					"Here is a clue.. ",
					"😼 + 🏠"
				],
				{ lineWait: 800, finalWait: 4000 }
			);
		}

		await type(
			[
				"Good luck finding it!",
				"Press any key when you are ready to continue."
			],
			{ lineWait: 800, finalWait: 4000 }
		);

		await waitForKey();
		clear();

		await type(
			[
				"I hope you like that",
				"400 games!! That should be some fun.",
				"However none of them can compare to this next one.",
				" ",
				" ",
				"Prepare yourself for CAGEMATCH!!!"
			],
			{ lineWait: 800, finalWait: 4000 }
		);
		clear();
		await parse("cagematch");

		await type(
			[
				"Unbelievable!",
				"You have defeated another of these incredibly challenging puzzles",
				"I guess that means you should get another present.",
				" ",
				"Don't get too excited...",
				" ",
				"... you know, it is the thought that counts",
				"Here is your next clue...",
				"Pretend you are looking for sweet treats.. "
			],
			{ lineWait: 1000, finalWait: 4000 }
		);
		clear();
		await type(
			[
				"You know the drill...",
				"Press anything when ready for the next part."
			],
			{ lineWait: 1000, finalWait: 4000 }
		);

		await parse("screensaver");
		await waitForKey();

		await type(
			[
				"Ok on to the next part.",
				"Please make the most of this next title screen",
				"Way too much time went into that...",
				"so pretend that you think it is really cool!"
			],
			{ lineWait: 1000, finalWait: 4000 }
		);
		await parse("riddler");

		await type(
			[
				"Ok one last thing.",
				"A few words from virtual dad..."
			],
			{ lineWait: 1000, finalWait: 4000 }
		);
		await parse("dadtalk");

		await parse("screensaver");

		await main();
	} else {
		await type(
			[
				"Thank you for using the Teenomatron2022",
				"You do not seem to be who this was designed for....",
				"Returning to terminal.",
				"You can type help at anytime to see what your options are."
			],
			{ lineWait: 1000, finalWait: 4000 }
		);
		clear();
	}
}

async function checkpoint(num) {
	document.cookie = `stage=${num}; path=/; max-age=${60 * 60 * 24 * 14};`;
}

async function checkpoint_1() {}

/** Main input terminal, recursively calls itself */
async function main() {
	let command = await input();
	try {
		await parse(command);
	} catch (e) {
		if (e.message) await type(e.message);
	}

	main();
}

function addClasses(el, ...cls) {
	let list = [...cls].filter(Boolean);
	el.classList.add(...list);
}

function getScreen(...cls) {
	let div = document.createElement("div");
	addClasses(div, "fullscreen", ...cls);
	document.querySelector("#crt").appendChild(div);
	return div;
}

function toggleFullscreen(isFullscreen) {
	document.body.classList.toggle("fullscreen", isFullscreen);
}

/** Attempts to load template HTML from the given path and includes them in the <head>. */
async function loadTemplates(path) {
	let txt = await fetch(path).then((res) => res.text());
	let html = new DOMParser().parseFromString(txt, "text/html");
	let templates = html.querySelectorAll("template");

	templates.forEach((template) => {
		document.head.appendChild(template);
	});
}

/** Clones the template and adds it to the container. */
async function addTemplate(id, container, options = {}) {
	let template = document.querySelector(`template#${id}`);
	if (!template) {
		throw Error("Template not found");
	}
	// Clone is the document fragment of the template
	let clone = document.importNode(template.content, true);

	if (template.dataset.type) {
		await type(clone.textContent, options, container);
	} else {
		container.appendChild(clone);
	}

	// We cannot return clone here
	// https://stackoverflow.com/questions/27945721/how-to-clone-and-modify-from-html5-template-tag
	return container.childNodes;
}

/** Creates a new screen and loads the given template into it. */
async function showTemplateScreen(id) {
	let screen = getScreen(id);
	await addTemplate(id, screen);
	return screen;
}

/**
 * Creates an element and adds it to the given container (or terminal screen if undefined).
 * @param {String} type The type of element to create.
 * @param {Element} container The container to add the created element to.
 * @param {String} cls The class to apply to the created element.
 * @param {Object} attrs Extra attributes to set on the element.
 */
function el(
	type,
	container = document.querySelector(".terminal"),
	cls = "",
	attrs
) {
	let el = document.createElement(type);
	addClasses(el, cls);

	container.appendChild(el);

	if (attrs) {
		Object.entries(attrs).forEach(([key, value]) => {
			el.setAttribute(key, value);
		});
	}
	return el;
}

/**
 * Creates a <div> and adds it to the screen.
 * @param {Element} container The container to add the created element to.
 * @param {String} cls The class to apply to the created element.
 */
function div(...args) {
	return el("div", ...args);
}

function clear(screen = document.querySelector(".terminal")) {
	screen.innerHTML = "";
}

export {
	boot,
	main,
	clear,
	getScreen,
	toggleFullscreen,
	div,
	el,
	loadTemplates,
	addTemplate,
	showTemplateScreen
};
