//==============================================================================
// SkipTitle.js
//==============================================================================

/*:
* @plugindesc Skips the title screen during playtests.
* @author mjshi
* @help 
* ------------------------------------------------------------------------------
*   SkipTitle v1.0 by mjshi
*   Free for both commercial and non-commercial use, with credit.
* ------------------------------------------------------------------------------
*
* > Is something broken? Go to http://mjshi.weebly.com/contact.html and I'll
*   try my best to help you!
*/

(function () {
var alias_scene_boot_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
	if (Utils.isOptionValid('test')) {
		Scene_Base.prototype.start.call(this);
		SoundManager.preloadImportantSounds();
		this.checkPlayerLocation();
		DataManager.setupNewGame();
		SceneManager.goto(Scene_Map);
	} else {
		alias_scene_boot_start.call(this);
	}
}
})();
