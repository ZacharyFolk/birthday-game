import { getScreen, showTemplateScreen, addTemplate, clear } from "../../util/screens.js";
import pause from "../../util/pause.js";
const output = [
	"Derrrr...",
	
];


async function woo() {
	clear();

	return new Promise(async resolve => {
	
		let logoScreen = await showTemplateScreen("cake");
		pause(2);
		//logoScreen.remove();


		


		
	});
}

const templates = ["cake"];

export default woo;
export { output, templates };
