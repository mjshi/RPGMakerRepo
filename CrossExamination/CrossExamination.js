//==============================================================================
// CrossExamination.js
//==============================================================================
 
var Imported = Imported || {};
Imported.CrossExamination = true;

/*:
* @plugindesc Less of a plugin, more of an overlay that helps control flow.
* @author mjshi
*
* @param ---Configuration---
*
* @param Press Key
* @desc Use this: http://keycode.info/
* default: down arrow
* @default 40
*
* @param Present Key
* @desc Use this: http://keycode.info/
* default: up arrow
* @default 38
*
* @param ---Overlay---
*
* @param Image Width
* @desc Width of the images in pixels.
* @default 132
*
* @param Image Height
* @desc Height of the images in pixels.
* @default 96
*
* @param
* @help 
* ------------------------------------------------------------------------------
*   Cross Examination v1.0 by mjshi
*   Free for both commercial and non-commercial use, with credit.
* ------------------------------------------------------------------------------
*   Installation: Extract the included folder to the img/ directory.
*
*   There's also an included tutorial in the form of common events. You can
*   extract the CommonEvents.json file to an empty project (or your own, if you
*   don't mind your common events being overwritten) and follow along the steps
*   to learn how to set this all up.
* ------------------------------------------------------------------------------
*                           Displaying the Overlay
* ------------------------------------------------------------------------------
*   Via plugin command:
*     CrossExamine show
*     CrossExamine hide
*
* ------------------------------------------------------------------------------
*                        Conditional Branch Checking
* ------------------------------------------------------------------------------
*   Via script:
*     CrossExamine.press
*     CrossExamine.present
*   These are set to true when the press or present options are selected,
*   respectively.
*
* ------------------------------------------------------------------------------
*                       Suggested Supplemental Plugins
* ------------------------------------------------------------------------------
*   For more advanced message control
*     http://yanfly.moe/2015/10/10/yep-2-message-core/
*     http://yanfly.moe/2016/01/30/yep-65-extended-message-pack-1/
*
*   For animated sprites or pictures
*     https://forums.rpgmakerweb.com/index.php?threads/iavra-gif.49033/
*   --or--
*     https://atelierrgss.wordpress.com/rmv-picture-effects/
*
*   For adding an "hp bar" or variable gauge
*     https://forums.rpgmakerweb.com/index.php?threads/orange-hud.47186/
*   & this specific addon
*     http://download.hudell.com/OrangeHudGauge.js
*
*   For conditional branch shorthands
*     http://mjshi.weebly.com/mv-conditional-branch.html
*
* ------------------------------------------------------------------------------
*
* > Is something broken? Go to http://mjshi.weebly.com/contact.html and I'll
*   try my best to help you!
*/

//Initialize global variables
var CrossExamine = CrossExamine || {};
CrossExamine.press = false;
CrossExamine.present = false;

(function () {

/* BEGIN */

var params = PluginManager.parameters("CrossExamination");
function getN(str) {
	return parseInt(params[str]);
}

//-----------------------------------------------------------------------------
// Input
//
var pressKey = getN("Press Key");
var presentKey = getN("Present Key");
var image = {
	width: getN("Image Width"),
	height: getN("Image Height")
}

CrossExamine.savedKeys = {};
CrossExamine.savedKeys[pressKey] = Input.keyMapper[pressKey];
CrossExamine.savedKeys[presentKey] = Input.keyMapper[presentKey];

//-----------------------------------------------------------------------------
// Window_EventItem
//

var alias_window_eventitem_start = Window_EventItem.prototype.start;
Window_EventItem.prototype.start = function() {
	alias_window_eventitem_start.call(this);
    this._helpWindow.open();
    this.y = this._helpWindow.y + this._helpWindow.height;
};

var alias_window_eventitem_ok = Window_EventItem.prototype.onOk;
Window_EventItem.prototype.onOk = function() {
	alias_window_eventitem_ok.call(this);
    this._helpWindow.close();
};

var alias_window_eventitem_cancel = Window_EventItem.prototype.onCancel;
Window_EventItem.prototype.onCancel = function() {
	alias_window_eventitem_cancel.call(this);
    this._helpWindow.close();
};

//-----------------------------------------------------------------------------
// Window_Message
//

var alias_scene_map_add_subwindows = Scene_Map.prototype.createMessageWindow;
Scene_Map.prototype.createMessageWindow = function() {
	alias_scene_map_add_subwindows.call(this);
    this._messageWindow._helpWindow.y = (Graphics.boxHeight - this._messageWindow._helpWindow.height - this._messageWindow._itemWindow.height) / 2;
	this.addWindow(this._messageWindow._helpWindow);
};

var alias_window_message_createsubwindows = Window_Message.prototype.createSubWindows;
Window_Message.prototype.createSubWindows = function() {
	alias_window_message_createsubwindows.call(this);
    this._helpWindow = new Window_Help();
    this._helpWindow.openness = 0;

    this._itemWindow.setHelpWindow(this._helpWindow);
};

var alias_window_message_start = Window_Message.prototype.startMessage;
Window_Message.prototype.startMessage = function() {
	alias_window_message_start.call(this);
	if (CrossExamine.pressSprite.opacity === 0) return;

	CrossExamine.press = false;
	CrossExamine.present = false;
	CrossExamine.pressSprite.setFrame(0, 0, image.width, image.height/2);
	CrossExamine.presentSprite.setFrame(0, 0, image.width, image.height/2);
};

//-----------------------------------------------------------------------------
// Scene_Map
//
var alias_scene_map_create = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
    alias_scene_map_create.call(this);
    this.createCEOverlayWindow();
};

CrossExamine.pressSprite = null;
CrossExamine.presentSprite = null;

Scene_Map.prototype.createCEOverlayWindow = function() {
	if (CrossExamine.pressSprite === null) {
		CrossExamine.pressSprite = new Sprite(ImageManager.loadBitmap("img/crossexe/", "press"));
		CrossExamine.presentSprite = new Sprite(ImageManager.loadBitmap("img/crossexe/", "present"));

		CrossExamine.pressSprite.opacity = 0;
		CrossExamine.presentSprite.opacity = 0;

		CrossExamine.pressSprite.x = 0;
		CrossExamine.pressSprite.y = 0;
		CrossExamine.pressSprite.setFrame(0, 0, image.width, image.height/2);

		CrossExamine.pressSprite.update = function() {
			if (this.opacity === 0) return;
			if (!Input.isTriggered('pressSuspect') && !(TouchInput.isTriggered() && TouchInput._x < image.width && TouchInput._y < image.height / 2)) return;

			if (!CrossExamine.press) {
				CrossExamine.press = true;
				CrossExamine.present = false;

				this.setFrame(0, image.height/2, image.width, image.height/2);
				CrossExamine.presentSprite.setFrame(0, 0, image.width, image.height/2);

			} else {
				CrossExamine.press = false;
				this.setFrame(0, 0, image.width, image.height/2);
			}
		}

		CrossExamine.presentSprite.x = Graphics.boxWidth - image.width;
		CrossExamine.presentSprite.y = 0;
		CrossExamine.presentSprite.setFrame(0, 0, image.width, image.height/2);

		CrossExamine.presentSprite.update = function() {
			if (this.opacity === 0) return;
			if (!Input.isTriggered('presentEvidence') && !(TouchInput.isTriggered() && TouchInput._x > Graphics.boxWidth - image.width && TouchInput._y < image.height / 2)) return;
			
			if (!CrossExamine.present) {
				CrossExamine.present = true;
				CrossExamine.press = false;

				this.setFrame(0, image.height/2, image.width, image.height/2);
				CrossExamine.pressSprite.setFrame(0, 0, image.width, image.height/2);

			} else {
				CrossExamine.present = false;
				this.setFrame(0, 0, image.width, image.height/2);
			}
		}
	}

	this.addChild(CrossExamine.pressSprite);
	this.addChild(CrossExamine.presentSprite);
};

CrossExamine.showOverlay = function() {
	if (CrossExamine.pressSprite.opacity === 255) return;
	
	CrossExamine.pressSprite.opacity = 255;
	CrossExamine.presentSprite.opacity = 255;
	Input.keyMapper[pressKey] = 'pressSuspect';
	Input.keyMapper[presentKey] = 'presentEvidence';
}

CrossExamine.hideOverlay = function() {
	if (CrossExamine.pressSprite.opacity === 0) return;

	CrossExamine.pressSprite.opacity = 0;
	CrossExamine.presentSprite.opacity = 0;
	Input.keyMapper[pressKey] = CrossExamine.savedKeys[pressKey];
	Input.keyMapper[presentKey] = CrossExamine.savedKeys[presentKey];
}

//-----------------------------------------------------------------------------
// pluginCommand
//
var CrossExamination_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function (command, args) {
	CrossExamination_Game_Interpreter_pluginCommand.call(this, command, args);
	if (command === "CrossExamine" ) {
		if (args[0] === "show") CrossExamine.showOverlay();
		if (args[0] === "hide" ) CrossExamine.hideOverlay();
	}
}
/* END */
})();