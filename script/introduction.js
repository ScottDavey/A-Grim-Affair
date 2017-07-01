
/**************************************************
*****  INTRODUCTION: The Game's Introduction  *****
**************************************************/

function Introduction () {
	this.fade = new Texture(new Vector2(0, 0), new Vector2(main.CANVAS_WIDTH, main.CANVAS_HEIGHT), 'rgba(0, 0, 0, 1)', 1, 'rgba(0, 0, 0, 1)');
	this.fadeOpacity = 1;
	this.BG = new Sprite('images/Intro-Background.png', new Vector2(0, 0), new Vector2(main.CANVAS_WIDTH, main.CANVAS_HEIGHT));
	this.duration = 10;
	this.state = 0;
	this.startTime = GameTime.GetCurrentGameTime();
	this.done = false;
}

Introduction.prototype.GetDone = function () {
	return this.done;
};

Introduction.prototype.Update = function () {
	var currentTime, elapsedTime, o, t;
	currentTime = GameTime.GetCurrentGameTime();
	elapsedTime = (currentTime - this.startTime);

	if (elapsedTime >= 5) {
		this.state = 1;
	} else {
		this.state = 0;
	}

	switch (this.state) {
		// Fade In
		case 0:
			this.fadeOpacity -= 0.005;
			this.fadeOpacity = (this.fadeOpacity < 0) ? 0 : this.fadeOpacity;
			break;
		// Fade Out
		case 1:
			this.fadeOpacity += 0.005;
			this.fadeOpacity = (this.fadeOpacity > 1) ? 1 : this.fadeOpacity;
			break;
	}

	// Apply opacity change
	this.fade.SetColor('rgba(0, 0, 0, ' + this.fadeOpacity + ')');

	// If we've hit our duration, scene is over OR if the user hits ESCAPE. Move on to the intro
	if (!this.done && elapsedTime >= this.duration || Input.Keys.GetKey(Input.Keys.ESCAPE) || Input.GamePad.A.pressed) {
		this.done = true;
	}
};

Introduction.prototype.Draw = function () {
	this.BG.Draw();
	this.fade.Draw();
};