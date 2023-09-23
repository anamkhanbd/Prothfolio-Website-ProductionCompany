const reviewWrap = document.getElementById("reviewWrap");
const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");
const imgDiv = document.getElementById("imgDiv");
const personName = document.getElementById("personName");
const profession = document.getElementById("profession");
const description = document.getElementById("description");
const surpriseMeBtn = document.getElementById("surpriseMeBtn");
const chicken = document.querySelector(".chicken");

let isChickenVisible;

let people = [
	{
		photo:
			'url("../image/clint/mhrimonkhan.jpg")',
		name: "MH Rimon Khan",
		profession: "WEB DEVELOPER",
		description:
			"I cannot express my gratitude enough for the exceptional weeding photo editing services I received. The team's dedication to perfection and attention to detail truly touched my heart. They not only transformed our wedding photos into timeless treasures but also exhibited humanity in every interaction. Their warmth and understanding made the entire process a joy. I wholeheartedly recommend their services to anyone seeking not just impeccable photo editing but also a genuine human touch."
	},

	{
		photo:
			"url('../image/clint/bakbul-mia.jpg')",
		name: "BakBul Mia",
		profession: "Youtuber",
		description:
			"I'm absolutely thrilled with the YouTube video editing work! The editor did a fantastic job in bringing my vision to life. The transitions, visuals, and overall flow were spot-on. I couldn't be happier with the final result. Thanks a million for your hard work and expertise!"
	},

	{
		photo:
			"url('../image/clint/manwar-hossain.jpg')",
		name: "Manwar Hossain",
		profession: "Journalist",
		description:
		"As a journalist, the quality of my video content is paramount, and I'm thrilled to say that the video editing service I received exceeded all my expectations. The editor's attention to detail, storytelling prowess, and ability to capture the essence of my reporting was simply outstanding. They not only enhanced the visual appeal but also added depth to the narrative. I'm truly grateful for their expertise and commitment to delivering excellence. It's safe to say that they've become an invaluable part of my journalistic journey. Thank you!"
	},

	{
		photo:
			"url('../image/clint/shariyar-emn joy.jpg')",
		name: "Shariyar Emon Joy",
		profession: "Journalist And Youtube Content Creator",
		description:
		"As a journalist, the standard of my video content holds utmost importance, and I must say that the video editing service I recently received surpassed my expectations. The editor's meticulous attention to detail, storytelling finesse, and knack for encapsulating the essence of my reporting were truly exceptional. They not only elevated the visual appeal but also enriched the narrative depth. I'm genuinely appreciative of their expertise and unwavering dedication to delivering excellence. It's fair to state that they've become an indispensable asset on my journalistic voyage. My sincere gratitude!"
	}
];

imgDiv.style.backgroundImage = people[0].photo;
personName.innerText = people[0].name;
profession.innerText = people[0].profession;
description.innerText = people[0].description;
let currentPerson = 0;

//Select the side where you want to slide
function slide(whichSide, personNumber) {
	let reviewWrapWidth = reviewWrap.offsetWidth + "px";
	let descriptionHeight = description.offsetHeight + "px";
	//(+ or -)
	let side1symbol = whichSide === "left" ? "" : "-";
	let side2symbol = whichSide === "left" ? "-" : "";

	let tl = gsap.timeline();

	if (isChickenVisible) {
		tl.to(chicken, {
			duration: 0.4,
			opacity: 0
		});
	}

	tl.to(reviewWrap, {
		duration: 0.4,
		opacity: 0,
		translateX: `${side1symbol + reviewWrapWidth}`
	});

	tl.to(reviewWrap, {
		duration: 0,
		translateX: `${side2symbol + reviewWrapWidth}`
	});

	setTimeout(() => {
		imgDiv.style.backgroundImage = people[personNumber].photo;
	}, 400);
	setTimeout(() => {
		description.style.height = descriptionHeight;
	}, 400);
	setTimeout(() => {
		personName.innerText = people[personNumber].name;
	}, 400);
	setTimeout(() => {
		profession.innerText = people[personNumber].profession;
	}, 400);
	setTimeout(() => {
		description.innerText = people[personNumber].description;
	}, 400);

	tl.to(reviewWrap, {
		duration: 0.4,
		opacity: 1,
		translateX: 0
	});

	if (isChickenVisible) {
		tl.to(chicken, {
			duration: 0.4,
			opacity: 1
		});
	}
}

function setNextCardLeft() {
	if (currentPerson === 3) {
		currentPerson = 0;
		slide("left", currentPerson);
	} else {
		currentPerson++;
	}

	slide("left", currentPerson);
}

function setNextCardRight() {
	if (currentPerson === 0) {
		currentPerson = 3;
		slide("right", currentPerson);
	} else {
		currentPerson--;
	}

	slide("right", currentPerson);
}

leftArrow.addEventListener("click", setNextCardLeft);
rightArrow.addEventListener("click", setNextCardRight);

surpriseMeBtn.addEventListener("click", () => {
	if (chicken.style.opacity === "0") {
		chicken.style.opacity = "1";
		imgDiv.classList.add("move-head");
		surpriseMeBtn.innerText = "Remove the chicken";
		surpriseMeBtn.classList.remove("surprise-me-btn");
		surpriseMeBtn.classList.add("hide-chicken-btn");
		isChickenVisible = true;
	} else if (chicken.style.opacity === "1") {
		chicken.style.opacity = "0";
		imgDiv.classList.remove("move-head");
		surpriseMeBtn.innerText = "Surprise me";
		surpriseMeBtn.classList.add("surprise-me-btn");
		surpriseMeBtn.classList.remove("hide-chicken-btn");
		isChickenVisible = false;
	}
});

window.addEventListener("resize", () => {
	description.style.height = "100%";
});
