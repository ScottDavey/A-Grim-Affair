/****************************
*****  RECTANGLE CLASS  *****
****************************/
function Rectangle (x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.left = this.x;
	this.top = this.y;
	this.right = this.x + this.width;
	this.bottom = this.y + this.height;
	this.center = new Vector2((this.x + (this.width/2)), (this.y + (this.height/2)));
	this.halfSize = new Vector2((this.width / 2), (this.height / 2));
}