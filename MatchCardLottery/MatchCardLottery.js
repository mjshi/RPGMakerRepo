//==============================================================================
// MatchCardLottery.js
//==============================================================================
 
var Imported = Imported || {};
Imported.MatchCardLottery = true;
 
var MCLottery = {};
 
/*:
* @plugindesc A scratch-card-lottery-like minigame!
* @author mjshi
* 
* @requiredAssets img/matchcard/cursor.png
* @requiredAssets img/matchcard/card_back.png
* @requiredAssets img/matchcard/card_highlight.png
*
* @param ---Configuration---
*
* @param Ticket Item ID
* @desc The item to consume as a "ticket" for purchasing scratch cards.
* @default 1
*
* @param Wild Card Image
* @desc Image to use as the wild card.
* Images MUST be saved as img/matchcard/IMAGE_NAME.png
* @default star
*
* @param Card Types
* @desc List of card face images.
* Images MUST be saved as img/matchcard/IMAGE_NAME.png
* @default spade, diamond, club, heart
*
* @param Prizes List
* @desc (number to give)(i/w/a)(item id) -OR- (numberofgold)g, i=item, w=weapon, a=armor, g=gold. See Help for more info.
* @default 2i3 1000g, 1w2, 2a1, 200g
*
* @param Card Image Resolution
* @desc Width x Height of card images.
* @default 152 x 192
*
* @param Card Window Offset
* @desc How much to offset the cards.
* x, y
* @default 10, 10
*
* @param Personal Space
* @desc Amount of personal space to give to each card.
* x, y
* @default 5, 5
*
* @param ---Other things---
*
* @param Custom Background
* @desc Should a custom background be used? (yes/no)
* Background MUST be saved as img/matchcard/bg.png
* @default no
*
* @param Confirm SE
* @desc The SE that plays when the player selects a card.
* filename, pan, pitch, volume
* @default Book1, 0, 100, 100
* 
* @param Win SE
* @desc The SE that plays when the player wins a prize. Leave blank to disable.
* filename, pan, pitch, volume
* @default Applause1, 0, 100, 100
* 
* @param Currency Icon
* @desc Icon to use for monetary prizes
* @default 313
*
* @param Currency Name
* @desc Name to use for monetary prizes
* @default Gold
*
* @param No More Tickets
* @desc Text that displays when the player doesn't have any more tickets. Leave blank to handle this yourself.
* @default You're out of tickets!
*
* @param ---Starter Cards---
* @default
*
* @param Winners Each Set
* @desc Max 7 to 9, depending on # of wild cards. How many of the same card should each set start with? Rest will be randomly generated.
* @default 3
*
* @param Wild Cards Each Set
* @desc Max 2. How many wild cards should each set start with?
* @default 2
*
* @param ---Prize List Options---
* @default
*
* @param Category Text
* @desc Text to show for each category of prizes. %TYPE will be replaced by the card type.
* @default 3 %TYPEs
*
* @param Header Text
* @desc Text to show at the top of the prize list.
* @default Prizes
*
* @param Header Font Size
* @desc Font size of the title text.
* @default 36
*
* @param Header Font Outline
* @desc Thickness of the title text font outline.
* @default 5
*
* @param Font Size
* @desc Font size of the text in the prize list.
* @default 24
*
* @param Font Outline
* @desc Thickness of the font outline. Make this smaller for smaller font sizes!
* @default 4
*
* @param ---Results Window---
* @default
*
* @param Win Text
* @desc Text that shows when the player wins a prize.
* @default You won! Here's what you got:
*
* @param Adjust Win Buffer
* @desc Use if your win text is getting cut off.
* @default 40
*
* @param Lose Text
* @desc Text that shows when the player doesn't win anything.
* @default You didn't win anything...
*
* @param Adjust Lose Buffer
* @desc Use if your lose text is getting cut off.
* @default 40
*
* @param Replay Command Text
* @desc Text to show for the replay command
* @default Replay
*
* @param Exit Command Text
* @desc Text to show for the exit command
* @default Exit
*
* @help 
* ------------------------------------------------------------------------------
*   Match Card Lottery Minigame v1.01a by mjshi
*   Free for both commercial and non-commercial use, with credit.
* ------------------------------------------------------------------------------
*   Installation: Extract the included folder to the img/ directory.
*   I also recommend that you use the Book1_fast SE included in that folder,
*   it works much better than the original Book1 SE.
* ------------------------------------------------------------------------------
*                               How To Play
* ------------------------------------------------------------------------------
*   Match Card Lottery has rules similar to a scratch-card lottery.
*   If you match 3 of the same card, you get a prize!
*   
*   Wild Cards have a special property: they copy the other cards that you
*   picked. So if you flip over a clover, a star, and another clover, and your
*   wild card was the star, you still get the clover prize. Same thing happens
*   with flipping over a star, a clover, and another star.
*
* ------------------------------------------------------------------------------
*                         Prize List Configuration
* ------------------------------------------------------------------------------
*   Prize Notation: #(i/w/a)# -OR- #g
*   i = item, w = weapon, a = armor, g = gold
*
*   ex: 2i1 means the prize is 2 of item 1
*       1w3 means the prize is 1 of weapon 3
*
*   Shorthand if you're only giving 1 of something: 1w3 = w3, 1i5 = i5, etc
*
*   Multiple prizes can be given via spaces, as long as there isn't a comma
*   separating them.
*
*     ex: 2i1 1w3 2000g will give 2 of item 1, 1 of weapon 3, and 2000g.
*
*   The prizes must correspond to the Card Types List. So if that list is
*     spade, diamond, club, heart
*
*   then your prize list of
*     2i3 1000g, 1w2, 2a1, 200g
*
*   means that getting the spade prize will give you 2 of item 3 and 1000 G,
*   and getting the diamond prize will give you 1 of weapon id 2, and so on.
*
* ------------------------------------------------------------------------------
*                           Running the Minigame
* ------------------------------------------------------------------------------
*   The minigame runs via plugin command.
*     MatchCardLottery
*
*   Alternatively, you can call the minigame with different starter card
*   parameters:
*     MatchCardLottery 4 2
*   would start a game that had a guaranteed 4 starter cards and 2 wild cards.
*
*   The prize pool can also be changed via plugin command while in-game. Use
*     MCLotteryPrizes PARAMETERS
*   and replace PARAMETERS with the usual 2i3 1000g, 1w2, 2a1, 200g etc.
*
* ------------------------------------------------------------------------------
*   Update Notes
* ------------------------------------------------------------------------------
* > update 1.0  - plugin released
* > update 1.01 - Added option to use a custom background and change the replay
*   window's command text
*
* ------------------------------------------------------------------------------
*
* > Is something broken? Go to http://mjshi.weebly.com/contact.html and I'll
*   try my best to help you!
*/

Array.prototype.shuffle = function() {
	for (var i = this.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = this[i];
		this[i] = this[j];
		this[j] = temp;
	}
}

MCLottery.params = PluginManager.parameters('MatchCardLottery');
MCLottery.types = (String(MCLottery.params['Card Types'])).split(", ");
MCLottery.types.unshift(String(MCLottery.params['Wild Card Image']));
MCLottery.prizes = String(MCLottery.params['Prizes List']);
MCLottery.imageSize = (String(MCLottery.params['Card Image Resolution'])).split(" x ");
MCLottery.imageSize = [Number(MCLottery.imageSize[0]), Number(MCLottery.imageSize[1])];
MCLottery.offset = (String(MCLottery.params['Card Window Offset'])).split(", ");
MCLottery.offset = [Number(MCLottery.offset[0]), Number(MCLottery.offset[1])];
MCLottery.spacing = (String(MCLottery.params['Personal Space'])).split(", ");
MCLottery.spacing = [Number(MCLottery.spacing[0]), Number(MCLottery.spacing[1])];

MCLottery.ticketID = Number(MCLottery.params['Ticket Item ID']);
MCLottery.confirmSE = (String(MCLottery.params['Confirm SE'])).split(", ");
MCLottery.confirmSE = {name: MCLottery.confirmSE[0], pan: Number(MCLottery.confirmSE[1]), pitch: Number(MCLottery.confirmSE[2]), volume: Number(MCLottery.confirmSE[3])}
if (String(MCLottery.params['Win SE']) == "") {
	MCLottery.winSE = false;
} else {
	MCLottery.winSE = (String(MCLottery.params['Win SE'])).split(", ");
	MCLottery.winSE = {name: MCLottery.winSE[0], pan: Number(MCLottery.winSE[1]), pitch: Number(MCLottery.winSE[2]), volume: Number(MCLottery.winSE[3])}
}

MCLottery.startCards = Number(MCLottery.params['Winners Each Set']);
MCLottery.wildCards = Number(MCLottery.params['Wild Cards Each Set']);
if (MCLottery.wildCards > 2) MCLottery.wildCards = 2;
if (MCLottery.startCards + MCLottery.wildCards > 9) MCLottery.startCards = 9 - MCLottery.wildCards;
MCLottery.customBG = (String(MCLottery.params['Custom Background']) == "yes");

MCLottery.goldIcon = Number(MCLottery.params['Currency Icon']);
MCLottery.goldName = String(MCLottery.params['Currency Name']);
MCLottery.noTicketsText = String(MCLottery.params['No More Tickets']);

MCLottery.hText = String(MCLottery.params['Header Text']);
MCLottery.hFontSize = Number(MCLottery.params['Header Font Size']);
MCLottery.hFontOutline = Number(MCLottery.params['Header Font Outline']);

MCLottery.cText = (String(MCLottery.params['Category Text'])).split("%TYPE");
MCLottery.fontSize = Number(MCLottery.params['Font Size']);
MCLottery.fontOutline = Number(MCLottery.params['Font Outline']);

MCLottery.winText = String(MCLottery.params['Win Text']);
MCLottery.loseText = String(MCLottery.params['Lose Text']);
MCLottery.adjustWBuffer = Number(MCLottery.params['Adjust Win Buffer']);
MCLottery.adjustLBuffer = Number(MCLottery.params['Adjust Lose Buffer']);
MCLottery.replayCmd = String(MCLottery.params['Replay Command Text']);
MCLottery.exitCmd = String(MCLottery.params['Exit Command Text']);

MCLottery.setPrizes = function (list) {
	var prizes = list.split(", ");
	for (var j = 0; j < prizes.length; j++) {
		prizes[j] = prizes[j].split(" ");
		var found, n;
		for (var k = 0; k < prizes[j].length; k++) {
			n = parseInt(prizes[j][k]);
			if ((found = prizes[j][k].match(/([iwa])([0-9]+)/)) !== null) {
				switch (found[1]) {
					case "i":
						prizes[j][k] = {iconIndex: $dataItems[Number(found[2])].iconIndex, name: $dataItems[Number(found[2])].name, item: "$gameParty.gainItem($dataItems[" + Number(found[2]) + "], "};
						break;
					case "w":
						prizes[j][k] = {iconIndex: $dataWeapons[Number(found[2])].iconIndex, name: $dataWeapons[Number(found[2])].name, item: "$gameParty.gainItem($dataWeapons[" + Number(found[2]) + "], "};
						break;
					case "a":
						prizes[j][k] = {iconIndex: $dataArmors[Number(found[2])].iconIndex, name: $dataArmors[Number(found[2])].name, item: "$gameParty.gainItem($dataArmors[" + Number(found[2]) + "], "};
						break;
				}
				if (isNaN(n)) n = 1;
				prizes[j][k].number = n;
				prizes[j][k].item += n + ");";

			} else if (!isNaN(n)) {
				prizes[j][k] = {iconIndex: MCLottery.goldIcon, number: n, name: MCLottery.goldName, item: "$gameParty.gainGold(" + n + ");"};

			} else {throw new Error('MatchCardLottery: Could not read prizes. Re-check formatting.')}
		}
	}
	MCLottery.prizes = prizes;
	if (MCLottery.types.length - 1 != MCLottery.prizes.length) throw new Error('MatchCardLottery: There must be a prize for each card type.');
}

//-----------------------------------------------------------------------------
// Scene_MatchCardLottery
//
// Scene for the Match Card Lottery minigame

function Scene_MatchCardLottery() {
	this.initialize.apply(this, arguments);
}

Scene_MatchCardLottery.prototype = Object.create(Scene_Base.prototype);
Scene_MatchCardLottery.prototype.constructor = Scene_MatchCardLottery;

Scene_MatchCardLottery.prototype.initialize = function () {
	Scene_Base.prototype.initialize.call(this);
};

Scene_MatchCardLottery.prototype.create = function () {
	Scene_Base.prototype.create.call(this);
	this.createBackground();
	this.createCardWindow();
	this.createPrizeWindow();
	this.createWindowLayer();
	this.createReplayWindow();
};

Scene_MatchCardLottery.prototype.createBackground = function() {
	this._backgroundSprite = new Sprite();
	this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
	this.addChild(this._backgroundSprite);

	if (MCLottery.customBG) this.addChild(new Sprite(ImageManager.loadBitmap("img/matchcard/", "bg")));
};

Scene_MatchCardLottery.prototype.createPrizeWindow = function() {
	var cardWindowWidth = MCLottery.imageSize[0] * 3 + MCLottery.spacing[0] * 3 + MCLottery.offset[0] * 2;
	var width = Graphics.width - cardWindowWidth;
	this._prizeWindow = new Sprite(new Bitmap(width, Graphics.height));
	this._prizeWindow.x = cardWindowWidth;
	this.addChild(this._prizeWindow);

	var x = 20;
	var y = 20;
	this._prizeWindow.bitmap.outlineColor = 'black';
	this._prizeWindow.bitmap.fontSize = MCLottery.hFontSize;
	this._prizeWindow.bitmap.outlineWidth = MCLottery.hFontOutline;
	this._prizeWindow.bitmap.drawText(MCLottery.hText, 0, y, width, 36, 'center');
	y += 45;

	this._prizeWindow.bitmap.fontSize =  MCLottery.fontSize;
	this._prizeWindow.bitmap.outlineWidth = MCLottery.fontOutline;
	var prizes = MCLottery.prizes;
	var types = MCLottery.types;
	var bitmap = ImageManager.loadSystem('IconSet');
	var pw = Window_Base._iconWidth;
	var ph = Window_Base._iconHeight;
	var sx, sy;

	for (var i = 0; i < prizes.length; i++) {
		this._prizeWindow.bitmap.drawText(MCLottery.cText[0] + types[i + 1].charAt(0).toUpperCase() + types[i + 1].slice(1) + MCLottery.cText[1], 0, y, width, 36, 'center');
		y += 40;
		for (var j = 0; j < prizes[i].length; j++) {
			sx = prizes[i][j].iconIndex % 16 * pw;
			sy = Math.floor(prizes[i][j].iconIndex / 16) * ph;
			this._prizeWindow.bitmap.blt(bitmap, sx, sy, pw, ph, x, y + 2);
			this._prizeWindow.bitmap.drawText(prizes[i][j].name + " x " + prizes[i][j].number, x + Window_Base._iconWidth + 10, y, width, 36);
			y += 40;
		}
		y += 20;
	}
};

Scene_MatchCardLottery.prototype.createCardWindow = function () {
	this._cardWindow = new MatchCardSprite();
	this.addChild(this._cardWindow);
}

Scene_MatchCardLottery.prototype.createReplayWindow = function () {
	this._ticketWindow = new Window_MatchCardTickets(0, 0);
	this._ticketWindow.x = Graphics.width - this._ticketWindow.width;
	this.addWindow(this._ticketWindow);

	this._replayWindow = new Window_MatchCardReplayCommand(0, 0);
	this._resultsWindow = new Window_MatchCardResults();

	this._resultsWindow.x = (Graphics.width - this._resultsWindow.width) / 2;
	this._resultsWindow.y = (Graphics.height - this._resultsWindow.height - this._replayWindow.height) / 2;
	this.addWindow(this._resultsWindow);

	this._replayWindow.x = (Graphics.width - this._replayWindow.width) / 2;
	this._replayWindow.y = this._resultsWindow.y + this._resultsWindow.height;
	this._replayWindow.setHandler('replay',	this.replayCommand.bind(this));
	this._replayWindow.setHandler('exit',	this.cancelCommand.bind(this));
	this._replayWindow.setHandler('cancel', this.cancelCommand.bind(this));
	this.addWindow(this._replayWindow);
}

Scene_MatchCardLottery.prototype.update = function () {
	Scene_Base.prototype.update.call(this);
	if (!this._ticketWindow.visible) {
		if (Input.isTriggered('cancel')) SoundManager.playBuzzer();
		else if (Input.isTriggered('ok') || (TouchInput.isTriggered() && this._cardWindow.handleClick(TouchInput._x, TouchInput._y))) {
			this._cardWindow.choose();
			if (this._cardWindow._chosen.length == 3) this.checkWin();
		}
		else if (Input.isTriggered('left')) this._cardWindow.move('left');
		else if (Input.isTriggered('right')) this._cardWindow.move('right');
		else if (Input.isTriggered('up')) this._cardWindow.move('up');
		else if (Input.isTriggered('down')) this._cardWindow.move('down');
	}
};

Scene_MatchCardLottery.prototype.checkWin = function () {
	this._cardWindow.revealAll();
	this._cardWindow.highlightChosen();

	//win processing
	var lines = 1;
	var prizes = this._cardWindow.allSame();

	if (prizes === false) {
		var text = MCLottery.loseText;
	} else { //give the prizes
		if (MCLottery.winSE !== false) AudioManager.playSe(MCLottery.winSE);

		var text = MCLottery.winText;
		lines += prizes.length;
	    prizes.forEach(function(prize) {
	    	eval(prize.item);
	    });
	}

	// dynamic widths/heights
	this._resultsWindow.setText(text);
	this._resultsWindow.move(this._resultsWindow.x, this._resultsWindow.y, this._resultsWindow.textWidth(text) + (prizes === false ? MCLottery.adjustLBuffer : MCLottery.adjustWBuffer), this._resultsWindow.fittingHeight(lines));
	this._resultsWindow.x = (Graphics.width - this._resultsWindow.width) / 2;
	this._resultsWindow.y = (Graphics.height - this._resultsWindow.height - this._replayWindow.height) / 2;
	this._replayWindow.x = (Graphics.width - this._replayWindow.width) / 2;
	this._replayWindow.y = this._resultsWindow.y + this._resultsWindow.height;

	//draw the prizes
	for (var i = 0; i < prizes.length; i++) {
		this._resultsWindow.drawItemName(prizes[i], 0, this._resultsWindow.fittingHeight(i));
	}

	//create windows
	this._ticketWindow.show();
	this._resultsWindow.visible = true;
	this._replayWindow.refresh();
	this._replayWindow.open();
	this._replayWindow.activate();
}

Scene_MatchCardLottery.prototype.replayCommand = function () {
	this._ticketWindow.hide();
	this._resultsWindow.visible = false;
	this._replayWindow.close();
	this._cardWindow.reset();
	$gameParty.loseItem($dataItems[MCLottery.ticketID], 1);
}

Scene_MatchCardLottery.prototype.cancelCommand = function () {
	this.popScene();
}

//-----------------------------------------------------------------------------
// Window_MatchCardResults
//
// The window for displaying the results of the minigame.

function Window_MatchCardResults() {
	this.initialize.apply(this, arguments);
}

Window_MatchCardResults.prototype = Object.create(Window_Base.prototype);
Window_MatchCardResults.prototype.constructor = Window_MatchCardResults;

Window_MatchCardResults.prototype.initialize = function() {
	Window_Base.prototype.initialize.call(this, 0, 0, Graphics.width, Graphics.height);
	this.visible = false;
};

Window_MatchCardResults.prototype.setText = function(text) {
	this.contents.clear();
	this.drawText(text, 0, 0, this.width);
};

Window_MatchCardResults.prototype.drawItemName = function(item, x, y, width) {
	width = this.width;
	if (item) {
		var iconBoxWidth = Window_Base._iconWidth + 4;
		var x = (this.width - iconBoxWidth - this.textWidth(item.name + " x " + item.number) - 2 - MCLottery.adjustWBuffer) / 2;
		this.resetTextColor();
		this.drawIcon(item.iconIndex, x + 2, y + 2);
		this.drawText(item.name + " x " + item.number, x + iconBoxWidth, y, width - iconBoxWidth);
	}
};

//-----------------------------------------------------------------------------
// Window_ReplayCommand
//
// Replay command window for the Match Card Minigame

function Window_MatchCardReplayCommand() {
	this.initialize.apply(this, arguments);
}

Window_MatchCardReplayCommand.prototype = Object.create(Window_Command.prototype);
Window_MatchCardReplayCommand.prototype.constructor = Window_MatchCardReplayCommand;

Window_MatchCardReplayCommand.prototype.initialize = function (x, y) {
	Window_Command.prototype.initialize.call(this, x, y);
	this.openness = 0;
};

Window_MatchCardReplayCommand.prototype.makeCommandList = function () {
	this.addCommand(MCLottery.replayCmd, 'replay', $gameParty.numItems($dataItems[MCLottery.ticketID]) > 0);
	this.addCommand(MCLottery.exitCmd, 'exit');
};

//-----------------------------------------------------------------------------
// Window_MatchCardTickets
//
// The window for displaying how many tickets the player has left

function Window_MatchCardTickets() {
	this.initialize.apply(this, arguments);
}

Window_MatchCardTickets.prototype = Object.create(Window_Base.prototype);
Window_MatchCardTickets.prototype.constructor = Window_MatchCardTickets;

Window_MatchCardTickets.prototype.initialize = function(x, y) {
	var width = 150;
	var height = this.fittingHeight(1);
	Window_Base.prototype.initialize.call(this, x, y, width, height);
	this.visible = false;
	this.refresh();
};

Window_MatchCardTickets.prototype.refresh = function() {
	var item = $dataItems[MCLottery.ticketID];
	var num = " x " + $gameParty.numItems(item);
	var width = this.contents.width - 6;
	this.contents.clear();

	//draw tickets
	this.drawText(num, 38, 0, width - 32, 'center');
	this.drawIcon(item.iconIndex, 6, 0);
};

Window_MatchCardTickets.prototype.show = function() {
	this.refresh();
	this.visible = true;
};

Window_MatchCardTickets.prototype.hide = function() {
	this.visible = false;
};

//-----------------------------------------------------------------------------
// MatchCardSprite
//
// Match Card Lottery "window"

function MatchCardSprite() {
	this.initialize.apply(this, arguments);
}

MatchCardSprite.prototype = Object.create(Sprite.prototype);
MatchCardSprite.prototype.constructor = MatchCardSprite;

MatchCardSprite.prototype.initialize = function () {
	Sprite.prototype.initialize.call(this);
	this.loadCards();
	this.loadCursor();
	this.createBoard();
}

MatchCardSprite.prototype.reset = function () {
	this.children = [];
	this.loadCards();
	this.loadCursor();
	this.createBoard();
}

MatchCardSprite.prototype.loadCards = function () {
	var img = ImageManager.loadBitmap("img/matchcard/", "card_back");
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			eval("this._card" + i + j + "= new Sprite(img);");
			eval("this._card" + i + j + ".x = " + MCLottery.offset[0] + " + j * (" + MCLottery.imageSize[0] + " + " + MCLottery.spacing[0] + ");");
			eval("this._card" + i + j + ".y = " + MCLottery.offset[1] + " + i * (" + MCLottery.imageSize[1] + " + " + MCLottery.spacing[1] + ");");
			eval("this.addChild(this._card" + i + j + ");");
		}
	}
}

MatchCardSprite.prototype.loadCursor = function () {
	var img = ImageManager.loadBitmap("img/matchcard/", "cursor");
	this._cursor = new Sprite(img);
	this._cursor.x = MCLottery.offset[0];
	this._cursor.y = MCLottery.offset[1];
	this.addChild(this._cursor);
}

MatchCardSprite.prototype.createBoard = function () {
	var types = MCLottery.types;
	var wildCard = types[0];
	var startCard = types[Math.floor(Math.random() * (types.length - 1)) + 1];
	this._board = [];

	if (MCLottery.wildCards) for (var i = 0; i < MCLottery.wildCards; i++) this._board.push(wildCard);
	if (MCLottery.startCards) for (var i = 0; i < MCLottery.startCards; i++) this._board.push(startCard);

	var card;
	if (MCLottery.startCards == 3) {
		while (this._board.length < 9) {
			card = types[Math.floor(Math.random() * types.length)];
			if (card != startCard && this.noMoreThan(2, card)) this._board.push(card);
		}
	} else {
		while (this._board.length < 9) {
			card = types[Math.floor(Math.random() * types.length)];
			if ((card != startCard && this.noMoreThan(2, card)) || (card == startCard && this.noMoreThan(3, card))) this._board.push(card);
		}
	}

	this._board.shuffle();
	this._chosen = [];
	this._sIndex = 0;
}

MatchCardSprite.prototype.noMoreThan = function (num, card) {
	var count = 0;
	for (var i = 0; i < this._board.length; i++) {
		if (this._board[i] == card) count ++;
	}
	return (count < num);
}

MatchCardSprite.prototype.move = function (dir) {
	if (dir == "left") {
		if (this._sIndex % 3 != 0) {
			this._sIndex --;
		} else {
			this._sIndex += 2;
		}
	} else if (dir == "right") {
		if (this._sIndex % 3 != 2) {
			this._sIndex ++;
		} else {
			this._sIndex -= 2;
		}
	} else if (dir == "up") {
		if (this._sIndex > 2) {
			this._sIndex -= 3;
		} else {
			this._sIndex += 6;
		}
	} else if (dir == "down") {
		if (this._sIndex < 6) {
			this._sIndex += 3;
		} else {
			this._sIndex -= 6;
		}
	}
	this.updateCursor();
}

MatchCardSprite.prototype.updateCursor = function () {
	var row = Math.floor(this._sIndex / 3);
	var col = this._sIndex % 3;
	this._cursor.x = MCLottery.offset[0] + col * (MCLottery.imageSize[0] + MCLottery.spacing[0]);
	this._cursor.y = MCLottery.offset[1] + row * (MCLottery.imageSize[1] + MCLottery.spacing[1]);
};

MatchCardSprite.prototype.choose = function () {
	if (this._chosen.length == 3) return;

	if (!this._chosen.contains(this._sIndex)) {
		this._chosen.push(this._sIndex);
		this.updateCardFace();

		AudioManager.playSe(MCLottery.confirmSE);

		this.removeChild(this._cursor);
		this.addChild(this._cursor);

	} else {
		SoundManager.playBuzzer();
	}
};

MatchCardSprite.prototype.handleClick = function (x, y) {
	var ox = MCLottery.offset[0], oy = MCLottery.offset[1];
	var sx = MCLottery.spacing[0], sy = MCLottery.spacing[1];
	var cx = MCLottery.imageSize[0], cy = MCLottery.imageSize[1];
	var index, changed;

	//for x's
	for (var i = 0; i < 3; i++) if (x > ox + (cx + sx) * i && x < ox + cx * (i + 1) + sx * i) index = i;
	if (index === undefined) return false;
	//for y's
	for (var i = 0; i < 3; i++) if (y > oy + (cy + sy) * i && y < oy + cy * (i + 1) + sy * i) index += i*3, changed = true;
	if (!changed) return false;

	this._sIndex = index;
	this.updateCursor();
	return true;
};

MatchCardSprite.prototype.highlightChosen = function () {
	this.removeChild(this._cursor);

	var row, col;
	var img = ImageManager.loadBitmap("img/matchcard/", "card_highlight");
	
	for (var i = 0; i < this._chosen.length; i++) {
		eval("var highlight" + i + " = new Sprite(img);");
		row = Math.floor(this._chosen[i] / 3);
		col = this._chosen[i] % 3;
		eval("highlight" + i + ".x = " + MCLottery.offset[0] + " + col * (" + MCLottery.imageSize[0] + " + " + MCLottery.spacing[0] + ");");
		eval("highlight" + i + ".y = " + MCLottery.offset[1] + " + row * (" + MCLottery.imageSize[1] + " + " + MCLottery.spacing[0] + ");");
		this.addChild(eval("highlight" + i));
	}
};

MatchCardSprite.prototype.revealAll = function () {
	var row, col;
	var img, i;
	
	// AudioManager.playSe(MCLottery.confirmSE);
	for (var j = 0; j < 9; j++) {
		if (!this._chosen.contains(j)) {
			this._sIndex = j;
			this.updateCardFace();
		}
	}
}

MatchCardSprite.prototype.allSame = function () {
	var chosen = [this._board[this._chosen[0]], this._board[this._chosen[1]], this._board[this._chosen[2]]];
	var indx = chosen.indexOf(MCLottery.types[0]);
	while (indx !== -1) {
		chosen.splice(indx, 1);
		indx = chosen.indexOf(MCLottery.types[0]);
	}

	for (var i = 1; i < chosen.length; i++) {
		if (chosen[i] !== chosen[0]) return false;
	}
	return MCLottery.prizes[MCLottery.types.indexOf(chosen[0]) - 1];
}

MatchCardSprite.prototype.updateCardFace = function () {
	var img = ImageManager.loadBitmap("img/matchcard/", this._board[this._sIndex]);
	var i = "" + Math.floor(this._sIndex / 3) + this._sIndex % 3;
	var x = eval("this._card" + i + ".x");
	var y = eval("this._card" + i + ".y");
	eval("this.removeChild(this._card" + i + ");");
	eval("this._card" + i + "= new Sprite(img);");
	eval("this._card" + i + ".x = " + x + ";");
	eval("this._card" + i + ".y = " + y + ";");
	eval("this.addChild(this._card" + i + ");");
}

//-----------------------------------------------------------------------------
// PluginCommand Override
//

var MCLottery_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function (command, args) {
	MCLottery_Game_Interpreter_pluginCommand.call(this, command, args);
	if (command === "MCLotteryPrizes") {
		var prizes = "";
		for (var i = 0; i < args.length; i++) {
			prizes += args[i] + " ";
		}
		prizes = prizes.trim();
		MCLottery.setPrizes(prizes);
		if (MCLottery.prizes.length != MCLottery.types.length - 1) {throw new Error('MatchCardLottery: Error setting new prizes-- there must be a prize for each card type.');}

	} else if (command === "MatchCardLottery" ) {
		if (Object.prototype.toString.call(MCLottery.prizes) === '[object String]') MCLottery.setPrizes(MCLottery.prizes);
		
		if ($gameParty.numItems($dataItems[MCLottery.ticketID]) > 0) {
			
			if (!isNaN(args[0])) MCLottery.startCards = Number(args[0]);
			if (!isNaN(args[1])) MCLottery.wildCards = Number(args[1]);

			//prevent people from sneakily trying to break the script
			if (MCLottery.wildCards > 2) MCLottery.wildCards = 2;
			if (MCLottery.startCards + MCLottery.wildCards > 9) MCLottery.startCards = 9 - MCLottery.wildCards;

			if (MCLottery.types.length < 4) throw new Error('MatchCardLottery: You must have at least 4 card types.');
			if (MCLottery.types.length - 1 != MCLottery.prizes.length) throw new Error('MatchCardLottery: There must be a prize for each card type.');
			$gameParty.loseItem($dataItems[MCLottery.ticketID], 1);
			SceneManager.push(Scene_MatchCardLottery);

		} else {
			if (MCLottery.noTicketsText) $gameMessage.add(MCLottery.noTicketsText);
		}
	}
};