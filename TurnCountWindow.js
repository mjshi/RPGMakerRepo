//==============================================================================
// TurnCountWindow.js
//==============================================================================
 
var Imported = Imported || {};
Imported.TurnCountWindow = true;

/*:
* @plugindesc A quick display to know how many turns have passed in battle.
* @author mjshi
*
* @param Turn Count Text
* @desc #'s will be replaced by the turn number. So turn 1 with ### would be 001.
* @default Turn ###
*
* @param Hide Switch ID
* @desc ID of the switch to turn ON to hide the turn count display.
* @type number
* @default 1 
*
* @param Window Opacity
* @desc Transparency of the turn window. 0-255, 0 = completely transparent, 255 = opaque
* @type number
* @min 0
* @max 255
* @default 255 
*
* @param Window X
* @desc X position of the window.
* @type number
* @default 656 
*
* @param Window Y
* @desc Y position of the window.
* @type number
* @default 0 
*
* @param Window Width
* @desc Width of the window.
* @type number
* @default 160 
*
* @param
* @help 
* ------------------------------------------------------------------------------
*   Turn Count Window v1.0 by mjshi
*     Adapted from Turn Window by prico
*     http://pricono.whitesnow.jp/project/rgss3/04_turn_window.html
* ------------------------------------------------------------------------------
*   Free for both commercial and non-commercial use, with credit.
* ------------------------------------------------------------------------------
*
* > Is something broken? Go to http://mjshi.weebly.com/contact.html and I'll
*   try my best to help you!
*/

//Initialize global variables

(function () {
/* BEGIN */

var parameters = PluginManager.parameters('TurnCountWindow');

var turnText = parameters['Turn Count Text'];
var hideSwitch = Number(parameters['Hide Switch ID']) || 1;
var windowOpacity = Number(parameters['Window Opacity']);
var windowX = Number(parameters['Window X']) || 0;
var windowY = Number(parameters['Window Y']) || 0;
var windowWidth = Number(parameters['Window Width']) || 160;

var turnLength = "#".repeat((turnText.match(/#/g) || []).length);

//-----------------------------------------------------------------------------
// Scene_Battle
//
var alias_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
    alias_createAllWindows.call(this);
    this.createTurnCountWindow();
};

Scene_Battle.prototype.createTurnCountWindow = function() {
    this._turnCountWindow = new Window_TurnCount();
    this.addWindow(this._turnCountWindow);
};

var alias_startPartyCommandSelection = Scene_Battle.prototype.startPartyCommandSelection;
Scene_Battle.prototype.startPartyCommandSelection = function() {
	alias_startPartyCommandSelection.call(this);
	this._turnCountWindow.refresh();
};

var alias_startActorCommandSelection = Scene_Battle.prototype.startActorCommandSelection;
Scene_Battle.prototype.startActorCommandSelection = function() {
    alias_startActorCommandSelection.call(this);
	this._turnCountWindow.refresh();
};

var alias_sceneBattleUpdate = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
    alias_sceneBattleUpdate.call(this);

    this._turnCountWindow.visible = !$gameSwitches.value(hideSwitch) && this._statusWindow.isOpen();
};

//-----------------------------------------------------------------------------
// Window_TurnCount
//
function Window_TurnCount() {
    this.initialize.apply(this, arguments);
}

Window_TurnCount.prototype = Object.create(Window_Base.prototype);
Window_TurnCount.prototype.constructor = Window_TurnCount;

Window_TurnCount.prototype.initialize = function() {
    Window_Base.prototype.initialize.call(this, windowX, windowY, windowWidth, this.fittingHeight(1));
    this.opacity = windowOpacity;
    this.refresh();
};

Window_TurnCount.prototype.refresh = function() {
    this.contents.clear();

    var width = this.contents.width - this.textPadding() * 2;
    var text = "" + ($gameTroop.turnCount() + 1);

    for (var i = text.length; i < turnLength.length; i++) text = "0" + text;
    text = turnText.replace(turnLength, text);

    this.drawText(text, this.textPadding(), 0, width, 'center');
};

/* END */
})();