/*******************************************
**************  PLAYER CLASS  **************
*******************************************/

function SoulFire (dir, pos) {
	this.dir = dir;
	this.pos = pos;
	this.size = new Vector2(15, 15);
	this.velocity = new Vector2(0, 0);
	this.acceleration = 20000.0;
	this.speed = 1500.0;
	this.sf = new Texture(this.pos, this.size, '#00FF00', 1, '#00FF00');
}

SoulFire.prototype.GetPos = function () {
	return this.pos;
};

SoulFire.prototype.GetSize = function () {
	return this.size;
};

SoulFire.prototype.Update = function () {
	var elapsed;
	elapsed = GameTime.GetElapsed();

	this.velocity.x += this.dir * this.acceleration * elapsed;
	this.velocity.x = Clamp(this.velocity.x, -this.speed, this.speed);
	this.pos.x += Math.round(this.velocity.x * elapsed);

};

SoulFire.prototype.Draw = function () {
	this.sf.Draw();
};