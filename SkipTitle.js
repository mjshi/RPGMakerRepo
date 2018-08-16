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
Scene_Boot.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    SoundManager.preloadImportantSounds();
    if (DataManager.isBattleTest()) {
        DataManager.setupBattleTest();
        SceneManager.goto(Scene_Battle);
    } else if (DataManager.isEventTest()) {
        DataManager.setupEventTest();
        SceneManager.goto(Scene_Map);
    } else {
        this.checkPlayerLocation();
        DataManager.setupNewGame();
		SceneManager.goto(Scene_Map);
    }
    this.updateDocumentTitle();
};
})();
