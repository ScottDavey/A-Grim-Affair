/*******************************************
**************  PLAYER CLASS  **************
*******************************************/
function Player (level) {
	this.level = level;
	this.pos = new Vector2(20, 100);
	this.size = new Vector2(25, 50);
	this.velocity = new Vector2(0, 0);

	this.movement = 0;
	this.friction = 0.75;
	this.moveAcceleration = 3000.0;
	this.maxMoveSpeed = 300.0;
	this.gravity = 3000.0;
	this.maxFallSpeed = 1000.0;

	this.jumpBurst = -1200.0;
	this.isOnGround = false;
	this.isJumping = false;
	this.wasJumping = false;
	this.maxJumpTime = 0.10;
	this.jumpTime = 0;

	// Sprite
	this.player = new Texture(this.pos, this.size, 'rgb(255, 255, 255)', 1, 'rgb(255, 255, 255)');

}

Player.prototype.SetPos = function (pos) {
	this.pos = pos;
};

Player.prototype.GetInput = function () {

	// Horizontal Movement
	if (Input.Keys.GetKey(Input.Keys.A) || Input.Keys.GetKey(Input.Keys.LEFT) || Input.GamePad.LEFT.pressed) {
		this.movement = -1.0;
	} else if (Input.Keys.GetKey(Input.Keys.D) || Input.Keys.GetKey(Input.Keys.RIGHT) || Input.GamePad.RIGHT.pressed) {
		this.movement = 1.0;
	}

	this.isJumping = (Input.Keys.GetKey(Input.Keys.SPACE) || Input.GamePad.A.pressed);

};

Player.prototype.HandleCollision = function () {
	var bounds, i, line, b, slope, y, xDiff, shouldPlayWalkSound;

	bounds = new Rectangle(this.pos.x, this.pos.y, this.size.x, this.size.y);
	this.isOnGround = false;

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

			}

		}

	}


};

Player.prototype.Jump = function (velY) {
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

Player.prototype.ApplyPhysics = function () {
	var elapsed;
	elapsed = GameTime.GetElapsed();

	// Horizontal Movement
	this.velocity.x += this.movement * this.moveAcceleration * elapsed;
	this.velocity.x *= this.friction;
	this.velocity.x = Clamp(this.velocity.x, -this.MaxMoveSpeed, this.MaxMoveSpeed);
	this.pos.x += this.velocity.x * elapsed;
	this.pos.x = Math.round(this.pos.x);

	// Vertical Movement
	this.velocity.y = Clamp(this.velocity.y + this.gravity * elapsed, -this.maxFallSpeed, this.maxFallSpeed);
	this.velocity.y = this.Jump(this.velocity.y);
	this.pos.y += this.velocity.y * elapsed;
	this.pos.y = Math.round(this.pos.y);

	this.HandleCollision();

};

Player.prototype.Update = function () {

	this.GetInput();
	this.ApplyPhysics();

	this.movement = 0;
	this.isJumping = false;

};

Player.prototype.Draw = function () {
	this.player.Draw();

	DrawText('On Ground: ' + this.isOnGround, 20, 660, 'normal 12pt Consolas, Trebuchet MS, Verdana', '#FFFFFF');
	DrawText('X: ' + this.pos.x, 20, 680, 'normal 12pt Consolas, Trebuchet MS, Verdana', '#FFFFFF');
	DrawText('Y: ' + this.pos.y, 100, 680, 'normal 12pt Consolas, Trebuchet MS, Verdana', '#FFFFFF');
};