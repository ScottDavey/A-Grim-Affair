/**********************
*****  UTILITIES  *****
**********************/

/****  VECTOR 2  ****/
var Vector2 = function(x, y) {
    this.x = x;
    this.y = y;
};

Vector2.prototype.Add = function (vector) {
	return new Vector2(this.x + vector, this.y + vector);
};

Vector2.prototype.Subtract = function (vector) {
	return new Vector2(this.x - vector, this.y - vector);
};

Vector2.prototype.Multiply = function (vector) {
	return new Vector2(this.x * vector, this.y * vector);
};

Vector2.prototype.Multiply = function (vector) {
	return new Vector2(this.x * vector, this.y * vector);
};

/****  RANDOM: Get a random number between a min and max value  ****/
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/****  SECONDS TO TIME: Convert Seconds to an actual time  ****/
function SecondsToTime (secs) {
	var h, m, s;
	s = Number(secs);
	h = Math.floor(s / 3600);
	m = Math.floor(s % 3600 / 60);
	s = Math.floor(s % 3600 % 60);
	return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s);
}

/****  CLAMP: Prevent a value from going above a max and below a min  ****/
function Clamp (value, min, max) {
	return (value < min) ? min : ((value > max) ? max : value);
}

/****  FPS: Calculate Frame Rate ****/
var fps = {
	startTime : 0,
	frameNumber : 0,
	getFPS : function () {
		var d, currentTime, result;
		this.frameNumber++;
		d = new Date().getTime();
		currentTime = (d - this.startTime) / 1000;
		result = (this.frameNumber / currentTime).toFixed(2);

		if (currentTime > 1) {
			this.startTime = new Date().getTime();
			this.frameNumber = 0;
		}

		return result;
	}
};

/****  GAMETIME: Get various properties relating to the game's time ****/
var GameTime = {
	startTime: new Date().getTime() / 1000,
	elapsed: 0,
	lastUpdate: 0,
	totalGameTime: 0,
	GetElapsed: function () {
		return GameTime.elapsed;
	},
	GetLastUpdate: function () {
		return GameTime.lastUpdate;
	},
	GetTotalGameTime: function () {
		return GameTime.totalGameTime;
	},
	GetCurrentGameTime: function () {
		return new Date().getTime() / 1000;
	},
	Update: function () {
		var curTime;
		curTime = GameTime.GetCurrentGameTime();
		GameTime.elapsed = curTime - GameTime.lastUpdate;
		GameTime.totalGameTime = curTime - GameTime.startTime;
		GameTime.lastUpdate = curTime;
	}
};

/****  DRAW TEXT: Easy way to draw text to the screen  ****/
var DrawText = function (string, x, y, font, color) {
	main.context.save();
	main.context.font = font;
	main.context.fillStyle = color;
	main.context.fillText(string, x, y);
	main.context.restore();
};