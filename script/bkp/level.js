
/***********************************
*****  LEVEL: The Level Class  *****
***********************************/

function Level () {
	this.timer = 0;
	this.previousScene = undefined;	// This will be the scene we just changed from
	this.currentScene = undefined;	// Our current scene
	this.nextScene = undefined;		// Pre-load our next scene
	this.worldWidth = 0;
	this.worldHeight = 0;

	this.player = undefined;
	this.camera = new Camera();

	// this.lines = [];

	this.timer = 0;

	// for (var e = 0; e < 10; e++) {
		// this.enemies.push(new Enemy(this));
	// }

	this.Initialize();
	
}

Level.prototype.Initialize = function () {
	this.currentScene = new Scene();
	this.worldWidth = this.currentScene.GetWorldWidth();
	this.worldHeight = this.currentScene.GetWorldHeight();
	this.player = new Player(this.currentScene);
};

Level.prototype.IsPlayerDead = function () {
	return this.player.IsDead();
};

Level.prototype.CheckPlayerCollision = function (enemy) {
	var playerBounds, enemyBounds, intersect;
	playerBounds = new Rectangle(this.player.pos.x, this.player.pos.y, this.player.size.x, this.player.size.y);
	enemyBounds = new Rectangle(enemy.pos.x, enemy.pos.y, enemy.size.x, enemy.size.y);

	intersect = RectangleExtensions.GetIntersectionDepth(playerBounds, enemyBounds);

	// Enemy has run into our player
	if (!this.player.isInvincible && intersect.x !== 0 && intersect.y !== 0) {
		this.player.IsHit();
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
	return this.enemies.length;
};

Level.prototype.GetTimer = function () {
	return Math.floor(this.timer);
};

Level.prototype.Update = function () {
	var elapsed, cameraPosX, cameraPosY, e, enemy, s, shoots, shot;
	elapsed = GameTime.GetElapsed();

	this.player.Update();
	this.timer = this.timer + elapsed;

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

	shoots = this.player.GetShoots();

	/*
	// Enemies
	for (e = 0; e < this.enemies.length; e++) {
		enemy = this.enemies[e];

		// If enemy is dead, remove him. Else, update him
		if (enemy.IsDead()) {
			this.enemies.splice(e, 1);
			// this.enemies.push(new Enemy(this));
		} else {
			enemy.Update();
		}

		// Check for enemy collision with shoots
		for (s = 0; s < shoots.length; s++) {

			shot = shoots[s];

			// Check to see if the enemy has been hit by a bullet
			if (this.CheckEnemyShot(enemy, shot)) {
				enemy.Shot(shot.GetDmg());
				this.player.ShotLanded(s);
				break;
			}

		}

		// Check for enemy collision with player
		if (this.CheckPlayerCollision(enemy))
			this.player.IsHit();

	}
	*/
};

Level.prototype.Draw = function () {
	var l, e;

	this.camera.begin();

	this.scene.Draw();
	this.player.Draw();

	/*
	// Enemies
	for (e = 0; e < this.enemies.length; e++) {
		this.enemies[e].Draw();
	}

	for (l = 0; l < this.lines.length; l++) {
		this.lines[l].Draw();
	}
	*/

	this.camera.end();

};