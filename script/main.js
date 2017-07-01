
/***************************************
*****  MAIN: Entry Point for Game  *****
***************************************/
var main = {
	init: function () {
		var wrapper, gamePadDiv;

		this.isRunning = true;
		this.CANVAS_WIDTH = 1280;
		this.CANVAS_HEIGHT = 720;
		this.canvas = document.getElementById('viewport');
		this.canvas.width = this.CANVAS_WIDTH;
		this.canvas.height = this.CANVAS_HEIGHT;
		this.context = this.canvas.getContext('2d');
		this.hasGamePad = false;
		this.GamePad = undefined;
		this.gamePadDiv = document.getElementById('GamePad');

		// Adjust webpage styles
		wrapper = document.getElementById('wrapper');
		wrapper.style.width = this.CANVAS_WIDTH + 'px';
		wrapper.style.height = this.CANVAS_HEIGHT + 'px';
		this.gamePadDiv.style.width = this.CANVAS_WIDTH + 'px';

		// Create event listeners
		window.addEventListener('keyup', function (e) { Input.Keys.onKeyUp(e); }, false);
		window.addEventListener('keydown', function (e) { Input.Keys.onKeyDown(e); }, false);
		this.canvas.addEventListener('mousemove', function (e) { Input.Mouse.OnMouseMove.SetPosition(e); }, false);
		this.canvas.addEventListener('mousedown', function (e) { Input.Mouse.OnMouseDown(e); }, false);
		this.canvas.addEventListener('mouseup', function (e) { Input.Mouse.OnMouseUp(e); }, false);


		window.addEventListener('gamepadconnected', function (e) { Input.GamePad.init(); console.log('gamepadconnected'); }, false);	//  Input.GamePad.init();
		window.addEventListener('gamepaddisconnected', function (e) { Input.GamePad.deinit(); console.log('gamepaddisconnected'); }, false);

		// Get the gamepad started if it hasn't been already
		Input.GamePad.init();

		this.game = new Game();
		this.game.Initialize();
		main.run();

	},
	GameStates: {
		PRIMARY: {
			INTRO: 0,
			MAIN_MENU: 1,
			PLAYING: 2,
			OUTRO: 3,
			LOADING: 4
		},
		SECONDARY: {
			GAME_MENU: 0,
			OPTIONS_MENU: 1,
			TRANSITION: 2
		}
	},
	run: function () {
		if (main.isRunning) {
			main.game.Update();
			main.game.Draw();
		}
		requestAnimationFrame(main.run);
	}
};