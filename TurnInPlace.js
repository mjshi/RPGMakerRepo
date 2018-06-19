//==============================================================================
// TurnInPlace.js
//==============================================================================

var Imported = Imported || {};
Imported.TurnInPlace = true;

var TurnInPlace = {};

/*:
* @plugindesc Allows the player to turn in place before moving.
* @author mjshi
* 
* @param Wait Count
* @desc Wait count in frames. 60 frames = 1 second
* @default 8
* 
* @help 
* ----------------------------------------------------------------------------
*   Turn In Place v1.0 by mjshi
*   Free for both commercial and non-commercial use, with credit.
* ----------------------------------------------------------------------------
* > Inspired by "Player Turn & Move" by SirBilly (silentkingdom.com)
*   (but the way things are handled differ completely)
*
* > Is something broken? Go to http://mjshi.weebly.com/contact.html and I'll
*   try my best to help you!
*/


TurnInPlace.Parameters = PluginManager.parameters('TurnInPlace');
TurnInPlace.waitCount = Number(TurnInPlace.Parameters['Wait Count']);

var turn_in_place_alias_game_player_initialize = Game_Player.prototype.initialize;
Game_Player.prototype.initialize = function() {
	turn_in_place_alias_game_player_initialize.call(this);
	this._waitCount = TurnInPlace.waitCount;
};

var turn_in_place_alias_game_player_update = Game_Player.prototype.update;
Game_Player.prototype.update = function(sceneActive) {
    if ($gameMap.isEventRunning()) {this._waitCount = 0}
    turn_in_place_alias_game_player_update.call(this, sceneActive);

    if (!(Input.isPressed("up") || Input.isPressed("down") || 
        Input.isPressed("left") || Input.isPressed("right") || 
        TouchInput.isPressed())) {
            this._waitCount = TurnInPlace.waitCount}

    if (this._waitCount > 0) {this._waitCount -= 1}
};

Game_Player.prototype.moveByInput = function() {
    if (!this.isMoving() && this.canMove()) {
        var direction = this.getInputDirection();
        if (direction > 0) {
            $gameTemp.clearDestination();
        } else if ($gameTemp.isDestinationValid()){
            var x = $gameTemp.destinationX();
            var y = $gameTemp.destinationY();
            direction = this.findDirectionTo(x, y);
        }
        if ((direction > 0 || TouchInput.isTriggered()) && this._waitCount == 0) {
            this.executeMove(direction);
        } else {
            this.setDirection(direction);
            this._followers._data[0].turnTowardPlayer();
        }
    }
};