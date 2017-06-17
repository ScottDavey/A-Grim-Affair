/*******************************************
**************  PLAYER CLASS  **************
*******************************************/
function Player (level) {
	this.level = level;
	this.pos = new Vector2(20, 300);
	this.size = new Vector2(25, 100);
	this.velocity = new Vector2(0, 0);

	this.movement = 0;
	this.friction = 0.75;
	this.moveAcceleration = 2;
	this.maxMoveSpeed = 10;
	this.gravity = 7;
	this.maxFallSpeed = 15;

	this.isOnGround = false;
	this.isJumping = false;
	this.jumpLock = false;

	// Sprite
	this.player = new Texture(this.pos, this.size, 'rgb(255, 255, 255)', 1, 'rgb(255, 255, 255)');

}

Player.prototype.SetPos = function (pos) {
	this.pos = pos;
};

Player.prototype.GetInput = function () {

	// Horizontal Movement
	if (Input.Keys.GetKey(Input.Keys.A) || Input.Keys.GetKey(Input.Keys.LEFT)) {
		this.movement = -1.0;
	} else if (Input.Keys.GetKey(Input.Keys.D) || Input.Keys.GetKey(Input.Keys.RIGHT)) {
		this.movement = 1.0;
	}

	if (Input.Keys.GetKey(Input.Keys.SPACE) && this.isOnGround && !this.jumpLock) {
		this.isOnGround = false;
		this.velocity.y -= 50000;
		this.jumpLock = true;
	} else {
		this.jumpLock = false;
	}

};

Player.prototype.HandleCollision = function () {

	this.isOnGround = false;

	// Check for world bounds
	if (this.pos.x < 0) {
		this.pos.x = 0;
	} else if ((this.pos.x + this.size.x) > main.CANVAS_WIDTH) {
		this.pos.x = main.CANVAS_WIDTH - this.size.x;
	}

	if (this.pos.y < 0) {
		this.pos.y = 0;
	} else if ((this.pos.y + this.size.y) > main.CANVAS_HEIGHT) {
		this.pos.y = main.CANVAS_HEIGHT - this.size.y;
		this.isOnGround = true;
	}

};

Player.prototype.ApplyPhysics = function () {

	this.velocity.x += this.movement * this.moveAcceleration;
	this.velocity.x *= this.friction;
	this.velocity.x = Clamp(this.velocity.x, -this.maxMoveSpeed, this.maxMoveSpeed);

	this.velocity.y = Clamp(this.velocity.y + this.gravity, -this.maxFallSpeed, this.maxFallSpeed);

	this.pos.x += Math.round(this.velocity.x);
	this.pos.y += Math.round(this.velocity.y);

	this.HandleCollision();

};

Player.prototype.Update = function () {

	this.GetInput();
	this.ApplyPhysics();

	this.movement = 0;

};

Player.prototype.Draw = function () {
	this.player.Draw();

	DrawText('On Ground: ' + this.isOnGround, 20, 660, 'normal 12pt Consolas, Trebuchet MS, Verdana', '#FFFFFF');
	DrawText('X: ' + this.pos.x, 20, 680, 'normal 12pt Consolas, Trebuchet MS, Verdana', '#FFFFFF');
	DrawText('Y: ' + this.pos.y, 100, 680, 'normal 12pt Consolas, Trebuchet MS, Verdana', '#FFFFFF');
};