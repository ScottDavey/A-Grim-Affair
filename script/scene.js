/*************************************************
*****  SCENE: Sets the stage for each level  *****
*************************************************/

function Scene (selectedLevel) {
	console.log(this.enemies);
	this.selectedLevel = selectedLevel;
	this.backToHUB = false;
	this.level = stages[selectedLevel];
	this.worldWidth = this.level[0];
	this.worldHeight = this.level[1];
	// this.playerStart = this.level[2];
	this.playerStart = new Vector2(50, 50);	// Adding this temporarily because the one above seems to continually update the array value for some reason
	this.backgroundImgs = this.level[3];
	this.parallax = undefined;
	this.collision = this.level[4];
	this.lines = [];
	this.enemyArr = this.level[5];
	this.enemies = [];

	this.camera = new Camera();
	this.player = new Player(this, this.playerStart);

	this.LoadContent();

}

Scene.prototype.UnloadContent = function () {
	this.selectedLevel = undefined;
	this.backToHUB = undefined;
	this.level = undefined;
	this.worldWidth = undefined;
	this.worldHeight = undefined;
	this.playerStart = undefined;
	this.backgroundImgs = undefined;
	this.backgrounds = undefined;
	this.collision = undefined;
	this.lines = undefined;

	this.camera = undefined;
	this.player = undefined;
};

Scene.prototype.LoadContent = function () {
	var b, e;

	this.parallax = new Parallax(this.backgroundImgs);

	this.LoadCollision();

	for (e = 0; e < this.enemyArr.length; e++) {
		this.enemies.push(new Enemy(this, this.enemyArr[e][0]));
	}
};

Scene.prototype.LoadCollision = function () {
	var l;

	for (l = 0; l < this.collision.length; l++) {
		this.lines.push(new Line(new Vector2(this.collision[l].sx, this.collision[l].sy), new Vector2(this.collision[l].ex, this.collision[l].ey), this.collision[l].h, this.collision[l].c, this.collision[l].n, this.collision[l].s));
	}
};

Scene.prototype.Update = function () {
	var cameraPosX, cameraPosY, e, enemy;

	this.player.Update();

	// Camera
	cameraPosX = this.player.pos.x + (this.player.size.x / 2) - (main.CANVAS_WIDTH / 2);
	cameraPosY = this.player.pos.y + (this.player.size.y / 2) - (main.CANVAS_HEIGHT / 2);

	if (cameraPosX < 0) {
		cameraPosX = 0;
	} else if (cameraPosX > (this.worldWidth - main.CANVAS_WIDTH)) {
		cameraPosX = this.worldWidth - main.CANVAS_WIDTH;
	}

	if (cameraPosY < 0) {
		cameraPosY = 0;
	} else if (cameraPosY > (this.worldHeight - main.CANVAS_HEIGHT)) {
		cameraPosY = this.worldHeight - main.CANVAS_HEIGHT;
	}

	this.camera.moveTo(cameraPosX, cameraPosY);

	this.parallax.Update(new Vector2(cameraPosX, cameraPosY));

	// Enemies
	for (e = 0; e < this.enemies.length; e++) {
		this.enemies[e].Update();
	}

	if (Input.Keys.GetKey(Input.Keys.SHIFT)) {
		this.backToHUB = true;
	}

};

Scene.prototype.Draw = function () {
	var l, e, b;

	this.camera.begin();

	this.parallax.Draw();

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