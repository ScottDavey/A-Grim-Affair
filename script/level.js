
/***********************************
*****  LEVEL: The Level Class  *****
***********************************/

function Level () {
	this.timer = 0;
	this.state = main.GameStates.LEVEL.HUB;
	this.hub = new Hub(true);
	this.selectedLevel = undefined;
	this.scene = undefined;
	
}

Level.prototype.GetTimer = function () {
	return Math.floor(this.timer);
};

Level.prototype.Update = function () {
	var elapsed, selectedLevel;
	elapsed = GameTime.GetElapsed();

	this.timer = this.timer + elapsed;

	switch (this.state) {
		case main.GameStates.LEVEL.HUB:
			if (typeof this.hub === 'undefined') this.hub = new Hub(false);
			this.hub.Update();
			this.selectedLevel = this.hub.GetSelectedLevel();
			if (typeof this.selectedLevel !== 'undefined') {
				this.hub = undefined;
				this.state = main.GameStates.LEVEL.SCENE;
			}
			break;
		case main.GameStates.LEVEL.SCENE:
			if (typeof this.scene === 'undefined') { this.scene = new Scene(this.selectedLevel); }
			this.scene.Update();
			if (this.scene.backToHUB) {
				this.scene.UnloadContent();
				this.scene = undefined;
				this.state = main.GameStates.LEVEL.HUB;
			}
			break;
		case main.GameStates.LEVEL.BOSS:
			break;
	}

};

Level.prototype.Draw = function () {

	switch (this.state) {
		case main.GameStates.LEVEL.HUB:
			if (typeof this.hub !== 'undefined') this.hub.Draw();
			break;
		case main.GameStates.LEVEL.SCENE:
			if (typeof this.scene !== 'undefined' && this.scene !== null) this.scene.Draw();
			break;
		case main.GameStates.LEVEL.BOSS:
			break;
	}

};