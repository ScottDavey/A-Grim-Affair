
/*********************************
*****  GAME: The Game Class  *****
*********************************/

function Game () {
	this.isRunning = true;
	this.fps = 0;
	this.GameStates = [];
	this.clearBox = new Texture(new Vector2(0, 0), new Vector2(main.CANVAS_WIDTH, main.CANVAS_HEIGHT), '0x000000', 1, '0x000000');
	// this.state = 'MAIN MENU';
	// this.mainMenu = undefined;
	// this.level = undefined;
	// this.transition = undefined;

	// Game Loop
	// this.ChangeState('MAIN MENU');
}

Game.prototype.Initialize = function () {
	this.GameStates.push(main.GameStates.INTRO);
};

Game.prototype.ChangeState = function (state, transition) {

};

Game.prototype.Update = function () {

	if (this.isRunning) {

		// Update Frames per Second counter
		this.fps = fps.getFPS();
		// Update Game Time
		GameTime.Update();

		// Update only based on the active game state

	}
	requestAnimationFrame(this.Update);

};

Game.prototype.Draw = function () {
	main.context.clearRect(0, 0, main.CANVAS_WIDTH, main.CANVAS_HEIGHT);
	this.clearBox.Draw();

	// Draw only based on the active game state

	DrawText('FPS: ' + this.fps, (main.CANVAS_WIDTH / 2 - 50), 20, 'normal 14pt Consolas, Trebuchet MS, Verdana', '#FFFFFF');
};