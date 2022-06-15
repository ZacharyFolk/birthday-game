import alert from "../../util/alert.js";
import { waitForKey } from "../../util/io.js";
import pause from "../../util/pause.js";
const matchsound = new Audio(
	"./sound/16681__littlerobotsoundfactory__8-bit-sound-effects-library/270303__littlerobotsoundfactory__collect-point-01.wav"
);
const misssound = new Audio(
	"./sound/16681__littlerobotsoundfactory__8-bit-sound-effects-library/270326__littlerobotsoundfactory__hit-01.wav"
);
const dealsound = new Audio(
	"./sound/16681__littlerobotsoundfactory__8-bit-sound-effects-library/270315__littlerobotsoundfactory__menu-navigate-03.wav"
);
const cagethanksyou = new Audio("./sound/cage-thanks.mp3");
const boredcage = new Audio("./sound/cage-bored.mp3");
const declaration = new Audio("./sound/cage-declaration.mp3");
let cardbacksrc = "commands/cagematch/images/cage10.jpg";
let caged = "commands/cagematch/images/cage6.jpg";
let winner = "commands/cagematch/images/cage8.jpg";
let loses = new Audio("./sound/cage-bunny.mp3");

const cardArrayOne = [
	{
		name: "cage1",
		img: "commands/cagematch/images/cage1.jpg"
	},
	{
		name: "cage2",
		img: "commands/cagematch/images/cage2.jpg"
	},
	{
		name: "cage3",
		img: "commands/cagematch/images/cage3.jpg"
	},
	{
		name: "cage4",
		img: "commands/cagematch/images/cage4.jpg"
	},
	{
		name: "cage5",
		img: "commands/cagematch/images/cage5.jpg"
	},
	{
		name: "cage7",
		img: "commands/cagematch/images/cage7.jpg"
	},
	{
		name: "cage1",
		img: "commands/cagematch/images/cage1.jpg"
	},
	{
		name: "cage2",
		img: "commands/cagematch/images/cage2.jpg"
	},
	{
		name: "cage3",
		img: "commands/cagematch/images/cage3.jpg"
	},
	{
		name: "cage4",
		img: "commands/cagematch/images/cage4.jpg"
	},
	{
		name: "cage5",
		img: "commands/cagematch/images/cage5.jpg"
	},
	{
		name: "cage7",
		img: "commands/cagematch/images/cage7.jpg"
	}
];
cardArrayOne.sort(() => 0.5 - Math.random());
let cardsChosen = [];
let cardsChosenId = [];
let cardsWon = [];
let badMatch = 0;

class Game {
	constructor({ onGameOver }) {
		this.onGameOver = onGameOver;
		this.i = 0;
	}

	start() {
		this.dealCards();
	}
	async restart() {
		document.querySelector(".grid").innerHTML = "";
		loses.play();
		await pause(2);
		await alert("Fresh deal");
		this.i = 0;

		this.start();
	}
	async gameOver() {
		await this.onGameOver();
	}
	dealCards() {
		console.log("What is i " + this.i);
		let self = this;
		const grid = document.querySelector(".grid");
		const card = document.createElement("img");
		card.setAttribute("src", cardbacksrc);
		card.setAttribute("data-id", self.i);
		card.addEventListener("click", this.flipCard.bind(this));

		setTimeout(function () {
			grid.appendChild(card);
			dealsound.play();
			self.i++;
			if (self.i < cardArrayOne.length) {
				self.dealCards();
			}
		}, 200);
	}
	async checkForMatch() {
		const cards = document.querySelectorAll("img");
		const optionOneId = cardsChosenId[0];
		const optionTwoId = cardsChosenId[1];
		console.log(optionOneId + " and " + optionTwoId);
		if (optionOneId == optionTwoId) {
			cards[optionOneId].setAttribute("src", cardbacksrc);
			cards[optionTwoId].setAttribute("src", cardbacksrc);
			alert("You have clicked the same image!");
		} else if (cardsChosen[0] === cardsChosen[1]) {
			matchsound.play();
			alert("You found a match");

			cards[optionOneId].setAttribute("src", caged);
			cards[optionOneId].classList.add("matched");
			cards[optionTwoId].setAttribute("src", caged);
			cards[optionTwoId].classList.add("matched");
			cards[optionOneId].removeEventListener(
				"click",
				this.flipCard
			);
			cards[optionTwoId].removeEventListener(
				"click",
				this.flipCard
			);
			cardsWon.push(cardsChosen);
		} else {
			cards[optionOneId].setAttribute("src", cardbacksrc);
			cards[optionTwoId].setAttribute("src", cardbacksrc);
			misssound.play();
			badMatch = badMatch + 1;
			if (badMatch == 3) {
				alert("Nope");
				pause(1);
				boredcage.play();
			} else if (badMatch == 6) {
				alert("You only have 3 more attempts!");
				pause(1);
				declaration.play();
			} else if (badMatch == 9) {
				alert("Sorry you are out of tries");
				pause(1);
				this.restart();
			} else {
				alert("These are not the same Cage");
				pause(1);
			}
		}
		cardsChosen = [];
		cardsChosenId = [];
		//	resultDisplay.textContent = cardsWon.length;
		if (cardsWon.length === cardArrayOne.length / 2) {
			cagethanksyou.play();
			const grid = document.querySelector(".grid");
			const nickscage = document.createElement("div");
			const nick = document.createElement("img");
			nickscage.setAttribute("class", "nickscage");
			nick.setAttribute("src", winner);
			grid.innerHTML = "";
			grid.appendChild(nickscage);
			nickscage.appendChild(nick);
			alert("Congratulations!!!!");
			await waitForKey();
			this.gameOver();
		}
	}
	flipCard(e) {
		let self = e.target;
		let cardId = self.getAttribute("data-id");
		cardsChosen.push(cardArrayOne[cardId].name);
		cardsChosenId.push(cardId);
		self.setAttribute("src", cardArrayOne[cardId].img);

		if (cardsChosen.length === 2) {
			setTimeout(this.checkForMatch.bind(this), 500);
		}
	}
}

export default Game;
