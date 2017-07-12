/*************************************************************************************
*****  PARALLAX: Allows multiple background layers to scroll at different rates  *****
*************************************************************************************/

function Parallax (bgImgs) {
	this.bgImgs = bgImgs;
	this.backgrounds = [];

	this.LoadBGs();
}

Parallax.prototype.LoadBGs = function () {
	var b, bg;

	for (b = 0; b < this.bgImgs.length; b++) {
		// this.bgImgs: Array of arrays, [[path, position, scroll rate]]
		bg = this.bgImgs[b];
		this.backgrounds.push([new Sprite(bg[0], bg[1]), bg [2]]);
	}

};

Parallax.prototype.Update = function (cameraPos) {
	var b, bg;
	for (b = 0; b < this.backgrounds.length; b++) {
		bg = this.backgrounds[b];
		bg[0].Update(new Vector2(cameraPos.x * bg[1].x, cameraPos.y * bg[1].y));
	}
};

Parallax.prototype.Draw = function () {
	var b;
	for (b = 0; b < this.backgrounds.length; b++) {
		this.backgrounds[b][0].Draw();
	}
};