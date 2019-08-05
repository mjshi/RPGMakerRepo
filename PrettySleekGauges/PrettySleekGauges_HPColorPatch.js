//-------------------------------------------------------------
// a quick and hacky compatibility fix for AceOfAces's HP 
// Color Controller. Doesn't support drawing the actor's name
// in said color, but can upon request.
//

Window_Base.prototype.drawActorHp = function(actor, x, y, width) {
	width = width || 186;
	var color1 = this.hpbarColorPicker1(actor);
	var color2 = this.hpbarColorPicker2(actor);
	
	this.drawAnimatedGauge(x, y, width, actor.hpRate(), color1, color2, "hp");
	this._gauges[this.makeGaugeKey(x, y)].setExtra(TextManager.hpA, actor.hp, actor.mhp);
}
