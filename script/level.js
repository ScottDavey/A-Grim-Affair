
/***********************************
*****  LEVEL: The Level Class  *****
***********************************/

function Level () {
	this.WORLD_WIDTH = main.CANVAS_WIDTH;
	this.WORLD_HEIGHT = main.CANVAS_HEIGHT;
	this.player = new Player(this);
	this.camera = new Camera();

	this.lines = [];
	this.LoadLines();

	this.BG = new Texture(new Vector2(0, 0), new Vector2(main.CANVAS_WIDTH, main.CANVAS_HEIGHT), '#111111', 1, '#111111');
}

Level.prototype.LoadLines = function () {
	
	this.lines.push(new Line(new Vector2(1, 2), new Vector2(1, 715), "#02AA30", "WALL", 1, "undefined"));
	this.lines.push(new Line(new Vector2(1276, 3), new Vector2(1276, 716), "#02AA30", "WALL", -1, "undefined"));
	this.lines.push(new Line(new Vector2(1, 714), new Vector2(172, 703), "#9F0313", "FLOOR", -1, "undefined"));
	this.lines.push(new Line(new Vector2(172, 703), new Vector2(316, 708), "#9F0313", "FLOOR", -1, "undefined"));
	this.lines.push(new Line(new Vector2(316, 708), new Vector2(421, 704), "#9F0313", "FLOOR", -1, "undefined"));
	this.lines.push(new Line(new Vector2(421, 704), new Vector2(688, 700), "#9F0313", "FLOOR", -1, "undefined"));
	this.lines.push(new Line(new Vector2(688, 700), new Vector2(1045, 704), "#9F0313", "FLOOR", -1, "undefined"));
	this.lines.push(new Line(new Vector2(1045, 704), new Vector2(1277, 715), "#9F0313", "FLOOR", -1, "undefined"));
	this.lines.push(new Line(new Vector2(3, 327), new Vector2(39, 323), "#9F0313", "FLOOR", -1, "GRASS"));
	this.lines.push(new Line(new Vector2(39, 323), new Vector2(77, 322), "#9F0313", "FLOOR", -1, "GRASS"));
	this.lines.push(new Line(new Vector2(77, 322), new Vector2(131, 326), "#9F0313", "FLOOR", -1, "GRASS"));
	this.lines.push(new Line(new Vector2(131, 326), new Vector2(166, 328), "#9F0313", "FLOOR", -1, "GRASS"));
	this.lines.push(new Line(new Vector2(166, 328), new Vector2(186, 336), "#9F0313", "FLOOR", -1, "GRASS"));
	this.lines.push(new Line(new Vector2(186, 336), new Vector2(216, 335), "#9F0313", "FLOOR", -1, "GRASS"));
	this.lines.push(new Line(new Vector2(216, 335), new Vector2(253, 338), "#9F0313", "FLOOR", -1, "GRASS"));
	this.lines.push(new Line(new Vector2(253, 338), new Vector2(278, 349), "#9F0313", "FLOOR", -1, "GRASS"));
	this.lines.push(new Line(new Vector2(278, 349), new Vector2(306, 353), "#9F0313", "FLOOR", -1, "GRASS"));
	this.lines.push(new Line(new Vector2(305, 354), new Vector2(305, 549), "#02AA30", "WALL", 1, "NONE"));
	this.lines.push(new Line(new Vector2(305, 549), new Vector2(334, 559), "#9F0313", "FLOOR", -1, "GRASS"));
	this.lines.push(new Line(new Vector2(334, 559), new Vector2(472, 583), "#9F0313", "FLOOR", -1, "GRASS"));
	this.lines.push(new Line(new Vector2(472, 583), new Vector2(559, 587), "#9F0313", "FLOOR", -1, "GRASS"));
	this.lines.push(new Line(new Vector2(559, 587), new Vector2(621, 559), "#9F0313", "FLOOR", -1, "GRASS"));
	this.lines.push(new Line(new Vector2(621, 559), new Vector2(664, 573), "#9F0313", "FLOOR", -1, "GRASS"));
	this.lines.push(new Line(new Vector2(664, 573), new Vector2(695, 560), "#9F0313", "FLOOR", -1, "GRASS"));
	this.lines.push(new Line(new Vector2(695, 560), new Vector2(732, 586), "#9F0313", "FLOOR", -1, "GRASS"));
	this.lines.push(new Line(new Vector2(732, 586), new Vector2(790, 588), "#9F0313", "FLOOR", -1, "GRASS"));
	this.lines.push(new Line(new Vector2(790, 588), new Vector2(920, 578), "#9F0313", "FLOOR", -1, "GRASS"));
	this.lines.push(new Line(new Vector2(920, 578), new Vector2(1006, 533), "#9F0313", "FLOOR", -1, "GRASS"));
	this.lines.push(new Line(new Vector2(1006, 358), new Vector2(1006, 533), "#02AA30", "WALL", -1, "NONE"));
	this.lines.push(new Line(new Vector2(813, 368), new Vector2(1006, 358), "#0E72D5", "CEILING", 1, "NONE"));
	this.lines.push(new Line(new Vector2(813, 368), new Vector2(813, 473), "#02AA30", "WALL", 1, "NONE"));
	this.lines.push(new Line(new Vector2(523, 469), new Vector2(813, 473), "#0E72D5", "CEILING", 1, "NONE"));
	this.lines.push(new Line(new Vector2(523, 341), new Vector2(523, 469), "#02AA30", "WALL", -1, "NONE"));
	this.lines.push(new Line(new Vector2(523, 341), new Vector2(560, 323), "#9F0313", "FLOOR", -1, "GRASS"));
	this.lines.push(new Line(new Vector2(560, 323), new Vector2(650, 322), "#9F0313", "FLOOR", -1, "GRASS"));
	this.lines.push(new Line(new Vector2(650, 322), new Vector2(724, 313), "#9F0313", "FLOOR", -1, "GRASS"));
	this.lines.push(new Line(new Vector2(724, 313), new Vector2(762, 321), "#9F0313", "FLOOR", -1, "GRASS"));
	this.lines.push(new Line(new Vector2(762, 321), new Vector2(819, 327), "#9F0313", "FLOOR", -1, "GRASS"));
	this.lines.push(new Line(new Vector2(819, 327), new Vector2(897, 281), "#9F0313", "FLOOR", -1, "GRASS"));
	this.lines.push(new Line(new Vector2(897, 281), new Vector2(944, 262), "#9F0313", "FLOOR", -1, "GRASS"));
	this.lines.push(new Line(new Vector2(944, 262), new Vector2(1009, 251), "#9F0313", "FLOOR", -1, "GRASS"));
	this.lines.push(new Line(new Vector2(1009, 157), new Vector2(1009, 251), "#02AA30", "WALL", -1, "NONE"));
	this.lines.push(new Line(new Vector2(1009, 157), new Vector2(1054, 138), "#9F0313", "FLOOR", -1, "GRASS"));
	this.lines.push(new Line(new Vector2(1054, 138), new Vector2(1114, 132), "#9F0313", "FLOOR", -1, "GRASS"));
	this.lines.push(new Line(new Vector2(1114, 132), new Vector2(1114, 169), "#02AA30", "WALL", 1, "NONE"));
	this.lines.push(new Line(new Vector2(1114, 169), new Vector2(1167, 163), "#9F0313", "FLOOR", -1, "GRASS"));
	this.lines.push(new Line(new Vector2(1167, 163), new Vector2(1234, 179), "#9F0313", "FLOOR", -1, "GRASS"));
	this.lines.push(new Line(new Vector2(1234, 179), new Vector2(1277, 172), "#9F0313", "FLOOR", -1, "GRASS"));
	this.lines.push(new Line(new Vector2(1008, 49), new Vector2(1112, 63), "#0E72D5", "CEILING", 1, "NONE"));
	this.lines.push(new Line(new Vector2(1008, -1), new Vector2(1008, 49), "#02AA30", "WALL", -1, "NONE"));
	this.lines.push(new Line(new Vector2(1112, 0), new Vector2(1112, 62), "#02AA30", "WALL", 1, "NONE"));


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