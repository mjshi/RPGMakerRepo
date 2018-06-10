//==============================================================================
// StatPolygon.js
//==============================================================================
 
var Imported = Imported || {};
Imported.StatPolygon = true;

/*:
* @plugindesc A fancy radar chart for your stats!
* @author mjshi
*
* @param ---Configuration---
*
* @param Stats to Draw
* @desc See help for more info
* @default 2, 3, 4, 5, 6
*
* @param Max Stat Value
* @desc Arbitrary visual limit for each respective stat so that the graph looks prettier
* @default 30, 30, 30, 30, 50
*
* @param ---Points---
*
* @param Center X
* @desc X coordinate of the center.
* @default 100
*
* @param Center Y
* @desc Y coordinate of the center.
* @default 360
*
* @param Radius
* @desc Twice this is the width of the entire thing.
* @default 60
*
* @param ---Text Parameters---
*
* @param Text Parameters
* @desc Which text parameters to list on the side. See help for more info.
* @default 2, 3, 4, 5, 6, 7
*
* @param Text Param Y Shift
* @desc How much to shift up or down the text parameters by.
* @default 0
*
* @param Make Way!
* @desc How much to indent the text parameters by.
* @default 175
*
* @param Make Way, Part 2
* @desc How much to indent the text parameter values by.
* @default 100
*
* @param ---Colors---
*
* @param Primary Color
* @desc Color of the foreground (hex color, see colorpicker.com)
* @default #B0E0E6
*
* @param Secondary Color
* @desc Color of the background (hex color, see colorpicker.com)
* @default #84aaff
*
* @param ---Lines---
*
* @param Number of Segments
* @desc Number of ticks on the axes
* @default 4
*
* @param Line Weight
* @desc Thickness of the background lines
* @default 1
*
* @param Line Weight 2
* @desc Thickness of the foreground lines
* @default 1
*
* @param ---Fill---
*
* @param Fill foreground
* @desc (y/n) Should the plugin fill in the foreground shape?
* @default y
*
* @param Foreground Fill Opacity
* @desc Decimal value from 0 (transparent) to 1
* @default 0.5
*
* @param ---Text---
*
* @param Use Text Labels
* @desc (y/n) Show text labels for parameters
* @default y
*
* @param Text Color
* @desc Color of the text (hex color, see colorpicker.com)
* @default #84aaff
*
* @param Font Size Decrement
* @desc How much to decrement the font size by
* @default 7
*
* @param Radial Text Offset
* @desc How much to offset the text by from the center
* @default 20
*
* @param X/Y Text Offset
* @desc (x, y) How much to offset the text from its radial position
* @default -15, -15
*
* @param ---Icon---
*
* @param Use Icon Labels
* @desc (y/n) Show text labels for parameters
* @default n
*
* @param Icon Indexes
* @desc Indexes of the icons. Should correlate to the 'Stats to Draw' parameter.
* @default 76, 81, 79, 147, 82
*
* @param Radial Icon Offset
* @desc How much to offset the icon by from the center
* @default 23
*
* @param X/Y Icon Offset
* @desc (x, y) How much to offset the icon from its radial position
* @default -15, -15
*
* @param
* @help 
* ------------------------------------------------------------------------------
*   Stat Polygon v1.0 by mjshi
*   Free for both commercial and non-commercial use, with credit.
* ------------------------------------------------------------------------------
*                                 Valid Stats
* ------------------------------------------------------------------------------
*         These will be drawn counterclockwise, starting from the top.
*
*                0 = MaxHP    2 = ATK    4 = MAT    6 = AGI
*                1 = MaxMP    3 = DEF    5 = MDF    7 = LUK
*
* ------------------------------------------------------------------------------
*           ** This plugin IS compatible with Yanfly Status Core! **
*                    Place it below the Status Core plugin.
* ------------------------------------------------------------------------------
*   You just need to change the Center X, Center Y, and Make Way! values a bit.
*   Just so you can see the graph, I recommend setting both the centers to 100,
*   and Make Way! to at LEAST 200. You'll need to make additional adjustments
*   from there.
*
* ------------------------------------------------------------------------------
*
* > Is something broken? Go to http://mjshi.weebly.com/contact.html and I'll
*   try my best to help you!
*/

//Initialize global variables

(function () {
/* BEGIN */

var params = PluginManager.parameters("StatPolygon");

var stats = params["Stats to Draw"].split(", ").map(Number);
var maxStats = params["Max Stat Value"].split(", ").map(Number);
var textParams = params["Text Parameters"].split(", ").map(Number);
var textParamsY = Number(params["Text Param Y Shift"]);

var centerX = Number(params["Center X"]);
var centerY = Number(params["Center Y"]);
var radius = Number(params["Radius"]);
var indent = Number(params["Make Way!"]);
var indent2 = Number(params["Make Way, Part 2"]);

var primaryColor = params["Primary Color"];
var secondaryColor = params["Secondary Color"];

var numSegments = Number(params["Number of Segments"]);
var lineWeight = Number(params["Line Weight"]);
var lineWeight2 = Number(params["Line Weight 2"]);
var shouldFill = params["Fill foreground"] === "y";
var fillOpacity = Number(params["Foreground Fill Opacity"]);

var useText = params["Use Text Labels"] === "y";
var textOffset = {
    radial: Number(params["Radial Text Offset"]),
    x: Number((params["X/Y Text Offset"].split(", "))[0]),
    y: Number((params["X/Y Text Offset"].split(", "))[1])
}
var fontDecrement = Number(params["Font Size Decrement"]);
var textColor = params["Text Color"];

var useIcon = params["Use Icon Labels"] === "y";
var iconIndexes = params["Icon Indexes"].split(", ").map(Number);
var iconOffset = {
    radial: Number(params["Radial Icon Offset"]),
    x: Number((params["X/Y Icon Offset"].split(", "))[0]),
    y: Number((params["X/Y Icon Offset"].split(", "))[1])
}

var sides = stats.length;

Window_Status.prototype.drawParameters = function(x, y) {
    x += indent;
    y += textParamsY;

    /* most compatibility errors will be in this segment */
    var lineHeight = this.lineHeight();

    for (var i = 0; i < textParams.length; i++) {
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.param(textParams[i]), x, y + lineHeight * i, 160);
        this.resetTextColor();
        this.drawText(this._actor.param(textParams[i]), x + indent2, y + lineHeight * i, 60, 'right');
    }

    /* Possible Error Segment End */

    //Begin edits
    //draw polygon
    this.contents.SPolyDrawStatPolygon(this._actor);

    //draw text
    if (useText) {
        this.changeTextColor(textColor);
        this.contents.fontSize = this.standardFontSize() - fontDecrement;
        for (var i = 0; i < stats.length; i++) {
            this.drawText(TextManager.param(stats[i]), centerX + textOffset.x + (radius + textOffset.radial) * Math.cos(Math.PI/2 + i * 2 * Math.PI / sides), centerY + textOffset.y - (radius + textOffset.radial) * Math.sin(Math.PI/2 + i * 2 * Math.PI / sides), 160);
        }
        this.resetFontSettings();
    }

    //draw icon
    if (useIcon) {
        for (var i = 0; i < stats.length; i++) {
            this.drawIcon(iconIndexes[i], centerX + iconOffset.x + (radius + iconOffset.radial) * Math.cos(Math.PI/2 + i * 2 * Math.PI / sides), centerY + iconOffset.y - (radius + iconOffset.radial) * Math.sin(Math.PI/2 + i * 2 * Math.PI / sides));
        }
    }
};

if (Imported.YEP_StatusMenuCore) {
Window_StatusInfo.prototype.drawParameters = function() {
	var dx = indent;
	var dy = this.lineHeight() / 2;
	var dw = this.contents.width - indent;
	var dh = this.lineHeight();
	var dw2;
	var text;
	this.changeTextColor(this.systemColor());
	this.drawText(Yanfly.Param.StatusGraphText, dx, dy, dw, 'center');
	dy = this.lineHeight();
	dx = indent;
	dw -= this.standardPadding() * 2;
	for (var i = 2; i < 8; ++i) {
		dy += this.lineHeight();
		var rate = this.drawParamGauge(dx, dy, dw, i);
		this.changeTextColor(this.systemColor());
		this.drawText(TextManager.param(i), dx + 4, dy, dw - 4);
		text = Yanfly.Util.toGroup(this._actor.param(i))
		this.changeTextColor(this.normalColor());
		dw2 = dw * rate;
		this.drawText(text, dx, dy, dw2 - 4, 'right');
	}

    this.contents.SPolyDrawStatPolygon(this._actor);

    //draw text
    if (useText) {
        this.changeTextColor(textColor);
        this.contents.fontSize = this.standardFontSize() - fontDecrement;
        for (var i = 0; i < stats.length; i++) {
            this.drawText(TextManager.param(stats[i]), centerX + textOffset.x + (radius + textOffset.radial) * Math.cos(Math.PI/2 + i * 2 * Math.PI / sides), centerY + textOffset.y - (radius + textOffset.radial) * Math.sin(Math.PI/2 + i * 2 * Math.PI / sides), 160);
        }
        this.resetFontSettings();
    }

    //draw icon
    if (useIcon) {
        for (var i = 0; i < stats.length; i++) {
            this.drawIcon(iconIndexes[i], centerX + iconOffset.x + (radius + iconOffset.radial) * Math.cos(Math.PI/2 + i * 2 * Math.PI / sides), centerY + iconOffset.y - (radius + iconOffset.radial) * Math.sin(Math.PI/2 + i * 2 * Math.PI / sides));
        }
    }
};
}

Bitmap.prototype.SPolyDrawStatPolygon = function(actor) {
    var cx = centerX, cy = centerY;

    //draw graph background
    for (var i = 0; i < numSegments; i++) this.SPolyDrawRegularPolygon(cx, cy, radius - (i * radius/numSegments), sides, secondaryColor, lineWeight);
    
    //draw lines
    for (var i = 0; i < sides; i++) this.SPolyDrawLine(cx, cy, cx + radius * Math.cos(Math.PI/2 + i * 2 * Math.PI / sides), cy - radius * Math.sin(Math.PI/2 + i * 2 * Math.PI / sides), secondaryColor, lineWeight);

    //draw stat polygon
    var points = [];
    for (var i = 0; i < stats.length; i++) {
        points.push(cx + Math.min(actor.param(stats[i]) / maxStats[i], 1) * radius * Math.cos(Math.PI/2 + i * 2 * Math.PI / sides));
        points.push(cy - Math.min(actor.param(stats[i]) / maxStats[i], 1) * radius * Math.sin(Math.PI/2 + i * 2 * Math.PI / sides));
    }
    this.SPolyDrawPolygon(points, primaryColor, lineWeight2);
};

Bitmap.prototype.SPolyDrawRegularPolygon = function(cx, cy, radius, sides, color, weight) {
    var context = this._context;
    context.save();
    context.beginPath();

    context.moveTo(cx, cy - radius);

    for (var i = 1; i <= sides; i++) {
        context.lineTo(
            cx + radius * Math.cos(Math.PI/2 + i * 2 * Math.PI / sides),
            cy - radius * Math.sin(Math.PI/2 + i * 2 * Math.PI / sides)
        );
    }

    context.strokeStyle = color;
    context.lineWidth = weight;
    context.stroke();

    context.restore();
    this._setDirty();
};

Bitmap.prototype.SPolyDrawPolygon = function(points, color, weight) {
    var context = this._context;
    context.save();
    context.beginPath();

    context.moveTo(points[0], points[1]);

    for (var i = 2; i < points.length; i+=2) context.lineTo(points[i], points[i+1]);

    context.lineTo(points[0], points[1]);

    context.strokeStyle = color;
    context.lineWidth = weight;
    context.stroke();

    if (shouldFill) {
        context.globalAlpha = fillOpacity;
        context.fillStyle = color;
        context.fill();
        context.globalAlpha = 1;
    }

    context.restore();
    this._setDirty();
};

Bitmap.prototype.SPolyDrawLine = function(x1, y1, x2, y2, color, weight) {
    if (weight === undefined) weight = 1;
    if (color === undefined) color = "#000000";

    var context = this._context;
    context.save();
    context.beginPath();

    context.moveTo(x1, y1);
    context.lineTo(x2, y2);

    context.strokeStyle = color;
    context.lineWidth = weight;
    context.stroke();

    context.restore();
    this._setDirty();
};

/* END */
})();