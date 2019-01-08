//==============================================================================
// DirectionLock.js
//==============================================================================
 
var Imported = Imported || {};
Imported.DirectionLock = true;

/*:
* @plugindesc Only allows player to face left or right, while still letting player interact with events up/down
* @author mjshi
*
* @param Lock Player Only
* @type boolean
* @desc Lock the direction of only the player or all sprites?
* @on Player Only
* @off All Sprites
* @default true
*
* @param Lock Horizontal
* @type boolean
* @desc Lock the horizontal direction? (if set to false locks the vertical)
* @on Horizontal
* @off Vertical
* @default true
*
* @help 
* ------------------------------------------------------------------------------
*   Direction Lock v1.0 by mjshi
*   Free for both commercial and non-commercial use, with credit.
* ------------------------------------------------------------------------------
*   In this plugin, your character still "turns" but you just can't see it.
*   That way, you can still interact with events all around you despite being
*   fixed in a direction.
* ------------------------------------------------------------------------------
*
* > Is something broken? Go to http://mjshi.weebly.com/contact.html and I'll
*   try my best to help you!
*/

(function () {
/* BEGIN */

var validDirOne = !!eval(PluginManager.parameters('DirectionLock')["Lock Horizontal"]) ? 4 : 2;
var validDirTwo = !!eval(PluginManager.parameters('DirectionLock')["Lock Horizontal"]) ? 6 : 8;

if (!!eval(PluginManager.parameters('DirectionLock')["Lock Player Only"])) {
  var alias_mjshi_dirfix_sprite_char_init = Sprite_Character.prototype.initialize;
  Sprite_Character.prototype.initialize = function(character) {
    alias_mjshi_dirfix_sprite_char_init.call(this, character);
    if (character === $gamePlayer) {
      this._isPlayer = true;
      this._cachedDir = validDirOne;
    }
  };

  var alias_mjshi_dirfix_sprite_characterPatternY = Sprite_Character.prototype.characterPatternY;
  Sprite_Character.prototype.characterPatternY = function() {
    if (this._isPlayer) {
      var d = this._character.direction();
      if (d === validDirOne || d === validDirTwo) {
        this._cachedDir = d;
      }
      return (this._cachedDir - 2) / 2;
    }
    return alias_mjshi_dirfix_sprite_characterPatternY.call(this);
  };

} else {

  var alias_mjshi_dirfix_sprite_char_init = Sprite_Character.prototype.initialize;
  Sprite_Character.prototype.initialize = function(character) {
    alias_mjshi_dirfix_sprite_char_init.call(this, character);
    this._cachedDir = validDirOne;
  };
  
  Sprite_Character.prototype.characterPatternY = function() {
    var d = this._character.direction();
    if (d === validDirOne || d === validDirTwo) {
      this._cachedDir = d;
    }
    return (this._cachedDir - 2) / 2;
  };
}

/* END */
})();