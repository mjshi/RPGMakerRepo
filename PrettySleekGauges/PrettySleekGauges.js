//=============================================================================
// PrettySleekGauges.js
//=============================================================================

var Imported = Imported || {};
Imported.PrettySleekGauges = true;

/*:
 * @plugindesc Sleek Gauges! Look at them go, so shiny, so cool. And they're even better when you can change what they look like and use them in battles!
 * @author Vlue Au'Vier (sleek), Rocketmancer​ (pretty), mjshi (pretty sleek)
 *
 * @param Bar Shape
 * @desc Use any combination of | / . < > ( ) \ Ex. // (> or /|
 * @default //
 *
 * @param HP Bar Shape
 * @parent Bar Shape
 * @desc Leave blank to use default. Use any combination of | / . < > ( ) \ Ex. // (> or /|
 * @default 
 *
 * @param MP Bar Shape
 * @parent Bar Shape
 * @desc Leave blank to use default. Use any combination of | / . < > ( ) \ Ex. // (> or /|
 * @default 
 *
 * @param TP Bar Shape
 * @parent Bar Shape
 * @desc Leave blank to use default. Use any combination of | / . < > ( ) \ Ex. // (> or /|
 * @default 
 *
 * @param EXP Bar Shape
 * @parent Bar Shape
 * @desc Leave blank to use default. Use any combination of | / . < > ( ) \ Ex. // (> or /|
 * @default ||
 *
 * @param Gauge Height
 * @desc Default height of the gauges
 * @type number
 * @default 8
 *
 * @param Text Font Size
 * @desc Font size of the gauges.
 * @default 28
 *
 * @param Text Right Buffer
 * @desc How many pixels to buffer the current HP/MP/TP by.
 * @default 2
 *
 * @param Outline Color
 * @desc Hex color.
 * @default #FFFFFF
 *
 * @param Enemy Gauges
 *
 * @param Enemy HP Gauge
 * @parent Enemy Gauges
 *
 * @param Enemy MP Gauge
 * @parent Enemy Gauges
 *
 * @param Enemy TP Gauge
 * @parent Enemy Gauges
 *
 * @param Show Enemy HP Gauges
 * @parent Enemy HP Gauge
 * @type select
 * @default show over
 * @desc Shows the enemy hp bar over/under animations. 
 * (show under/show over/don't show)
 * @option show over
 * @option show under
 * @option don't show
 *
 * @param Show Enemy HP Text
 * @parent Enemy HP Gauge
 * @desc Show the word "HP"?
 * (true/false)
 * @default false
 * @type boolean
 *
 * @param HP Text Y Offset
 * @parent Enemy HP Gauge
 * @desc Y offset of the enemy hp gauges
 * @type number
 * @min -100000000000000000000000
 * @default 0
 *
 * @param Show Enemy HP Value
 * @parent Enemy HP Gauge
 * @desc Show how much HP the enemy has left?
 * (true/false)
 * @default true
 * @type boolean
 *
 * @param Show Up Top
 * @parent Enemy HP Gauge
 * @desc Show the enemy hp gauges above the enemy?
 * (true/false)
 * @type boolean
 * @default true
 *
 * @param Bar Width
 * @parent Enemy HP Gauge
 * @desc Width of the Enemy HP gauge
 * @type number
 * @default 120
 *
 * @param HP Gauge X Offset
 * @parent Enemy HP Gauge
 * @desc X offset of the enemy hp gauges
 * @type number
 * @min -100000000000000000000000
 * @default 0
 *
 * @param HP Gauge Y Offset
 * @parent Enemy HP Gauge
 * @desc Y offset of the enemy hp gauges
 * @type number
 * @min -100000000000000000000000
 * @default 0
 *
 * @param Image Height Multiplier
 * @parent Enemy HP Gauge
 * @desc How far up the image to place the HP bar, in a decimal percentage.
 * @type number
 * @decimals 2
 * @default 0.9
 *
 * @param State Positioning
 * @parent Enemy Gauges
 * @desc Since our HP gauge covers parts of it.
 *
 * @param State X Offset
 * @parent State Positioning
 * @desc X offset of the enemy states
 * @type number
 * @min -100000000000000000000000
 * @default 0
 *
 * @param State Y Offset
 * @parent State Positioning
 * @desc Y offset of the enemy states
 * @type number
 * @min -100000000000000000000000
 * @default 30
 *
 * @param State Height Multiplier
 * @parent State Positioning
 * @desc How far up the image to place the state icons, in a decimal percentage.
 * @type number
 * @decimals 2
 * @default 0.9
 *
 * @param Show Enemy MP
 * @parent Enemy MP Gauge
 * @type boolean
 * @desc Show a tiny MP gauge?
 * (true/false)
 * @default true
 *
 * @param Show Enemy TP
 * @parent Enemy TP Gauge
 * @type boolean
 * @desc Show a tiny TP gauge?
 * (true/false)
 * @default true
 *
 * @param Show MP Bar When MMP is 0
 * @parent Enemy MP Gauge
 * @type boolean
 * @desc Show the MP bar when the enemy's max mp is 0?
 * (true/false)
 * @default false
 *
 * @param Tiny Gauge Height
 * @parent Enemy MP Gauge
 * @type number
 * @desc Height of the tiny gauge
 * @default 2
 *
 * @param Tiny Gauge X Offset
 * @parent Enemy MP Gauge
 * @type number
 * @min -100000000000000000000000
 * @desc X Offset of the tiny gauge
 * @default 0
 *
 * @param Tiny Gauge Y Offset
 * @parent Enemy MP Gauge
 * @type number
 * @min -100000000000000000000000
 * @desc Y Offset of the tiny gauge
 * @default 0
 *
 * @param Tiny Gauge Width Adjust
 * @parent Enemy MP Gauge
 * @type number
 * @min -100000000000000000000000
 * @desc Adjust the width of the tiny gauge
 * @default 0
 *
 * @param Animated Numbers
 * @desc Whether or not numbers count down/up
 * (true/false)
 * @type boolean
 * @default true
 *
 * @param Animated Gauges
 * @desc Whether or not the gauge is animated
 * (true/false)
 * @type boolean
 * @default true
 *
 * @param Don't Animate In Status
 * @desc Whether or not to animate in the status screen
 * (true/false)
 * @type boolean
 * @default false
 *
 * @param Don't Animate In Menu Status
 * @desc Whether or not to animate in the menu status
 * (true/false)
 * @type boolean
 * @default true
 *
 * @param Don't Animate In Actor Targeting
 * @desc Whether or not to animate in the actor targeting window during battle
 * (true/false)
 * @type boolean
 * @default true
 *
 * @param Extras
 *
 * @param Show EXP Bar
 * @parent Extras
 * @desc Show the EXP bar?
 * (true/false)
 * @default true
 * @type boolean
 *
 * @param Critical HP Change
 * @desc HP text becomes red when HP is critically low
 * (true/false)
 * @type boolean
 * @parent Extras
 * @default true
 *
 * @param Critical MP Change
 * @desc MP text becomes red when MP is critically low
 * (true/false)
 * @type boolean
 * @parent Extras
 * @default true
 *
 * @param Critical TP Change
 * @desc TP text becomes red when TP is critically low
 * (true/false)
 * @type boolean
 * @parent Extras
 * @default false
 *
 * @param Show EXP Bar
 * @parent Extras
 * @desc Show the EXP bar?
 * (true/false)
 * @default true
 * @type boolean
 *
 * @param Status Icon XY Offset
 * @parent Extras
 * @desc Manually control where status icons are placed. Leave blank if you don't have out of battle statuses. Format: X, Y
 * @default 
 *
 * @param
 * @help 
 * ----------------------------------------------------------------------------
 *   Pretty Sleek Gauges v1.03d
 * ----------------------------------------------------------------------------
 *   Free to use in any project with credit to:
 *     Vlue             (original plugin)
 *     Rocketmancer     (Prettier Gauges)
 *     mjshi            (merging, edits, and enemy HP bars)
 * ----------------------------------------------------------------------------
 *  Extra Notetags:
 *    If there's just that ONE enemy (looking at you, Slime) that has its
 *    face covered up by the HP bar, you can use these notetags:
 *
 *  <HPBarXOffset:#>
 *  <HPBarYOffset:#>
 * 
 *    to manually put it in its place.
 *    The # can be positive or negative. So in that slime example, with the
 *    default settings, having a <HPBarYOffset:-20> there fixes the issue.
 *
 *  Also, for bosses, you can hide the HP/MP/TP bar via these:
 *    <HideEnemyHPBar>
 *    <HideEnemyMPBar>
 *    <HideEnemyTPBar>
 *
 *  Additionally, since enemies using TP is rare, if you have "Show Enemy TP"
 *  set to false, you can still show the TP bar with this notetag:
 *    <ShowEnemyTPBar>
 *  for those rare few enemies that DO use TP.
 *
 * ----------------------------------------------------------------------------
 *   Other Notes
 *   - Don't use Show Over for the Show Enemy HP Gauges parameter if you're
 *     also using Hime's Enemy Reinforcements.
 * ----------------------------------------------------------------------------
 *  Original Plugin By Vlue
 *
 *  Facebook: https://www.facebook.com/DaimoniousTailsGames/
 *  Website: http://daimonioustails.weebly.com/
 * ----------------------------------------------------------------------------
 *  Merged with Prettier Gauges/Custom Gauges by Rocketmancer​
 *    https://forums.rpgmakerweb.com/index.php?threads/prettier-gauges.47077/
 * ----------------------------------------------------------------------------
 *  Changes from the forum version:
 *  - merged a couple functions
 *  - added support for \ style gauges
 *  - fixed issue with overfilling the gauge
 *  - added support for enemy HP gauges
 *  - added support for individual HP gauge offsets
 *  - added support for EXP gauges and individual bar styles
 * ----------------------------------------------------------------------------
 * superMasterSword's edits:
 * - compatibility with Yanfly's Absorption Barrier (see addon)
 * - all gauges no longer need a maximum value to work
 * - gauges won't animate when picking an actor to target during battle
 * - changed how critical text colors are handled
 * ----------------------------------------------------------------------------
 * > Is something broken? Go to http://mjshi.weebly.com/contact.html and I'll
 *   try my best to help you!
 * 
 */

function Special_Gauge() {
	this.initialize.apply(this, arguments);
}
function Window_EnemyHPBars() {
	this.initialize.apply(this, arguments);
}
function Line_Gauge() {
	this.initialize.apply(this, arguments);
}

(function() {

var parameters = PluginManager.parameters('PrettySleekGauges');
var defaultHeight = parseInt(parameters['Gauge Height'] || 8);
var defaultTinyHeight = parseInt(parameters['Tiny Gauge Height'] || 2);
var animatedNumbers = (parameters['Animated Numbers'] || "true") === "true";
var animatedGauges = (parameters['Animated Gauges'] || "true") === "true";
var gaugeOutColor = parameters['Outline Color'] || "#FFFFFF";
var textRightBuffer = parseInt(parameters['Text Right Buffer'] || 2);
var gaugeFontSize = parseInt(parameters['Text Font Size'] || 28)

var barTypeLeft = String(parameters['Bar Shape']).substring(0,1);
var barTypeRight = String(parameters['Bar Shape']).substring(1,2);
var saveBarTypeLeft = barTypeLeft;
var saveBarTypeRight = barTypeRight;
var hpBarTypeLeft = (parameters['HP Bar Shape'].length === 2) ? String(parameters['HP Bar Shape']).substring(0,1) : false;
var hpBarTypeRight = (parameters['HP Bar Shape'].length === 2) ? String(parameters['HP Bar Shape']).substring(1,2) : false;
var mpBarTypeLeft = (parameters['MP Bar Shape'].length === 2) ? String(parameters['MP Bar Shape']).substring(0,1) : false;
var mpBarTypeRight = (parameters['MP Bar Shape'].length === 2) ? String(parameters['MP Bar Shape']).substring(1,2) : false;
var tpBarTypeLeft = (parameters['TP Bar Shape'].length === 2) ? String(parameters['TP Bar Shape']).substring(0,1) : false;
var tpBarTypeRight = (parameters['TP Bar Shape'].length === 2) ? String(parameters['TP Bar Shape']).substring(1,2) : false;
var expBarTypeLeft = (parameters['EXP Bar Shape'].length === 2) ? String(parameters['EXP Bar Shape']).substring(0,1) : false;
var expBarTypeRight = (parameters['EXP Bar Shape'].length === 2) ? String(parameters['EXP Bar Shape']).substring(1,2) : false;

var showEnemyHP = (parameters['Show Enemy HP Gauges']).startsWith("show");
var showOver = (parameters['Show Enemy HP Gauges']).endsWith("over");
var showUpTop = (parameters['Show Up Top'] || "true") === "true";
var EHPXOffset = parseInt(parameters['HP Gauge X Offset']) || 0;
var EHPYOffset = parseInt(parameters['HP Gauge Y Offset']) || 0;
var EHPbarWidth = parseInt(parameters['Bar Width']) || 120;
var showEHPHP = (parameters['Show Enemy HP Text'] || "false") === "true";
var textYOffset = parseInt(parameters['HP Text Y Offset']) || 0;
var showEHPText = (parameters['Show Enemy HP Value'] || "true") === "true";
var EHPYMultiplier = parseInt(parameters['Image Height Multiplier']) || 0.9;
var EHPStateXOffset = parseInt(parameters['State X Offset']) || 0;
var EHPStateYOffset = parseInt(parameters['State Y Offset']) || 30;
var shouldDrawEnemyMP = (parameters['Show Enemy MP'] || "true") === "true";
var drawEnemyMPWhenNoMP = (parameters['Show MP Bar When MMP is 0'] || "true") === "true";
var tinyWidthAdjust = parseInt(parameters['Tiny Gauge Width Adjust']) || 0;
var tinyGaugeXOffset = parseInt(parameters['Tiny Gauge X Offset']) || 0;
var tinyGaugeYOffset = parseInt(parameters['Tiny Gauge Y Offset']) || 0;
var shouldDrawEnemyTP = (parameters['Show Enemy TP'] || "true") === "true";
var stopAnimatingOnActorStatus = (parameters["Don't Animate In Status"] || "false") === "true";
var stopAnimatingOnActorMenuStatus = (parameters["Don't Animate In Menu Status"] || "false") === "true";
var stopAnimatingOnActorTarget = (parameters["Don't Animate In Actor Targeting"] || "true") === "true";

var criticalHP = (parameters['Critical HP Change'] || "true") === "true";
var criticalMP = (parameters['Critical MP Change'] || "true") === "true";
var criticalTP = (parameters['Critical TP Change'] || "false") === "true";
var showEXP = (parameters['Show EXP Bar'] || "true") === "true";
var statusXY = (parameters['Status Icon XY Offset'] || "0").split(", ").map(Number);

//=============================================================================
// Sleek Gauges
//=============================================================================
Window_Base.prototype.drawStaticGauge = function(x, y, width, rate, c1, c2, type) {
	switch (type) {
		case "hp":
			barTypeLeft = hpBarTypeLeft || barTypeLeft;
			barTypeRight = hpBarTypeRight || barTypeRight;
			break;
		case "mp":
			barTypeLeft = mpBarTypeLeft || barTypeLeft;
			barTypeRight = mpBarTypeRight || barTypeRight;
			break;
		case "tp":
			barTypeLeft = tpBarTypeLeft || barTypeLeft;
			barTypeRight = tpBarTypeRight || barTypeRight;
			break;
		case "exp":
			barTypeLeft = expBarTypeLeft || barTypeLeft;
			barTypeRight = expBarTypeRight || barTypeRight;
			break;
	}

	var height = defaultHeight;
	var fill_w = width * rate;
	var gy = y + this.lineHeight() - height - 1;

	this.contents.drawTrap(x, gy, width - 2, height, this.gaugeBackColor(), true);
	this.contents.drawTrap(x, gy, fill_w, height, c1, c2, "atop");
	this.contents.drawTrap(x, gy, width - 2, height, gaugeOutColor);

	barTypeLeft = saveBarTypeLeft;
	barTypeRight = saveBarTypeRight;
}

Window_Base.prototype.drawAnimatedGauge = function(x, y, width, rate, c1, c2, type) {
	if (this._gauges == null) this._gauges = {};
	var gkey = this.makeGaugeKey(x, y);
	if (this._gauges[gkey]) {
		this._gauges[gkey].setRate(rate);
	} else {
		this._gauges[gkey] = new Special_Gauge(x, y, width, rate, c1, c2, this, defaultHeight, type);
	}
}

var windowBaseUpdate = Window_Base.prototype.update;
Window_Base.prototype.update = function() {
	windowBaseUpdate.call(this);
	if (this._gauges) for(var bar in this._gauges) this._gauges[bar].update();
}

Window_Base.prototype.makeGaugeKey = function(x, y) {
	return "k" + x + "-" + y;
}

Window_Base.prototype.drawActorHp = function(actor, x, y, width) {
	width = width || 186;
	this.drawAnimatedGauge(x, y, width, actor.hpRate(), this.hpGaugeColor1(), this.hpGaugeColor2(), "hp");
	this._gauges[this.makeGaugeKey(x, y)].setExtra(TextManager.hpA, actor.hp, actor.mhp);
}

Window_Base.prototype.drawActorMp = function(actor, x, y, width) {
	width = width || 186;
	this.drawAnimatedGauge(x, y, width, actor.mpRate(), this.mpGaugeColor1(), this.mpGaugeColor2(), "mp");
	this._gauges[this.makeGaugeKey(x, y)].setExtra(TextManager.mpA, actor.mp, actor.mmp);
}

Window_Base.prototype.drawActorTp = function(actor, x, y, width) {
	width = width || 186;
	this.drawAnimatedGauge(x, y, width, actor.tpRate(), this.tpGaugeColor1(), this.tpGaugeColor2(), "tp");
	this._gauges[this.makeGaugeKey(x, y)].setExtra(TextManager.tpA, actor.tp, actor.maxTp());
}

Window_MenuStatus.prototype.drawActorEXP = function(actor, x, y, width) {
	if (!showEXP) return;
	var rate = (actor.currentExp() - actor.currentLevelExp()) / (actor.nextLevelExp() - actor.currentLevelExp());
	if (actor.level === actor.maxLevel()) rate = 1;

	this.drawStaticGauge(x, y, width, rate, this.textColor(0), this.textColor(8), "exp");

	this.changeTextColor(this.systemColor());
	this.drawText(TextManager.expA, x, y, 44);
	this.changeTextColor(this.normalColor());
	this.drawText((Math.floor(rate * 10000) / 100) + "%", x, y, width,"right");
};

if (Imported.YEP_PartySystem) {
Window_PartyDetail.prototype.drawActorHp = function(actor, x, y, width) {
    width = width || 186;
    var color1 = this.hpGaugeColor1();
    var color2 = this.hpGaugeColor2();
    this.drawStaticGauge(x, y, width, actor.hpRate(), color1, color2, "hp");
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.hpA, x, y, 44);
    this.drawCurrentAndMax(actor.hp, actor.mhp, x, y, width, this.hpColor(actor), this.normalColor());
};

Window_PartyDetail.prototype.drawActorMp = function(actor, x, y, width) {
    width = width || 186;
    var color1 = this.mpGaugeColor1();
    var color2 = this.mpGaugeColor2();
    this.drawStaticGauge(x, y, width, actor.mpRate(), color1, color2, "mp");
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.mpA, x, y, 44);
    this.drawCurrentAndMax(actor.mp, actor.mmp, x, y, width, this.mpColor(actor), this.normalColor());
};

Window_PartyDetail.prototype.drawActorTp = function(actor, x, y, width) {
    width = width || 96;
    var color1 = this.tpGaugeColor1();
    var color2 = this.tpGaugeColor2();
    this.drawStaticGauge(x, y, width, actor.mpRate(), color1, color2, "tp");
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.tpA, x, y, 44);
    this.changeTextColor(this.tpColor(actor));
    this.drawText(actor.tp, x + width - 64, y, 64, 'right');
};

}

Window_MenuStatus.prototype.drawActorSimpleStatus = function(actor, x, y, width) {
	if (statusXY.length === 2) {
		var lineHeight = this.lineHeight();
		var x2 = x + 180;
		var width2 = Math.min(200, width - 180 - this.textPadding());
		this.drawActorName(actor, x, y);
		this.drawActorLevel(actor, x, y + lineHeight * 1);
		this.drawActorIcons(actor, x + statusXY[0], y + lineHeight * 2 + statusXY[1]);
		this.drawActorClass(actor, x2, y);
		this.drawActorHp(actor, x2, y + lineHeight * 1, width2);
		this.drawActorMp(actor, x2, y + lineHeight * 2, width2);
	} else {
		Window_Base.prototype.drawActorSimpleStatus.call(this, actor, x, y, width);
	}

	if (Imported.YEP_CoreEngine) {
		this.drawActorEXP(actor, x, y + this.lineHeight()*2, 145);
	} else {
		this.drawActorEXP(actor, x, y + this.lineHeight()*2, Math.min(200, width - 200 - this.textPadding()));
	}
};

// cede to Yanfly for level drawing
if (!Imported.YEP_CoreEngine) {
Window_MenuStatus.prototype.drawActorLevel = function(actor, x, y) {
	this.changeTextColor(this.systemColor());
	this.drawText(TextManager.levelA, x, y, 48);
	this.resetTextColor();
	this.drawText(actor.level, x + 130, y, 36, 'right');
};
}

Special_Gauge.prototype.constructor = Special_Gauge;
Special_Gauge.prototype.initialize = function(x, y, w, r, c1, c2, basewindow, h, t) {
	this._x = x;
	this._y = y;
	this._width = w;
	this._curRate = this._maxRate = r;
	this._vocab = false;
	this._color = [c1, c2];
	this._window = basewindow;
	this._speed = 0;
	this._speedRate = 0;
	this._height = h;
	this._type = t;
	this._fallSprites = [];
	this._showEHPHP = true;
	this._showEHPText = true;
}

Special_Gauge.prototype.setTextVisibility = function(hpText, hpNum) {
	this._showEHPHP = hpText;
	this._showEHPText = hpNum;
}

Special_Gauge.prototype.critText = function() {
	switch (this._type) {
		case "hp":
			return criticalHP;
			break;
		case "mp":
			return criticalMP;
			break;
		case "tp":
			return criticalTP;
			break;
		default:
			return false;
			break;
	}
}

Special_Gauge.prototype.doneUpdating = function() {
	return this._curRate === this._maxRate && this._curVal === this._setVal;
};

Special_Gauge.prototype.update = function() {
	if (this.doneUpdating()) return;
	
	if (this._curRate > this._maxRate) this._curRate -= this._speedRate;
	if (this._curVal > this._setVal) this._curVal -= this._speed;

	if (this._curRate < this._maxRate) this._curRate += this._speedRate;
	if (this._curVal < this._setVal) this._curVal += this._speed;

	if (Math.abs(this._curRate - this._maxRate) < this._speedRate) this._curRate = this._maxRate;
	if (Math.abs(this._curVal - this._setVal) < this._speed) this._curVal = this._setVal;

	if (!animatedNumbers || this.shouldntAnimate()) this._curVal = this._setVal;
	if (!animatedGauges || this.shouldntAnimate()) this._curRate = this._maxRate;
	
	this.refresh();
}

Special_Gauge.prototype.shouldntAnimate = function() {
	if (stopAnimatingOnActorTarget && this._window instanceof Window_BattleActor) return true;
	if (stopAnimatingOnActorStatus && this._window instanceof Window_Status) return true;
	if (stopAnimatingOnActorMenuStatus && this._window instanceof Window_MenuStatus) return true;
	return false;
};

Special_Gauge.prototype.refresh = function() {
	var gy = this._y + this._window.lineHeight() - 2;
	if (this._vocab) {
		gy -= this.fontSize();
		this._window.contents.clearRect(this._x-1, gy, this._width + 2, this.fontSize() + 2);		
	} else {
		gy -= this._height;
		this._window.contents.clearRect(this._x, gy, this._width + 2, this._height);
	}
	this.drawGauge();
	this.drawText();
}

Special_Gauge.prototype.setRate = function(rate) {
	if (rate === this._maxRate) return;
	this._maxRate = rate;
	this._speedRate = Math.abs(this._curRate - this._maxRate) / 60;
}

Special_Gauge.prototype.setExtra = function(text, val, max, yOffset) {
	this._vocab = true;
	this._text = text;
	if (max) this._maxVal = max;
	if (val || val === 0) {
		if (val != this._setVal) {
			this._speed = Math.max(0, Math.abs(this._curVal - val) / 60);
		}
		this._setVal = val;
		if (this._curVal === undefined) {
			this._curVal = val;
		}
	}
	this._yOffset = yOffset ? yOffset : 0;
	this.refresh();
}

Special_Gauge.prototype.drawGauge = function() {
	var fill_w = Math.round((this._width - 2) * this._curRate);
	var fill_ww = Math.round((this._width - 2) * this._maxRate);
	var gy = this._y + this._window.lineHeight() - this._height - 1;

	switch (this._type) {
		case "hp":
			barTypeLeft = hpBarTypeLeft || barTypeLeft;
			barTypeRight = hpBarTypeRight || barTypeRight;
			break;
		case "mp":
			barTypeLeft = mpBarTypeLeft || barTypeLeft;
			barTypeRight = mpBarTypeRight || barTypeRight;
			break;
		case "tp":
			barTypeLeft = tpBarTypeLeft || barTypeLeft;
			barTypeRight = tpBarTypeRight || barTypeRight;
			break;

	}

	this._window.contents.drawTrap(this._x, gy, this._width - 2, this._height, this._window.gaugeBackColor(), true);
	this._window.contents.drawTrap(this._x, gy, fill_w, this._height, this._color[0], this._color[1], "atop");
	this._window.contents.drawTrap(this._x, gy, this._width - 2, this._height, gaugeOutColor);

	barTypeLeft = saveBarTypeLeft;
	barTypeRight = saveBarTypeRight;
}

Special_Gauge.prototype.fontSize = function() {
	// edit to make different font sizes:
	// for example: 
	// if (this._window instanceof Window_BattleStatus) return 20;
	return gaugeFontSize;
}

Special_Gauge.prototype.drawText = function() {
	if (this._vocab) {
		var width = this._width;
		var x = this._x;
		var storeFontSize = this._window.contents.fontSize;
		this._window.contents.fontSize = this.fontSize();

		if (this._showEHPHP) {
			this._window.changeTextColor(this._window.systemColor());
			this._window.drawText(this._text, this._x + 1, this._y + this._yOffset);
			width -= this._window.textWidth(this._text);
			x += this._window.textWidth(this._text);
		}

		if (this._showEHPText) {
			width -= textRightBuffer;
			this._window.changeTextColor(this._window.normalColor());
			if (this.critText()) {
				if (this._curVal < this._maxVal / 10) {
					this._window.changeTextColor(this._window.deathColor());
				} else if (this._curVal < this._maxVal / 4) {
					this._window.changeTextColor(this._window.crisisColor());
				}
			}

			if (!this._maxVal || this._width < 186) {
				this._window.drawText(Math.round(this._curVal), x, this._y + this._yOffset, width, "right");
			} else {
				this._window.drawText(Math.round(this._curVal), x, this._y + this._yOffset, width - this._window.textWidth("/" + this._maxVal), "right");
				this._window.changeTextColor(this._window.normalColor());
				this._window.drawText("/", x, this._y + this._yOffset, width - this._window.textWidth(this._maxVal), "right");
				this._window.drawText(this._maxVal, x, this._y + this._yOffset, width, "right");
			}
		}

		this._window.contents.fontSize = storeFontSize;
	}
}

//=============================================================================
// Pretty Gauges
//=============================================================================
Bitmap.prototype.drawTrap = function(x, y, width, height, color1, color2, shouldFill) {
	var context = this._context;
	var grad = context.createLinearGradient(x, y, x + width, y);
	var startCoords = [];

	if (typeof color2 === 'boolean') {
		shouldFill = color2;
		color2 = undefined;
	}
	if (color2 === undefined) color2 = color1;

	if (shouldFill === "atop") {
		context.globalCompositeOperation = 'source-atop';
	} else {
		context.globalCompositeOperation = 'source-over';
	}

	grad.addColorStop(0, color1);
	grad.addColorStop(1, color2);

	context.save();
	context.beginPath();

	switch (barTypeLeft) {
		case "|":
			startCoords = [x, y + height]
			context.moveTo(x, y + height)
			context.lineTo(x, y)
			break;
		case "/":
			startCoords = [x, y + height]
			context.moveTo(x, y + height)
			context.lineTo(x + height, y)
			break;
		case "<":
			startCoords = [x + height/2, y + height]
			context.moveTo(x + height/2, y + height)
			context.lineTo(x, y + height/2)
			context.lineTo(x + height/2, y)
			break;
		case "(":
			startCoords = [x + height, y + height]
			context.moveTo(x + height, y + height);
			context.bezierCurveTo(x, y + height, x, y, x + height, y);
			break;
		case ".":
			startCoords = [x, y + height]
			context.moveTo(x, y + height)
			break;
		case "\\":
			startCoords = [x + height, y + height]
			context.moveTo(x + height, y + height)
			context.lineTo(x, y)
			break;
	}
	
	switch (barTypeRight) {
		case "|":
			context.lineTo(x + width, y)
			context.lineTo(x + width, y + height)
			break;
		case "/":
			context.lineTo(x + width, y)
			context.lineTo(x + width - height, y + height)
			break;
		case ">":
			context.lineTo(x + width - height/2, y)
			context.lineTo(x + width, y + height/2)
			context.lineTo(x + width - height/2, y + height)
			break;
		case ")":
			context.lineTo(x + width - height, y);
			context.bezierCurveTo(x + width, y, x + width, y + height, x + width - height, y + height);
			break;
		case ".":
			context.lineTo(x + width, y + height)
			break;
		case "\\":
			context.lineTo(x + width - height, y)
			context.lineTo(x + width, y + height)
			break;
	}

	context.lineTo(startCoords[0], startCoords[1])

	if (shouldFill) {
		context.fillStyle = grad;
		context.fill();
	} else {
		context.strokeStyle = grad;
		context.stroke();
	}

	context.restore();
	this._setDirty();
}

//=============================================================================
// EnemyGauges
//=============================================================================
if (showEnemyHP) {

Window_EnemyHPBars.prototype = Object.create(Window_Base.prototype);
Window_EnemyHPBars.prototype.constructor = Window_EnemyHPBars;

Window_EnemyHPBars.prototype.initialize = function(sprites) {
	Window_Base.prototype.initialize.call(this, 0, 0, Graphics.boxWidth, Graphics.boxHeight);
	this.opacity = 0;
	this._enemySprites = sprites;//.slice().reverse();
};

Window_EnemyHPBars.prototype.standardPadding = function() {
	return 0;
};

Window_EnemyHPBars.prototype.clearGauges = function(actor, x, y, width) {
	height = this.lineHeight();
	if (this._gauges[this.makeTGaugeKey(x + tinyGaugeXOffset, y + 1 + tinyGaugeYOffset)]) height += defaultTinyHeight + 1;
	if (this._gauges[this.makeTGaugeKey(x + tinyGaugeXOffset, y + 1 + tinyGaugeYOffset + defaultTinyHeight + 2)]) height += defaultTinyHeight + 2;
	this.contents.clearRect(x - defaultHeight, y, width + defaultHeight, height);
};

Window_EnemyHPBars.prototype.drawActorHp = function(actor, x, y, width) {
	this.drawAnimatedGauge(x, y, width, actor.hpRate(), this.hpGaugeColor1(), this.hpGaugeColor2(), "hp");
	this._gauges[this.makeGaugeKey(x, y)].setTextVisibility(showEHPHP, showEHPText);
	this._gauges[this.makeGaugeKey(x, y)].setExtra(TextManager.hpA, actor.hp, actor.mhp, textYOffset);
}

Window_EnemyHPBars.prototype.drawActorMp = function(actor, x, y, width) {
	this.drawTinyGauge(x + tinyGaugeXOffset, y + 1 + tinyGaugeYOffset, width + tinyWidthAdjust, (actor.mmp !== 0 ? actor.mpRate() : 0), this.mpGaugeColor1(), this.mpGaugeColor2(), "mp");
	this._gauges[this.makeTGaugeKey(x + tinyGaugeXOffset, y + 1 + tinyGaugeYOffset)].setExtra(TextManager.mpA, actor.mp, actor.mmp);
}

Window_EnemyHPBars.prototype.drawActorTp = function(actor, x, y, width) {
	this.drawTinyGauge(x + tinyGaugeXOffset, y + 1 + tinyGaugeYOffset, width + tinyWidthAdjust, actor.tpRate(), this.tpGaugeColor1(), this.tpGaugeColor2(), "tp");
	this._gauges[this.makeTGaugeKey(x + tinyGaugeXOffset, y + 1 + tinyGaugeYOffset)].setExtra(TextManager.tpA, actor.tp, actor.maxTp());
}

Window_EnemyHPBars.prototype.drawEnemyGauges = function(actor, x, y, width) {
	if (actor.enemy().meta.HideEnemyHPBar) return;
	if (actor.isHidden()) return;
	if (this._gauges && this._gauges[this.makeGaugeKey(x, y)] && ((this._gauges[this.makeGaugeKey(x, y)]._curVal === 0 || this._gauges[this.makeGaugeKey(x, y)]._curRate === 0) && actor.hp === 0)) return;

	barTypeLeft = actor.enemy().meta.BarTypeLeft || hpBarTypeLeft || barTypeLeft;
	barTypeRight = actor.enemy().meta.BarTypeRight || hpBarTypeRight || barTypeRight;
	this.drawActorHp(actor, x, y, width);
	barTypeLeft = saveBarTypeLeft;
	barTypeRight = saveBarTypeRight;

	if (shouldDrawEnemyMP && (drawEnemyMPWhenNoMP || actor.mmp > 0) && !actor.enemy().meta.HideEnemyMPBar) {
		this.drawActorMp(actor, x, y, width);
		y += defaultTinyHeight + 2;
	}

	if ((shouldDrawEnemyTP && !actor.enemy().meta.HideEnemyTPBar) || (!shouldDrawEnemyTP && actor.enemy().meta.ShowEnemyTPBar)) {
		this.drawActorTp(actor, x, y, width);
	}
}

Window_EnemyHPBars.prototype.makeTGaugeKey = function(x, y) {
	return "tk" + x + "-" + y;
}

Window_EnemyHPBars.prototype.drawTinyGauge = function(x, y, width, rate, c1, c2, type) {
	if (this._gauges == null) { this._gauges = {} };
	var gkey = this.makeTGaugeKey(x, y)
	if (this._gauges[gkey]) {
		this._gauges[gkey].setRate(rate);
	} else {
		this._gauges[gkey] = new Line_Gauge(x, y, width, rate, c1, c2, this, defaultTinyHeight, type);
	}
}

Window_EnemyHPBars.prototype.update = function() {
	Window_Base.prototype.update.call(this);
	var width = EHPbarWidth, x, y;
	var enemies = $gameTroop.members();

	this.contents.clearRect(0, 0, Graphics.boxWidth, Graphics.boxHeight);
	for (var i = 0; i < enemies.length; i++) {
		if (this._enemySprites[i] === undefined) continue;
		if (!this._enemySprites[i].height || !this._enemySprites[i].width) continue;

		x = enemies[i].screenX() - (width + this.textPadding())/2 + EHPXOffset + (parseInt(enemies[i].enemy().meta.HPBarXOffset) || 0);
		y = enemies[i].screenY() - this.lineHeight() + EHPYOffset + (parseInt(enemies[i].enemy().meta.HPBarYOffset) || 0);
		if (showUpTop) y -= this._enemySprites[i].height * EHPYMultiplier;
		this.drawEnemyGauges(enemies[i], x, y, width);

	}
}	

Line_Gauge.prototype = Object.create(Special_Gauge.prototype);
Line_Gauge.prototype.constructor = Line_Gauge;

Line_Gauge.prototype.refresh = function() {
	this._window.contents.clearRect(this._x, this.y, this._width, this._height);
	this.drawGauge();
}

Line_Gauge.prototype.drawGauge = function() {
	var fill_w = Math.round((this._width - 2 - defaultHeight) * this._curRate);
	var fill_ww = Math.round((this._width - 2) * this._maxRate);
	var gy = this._y + this._window.lineHeight() - this._height;

	this._window.contents.fillRect(this._x - 1, gy, this._width - defaultHeight, this._height + 2, gaugeOutColor);
	this._window.contents.fillRect(this._x, gy + 1, this._width - 2 - defaultHeight, this._height, this._window.gaugeBackColor());
	this._window.contents.gradientFillRect(this._x, gy + 1, fill_w, this._height, this._color[0], this._color[1]);
}

Line_Gauge.prototype.drawText = function() {};

if (showOver) {
var alias_Scene_Battle_createSpriteset = Scene_Battle.prototype.createSpriteset;
Scene_Battle.prototype.createSpriteset = function() {
	alias_Scene_Battle_createSpriteset.call(this);

	this._enemyHPBarWindow = new Window_EnemyHPBars(this._spriteset._enemySprites);
	this.addChild(this._enemyHPBarWindow);
};
} else {
var alias_Spriteset_Battle_createEnemies = Spriteset_Battle.prototype.createEnemies;
Spriteset_Battle.prototype.createEnemies = function() {
	alias_Spriteset_Battle_createEnemies.call(this);

	this._enemyHPBarWindow = new Window_EnemyHPBars(this._enemySprites);
	this._enemyHPBarWindow.z = 2;
	this._battleField.addChild(this._enemyHPBarWindow);
};
}

Sprite_Enemy.prototype.updateStateSprite = function() {
   this._stateIconSprite.y = -Math.round((this.bitmap.height + EHPStateYOffset) * 0.9);
   if (this._stateIconSprite.y < 20 - this.y) {
	   this._stateIconSprite.y = 20 - this.y;
   }
   this._stateIconSprite.y += (parseInt(this._enemy.enemy().meta.HPBarYOffset) || 0);
   this._stateIconSprite.x = EHPStateXOffset + (parseInt(this._enemy.enemy().meta.HPBarXOffset) || 0);
};
} // End Enemy HP bars

})();
