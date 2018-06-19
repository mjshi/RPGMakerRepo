/*:
* @plugindesc​ Automatically pauses dialogue at punctuation marks.
* @author mjshi
*
* @param Disable Autopause Switch
* @desc Turn this switch ON to turn autopause off, or set to 0 to always have autopause on.
* @default 0
*
* @help 
* ------------------------------------------------------------------------------
*   Autopause at Punctuation v1.0a by mjshi
*   Free for both commercial and non-commercial use, with credit.
* ------------------------------------------------------------------------------
*   Installation: Place below any message-box-related plugins.
* ------------------------------------------------------------------------------
*  You know, I bet your eyes paused for a moment at the comma in this sentence.
*  And I bet you paused, too (but longer) at that period in the sentence above.
*  What this script does is pause dialogue briefly at certain punctuation marks,
*  mimicking natural speech.
* ------------------------------------------------------------------------------
*   Currently supported punctuation:
*   [Pauses for 1/4 second] , - :
*   [Pauses for 1/2 second] . ? ! ~ ... ;
*   [Special -  1/2 second] Em dash, ellipsis
*
*   This script also pauses for 1/2 second whenever there is valid punctuation
*   followed by a " or ) or ' character.
*   For example: (this would pause.) "this too:" 'and this-' (this would not)
*   [Valid punctuation] , - : . ? ! ~ ;
* ------------------------------------------------------------------------------
*
* > Is something broken? Go to http://mjshi.weebly.com/contact.html and I'll
*   try my best to help you!
*/
(function () {

var switchID = parseInt(PluginManager.parameters("AutopauseAtPunctuation")["Disable Autopause Switch"]);

var _alias_ConvertEscape = Window_Base.prototype.convertEscapeCharacters;
Window_Base.prototype.convertEscapeCharacters = function(text) {
	if (switchID === 0 || $gameSwitches.value(switchID)) {
		text = text.replace(/\. /g, ".\\.\\. ");
		text = text.replace(/\u2026 /g, "\u2026\\.\\. ");
		text = text.replace(/\u2014 /g, "\u2014\\.\\. ");
		
		text = text.replace(/([.?!~;,-:])" /g, "$&\\.\\. ");
		text = text.replace(/([.?!~;,-:])' /g, "$&\\.\\. ");
		text = text.replace(/([.?!~;,-:])\) /g, "$&\\.\\. ");
		text = text.replace(/- /g, "-\\. ");
		text = text.replace(/, /g, ",\\. ");
		text = text.replace(/: /g, ":\\. ");
		text = text.replace(/\? /g, "?\\.\\. ");
		text = text.replace(/! /g, "!\\.\\. ");
		text = text.replace(/; /g, ";\\.\\. ");
		text = text.replace(/~ /g, "~\\.\\. ");
		
		//handle newlines
		text = text.replace(/\.\n(?!$)/g, ".\\.\\.\n");
		text = text.replace(/\u2026\n(?!$)/g, "\u2026\\.\\.\n");
		text = text.replace(/\u2014\n(?!$)/g, "\u2014\\.\\.\n");
		
		text = text.replace(/([.?!~;,-:])"\n(?!$)/g, "$&\\.\\.");
		text = text.replace(/([.?!~;,-:])'\n(?!$)/g, "$&\\.\\.");
		text = text.replace(/([.?!~;,-:])\)\n(?!$)/g, "$&\\.\\.");
		text = text.replace(/-\n(?!$)/g, "-\\.\n");
		text = text.replace(/,\n(?!$)/g, ",\\.\n");
		text = text.replace(/:\n(?!$)/g, ":\\.\n");
		text = text.replace(/\?\n(?!$)/g, "?\\.\\.\n");
		text = text.replace(/!\n(?!$)/g, "!\\.\\.\n");
		text = text.replace(/;\n(?!$)/g, ";\\.\\.\n");
		text = text.replace(/~\n(?!$)/g, "~\\.\\.\n");
	}

	text = _alias_ConvertEscape.call(this, text);
	return text;
};

})();