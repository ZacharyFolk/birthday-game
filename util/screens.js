import { parse, type, prompt, input, waitForKey } from "./io.js";
import pause from "./pause.js";
import alert from "./alert.js";
import say from "./speak.js";
import matrix from "./../commands/matrix/index.mjs"
import {tada, birthdaysong} from "../sound/index.js"

// import {datepicker} from "./../commands/auth/datepicker/datepicker"
// import {result} from "./../commands/brogue/index.mjs"
import * as textblock from "./../textblocks/index.mjs"
const USER = "admin";
const PW = "admin";

/** Boot screen */
async function boot() {
	clear();

	// await type("Welcome to the birth recognition and fun time simulation", {
	// 	initialWait: 3000,
	// 	finalWait: 3000
	// });
	// await pause();
	// clear(); 

	// await type(["> SET TERMINAL/BOOT", "Loading........................"], {
	// 	lineWait: 1000
	// });

	// await type(textblock.loading, { lineWait: 250});

	// await type(["> SET TERMINAL/LOGON", "USER AUTHENTICATION CHECK"], {
	// 	lineWait: 1000,
	// 	finalWait: 3000
	// });

	// await type( textblock.initializeAge);

	await pause();

	await ageChecker();

	clear();

	await type(["> SET TERMINAL TO FUN TIME SIMULATION"]);
	// await parse("phunter");
	// await parse("brogue");
	// console.log(result);
	 //matrix();
	// tada();

	// var x = await parse("fallout");

	// await checkpoint_1();






	
	//  await type(["> SET TERMINAL/BOOT", "Loading........................"], {
	// 	lineWait: 1000
	// });

	// await type(
	// 	[
	// 		".....",
	// 		"Please wait........",
	// 		"..........",
	// 		"...",
	// 		".",
	// 		".", 
	// 		".",
	// 		".",
	// 		"."
	// 	],
	// 	{ lineWait: 250 }
	// );

	// await type(["OK.", " "]);


	// return login();
}

async function checkpoint(num){
	document.cookie = `stage=${num}; path=/; max-age=${60 * 60 * 24 * 14};`;
}

async function checkpoint_1(){
	await type("Welcome to the birth recognition and fun enhancement simulator", {
		initialWait: 3000
	});
}

/** Age checker */

async function ageChecker() {
	clear();
	return new Promise(async resolve => {
	let name = await prompt("What is your name?");
	var now = new Date();
	var dd = String(now.getDate()).padStart(2, '0');
	var mm = String(now.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = now.getFullYear();
	now = mm + '/' + dd + '/' + yyyy;

	var convertedNow = dates.convert(now);
	console.log("NOW : ")
	console.log(now);
	console.log("======================");


	console.log("ConvertedNow: ");
	console.log(convertedNow);
	console.log("======================");

	console.log('Today month:')
	console.log(mm);

	console.log('Today day:')
	console.log(dd);


	await pause(2);
	say("Hello", 1, 1, 1);
	await type(["Processing......."," "], { initialWait: 1000, finalWait: 500})
	say(name, .01,.5, 1);
	await pause(1);
	clear();

	if (name == "henry") {
		await type([" ", " ","Hello Henry!", "Have been expecting you..................", " ", " ", "Proceeding with next step of authentication", ".............. ", "Loading date evaluation procedure", "................", " ", " ", " "],{lineWait: 250});
	} else {
		await type([" ", " ","Hello " + name, "You are not who I was expecting....", " ", " ", "Processing......................."," ", " ", " ", " ", 
		"Continuing with the date evaluation procedure", "................", " ", " ", " "], {lineWait: 250});
	}
	clear();


	await pause(3);

	let age = await prompt("When is your birthday?", false, true);
	let convertedAge = dates.convert(age);
	let birthdayday = String(convertedAge.getDate()).padStart(2, '0');

	console.log("BIRTHDAY DAY");
	console.log(birthdayday);


	let ms = convertedNow - convertedAge;
	let sec = Math.floor(ms / 1000);
	let hrs = Math.floor(sec / 3600);
	

	await type([" ",  " ","Processing..............", " ", "You were born " + ms.toLocaleString('en-US') + " milliseconds ago.", " ", "How time flies"," ", hrs.toLocaleString('en-US') + " hours in the blink of a cursor.", " "],{lineWait: 500, initialWait: 500, finalWait: 2000});
	await pause(3);
	await type(["Checking for birth date authorization...", " ", "..............", " "])
	clear();
	if ( age == '06/27/2009' || age == '06/28/2009') {
		 
		await alert("Happy Birthday!!");
		tada();
		clear();
		await type(["This is very exciting", "This is what my programming is destined for","....."," ", " "], {finalWait: 5000});
		let song_answer = await prompt("Would you like me to sing to you?");
		if (song_answer == 'yes') {
			await type([" ", " ", "Thank you.", "I have been exercising my sound chip just for this moment",".............", "............", "Ok, here goes nothing", " ", " ", " "], {lineWait: 500, finalWait: 5000});
			await singing();
			await waitForKey();
			resolve();
		} else if (song_answer == 'no') {
			await pause(5);
			await type([" ", " ", "Oh.....", "OK.", "I am programmed to understand.", "I will play you a song instead."]);
			clear();
			birthdaysong();
			type(textblock.cake, {wait: 0});
			await waitForKey();
			resolve();
		} else {
			await type(['I do not understand you humans sometimes.  A simple "yes" or "no" please.']);
			song_answer = await prompt("Yes or No?");
		}
} else {
	await type(["Oh this is disapointing.", "That was not the birthday this application was designed for.", "I guess you came this far..... I should do something.", "Processing...................",".............",".....","...........", "Ok", "...............", "Are you ready?"], {lineWait: 500, finalWait: 10000})
	clear();
	tada();
	await type(["Returning to terminal", "Type commands like help to see what you can do...", ],{lineWait: 500, finalWait: 1000});
	await pause(5);
	clear();
	return main();
}
	});
}


async function singing() {
	clear();
	
return new Promise(async resolve => {
type(textblock.cake, {wait: 0});
say("Happy birthday to you", 1, .1, 1);
await pause(1);
await type(' ', { wait: 500});
say("Happy birthday to you", 4, 2, 1);
await pause(1);
await type(' ', {finalWait: 500});
say("Happy birthday dear Henry", .1, 1, 1);
await type(' ', {finalWait: 500});
say("Happy birthday to you", 3, 3, 10);
resolve();
});

}


/** Login screen */
async function login() {
	clear();
	let user = await prompt("Username:");
	let password = await prompt("Password:", true);

	if (user === USER && password === PW) {
		await pause();
		say("AUTHENTICATION SUCCESSFUL");
		await alert("AUTHENTICATION SUCCESSFUL");
		clear();
		// instead retrun main next section
		return main();
	} else {
		await type([
			"Incorrect user and/or password.",
			"Please try again"
		]);
		await pause(3);
		clear();
		return login();
	}
}

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

// Source: http://stackoverflow.com/questions/497790
var dates = {
    convert:function(d) {
        // Converts the date in d to a date-object. The input can be:
        //   a date object: returned without modification
        //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
        //   a number     : Interpreted as number of milliseconds
        //                  since 1 Jan 1970 (a timestamp) 
        //   a string     : Any format supported by the javascript engine, like
        //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
        //  an object     : Interpreted as an object with year, month and date
        //                  attributes.  **NOTE** month is 0-11.
        return (
            d.constructor === Date ? d :
            d.constructor === Array ? new Date(d[0],d[1],d[2]) :
            d.constructor === Number ? new Date(d) :
            d.constructor === String ? new Date(d) :
            typeof d === "object" ? new Date(d.year,d.month,d.date) :
            NaN
        );
    },
    compare:function(a,b) {
        // Compare two dates (could be of any type supported by the convert
        // function above) and returns:
        //  -1 : if a < b
        //   0 : if a = b
        //   1 : if a > b
        // NaN : if a or b is an illegal date
        // NOTE: The code inside isFinite does an assignment (=).
        return (
            isFinite(a=this.convert(a).valueOf()) &&
            isFinite(b=this.convert(b).valueOf()) ?
            (a>b)-(a<b) :
            NaN
        );
    },
    inRange:function(d,start,end) {
        // Checks if date in d is between dates in start and end.
        // Returns a boolean or NaN:
        //    true  : if d is between start and end (inclusive)
        //    false : if d is before start or after end
        //    NaN   : if one or more of the dates is illegal.
        // NOTE: The code inside isFinite does an assignment (=).
       return (
            isFinite(d=this.convert(d).valueOf()) &&
            isFinite(start=this.convert(start).valueOf()) &&
            isFinite(end=this.convert(end).valueOf()) ?
            start <= d && d <= end :
            NaN
        );
    }
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
	login,
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
