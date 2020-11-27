//==============================================================================
// NPCDialogueShop.js
//==============================================================================
 
var Imported = Imported || {};
Imported.NPCDialogueShop = true;

/*~struct~Shopkeeper:
 * @param image
 * @type file
 * @dir img/pictures/
 * @desc Shopkeeper image.
 *
 * @param position
 * @type struct<DimensionsXY>
 * @desc XY position of the shopkeeper.
 *
 * @param dialogue
 * @type struct<Dialogue>
 * @desc Flavor text that shows in the help window
 *
 */

/*~struct~Dialogue:
 * @param buy
 * @param sell
 * @param buy amount
 * @param sell amount
 * @param event
 * @param cancel
 *
 */

/*~struct~Dimensions:
 * @param x
 * @type number
 *
 * @param y
 * @type number
 *
 * @param width
 * @type number
 *
 * @param height
 * @type number
 *
 */

/*~struct~DimensionsNH:
 * @param x
 * @type number
 *
 * @param y
 * @type number
 *
 * @param width
 * @type number
 *
 */

/*~struct~DimensionsXY:
 * @param x
 * @type number
 *
 * @param y
 * @type number
 *
 */

/*:
* @plugindesc A dialogue-focused custom shop scene.
* Requires MV 1.5+
* @author mjshi
*
* @param Shopkeepers
* @type struct<Shopkeeper>[]
* @desc Array of shopkeepers.
* @default ["{\"image\":\"\",\"position\":\"{\\\"x\\\":\\\"625\\\",\\\"y\\\":\\\"20\\\"}\",\"dialogue\":\"{\\\"buy\\\":\\\"Anything catch your eye?\\\",\\\"sell\\\":\\\"I see you have something for me!\\\",\\\"buy amount\\\":\\\"How many would you like?\\\",\\\"sell amount\\\":\\\"Here, let me take that off you.\\\",\\\"event\\\":\\\"I heard something the other day...\\\",\\\"cancel\\\":\\\"Leaving already?\\\"}\"}"]
*
* @param Shopkeep Variable
* @type number
* @desc Variable that holds the index of the current shopkeeper.
* @default 1
*
* @param Layout
* @type select
* @option Custom
* @option Default MV
* @option Default 720p
* @option Alternate (tale)
* @option Shopkeep Display (gothicvoid)
* @option Reverse Shop Layout (Guardinthena)
* @option Front and Center Layout 720p (Guardinthena)
* @desc What window layout to use. Setting this to anything other than custom will ignore the dimensions given below.
* @default Custom
*
* @param Command Window
* @parent Layout
* @type struct<DimensionsNH>
* @default {"x":"10","y":"10","width":"500"}
*
* @param Gold Window
* @parent Layout
* @type struct<DimensionsNH>
* @default {"x":"510","y":"10","width":"240"}
*
* @param Item List
* @parent Layout
* @type struct<Dimensions>
* @default {"x":"10","y":"82","width":"500","height":"350"}
*
* @param Sell Item List
* @parent Layout
* @type struct<Dimensions>
* @default {"x":"10","y":"154","width":"500","height":"278"}
*
* @param Possessed Items
* @parent Layout
* @type struct<DimensionsNH>
* @default {"x":"510","y":"82","width":"240"}
*
* @param Actor Stat Window
* @parent Layout
* @type struct<Dimensions>
* @default {"x":"510","y":"154","width":"295","height":"218"}
*
* @param Help Window Lines
* @parent Layout
* @type number
* @desc Number of lines to show in the help/dialogue window
* @default 4
*
* @param No Equip Name
* @desc What to show if there aren't any people able to equip the item.
* @default None
*
* @param Font Params Decrement
* @desc How much smaller to make the parameters text.
* @type number
* @default 5
*
* @param Common Event Name
* @desc Title of the tab in the shop menu.
* @default Talk
*
* @param Common Event ID
* @desc Will be evaluated. Can be $gameVariables.value(ID) or a number. Set to none to not use.
* @default none
*
* @param Common Event Switch
* @desc Will be turned ON when a common event is called. Set to 0 to not use. Could be used with just statements to make a loop.
* @type number
* @default 1
*
* @param
* @help 
* ------------------------------------------------------------------------------
*   NPC Dialogue Shop v1.01d by mjshi
*   Free for both commercial and non-commercial use, with credit.
* ------------------------------------------------------------------------------
*   Installation: Place shopkeeper images in img/pictures, then define a 
*   shopkeeper in the list.
* ------------------------------------------------------------------------------
*     Setting Up Shop
* ------------------------------------------------------------------------------
*   Change the variable specified in Shopkeeper Variable to the index of your
*   NPC, in the Shopkeepers list. 1st NPC = 0, 2nd = 1, 3rd = 2, etc.
*   Then, call the shop as per normal!
*
*   An example event page: https://i.imgur.com/gtHZqUy.png
*
*   Text transcript in case the link goes down:
*     Label: Shop
*     Control Variables: #001 Shop NPC = 0 (to use the first NPC)
*     Shop Processing: Potion
*                      Magic Water
*                      Dispel Herb
*     If: Common Event Called is ON (if common event switch is on)
*       Control Switches: #001 Common Event Called = OFF
*       Common Event: Rumor Dialogue
*       Jump to Label: Shop
*     End
*
* ------------------------------------------------------------------------------
* > Is something broken? Go to http://mjshi.weebly.com/contact.html and I'll
*   try my best to help you!
*/

(function () {
/* BEGIN */

var params = PluginManager.parameters('NPCDialogueShop');

var layoutLibrary = {
	"Custom" : {
		"command" :	params['Command Window'],
		"gold" : 	params['Gold Window'],
		"items" : 	params['Item List'],
		"sell" : 	params['Sell Item List'],
		"bag" : 	params['Possessed Items'],
		"stats" : 	params['Actor Stat Window']
	},

	"Default MV" : {
		"command" :	`{"x":"10","y":"10","width":"500"}`,
		"gold" : 	`{"x":"510","y":"10","width":"240"}`,
		"items" : 	`{"x":"10","y":"82","width":"500","height":"350"}`,
		"sell" : 	`{"x":"10","y":"154","width":"500","height":"278"}`,
		"bag" : 	`{"x":"510","y":"82","width":"240"}`,
		"stats" : 	`{"x":"510","y":"154","width":"295","height":"218"}`
	},

	"Default 720p" : {
		"command" :	`{"x":"20","y":"20","width":"562"}`,
		"gold" : 	`{"x":"582","y":"168","width":"240"}`,
		"items" : 	`{"x":"20","y":"92","width":"562","height":"438"}`,
		"sell" : 	`{"x":"20","y":"164","width":"562","height":"366"}`,
		"bag" : 	`{"x":"582","y":"240","width":"255"}`,
		"stats" : 	`{"x":"582","y":"312","width":"350","height":"218"}`
	},

	"Alternate (tale)" : {
		"command" :	`{"x":"5","y":"5","width":"525"}`,
		"gold" : 	`{"x":"529","y":"5","width":"235"}`,
		"items" : 	`{"x":"5","y":"76","width":"525","height":"350"}`,
		"sell" : 	`{"x":"5","y":"147","width":"525","height":"279"}`,
		"bag" : 	`{"x":"529","y":"145","width":"235"}`,
		"stats" : 	`{"x":"529","y":"216","width":"275","height":"210"}`,
	},

	"Shopkeep Display (gothicvoid)" : {
		"command" :	`{"x":"10","y":"10","width":"350"}`,
		"gold" : 	`{"x":"360","y":"10","width":"200"}`,
		"items" : 	`{"x":"10","y":"82","width":"350","height":"350"}`,
		"sell" : 	`{"x":"10","y":"154","width":"500","height":"290"}`,
		"bag" : 	`{"x":"575","y":"10","width":"200"}`,
		"stats" : 	`{"x":"360","y":"223","width":"300","height":"210"}`,
	},

	"Reverse Shop Layout (Guardinthena)" : {
		"command" :	`{"x":"0","y":"0","width":"576"}`,
		"gold" : 	`{"x":"576","y":"0","width":"240"}`,
		"items" : 	`{"x":"316","y":"290","width":"500","height":"190"}`,
		"sell" : 	`{"x":"316","y":"362","width":"500","height":"190"}`,
		"bag" : 	`{"x":"35","y":"400","width":"240"}`,
		"stats" : 	`{"x":"521","y":"72","width":"295","height":"218"}`,
		"helpLines" : 3,
	},

	"Front and Center Layout 720p (Guardinthena)" : {
		"command" :	`{"x":"0","y":"0","width":"1280"}`,
		"gold" : 	`{"x":"20","y":"88","width":"240"}`,
		"items" : 	`{"x":"20","y":"160","width":"480","height":"400"}`,
		"sell" : 	`{"x":"20","y":"232","width":"480","height":"328"}`,
		"bag" : 	`{"x":"260","y":"88","width":"240"}`,
		"stats" : 	`{"x":"840","y":"328","width":"420","height":"230"}`,
		"helpLines" : 3,
	},
};

var shopkeepDatabase = JSON.parse(params['Shopkeepers']);
var layout = layoutLibrary[params["Layout"]];

var commandPos = 		JSON.parse(layout.command);
var goldPos = 			JSON.parse(layout.gold);
var itemListPos = 		JSON.parse(layout.items);
var sellItemListPos =	JSON.parse(layout.sell);
var possessPos = 		JSON.parse(layout.bag);
var actorStatPos = 		JSON.parse(layout.stats);

var helpLines = layout.helpLines || parseInt(params['Help Window Lines']);
var commonEventName = params['Common Event Name'];
var commonEventID = params['Common Event ID'];
var shopkeepNumber = parseInt(params['Shopkeep Variable']);
var commonEventSwitch = parseInt(params['Common Event Switch']);
var noEquipName = params['No Equip Name'] || "None";
var fontDecrement = parseInt(params['Font Params Decrement']);

var alias_shopinit = Scene_Shop.prototype.initialize;
Scene_Shop.prototype.initialize = function() {
	alias_shopinit.call(this);
	this._NPCData = JSON.parse(shopkeepDatabase[$gameVariables.value(shopkeepNumber)]);
	this._dialogue = JSON.parse(this._NPCData.dialogue);
};

Scene_Shop.prototype.create = function() {
	Scene_MenuBase.prototype.create.call(this);

	this.createNPCBackground();
	this.createWindowLayer();

	this.createHelpWindow();
	this.createGoldWindow();
	this.createCommandWindow();
	this.createDummyWindow();
	this.createNumberWindow();
	this.createStatusWindow();
	this.createBuyWindow();
	this.createCategoryWindow();
	this.createSellWindow();
};


Scene_Shop.prototype.createHelpWindow = function() {
	this._helpWindow = new Window_Help(helpLines);
	this._helpWindow.x = 0;
	this._helpWindow.y = Graphics.boxHeight - this._helpWindow.height;

	this.addWindow(this._helpWindow);
};

Scene_Shop.prototype.createNPCBackground = function() {
	var shopkeep = $gameVariables.value(shopkeepNumber);
	this._NPC = new Sprite(ImageManager.loadPicture(this._NPCData.image));
	var position = JSON.parse(this._NPCData.position);
	this._NPC.x = position.x;
	this._NPC.y = position.y;

	this.addChild(this._NPC);
};

//-----------------------------------------------------------------
// Window_ShopGold class to extend alignment options without
// disrupting the diplay of other gold windows
//
function Window_ShopGold() {
    this.initialize.apply(this, arguments);
}
Window_ShopGold.prototype = Object.create(Window_Gold.prototype);
Window_ShopGold.prototype.constructor = Window_ShopGold;

Window_ShopGold.prototype.windowWidth = function() {
    return goldPos.width;
};
// END

Scene_Shop.prototype.createGoldWindow = function() {
	this._goldWindow = new Window_ShopGold(goldPos.x, goldPos.y);
	this.addWindow(this._goldWindow);
};

Window_ShopCommand.prototype.setDialogue = function(dialogue) {
	this._dialogue = dialogue;
};

Window_ShopCommand.prototype.updateHelp = function() {
	if (!this._dialogue) return;
	this._helpWindow.setText(this._dialogue[this.currentSymbol()]);
};

Scene_Shop.prototype.createCommandWindow = function() {
	this._commandWindow = new Window_ShopCommand(commandPos.width, this._purchaseOnly);
	this._commandWindow.x = commandPos.x;
	this._commandWindow.y = commandPos.y;

	this._commandWindow.setHandler('buy',    this.commandBuy.bind(this));
	this._commandWindow.setHandler('sell',   this.commandSell.bind(this));
	this._commandWindow.setHandler('event',   this.commandCommonEvent.bind(this));
	this._commandWindow.setHandler('cancel', this.popScene.bind(this));

	this._commandWindow.setHelpWindow(this._helpWindow);
	this._commandWindow.setDialogue(this._dialogue);
	this.addWindow(this._commandWindow);

	this._commandWindow.select(0);
};

Scene_Shop.prototype.setHelpToSymbol = function() {
	this._helpWindow.setText(this._dialogue[this._commandWindow.currentSymbol()]);
};

Scene_Shop.prototype.createDummyWindow = function() {
	this._dummyWindow = new Window_Base(itemListPos.x, itemListPos.y, itemListPos.width, itemListPos.height);
	this.addWindow(this._dummyWindow);
};

Scene_Shop.prototype.commandCommonEvent = function() {
	$gameSwitches.setValue(commonEventSwitch, true);
	if (commonEventID !== "none") $gameTemp.reserveCommonEvent(eval(commonEventID));
	this.popScene();
};

Window_ShopNumber.prototype.windowWidth = function() {
	return itemListPos.width;
};

Scene_Shop.prototype.createNumberWindow = function() {
	this._numberWindow = new Window_ShopNumber(this._dummyWindow.x, this._dummyWindow.y, this._dummyWindow.height);
	this._numberWindow.hide();
	this._numberWindow.setHandler('ok',     this.onNumberOk.bind(this));
	this._numberWindow.setHandler('cancel', this.onNumberCancel.bind(this));
	this.addWindow(this._numberWindow);
};

Scene_Shop.prototype.createStatusWindow = function() {
	this._possessionWindow = new Window_Base(possessPos.x, possessPos.y, possessPos.width, this._commandWindow.height);

	this._statusWindow = new Window_ShopStatus(actorStatPos.x, actorStatPos.y, actorStatPos.width, actorStatPos.height);
	this._statusWindow.setPossessionWindow(this._possessionWindow);
	this._statusWindow.setNumberWindow(this._numberWindow);
	this._statusWindow.hide();

	this.addWindow(this._statusWindow);
	this.addWindow(this._possessionWindow);
};

Window_ShopBuy.prototype.windowWidth = function() {
	return itemListPos.width;
};

Scene_Shop.prototype.createBuyWindow = function() {
	var wy = this._dummyWindow.y;
	var wh = this._dummyWindow.height;
	this._buyWindow = new Window_ShopBuy(itemListPos.x, itemListPos.y, itemListPos.height, this._goods);
	this._buyWindow.setHelpWindow(this._helpWindow);
	this._buyWindow.setStatusWindow(this._statusWindow);
	this._buyWindow.hide();
	this._buyWindow.setHandler('ok',     this.onBuyOk.bind(this));
	this._buyWindow.setHandler('cancel', this.onBuyCancel.bind(this));
	this.addWindow(this._buyWindow);
};

Scene_Shop.prototype.createCategoryWindow = function() {
	this._categoryWindow = new Window_NPCDialogueShopItemCategory();
	this._categoryWindow.setHelpWindow(this._helpWindow);
	this._categoryWindow.hide();
	this._categoryWindow.deactivate();
	this._categoryWindow.setHandler('ok',     this.onCategoryOk.bind(this));
	this._categoryWindow.setHandler('cancel', this.onCategoryCancel.bind(this));
	this.addWindow(this._categoryWindow);
};

Scene_Shop.prototype.createSellWindow = function() {
	this._sellWindow = new Window_ShopSell(sellItemListPos.x, sellItemListPos.y, sellItemListPos.width, sellItemListPos.height);
	this._sellWindow.z = 2;
	this._sellWindow.setHelpWindow(this._helpWindow);
	this._sellWindow.hide();
	this._sellWindow.setHandler('ok',     this.onSellOk.bind(this));
	this._sellWindow.setHandler('cancel', this.onSellCancel.bind(this));
	this._categoryWindow.setItemWindow(this._sellWindow);
	this.addWindow(this._sellWindow);
};

Scene_Shop.prototype.onBuyOk = function() {
    this._item = this._buyWindow.item();
    this._buyWindow.hide();
    this._numberWindow.setup(this._item, this.maxBuy(), this.buyingPrice());
    this._numberWindow.setCurrencyUnit(this.currencyUnit());
    this._numberWindow.show();
    this._numberWindow.activate();
    this._statusWindow.setItem(this._item);
    this._statusWindow.hide();
    this._possessionWindow.show();

	this._helpWindow.setText(this._dialogue[(this._commandWindow.currentSymbol() + ' amount')]);
};

Scene_Shop.prototype.onSellOk = function() {
    this._item = this._sellWindow.item();
    this._categoryWindow.hide();
    this._sellWindow.hide();
    this._numberWindow.setup(this._item, this.maxSell(), this.sellingPrice());
    this._numberWindow.setCurrencyUnit(this.currencyUnit());
    this._numberWindow.show();
    this._numberWindow.activate();
    this._statusWindow.setItem(this._item);
    this._statusWindow.hide();
    this._possessionWindow.show();

	this._helpWindow.setText(this._dialogue[(this._commandWindow.currentSymbol() + ' amount')]);
};

Scene_Shop.prototype.onBuyCancel = function() {
	this._commandWindow.activate();
	this._dummyWindow.show();
	this._buyWindow.hide();
	this._statusWindow.hide();
	this._statusWindow.setItem(null);
};

Scene_Shop.prototype.onSellCancel = function() {
	this._sellWindow.deselect();
	this._categoryWindow.activate();
	this._statusWindow.setItem(null);
	this.setHelpToSymbol();
};

//-----------------------------------------------------------------------------
// Window_NPCDialogueShopItemCategory
//
function Window_NPCDialogueShopItemCategory() {
	this.initialize.apply(this, arguments);
}
Window_NPCDialogueShopItemCategory.prototype = Object.create(Window_ItemCategory.prototype);
Window_NPCDialogueShopItemCategory.prototype.constructor = Window_NPCDialogueShopItemCategory;
Window_NPCDialogueShopItemCategory.prototype.initialize = function() {
	Window_HorzCommand.prototype.initialize.call(this, itemListPos.x, itemListPos.y);
};
Window_NPCDialogueShopItemCategory.prototype.windowWidth = function() {
	return itemListPos.width;
};
Window_NPCDialogueShopItemCategory.prototype.updateHelp = function() {
};

//-----------------------------------------------------------------------------
// Window_ShopStatus
//
Window_ShopStatus.prototype.setNumberWindow = function(numberWindow) {
	this._numberWindow = numberWindow;
};
Window_ShopStatus.prototype.setPossessionWindow = function(possessionWindow) {
	this._possessionWindow = possessionWindow;
};

Window_ShopStatus.prototype.drawPossession = function(x, y) {
	this._possessionWindow.contents.clear();

	var width = this._possessionWindow.contents.width - this._possessionWindow.textPadding() - x;
	var possessionWidth = this._possessionWindow.textWidth('0000');
	this._possessionWindow.changeTextColor(this._possessionWindow.systemColor());
	this._possessionWindow.drawText(TextManager.possession, x, y, width - possessionWidth);
	this._possessionWindow.resetTextColor();
	this._possessionWindow.drawText($gameParty.numItems(this._item), x, y, width, 'right');
};

Window_ShopStatus.prototype.setItem = function(item) {
    this._currentIndex = 0;
    this._item = item;
    this.refresh();
};

var alias_shopstatus_show = Window_ShopStatus.prototype.show;
Window_ShopStatus.prototype.show = function() {
	alias_shopstatus_show.call(this);
	this._possessionWindow.show();
};

var alias_shopstatus_hide = Window_ShopStatus.prototype.hide;
Window_ShopStatus.prototype.hide = function() {
	alias_shopstatus_hide.call(this);
	this._possessionWindow.hide();
};

Window_ShopStatus.prototype.refresh = function() {
	this.contents.clear();
	if (this._item) {
		var x = this.textPadding();
		this.drawPossession(x, 0);
		if (this.isEquipItem()) {
			this.drawEquipInfo(x, 0);
		}
	}
};

Window_ShopStatus.prototype.statusMembers = function() {
	return $gameParty.members().filter(function(actor) {
        return actor.canEquip(this._item);
    }, this);
};

Window_ShopStatus.prototype.drawEquipInfo = function(x, y) {
	this.changePaintOpacity(true);
    this.resetTextColor();
    this.resetFontSettings();

	var actor = this.statusMembers()[this._currentIndex];
	var width = this.contents.width - this.textPadding()*2;
	if (!actor) {
		this.changePaintOpacity(false);
		this.drawText(noEquipName, x, y, width, 'center');
		return;
	}
	this.drawText(actor.name(), x, y, width, 'center');

	if (this._currentIndex !== 0) this.drawText("<<", x, y, width, 'left');
	if (this._currentIndex < this.statusMembers().length - 1) this.drawText(">>", x, y, width, 'right');

    var item1 = this.currentEquippedItem(actor, this._item.etypeId);
	this.drawActorParamChange(x, y + this.lineHeight(), actor, item1);
};

Window_ShopStatus.prototype.drawDarkRect = function(dx, dy, dw, dh) {
    var color = this.gaugeBackColor();
    this.changePaintOpacity(false);
    this.contents.fillRect(dx + 1, dy + 1, dw - 2, dh - 2, color);
    this.changePaintOpacity(true);
};

Window_ShopStatus.prototype.drawActorParamChange = function(x, y, actor, item1) {
	var xo = x;
    var width = this.contents.width/2 - this.textPadding()*2;
    this.contents.fontSize = this.standardFontSize() - fontDecrement;

    for (var i = 0; i < 8; i++) {
    	this.resetTextColor();
    	this.drawDarkRect(x - this.textPadding(), y, width + this.textPadding()*2, this.lineHeight());
    	this.changeTextColor(this.systemColor());
    	this.drawText(TextManager.param(i), x, y);

    	var change = this._item.params[i] - (item1 ? item1.params[i] : 0);
    	this.changeTextColor(this.paramchangeTextColor(change));
    	this.drawText((change > 0 ? '+' : '') + change, x, y, width, 'right');
    	x += width + this.textPadding()*2;
    	if (i % 2 === 1) {
    		x = xo;
    		y += this.lineHeight();
    	}
    }
};

Window_ShopStatus.prototype.update = function() {
	Window_Base.prototype.update.call(this);
	if (!this._numberWindow.visible) this.handleKeyInput();
	this.handleMouseInput();
};

Window_ShopStatus.prototype.handleKeyInput = function() {
	if (Input.isTriggered('left')) {
		this.actorLeft();
	} else if (Input.isTriggered('right')) {
		this.actorRight();
	}
};

Window_ShopStatus.prototype.handleMouseInput = function() {
	if (TouchInput.isTriggered() && this.isTouchedInsideFrame('left')) {
		this.actorLeft();
	} else if (TouchInput.isTriggered() && this.isTouchedInsideFrame('right')) {
		this.actorRight();
	}
};

Window_ShopStatus.prototype.actorLeft = function() {
	if (this.statusMembers().length > 1) SoundManager.playCursor();
	this._currentIndex--;
	if (this._currentIndex < 0) this._currentIndex += this.statusMembers().length;
	this.refresh();
};

Window_ShopStatus.prototype.actorRight = function() {
	if (this.statusMembers().length > 1) SoundManager.playCursor();
	this._currentIndex++;
	if (this._currentIndex >= this.statusMembers().length) this._currentIndex -= this.statusMembers().length;
	this.refresh();
};

Window_ShopStatus.prototype.isTouchedInsideFrame = function(area) {
	var x = this.canvasToLocalX(TouchInput.x);
	var y = this.canvasToLocalY(TouchInput.y);
	if (area === 'left') {
		return x >= 0 && y >= 0 && x < this.width/2 && y < this.height;
	}
	return x >= this.width/2 && y >= 0 && x < this.width && y < this.height;
};

//-----------------------------------------------------------------------------
// Window_ShopCommand
//
Window_ShopCommand.prototype.numVisibleRows = function() {
    return 1;
};

Window_ShopCommand.prototype.maxItems = function() {
    return 4;
};

Window_ShopCommand.prototype.windowWidth = function() {
    return commandPos.width;
};

Window_ShopCommand.prototype.maxCols = function() {
	return this.maxItems();
};

Window_ShopCommand.prototype.makeCommandList = function() {
	this.addCommand(TextManager.buy,    'buy');
	this.addCommand(TextManager.sell,   'sell',   !this._purchaseOnly);
	this.addCommand(commonEventName,   'event');
	this.addCommand(TextManager.cancel, 'cancel');
};


/* END */
})();
