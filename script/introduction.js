
/**************************************************
*****  INTRODUCTION: The Game's Introduction  *****
**************************************************/

function Introduction () {
	this.BG = new Texture(new Vector2(0, 0), new Vector2(main.CANVAS_WIDTH, main.CANVAS_HEIGHT), '#333333', 1, '#333333');
	this.state = 0;
	this.previousTime = GameTime.GetCurrentGameTime();
	this.line1 = {
		text: 'A GAME BY SCOTT DAVEY',
		opacity: 0,
		fontSize: 36,
		duration: 5
	};
	this.line2 = {
		text: 'INTRUDERS',
		opacity: 0,
		fontSize: 66,
		duration: 5
	};
	this.line3 = {
		text: 'PRESS A TO CONTINUE',
		opacity: 1,
		fontSize: 24,
		duration: 5
	};
}

Introduction.prototype.Update = function () {
	var currentTime, previousTime, o, t;
	currentTime = GameTime.GetCurrentGameTime();

	switch (this.state) {
		case 0:

			if (currentTime - this.previousTime >= 0.1) {
				this.line1.opacity += 0.03;
				this.previousTime = currentTime;
				if (this.line1.opacity >= 1) {
					this.state++;
					this.line1.opacity = 0;
				}
			}

			break;
		case 1:

			if (currentTime - this.previousTime >= 0.1) {
				this.line2.opacity += 0.03;
				this.previousTime = currentTime;
				if (this.line2.opacity >= 1) {
					this.state++;
					this.line2.opacity = 0;
				}
			}

			break;
		case 2:
			
			if (Input.GamePad.A.pressed) {
				main.game.secondaryState.push(main.GameStates.SECONDARY.TRANSITION);
				this.state++;	// This is just to prevent further button clicks
			}

			break;
	}

};

Introduction.prototype.Draw = function () {
	this.BG.Draw();

	switch (this.state) {
		case 0:
			DrawText(this.line1.text, (main.CANVAS_WIDTH / 2) - 300, (main.CANVAS_HEIGHT / 2 - 20), 'normal ' + this.line1.fontSize + 'pt Verdana', 'rgba(255, 255, 255, ' + this.line1.opacity + ')');
			break;
		case 1:
			DrawText(this.line2.text, (main.CANVAS_WIDTH / 2) - 250, (main.CANVAS_HEIGHT / 2 - 10), 'normal ' + this.line2.fontSize + 'pt Verdana', 'rgba(255, 255, 255, ' + this.line2.opacity + ')');
			break;
		case 2:
			DrawText(this.line3.text, (main.CANVAS_WIDTH / 2) - 200, 700, 'normal ' + this.line3.fontSize + 'pt Verdana', 'rgba(255, 255, 255, ' + this.line3.opacity + ')');
			break;
	}
};