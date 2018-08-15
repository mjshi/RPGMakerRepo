//==============================================================================
// RandomChoiceOrder.js
//==============================================================================

/*:
* @plugindesc Shows choices in a random order when specified switch is turned on.
* @author mjshi
*
* @param Switch ID
* @desc ID of the switch to turn ON to use random choices.
* @type number
* @default 1
*
* @help 
* ------------------------------------------------------------------------------
*   Random Choice Order v1.0 by mjshi
*   Free for both commercial and non-commercial use, with credit.
* ------------------------------------------------------------------------------
*
* > Is something broken? Go to http://mjshi.weebly.com/contact.html and I'll
*   try my best to help you!
*/

//Initialize global variables

(function () {
/* BEGIN */

var switchID = PluginManager.parameters('RandomChoiceOrder')["Switch ID"];

/**
 * Returns an array of randomized numbers, from 0 to size - 1
 */
function randomNumberArray(size) {
	var index = 0, temp;
	var randomized = [];

	// Populate Array
	while (randomized.length < size) {
		randomized.push(index);
		index++;
	}

	// Fischer-Yates Shuffle
	while (size > 0) {
		size--;
		index = Math.floor(Math.random() * size);
		temp = randomized[size];
		randomized[size] = randomized[index];
		randomized[index] = temp;
	}

	return randomized;
}

var alias_window_choicelist_makeCommandList = Window_ChoiceList.prototype.makeCommandList;
Window_ChoiceList.prototype.makeCommandList = function() {
	if (!$gameSwitches.value(switchID)) {
		alias_window_choicelist_makeCommandList.call(this);
		return;
	}

    this._randomizedChoices = randomNumberArray($gameMessage.choices().length);
    for (var i = 0; i < this._randomizedChoices.length; i++) {
        this.addCommand($gameMessage.choices()[this._randomizedChoices[i]], 'choice');
    }
};

var alias_window_choicelist_callOkHandler = Window_ChoiceList.prototype.callOkHandler;
Window_ChoiceList.prototype.callOkHandler = function() {
	if (!$gameSwitches.value(switchID)) {
		alias_window_choicelist_callOkHandler.call(this);
		return;
	}

    $gameMessage.onChoice(this._randomizedChoices[this.index()]);
    this._messageWindow.terminateMessage();
    this.close();
};

/* END */
})();
