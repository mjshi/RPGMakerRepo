//==============================================================================
// ChainCommand.js
//==============================================================================
 
var Imported = Imported || {};
Imported.ChainCommand = true;

/*:
* @plugindesc Everyone loves quicktime events.
* @author mjshi
*
* @param ---Configuration---
*
* @param Valid Keys
* @desc Separate with spaces. (see help for more info)
* @default up down left right ok cancel
*
* @param Default Switch ID
* @desc The switch to turn ON if the player succeeds at the minigame, and OFF if the player fails.
* @default 1
*
* @param Default Time Given
* @desc Default total time to give the player, in frames.
* 60 frames = 1 second.
* @default 360
*
* @param Time Per Key
* @desc Used in automatic time calculations. (see help for more info)
* 60 frames = 1 second.
* @default 30
*
* @param Exit Pause Time
* @desc How long to show the success/failure image for. Set to 0 to not show anything. 60 frames = 1 second.
* @default 45
*
* @param ---Sound Effects----
*
* @param Keypress SFX
* @desc The sound to play when a correct button is pressed.
* @default Cursor2
*
* @param Success SFX
* @desc The sound to play when the sequence is complete.
* @default Heal3
*
* @param Error SFX
* @desc The sound to play when an incorrect button is pressed.
* @default Blind
*
* @param ---Timer Bar----
*
* @param Bar BG X Position
* @desc X position of the bar background. (bar_empty.png)
* @default 285
*
* @param Bar BG Y Position
* @desc Y position of the bar background. (bar_empty.png)
* @default 245
*
* @param Meter X Shift
* @desc X position of the meter relative to Bar BG's X position. (bar_full.png)
* @default 5
*
* @param Meter Y Shift
* @desc Y position of the meter relative to Bar BG's Y position. (bar_full.png)
* @default 5
*
* @param Meter Width
* @desc Width of the meter image. (bar_full.png)
* @default 236
*
* @param Meter Height
* @desc Height of the meter image. (bar_full.png)
* @default 7
*
* @param ---Buttons----
*
* @param Button X Shift
* @desc X position of the button relative to the center.
* @default 0
*
* @param Button Y Shift
* @desc Y position of the button relative to the center.
* @default 0
*
* @param Button Width
* @desc Width of the button images.
* @default 31
*
* @param Button Height
* @desc Height of the button images.
* @default 31
*
* @param Button Spacing
* @desc Spacing between buttons in a sequence.
* @default 15
*
* @param ---Cursor----
*
* @param Cursor X Shift
* @desc X position of the cursor relative to the center button's X position.
* @default 5
*
* @param Cursor Y Shift
* @desc Y position of the cursor relative to the center button's Y position.
* @default 40
*
* @param ---SFX Customization---
* @desc **Thanks to JamesRyan on rpgmakerweb for adding these!
* @default **
*
* @param Keypress Volume
* @desc Volume of Keypress SFX.
* @default 100
*
* @param Keypress Pitch
* @desc Pitch of Keypress SFX.
* @default 100
*
* @param Keypress Pan
* @desc Pan of Keypress SFX.
* @default 0
*
* @param Success Volume
* @desc Volume of Success SFX.
* @default 100
*
* @param Success Pitch
* @desc Pitch of Success SFX.
* @default 100
*
* @param Success Pan
* @desc Pan of Success SFX.
* @default 0
*
* @param Error Volume
* @desc Volume of Error SFX.
* @default 100
*
* @param Error Pitch
* @desc Pitch of Error SFX.
* @default 100
*
* @param Error Pan
* @desc Pan of Error SFX.
* @default 0
*
* @param
* @help 
* ------------------------------------------------------------------------------
*   Chain Commands v1.1b by mjshi
*   Free for both commercial and non-commercial use, with credit.
* ------------------------------------------------------------------------------
*   Installation: Extract the included folder to the img/ directory.
*
*   There are some additional files in the img/chaincmd/templates folder that
*   you can either delete or use for whatever you want.
* ------------------------------------------------------------------------------
*                           Running the Minigame
* ------------------------------------------------------------------------------
*   The minigame runs via plugin command.
*     ChainCommand sequence
*     ChainCommand time sequence
*     ChainCommand time switch sequence
*
*   For example:
*     ChainCommand x,z,left,right,x,x,z
*     ChainCommand auto x,z,left,right,x,x,z
*     ChainCommand 240 1 x,z,left,right,x,x,z
* ------------------------------------------------------------------------------
*   'sequence' is composed of:
*     up down left right ok cancel
*   Since 'ok' and 'cancel' are kind of strange to type so they can also be 
*   replaced with z and x, respectively.
*
*   Separate each key in the sequence with a comma (no space). For example:
*     ChainCommand z,x,up,left,right,x
*   Because of the way MV maps keys Z can also be triggered with the spacebar
*   or enter key, and X can also be triggered by ESC or numpad 0 or backspace.
*
*   You can also put random:X here to generate a random sequence composed of X
*   keys. 
* ------------------------------------------------------------------------------
*   'time' is the amount of time in frames. 60 frames = 1 second. You can also
*   put auto here if you want the time to be calculated with the Time Per Key
*   parameter. Omit it if you want to use the default time.
* ------------------------------------------------------------------------------
*   'switch' is the switch to turn ON or OFF based on whether or not the
*   player successfully punched in the sequence. Omit it if you want to use the
*   default switch.
*
* ------------------------------------------------------------------------------
*                         Extra PluginCommand Functions
* ------------------------------------------------------------------------------
*   "Remembering" sequences:
*     ChainCommand remember trigger time switch sequence
*   "Recalling" sequences:
*     ChainCommand recall trigger
*
*   'trigger' is the keyword used for recalling sequences. The other three
*   parameters are set as per normal.
*
*   For example:
*     ChainCommand remember treasure 240 1 x,z,left,right,x,x,z
*   would remember the specific chain command that lasts for 240 frames, turns
*   on switch 1, and has the sequence x,z,left,right,x,x,z
*
*   Then, calling
*     ChainCommand recall treasure
*   would launch Chain Commands with the trigger's saved parameters.
*
* ------------------------------------------------------------------------------
*                           Changing The Background
* ------------------------------------------------------------------------------
*   In a script command, set ChainCommand.bgImage to your desired background
*   image name:
*     ChainCommand.bgImage = "bg";
* 
* ------------------------------------------------------------------------------
*                                Adding Keys
* ------------------------------------------------------------------------------
*   You can add additional valid keys through the use of other keymapping
*   plugins. Preferably, ones that modify the original keymapper rather than
*   replacing it with a new system or new functions.
*
*   A good one is ZE's Key Mapper:
*     http://mvplugins.com/plugin/Zalerinian/ZE%20-%20Key%20Mapper
*
* ------------------------------------------------------------------------------
*
* > Is something broken? Go to http://mjshi.weebly.com/contact.html and I'll
*   try my best to help you!
*/

function Scene_ChainCommand() {
	this.initialize.apply(this, arguments);
}

var ChainCommand = ChainCommand || {};
ChainCommand.memory = [];
ChainCommand.bgImage = "bg";

(function () {

var params = PluginManager.parameters("ChainCommand");

var defaultSwitch = getN("Default Switch ID") || 1;
var defaultTime = getN("Default Time Given") || 360;
var timePerKey = getN("Time Per Key") || 35;
var pauseTime = getN("Exit Pause Time");

function getN(str) {
	return parseInt(params[str]);
}

var backBar = {
	x: getN("Bar BG X Position"),
	y: getN("Bar BG Y Position")
}

var frontBar = {
	shiftX: getN("Meter X Shift"),
	shiftY: getN("Meter Y Shift"),
	width: getN("Meter Width"),
	height: getN("Meter Height")
}

var button = {
	shiftX: getN("Button X Shift"),
	shiftY: getN("Button Y Shift"),
	width: getN("Button Width"),
	height: getN("Button Height"),
	spacing: getN("Button Spacing"),
}

var cursor = {
	shiftX: getN("Cursor X Shift"),
	shiftY: getN("Cursor Y Shift"),
}

var soundFX = {
    keypress: {name: params["Keypress SFX"], pan: params["Keypress Pan"], pitch: params["Keypress Pitch"], volume: params["Keypress Volume"]},
    victory: {name: params["Success SFX"], pan: params["Success Pan"], pitch: params["Success Pitch"], volume: params["Success Volume"]},
    defeat: {name: params["Error SFX"], pan: params["Error Pan"], pitch: params["Error Pitch"], volume: params["Error Volume"]}
}

var validKeys = params["Valid Keys"].split(" ");

//-----------------------------------------------------------------------------
// Scene_ChainCommand
//
Scene_ChainCommand.prototype = Object.create(Scene_Base.prototype);
Scene_ChainCommand.prototype.constructor = Scene_ChainCommand;

Scene_ChainCommand.prototype.create = function() {
	Scene_Base.prototype.create.call(this);
	this.createBackground();
	this.createTimerBar();
	this.createSequence();
};

Scene_ChainCommand.prototype.createBackground = function() {
	this.addChild(new Sprite(SceneManager.backgroundBitmap()));
	this.addChild(new Sprite(ImageManager.loadBitmap("img/chaincmd/", ChainCommand.bgImage)));
};

Scene_ChainCommand.prototype.createTimerBar = function() {
	var back = new Sprite(ImageManager.loadBitmap("img/chaincmd/", "bar_empty"));
	back.x = backBar.x;
	back.y = backBar.y;

	this.bar = new Sprite(ImageManager.loadBitmap("img/chaincmd/", "bar_full"));
	this.bar.setFrame(0, 0, frontBar.width, frontBar.height);

	this.bar.x = back.x + frontBar.shiftX;
	this.bar.y = back.y + frontBar.shiftY;

	this.addChild(back);
	this.addChild(this.bar);
};

function parseSequence(string) {
	var a = [];
	var str = string.toLowerCase();

	if (str.startsWith("random:")) {
		var x = parseInt((str.split(":"))[1]);
		while (a.length < x) a.push(validKeys[Math.floor(Math.random() * validKeys.length)]);

	} else {
		a = str.split(",");
		for (var i = 0; i < a.length; i++) {
			if(a[i] === "z") a[i] = "ok";
			if(a[i] === "x") a[i] = "cancel";
		}
	}

	return a;
}

Scene_ChainCommand.prototype.createSequence = function() {
	this.sequence = parseSequence(ChainCommand.sequence);
	this.buttons = [];

	if (isNaN(ChainCommand.time)) ChainCommand.time = this.sequence.length * timePerKey;

	var x = (Graphics.boxWidth - button.width) / 2 + button.shiftX;
	var y = (Graphics.boxHeight - button.height) / 2 + button.shiftY;

	//create button sequence
	for (var i = 0; i < this.sequence.length; i++) {
		this.buttons[i] = new Sprite(ImageManager.loadBitmap("img/chaincmd/", this.sequence[i]));
		this.buttons[i].x = x;
		this.buttons[i].y = y;
		this.addChild(this.buttons[i]);

		x += button.width + button.spacing;
	}

	this.index = 0;
	this.failed = false;

	//create pointer
	this._cursor = new Sprite(ImageManager.loadBitmap("img/chaincmd/", "cursor"));
	this._cursor.x = this.buttons[0].x + cursor.shiftX;
	this._cursor.y = this.buttons[0].y + cursor.shiftY;
	this.addChild(this._cursor);
};

Scene_ChainCommand.prototype.updateBar = function(fraction) {
	this.bar.setFrame(0, 0, frontBar.width * fraction, frontBar.height);
};

Scene_ChainCommand.prototype.updateButtons = function() {
	this.index++;
	if (this.index > this.sequence.length - 1) return;

	AudioManager.playSe(soundFX.keypress);
	for (var i = 0; i < this.buttons.length; i++) {
		this.buttons[i].x -= button.width + button.spacing;
		if (i < this.index) this.buttons[i].opacity = 255 - (this.index - i) * 40;
	}
};

Scene_ChainCommand.prototype.update = function() {
	Scene_Base.prototype.update.call(this);

	//update exit animation
	if (this.ended) {
		if (this.ended === true) this.ended = Graphics.frameCount;
		if (Graphics.frameCount - this.ended > pauseTime) this.popScene();
		return;
	}

	if (!this._startTime) this._startTime = Graphics.frameCount;

	//update scene exit
	var elapsed = Graphics.frameCount - this._startTime;
	if (elapsed > ChainCommand.time) {
		this.hasFailed();
		return;
	}

	this.updateBar(1 - elapsed / ChainCommand.time);
	this.processInput();
	if (this.index == this.sequence.length) this.hasSucceeded();
};

Scene_ChainCommand.prototype.processInput = function() {
	for (var i = 0; i < validKeys.length; i++) {
		if (Input.isTriggered(validKeys[i])) {
			if (this.sequence[this.index] === validKeys[i]) this.updateButtons();
			else this.hasFailed();
			return;
		}
	}
};

Scene_ChainCommand.prototype.hasFailed = function() {
	$gameSwitches.setValue(ChainCommand.switch, false);
	AudioManager.playSe(soundFX.defeat);

	if (pauseTime == 0) {
		this.popScene();
		return;
	}

	this.addChild(new Sprite(ImageManager.loadBitmap("img/chaincmd/", "failure")));
	this.ended = true;
}

Scene_ChainCommand.prototype.hasSucceeded = function() {
	$gameSwitches.setValue(ChainCommand.switch, true);
	AudioManager.playSe(soundFX.victory);

	if (pauseTime == 0) {
		this.popScene();
		return;
	}

	this.addChild(new Sprite(ImageManager.loadBitmap("img/chaincmd/", "success")));
	this.ended = true;
}

//-----------------------------------------------------------------------------
// ChainCommand Memory Functions
//
ChainCommand.remember = function(trigger, time, switch1, sequence) {
	if (this.getFromMemory(trigger) < 0) {
		this.memory.push([trigger, time, switch1, sequence]);
	} else {
		console.log("ChainCommand could not register '" + trigger + "' because it is already registered to a sequence!");
	}
}

ChainCommand.recall = function(trigger) {
	var index = ChainCommand.getFromMemory(trigger);
	if (index < 0) return false;

	var memory = this.memory[index];
	this.time = memory[1];
	this.switch = memory[2];
	this.sequence = memory[3];
	return true;
}

ChainCommand.getFromMemory = function(trigger) {
	var index = -1;
	for (var i = 0; i < this.memory.length; i++) {
		if (this.memory[i][0] === trigger) {
			index = i;
			break;
		}
	}
	return index;
}

//-----------------------------------------------------------------------------
// pluginCommand
//
var CCmd_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function (command, args) {
	CCmd_Game_Interpreter_pluginCommand.call(this, command, args);
	if (command === "ChainCommand" ) {
		//remember sequences
		if (args[0] === "remember" && args.length === 5) {
			ChainCommand.remember(args[1], args[2], args[3], args[4]);
			return;
		}

		//recall sequences
		if (args[0] === "recall" && args.length === 2) {
			if (!ChainCommand.recall(args[1].trim())) return;

		//parse sequences
		} else {
			ChainCommand.switch 	= defaultSwitch;
			ChainCommand.time		= defaultTime;
			ChainCommand.sequence	= args[args.length - 1];

			if (args.length > 1) ChainCommand.time = parseInt(args[0]);
			if (args.length > 2) ChainCommand.switch = parseInt(args[1]);
		}

		SceneManager.push(Scene_ChainCommand);
	}
}

//-----------------------------------------------------------------------------
// Save Data
//
var alias_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
	contents = alias_makeSaveContents.call(this);
	contents.chainCommandMemory = ChainCommand.memory;
	return contents;
};

var alias_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
	alias_extractSaveContents.call(this, contents);
	ChainCommand.memory = contents.chainCommandMemory;
};

})();