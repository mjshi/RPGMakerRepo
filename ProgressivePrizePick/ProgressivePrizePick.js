//==============================================================================
// ProgressivePrizePick.js
//==============================================================================
 
var Imported = Imported || {};
Imported.ProgressivePrizePick = true;

var ppp = ppp || {};
ppp.i = function (id, num) {
	if (num === undefined) num = 1;
	if (num > 1) return {iconIndex: $dataItems[id].iconIndex, number: num, name: $dataItems[id].name, item: "$gameParty.gainItem($dataItems[" + id + "], " + num + ")"};
	return {iconIndex: $dataItems[id].iconIndex, number: num, name: $dataItems[id].name, item: "$gameParty.gainItem($dataItems[" + id + "], " + num + ")"};
}
ppp.w = function (id, num) {
	if (num === undefined) num = 1;
	if (num > 1) return {iconIndex: $dataWeapons[id].iconIndex, number: num, name: $dataWeapons[id].name, item: "$gameParty.gainItem($dataWeapons[" + id + "], " + num + ")"};
	return {iconIndex: $dataWeapons[id].iconIndex, number: num, name: $dataWeapons[id].name, item: "$gameParty.gainItem($dataWeapons[" + id + "], " + num + ")"};
}
ppp.a = function (id, num) {
	if (num === undefined) num = 1;
	if (num > 1) return {iconIndex: $dataArmors[id].iconIndex, number: num, name: $dataArmors[id].name, item: "$gameParty.gainItem($dataArmors[" + id + "], " + num + ")"};
	return {iconIndex: $dataArmors[id].iconIndex, number: num, name: $dataArmors[id].name, item: "$gameParty.gainItem($dataArmors[" + id + "], " + num + ")"};
}
ppp.g = function (num) {
	return {iconIndex: PluginManager.parameters('ProgressivePrizePick')["Currency Icon"], number: num, name: PluginManager.parameters('ProgressivePrizePick')["Currency Name"], item: "$gameParty.gainGold(" + num + ")"};
}

/*:
* @plugindesc A card picking minigame where you balance risk with reward.
* @author mjshi
*
* @param --Gameplay--
*
* @param Stack Prizes
* @desc (y/n) Prizes are cumulative in each column rather than exclusive. (Exclusive = 1 prize per column)
* @default n
*
* @param --Prizes--
*
* @param Ticket Item ID
* @desc Item to use for tickets
* @default 6
*
* @param Currency Icon
* @desc Icon to use for monetary prizes
* @default 313
*
* @param Currency Name
* @desc Name to use for monetary prizes
* @default Gold
*
* @param Claim Button X
* @default 655
*
* @param Claim Button Y
* @default 380
*
* @param Claim Button Width
* @default 57
*
* @param Claim Button Height
* @default 70
*
* @param Claim Opacity
* @desc Opacity of the claim button when there's nothing to claim.
* @default 200
*
* @param --Prize List--
*
* @param Header Image X
* @default 60
*
* @param Header Image Y
* @default 15
*
* @param List X
* @default 40
*
* @param List Y
* @default 80
*
* @param List Spacing
* @default 25
*
* @param --Cards--
*
* @param Card X
* @default 50
*
* @param Card Y
* @default 250
*
* @param Card Width
* @default 68
*
* @param Card Height
* @default 68
*
* @param X Spacing
* @default 5
*
* @param Y Spacing
* @default 5
*
* @param --Vocab--
*
* @param Play Command
* @default Play (Ticket-1)
*
* @param Exit Command
* @default Exit
*
* @param Win Text
* @default Congratulations! Obtained:
*
* @param Lose Text
* @default You lost... Better luck next time!
*
* @param --Appearance--
*
* @param Custom BG
* @desc Should a custom background be used? (y/n)
* Background MUST be saved as img/prizepick/bg.png
* @default n
*
* @param --Sounds--
*
* @param Confirm SFX
* @desc The SFX that plays when the player selects a card. Will not be played if you specify special SFX.
* Book1_fast included and recommended.
* @default Book1
* 
* @param Win SFX
* @desc The SFX that plays when the player claims their prize.
* @default Applause1
* 
* @param Lose SFX
* @desc The SFX that plays when the player flips a blank.
* @default Explosion2
* 
* @param Special SFX
* @desc Have specific SFX for each type of card. Separate with a comma and a space. 5 entries required, leave blank = disable
* @default 
* 
* @param
* @help 
* ------------------------------------------------------------------------------
*   Progressive Prize Pick v1.0a by mjshi
*   Free for both commercial and non-commercial use, with credit.
* ------------------------------------------------------------------------------
*   Installation: Extract the included folder to the img/ directory.
*   I also recommend that you use the Book1_fast SE included in that folder,
*   it works much better than the original Book1 SE.
* ------------------------------------------------------------------------------
*                               How To Play
* ------------------------------------------------------------------------------
*  There are 35 total cards. Each set will contain enough of each kind of card
*  to, if you're lucky enough, obtain the highest tier prize in each column.
*  In the given prize list example, there are 30 prize cards, and (since any
*  non-prize cards are filled in with a blank) 5 blank cards.
*
*  The game ends when you claim your prizes or flip a blank.
*  If you flip a blank, you lose all your prizes, so carefully think over
*  whether that next tier prize is worth the risk!
*
* ------------------------------------------------------------------------------
*                            Prize Table Configuration
* ------------------------------------------------------------------------------
*   Before playing, you need to set up the prize pool!
*   To do this, use the script event command found right above plugin command.
*
*   The recommended set up for the prize pool is as thus:
*  ppp[0] = [prize1, prize2, prize3]
*  ppp[1] = [prize1, prize2, prize3, prize4]
*  ppp[2] = [prize1, prize2, prize3, prize4, prize5]
*  ppp[3] = [prize1, prize2, prize3, prize4, prize5, prize6]
*  ppp[4] = [prize1, prize2, prize3, prize4, prize5, prize6, prize7]
*  
*    Replace each of the prize#s with either:
*  ppp.g(amount)
*    > gives gold
*  ppp.i(itemID, number)
*    > gives items. Alternatively, use ppp.i(itemID) to give 1 of that item.
*  ppp.w(itemID, number)
*    > gives weapons. Alternatively, use ppp.w(itemID) to give 1 of that weapon.
*  ppp.a(itemID, number)
*    > gives armors. Alternatively, use ppp.a(itemID) to give 1 of that armor.
*
*    A completed table might look like this:
*  ppp[0] = [ppp.g(100), ppp.g(250), ppp.i(1)]
*  ppp[1] = [ppp.g(100), ppp.g(250), ppp.i(1, 2), ppp.w(1)]
*  ppp[2] = [ppp.g(150), ppp.i(2), ppp.i(1), ppp.a(1), ppp.a(2)]
*  ppp[3] = [ppp.g(200), ppp.g(500), ppp.i(1), ppp.a(3), ppp.g(1000), ppp.g(2000)]
*  ppp[4] = [ppp.g(100), ppp.g(250), ppp.i(1), ppp.w(1), ppp.a(4), ppp.g(3000), ppp.g(4000)]
*
*    You can, of course, vary the length of each column's prize pool as much
*    as you want. Alternate (harder) setups could look like these:
*
*    Hard (27 cards, 8 blanks)
*  ppp[0] = [prize1, prize2]
*  ppp[1] = [prize1, prize2, prize3]
*  ppp[2] = [prize1, prize2, prize3, prize4]
*  ppp[3] = [prize1, prize2, prize3, prize4, prize5]
*  ppp[4] = [prize1, prize2, prize3, prize4, prize5, prize6, prize7, prize8]
*
*    Very Hard (25 cards, 10 blanks)
*  ppp[0] = [prize1, prize2]
*  ppp[1] = [prize1, prize2, prize3]
*  ppp[2] = [prize1, prize2, prize3, prize4]
*  ppp[3] = [prize1, prize2, prize3, prize4, prize5]
*  ppp[4] = [prize1, prize2, prize3, prize4, prize5, prize6]
*
* ------------------------------------------------------------------------------
*                           Running the Minigame
* ------------------------------------------------------------------------------
*    After setting up the prize pool, simply call
*  SceneManager.push(Scene_ProgressivePrizePick);
*    in a script event command.
*
* ------------------------------------------------------------------------------
* > Is something broken? Go to http://mjshi.weebly.com/contact.html and I'll
*   try my best to help you!
*/

//Initialize global variables

function Scene_ProgressivePrizePick() {
	this.initialize.apply(this, arguments);
}

(function () {
/* BEGIN */

function getp(param) {
	return parseInt(PluginManager.parameters('ProgressivePrizePick')[param]);
}

function inRect(x, y, rx, ry, rw, rh) {
	return x > rx && x < rx + rw && y > ry && y < ry + rh;
}

var offset = {
	x: getp("Card X"),
	y: getp("Card Y"),
}

var spacing = {
	x: getp("X Spacing"),
	y: getp("Y Spacing"),
}

var imageWidth = getp("Card Width"), imageHeight = getp("Card Height");

var header = {
	x: getp("Header Image X"),
	y: getp("Header Image Y"),
}

var list = {
	x: getp("List X"),
	y: getp("List Y"),
	spacing: getp("List Spacing"),
}

var claim = {
	x: getp("Claim Button X"),
	y: getp("Claim Button Y"),
	width: getp("Claim Button Width"),
	height: getp("Claim Button Height"),
	opacity: getp("Claim Opacity"),
}

var vocab = {
	play: PluginManager.parameters('ProgressivePrizePick')["Play Command"],
	exit: PluginManager.parameters('ProgressivePrizePick')["Exit Command"],
	winText: PluginManager.parameters('ProgressivePrizePick')["Win Text"],
	loseText: PluginManager.parameters('ProgressivePrizePick')["Lose Text"],
}

var sounds = {
	win: {name: PluginManager.parameters('ProgressivePrizePick')["Win SFX"], pan: 0, pitch: 100, volume: 100},
	lose: {name: PluginManager.parameters('ProgressivePrizePick')["Lose SFX"], pan: 0, pitch: 100, volume: 100},
	confirm: {name: PluginManager.parameters('ProgressivePrizePick')["Confirm SFX"], pan: 0, pitch: 100, volume: 100},
	special: (String(PluginManager.parameters('ProgressivePrizePick')["Special SFX"])).split(", "),
}

if (sounds.special.length < 5) {
	sounds.special = false;
} else {
	for (var i = 0; i < sounds.special.length; i++) {
		sounds.special[i] = {name: sounds.special[i], pan: 0, pitch: 100, volume: 100};
	}
}

var ticketID = getp("Ticket Item ID");
var customBG = PluginManager.parameters('ProgressivePrizePick')["Custom BG"] == "y";
var stackPrizes = PluginManager.parameters('ProgressivePrizePick')["Stack Prizes"] == "y";

//-----------------------------------------------------------------------------
// Scene_ProgressivePrizePick
//
Scene_ProgressivePrizePick.prototype = Object.create(Scene_Base.prototype);
Scene_ProgressivePrizePick.prototype.constructor = Scene_ProgressivePrizePick;

Scene_ProgressivePrizePick.prototype.create = function () {
	Scene_Base.prototype.create.call(this);
	this.createBackground();
	this.createCardWindow();
	this.createPrizeColumns();
	this.createWindowLayer();
	this.createOtherWindows();
}

Scene_ProgressivePrizePick.prototype.createBackground = function() {
	this._backgroundSprite = new Sprite();
	this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
	this.addChild(this._backgroundSprite);

	if (customBG) this.addChild(new Sprite(ImageManager.loadBitmap("img/prizepick/", "bg")));
};

Scene_ProgressivePrizePick.prototype.createCardWindow = function () {
	this._cardWindow = new PrizePickCardTable();
	this.addChild(this._cardWindow);

	this._claimButton = new Sprite(ImageManager.loadBitmap("img/prizepick/", "claim"));
	this._claimButton.x = claim.x;
	this._claimButton.y = claim.y;
	this._claimButton.opacity = claim.opacity;
	this.addChild(this._claimButton);
}

Scene_ProgressivePrizePick.prototype.createPrizeColumns = function () {
	this._prizeWindow = [];
	for (var i = 0; i < 5; i++) {
		this._prizeWindow[i] = new PrizePickPrizeColumnSprite(i);
		this._prizeWindow[i].x = Graphics.boxWidth/5 * i;
		this._prizeWindow[i].y = 0;

		this.addChild(this._prizeWindow[i]);
	}
}

Scene_ProgressivePrizePick.prototype.createOtherWindows = function () {
	this._ticketWindow = new Window_PrizePickTickets();
	this.addWindow(this._ticketWindow);

	this._commandWindow = new Window_PrizePickCommand();
	this._commandWindow.x = (Graphics.boxWidth - this._commandWindow.width) / 2;
	this._commandWindow.y = (Graphics.boxHeight - this._commandWindow.height) / 2;
	this._commandWindow.setHandler('play',	this.playCommand.bind(this));
	this._commandWindow.setHandler('exit',	this.cancelCommand.bind(this));
	this._commandWindow.setHandler('cancel', this.cancelCommand.bind(this));
	this.addWindow(this._commandWindow);

	this._resultsWindow = new Window_PrizePickResults();
	this.addWindow(this._resultsWindow);
}

Scene_ProgressivePrizePick.prototype.playCommand = function () {
	$gameParty.loseItem($dataItems[ticketID], 1);

	if (this._shouldReset) this.reset();
	this._commandWindow.close();
	this._ticketWindow.hide();
	this._resultsWindow.hide();
}

Scene_ProgressivePrizePick.prototype.cancelCommand = function () {
	this.popScene();
}

Scene_ProgressivePrizePick.prototype.update = function () {
    this.updateFade();
    AudioManager.checkErrors();
	for (var i = 0; i < 5; i++) this._prizeWindow[i].updatePIndex(this._cardWindow.getNumPicked(i));

	if (this._commandWindow.isOpen() || this._commandWindow._closing || this._commandWindow._opening) {
		this._commandWindow.update();
		return;
	}

	if (this._cardWindow._lost) {
		this._resultsWindow.displayLoss();
		this._resultsWindow.move(Graphics.boxWidth / 6, (Graphics.boxHeight - this._resultsWindow.fittingHeight(1) - this._commandWindow.height) / 2, Graphics.boxWidth * 2/3, this._resultsWindow.fittingHeight(1));
		this._resultsWindow.show();

		this._commandWindow.y = this._resultsWindow.y + this._resultsWindow.height;
		this._commandWindow.open();
		this._commandWindow.activate();
		this._ticketWindow.show();

		this._cardWindow._lost = false;
		this._shouldReset = true;
	}

	this._cardWindow.update();

	if (this.getPrizes().length > 0) {
		this._claimButton.opacity = 255;
		if (Input.isTriggered('cancel') || (TouchInput.isTriggered() && inRect(TouchInput._x, TouchInput._y, claim.x, claim.y, claim.width, claim.height))) this.claimPrizes();
	} else {
		if (Input.isTriggered('cancel') || (TouchInput.isTriggered() && inRect(TouchInput._x, TouchInput._y, claim.x, claim.y, claim.width, claim.height))) SoundManager.playBuzzer();
	}
    
}

Scene_ProgressivePrizePick.prototype.claimPrizes = function() {
	AudioManager.playSe(sounds.win);

	// process prizes
	var prizes = this.getPrizes();
	// award prizes
	for (var i = 0; i < prizes.length; i++) eval(prizes[i].item);

	//collapse prize array for display
	for (var i = 0; i < prizes.length; i++) {
		for (var j = prizes.length - 1; j > i; j--) {
			if (prizes[i].name === prizes[j].name && prizes[i].iconIndex === prizes[j].iconIndex) {
				prizes[i] = {
					name: prizes[i].name,
					iconIndex: prizes[i].iconIndex,
					number: prizes[i].number + prizes[j].number,
				}
				prizes.splice(j, 1);
			}
		}
	}

	//display prizes
	this._resultsWindow.displayWin(prizes);
	this._resultsWindow.move(Graphics.boxWidth / 6, (Graphics.boxHeight - this._resultsWindow.fittingHeight(prizes.length + 1) - this._commandWindow.height) / 2, Graphics.boxWidth * 2/3, this._resultsWindow.fittingHeight(prizes.length + 1));
	this._resultsWindow.show();

	this._commandWindow.y = this._resultsWindow.y + this._resultsWindow.height;
	this._commandWindow.open();
	this._commandWindow.activate();
	this._ticketWindow.show();

	this._shouldReset = true;
};

Scene_ProgressivePrizePick.prototype.getPrizes = function() {
	var prizes = [];
	if (stackPrizes) {
		for (var i = 0; i < 5; i++) {
			if (this._prizeWindow[i].getPrize() !== undefined) {
				for (var j = 0; j <= this._prizeWindow[i].getCurrentIndex(); j++) prizes.push(this._prizeWindow[i].getPrizeAt(j));
			}
		}
	} else {
		for (var i = 0; i < 5; i++) if (this._prizeWindow[i].getPrize() !== undefined) prizes.push(this._prizeWindow[i].getPrize());
	}

	return prizes;
};

Scene_ProgressivePrizePick.prototype.reset = function() {
	this._claimButton.opacity = claim.opacity;
	this._cardWindow.reset();
	for (var i = 0; i < 5; i++) {
		this._prizeWindow[i].reset();
	}
};

//-----------------------------------------------------------------------------
// PrizePickPrizeColumnSprite
//
function PrizePickPrizeColumnSprite() {
    this.initialize.apply(this, arguments);
}

PrizePickPrizeColumnSprite.prototype = Object.create(Sprite.prototype);
PrizePickPrizeColumnSprite.prototype.constructor = PrizePickPrizeColumnSprite;

PrizePickPrizeColumnSprite.prototype.initialize = function (index) {
	Sprite.prototype.initialize.call(this, new Bitmap(Graphics.boxWidth/5, Graphics.boxHeight/2));
	this._index = index;
	this._image = ["heart", "club", "diamond", "spade", "rose"][index];
	this._pIndex = -2;

	this.loadImages();
	this.drawPrizeList();
}

PrizePickPrizeColumnSprite.prototype.loadImages = function () {
	this._header = ImageManager.loadBitmap("img/prizepick/", "i" + this._image);
	this._icon = ImageManager.loadBitmap("img/prizepick/", "mini-" + this._image);
	this._highlight = ImageManager.loadBitmap("img/prizepick/", "prize-highlight");
	this._stacklight = ImageManager.loadBitmap("img/prizepick/", "prize-stack-highlight");
}

PrizePickPrizeColumnSprite.prototype.drawPrizeList = function () {
	this.bitmap.outlineColor = 'black';
	this.bitmap.fontSize = 16;
	this.bitmap.outlineWidth = 3;

	//draw headers
	if (this._pIndex === -1) this._header = this._header = ImageManager.loadBitmap("img/prizepick/", "hl-" + this._image);
	this.bitmap.blt(this._header, 0, 0, this._header.width, this._header.height, header.x, header.y);

	//draw icons
	for (var i = 0; i < ppp[this._index].length; i++) {
		this.bitmap.blt(this._icon, 0, 0, this._icon.width, this._icon.height, list.x - this._icon.width * 1.5, list.y + list.spacing * i);
		this.bitmap.drawText(i + 2, list.x - this._icon.width, list.y + list.spacing * i, Graphics.boxWidth/5 - list.x, 36, 'left');
	}

	// draw prizes
	this.bitmap.fontSize = 18;
	for (var i = 0; i < ppp[this._index].length; i++) {
		if (ppp[this._index][i].number > 1) {
			this.bitmap.drawText(ppp[this._index][i].name + " x " + ppp[this._index][i].number, list.x, list.y - 5 + list.spacing * i, Graphics.boxWidth/5 - list.x, 36, 'left');
		} else {
			this.bitmap.drawText(ppp[this._index][i].name, list.x, list.y - 5 + list.spacing * i, Graphics.boxWidth/5 - list.x, 36, 'left');
		}
		
	}
}

PrizePickPrizeColumnSprite.prototype.reset = function (num) {
	this._pIndex = -2;
	this._header = ImageManager.loadBitmap("img/prizepick/", "i" + this._image);
	this.update();
}

PrizePickPrizeColumnSprite.prototype.updatePIndex = function (num) {
	this._pIndex = num - 1;
	this.update();
}

PrizePickPrizeColumnSprite.prototype.getCurrentIndex = function () {
	return this._pIndex;
}

PrizePickPrizeColumnSprite.prototype.getPrize = function () {
	return ppp[this._index][this._pIndex];
}

PrizePickPrizeColumnSprite.prototype.getPrizeAt = function (index) {
	return ppp[this._index][index];
}

PrizePickPrizeColumnSprite.prototype.drawHighlights = function () {
	if (this._pIndex < 0) return;
	this.bitmap.blt(this._highlight, 0, 0, this._highlight.width, this._highlight.height, 0, list.y + list.spacing * this._pIndex);

	if (stackPrizes) {
		for (var i = 0; i < this._pIndex; i++) {
			this.bitmap.blt(this._stacklight, 0, 0, this._highlight.width, this._highlight.height, 0, list.y + list.spacing * i);
		}
	}
}

PrizePickPrizeColumnSprite.prototype.update = function () {
	this.bitmap.clear();
	this.drawHighlights();
	this.drawPrizeList();
}

//-----------------------------------------------------------------------------
// PrizePickCardTable
//
function PrizePickCardTable() {
	this.initialize.apply(this, arguments);
}

PrizePickCardTable.prototype = Object.create(Sprite.prototype);
PrizePickCardTable.prototype.constructor = PrizePickCardTable;

PrizePickCardTable.prototype.initialize = function () {
	Sprite.prototype.initialize.call(this);
	this.loadCards();
	this.loadCursor();
}

PrizePickCardTable.prototype.reset = function () {
	this.children = [];

	this.loadCards();
	this.loadCursor();
}

PrizePickCardTable.prototype.loadCards = function () {
	var img = ImageManager.loadBitmap("img/prizepick/", "card-back");
	for (var i = 0; i < 5; i++) {
		for (var j = 0; j < 7; j++) {
			eval("this._card" + i + j + "= new Sprite(img);");
			eval("this._card" + i + j + ".x = " + offset.x + " + j * (" + imageWidth + " + " + spacing.x + ");");
			eval("this._card" + i + j + ".y = " + offset.y + " + i * (" + imageHeight + " + " + spacing.y + ");");
			eval("this.addChild(this._card" + i + j + ");");
		}
	}

	this._hearts = ppp[0].length + 1;
	this._clubs = ppp[1].length + 1;
	this._diamonds = ppp[2].length + 1;
	this._spades = ppp[3].length + 1;
	this._roses = ppp[4].length + 1;
	this._blanks = 35 - this._hearts - this._clubs - this._diamonds - this._spades - this._roses;
}

PrizePickCardTable.prototype.getCardState = function (i) {
	return [this._hearts, this._clubs, this._diamonds, this._spades, this._roses][i];
}

PrizePickCardTable.prototype.getNumPicked = function (i) {
	return [ppp[0].length - this._hearts, ppp[1].length - this._clubs, ppp[2].length - this._diamonds, ppp[3].length - this._spades, ppp[4].length - this._roses][i];
}

PrizePickCardTable.prototype.loadCursor = function () {
	this._cursor = new Sprite(ImageManager.loadBitmap("img/prizepick/", "cursor"));
	this._cursor.x = offset.x;
	this._cursor.y = offset.y;
	this.addChild(this._cursor);

	this._sIndex = 0;
}

PrizePickCardTable.prototype.move = function (dir) {
	if (dir == "left") {
		if (this._sIndex % 7 != 0) {
			this._sIndex --;
		} else {
			this._sIndex += 6;
		}
	} else if (dir == "right") {
		if (this._sIndex % 7 != 6) {
			this._sIndex ++;
		} else {
			this._sIndex -= 6;
		}
	} else if (dir == "up") {
		if (this._sIndex > 6) {
			this._sIndex -= 7;
		} else {
			this._sIndex += 28;
		}
	} else if (dir == "down") {
		if (this._sIndex < 28) {
			this._sIndex += 7;
		} else {
			this._sIndex -= 28;
		}
	}
	this.updateCursor();
}

PrizePickCardTable.prototype.update = function () {
	if 		(Input.isTriggered('ok') || (TouchInput.isTriggered() && this.handleClick(TouchInput._x, TouchInput._y))) this.choose();
	else if (Input.isTriggered('left'))  this.move('left');
	else if (Input.isTriggered('right')) this.move('right');
	else if (Input.isTriggered('up'))	 this.move('up');
	else if (Input.isTriggered('down'))  this.move('down');
}

PrizePickCardTable.prototype.updateCursor = function () {
	var row = Math.floor(this._sIndex / 7);
	var col = this._sIndex % 7;
	this._cursor.x = offset.x + col * (imageWidth + spacing.x);
	this._cursor.y = offset.y + row * (imageHeight + spacing.y);
};

PrizePickCardTable.prototype.handleClick = function (x, y) {
	var ox = offset.x, oy = offset.y;
	var sx = spacing.x, sy = spacing.y;
	var cx = imageWidth, cy = imageHeight;
	var index, changed;

	//for x's
	for (var i = 0; i < 7; i++) if (x > ox + (cx + sx) * i && x < ox + cx * (i + 1) + sx * i) index = i;
	if (index === undefined) return false;
	//for y's
	for (var i = 0; i < 5; i++) if (y > oy + (cy + sy) * i && y < oy + cy * (i + 1) + sy * i) index += i*7, changed = true;
	if (!changed) return false;

	this._sIndex = index;
	this.updateCursor();
	return true;
};

PrizePickCardTable.prototype.getTotalRemaining = function () {
	return this._blanks + this._hearts + this._clubs + this._diamonds + this._spades + this._roses;
}

PrizePickCardTable.prototype.choose = function () {
	var index = "" + Math.floor(this._sIndex / 7) + this._sIndex % 7;
	if (eval("this._card" + index + ".picked")) return;

	var card = Math.floor(Math.random() * this.getTotalRemaining());
	if (this.getTotalRemaining() === 35 && card < this._blanks) card = this._blanks + Math.floor(Math.random() * (35 - this._blanks));

	if 	(card < this._blanks) {
		card = "blank";
		this._blanks--;
		this._lost = true;
		AudioManager.playSe(sounds.lose);

	} else if (card < this._blanks + this._hearts) {
		card = "heart";
		this._hearts--;
		if (sounds.special) AudioManager.playSe(sounds.special[0]);

	} else if (card < this._blanks + this._hearts + this._clubs) {
		card = "club";
		this._clubs--;
		if (sounds.special) AudioManager.playSe(sounds.special[1]);

	} else if (card < this._blanks + this._hearts + this._clubs + this._diamonds) {
		card = "diamond";
		this._diamonds--;
		if (sounds.special) AudioManager.playSe(sounds.special[2]);

	} else if (card < this._blanks + this._hearts + this._clubs + this._diamonds + this._spades) {
		card = "spade";
		this._spades--;
		if (sounds.special) AudioManager.playSe(sounds.special[3]);

	} else {
		card = "rose";
		this._roses--;
		if (sounds.special) AudioManager.playSe(sounds.special[4]);
	}

	if (!this._lost && !sounds.special) AudioManager.playSe(sounds.confirm);

	// process image update
	var img = ImageManager.loadBitmap("img/prizepick/", "card-" + card);
	var x = eval("this._card" + index + ".x");
	var y = eval("this._card" + index + ".y");
	eval("this.removeChild(this._card" + index + ")");
	eval("this._card" + index + "= new Sprite(img)");
	eval("this._card" + index + ".x = " + x);
	eval("this._card" + index + ".y = " + y);
	eval("this._card" + index + ".picked = true");
	eval("this.addChildAt(this._card" + index + ", 0)");
};

//-----------------------------------------------------------------------------
// Window_PrizePickCommand
//
function Window_PrizePickCommand() {
	this.initialize.apply(this, arguments);
}

Window_PrizePickCommand.prototype = Object.create(Window_Command.prototype);
Window_PrizePickCommand.prototype.constructor = Window_PrizePickCommand;

Window_PrizePickCommand.prototype.makeCommandList = function () {
	this.addCommand(vocab.play, 'play', $gameParty.numItems($dataItems[ticketID]) > 0);
	this.addCommand(vocab.exit, 'exit');
};

Window_PrizePickCommand.prototype.open = function () {
	this.refresh();
	Window_Base.prototype.open.call(this);
};

//-----------------------------------------------------------------------------
// Window_PrizePickTickets
//
function Window_PrizePickTickets() {
	this.initialize.apply(this, arguments);
}

Window_PrizePickTickets.prototype = Object.create(Window_Base.prototype);
Window_PrizePickTickets.prototype.constructor = Window_PrizePickTickets;

Window_PrizePickTickets.prototype.initialize = function() {
	Window_Base.prototype.initialize.call(this, Graphics.boxWidth - 150, 0, 150, this.fittingHeight(1));
	this.show();
};

Window_PrizePickTickets.prototype.refresh = function() {
	var item = $dataItems[ticketID];
	var num = " x " + $gameParty.numItems(item);
	var width = this.contents.width - 6;
	this.contents.clear();

	//draw tickets
	this.drawText(num, 38, 0, width - 32, 'center');
	this.drawIcon(item.iconIndex, 6, 0);
};

Window_PrizePickTickets.prototype.show = function() {
	this.refresh();
	this.visible = true;
};

Window_PrizePickTickets.prototype.hide = function() {
	this.visible = false;
};

//-----------------------------------------------------------------------------
// Window_PrizePickResults
//
// The window for displaying the results of the minigame.

function Window_PrizePickResults() {
	this.initialize.apply(this, arguments);
}

Window_PrizePickResults.prototype = Object.create(Window_Base.prototype);
Window_PrizePickResults.prototype.constructor = Window_PrizePickResults;

Window_PrizePickResults.prototype.initialize = function() {
	Window_Base.prototype.initialize.call(this, 0, 0, Graphics.width * 2/3, Graphics.height);
	this.visible = false;
};

Window_PrizePickResults.prototype.displayLoss = function() {
	this.contents.clear();
	this.drawText(vocab.loseText, 0, 0, this.width - this.standardPadding()*2, 'center');
};

Window_PrizePickResults.prototype.displayWin = function(prizes) {
	this.contents.clear();
	this.drawText(vocab.winText, 0, 0, this.width - this.standardPadding()*2, 'center');

	for (var i = 0; i < prizes.length; i++) {
		if (prizes[i].number > 1) {
			this.drawIcon(prizes[i].iconIndex, (this.width - this.standardPadding()*2 - Window_Base._iconWidth - 4 - this.textWidth(prizes[i].name + " x " + prizes[i].number) - 2) / 2, this.lineHeight() * (i + 1) + 2);
			this.drawText(prizes[i].name + " x " + prizes[i].number, (this.width - this.standardPadding()*2 - Window_Base._iconWidth - 4 - this.textWidth(prizes[i].name + " x " + prizes[i].number) - 2) / 2 + Window_Base._iconWidth + 4, this.lineHeight() * (i + 1), this.width - this.standardPadding()*2 - Window_Base._iconWidth - 4);
		} else {
			this.drawIcon(prizes[i].iconIndex, (this.width - this.standardPadding()*2 - Window_Base._iconWidth - 4 - this.textWidth(prizes[i].name) - 2) / 2, this.lineHeight() * (i + 1) + 2);
			this.drawText(prizes[i].name, (this.width - this.standardPadding()*2 - Window_Base._iconWidth - 4 - this.textWidth(prizes[i].name) - 2) / 2 + Window_Base._iconWidth + 4, this.lineHeight() * (i + 1), this.width - this.standardPadding()*2 - Window_Base._iconWidth - 4);
		}
	}
};

/* END */
})();