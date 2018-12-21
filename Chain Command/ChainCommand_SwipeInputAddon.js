//==============================================================================
// ChainCommand_SwipeInputAddon.js
//==============================================================================
 
var Imported = Imported || {};

/*:
* @plugindesc Addon to Chain Commands for Swipe Input support.
* @author mjshi
*
* @help 
* ------------------------------------------------------------------------------
*   Chain Commands Swipe Input Addon v1.0 by mjshi
*   Supports Swipe input: http://sumrndm.site/swipe-input/
*   Requires Swipe Input to run.
*
*   Free for both commercial and non-commercial use, with credit.
* ------------------------------------------------------------------------------
*   Installation: Place below Chain Command in the plugin file.
*
*   Plugin order should be:
*     SRD_SwipeInput
*     ChainCommand
*     ChainCommand_SwipeInputAddon
* ------------------------------------------------------------------------------
*
* > Is something broken? Go to http://mjshi.weebly.com/contact.html and I'll
*   try my best to help you!
*/
if (Imported["SumRndmDde Swipe Input"] && Imported.ChainCommand) {

(function () {

var validKeys = PluginManager.parameters("ChainCommand")["Valid Keys"].split(" ");

Scene_ChainCommand.prototype.processInput = function() {
	for (var i = 0; i < validKeys.length; i++) {
		if (Input.isTriggered(validKeys[i]) ||
			(['up', 'left', 'right', 'down'].contains(validKeys[i]) && SwipeInput.isTriggered(validKeys[i]))) {
			if (this.sequence[this.index] === validKeys[i]) this.updateButtons();
			else this.hasFailed();
			return;
		}
	}
};

})();

}