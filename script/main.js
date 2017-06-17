
/***************************************
*****  MAIN: Entry Point for Game  *****
***************************************/
var main = {
	init: function () {
		var wrapper;

		this.isRunning = true;
		this.CANVAS_WIDTH = 1280;
		this.CANVAS_HEIGHT = 720;
		this.canvas = document.getElementById('viewport');
		this.canvas.width = this.CANVAS_WIDTH;
		this.canvas.height = this.CANVAS_HEIGHT;
		this.context = this.canvas.getContext('2d');
		this.game = new Game();

		// Adjust webpage styles
		wrapper = document.getElementById('wrapper');
		wrapper.style.width = this.CANVAS_WIDTH + 'px';
		wrapper.style.height = this.CANVAS_HEIGHT + 'px';

		// Create event listeners
		window.addEventListener('keyup', function (e) { Input.Keys.onKeyUp(e); }, false);
		window.addEventListener('keydown', function (e) { Input.Keys.onKeyDown(e); }, false);
		this.canvas.addEventListener('mousemove', function (e) { Input.Mouse.OnMouseMove.SetPosition(e); }, false);
		this.canvas.addEventListener('mousedown', function (e) { Input.Mouse.OnMouseDown(e); }, false);
		this.canvas.addEventListener('mouseup', function (e) { Input.Mouse.OnMouseUp(e); }, false);

		main.run();

	},
	run: function () {
		if (main.isRunning) {
			GameTime.Update();
			main.game.Update();
			main.game.Draw();
		}
		requestAnimationFrame(main.run);
	}
};