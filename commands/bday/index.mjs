import pause from "../../util/pause.js";
import {clear} from "../../util/screens.js"
import say from "../../util/speak.js";
import {  type, prompt,  waitForKey } from "../../util/io.js";
import {tada, birthdaysong} from "../../sound/index.js"
import alert from "../../util/alert.js"
import * as textblock from "../../textblocks/index.mjs"
async function ageChecker() {
	clear();
	return new Promise(async resolve => {
	let name = await prompt("What is your name?");
	
	await pause(2);
	say("Hello", 1, 1, 1);
	await type(["Processing......."," "], { initialWait: 1000, finalWait: 500})
	say(name, .01,.5, 1);
	await pause(1);
	clear();

	if (name == "henry") {
		await type([" ", " ","Hello Henry!", "Have been expecting you..................", " ", " ", "Proceeding with next step of authentication", ".............. ", "Loading date evaluation procedure", "................", " ", " ", " "],{lineWait: 250});
	} else {
		await type([" ", " ","Hello " + name, "You are not who I was expecting....", " ",, "Processing..........."," ", "Continuing with the date evaluation procedure", "................", " ", " ", " "], {lineWait: 250});
	}
	clear();


	await pause(3);

	let age = await prompt("When is your birthday?", false, true);
	let convertedAge = dates.convert(age);
	let now = new Date();	
	let convertedNow = dates.convert(now);
	let ms = convertedNow - convertedAge;
	let sec = Math.floor(ms / 1000);
	let hrs = Math.floor(sec / 3600);
	
	// check if today is the day
	let today = dates.getDay(now);
	let thismonth = dates.getMonth(now);
	let birthdayday = dates.getDay(convertedAge); 
	let birthdaymonth = dates.getMonth(convertedAge);

	let isToday = (( today == birthdayday) && (thismonth == birthdaymonth));
	let isHenry = ((name == "henry") && (age == '06/27/2009'));

	
	await type(["Initializing birth date authorization...", " ", "..............", " "], {finalWait: 3000})
	clear();
	if (isToday) {
		await type([" ",  " ","Processing..............", " ", "You were born " + ms.toLocaleString('en-US') + " milliseconds ago.", " ", "How time flies"," ", hrs.toLocaleString('en-US') + " hours in the blink of a cursor."," ", " "],{lineWait: 500, initialWait: 500, finalWait: 12000});
		await type(["anyways..... "], {finalWait: 1000})
		await pause(3);
        tada();
		await alert("Happy Birthday!!");
		await pause(2);
	
		clear();
		await type([" ",  " ","This is very exciting", "This is what my programming is destined for","....."," ", " "], {finalWait: 5000});
		let song_answer = await prompt("Would you like me to sing to you?");
		if (song_answer == 'yes') {
			await type([" ", " ", "Thank you.", "I have been exercising my sound chip just for this moment",".............", "......", "Ok, here goes nothing", " ", " ", " "], {lineWait: 500, finalWait: 5000});
			await singing(name);
			resolve(isHenry);
		} else if (song_answer == 'no') {
			await pause(5);
			await type([" ", " ", "Oh.....", "OK.", "I am programmed to understand.", "I will play you a song instead."]);
			clear();
			birthdaysong();
			type(textblock.cake, {wait: 0});
			await waitForKey();
			resolve(isHenry);
		} else {
			await type(['I do not understand you humans sometimes.  A simple "yes" or "no" please.']);
			song_answer = await prompt("Yes or No?");
		}


} else {
	await type(["Oh this is disapointing.", "It does not seem that today is your birthday.", "I guess you came this far.....", "I should do something...", " ". "Processing...................",".............",".....", "Ok", "...............", " ", "Are you ready?"], {lineWait: 500, finalWait: 10000})
	clear();
	tada();
	await type(["Returning to terminal", "Type help to see some other commands you can use...", ],{lineWait: 500, finalWait: 1000});
	await pause(2);
	clear();
	resolve(isHenry);
	return main();
}
	});
}


async function singing(name) {
	clear();
	
return new Promise(async resolve => {
type(textblock.cake, {wait: 0});
await pause(3);
say("Happy birthday to you", 1, .1, 1);
await type(' ', { wait: 500});
say("Happy birthday to you", 1, .8, 1);
await pause(1);
await type(' ', {finalWait: 500});
say("Happy birthday dear " + name, .1, 1, 1);
await type(' ', {finalWait: 500});
await pause(1)
say("Happy birthday to you", 3, 3, 1);
resolve();
});

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
	getDay:function(d){
		//d = this.convert(d);
		return String(d.getDate()).padStart(2, '0');
	},
	getMonth: function(d){
		//d = this.convert(d);
		return String(d.getMonth() + 1).padStart(2, '0'); //January is 0!
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

export default ageChecker;