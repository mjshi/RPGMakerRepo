//=============================================================================
// NonCombatMenu.js
//=============================================================================

var Imported = Imported || {};
Imported.NonCombatMenu = true;

var NCMenu = NCMenu || {};

/*~struct~MenuItem:
 * @param Name
 * @type text
 * @desc The text that shows up on the menu.
 *
 * @param Keyword
 * @type text
 * @desc Choose from: item equip status formation save load options toTitle cancel quest ce= cmd= sc=
 *
 * @param Enable Condition
 * @type text
 * @desc Leave blank to always enable. Evaluated like a script: $gameSwitches.value(ID), $gameVariables.value(ID) > 10
 *
 * @param Show Condition
 * @type text
 * @desc Leave blank to always show. Evaluated like a script: $gameSwitches.value(ID), $gameVariables.value(ID) > 10
 *
 * @param Icon
 * @type number
 * @min -1
 * @desc Leave blank or set to -1 for no icon.
 *
 */

/*:
 * @plugindesc Fully customizable menu geared toward less battle-oriented games.
 * @author mjshi
 *
 * @param ---Main Menu---

 * @param Menu List
 * @type struct<MenuItem>[]
 * @desc For MV 1.5+ only, delete everything in here and use Menu Order instead otherwise. See help for more details.
 * @default ["{\"Name\":\"Item\",\"Keyword\":\"item\",\"Enable Condition\":\"\",\"Show Condition\":\"\",\"Icon\":\"\"}","{\"Name\":\"Status\",\"Keyword\":\"status\",\"Enable Condition\":\"\",\"Show Condition\":\"\",\"Icon\":\"\"}","{\"Name\":\"Save\",\"Keyword\":\"save\",\"Enable Condition\":\"$gameSystem.isSaveEnabled()\",\"Show Condition\":\"\",\"Icon\":\"\"}","{\"Name\":\"Quit\",\"Keyword\":\"toTitle\",\"Enable Condition\":\"\",\"Show Condition\":\"\",\"Icon\":\"\"}"]
 *
 * @param ** Legacy Parameters **
 *
 * @param Menu Order
 * @desc Disabled if Menu List is not blank. Condition is optional. Format: "Name: Keyword(: condition)", see help for keywords.
 * @default Item: item, Status: status, Save: save, Quit: toTitle
 *
 * @param Menu Icons
 * @desc Disabled if Menu List is not blank. This must be in the same order as Menu Order! Use -1 for no icon.
 * @default -1, -1, -1, -1
 *
 * @param ** End Legacy Params **
 *
 * @param Text Alignment
 * @desc Where to align the text? (left/right/center)
 * @default left
 *
 * @param Text Offset
 * @desc How much to offset the text by (for the icons)
 * @default 40
 *
 * @param Offset Only Icons
 * @desc Only offset the icons? If n, everything will be offset (yes/no)
 * @default yes
 *
 * @param Background Image
 * @desc Background image of the main menu. If undefined, is black. PNG file must be in /img/pictures.
 * @default
 *
 * @param Persistent Background
 * @desc yes/no: Background image persists throughout all the sub-menus.
 * @default no
 *
 * @param Menu Background Opacity
 * @desc Ranges from 0 to 255. 0 for opaque, 255 for transparent.
 * @default 128
 *
 * @param ---Item Menu--- 
 *
 * @param Number of Tabs
 * @desc How many tabs are you showing? (minimum # of tabs is the # of "yes"es in this section)
 * @default 2
 *
 * @param Show Consumables
 * @desc yes/no: Show a tab for consumable items?
 * @default yes
 *
 * @param Show Key Items
 * @desc yes/no: Show a tab for key items?
 * @default yes
 *
 * @param Show Weapons
 * @desc yes/no: Show a tab for weapons?
 * @default no
 *
 * @param Show Armors
 * @desc yes/no: Show a tab for armors?
 * @default no
 *
 * @param Description Placement
 * @desc Where should the description window be placed? 0 = top, 1 = middle, 2 = bottom.
 * @default 0
 *
 * @param ---Gold Window---
 *
 * @param Show Gold Window
 * @desc yes/no: Should the gold window be shown in the item menu? 
 * @default yes
 *
 * @param Gold Window Position
 * @desc left/right: Where should it be shown?
 * @default left
 *
 * @param Gold Window Width
 * @desc How wide should the gold window be? (in pixels- 240 is default.)
 * @default 240
 *
 * @param ---Backgrounds---
 *
 * @param Item Screen BG
 * @desc Background of the items screen. If undefined, is black. PNG file must be in /img/pictures.
 * @default
 *
 * @param Equip Screen BG 
 * @desc Background of the equip screen. If undefined, is black. PNG file must be in /img/pictures.
 * @default
 *
 * @param Status Screen BG
 * @desc Background of the equip screen. If undefined, is black. PNG file must be in /img/pictures.
 * @default
 *
 * @param Save Screen BG
 * @desc Background of the save screen. If undefined, is black. PNG file must be in /img/pictures.
 * @default
 *
 * @param Load Screen BG
 * @desc Background of the load screen. If undefined, is black. PNG file must be in /img/pictures.
 * @default
 *
 * @param Options Screen BG
 * @desc Background of the options screen. If undefined, is black. PNG file must be in /img/pictures.
 * @default
 *
 * @help 
 * ----------------------------------------------------------------------------
 *   Non-Combat Menu v1.05a by mjshi
 *   Free for both commercial and non-commercial use, with credit.
 * ----------------------------------------------------------------------------
 *                               Menu Keywords
 * ----------------------------------------------------------------------------
 *   item     Items screen         status     Status screen
 *   equip    Equip screen         formation  Party Formation screen
 *   save     Save screen          load       Load screen
 *   options  Options screen       toTitle    Quits to title
 *   cancel   Returns to map       quest      Quests screen (req. quest plugin)
 *
 *   ce=  Calls Common Event. Ex: ce=1 calls Common Event 1
 *   cmd= Calls plugin command, more details below.
 *   sc=  Custom script call. Ex: SceneManager.push(Scene_Load) calls up 
 *        the load screen.
 * ----------------------------------------------------------------------------
 *   Special thanks to Valrix on RMN for first creating the PluginCMD addon.
 *   Due to it needing constant updates (as it overwrites core functionality)
 *   it has been absorbed into the main plugin to allow easier maintentance.
 * ----------------------------------------------------------------------------
 *   To run a plugin command from the menu use "cmd=" followed by the plugin
 *   command you want to run.
 * 
 *   Example: Items: item, Crafting: cmd=OpenSynthesis, Quit: toTitle
 *   Selecting the Crafting option would open Yanfly's Item_Synthesis plugin.
 *
 *   Anything can come after "cmd=" except a comma.
 *   This means you can use spaces and call commands such as "cmd=REFRESH ALL"
 * ----------------------------------------------------------------------------
 * > Update v1.0b
 * - Added support for Yanfly Item Core (place the NonCombatMenu below it)
 *
 * > Update v1.01
 * - Added support for backgrounds.
 * > 1.01a - Made it so backgrounds actually work and didn't error xD
 *
 * > Update v1.02
 * - Added support for calling common events from the menu
 * > 1.02a - Fixed CEvent_ID to actually support multiple common events
 *
 * > Update v1.03
 * - Absorbed the PluginCMD addon. Read above to see how to use it.
 *
 * > Update v1.04
 * - Added support for icons and text alignment
 *
 * > Update v1.05
 * - Changed how menu lists are handled, added support for enable/disable
 *   and show/hide conditions for each individual menu item
 * - Shortened CEvent_ID to ce= (don't worry, CEvent_ID is still recognized)
 * - Added command remembering, no more arrowing down from the first thing
 *   every time!
 * - Added sc= for custom script calls (you can now push in custom scenes!)
 *
 * > Is something broken? Go to http://mjshi.weebly.com/contact.html and I'll
 *   try my best to help you!
 *
 */

NCMenu.Parameters = PluginManager.parameters('NonCombatMenu');

/** Legacy Stuff **/
NCMenu.menuList = (String(NCMenu.Parameters['Menu Order'])).split(", ");
for (var i = 0; i < NCMenu.menuList.length; i++) {
	NCMenu.menuList[i] = NCMenu.menuList[i].split(": ");
}
//prevent people accidentally forgetting stuff
NCMenu.menuIcons = (String(NCMenu.Parameters['Menu Icons'])).split(", ");
for (var i = 0; i < NCMenu.menuList.length; i++) {
    if (i < NCMenu.menuIcons.length) {
        NCMenu.menuIcons[i] = Number(NCMenu.menuIcons[i]);
    } else {
        NCMenu.menuIcons[i] = -1;
    }
}
/** End Legacy Stuff **/

//New Menu List
if (String(NCMenu.Parameters['Menu List']).length > 0) {
	NCMenu.menuList = JSON.parse(NCMenu.Parameters['Menu List']);
	NCMenu.menuIcons = [];
	for (var i = 0; i < NCMenu.menuList.length; i++) {
		var fields = JSON.parse(NCMenu.menuList[i]);
		NCMenu.menuList[i] = [fields["Name"], fields["Keyword"], fields["Enable Condition"], fields["Show Condition"]];
		NCMenu.menuIcons.push(fields["Icon"].length !== 0 ? parseInt(fields["Icon"]) : -1);
	}
}

NCMenu.textOffset = Number(NCMenu.Parameters['Text Offset']);
NCMenu.textAlign = String(NCMenu.Parameters['Text Alignment']);
NCMenu.offsetIconOnly = (String(NCMenu.Parameters['Offset Only Icons']) == "yes");

NCMenu.backgroundImage = (String(NCMenu.Parameters['Background Image'])).replace(".png", "");
NCMenu.persistentBG = (String(NCMenu.Parameters['Persistent Background']) == "yes");
NCMenu.menuDim = Number(NCMenu.Parameters['Menu Background Opacity']);

NCMenu.tabsShown = Number(NCMenu.Parameters['Number of Tabs']);
NCMenu.showConsumables = (String(NCMenu.Parameters['Show Consumables']) == "yes");
NCMenu.showKeyItems = (String(NCMenu.Parameters['Show Key Items']) == "yes");
NCMenu.showWeapons = (String(NCMenu.Parameters['Show Weapons']) == "yes");
NCMenu.showArmors = (String(NCMenu.Parameters['Show Armors']) == "yes");
NCMenu.descrPlacement = Number(NCMenu.Parameters['Description Placement']);

NCMenu.showGoldWindow = (String(NCMenu.Parameters['Show Gold Window']) == "yes");
NCMenu.goldWindowAlignRight = (String(NCMenu.Parameters['Gold Window Position']) == "right");
NCMenu.goldWindowWidth = Number(NCMenu.Parameters['Gold Window Width']);

NCMenu.itemBG = (String(NCMenu.Parameters['Item Screen BG'])).replace(".png", "");
NCMenu.equipBG = (String(NCMenu.Parameters['Equip Screen BG'])).replace(".png", "");
NCMenu.statusBG = (String(NCMenu.Parameters['Status Screen BG'])).replace(".png", "");
NCMenu.saveBG = (String(NCMenu.Parameters['Save Screen BG'])).replace(".png", "");
NCMenu.loadBG = (String(NCMenu.Parameters['Load Screen BG'])).replace(".png", "");
NCMenu.optionsBG = (String(NCMenu.Parameters['Options Screen BG'])).replace(".png", "");

//-----------------------------------------------------------------------------
// Open Menu Screen Override
//
Game_Interpreter.prototype.command351 = function() {
    if (!$gameParty.inBattle()) {
        SceneManager.push(Scene_NCMenu);
        Window_MenuCommand.initCommandPosition();
    }
    return true;
};

Scene_Map.prototype.callMenu = function() {
    SoundManager.playOk();
    SceneManager.push(Scene_NCMenu);
    Window_MenuCommand.initCommandPosition();
    $gameTemp.clearDestination();
    this._mapNameWindow.hide();
    this._waitCount = 2;
};

//=============================================================================
// Scene_NCMenu
//=============================================================================

function Scene_NCMenu() {
    this.initialize.apply(this, arguments);
}

Scene_NCMenu.prototype = Object.create(Scene_MenuBase.prototype);
Scene_NCMenu.prototype.constructor = Scene_NCMenu;

Scene_NCMenu.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_NCMenu.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createCommandWindow();
    this.createInvisibleFormationWindow();
};

Scene_NCMenu.prototype.stop = function() {
    Scene_MenuBase.prototype.stop.call(this);
    this._commandWindow.close();
};

Scene_NCMenu.prototype.createBackground = function() {
    Scene_MenuBase.prototype.createBackground.call(this);
    if (NCMenu.backgroundImage) {
        this._background = new Sprite(ImageManager.loadPicture(NCMenu.backgroundImage));
        this._background.opacity = NCMenu.menuDim;
        this.addChild(this._background);
    }
    else {
        this.setBackgroundOpacity(NCMenu.menuDim)
    }
};

Scene_NCMenu.prototype.createCommandWindow = function() {
    this._commandWindow = new Window_NCMenu();
    var method;

    for (var i = 0; i < NCMenu.menuList.length; i++) {
      method = NCMenu.menuList[i][1];

      if (method === 'cancel') continue;
      // probably not necessary, keep this just in case. Scenes seem to be OK with setting nonexistent handlers
      // if (NCMenu.menuList[i][3] && !eval(NCMenu.menuList[i][3])) continue;

      if (method.startsWith("cmd=")) {
      	this._commandWindow.setHandler(method, this.callPluginCommand.bind(this, method.slice(4)));

      } else if (method.startsWith("CEvent_")) {
      	this._commandWindow.setHandler(method, this.callCommonEvent.bind(this, parseInt(method.slice(7))));

      } else if (method.startsWith("ce=")) {
      	this._commandWindow.setHandler(method, this.callCommonEvent.bind(this, parseInt(method.slice(3))));

      } else if (method.startsWith("sc=")) {
      	this._commandWindow.setHandler(method, eval("this.customScriptCommand.bind(this, '" + method.slice(3) + "')"));

      } else {
      	this._commandWindow.setHandler(method, eval("this.command" + method.charAt(0).toUpperCase() + method.slice(1) + ".bind(this)"));
      }
    }

    this._commandWindow.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._commandWindow);
};

Scene_NCMenu.prototype.customScriptCommand = function(script) {
	eval(script);
};

Scene_NCMenu.prototype.createInvisibleFormationWindow = function() {
    this._statusWindow = new Window_MenuStatus((Graphics.boxWidth - Window_MenuStatus.prototype.windowWidth()) / 2, 0);
    this._statusWindow.hide();
    this._statusWindow.deactivate();
    this.addWindow(this._statusWindow);
};

Scene_NCMenu.prototype.callCommonEvent = function(eventId) {
    $gameTemp.reserveCommonEvent(eventId);
    this.popScene();
};

Scene_NCMenu.prototype.callPluginCommand = function() {
    var args = arguments[0].split(' ');
    Game_Interpreter.prototype.pluginCommand(args.shift(), args);
};

Scene_NCMenu.prototype.commandItem = function() {
    SceneManager.push(Scene_Item);
};
if (NCMenu.persistentBG) {
    Scene_Item.prototype.createBackground = Scene_NCMenu.prototype.createBackground
}
else {
    Scene_Item.prototype.createBackground = function() {
    	Scene_MenuBase.prototype.createBackground.call(this);
	    if (NCMenu.itemBG) {
	        this._background = new Sprite(ImageManager.loadPicture(NCMenu.itemBG));
	        this._background.opacity = NCMenu.menuDim;
	        this.addChild(this._background);
	    }
	    else {
	        this.setBackgroundOpacity(NCMenu.menuDim)
	    }
    }
}

Scene_NCMenu.prototype.commandEquip = function() {
    SceneManager.push(Scene_Equip);
};
if (NCMenu.persistentBG) {
    Scene_Equip.prototype.createBackground = Scene_NCMenu.prototype.createBackground
}
else {
    Scene_Equip.prototype.createBackground = function() {
    	Scene_MenuBase.prototype.createBackground.call(this);
	    if (NCMenu.equipBG) {
	        this._background = new Sprite(ImageManager.loadPicture(NCMenu.equipBG));
	        this._background.opacity = NCMenu.menuDim;
	        this.addChild(this._background);
	    }
	    else {
	        this.setBackgroundOpacity(NCMenu.menuDim)
	    }
    }
}

Scene_NCMenu.prototype.commandStatus = function() {
    SceneManager.push(Scene_Status);
};
if (NCMenu.persistentBG) {
    Scene_Status.prototype.createBackground = Scene_NCMenu.prototype.createBackground
}
else {
    Scene_Status.prototype.createBackground = function() {
    	Scene_MenuBase.prototype.createBackground.call(this);
	    if (NCMenu.statusBG) {
	        this._background = new Sprite(ImageManager.loadPicture(NCMenu.statusBG));
	        this._background.opacity = NCMenu.menuDim;
	        this.addChild(this._background);
	    }
	    else {
	        this.setBackgroundOpacity(NCMenu.menuDim)
	    }
    }
}

Scene_NCMenu.prototype.commandQuest = function() {
    SceneManager.push(Scene_Quest);
};

Scene_NCMenu.prototype.commandSave = function() {
    SceneManager.push(Scene_Save);
};
if (NCMenu.persistentBG) {
    Scene_Save.prototype.createBackground = Scene_NCMenu.prototype.createBackground
}
else {
    Scene_Save.prototype.createBackground = function() {
    	Scene_MenuBase.prototype.createBackground.call(this);
	    if (NCMenu.saveBG) {
	        this._background = new Sprite(ImageManager.loadPicture(NCMenu.saveBG));
	        this._background.opacity = NCMenu.menuDim;
	        this.addChild(this._background);
	    }
	    else {
	        this.setBackgroundOpacity(NCMenu.menuDim)
	    }
    }
}


Scene_NCMenu.prototype.commandOptions = function() {
    SceneManager.push(Scene_Options);
};
if (NCMenu.persistentBG) {
    Scene_Options.prototype.createBackground = Scene_NCMenu.prototype.createBackground
}
else {
    Scene_Options.prototype.createBackground = function() {
    	Scene_MenuBase.prototype.createBackground.call(this);
	    if (NCMenu.optionsBG) {
	        this._background = new Sprite(ImageManager.loadPicture(NCMenu.optionsBG));
	        this._background.opacity = NCMenu.menuDim;
	        this.addChild(this._background);
	    }
	    else {
	        this.setBackgroundOpacity(NCMenu.menuDim)
	    }
    }
}

Scene_NCMenu.prototype.commandToTitle = function() {
    this.fadeOutAll();
    SceneManager.goto(Scene_Title);
};


Scene_NCMenu.prototype.commandLoad = function() {
    SceneManager.push(Scene_Load);
};
if (NCMenu.persistentBG) {
    Scene_Load.prototype.createBackground = Scene_NCMenu.prototype.createBackground
}
else {
    Scene_Load.prototype.createBackground = function() {
    	Scene_MenuBase.prototype.createBackground.call(this);
	    if (NCMenu.loadBG) {
	        this._background = new Sprite(ImageManager.loadPicture(NCMenu.loadBG));
	        this._background.opacity = NCMenu.menuDim;
	        this.addChild(this._background);
	    }
	    else {
	        this.setBackgroundOpacity(NCMenu.menuDim)
	    }
    }
}

Scene_NCMenu.prototype.commandFormation = function() {
    this._commandWindow.hide();
    this._commandWindow.deactivate();
    this._statusWindow.setFormationMode(true);
    this._statusWindow.selectLast();
    this._statusWindow.show();
    this._statusWindow.activate();
    this._statusWindow.setHandler('ok',     this.onFormationOk.bind(this));
    this._statusWindow.setHandler('cancel', this.onFormationCancel.bind(this));
};

Scene_NCMenu.prototype.onFormationOk = function() {
    var index = this._statusWindow.index();
    var actor = $gameParty.members()[index];
    var pendingIndex = this._statusWindow.pendingIndex();
    if (pendingIndex >= 0) {
        $gameParty.swapOrder(index, pendingIndex);
        this._statusWindow.setPendingIndex(-1);
        this._statusWindow.redrawItem(index);
    } else {
        this._statusWindow.setPendingIndex(index);
    }
    this._statusWindow.activate();
};

Scene_NCMenu.prototype.onFormationCancel = function() {
    if (this._statusWindow.pendingIndex() >= 0) {
        this._statusWindow.setPendingIndex(-1);
        this._statusWindow.activate();
    } else {
        this._statusWindow.deselect();
        this._statusWindow.hide();
        this._commandWindow.show();
        this._commandWindow.activate();
    }
};

//=============================================================================
// Window_NCMenu
//=============================================================================

function Window_NCMenu() {
    this.initialize.apply(this, arguments);
}

Window_NCMenu.prototype = Object.create(Window_Command.prototype);
Window_NCMenu.prototype.constructor = Window_NCMenu;

Window_NCMenu.prototype.initialize = function() {
    Window_Command.prototype.initialize.call(this, 0, 0);
    this.updatePlacement();
    this.openness = 0;
    this.open();
    this.selectLast();
};

Window_NCMenu.prototype.windowWidth = function() {
    return 240;
};

Window_NCMenu.prototype.updatePlacement = function() {
    this.x = (Graphics.boxWidth - this.width) / 2;
    this.y = (Graphics.boxHeight - this.height) / 2;
};

Window_NCMenu.prototype.makeCommandList = function() {
    for (var i = 0; i < NCMenu.menuList.length; i++) {
    	if (NCMenu.menuList[i][3] !== "" && !eval(NCMenu.menuList[i][3])) continue;
        this.addCommand(NCMenu.menuList[i][0], NCMenu.menuList[i][1], NCMenu.menuList[i][2] !== "" ? eval(NCMenu.menuList[i][2]) : true);
    }
};

Window_NCMenu.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    var offset;
    if (NCMenu.offsetIconOnly) {offset = 0} else {offset = NCMenu.textOffset}
    
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));

    if (NCMenu.menuIcons[index] >= 0) {
        offset = NCMenu.textOffset;
        this.drawIcon(NCMenu.menuIcons[index], rect.x, rect.y + 2);
    }
    this.drawText(this.commandName(index), rect.x + offset, rect.y, rect.width - offset, NCMenu.textAlign);
};

Window_NCMenu.prototype.processOk = function() {
    Window_NCMenu._lastCommandSymbol = this.currentSymbol();
    Window_Command.prototype.processOk.call(this);
};

Window_NCMenu.prototype.selectLast = function() {
    this.selectSymbol(Window_NCMenu._lastCommandSymbol);
};

//=============================================================================
// Scene_Map - changed to call NCMenu rather than original menu screen
//=============================================================================

Scene_Map.prototype.callMenu = function() {
    SoundManager.playOk();
    SceneManager.push(Scene_NCMenu);
    Window_MenuCommand.initCommandPosition();
    $gameTemp.clearDestination();
    this._mapNameWindow.hide();
    this._waitCount = 2;
};

if (!Imported.YEP_ItemCore) { // begin deference to Yanfly Item Core
//=============================================================================
// Window_ItemCategory - changed to accept NCMenu parameters
//=============================================================================

Window_ItemCategory.prototype.windowWidth = function() {
    if (NCMenu.showGoldWindow) {
      return Graphics.boxWidth - NCMenu.goldWindowWidth;
    } else {
      return Graphics.boxWidth;
    }
};

Window_ItemCategory.prototype.maxCols = function() {
    return NCMenu.tabsShown;
};

Window_ItemCategory.prototype.makeCommandList = function() {
    if (NCMenu.showConsumables) {this.addCommand(TextManager.item, 'item')}
    if (NCMenu.showWeapons) {this.addCommand(TextManager.weapon,   'weapon')}
    if (NCMenu.showArmors) {this.addCommand(TextManager.armor,     'armor')}
    if (NCMenu.showKeyItems) {this.addCommand(TextManager.keyItem, 'keyItem')}
};

//=============================================================================
// Window_Gold - changed to accept NCMenu parameters
//=============================================================================

Window_Gold.prototype.windowWidth = function() {
    return NCMenu.goldWindowWidth;
};

//=============================================================================
// Scene_Item - changed to accept NCMenu parameters
//=============================================================================

Scene_Item.prototype.create = function() {
    Scene_ItemBase.prototype.create.call(this);
    this.createHelpWindow();
    if (NCMenu.showGoldWindow) {this.createGoldWindow()}
    this.createCategoryWindow();
    this.createItemWindow();
    this.createActorWindow();
};

Scene_Item.prototype.createCategoryWindow = function() {
    this._categoryWindow = new Window_ItemCategory();
    this._categoryWindow.setHelpWindow(this._helpWindow);

    if (NCMenu.showGoldWindow && !NCMenu.goldWindowAlignRight) {this._categoryWindow.x = NCMenu.goldWindowWidth}

    if (NCMenu.descrPlacement == 1) {
      this._helpWindow.y = this._categoryWindow.height;
    }
      else if (NCMenu.descrPlacement == 2) {
        this._helpWindow.y = Graphics.boxHeight - this._helpWindow.height;
      }
        else {
          if (NCMenu.showGoldWindow) {this._goldWindow.y = this._helpWindow.height}
          this._categoryWindow.y = this._helpWindow.height;
        }

    this._categoryWindow.setHandler('ok',     this.onCategoryOk.bind(this));
    this._categoryWindow.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._categoryWindow);
};
 
Scene_Item.prototype.createItemWindow = function() {
    if (NCMenu.descrPlacement == 1) {
      wy = this._categoryWindow.y + this._categoryWindow.height + this._helpWindow.height;
    }
      else if (NCMenu.descrPlacement == 2) {
        wy = this._categoryWindow.height + this._helpWindow.height;
      } else {
          wy = this._categoryWindow.y + this._categoryWindow.height;
        }

    var wh = Graphics.boxHeight - wy;
    this._itemWindow = new Window_ItemList(0, wy, Graphics.boxWidth, wh);

    if (NCMenu.descrPlacement == 2) {this._itemWindow.y = this._categoryWindow.height};
    
    this._itemWindow.setHelpWindow(this._helpWindow);
    this._itemWindow.setHandler('ok',     this.onItemOk.bind(this));
    this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
    this.addWindow(this._itemWindow);
    this._categoryWindow.setItemWindow(this._itemWindow);
};

Scene_Item.prototype.createGoldWindow = function() {
    this._goldWindow = new Window_Gold(0, 0);
    if (NCMenu.goldWindowAlignRight) {this._goldWindow.x = Graphics.boxWidth - NCMenu.goldWindowWidth}
    this.addWindow(this._goldWindow);
};
}; // End of Yanfly Item Core deference

//=============================================================================
// Window_Status - Streamlined
//=============================================================================

Window_Status.prototype.initialize = function() {
    var width = 440;
    var height = 180;
    Window_Selectable.prototype.initialize.call(this, (Graphics.boxWidth - width) / 2, (Graphics.boxHeight - height) / 2, width, height);
    this.refresh();
    this.activate();
};

Window_Status.prototype.refresh = function() {
    this.contents.clear();
    if (this._actor) {
        var lineHeight = this.lineHeight();
        this.drawBlock2(0);
    }
};

Window_Status.prototype.drawBlock2 = function(y) {
    this.drawActorFace(this._actor, 12, y);
    this.drawBasicInfo(204, y);
    this.drawExpInfo(456, y);
};

Window_Status.prototype.drawBasicInfo = function(x, y) {
    var lineHeight = this.lineHeight();
    this.drawActorName(this._actor, x, y + lineHeight * 0.5);
    this.drawActorHp(this._actor, x, y + lineHeight * 1.5);
    this.drawActorMp(this._actor, x, y + lineHeight * 2.5);
};
