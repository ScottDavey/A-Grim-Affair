/*************************
*****  SPRITE CLASS  *****
*************************/
function Sprite (path, pos, size) {
	this.pos = pos;
	this.size = size;
	this.img = document.createElement('img');
	this.img.setAttribute('src', path);
}

Sprite.prototype.SetImage = function (path) {
	this.img.setAttribute('src', path);
};

Sprite.prototype.Update = function (pos) {
	this.pos = pos;
};

Sprite.prototype.Draw = function () {
	main.context.drawImage(this.img, this.pos.x, this.pos.y);
};