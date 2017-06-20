/*******************************************
**************  INPUT OBJECT  **************
*******************************************/
var Input = {
	Keys: {
		_isPressed: {},
		W: 87,
		A: 65,
		S: 83,
		D: 68,
		SPACE: 32,
		R: 82,
		LEFT: 37,
		UP: 38,
		RIGHT: 39,
		DOWN: 40,
		SHIFT: 16,
		ESCAPE: 27,
		GetKey: function (keyCode) {
			return Input.Keys._isPressed[keyCode];
		},
		onKeyDown: function (e) {
			Input.Keys._isPressed[e.keyCode] = true;
		},
		onKeyUp: function (e) {
			delete Input.Keys._isPressed[e.keyCode];
		}
	},
	Mouse: {
		_isPressed: {},
		pos: new Vector2(0, 0),
		LEFT: 0,
		MIDDLE: 1,
		RIGHT: 2,
		GetButton: function (button) {
			return Input.Mouse._isPressed[button];
		},
		GetPosition: function () {
			return Input.Mouse.pos;
		},
		OnMouseDown: function (e) {
			Input.Mouse.pos.x = e.offsetX;
			Input.Mouse.pos.y = e.offsetY;
			Input.Mouse._isPressed[e.button] = true;
		},
		OnMouseUp: function (e) {
			delete Input.Mouse._isPressed[e.button];
		},
		OnMouseMove: {
			pos: new Vector2(0, 0),
			GetPosition: function () { return Input.Mouse.OnMouseMove.pos; },
			SetPosition: function (e) {
				Input.Mouse.OnMouseMove.pos.x = e.offsetX;
				Input.Mouse.OnMouseMove.pos.y = e.offsetY;
			}
		}
	}/*,
	GamePad: {
		init: function () {
			main.GamePad = navigator.getGamepads()[0];
			main.hasGamePad = true;
		},
		deinit: function () {
			main.GamePad = {};
			main.hasGamePad = false;
		},
		Update: function () {
			main.GamePad = navigator.getGamepads()[0];
			// Refresh GamePad Buttons
			if (typeof main.GamePad !== 'undefined') {
				Input.GamePad.A = main.GamePad.buttons[0];
				Input.GamePad.B = main.GamePad.buttons[1];
				Input.GamePad.X = main.GamePad.buttons[2];
				Input.GamePad.Y = main.GamePad.buttons[3];
				Input.GamePad.UP = main.GamePad.buttons[12];
				Input.GamePad.DOWN = main.GamePad.buttons[13];
				Input.GamePad.LEFT = main.GamePad.buttons[14];
				Input.GamePad.RIGHT = main.GamePad.buttons[15];
			}
		},
		A: {},
		B: {},
		X: {},
		Y: {},
		UP: {},
		DOWN: {},
		LEFT: {},
		RIGHT: {}
	}*/
};