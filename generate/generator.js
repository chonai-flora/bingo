setup = () => {
	const button = createButton("保存");
	button.mousePressed(() => save("bingo-sheet.png"))

	const blockSize = 90;
	const cellCount = 5 * 5;
	const cells = shuffle(Array.from(Array(50), (_, cell) => cell + 1));
	const palettes = ['#FFFFB3', '#F7F7F7', '#DEFFFF', '#FFDEFF', '#FADBDA'];

	createCanvas(480, 640);
	strokeWeight(3);
	rectMode(CENTER);
	background(palettes[int(random(palettes.length))]);

	textSize(20);
	text("なまえ:", 20, 160);

	textSize(50);
	textAlign(CENTER, CENTER);
	text("ビンゴゲーム", width / 2, 50);

	textSize(blockSize / 2);
	for (let seatIndex = 0; seatIndex < cellCount; seatIndex++) {
		const x = (floor(seatIndex / 5) + 0.5) * blockSize + 15;
		const y = (floor(seatIndex % 5) + 0.5) * blockSize + 175;
		fill('snow');
		rect(x, y, blockSize, blockSize);
		if (seatIndex === floor(cellCount / 2)) {
			fill('red');
			text("★", x, y);
		} else {
			fill('black');
			text(nf(cells[seatIndex], 2), x, y);
		}
	}
}