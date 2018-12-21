
/*:
 * @plugindesc Yanfly Absorption Barrier Compatibility Patch for Pretty Sleek Gauges.
 * @author superMasterSword
 *
 * @help 
 * ----------------------------------------------------------------------------
 *   Pretty Sleek Gauges Yanfly Absorption Barrier Patch v1.0c
 *     For Pretty Sleek Gauges versions v1.03d and up
 * ----------------------------------------------------------------------------
 *   Free to use in any project with credit to:
 *     superMasterSword
 * ----------------------------------------------------------------------------
 *   !!! NOTICE: Overwrites the following: !!!
 *     Special_Gauge.prototype.drawGauge
 *     Special_Gauge.prototype.drawText
 *
 *   I will do my best to keep this up-to-date but let me know if you run into
 *   any issues!
 * ----------------------------------------------------------------------------
 * > Is something broken? Go to http://mjshi.weebly.com/contact.html and I'll
 *   try my best to help you!
 */

if (Imported.PrettySleekGauges && Imported.YEP_AbsorptionBarrier) {
(function() {

var parameters = PluginManager.parameters('PrettySleekGauges');
var defaultTinyHeight = Number(parameters['Tiny Gauge Height'] || 2);
var animatedNumbers = (parameters['Animated Numbers'] || "true") === "true";
var animatedGauges = (parameters['Animated Gauges'] || "true") === "true";
var gaugeOutColor = parameters['Outline Color'] || "#FFFFFF";
var textRightBuffer = Number(parameters['Text Right Buffer'] || 2);

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

var showEHPHP = (parameters['Show Enemy HP Text'] || "false") === "true";
var textYOffset = parseInt(parameters['HP Text Y Offset']) || 0;
var showEHPText = (parameters['Show Enemy HP Value'] || "true") === "true";
var shouldDrawEnemyMP = (parameters['Show Enemy MP'] || "true") === "true";
var drawEnemyMPWhenNoMP = (parameters['Show MP Bar When MMP is 0'] || "true") === "true";
var tinyWidthAdjust = parseInt(parameters['Tiny Gauge Width Adjust']) || 0;
var tinyGaugeXOffset = parseInt(parameters['Tiny Gauge X Offset']) || 0;
var tinyGaugeYOffset = parseInt(parameters['Tiny Gauge Y Offset']) || 0;
var shouldDrawEnemyTP = (parameters['Show Enemy TP'] || "true") === "true";

Window_Base.prototype.drawActorHp = function(actor, x, y, width) {
	this.drawAnimatedGauge(x, y, (width || 186), actor, this.hpGaugeColor1(), this.hpGaugeColor2(), "hp");
	this._gauges[this.makeGaugeKey(x, y)].setExtra(TextManager.hpA, actor.hp, actor.mhp);
}

Window_EnemyHPBars.prototype.drawActorHp = function(actor, x, y, width) {
	this.drawAnimatedGauge(x, y, width, actor, this.hpGaugeColor1(), this.hpGaugeColor2(), "hp");
	this._gauges[this.makeGaugeKey(x, y)].setExtra(TextManager.hpA, actor.hp, actor.mhp, textYOffset);
}

var alias_special_gauge_initialize = Special_Gauge.prototype.initialize;
Special_Gauge.prototype.initialize = function(x, y, w, r, c1, c2, basewindow, h, t) {
	alias_special_gauge_initialize.call(this, x, y, w, r, c1, c2, basewindow, h, t);
	if (this._type === "hp" && typeof r !== "number") this.setRate(r);
}

var alias_special_gauge_doneUpdating = Special_Gauge.prototype.doneUpdating;
Special_Gauge.prototype.doneUpdating = function() {
	return alias_special_gauge_doneUpdating.call(this) && (this._type === "hp" ? this._curAbspRate === this._maxAbspRate && this._curAbsp === this._maxAbsp : true);
};

var alias_special_gauge_update = Special_Gauge.prototype.update;
Special_Gauge.prototype.update = function() {
	if (this.doneUpdating()) return;
	alias_special_gauge_update.call(this);
	
	if (this._type === "hp") {
		if (this._curAbspRate > this._maxAbspRate) this._curAbspRate -= this._abspSpdRate;
		if (this._curAbsp > this._maxAbsp) this._curAbsp -= this._abspSpd;
		
		if (this._curAbspRate < this._maxAbspRate) this._curAbspRate += this._abspSpdRate;
		if (this._curAbsp < this._maxAbsp) this._curAbsp += this._abspSpd;
		
		if (Math.abs(this._curAbspRate - this._maxAbspRate) < this._abspSpdRate)
			this._curAbspRate = this._maxAbspRate;
		if (Math.abs(this._curAbsp - this._maxAbsp) < this._abspSpd)
			this._curAbsp = this._maxAbsp;
		
		if (!animatedNumbers || this.shouldntAnimate()) this._curAbsp = this._maxAbsp;
		if (!animatedGauges || this.shouldntAnimate()) this._curAbspRate = this._maxAbspRate;
	}
	
	this.refresh();
}

var alias_special_gauge_setRate = Special_Gauge.prototype.setRate;
Special_Gauge.prototype.setRate = function(rate) {
	if (typeof rate === "number") {
		alias_special_gauge_setRate.call(this, rate);

	} else if (typeof rate === "object" && rate instanceof Game_Battler) {
		if (rate.barrierPoints() > 0) {
			if (rate.hp + rate.barrierPoints() > rate.mhp) {
				var max = rate.hp + rate.barrierPoints();
				var rate1 = rate.hp / max;
			} else {
				var max = rate.mhp;
				var rate1 = rate.hpRate();
			}

			var rate2 = (rate.hp + rate.barrierPoints()) / max;
			if (rate1 != this._maxRate) {
				this._maxRate = rate1;
				if (typeof this._curRate !== "number") this._curRate = this._maxRate;
				/* same problem as below */
				this._speedRate = Math.abs(this._curRate - this._maxRate) / 60;
				if (this._curAbspRate === 0) this._curAbspRate = this._curRate;
			}
			if (rate2 != this._maxAbspRate) {
				this._maxAbspRate = rate2;
				if (this._curAbspRate === undefined) this._curAbspRate = this._maxAbspRate;
				this._abspSpdRate = Math.abs(this._curAbspRate - this._maxAbspRate) / 60;
			}
			if (rate.barrierPoints() != this._maxAbsp) {
				this._maxAbsp = rate.barrierPoints();
				if (this._curAbsp === undefined) this._curAbsp = this._maxAbsp;
				this._abspSpd = Math.abs(this._curAbsp - this._maxAbsp) / 60;
			}

		} else {
			if (rate.hpRate() != this._maxRate) {
				this._maxRate = rate.hpRate();
				if (typeof this._curRate !== "number") this._curRate = this._maxRate;
				this._speedRate = Math.abs(this._curRate - this._maxRate) / 60;
			}
			if (!this._maxAbsp || this._curRate === this._curAbspRate) {
				this._curAbspRate = this._maxAbspRate = this._abspSpdRate = 0;
				this._curAbsp = this._maxAbsp = this._abspSpd = 0;
			} else {
				this._maxAbspRate = rate.hpRate();
				this._abspSpdRate = Math.abs(this._curAbspRate - this._maxAbspRate) / 60;
				this._maxAbsp = 0;
				this._abspSpd = this._curAbsp / 60;
			}
		}
	}
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
			
	//============================================================================================
	// ** BEGIN CHANGES **
	//
	if (this._type === "hp" && this._curAbsp > 0) {
		var fill_wa = Math.round((this._width - 2) * this._curAbspRate);
		var c1 = this._window.barrierColor1();
		var c2 = this._window.barrierColor2();
		this._window.contents.drawTrap(this._x, gy, fill_wa, this._height, c1, c2, "atop");
	}
	//
	// ** END CHANGES **
	//============================================================================================
	
	this._window.contents.drawTrap(this._x, gy, fill_w, this._height, this._color[0], this._color[1], "atop");
	this._window.contents.drawTrap(this._x, gy, this._width - 2, this._height, gaugeOutColor);

	barTypeLeft = saveBarTypeLeft;
	barTypeRight = saveBarTypeRight;
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
			
			//============================================================================================
			// ** BEGIN CHANGES **
			//

			if (this._type === "hp" && this._curAbsp > 0) {
				var abspWidth = this._window.textWidth("+" + Math.round(this._curAbsp));

				if (this._maxVal && abspWidth + this._window.textWidth((this._setVal || this._curVal) + "/" + this._maxVal) <= width) {
					this._window.drawText(Math.round(this._curVal), x, this._y + this._yOffset, width - abspWidth - this._window.textWidth("/" + this._maxVal), "right");
					var color = "#";
					for (var i = 0; i < 3; i++) color += Yanfly.Param.ABRPop[i].toString(16).padZero(2);
					this._window.changeTextColor(color);
					this._window.drawText("+" + Math.round(this._curAbsp), x, this._y + this._yOffset, width - this._window.textWidth("/" + this._maxVal), "right");
					this._window.changeTextColor(this._window.normalColor());
					this._window.drawText("/", x, this._y + this._yOffset, width - this._window.textWidth(this._maxVal), "right");
					this._window.drawText(this._maxVal, x, this._y + this._yOffset, width, "right");

				} else if (this._window.textWidth(this._setVal || this._curVal) + abspWidth <= width) {
					this._window.drawText(Math.round(this._curVal), x, this._y + this._yOffset, width - abspWidth, "right");
					var color = "#";
					for (var i = 0; i < 3; i++) color += Yanfly.Param.ABRPop[i].toString(16).padZero(2);
					this._window.changeTextColor(color);
					this._window.drawText("+" + Math.round(this._curAbsp), x, this._y + this._yOffset, width, "right");

				} else {
					var color = "#";
					for (var i = 0; i < 3; i++) color += Yanfly.Param.ABRPop[i].toString(16).padZero(2);
					this._window.changeTextColor(color);
					this._window.drawText(Math.round(this._curVal + this._curAbsp), x, this._y + this._yOffset, width, "right");
				}

			} else {

			//
			// ** END CHANGES **
			//============================================================================================
				if (!this._maxVal || this._width < 186) {
					this._window.drawText(Math.round(this._curVal), x, this._y + this._yOffset, width, "right");
				} else {
					this._window.drawText(Math.round(this._curVal), x, this._y + this._yOffset, width - this._window.textWidth("/" + this._maxVal), "right");
					this._window.changeTextColor(this._window.normalColor());
					this._window.drawText("/", x, this._y + this._yOffset, width - this._window.textWidth(this._maxVal), "right");
					this._window.drawText(this._maxVal, x, this._y + this._yOffset, width, "right");
				}
			}
		}

		this._window.contents.fontSize = storeFontSize;
	} 
}

})();

}
