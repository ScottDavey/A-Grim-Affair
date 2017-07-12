/**************************
*****  TEXTURE CLASS  *****
**************************/
function Texture (pos, size, fillColor, lineWidth, lineColor)  {
	this.pos = pos;
	this.size = size;
	this.fillColor = fillColor;
	this.lineColor = lineColor;
	this.lineWidth = lineWidth;
	this.rect = new Rectangle(this.pos.x, this.pos.y, this.size.x, this.size.y);
}

Texture.prototype.SetSize = function (size) {
	this.size = size;
};

Texture.prototype.SetColor = function (rgba) {
	this.fillColor = rgba;
};

Texture.prototype.SetBorder = function (rgba, size) {
	this.lineColor = rgba;
	this.lineWidth = (typeof size === 'undefined') ? this.lineWidth : size;
};

Texture.prototype.Update = function (pos) {
	this.pos = pos;
};

Texture.prototype.Draw = function () {
	main.context.save();
	main.context.beginPath();
	main.context.rect(this.pos.x, this.pos.y, this.size.x, this.size.y);
	main.context.fillStyle = this.fillColor;
	main.context.fill();
	main.context.lineWidth = this.lineWidth;
	main.context.strokeStyle = this.lineColor;
	main.context.stroke();
	main.context.closePath();
	main.context.restore();
};