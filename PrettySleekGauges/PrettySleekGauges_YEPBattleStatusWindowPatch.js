/*:
 * @plugindesc Compatibility patch for Yanfly Battle Status Window
 * @author mjshi
 *
 * @help 
 * ----------------------------------------------------------------------------
 *   Pretty Sleek Gauges Yanfly Battle Status Window Patch v1.0c
 *     For Pretty Sleek Gauges versions v1.03c and up
 * ----------------------------------------------------------------------------
 *   Installation: Place below Pretty Sleek Gauges and Yanfly Battle Status.
 *   May slightly impact performance, hence, this is a separate plugin.
 * ----------------------------------------------------------------------------
 * > Is something broken? Go to http://mjshi.weebly.com/contact.html and I'll
 *   try my best to help you!
 * 
 */

(function() {
if (Imported.YEP_BattleStatusWindow && Imported.PrettySleekGauges) {

//=============================================================================
// Configuration
//
var HeightOffset = 8;

//
// End Configuration
//=============================================================================

var animatedNumbers = (PluginManager.parameters('PrettySleekGauges')['Animated Numbers'] || "true") === "true";
var animatedGauges = (PluginManager.parameters('PrettySleekGauges')['Animated Gauges'] || "true") === "true";
var criticalHP = (PluginManager.parameters('PrettySleekGauges')['Critical HP Change'] || "true") === "true";
var criticalMP = (PluginManager.parameters('PrettySleekGauges')['Critical MP Change'] || "true") === "true";
var criticalTP = (PluginManager.parameters('PrettySleekGauges')['Critical TP Change'] || "false") === "true";

Window_BattleStatus.prototype.drawGaugeArea = function(rect, actor) {
    this.contents.fontSize = Yanfly.Param.BSWParamFontSize;
    var wy = rect.y + rect.height - this.lineHeight();
    var wymod = 8 * 2 + 6;
    if (this.getGaugesDrawn(actor) <= 2) {
      this.drawActorMp(actor, rect.x, wy, rect.width);
    } else {
      var ww = rect.width / 2;
      this.drawActorMp(actor, rect.x, wy, ww);
      this.drawActorTp(actor, rect.x + ww, wy, ww);
    }
    this.drawActorHp(actor, rect.x, wy - wymod, rect.width);
};

Window_BattleStatus.prototype.drawActorHp = function(actor, x, y, width) {
	width = width || 186;
	this.drawAnimatedGauge(x, y, width, actor.hpRate(), this.hpGaugeColor1(), this.hpGaugeColor2(), criticalHP);
	this._gauges[this.makeGaugeKey(x, y)].setExtra(TextManager.hpA, actor.hp, actor.mhp, HeightOffset);
}

Window_BattleStatus.prototype.drawActorMp = function(actor, x, y, width) {
	width = width || 186;
	this.drawAnimatedGauge(x, y, width, actor.mpRate(), this.mpGaugeColor1(), this.mpGaugeColor2(), criticalMP);
	this._gauges[this.makeGaugeKey(x, y)].setExtra(TextManager.mpA, actor.mp, actor.mmp, HeightOffset);
}

Window_BattleStatus.prototype.drawActorTp = function(actor, x, y, width) {
	width = width || 186;
	this.drawAnimatedGauge(x, y, width, actor.tpRate(), this.tpGaugeColor1(), this.tpGaugeColor2(), criticalTP);
	this._gauges[this.makeGaugeKey(x, y)].setExtra(TextManager.tpA, actor.tp, 100, HeightOffset);
}

var alias_Special_Gauge_doneUpdating = Special_Gauge.prototype.doneUpdating;
Special_Gauge.prototype.doneUpdating = function() {
	return !(SceneManager._scene instanceof Scene_Battle) && alias_Special_Gauge_doneUpdating.call(this);
};

var alias_Special_Gauge_fontSize = Special_Gauge.prototype.fontSize;
Special_Gauge.prototype.fontSize = function() {
	if (this._window instanceof Window_BattleStatus) return Yanfly.Param.BSWParamFontSize;
	return alias_Special_Gauge_fontSize.call(this);
}

}

})();
