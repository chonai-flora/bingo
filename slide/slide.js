let logFile;
let backImage;
let slideIndex;
let slides = [];
let snowfalls = [];

const textWithShadow = (message) => {
	push();
	const x = width / 2;
	const y = height / 2;

	fill(0, 180);
	text(message, x + 5, y + 5);
	fill('snow');
	text(message, x, y);
	pop();
}

preload = () => {
	backImage = loadImage("back.png");
}

setup = () => {
	createCanvas(windowWidth, windowHeight);
	textSize(min(width, height) / 6);
	textAlign(CENTER, CENTER);

	logFile = createWriter("bingo-log.txt");

	backImage.resize(width, height);

	slideIndex = 0;
	slides.push("はじめます！");
	const cards = shuffle(Array.from(Array(50), (_, card) => card + 1));
	cards.forEach((card, idx) => {
		const message = nf(card, 2);
		slides.push(message);
		logFile.write([`${nf(idx + 1, 2)}: ${message}\n`]);

		if (idx === 24) {
			logFile.write(["--- ここで半分 ---\n"]);
		}
	});
	slides.push("おわりです！")

	for (let i = 0; i < 200; i++) {
		const isCrystal = (i % 2 === 0);
		snowfalls.push(new Snowfall(isCrystal));
	}

	logFile.close();
}

draw = () => {
	clear();
	image(backImage, 0, 0);

	for (const snowfall of snowfalls) {
		snowfall.update();
		snowfall.draw();
	}

	textWithShadow(slides[slideIndex]);
}

keyPressed = () => {
	if (slideIndex > 0 && keyCode === LEFT_ARROW) {
		slideIndex--;
	} else if (keyCode === RIGHT_ARROW && slideIndex < slides.length - 1) {
		slideIndex++;
	}
}

class Snowfall {
	constructor(isCrystal) {
		this.pos = createVector(random(width), random(height));
		this.delta = createVector(-random(3.0), random(2.0, 4.0));
		this.size = random(15.0, 40.0);
		this.alpha = random(192);
		this.isCrystal = isCrystal;
	}

	update() {
		this.pos.add(this.delta);
		if (-this.size > this.pos.x) {
			this.pos.x = this.size + width;
		}
		if (this.pos.y > this.size + height) {
			this.pos.y = -this.size;
		}
	}

	draw() {
		push();
		if (this.isCrystal) {
			textSize(this.size);
			fill(255, this.alpha);
			text("❄", this.pos.x, this.pos.y);
		} else {
			fill(255, this.alpha);
			noStroke();
			circle(this.pos.x, this.pos.y, this.size);
		}
		pop();
	}
}