/******************************************************
*****  TRANSITION: The Transition between states  *****
******************************************************/

function Transition (fadeIn, fadeInColor, fadeOut, fadeOutColor, duration, toPrimary) {
	this.fadeIn = fadeIn;
	this.fadeInColor = fadeInColor;
	this.fadeOut = fadeOut;
	this.fadeOutColor = fadeOutColor;
	this.BG = new Texture(new Vector2(0, 0), new Vector2(main.CANVAS_WIDTH, main.CANVAS_HEIGHT), 0x000000, 1, 0x000000);
	this.toPrimary = toPrimary;
	this.state = 0;
	this.previousTime = GameTime.GetCurrentGameTime();

}

Transition.prototype.Initialize = function () {

};

Transition.prototype.Update = function () {
	var currentTime;
	currentTime = GameTime.GetCurrentGameTime();

	switch (this.state) {
		// Fade in
		case 0:
			if (currentTime - this.previousTime >= 3) {
				main.game.primaryState = main.GameStates.PRIMARY.MAIN_MENU;
				this.previousTime = currentTime;
				this.state++;
			}
			break;
		// Fade Out
		case 1:
			if (currentTime - this.previousTime >= 3) {
				main.game.secondaryState = [];
			}
			break;
	}

};

Transition.prototype.Draw = function () {
	this.BG.Draw();
};