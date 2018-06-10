//==============================================================================
// RexalVE_v1_34_Hotfix.js
//==============================================================================
 
/*:
* @plugindesc Fixes a hanging loading screen issue that occurs when projects are deployed with encryption.
* @author mjshi
* 
* @param ***READ HELP FIRST***
*
* @param Hotfix Enabled
* @desc (y/n) Enable this before project deployment!
* When disabled, tile rendering fix still runs.
* @default n
* 
* @help 
* ------------------------------------------------------------------------------
*   Rexal Visual Equipment Hotfix for MV 1.3.4 by mjshi
*     commissioned by Pilgrim Adventures on RPG Maker Web
*   Free for both commercial and non-commercial use, with credit.
*   Plugin version: FINAL
* ------------------------------------------------------------------------------
*   Usage: Place under VisualEquipment.js in the PluginManager.
*   Fixes a hanging loading screen issue (game gets stuck on "Loading...")
*   that occurs when projects are deployed with encryption. 
*
*   Before deploying your project, enable the hotfix. Disable it during
*   normal playtesting.
*
*   This plugin requires the following files to exist:
*     img/parts/character/blank.png
*     img/parts/battler/blank.png
*     img/parts/face/blank.png
*
*   Of course, automatic detection of whether or not something is a playtest
*   can be done via code, but in the interest of frame rates, this is manual.
* 
*/

//begin
if ((String(PluginManager.parameters('RexalVE_v1_34_Hotfix')['Hotfix Enabled'])) === 'y') {
Rexal.ImageManager.loadCharacterPart = function(filename, hue, prefix, pose) {
	var fs = require("fs"), bitmap;
	if(!prefix) prefix = "";
	if(!pose) pose = "";
	if (fs.existsSync('www/img/parts/character/' + prefix + filename + pose + '.rpgmvp')) bitmap = this.loadBitmap('img/parts/character/', prefix+filename+pose, hue, false);
	if ((!bitmap || bitmap.isError()) && prefix && fs.existsSync('www/img/parts/character/' + filename + pose + '.rpgmvp')) bitmap =  this.loadBitmap('img/parts/character/',filename+pose, hue, false);
	if ((!bitmap || bitmap.isError())) bitmap = this.loadBitmap('img/parts/character/','blank', hue, false);
	return bitmap;
};

Rexal.ImageManager.loadBattlerPart = function(filename, hue, prefix) {
	var fs = require("fs"), bitmap;
	if(!prefix) prefix = "";
	if (fs.existsSync('www/img/parts/battler/' + prefix + filename + '.rpgmvp')) bitmap = this.loadBitmap('img/parts/battler/', prefix+filename, hue, false);
	if ((!bitmap || bitmap.isError()) && prefix && fs.existsSync('www/img/parts/battler/' + filename + '.rpgmvp')) bitmap = this.loadBitmap('img/parts/battler/', filename, hue, false);
	if ((!bitmap || bitmap.isError())) bitmap = this.loadBitmap('img/parts/battler/','blank', hue, false);
	return bitmap;
};

Rexal.ImageManager.loadFacePart = function(filename, hue, prefix) {
	var fs = require("fs"), bitmap;
	if(!prefix) prefix = "";
	if ((!bitmap || bitmap.isError()) && prefix && fs.existsSync('www/img/parts/face/' + prefix + filename + '.rpgmvp')) return this.loadBitmap('img/parts/face/', prefix+filename, hue, true);
	if ((!bitmap || bitmap.isError()) && fs.existsSync('www/img/parts/face/' + filename + '.rpgmvp')) return this.loadBitmap('img/parts/face/', filename, hue, true);
	if ((!bitmap || bitmap.isError())) bitmap = this.loadBitmap('img/parts/face/','blank', hue, false);
	return bitmap;
};
} //end hotfix

Rexal.ImageManager.isReady = function() {
  for (var key in this.cache._inner) {
		var bitmap = this.cache._inner[key].item;
		if (bitmap.isError()) {
			bitmap = this.loadEmptyBitmap();
		}
		if (!bitmap.isReady()) {
			return false;
		}
	}
	return true;
};