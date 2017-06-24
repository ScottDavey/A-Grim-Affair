
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
	
	// First 1/2 of screen
	this.lines.push(new Line(new Vector2(0, 259), new Vector2(204, 255), "#9F0313", "FLOOR", -1, "GRASS"));
	this.lines.push(new Line(new Vector2(204, 255), new Vector2(482, 457), "#9F0313", "FLOOR", -1, "GRASS"));
	this.lines.push(new Line(new Vector2(482, 457), new Vector2(737, 465), "#9F0313", "FLOOR", -1, "GRASS"));
	this.lines.push(new Line(new Vector2(737, 465), new Vector2(809, 444), "#9F0313", "FLOOR", -1, "GRASS"));
	this.lines.push(new Line(new Vector2(809, 444), new Vector2(1073, 445), "#9F0313", "FLOOR", -1, "GRASS"));
	this.lines.push(new Line(new Vector2(1073, 445), new Vector2(1279, 487), "#9F0313", "FLOOR", -1, "GRASS"));
	this.lines.push(new Line(new Vector2(365, 175), new Vector2(625, 175), "#9F0313", "FLOOR", -1, "GRASS"));
	this.lines.push(new Line(new Vector2(809, 119), new Vector2(1077, 122), "#9F0313", "FLOOR", -1, "GRASS"));
	this.lines.push(new Line(new Vector2(1076, 288), new Vector2(1260, 290), "#9F0313", "FLOOR", -1, "GRASS"));
	this.lines.push(new Line(new Vector2(624, 174), new Vector2(624, 222), "#02AA30", "WALL", 1, "NONE"));
	this.lines.push(new Line(new Vector2(1077, 122), new Vector2(1077, 162), "#02AA30", "WALL", 1, "NONE"));
	this.lines.push(new Line(new Vector2(1259, 289), new Vector2(1259, 335), "#02AA30", "WALL", 1, "NONE"));
	this.lines.push(new Line(new Vector2(366, 175), new Vector2(366, 218), "#02AA30", "WALL", -1, "NONE"));
	this.lines.push(new Line(new Vector2(809, 119), new Vector2(809, 155), "#02AA30", "WALL", -1, "NONE"));
	this.lines.push(new Line(new Vector2(1077, 288), new Vector2(1077, 326), "#02AA30", "WALL", -1, "NONE"));
	this.lines.push(new Line(new Vector2(366, 217), new Vector2(623, 221), "#0E72D5", "CEILING", 1, "NONE"));
	this.lines.push(new Line(new Vector2(809, 154), new Vector2(1077, 161), "#0E72D5", "CEILING", 1, "NONE"));
	this.lines.push(new Line(new Vector2(1076, 324), new Vector2(1260, 334), "#0E72D5", "CEILING", 1, "NONE"));
	this.lines.push(new Line(new Vector2(0, 2), new Vector2(0, 260), "#02AA30", "WALL", 1, "NONE"));
	// Second 1/2 of screen
	this.lines.push(new Line(new Vector2(1280, (1767 - 1280)), new Vector2(1596, (1783 - 1280)), "#9F0313", "FLOOR", -1, "GRASS"));
	this.lines.push(new Line(new Vector2(1596, (1783 - 1280)), new Vector2(2039, (1875 - 1280)), "#9F0313", "FLOOR", -1, "GRASS"));
	this.lines.push(new Line(new Vector2(2039, (1875 - 1280)), new Vector2(2314, (1837 - 1280)), "#9F0313", "FLOOR", -1, "GRASS"));
	this.lines.push(new Line(new Vector2(2314, (1837 - 1280)), new Vector2(2505, (1743 - 1280)), "#9F0313", "FLOOR", -1, "GRASS"));
	this.lines.push(new Line(new Vector2(2505, (1743 - 1280)), new Vector2(2558, (1741 - 1280)), "#9F0313", "FLOOR", -1, "GRASS"));
	this.lines.push(new Line(new Vector2(2558, (1282 - 1280)), new Vector2(2558, (1741 - 1280)), "#02AA30", "WALL", -1, "NONE"));
	this.lines.push(new Line(new Vector2(1341, (1657 - 1280)), new Vector2(1708, (1657 - 1280)), "#9F0313", "FLOOR", -1, "GRASS"));
	this.lines.push(new Line(new Vector2(1708, (1657 - 1280)), new Vector2(1773, (1629 - 1280)), "#9F0313", "FLOOR", -1, "GRASS"));
	this.lines.push(new Line(new Vector2(1773, (1629 - 1280)), new Vector2(1916, (1625 - 1280)), "#9F0313", "FLOOR", -1, "GRASS"));
	this.lines.push(new Line(new Vector2(1916, (1625 - 1280)), new Vector2(2009, (1575 - 1280)), "#9F0313", "FLOOR", -1, "GRASS"));
	this.lines.push(new Line(new Vector2(2009, (1575 - 1280)), new Vector2(2170, (1570 - 1280)), "#9F0313", "FLOOR", -1, "GRASS"));
	this.lines.push(new Line(new Vector2(2170, (1570 - 1280)), new Vector2(2381, (1480 - 1280)), "#9F0313", "FLOOR", -1, "GRASS"));
	this.lines.push(new Line(new Vector2(2381, (1480 - 1280)), new Vector2(2481, (1479 - 1280)), "#9F0313", "FLOOR", -1, "GRASS"));
	this.lines.push(new Line(new Vector2(2481, (1479 - 1280)), new Vector2(2481, (1661 - 1280)), "#02AA30", "WALL", 1, "NONE"));
	this.lines.push(new Line(new Vector2(1342, (1657 - 1280)), new Vector2(1342, (1688 - 1280)), "#02AA30", "WALL", 1, "NONE"));
	this.lines.push(new Line(new Vector2(1342, (1688 - 1280)), new Vector2(1707, (1671 - 1280)), "#0E72D5", "CEILING", 1, "NONE"));
	this.lines.push(new Line(new Vector2(1707, (1671 - 1280)), new Vector2(1774, (1640 - 1280)), "#0E72D5", "CEILING", 1, "NONE"));
	this.lines.push(new Line(new Vector2(1774, (1640 - 1280)), new Vector2(1920, (1638 - 1280)), "#0E72D5", "CEILING", 1, "NONE"));
	this.lines.push(new Line(new Vector2(1920, (1638 - 1280)), new Vector2(2024, (1586 - 1280)), "#0E72D5", "CEILING", 1, "NONE"));
	this.lines.push(new Line(new Vector2(2024, (1586 - 1280)), new Vector2(2229, (1581 - 1280)), "#0E72D5", "CEILING", 1, "NONE"));
	this.lines.push(new Line(new Vector2(2229, (1581 - 1280)), new Vector2(2458, (1490 - 1280)), "#0E72D5", "CEILING", 1, "NONE"));
	this.lines.push(new Line(new Vector2(2458, (1490 - 1280)), new Vector2(2458, (1661 - 1280)), "#02AA30", "WALL", -1, "NONE"));
	this.lines.push(new Line(new Vector2(2458, (1661 - 1280)), new Vector2(2481, (1661 - 1280)), "#0E72D5", "CEILING", 1, "NONE"));

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