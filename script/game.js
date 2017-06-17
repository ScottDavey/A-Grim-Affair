
/*********************************
*****  GAME: The Game Class  *****
*********************************/

function Game () {
	this.fps = 0;
	this.clearBox = new Texture(new Vector2(0, 0), new Vector2(main.CANVAS_WIDTH, main.CANVAS_HEIGHT), '0x000000', 1, '0x000000');
	this.player = new Player();
	// this.state = 'MAIN MENU';
	// this.mainMenu = undefined;
	// this.level = undefined;
	// this.transition = undefined;

	// Initialize GameTime
	GameTime.Update();

	// Game Loop
	// this.ChangeState('MAIN MENU');
}

Game.prototype.ChangeState = function (state, transition) {

};

Game.prototype.Update = function () {

	this.fps = fps.getFPS();
	this.player.Update();

};

Game.prototype.Draw = function () {
	main.context.clearRect(0, 0, main.CANVAS_WIDTH, main.CANVAS_HEIGHT);
	this.clearBox.Draw();
	this.player.Draw();

	DrawText('FPS: ' + this.fps, (main.CANVAS_WIDTH / 2 - 50), 20, 'normal 14pt Consolas, Trebuchet MS, Verdana', '#FFFFFF');
};