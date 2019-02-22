//==============================================================================
// BattlePortrait.js
//==============================================================================
 
var Imported = Imported || {};
Imported.BattlePortrait = true;

/*:
* @plugindesc Show portraits during battle.
* @author mjshi
*
* @param Auto Adjust
* @desc (y/n) Automatically align images along the bottom right. Turn off if you want to manually position images using transparent PNGs.
* @default y
*
* @param Opacity
* @desc 0 to 255. 0 = transparent, 255 = opaque
* @default 255
*
* @param X Offset
* @desc Relative to the bottom right corner.
* @default 0
*
* @param Y Offset
* @desc Relative to the bottom right corner.
* @default 0
*
* @param Hide during item and skill selection
* @desc (y/n)
* @default y
*
* @param Hide during enemy target selection
* @desc (y/n)
* @default y
*
* @param Hide during ally target selection
* @desc (y/n)
* @default y
*
* @param Image Filename
* @desc Code that will be evaluated to determine what image to use for each actor.
* @default 'Actor' + actor.actorId()
*
* @help 
* ------------------------------------------------------------------------------
*   BattlePortrait v1.1 by mjshi
*   Free for both commercial and non-commercial use, with credit.
* ------------------------------------------------------------------------------
*   Installation: Place all bust images in img/system.
*   Images should be named "Actor#.png", where # is the corresponding actor ID.
*   
* ------------------------------------------------------------------------------
*   Advanced usage
* ------------------------------------------------------------------------------
*   The Image Filename parameter could be modified to change what image should
*   be loaded. For example, if you wanted to change the actor's battle portrait
*   when their class changes, you could set it to:
*     'Actor' + actor.actorId() + '_' + actor._classId
*
*   That way, images would be named "Actor#_#.png" where the first # is the
*   actor's ID and the second # is the class's ID.
*
* ------------------------------------------------------------------------------
* > Is something broken? Go to http://mjshi.weebly.com/contact.html and I'll
*   try my best to help you!
*/

(function () {
/* BEGIN */

function param(str) {
	return parseInt(PluginManager.parameters('BattlePortrait')[str]);
}

function boolp(str) {
	return (PluginManager.parameters('BattlePortrait')[str] === "y");
}

var portraitOpacity = param("Opacity") || 255;
var xOffset = param("X Offset") || 0;
var yOffset = param("Y Offset") || 0;
var hide1 = boolp("Hide during item and skill selection");
var hide2 = boolp("Hide during enemy target selection");
var hide3 = boolp("Hide during ally target selection");
var autoAdjust = boolp("Auto Adjust");
var imageFilename = PluginManager.parameters('BattlePortrait')["Image Filename"];

//===========================================================
// Scene_Battle
//
var alias_scene_battle_creation = Scene_Battle.prototype.createSpriteset;
Scene_Battle.prototype.createSpriteset = function() {
	alias_scene_battle_creation.call(this);
    this._battlePortraitWindow = new Window_BattlePortrait();
    this.addChild(this._battlePortraitWindow);
};

var alias_scene_battle_actorcmdselect = Scene_Battle.prototype.startActorCommandSelection;
Scene_Battle.prototype.startActorCommandSelection = function() {
	alias_scene_battle_actorcmdselect.call(this);
    this._battlePortraitWindow.setActor(BattleManager.actor());
};

var alias_scene_battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
	alias_scene_battle_update.call(this);

	// Update Battle Portrait Visibility
	this._battlePortraitWindow.visible = this._actorCommandWindow.isOpen() && !this._actorCommandWindow.isClosing();
	if (autoAdjust) this._battlePortraitWindow.visible = this._battlePortraitWindow.visible && !(this._battlePortraitWindow.x === 0 && this._battlePortraitWindow.y === 0);
	if (hide1) this._battlePortraitWindow.visible = this._battlePortraitWindow.visible && !(this._skillWindow.active || this._itemWindow.active);
	if (hide2) this._battlePortraitWindow.visible = this._battlePortraitWindow.visible && !this._enemyWindow.active;
	if (hide3) this._battlePortraitWindow.visible = this._battlePortraitWindow.visible && !this._actorWindow.active;
};

//===========================================================
// Window_BattlePortrait
//
function Window_BattlePortrait() {
	this.initialize.apply(this, arguments);
}

Window_BattlePortrait.prototype = Object.create(Window_Base.prototype);
Window_BattlePortrait.prototype.constructor = Window_BattlePortrait;

Window_BattlePortrait.prototype.initialize = function(x, y) {
	Window_Base.prototype.initialize.call(this, 0, 0, Graphics.boxWidth, Graphics.boxHeight);
	this.opacity = 0;
	this._image = new Sprite();
	this._image.opacity = portraitOpacity;
	this.addChild(this._image);
};

Window_BattlePortrait.prototype.setActor = function(actor) {
	this._image.bitmap = ImageManager.loadSystem(eval(imageFilename));
};

Window_BattlePortrait.prototype.update = function() {
	if (!autoAdjust) return;
	if (!this.visible && !this.x === 0 && !this.y === 0) return;

	if (this._image.bitmap && this._image.bitmap.width !== 0) {
		this.x = Graphics.width - this._image.bitmap.width - xOffset;
		this.y = Graphics.height - this._image.bitmap.height - yOffset;
	}
}

/* END */
})();