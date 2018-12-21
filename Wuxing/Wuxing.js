//==============================================================================
// Wuxing.js
//==============================================================================
 
var Imported = Imported || {};
Imported.Wuxing = true;

/*:
* @plugindesc Elemental rock-paper-scissors.
* @author mjshi
*
* @param ---Configuration---
*
* @param Default Element Number
* @default 5
*
* @param Default Round Number
* @default 7
*
* @param Custom BG
* @desc (y/n) BG must be named bg.png and located in img/wuxing/
* @default n
*
* @param Cut Through History
* @desc (y/n) Should the results dialog cut through the history window?
* @default n
*
* @param Show CPU Elements
* @desc (y/n) For viewing which icons are charged or not on the computer's side.
* @default n
*
* @param ---Round Results---
*
* @param Player Chosen Element
* @desc Text to show when the player chooses an element. CHOSENELEMNT will be replaced by the chosen element.
* @default You chose CHOSENELEMNT.
*
* @param Computer Chosen Element
* @desc Text to show when the computer chooses an element. CHOSENELEMNT will be replaced by the chosen element.
* @default Computer chose CHOSENELEMNT.
*
* @param Round Win Message
* @desc Text to show when you win a round. WONPOINTS will be replaced by the points won.
* @default You win! +WONPOINTS
*
* @param Round Loss Message
* @desc Text to show when you lose a round. WONPOINTS will be replaced by the points won.
* @default Computer wins, +WONPOINTS
*
* @param Round Tie Message
* @desc Text to show when you tie a round.
* @default It was a tie.
*
* @param ---End Result Window---
*
* @param Victory Text Line 1
* @default Congratulations, you won!
*
* @param Victory Text Line 2
* @default It's your lucky day.
*
* @param Loss Text Line 1
* @default You lost...
*
* @param Loss Text Line 2
* @default Better luck next time!
*
* @param Tie Text Line 1
* @default You tied.
*
* @param Tie Text Line 2
* @default Well, at least you didn't lose.
*
* @param ---Replay Window---
*
* @param Play Again Text
* @default Again!
*
* @param Quit Game Text
* @default I quit...
*
* @param ---Element Win SFX---
*
* @param Nobody Won SFX
* @desc The SFX to play when it is a tie.
* @default Cancel2
*
* @param Wood Win SFX
* @desc The SFX to play when Wood wins.
* normal, charged
* @default Door1, Attack3
*
* @param Fire Win SFX
* @desc The SFX to play when Fire wins.
* normal, charged
* @default Fire2, Fire1
*
* @param Earth Win SFX
* @desc The SFX to play when Earth wins.
* normal, charged
* @default Earth3, Earth1
*
* @param Metal Win SFX
* @desc The SFX to play when Metal wins.
* normal, charged
* @default Sword1, Sword4
*
* @param Water Win SFX
* @desc The SFX to play when Water wins.
* normal, charged
* @default Water2, Water1
*
* @param ---Cursor---
*
* @param Cursor X Offset
* @desc Relative to elements
* @default 0
*
* @param Cursor Y Offset
* @desc Relative to elements
* @default -20
*
* @param Cursor Confirm SFX
* @default Decision1
*
* @param Cursor Cancel SFX
* @default Buzzer1
*
* @param Cursor Move SFX
* @default Cursor2
*
* @param ---Elemental Circle---
*
* @param Elemental Circle X
* @default 62
*
* @param Elemental Circle Y
* @default 420
*
* @param ---Big Element---
*
* @param Big Element X
* @default 0
*
* @param Big Element Y
* @default 190
*
* @param Big Element Width
* @default 200
*
* @param Big Element Padding
* @default 45
*
* @param ---Element Icons---
*
* @param Element Icons X
* @default 535
*
* @param Element Icons Y
* @default 420
*
* @param Element Icon Width
* @desc Width of the images used for the element icons
* @default 54
*
* @param Element Icon Height
* @desc Height of the images used for the element icons
* @default 54
*
* @param Element Icon Padding
* @desc Space between each element
* @default 1
*
* @param Element Icon Disabled Opacity
* @desc Opacity of elements when they are disabled (0 to 255)
* @default 100
*
* @param ---CPU Element Icons---
*
* @param --------USED ONLY IF
* @default  Show CPU Elements is y--------
*
* @param CPU Element Opacity
* @desc Opacity of all icons.
* @default 100
*
* @param CPU Element X
* @default 535
*
* @param CPU Element Y
* @default 525
*
* @param CPU Label Text
* @desc Text to display that indicates that these element icons are the computer's. Leave empty for no text.
* @default Computer Charged Elements
*
* @param CPU Text X
* @default 560
*
* @param CPU Text Y
* @default 490
*
* @param CPU Text Font Size
* @default 18
*
* @param CPU Text Outline Width
* @default 3
*
* @param ---Charge Icon---
*
* @param Charge Icon X Offset
* @desc Relative to element icon
* @default 35
*
* @param Charge Icon Y Offset
* @desc Relative to element icon
* @default 35
*
* @param ---History Window---
*
* @param Max History
* @desc Maximum number of past rounds to show
* @default 7
*
* @param History Center
* @desc How much to offset the entire thing by
* @default -10
*
* @param History X
* @desc Starting X value of the entire thing
* @default 76
*
* @param Score Format
* @desc CPUSCORE and PLAYERSCORE will be substituted with the cpu's and player's scores, respectively
* @default CPUSCORE - PLAYERSCORE
*
* @param Score Y
* @default 40
*
* @param Score Font Size
* @default 48
*
* @param Score Outline Width
* @default 5
*
* @param Rounds Format
* @desc CURROUND and TOTROUND will be substituted with the current round and the total # of rounds, respectively
* @default Round CURROUND of TOTROUND
*
* @param Rounds Y
* @default 80
*
* @param Rounds Font Size
* @default 24
*
* @param Rounds Outline Width
* @default 4
*
* @param Header Text
* @default History
*
* @param Header Y
* @default 140
*
* @param Header Font Size
* @default 28
*
* @param Header-Icon Buffer
* @desc Space between the header text and the beginning of the icons
* @default 60
*
* @param Winner Font Size
* @desc Font size of the >/</= that goes in-between icons in the history log
* @default 24
*
* @param Winner Y Offset
* @default -10
*
* @param History Icon Spacing
* @desc Space between the icon on the left and the icon on the right
* @default 80
*
* @param History Row Spacing
* @default 60
*
* @param
*
* @help 
* ------------------------------------------------------------------------------
*   Wuxing v1.0a by mjshi
*   Free for both commercial and non-commercial use, with credit.
* ------------------------------------------------------------------------------
*   Installation: Extract the included folder to the img/ directory.
*
*   There are some additional files in the img/wuxing/backup folder that you
*   can either delete or use for whatever you want.
* ------------------------------------------------------------------------------
*                               How To Play
* ------------------------------------------------------------------------------
*   Select an element, then pit that against the computer in a game of
*   elemental rock-paper-scissors!
*
*   This minigame is based on an ancient Chinese elemental circle, the
*   only elemental system in the world that says wood beats fire.
*     https://en.wikipedia.org/wiki/Wu_Xing
*
* ------------------------------------------------------------------------------
*                           Running the Minigame
* ------------------------------------------------------------------------------
*   The minigame runs via plugin command.
*     StartWuxing
*
*   Alternatively, you can call the minigame with different parameters:
*     StartWuxing elementNumber gameLength
*   where 1 <= elementNumber <= 5 and gameLength >= 1.
*
*   Calling
*     StartWuxing 3 5
*   would give everyone 3 random elements and the game would last 5 rounds.
*
*   For more advanced users, this minigame can also run via script:
*     WuxingMG.elements = $gameVariables.value(VARIABLE_ID_HERE)
*     WuxingMG.rounds = $gameVariables.value(VARIABLE_ID_HERE)
*     SceneManager.push(Scene_WuxingMG);
*
*   Calling
*     WuxingMG.elements = $gameVariables.value(1)
*     WuxingMG.rounds = $gameVariables.value(2)
*     SceneManager.push(Scene_WuxingMG);
*   would set elementNumber to the value of Variable 1 and gameLength to the
*   value of Variable 2.
*
* ------------------------------------------------------------------------------
*   Update Notes
* ------------------------------------------------------------------------------
* > update 1.0  - plugin released
*
* ------------------------------------------------------------------------------
*
* > Is something broken? Go to http://mjshi.weebly.com/contact.html and I'll
*   try my best to help you!
*/

var WuxingMG = WuxingMG || {};

function Scene_WuxingMG() {
	this.initialize.apply(this, arguments);
}

(function () {

//-----------------------------------------------------------------------------
// **Configuration
//

// These must ALL be lowercase!
var elements = ["wood", "fire", "earth", "metal", "water"];

// The first and last word MUST correspond with an element!
// The phrases don't need to be in any particular order, though.
var phrases = [
	"Wood parts Earth",
	"Wood feeds Fire",
	"Fire melts Metal",
	"Fire creates Earth",
	"Earth dams Water",
	"Earth bears Metal",
	"Metal chops Wood",
	"Metal collects Water",
	"Water extinguishes Fire",
	"Water nourishes Wood",
];

//
// **End Configuration
//-----------------------------------------------------------------------------

/** BEGIN **/

var params = PluginManager.parameters('Wuxing');
var customBG = params["Custom BG"] === "y";
var cutThroughHistory = params["Cut Through History"] === "y";

function pnum(str) {
	return Number(params[str]);
}

var cursor = {
	xOffset: pnum("Cursor X Offset"),
	yOffset: pnum("Cursor Y Offset"),
	confirm: {name: params["Cursor Confirm SFX"], pan: 0, pitch: 100, volume: 100},
	cancel: {name: params["Cursor Cancel SFX"], pan: 0, pitch: 100, volume: 100},
	move: {name: params["Cursor Move SFX"], pan: 0, pitch: 100, volume: 100},
}

var circlePadding = {
	x: pnum("Elemental Circle X"),
	y: pnum("Elemental Circle Y"),
};

var bigElement = {
	x: pnum("Big Element X"),
	y: pnum("Big Element Y"),
	width: pnum("Big Element Width"),
	padding: pnum("Big Element Padding"),
}

var elementIcon = {
	x: pnum("Element Icons X"),
	y: pnum("Element Icons Y"),
	width: pnum("Element Icon Width"),
	height: pnum("Element Icon Height"),
	padding: pnum("Element Icon Padding"),
	disabled: pnum("Element Icon Disabled Opacity"),
}

var cpuElementIcon = {
	visible: params["Show CPU Elements"] === "y",
	opacity: pnum("CPU Element Opacity"),
	x: pnum("CPU Element X"),
	y: pnum("CPU Element Y"),

	text: params["CPU Label Text"],
	textX: pnum("CPU Text X"),
	textY: pnum("CPU Text Y"),
	textFontSize: pnum("CPU Text Font Size"),
	textOutWidth: pnum("CPU Text Outline Width"),
}

var chargeIcon = {
	xOffset: pnum("Charge Icon X Offset"),
	yOffset: pnum("Charge Icon Y Offset"),
}

var historyText = {
	center: pnum("History Center"),
	x: pnum("History X"),

	scoreY: pnum("Score Y"),
	scoreFontSize: pnum("Score Font Size"),
	scoreOutWidth: pnum("Score Outline Width"),
	scoreFormat: params["Score Format"],

	roundY: pnum("Rounds Y"),
	roundFontSize: pnum("Rounds Font Size"),
	roundOutWidth: pnum("Rounds Outline Width"),
	roundFormat: params["Rounds Format"],

	headerY: pnum("Header Y"),
	headerFontSize: pnum("Header Font Size"),
	headerText: params["Header Text"],
	headerIconBuffer: pnum("Header-Icon Buffer"),

	winnerFontSize: pnum("Winner Font Size"),
	winnerYOffset: pnum("Winner Y Offset"),

	iconSpacing: pnum("History Icon Spacing"),
	rowSpacing: pnum("History Row Spacing"),
}

var replayText = {
	again: params["Play Again Text"],
	quit: params["Quit Game Text"],
}

var maxHistory = pnum("Max History");

var roundText = {
	pChose: params["Player Chosen Element"],
	cChose: params["Computer Chosen Element"],
	youWon: params["Round Win Message"],
	cpuWon: params["Round Loss Message"],
	tie: params["Round Tie Message"],
}

var victoryText = [params["Victory Text Line 1"], params["Victory Text Line 2"]];
var lossText = [params["Loss Text Line 1"], params["Loss Text Line 2"]];
var tieText = [params["Tie Text Line 1"], params["Tie Text Line 2"]];

var elementSFX = {
	wood: params["Wood Win SFX"].split(", "),
	fire: params["Fire Win SFX"].split(", "),
	earth: params["Earth Win SFX"].split(", "),
	metal: params["Metal Win SFX"].split(", "),
	water: params["Water Win SFX"].split(", "),
	tie: params["Nobody Won SFX"],
}

WuxingMG.elements = pnum("Default Element Number");
WuxingMG.rounds = pnum("Default Round Number");

//-----------------------------------------------------------------------------
// Functions
//

/** Win Checking **/
function whoWon(player, cpu) {
	if (indexOf(player, 1) == indexOf(cpu) ||
		indexOf(player, -3) == indexOf(cpu))
		return 1;
	else if (indexOf(cpu, 1) == indexOf(player) ||
		indexOf(cpu, -3) == indexOf(player))
		return -1;
	else return 0;
}

function indexOf(item, shift) {
	if (shift === undefined) return elements.indexOf(item);

	var x = elements.indexOf(item) + shift;
	if (x < 0) x += elements.length;
	return x % elements.length;
}

/** Handle Movement **/
var locations = [];
for (var i = 0; i < elements.length; i++) locations[i] = elementIcon.x + (elementIcon.width + elementIcon.padding) * i;

function move(x, dir) {
	AudioManager.playSe(cursor.move);
	var a = locations.indexOf(x) + dir;
	if (a < 0) a += locations.length;
	return locations[a % locations.length];
}

function findPhrase(winner, player, cpu) {
	var firstWord, lastWord;

	if (winner[0] == 1) {
		firstWord = player;
		lastWord = cpu;
	} else if (winner[0] == -1) {
		firstWord = cpu;
		lastWord = player;
	} else {
		return null;
	}

	for (var i = 0; i < phrases.length; i++) {
		if (phrases[i].toLowerCase().startsWith(firstWord) &&
			phrases[i].toLowerCase().endsWith(lastWord))
				return phrases[i];
	}
}

//-----------------------------------------------------------------------------
// Scene_WuxingMG
//
Scene_WuxingMG.prototype = Object.create(Scene_Base.prototype);
Scene_WuxingMG.prototype.constructor = Scene_WuxingMG;

Scene_WuxingMG.prototype.initialize = function () {
	Scene_Base.prototype.initialize.call(this);

	if (WuxingMG.elements < 1) WuxingMG.elements = 1;
	else if (WuxingMG.elements > 5) WuxingMG.elements = 5;

	if (WuxingMG.rounds < 1) WuxingMG.rounds = 1;
	this._eleBoard = [];

	this.initVariables();
};

Scene_WuxingMG.prototype.initVariables = function() {
	this._currentRound = 1;
	this._totalRounds = WuxingMG.rounds;
	this._shouldProcessResults = false;
	this._shouldProcessEnd = false;
	
	this._cpuEnabled = [];
	this._playerDisabled = [];
	this._cpuCharged = [false, false, false, false, false];
	this._playerCharged = [false, false, false, false, false];

	this._pElement = null;
	this._cElement = null;

	this._history = [];
	
	// Disable random elements
	var x;
	while (this._cpuEnabled.length < WuxingMG.elements) {
		x = elements[Math.floor(Math.random() * 5)];
		if (!this._cpuEnabled.contains(x)) this._cpuEnabled.push(x);
	}

	while (this._playerDisabled.length < 5 - WuxingMG.elements) {
		x = elements[Math.floor(Math.random() * 5)];
		if (!this._playerDisabled.contains(x)) this._playerDisabled.push(x);
	}
}

Scene_WuxingMG.prototype.reset = function() {
	this.initVariables();
	this._cursor.x = locations[0] + cursor.xOffset;
	this.updateBigElement();
	this.updateChargeIcons();
	this.updateElementOpacities();
	this._matchHistory.reset();
}

Scene_WuxingMG.prototype.updateElementOpacities = function() {
	for (var i = 0; i < elements.length; i++) {
		if (this._playerDisabled.contains(elements[i])) this._eleBoard[i].opacity = elementIcon.disabled;
		else this._eleBoard[i].opacity = 255;
	}
}

Scene_WuxingMG.prototype.create = function() {
	Scene_Base.prototype.create.call(this);
	this.createBackground();
	this.createElementBoard();
	this.createCPUElementBoard();
	this.createCursor();
	this.initializeBigElements();

	this.createWindowLayer();
	this.createWindows();
};

Scene_WuxingMG.prototype.createBackground = function() {
	this._backgroundSprite = new Sprite();
	this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
	this.addChild(this._backgroundSprite);

	if (customBG) this.addChild(new Sprite(ImageManager.loadBitmap("img/wuxing/", "bg")));
};

Scene_WuxingMG.prototype.createElementBoard = function() {
	var sprite = new Sprite(ImageManager.loadBitmap("img/wuxing/", "circle"));
	sprite.x = circlePadding.x;
	sprite.y = circlePadding.y;
	this.addChild(sprite);

	for (var i = 0; i < elements.length; i++) {
		this._eleBoard[i] = new Sprite(ImageManager.loadBitmap("img/wuxing/", elements[i] + "_icon"));

		this._eleBoard[i].x = locations[i];
		this._eleBoard[i].y = elementIcon.y;
		if (this._playerDisabled.contains(elements[i])) this._eleBoard[i].opacity = elementIcon.disabled;
		this.addChild(this._eleBoard[i]);
	}
};

Scene_WuxingMG.prototype.createCPUElementBoard = function() {
	if (!cpuElementIcon.visible) return;

	var sprite;
	if (cpuElementIcon.text.trim() !== "") {
		sprite = new Sprite(new Bitmap(Graphics.boxWidth, Graphics.boxHeight));
		this.addChild(sprite);

		sprite.bitmap.outlineColor = 'black';
		sprite.bitmap.fontSize = cpuElementIcon.textFontSize;
		sprite.bitmap.outlineWidth = cpuElementIcon.textOutWidth;
		sprite.bitmap.drawText(cpuElementIcon.text, cpuElementIcon.textX, cpuElementIcon.textY, Graphics.width, 36);
	}

	
	for (var i = 0; i < elements.length; i++) {
		sprite = new Sprite(ImageManager.loadBitmap("img/wuxing/", elements[i] + "_icon"));

		sprite.x = cpuElementIcon.x + (elementIcon.width + elementIcon.padding) * i;
		sprite.y = cpuElementIcon.y;
		sprite.opacity = cpuElementIcon.opacity;
		this.addChild(sprite);
	}
};

Scene_WuxingMG.prototype.updateChargeIcons = function() {
	if (this._numChildren === undefined) this._numChildren = this.children.length;
	this.children.splice(this._numChildren);

	var sprite;
	for (var i = 0; i < elements.length; i++) {
		if (this._playerCharged[i]) {
			sprite = new Sprite(ImageManager.loadBitmap("img/wuxing/", "charge_icon"));

			sprite.x = locations[i] + chargeIcon.xOffset;
			sprite.y = elementIcon.y + chargeIcon.yOffset;
			this.addChild(sprite);
		}
	}

	if (!cpuElementIcon.visible) return;

	for (var i = 0; i < elements.length; i++) {
		if (this._cpuCharged[i]) {
			sprite = new Sprite(ImageManager.loadBitmap("img/wuxing/", "charge_icon"));

			sprite.x = cpuElementIcon.x + (elementIcon.width + elementIcon.padding) * i + chargeIcon.xOffset;
			sprite.y = cpuElementIcon.y + chargeIcon.yOffset;
			this.addChild(sprite);
		}
	}
};

Scene_WuxingMG.prototype.createCursor = function() {
	this._cursor = new Sprite(ImageManager.loadBitmap("img/wuxing/", "cursor"));
	this._cursor.x = locations[0] + cursor.xOffset;
	this._cursor.y = elementIcon.y + cursor.yOffset;
	this.addChild(this._cursor);
}

Scene_WuxingMG.prototype.createWindows = function() {
    this._matchHistory = new Window_WXMatchHistory(this._totalRounds);
    if (!cutThroughHistory) this._beloWindowLayer.addChild(this._matchHistory);
    else this.addWindow(this._matchHistory);

    this._log = new Window_WuxingResults();
    this.addWindow(this._log);

    this._replayCmd = new Window_WXCommand();
    this._replayCmd.x = (Graphics.boxWidth - this._replayCmd.width) / 2;
    this._replayCmd.y = this._log.y + this._log.height;
    this.addWindow(this._replayCmd);

	this._replayCmd.setHandler('ok',	this.replayCommand.bind(this));
	this._replayCmd.setHandler('cancel', this.cancelCommand.bind(this));
}

if (!cutThroughHistory) {
	Scene_WuxingMG.prototype.createWindowLayer = function() {
	    var width = Graphics.boxWidth;
	    var height = Graphics.boxHeight;
	    var x = (Graphics.width - width) / 2;
	    var y = (Graphics.height - height) / 2;
	    this._beloWindowLayer = new WindowLayer();
	    this._beloWindowLayer.move(x, y, width, height);
	    this.addChild(this._beloWindowLayer);

	    var width = Graphics.boxWidth;
	    var height = Graphics.boxHeight;
	    var x = (Graphics.width - width) / 2;
	    var y = (Graphics.height - height) / 2;
	    this._windowLayer = new WindowLayer();
	    this._windowLayer.move(x, y, width, height);
	    this.addChild(this._windowLayer);
	};
}

Scene_WuxingMG.prototype.cancelCommand = function() {
	this.popScene();
};

Scene_WuxingMG.prototype.replayCommand = function() {
	this._log.close();
	this._replayCmd.close();
	this.reset();
};

Scene_WuxingMG.prototype.initializeBigElements = function() {
	this._pBigElement = new Sprite(ImageManager.loadBitmap("img/wuxing/", this.getCurrentElement()));
	this._pBigElement.x = bigElement.x + Graphics.boxWidth - bigElement.width - bigElement.padding;
	this._pBigElement.y = bigElement.y;
	this.addChild(this._pBigElement);

	this._cBigElement = new Sprite(ImageManager.loadBitmap("img/wuxing/", "blank"));
	this._cBigElement.x = bigElement.x + bigElement.padding;
	this._cBigElement.y = this._pBigElement.y;
	this.addChild(this._cBigElement);
}

Scene_WuxingMG.prototype.getCurrentElement = function() {
	return elements[locations.indexOf(this._cursor.x)];
}

Scene_WuxingMG.prototype.updateBigElement = function() {
	this._pBigElement.bitmap = ImageManager.loadBitmap("img/wuxing/", this.getCurrentElement());
}

Scene_WuxingMG.prototype.updateCpuBigElement = function(empty) {
	if (empty !== undefined) this._cBigElement.bitmap = ImageManager.loadBitmap("img/wuxing/", "blank");
	else this._cBigElement.bitmap = ImageManager.loadBitmap("img/wuxing/", this._history[this._history.length - 1][1][0]);
}

Scene_WuxingMG.prototype.isCharged = function(who) {
	if (who === 'player')	return this._playerCharged[elements.indexOf(this._pElement)];
	else 					return this._cpuCharged[elements.indexOf(this._cElement)];
};

Scene_WuxingMG.prototype.processWin = function(who) {
	var cIndex = elements.indexOf(this._cElement),
		pIndex = elements.indexOf(this._pElement);
	var winner = whoWon(this._pElement, this._cElement);
	var points = 1;

	this.playSFX(winner);

	if ((this._playerCharged[pIndex] && winner == 1) ||
		(this._cpuCharged[cIndex] && winner == -1))
			points += 1;

	this._cpuCharged[cIndex] = false;
	this._playerCharged[pIndex] = false;

	if (winner == -1) this._cpuCharged[cIndex] = true;
	if (winner == 1)  this._playerCharged[pIndex] = true;

	return [winner, points];
};

Scene_WuxingMG.prototype.handleClick = function(x, y) {
	var ox = locations[0], oy = elementIcon.y;
	var cx = elementIcon.width, cy = elementIcon.height;

	var index;

	for (var i = 0; i < locations.length; i++) {
		if (x > locations[i] && x < locations[i] + cx) index = locations[i];
	}

	if (index === undefined || (y < oy || y > oy + cy)) {
		AudioManager.playSe(cursor.cancel);

	} else {
		if (this._cursor.x != index) {
			AudioManager.playSe(cursor.move);
			this._cursor.x = index;
			this.updateBigElement();
		} else {this.selectElement()}
	}

};

Scene_WuxingMG.prototype.selectElement = function() {
	this._pElement = this.getCurrentElement();
	if (this._playerDisabled.contains(this._pElement)) {
		AudioManager.playSe(cursor.cancel);
	} else { /* Valid Action */

		AudioManager.playSe(cursor.confirm);
		this._log.setText(roundText.pChose.replace("CHOSENELEMNT", this._pElement.charAt(0).toUpperCase() + this._pElement.slice(1)));
		this._history.push([[this._pElement, this.isCharged('player')]]);
	}
};

Scene_WuxingMG.prototype.playSFX = function(winner) {
	var file, elmnt, charge;

	if (winner == 0) { // Tie
		file = elementSFX.tie;

	} else {
		if (winner == -1) {
			elmnt = this._cElement;
			charge = this.isCharged("cpu");
		} else {
			elmnt = this._pElement;
			charge = this.isCharged("player");
		}

		if (charge) file = elementSFX[elmnt][1];
		else file = elementSFX[elmnt][0];
	}

	var sfx = {name: file, pan: 0, pitch: 100, volume: 100};
	AudioManager.playSe(sfx);
};

Scene_WuxingMG.prototype.update = function() {
	Scene_Base.prototype.update.call(this);

	// prevent hasty players from double-clicking
	if (this._log.isClosing() || this._log.isOpening()) return;
	if (this._replayCmd.isOpen() || this._replayCmd.isOpening() || this._replayCmd.isClosing()) return;

	/* Close the results window. */
	if (this._log.isOpen()) {
		if (Input.isTriggered('ok') || TouchInput.isTriggered() || Input.isTriggered('cancel')) {
			this._log.close();

			// Results processing window was closed
			if (this._shouldProcessResults === null) {
				this.updateCpuBigElement(null);
				this._currentRound++;
				this._shouldProcessResults = false;

				//show victory window
				if (this._currentRound > this._totalRounds) this._shouldProcessEnd = true;
			}
		}
		return;
	}

	/* End game */
	if (this._shouldProcessEnd) {
		var score = this._matchHistory.getScore();
		var c = score[1], p = score[0];

		if (p > c) {
			this._log.setText(victoryText[0], victoryText[1]);
		} else if (p < c) {
			this._log.setText(lossText[0], lossText[1]);
		} else {
			this._log.setText(tieText[0], tieText[1]);
		}

		this._replayCmd.open();
		this._replayCmd.activate();

		this._shouldProcessEnd = false;
	}

	if (this._currentRound > this._totalRounds) return;
	if (this._log.isOpen()) return;

	/* Computer Action */
	if (this._history.length > 0 && this._history[this._history.length - 1].length == 1) {
		this._cElement = this._cpuEnabled[Math.floor(Math.random() * this._cpuEnabled.length)];
		this._history[this._history.length - 1][1] = [this._cElement, this.isCharged('cpu')];
		this.updateCpuBigElement();

		this._log.setText(roundText.cChose.replace("CHOSENELEMNT", this._cElement.charAt(0).toUpperCase() + this._cElement.slice(1)));
		this._shouldProcessResults = true;
		return;
	}

	/* Results Processing */
	if (this._shouldProcessResults) {
		var winner = this.processWin();
		var message = findPhrase(winner, this._pElement, this._cElement);

		if (winner[0] == -1) {
			winner[0] = 1; /* Index for score processing - player = 0, cpu = 1 */
			this._log.setText(message + ".", roundText.cpuWon.replace("WONPOINTS", winner[1]));

		} else if (winner[0] == 1) {
			winner[0] = 0; /* Index for score processing - player = 0, cpu = 1 */
			this._log.setText(message + ".", roundText.youWon.replace("WONPOINTS", winner[1]));

		} else {
			winner[1] = 0; /* Score set to 0 for score processing */
			this._log.setText(roundText.tie);
		}

		this._matchHistory.updateBoard(this._history, winner);
		this.updateChargeIcons();
		this._shouldProcessResults = null;
		return;
	}

	/* Player wants to exit scene */
	if (Input.isTriggered('cancel')) {
		AudioManager.playSe(cursor.cancel);
		return;
	}

	/* Player chose something */

	if (TouchInput.isTriggered()) {
		this.handleClick(TouchInput._x, TouchInput._y);
		return;
	}

	if (Input.isTriggered('ok')) {
		this.selectElement();
		return;
	}

	/* Player is moving around */
	if (Input.isTriggered('left')) {
		this._cursor.x = move(this._cursor.x, -1);
		this.updateBigElement();
	} else if (Input.isTriggered('right')) {
		this._cursor.x = move(this._cursor.x, 1);
		this.updateBigElement();
	}
}

//-----------------------------------------------------------------------------
// Window_WuxingResults
// Results window for the minigame.
//
function Window_WuxingResults() {
    this.initialize.apply(this, arguments);
}

Window_WuxingResults.prototype = Object.create(Window_Base.prototype);
Window_WuxingResults.prototype.constructor = Window_WuxingResults;

Window_WuxingResults.prototype.initialize = function(numLines) {
    var width = Graphics.boxWidth;
    var height = this.fittingHeight(numLines || 2);
    Window_Base.prototype.initialize.call(this, 0, (Graphics.boxHeight - height) / 2, width, height);
    this._text = '';
    this.openness = 0;
};

Window_WuxingResults.prototype.setText = function(text, text2) {
	this.contents.clear();
	this.drawText(text, 0, 0, Graphics.boxWidth - this.textPadding() * 4, 'center');
	if (text2 !== undefined) this.drawText(text2, 0, this.lineHeight(), Graphics.boxWidth - this.textPadding() * 4, 'center');
    this.open();
};

function Window_WXMatchHistory() {
    this.initialize.apply(this, arguments);
}

Window_WXMatchHistory.prototype = Object.create(Window_Base.prototype);
Window_WXMatchHistory.prototype.constructor = Window_WXMatchHistory;

Window_WXMatchHistory.prototype.initialize = function(totalRounds) {
    Window_Base.prototype.initialize.call(this, Graphics.boxWidth / 3, 0, Graphics.boxWidth / 3, Graphics.boxHeight);
    this.opacity = 0;
	this.contents.outlineColor = 'black';
	this._round = 1;
	this._totalRounds = totalRounds;
	this._score = [0, 0];
    this.updateBoard([], [0, 0]);
};

Window_WXMatchHistory.prototype.reset = function() {
	this._round = 1;
	this._score = [0, 0];
    this.updateBoard([], [0, 0]);
};

Window_WXMatchHistory.prototype.getScore = function() {
	return this._score;
};

// TODO: config variables
Window_WXMatchHistory.prototype.updateBoard = function(history, points) {
	this.contents.clear();
	if (this._numChildren === undefined) this._numChildren = this.children.length;
	this.children.splice(this._numChildren);
	
	this._score[points[0]] += points[1];

	// Score goes enemy - player
	this.contents.fontSize = historyText.scoreFontSize;
	this.contents.outlineWidth = historyText.scoreOutWidth;

	this.drawText(historyText.scoreFormat.replace("CPUSCORE", this._score[1]).replace("PLAYERSCORE", this._score[0]), historyText.center, historyText.scoreY, this.width, 'center');

	this.contents.fontSize = historyText.roundFontSize;
	this.contents.outlineWidth = historyText.roundOutWidth;
	this.drawText(historyText.roundFormat.replace("CURROUND", this._round).replace("TOTROUND", this._totalRounds), historyText.center, historyText.roundY, this.width, 'center');

	var x = historyText.x,
		y = historyText.headerY;

	this.contents.fontSize = historyText.headerFontSize;
	this.drawText(historyText.headerText, historyText.center, y, this.width, 'center');

	y += historyText.headerIconBuffer;

	this.contents.fontSize = historyText.winnerFontSize;
	var bitmap1, bitmap2, charge, winner;

	var startIndex = 0;
	if (history.length - maxHistory > 0) startIndex = history.length - maxHistory;

	for (var i = startIndex; i < history.length; i++) {
		bitmap1 = new Sprite(ImageManager.loadBitmap("img/wuxing/", history[i][0][0] + "_icon")); //player
		bitmap2 = new Sprite(ImageManager.loadBitmap("img/wuxing/", history[i][1][0] + "_icon")); //cpu
		
		bitmap2.x = x;
		bitmap2.y = y;
		this.addChild(bitmap2);

		if (history[i][1][1]) {
			charge = new Sprite(ImageManager.loadBitmap("img/wuxing/", "charge_icon"));
			charge.x = bitmap2.x + chargeIcon.xOffset;
			charge.y = bitmap2.y + chargeIcon.yOffset;
			this.addChild(charge);
		}

		winner = whoWon(history[i][0][0], history[i][1][0]);
		if 		(winner == -1)	this.drawText('>', historyText.center, y + historyText.winnerYOffset, this.width, 'center');
		else if (winner == 1) 	this.drawText('<', historyText.center, y + historyText.winnerYOffset, this.width, 'center');
		else 					this.drawText('=', historyText.center, y + historyText.winnerYOffset, this.width, 'center');

		bitmap1.x = x + historyText.iconSpacing;
		bitmap1.y = y;
		this.addChild(bitmap1);

		if (history[i][0][1]) {
			charge = new Sprite(ImageManager.loadBitmap("img/wuxing/", "charge_icon"));
			charge.x = bitmap1.x + chargeIcon.xOffset;
			charge.y = bitmap1.y + chargeIcon.yOffset;
			this.addChild(charge);
		}

		y += historyText.rowSpacing;
	}

	if (this._round < this._totalRounds) this._round++;
};

//-----------------------------------------------------------------------------
// Window_WXCommand
//
function Window_WXCommand() {
    this.initialize.apply(this, arguments);
}

Window_WXCommand.prototype = Object.create(Window_Command.prototype);
Window_WXCommand.prototype.constructor = Window_WXCommand;

Window_WXCommand.prototype.initialize = function() {
    Window_Command.prototype.initialize.call(this, 0, 0);
    this.openness = 0;
};

Window_WXCommand.prototype.makeCommandList = function () {
	this.addCommand(replayText.again, 'ok');
	this.addCommand(replayText.quit, 'cancel');
};

//-----------------------------------------------------------------------------
// pluginCommand
//
var Wuxing_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function (command, args) {
	Wuxing_Game_Interpreter_pluginCommand.call(this, command, args);
	if (command === "StartWuxing" ) {
		if (!isNaN(args[0])) WuxingMG.elements = parseInt(args[0]);
		if (!isNaN(args[1])) WuxingMG.rounds = parseInt(args[1]);

		SceneManager.push(Scene_WuxingMG);
	}
}

/** END **/

})();