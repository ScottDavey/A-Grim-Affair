
/***********************************
*****  LEVEL: The Level Class  *****
***********************************/

function Level () {
	this.WORLD_WIDTH = main.CANVAS_WIDTH * 2;
	this.WORLD_HEIGHT = main.CANVAS_HEIGHT * 2;
	this.player = new Player(this);
	this.enemies = [];
	this.camera = new Camera();

	this.lines = [];
	this.LoadLines();

	this.BG = new Texture(new Vector2(0, 0), new Vector2(main.CANVAS_WIDTH, main.CANVAS_HEIGHT), '#000000', 1, '#000000');

	for (var e = 0; e < 6; e++) {
		this.enemies.push(new Enemy(this));
	}
	
}

Level.prototype.LoadLines = function () {
	var map, l;
	// map = levelMap.one;
	map = levelMap.two;

	for (l = 0; l < map.length; l++) {
		this.lines.push(new Line(new Vector2(map[l].sx, map[l].sy), new Vector2(map[l].ex, map[l].ey), map[l].h, map[l].c, map[l].n, map[l].s));
	}

};

Level.prototype.CheckEnemyShot = function (enemy, shot) {
	var shotCenter, isHit = false;

	shotCenter = new Vector2(shot.pos.x + (shot.size.x / 2), shot.pos.y + (shot.size.y / 2));

	if (shotCenter.x > enemy.pos.x && shotCenter.x < (enemy.pos.x + enemy.size.x) && shotCenter.y > enemy.pos.y && shotCenter.y < (enemy.pos.y + enemy.size.y)) {
		isHit = true;
	}

	return isHit;

};

Level.prototype.GetEnemyCount = function () {
	return this.enemies.length + 1;
};

Level.prototype.Update = function () {
	var cameraPosX, cameraPosY, e, enemy, s, shoots, shot;

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

	shoots = this.player.GetShoots();

	// Enemies
	for (e = 0; e < this.enemies.length; e++) {
		enemy = this.enemies[e];

		// If enemy is dead, remove him. Else, update him
		if (enemy.IsDead()) {
			this.enemies.splice(e, 1);
			this.enemies.push(new Enemy(this));
		} else {
			enemy.Update();
		}

		for (s = 0; s < shoots.length; s++) {

			shot = shoots[s];

			// Check to see if the enemy has been hit by a bullet
			if (this.CheckEnemyShot(enemy, shot)) {
				enemy.Shot(shot.GetDmg());
				this.player.ShotLanded(s);
				break;
			}

		}

	}
};

Level.prototype.Draw = function () {
	var l, e;

	this.camera.begin();

	this.BG.Draw();
	this.player.Draw();

	// Enemies
	for (e = 0; e < this.enemies.length; e++) {
		this.enemies[e].Draw();
	}

	for (l = 0; l < this.lines.length; l++) {
		this.lines[l].Draw();
	}

	this.camera.end();

};