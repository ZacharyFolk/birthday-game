//card options
const cardArray = [
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
	}
];

cardArray.sort(() => 0.5 - Math.random());

let cardsChosen = [];
let cardsChosenId = [];
let cardsWon = [];

//create your board
function createBoard() {
	const grid = document.querySelector(".grid");
	const resultDisplay = document.querySelector("#result");
	console.log("grid");
	console.log(grid);
	for (let i = 0; i < cardArray.length; i++) {
		const card = document.createElement("img");
		card.setAttribute(
			"src",
			"commands/cagematch/images/cage10.jpg"
		);
		card.setAttribute("data-id", i);
		card.addEventListener("click", flipCard);
		grid.appendChild(card);
	}
}

//check for matches
function checkForMatch() {
	const cards = document.querySelectorAll("img");
	const optionOneId = cardsChosenId[0];
	const optionTwoId = cardsChosenId[1];

	if (optionOneId == optionTwoId) {
		cards[optionOneId].setAttribute(
			"src",
			"commands/cagematch/images/cage10.jpg"
		);
		cards[optionTwoId].setAttribute(
			"src",
			"commands/cagematch/images/cage10.jpg"
		);
		alert("You have clicked the same image!");
	} else if (cardsChosen[0] === cardsChosen[1]) {
		alert("You found a match");
		cards[optionOneId].setAttribute(
			"src",
			"commands/cagematch/images/white.jpg"
		);
		cards[optionTwoId].setAttribute(
			"src",
			"commands/cagematch/images/white.jpg"
		);
		cards[optionOneId].removeEventListener("click", flipCard);
		cards[optionTwoId].removeEventListener("click", flipCard);
		cardsWon.push(cardsChosen);
	} else {
		cards[optionOneId].setAttribute(
			"src",
			"commands/cagematch/images/cage10.jpg"
		);
		cards[optionTwoId].setAttribute(
			"src",
			"commands/cagematch/images/cage10.jpg"
		);
		alert("Sorry, try again");
	}
	cardsChosen = [];
	cardsChosenId = [];
	resultDisplay.textContent = cardsWon.length;
	if (cardsWon.length === cardArray.length / 2) {
		resultDisplay.textContent =
			"Congratulations! You found them all!";
	}
}

//flip your card
function flipCard() {
	let cardId = this.getAttribute("data-id");
	cardsChosen.push(cardArray[cardId].name);
	cardsChosenId.push(cardId);
	this.setAttribute("src", cardArray[cardId].img);
	if (cardsChosen.length === 2) {
		setTimeout(checkForMatch, 500);
	}
}

export default createBoard;
