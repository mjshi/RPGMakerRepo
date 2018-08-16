//==============================================================================
// IntegratedEquipMenu.js
//==============================================================================
 
var Imported = Imported || {};
Imported.IntegratedEquipMenu = true;

/*:
* @plugindesc Equip items through the Weapons/Armors tabs in the item menu!
* @author mjshi
*
* @param Show Names
* @desc (true/false) Show character names?
* @type boolean
* @default true
*
* @param Always Concise Format
* @desc (true/false) Use consistent concise formatting for equipping or adapt based on party size?
* @type boolean
* @default false
*
* @param None Text
* @desc Text to show when there are no party members that can equip the item.
* @default None
*
* @param --- Buffers ---
*
* @param Param Buffer
* @desc How much to buffer between the parameters and their values in concise format.
* @parent --- Buffers ---
* @number
* @default 20
*
* @param Param Left Buffer
* @desc How much to buffer to the left of the parameters in concise format.
* @parent --- Buffers ---
* @number
* @default 0
*
* @param Y Buffer
* @desc How much to buffer from the top, in pixels.
* @parent --- Buffers ---
* @number
* @default 0
*
* @param Between Buffer
* @desc How much to buffer between the name and the sprite.
* @parent --- Buffers ---
* @number
* @default 90
*
* @param After Buffer
* @desc How much to buffer between sprite and the parameters.
* @parent --- Buffers ---
* @number
* @default 18
*
* @param Single Member Buffer
* @desc Left/right buffer as a decimal % for when there's only one person to equip stuff on (since there's too much whitespace)
* @parent --- Buffers ---
* @default 0.15
*
* @param
* @help 
* ------------------------------------------------------------------------------
*   Integrated Equip Menu v1.0 by mjshi
*   Free for both commercial and non-commercial use, with credit.
* ------------------------------------------------------------------------------
*   Plug & Play. No options and little to no configuration needed!
* ------------------------------------------------------------------------------
*
* > Is something broken? Go to http://mjshi.weebly.com/contact.html and I'll
*   try my best to help you!
*/

//Initialize global variables

(function () {
/* BEGIN */

var params = PluginManager.parameters('IntegratedEquipMenu');
var showName = params["Show Names"] === "true";
var persistentMini = params["Always Concise Format"] === "true";
var noneText = params["None Text"];

var yBuffer = parseInt(params["Y Buffer"]);
var paramLeftBuffer = parseInt(params["Param Left Buffer"]) || 0;
var paramBuffer = parseInt(params["Param Buffer"]);
var betweenBuffer = parseInt(params["Between Buffer"]);
var afterBuffer = parseInt(params["After Buffer"]);
var oneBuffer = parseFloat(params["Single Member Buffer"]);

//-----------------------------------------------------------------------------
// Scene_Item
//

var alias_scene_item_create = Scene_Item.prototype.create;
Scene_Item.prototype.create = function() {
	alias_scene_item_create.call(this);
	this.createEquipWindow();
};

Scene_Item.prototype.createEquipWindow = function() {
	this._integratedEquipMenu = new Window_IntegratedEquipMenu(0, 0);
	this._integratedEquipMenu.setHandler('equip', this.onEquipOk.bind(this));
	this._integratedEquipMenu.setHandler('none', this.onEquipCancel.bind(this));
	this._integratedEquipMenu.setHandler('cancel', this.onEquipCancel.bind(this));
	this._integratedEquipMenu.y = this._itemWindow.y;
	this._integratedEquipMenu.height = this._itemWindow.height;
	this.addWindow(this._integratedEquipMenu);
};

Scene_Item.prototype.onEquipOk = function() {
	SoundManager.playEquip();
	$gameParty.battleMembers()[parseInt(this._integratedEquipMenu.currentData().name)].changeEquip(this._integratedEquipMenu.getSlotID(), this._integratedEquipMenu.equip());
	this.hideSubWindow(this._integratedEquipMenu);
};

Scene_Item.prototype.onEquipCancel = function() {
	this.hideSubWindow(this._integratedEquipMenu);
};

var alias_scene_item_onitemok = Scene_Item.prototype.onItemOk;
Scene_Item.prototype.onItemOk = function() {
	if (DataManager.isWeapon(this.item()) || DataManager.isArmor(this.item())) {
		this._integratedEquipMenu.setItem(this.item());
		this.showSubWindow(this._integratedEquipMenu);
		return;
	}
	alias_scene_item_onitemok.call(this);
};

//-----------------------------------------------------------------------------
// Window_IntegratedEquipMenu
//
function Window_IntegratedEquipMenu() {
	this.initialize.apply(this, arguments);
}
Window_IntegratedEquipMenu.prototype = Object.create(Window_HorzCommand.prototype);
Window_IntegratedEquipMenu.prototype.constructor = Window_IntegratedEquipMenu;

Window_IntegratedEquipMenu.prototype.initialize = function(x, y) {
	Window_HorzCommand.prototype.initialize.call(this, x, y);
	this.hide();
	this.deactivate();
	this._equip = null;
};

Window_IntegratedEquipMenu.prototype.cursorUp = function(wrap) {
    this.cursorLeft(wrap);
};
Window_IntegratedEquipMenu.prototype.cursorDown = function(wrap) {
    this.cursorRight(wrap);
};

Window_IntegratedEquipMenu.prototype.itemHeight = function() {
	return this.height - this.padding * 2;
};

Window_IntegratedEquipMenu.prototype.windowWidth = function() {
	return Graphics.boxWidth / 2;
};

Window_IntegratedEquipMenu.prototype.maxCols = function() {
	return Math.min(4, this.maxItems());
};

Window_IntegratedEquipMenu.prototype.makeCommandList = function() {
	if (this.equip() === null) return;

	var actor;
	for (var i = 0; i < $gameParty.battleMembers().length; i++) {
		actor = $gameParty.battleMembers()[i];
		if (actor.canEquip(this.equip())) this.addCommand('' + i, 'equip');
	}

	if (this.maxItems() === 0) this.addCommand('None', 'none');
};

//=============================================================
// -1 = must short format (no params)
// 0 = concise format (params, no diff)
// 1 = long format (params + diff)
//
Window_IntegratedEquipMenu.prototype.determineFormat = function() {
	var actor, tempActor, width = this.itemRectForText(0).width;
	var canLongFormat = true;
	if (this.commandSymbol(0) === 'none') return 1;
	if (persistentMini) return -1;

	if (this.maxItems() === 1) width -= width * oneBuffer * 2;

	for (var index = 0; index < this.maxItems(); index++) {
		actor = $gameParty.battleMembers()[parseInt(this.commandName(index))];
		tempActor = JsonEx.makeDeepCopy(actor);
		tempActor.forceChangeEquip(this.getSlotID(), this.equip());
		
		var newValue, diffValue;
		for (var i = 0; i < 8; i++) {
			newValue = tempActor.param(i);
			diffValue = newValue - actor.param(i);

			if (this.textWidth(TextManager.param(i) + 5 + newValue + "(+" + Math.abs(diffValue) + ")") > width) canLongFormat = false;
			if (this.textWidth(TextManager.param(i) + 5 + newValue) > width) return -1;
		}
	}
	return canLongFormat ? 1 : 0;
}

Window_IntegratedEquipMenu.prototype.itemRect = function(index) {
	if (this._format === -1) {
		var longest = "";
		for (var i = 0; i < 8; i++) if (TextManager.param(i).length > longest.length) longest = TextManager.param(i);
	    longest = this.textWidth(longest) + this.textPadding()*2 + paramBuffer;

	    var rect = new Rectangle();
	    var maxCols = this.maxCols();
	    rect.width = this.itemWidth();
	    rect.width -= longest/this.maxItems();
	    rect.height = this.itemHeight();
	    rect.x = index % maxCols * (rect.width + this.spacing()) - this._scrollX + longest;
	    rect.y = Math.floor(index / maxCols) * rect.height - this._scrollY;
	    return rect;

	} else {
		return Window_HorzCommand.prototype.itemRect.call(this, index);
	}
};

Window_IntegratedEquipMenu.prototype.spacing = function() {
    return 5;
};

Window_IntegratedEquipMenu.prototype.updateFormatting = function() {
	this._format = this.determineFormat();
};

Window_IntegratedEquipMenu.prototype.drawAllItems = function() {
	this.updateFormatting();

    var topIndex = this.topIndex();
    for (var i = 0; i < this.maxPageItems(); i++) {
        var index = topIndex + i;
        if (index < this.maxItems()) {
            this.drawItem(index);
        }
    }
    
	if (this._format === -1) {
		this.changeTextColor(this.systemColor());
		for (var i = 0; i < 8; i++) this.drawText(TextManager.param(i), paramLeftBuffer, this.lineHeight() * i + (yBuffer + betweenBuffer + afterBuffer));
	}
};

Window_IntegratedEquipMenu.prototype.drawItem = function(index) {
	var rect = this.itemRectForText(index);
	this.resetTextColor();

	if (this.commandName(index) === 'None') {
		this.drawText(noneText, rect.x, rect.height/2 - this.lineHeight(), rect.width, 'center');
		return;
	}

	var x = rect.x, y = rect.y, actor = $gameParty.battleMembers()[parseInt(this.commandName(index))];
	y += yBuffer;
	if (showName) this.drawText(actor.name(), x, y, rect.width, 'center');
	y += betweenBuffer;

	this.drawCharacter(actor.characterName(),  actor.characterIndex(), x + rect.width/2, y);

	if (this.maxItems() === 1) {
		x += rect.width * oneBuffer;
		rect.width = rect.width * (1 - oneBuffer*2);
	}
	y += afterBuffer;

	var tempActor = JsonEx.makeDeepCopy(actor), newValue, diffValue, align;
	tempActor.forceChangeEquip(this.getSlotID(), this.equip());
	for (var i = 0; i < 8; i++) {
		newValue = tempActor.param(i);
		diffValue = newValue - actor.param(i);

		if (this._format > 0) {
			if 		(diffValue > 0) diffValue = "(+" + diffValue + ")";
			else if (diffValue < 0) diffValue = diffValue = "(" + diffValue + ")";
			else 					diffValue = "";

		} else {
			diffValue = "";
		}

		this.changeTextColor(this.paramchangeTextColor(tempActor.param(i) - actor.param(i)));
		this.drawText(newValue + diffValue, x, y, rect.width, this._format !== -1 ? 'right' : 'center');

		if (this._format !== -1) {
			this.changeTextColor(this.systemColor());
			this.drawText(TextManager.param(i), x, y);
		}

		y += this.lineHeight();
	}
}

Window_IntegratedEquipMenu.prototype.equip = function() {
	return this._equip;
};

Window_IntegratedEquipMenu.prototype.setItem = function(item) {
	this._equip = item;
	this.select(0);
	this.refresh();
	this.refresh();
};

Window_IntegratedEquipMenu.prototype.getSlotID = function() {
	return this.equip().etypeId - 1;
};

//-----------------------------------------------------------------------------
// Window_ItemList
//
var alias_window_itemlist_isenabled = Window_ItemList.prototype.isEnabled;
Window_ItemList.prototype.isEnabled = function(item) {
	return	alias_window_itemlist_isenabled.call(this, item) || (SceneManager._scene instanceof Scene_Item && (DataManager.isWeapon(item) || DataManager.isArmor(item)));
};

/* END */
})();