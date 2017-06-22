
/*********************************
*****  GAME: The Game Class  *****
*********************************/

function MainMenu () {
	this.BG = new Texture(new Vector2(0, 0), new Vector2(main.CANVAS_WIDTH, main.CANVAS_HEIGHT), '#111111', 1, '#111111');
	this.playPos = new Vector2(250, (main.CANVAS_HEIGHT / 2) - 20);
	this.playColor = '#FFFFFF';
	this.playBox = new Rectangle(this.playPos.x, this.playPos.y-37, 120, 40);
	this.isLeftClickLocked = false;
	this.isFadingOut = false;
	this.fadeOutAlpha = 0;
	this.fadeOutIntStart = 0;
	this.fadeOutInterval = 0.1;
	this.fadeOutTexture = new Texture(new Vector2(0, 0), new Vector2(main.CANVAS_WIDTH, main.CANVAS_HEIGHT), 'rgba(0, 0, 0, ' + this.fadeOutAlpha + ')', 1, 'black');
	this.play = false;
}

MainMenu.prototype.GetPlay = function () {
	return this.play;
};

MainMenu.prototype.Update = function () {
	var mouseMovePos, mouseMoveX, mouseMoveY;
	mouseMovePos = Input.Mouse.OnMouseMove.GetPosition();
	mouseMoveX = mouseMovePos.x;
	mouseMoveY = mouseMovePos.y;

	// Check to see if mouse is hovering the play button
	if (mouseMoveX >= this.playBox.x && mouseMoveX <= (this.playBox.x + this.playBox.width) && mouseMoveY >= this.playBox.y && mouseMoveY <= (this.playBox.y + this.playBox.height)) {
		// Now check to see if the user has clicked
		// If so, change the play color and set our fade out variables to begin
		// If not, only change the play color
		if (!this.isLeftClickLocked && Input.Mouse.GetButton(Input.Mouse.LEFT)) {
			this.isLeftClickLocked = true;
			this.playColor = '#F66F78';
			this.isFadingOut = true;
			this.fadeOutIntStart = GameTime.GetCurrentGameTime();
		} else {
			this.playColor = '#990000';
			this.isLeftClickLocked = false;
		}
	} else {
		// We're not hovering so revert play back to white
		this.playColor = '#FFFFFF';
	}

	// We've clicked PLAY. Now fade out before switching Game States
	if (this.isFadingOut) {

		if (this.fadeOutAlpha < 1) {
			if ((GameTime.GetCurrentGameTime() - this.fadeOutIntStart).toFixed(1) == this.fadeOutInterval) {
				this.fadeOutAlpha += 0.05;
				this.fadeOutTexture.SetColor('rgba(0, 0, 0, ' + this.fadeOutAlpha + ')');
				this.fadeOutIntStart = GameTime.GetCurrentGameTime();
			}
		} else {
			this.play = true;
		}

	}

};

MainMenu.prototype.Draw = function () {
	this.BG.Draw();
	DrawText('PLAY', this.playPos.x, this.playPos.y, 'bold 36pt Raleway, "Century Gothic", Verdana, Arial', this.playColor);
	if (this.isFadingOut) this.fadeOutTexture.Draw();
};