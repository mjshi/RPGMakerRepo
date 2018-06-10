
/*:
 * @plugindesc Yanfly Absorption Barrier Compatibility Patch for Pretty Sleek Gauges.
 * @author superMasterSword
 *
 */

(function() {


var alias_window_base_drawactorhp_psg = Window_Base.prototype.drawActorHp;
Window_Base.prototype.drawActorHp = function(actor, x, y, width) {
	if (Imported.YEP_AbsorptionBarrier) {
		this.drawAnimatedGauge(x, y, (width || 186), actor, this.hpGaugeColor1(), this.hpGaugeColor2(), "hp");
		this._gauges[this.makeGaugeKey(x, y)].setExtra(TextManager.hpA, actor.hp, actor.mhp);
		this._gauges[this.makeGaugeKey(x, y)].update();
	} else {
		alias_window_base_drawactorhp_psg.call(this, actor, x, y, width);
	}
}

var alias_special_gauge_initialize = Special_Gauge.prototype.initialize;
Special_Gauge.prototype.initialize = function(x, y, w, r, c1, c2, basewindow, h, t) {
	alias_special_gauge_initialize.call(this, x, y, w, r, c1, c2, basewindow, h, t);
	if (Imported.YEP_AbsorptionBarrier && this._type === "hp" && typeof r !== "number") this.setRate(r);
	this.refresh();
}

var alias_special_gauge_doneUpdating = Special_Gauge.prototype.doneUpdating;
Special_Gauge.prototype.doneUpdating = function() {
	return alias_special_gauge_doneUpdating.call(this) && (this._type === "hp" ? this._curAbspRate === this._maxAbspRate && this._curAbsp === this._maxAbsp : true);
};

var alias_special_gauge_update = Special_Gauge.prototype.update;
Special_Gauge.prototype.update = function() {
	if (this.doneUpdating()) return;
	alias_special_gauge_update.call(this);
	
	if (Imported.YEP_AbsorptionBarrier && this._type === "hp") {
		if (this._curAbspRate > this._maxAbspRate) this._curAbspRate -= this._abspSpdRate;
		if (this._curAbsp > this._maxAbsp) this._curAbsp -= this._abspSpd;
		
		if (this._curAbspRate < this._maxAbspRate) this._curAbspRate += this._abspSpdRate;
		if (this._curAbsp < this._maxAbsp) this._curAbsp += this._abspSpd;
		
		if (Math.abs(this._curAbspRate - this._maxAbspRate) < this._abspSpdRate)
			this._curAbspRate = this._maxAbspRate;
		if (Math.abs(this._curAbsp - this._maxAbsp) < this._abspSpd)
			this._curAbsp = this._maxAbsp;
		
		if (!animatedNumbers || this._window instanceof Window_BattleActor) this._curAbsp = this._maxAbsp;
		if (!animatedGauges || this._window instanceof Window_BattleActor) this._curAbspRate = this._maxAbspRate;
	}
	
	this.refresh();
}

var alias_special_gauge_setRate = Special_Gauge.prototype.setRate;
Special_Gauge.prototype.setRate = function(rate) {
	if (typeof rate === "number") {
		alias_special_gauge_setRate.call(this, rate);

	} else if (Imported.YEP_AbsorptionBarrier && typeof rate === "object" && rate instanceof Game_Battler) {
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
				if (this._curRate === undefined) this._curRate = this._maxRate;
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
				if (this._curRate === undefined) this._curRate = this._maxRate;
				this._speedRate = Math.abs(this._curRate - this._maxRate) / 60;
			}
			this._curAbspRate = this._maxAbspRate = this._abspSpdRate = 0;
			this._curAbsp = this._maxAbsp = this._abspSpd = 0;
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
	if (Imported.YEP_AbsorptionBarrier && this._type === "hp" && this._curAbsp > 0) {
		var fill_wa = Math.round((this._width - 2) * this._curAbspRate);
		var c1 = this._window.barrierColor1();
		var c2 = this._window.barrierColor2();
		this._window.contents.drawTrap(this._x, gy, fill_wa, this._height, c1, c2, "atop");
	}
	this._window.contents.drawTrap(this._x, gy, fill_w, this._height, this._color[0], this._color[1], "atop");
	this._window.contents.drawTrap(this._x, gy, this._width - 2, this._height, gaugeOutColor);

	barTypeLeft = saveBarTypeLeft;
	barTypeRight = saveBarTypeRight;
}

Special_Gauge.prototype.drawText = function() {
	if (this._vocab) {
		this._window.fontSize = this.fontSize();
		var lblWidth = this._showEHPHP ? this._window.textWidth(this._text) : 0;
		if (this._showEHPHP) {
			this._window.changeTextColor(this._window.systemColor());
			this._window.drawText(this._text, this._x + 1, this._y + this._yOffset, lblWidth);
		}

		if (this._showEHPText) {
			this._window.changeTextColor(this._window.normalColor());
			if (this.critText()) {
				if (this._curVal < this._maxVal / 10) {
					this._window.changeTextColor(this._window.deathColor());
				} else if (this._curVal < this._maxVal / 4) {
					this._window.changeTextColor(this._window.crisisColor());
				}
			}
			
			var valWidth = this._window.textWidth(String(this._maxVal || this._curVal));
			var slshWidth = this._window.textWidth("/");
			var xr = this._x + this._width;
			var x1 = xr - valWidth;
			var x2 = x1 - slshWidth;
			var x3 = x2 - valWidth;
			if (Imported.YEP_AbsorptionBarrier && this._type === "hp" && this._curAbsp > 0) {
				var abspWidth = this._window.textWidth("+" + this._curAbsp);
				if (this._maxVal && x3 - abspWidth >= this._x + lblWidth) {
					this._window.drawText(Math.round(this._curVal), x3 - abspWidth, this._y + this._yOffset,
						valWidth, "right");
					var color = "#";
					for (var i = 0; i < 3; i++) color += Yanfly.Param.ABRPop[i].toString(16).padZero(2);
					this._window.changeTextColor(color);
					this._window.drawText("+" + this._curAbsp, x2 - abspWidth, this._y + this._yOffset,
						abspWidth, "right");
					this._window.changeTextColor(this._window.normalColor());
					this._window.drawText("/", x2, this._y + this._yOffset, slshWidth, "right");
					this._window.drawText(this._maxVal, x1, this._y + this._yOffset, valWidth, "right");
					return;
				} else if (!this._maxVal && x1 - abspWidth >= this._x + lblWidth) {
					this._window.drawText(Math.round(this._curVal), x1 - abspWidth, this._y + this._yOffset,
						valWidth, "right");
					var color = "#";
					for (var i = 0; i < 3; i++) color += Yanfly.Param.ABRPop[i].toString(16).padZero(2);
					this._window.changeTextColor(color);
					this._window.drawText("+" + this._curAbsp, xr - abspWidth, this._y + this._yOffset,
						abspWidth, "right");
					return;
				}
			}
			if (!this._maxVal || x3 < this._x + lblWidth) {
				this._window.drawText(Math.round(this._curVal), x1, this._y + this._yOffset, valWidth, "right");
			} else {
				this._window.drawText(Math.round(this._curVal), x3, this._y + this._yOffset, valWidth, "right");
				this._window.changeTextColor(this._window.normalColor());
				this._window.drawText("/", x2, this._y + this._yOffset, slshWidth, "right");
				this._window.drawText(this._maxVal, x1, this._y + this._yOffset, valWidth, "right");
			}
		}
	} 
}

Window_EnemyHPBars.prototype.drawActorHp = function(actor, x, y, width) {
	if (actor.enemy().meta.HideEnemyHPBar) return;
	if (this._gauges && this._gauges[this.makeGaugeKey(x, y)] && this._gauges[this.makeGaugeKey(x, y)]._curVal === 0) {
		this.clearGauges(actor, x, y, width);
		return;
	}

	width = width || 186;
	barTypeLeft = actor.enemy().meta.BarTypeLeft || hpBarTypeLeft || barTypeLeft;
	barTypeRight = actor.enemy().meta.BarTypeRight || hpBarTypeRight || barTypeRight;

	if (Imported.YEP_AbsorptionBarrier) {
		this.drawAnimatedGauge(x, y, width, actor, this.hpGaugeColor1(), this.hpGaugeColor2(), "hp");
	} else {
		this.drawAnimatedGauge(x, y, width, actor.hpRate(), this.hpGaugeColor1(), this.hpGaugeColor2(), "hp");
	}

	this._gauges[this.makeGaugeKey(x, y)].setExtra(TextManager.hpA, actor.hp, actor.mhp, textYOffset);
	this._gauges[this.makeGaugeKey(x, y)].setTextVisibility(showEHPHP, showEHPText);

	barTypeLeft = saveBarTypeLeft;
	barTypeRight = saveBarTypeRight;

	if (shouldDrawEnemyMP && (drawEnemyMPWhenNoMP || actor.mmp > 0) && !actor.enemy().meta.HideEnemyMPBar) {
		this.drawTinyGauge(x + tinyGaugeXOffset, y + 1 + tinyGaugeYOffset, width + tinyWidthAdjust, actor.mpRate(), this.mpGaugeColor1(), this.mpGaugeColor2(), "mp");
		this._gauges[this.makeTGaugeKey(x + tinyGaugeXOffset, y + 1 + tinyGaugeYOffset)].setExtra(TextManager.mpA, actor.mp, actor.mmp);
		y += defaultTinyHeight + 2;
	}

	if ((shouldDrawEnemyTP && !actor.enemy().meta.HideEnemyTPBar) || (!shouldDrawEnemyTP && actor.enemy().meta.ShowEnemyTPBar)) {
		this.drawTinyGauge(x + tinyGaugeXOffset, y + 1 + tinyGaugeYOffset, width + tinyWidthAdjust, actor.tpRate(), this.tpGaugeColor1(), this.tpGaugeColor2(), "tp");
		this._gauges[this.makeTGaugeKey(x + tinyGaugeXOffset, y + 1 + tinyGaugeYOffset)].setExtra(TextManager.tpA, actor.tp, actor.mtp);
	}
}

})();