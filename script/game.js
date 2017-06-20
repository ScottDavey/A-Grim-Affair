
/*********************************
*****  GAME: The Game Class  *****
*********************************/

function Game () {
	this.fps = 0;
	this.primaryState = undefined;
	this.secondaryState = [];
	this.intro = undefined;
	this.transition = undefined;

}

Game.prototype.Initialize = function () {
	this.primaryState = main.GameStates.PRIMARY.INTRO;
	this.intro = new Introduction();
};

Game.prototype.Update = function () {
	var s;

	GameTime.Update();
	this.fps = fps.getFPS();
	Input.GamePad.Update();

	/*
	**
	**  We have primary game states, and secondary game states.
	**  There can only be 1 primary state active at one time.
	**  There can be many secondary states active on top of the primary state.
	****  The secondary states will be updated / drawn in the order they're set within the array
	**
	*/

	// Update Primary State first
	switch (this.primaryState) {
		case main.GameStates.PRIMARY.INTRO:
			this.intro.Update();
			break;
		case main.GameStates.PRIMARY.MAIN_MENU:
			break;
		case main.GameStates.PRIMARY.PLAYING:
			break;
		case main.GameStates.PRIMARY.OUTRO:
			break;
	}

	// Update Secondary State second
	if (this.secondaryState.length > 0) {
		for (s = this.secondaryState.length; s >= 0; s--) {
			switch (this.secondaryState[s]) {
				case main.GameStates.SECONDARY.GAME_MENU:
					break;
				case main.GameStates.SECONDARY.TRANSITION:
					if (typeof this.transition === 'undefined') this.transition = new Transition();
					this.transition.Update();
					break;
			}
		}
	}

};

Game.prototype.Draw = function () {
	var s;
	// Clear the screen for re-drawing
	main.context.clearRect(0, 0, main.CANVAS_WIDTH, main.CANVAS_HEIGHT);

	// Update Primary State first
	switch (this.primaryState) {
		case main.GameStates.PRIMARY.INTRO:
			this.intro.Draw();
			DrawText('Primary State: INTRO', 20, 640, 'normal 14pt Consolas, Trebuchet MS, Verdana', '#FFFFFF');
			break;
		case main.GameStates.PRIMARY.MAIN_MENU:
			DrawText('Primary State: MAIN_MENU', 20, 640, 'normal 14pt Consolas, Trebuchet MS, Verdana', '#FFFFFF');
			break;
		case main.GameStates.PRIMARY.PLAYING:
			DrawText('Primary State: PLAYING', 20, 640, 'normal 14pt Consolas, Trebuchet MS, Verdana', '#FFFFFF');
			break;
		case main.GameStates.PRIMARY.OUTRO:
			DrawText('Primary State: OUTRO', 20, 640, 'normal 14pt Consolas, Trebuchet MS, Verdana', '#FFFFFF');
			break;
	}

	// Update Secondary State second
	if (this.secondaryState.length > 0) {
		for (s = this.secondaryState.length; s >= 0; s--) {
			switch (this.secondaryState[s]) {
				case main.GameStates.SECONDARY.GAME_MENU:
					DrawText('Secondary State: GAME MENU', 20, 660, 'normal 14pt Consolas, Trebuchet MS, Verdana', '#FFFFFF');
					break;
				case main.GameStates.SECONDARY.TRANSITION:
					DrawText('Secondary State: TRANSITION', 20, 680, 'normal 14pt Consolas, Trebuchet MS, Verdana', '#FFFFFF');
					this.transition.Draw();
					break;
			}
		}
	}

	// FPS
	DrawText('FPS: ' + this.fps, (main.CANVAS_WIDTH / 2 - 50), 20, 'normal 14pt Consolas, Trebuchet MS, Verdana', '#FFFFFF');

};