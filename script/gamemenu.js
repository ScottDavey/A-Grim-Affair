
/***********************************************
*****  GAME MENU: Displays a menu in-game  *****
***********************************************/

function GameMenu () {
	this.menuPos = new Vector2((main.CANVAS_WIDTH / 2) - 200, (main.CANVAS_HEIGHT / 2) - 100);
	this.bg = new Texture(this.menuPos, new Vector2(400, 200), 'rgba(0, 0, 0, 1)', 5, '#FFFFFF');
	this.mainMenuColor = '#FFFFFF';
	this.quitcolor = '#FFFFFF';
	this.buttons = [
		['main_menu', new Vector2(this.menuPos.x + 30, this.menuPos.y + 130 - 27), new Vector2(150, 25)],
		['quit', new Vector2(this.menuPos.x + 30, this.menuPos.y + 160 - 27), new Vector2(50, 25)]
	];
	this.isLeftClickLocked = false;
	this.quitMainMenu = false;
	this.quitIntro = false;
}

GameMenu.prototype.QuitMainMenu = function () {
	return this.quitMainMenu;
};

GameMenu.prototype.QuitIntro = function () {
	return this.quitIntro;
};

GameMenu.prototype.Update = function () {
	var mouseMovePos, mouseMoveX, mouseMoveY, b, button;
	mouseMovePos = Input.Mouse.OnMouseMove.GetPosition();
	mouseMoveX = mouseMovePos.x;
	mouseMoveY = mouseMovePos.y;

	this.isLeftClickLocked = false;

	for (b = 0; b < this.buttons.length; b++) {
		
		button = this.buttons[b];

		if (mouseMoveX > button[1].x && mouseMoveX < button[1].x + button[2].x && mouseMoveY > button[1].y && mouseMoveY < button[1].y + button[2].y) {
			
			if (Input.Mouse.GetButton(Input.Mouse.LEFT)) {
				this.isLeftClickLocked = true;
			}

			if (button[0] === 'main_menu') {
				this.mainMenuColor = '#0088FF';
				if (this.isLeftClickLocked) this.quitMainMenu = true;
			} else if (button[0] === 'quit') {
				this.quitColor = '#0088FF';
				if (this.isLeftClickLocked) this.quitIntro = true;
			}

			break;
		} else {
			this.quitColor = '#FFFFFF';
			this.mainMenuColor = '#FFFFFF';
		}

	}
};

GameMenu.prototype.Draw = function () {

	this.bg.Draw();
	DrawText('GAME MENU', this.menuPos.x + 30, this.menuPos.y + 40, 'bold 18pt "Century Gothic", Verdana, Arial', '#990000');
	DrawText('Main Menu', this.menuPos.x + 30, this.menuPos.y + 130, 'normal 16pt "Century Gothic", Verdana, Arial', this.mainMenuColor);
	DrawText('Quit', this.menuPos.x + 30, this.menuPos.y + 160, 'normal 16pt "Century Gothic", Verdana, Arial', this.quitColor);

};