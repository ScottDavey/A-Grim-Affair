
/*********************************
*****  GAME: The Game Class  *****
*********************************/

function Game () {
	this.fps = 0;
	this.primaryState = undefined;
	//this.secondaryState = [];
	this.intro = undefined;
	this.mainMenu = undefined;
	this.level = undefined;
	this.gameMenu = undefined;
	this.isPaused = false;
	this.isEscapeLocked = false;
	this.escapeLockStart = 0;

}

Game.prototype.Initialize = function () {
	this.primaryState = main.GameStates.PRIMARY.INTRO;
	// this.primaryState = main.GameStates.PRIMARY.MAIN_MENU;
	this.intro = new Introduction();
};

Game.prototype.Update = function () {
	var s, currentGameTime;

	GameTime.Update();
	currentGameTime = GameTime.GetCurrentGameTime();
	this.fps = fps.getFPS();
	if (main.hasGamePad) Input.GamePad.Update();

	/*
	**
	**  We have primary game states, and secondary game states.
	**  There can only be 1 primary state active at one time.
	**  There can be many secondary states active on top of the primary state.
	****  The secondary states will be updated / drawn in the order they're set within the array
	**
	*/

	// When we switch tabs the frame rate drops enough for the collision to stop working. We'll pause the game until the framerate comes back up
	if (this.fps > 30) {

		// Update Primary State first
		switch (this.primaryState) {
			case main.GameStates.PRIMARY.INTRO:
				if (typeof this.intro === 'undefined') this.intro = new Introduction();
				this.intro.Update();
				// When the intro is finished, switch to main menu
				if (this.intro.GetDone()) {
					this.primaryState = main.GameStates.PRIMARY.MAIN_MENU;
					this.intro = undefined;
				}
				break;
			case main.GameStates.PRIMARY.MAIN_MENU:
				if (typeof this.mainMenu === 'undefined') this.mainMenu = new MainMenu();
				this.mainMenu.Update();
				if (this.mainMenu.GetPlay()) {
					this.primaryState = main.GameStates.PRIMARY.PLAYING;
					this.mainMenu = undefined;
				}
				break;
			case main.GameStates.PRIMARY.PLAYING:

				// Remove locks after 0.5 seconds
				if (this.isEscapeLocked && (currentGameTime - this.escapeLockStart) >= 0.5) this.isEscapeLocked = false;

				if (!this.isEscapeLocked && Input.Keys.GetKey(Input.Keys.ESCAPE)) {
					this.isPaused = (this.isPaused) ? false : true;
					this.isEscapeLocked = true;
					this.escapeLockStart = currentGameTime;
				}

				if (this.isPaused) {
					if (typeof this.gameMenu === 'undefined') this.gameMenu = new GameMenu();
					this.gameMenu.Update();
					if (this.gameMenu.QuitMainMenu() || this.gameMenu.QuitIntro()) {
						this.primaryState = (this.gameMenu.QuitMainMenu()) ? main.GameStates.PRIMARY.MAIN_MENU : main.GameStates.PRIMARY.INTRO;
						this.isPaused = false;
						this.gameMenu = undefined;
						this.level = undefined;
					}
				} else {
					if (typeof this.level === 'undefined') this.level = new Level();
					this.level.Update();
				}
				break;
			case main.GameStates.PRIMARY.OUTRO:
				break;
		}

		/****	REMOVING for the sake of keeping things simple
		// Update Secondary State second
		if (this.secondaryState.length > 0) {
			for (s = this.secondaryState.length; s >= 0; s--) {
				switch (this.secondaryState[s]) {
					case main.GameStates.SECONDARY.GAME_MENU:
						break;
					case main.GameStates.SECONDARY.TRANSITION:
						this.transition.Update();
						break;
				}
			}
		}
		*****/

	}

};

Game.prototype.Draw = function () {
	var s;
	// Clear the screen for re-drawing
	main.context.clearRect(0, 0, main.CANVAS_WIDTH, main.CANVAS_HEIGHT);

	// Update Primary State first
	switch (this.primaryState) {
		case main.GameStates.PRIMARY.INTRO:
			if (typeof this.intro !== 'undefined') this.intro.Draw();
			DrawText('Primary State: INTRO', 20, 640, 'normal 14pt Consolas, Trebuchet MS, Verdana', '#FFFFFF');
			break;
		case main.GameStates.PRIMARY.MAIN_MENU:
			if (typeof this.mainMenu !== 'undefined') this.mainMenu.Draw();
			DrawText('Primary State: MAIN_MENU', 20, 640, 'normal 14pt Consolas, Trebuchet MS, Verdana', '#FFFFFF');
			break;
		case main.GameStates.PRIMARY.PLAYING:
			if (typeof this.level !== 'undefined') this.level.Draw();
			
			if (this.isPaused) {
				if (typeof this.gameMenu !== 'undefined') this.gameMenu.Draw();
			}

			DrawText('Primary State: PLAYING', 20, 640, 'normal 14pt Consolas, Trebuchet MS, Verdana', '#FFFFFF');
			break;
		case main.GameStates.PRIMARY.OUTRO:
			DrawText('Primary State: OUTRO', 20, 640, 'normal 14pt Consolas, Trebuchet MS, Verdana', '#FFFFFF');
			break;
	}

	DrawText('Paused: ' + this.isPaused, (main.CANVAS_WIDTH - 200), (main.CANVAS_HEIGHT - 20), 'normal 14pt Consolas, Trebuchet MS, Verdana', '#FFFFFF');

	/****	REMOVING for the sake of keeping things simple
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
	****/

	// FPS
	DrawText('FPS: ' + this.fps, (main.CANVAS_WIDTH / 2 - 50), 20, 'normal 14pt Consolas, Trebuchet MS, Verdana', '#FFFFFF');

};