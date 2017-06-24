
/***********************************
*****  LEVEL: The Level Class  *****
***********************************/

function Level () {
	this.WORLD_WIDTH = main.CANVAS_WIDTH * 2;
	this.WORLD_HEIGHT = main.CANVAS_HEIGHT * 2;
	this.player = new Player(this);
	this.camera = new Camera();

	this.lines = [];
	this.LoadLines();

	this.BG = new Texture(new Vector2(0, 0), new Vector2(main.CANVAS_WIDTH, main.CANVAS_HEIGHT), '#000000', 1, '#000000');
}

Level.prototype.LoadLines = function () {
	var one, l;
	one = levelMap.one;

	for (l = 0; l < one.length; l++) {
		this.lines.push(new Line(new Vector2(one[l].sx, one[l].sy), new Vector2(one[l].ex, one[l].ey), one[l].h, one[l].c, one[l].n, one[l].s));
	}

};

Level.prototype.Update = function () {
	var cameraPosX, cameraPosY;

	this.player.Update();

	// Camera
	cameraPosX = this.player.pos.x + (this.player.size.x / 2) - (main.CANVAS_WIDTH / 2);
	cameraPosY = this.player.pos.y + (this.player.size.y / 2) - (main.CANVAS_HEIGHT / 2);

	if (cameraPosX < 0) {
		cameraPosX = 0;
	} else if (cameraPosX > (this.WORLD_WIDTH - main.CANVAS_WIDTH)) {
		cameraPosX = this.WORLD_WIDTH - main.CANVAS_WIDTH;
	}

	if (cameraPosY < 0) {
		cameraPosY = 0;
	} else if (cameraPosY > (this.WORLD_HEIGHT - main.CANVAS_HEIGHT)) {
		cameraPosY = this.WORLD_HEIGHT - main.CANVAS_HEIGHT;
	}

	this.camera.moveTo(cameraPosX, cameraPosY);
};

Level.prototype.Draw = function () {
	var l;

	DrawText('YES', 0, 0, 'normal 14pt Consolas, Trebuchet MS, Verdana', '#FFFFFF');

	this.camera.begin();

	this.BG.Draw();
	this.player.Draw();

	for (l = 0; l < this.lines.length; l++) {
		this.lines[l].Draw();
	}

	this.camera.end();

};