/*******************************************
**************  PLAYER CLASS  **************
*******************************************/
function Enemy (level) {
	this.level = level;
	this.pos = new Vector2(random(25, 2000), 25);
	this.size = new Vector2(30, 75);
	this.velocity = new Vector2(0, 0);
	this.dir = 1;
	// Horizontal Movement
	this.acceleration = 4000.0;
	this.speed = 500.0;
	// Vertical Movement
	this.gravity = 3000.0;
	this.maxFallSpeed = 1000.0;
	// Jumping
	this.isJumping = false;
	this.wasJumping = false;
	this.isOnGround = false;
	this.jumpTime = 0;
	this.maxJumpTime = 0.10;
	this.jumpBurst = -1200.0;

	this.hitWall = false;
	this.life = 100;
	this.lifeMax = 100;
	this.lifeBar = new Texture(new Vector2(this.pos.x, this.pos.y - 15), new Vector2(30, 5), '#00FF00', 1, '#007700');
	this.enemy = new Texture(this.pos, this.size, '#2979e6', 1, '#123a71');
	this.isDead = false;

}

Enemy.prototype.HandleCollision = function () {
	var bounds, i, line, b, slope, y, xDiff, shouldPlayWalkSound;

	bounds = new Rectangle(this.pos.x, this.pos.y, this.size.x, this.size.y);
	this.isOnGround = false;
	this.hitWall = false;

	// Lines
	for (i = 0; i < this.level.lines.length; i++) {

		line = this.level.lines[i];

		if ((line.collision == 'FLOOR' || line.collision == 'CEILING') && bounds.center.x >= line.startPos.x && bounds.center.x <= line.endPos.x) {

			slope = (line.endPos.y - line.startPos.y) / (line.endPos.x - line.startPos.x);
			b = line.startPos.y - (slope * line.startPos.x);
			y = (slope * bounds.center.x) + b;

			if (Math.abs(y - bounds.center.y) <= bounds.halfSize.y) {
				y = Math.floor(y);
				this.pos.y = (line.normal < 0) ? y - bounds.height : y;
				this.velocity.y = 0;
				if (line.collision === 'FLOOR') {
					this.isOnGround = true;
				}
			}

		} else if (line.collision == 'WALL' && bounds.center.y > line.startPos.y && bounds.center.y < line.endPos.y) {

			xDiff = Math.abs(bounds.center.x - line.startPos.x);

			if (xDiff <= bounds.halfSize.x) {

				this.pos.x = (line.normal < 0) ? line.startPos.x - bounds.width : line.startPos.x;
				this.velocity.x = 0;

				this.hitWall = true;

			}


		}

	}
};

Enemy.prototype.IsDead = function () {
	return this.isDead;
};

Enemy.prototype.Shot = function (dmg) {
	var newLife;

	newLife = this.life - dmg;

	if (newLife > 0) {
		this.life = newLife;
		this.lifeBar.SetSize(new Vector2((this.life / this.lifeMax) * 30, 5));
	} else {
		this.isDead = true;
	}

};

Enemy.prototype.Jump = function (velY) {
	var elapsed = GameTime.GetElapsed();

	if (this.isJumping) {

		if (this.isOnGround && this.jumpTime < this.maxJumpTime) {
			velY = this.jumpBurst;
		}

		this.jumpTime += elapsed;
	} else {
		this.jumpTime = 0;
	}

	this.wasJumping = this.isJumping;

	return velY;
};

Enemy.prototype.Update = function () {
	var elapsed = GameTime.GetElapsed(), s;

	// Jump, randomly
	if (random(0, 20) === 5) this.isJumping = true;

	// Horizontal movement
	this.velocity.x += this.dir * this.acceleration * elapsed;
	this.velocity.x = Clamp(this.velocity.x, -this.speed, this.speed);
	this.pos.x += Math.round(this.velocity.x * elapsed);

	// Vertical Movement
	this.velocity.y = Clamp(this.velocity.y + this.gravity * elapsed, -this.maxFallSpeed, this.maxFallSpeed);
	this.velocity.y = this.Jump(this.velocity.y);
	this.pos.y += this.velocity.y * elapsed;
	this.pos.y = Math.round(this.pos.y);

	// Update Life Bar
	this.lifeBar.Update(new Vector2(this.pos.x, this.pos.y - 15));

	this.HandleCollision();

	if (this.hitWall) this.dir = (this.dir === 1) ? -1 : 1;

	// If enemy falls through a hole (or collision fails), drop them in from the top of screen
	if (this.pos.y > this.level.WORLD_HEIGHT) {
		this.pos.y = -100;
	}

	// Reset
	this.isJumping = false;
};

Enemy.prototype.Draw = function () {
	this.enemy.Draw();
	this.lifeBar.Draw();
};