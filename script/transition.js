/******************************************************
*****  TRANSITION: The Transition between states  *****
******************************************************/

function Transition (duration, fadeIn, fadeInColor, fadeOut, fadeOutColor) {
	this.fadeIn = fadeIn;
	this.fadeInColor = fadeInColor;
	this.fadeOut = fadeOut;
	this.fadeOutColor = fadeOutColor;
	this.opacity = 1;
	this.BG = new Texture(new Vector2(0, 0), new Vector2(main.CANVAS_WIDTH, main.CANVAS_HEIGHT), 'rgba(0, 0, 0, 1)', 1, 'rgba(0, 0, 0, 1)');
	this.state = 0;
	this.previousTime = GameTime.GetCurrentGameTime();
	this.totalElapsed = 0;
}

Transition.prototype.Initialize = function () {

};

Transition.prototype.Update = function () {
	var currentTime, elapsed;
	currentTime = GameTime.GetCurrentGameTime();

	if ((currentTime - this.previousTime) >= 0.05 && this.opacity >= 0) {
		this.opacity -= 0.05;
		console.log(this.opacity);
		this.BG.SetColor('rgba(0, 0, 0, ' + this.opacity + ')');
		this.previousTime = currentTime;
	}
	
	this.totalElapsed += Math.floor((currentTime - this.previousTime));

	/*switch (this.state) {
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
	}*/

};

Transition.prototype.Draw = function () {
	this.BG.Draw();
};