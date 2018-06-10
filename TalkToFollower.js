//==============================================================================
// TalkToFollower.js
//==============================================================================

var Imported = Imported || {};
Imported.TalkToFollower = true;

var TTF = {};

/*:
* @plugindesc Allows the player to talk to a follower, specifically, the one party member right behind them.
* @author mjshi
* 
* @param Common Event ID
* @desc ID of the common event to be called when the player attempts to talk to a follower
* @default 1
* 
* @help 
* ----------------------------------------------------------------------------
*   Talk To Follower v1.01 by mjshi
*   Free for both commercial and non-commercial use, with credit.
* ----------------------------------------------------------------------------
* > Requires Turn In Place: http://mjshi.weebly.com/mv-turn-in-place.html
* > Only works when the player has exactly 1 follower.
*
* > Update v1.01: Fixed a bug that occurs if there are no followers
* ----------------------------------------------------------------------------
*   Built-in functions for conditional branches. Case Sensitive!
* ----------------------------------------------------------------------------
*   TTF.fIs(ID)       checks if the follower's ID is ID 
*   TTF.mapIs(ID)     checks if player/follower are in map ID
*   TTF.regionIs(ID)  checks if player is in region ID
*   TTF.fregionIs(ID) checks if follower is in region ID
*   
*   Use && and || to connect these statements! For example,
*
*   TTF.regionIs(ID) || TTF.fregionIs(ID)
*   checks if follower OR player are in region ID
*
*   TTF.regionIs(ID) && TTF.fregionIs(ID)
*   checks if follower AND player are in region ID
* ----------------------------------------------------------------------------
*
* > Is something broken? Go to http://mjshi.weebly.com/contact.html and I'll
*   try my best to help you!
*/

TTF.Parameters = PluginManager.parameters('TalkToFollower');
TTF.eventID = Number(TTF.Parameters['Common Event ID']);

if (Imported.TurnInPlace) {

TTF.mapIs = function (ID) {return ($gameMap._mapId == ID)}
TTF.fIs = function (ID) {return ($gameParty._actors[1] == ID)}
TTF.regionIs = function (ID) {return ($gameMap.regionId($gamePlayer._x, $gamePlayer._y) == ID)}
TTF.fregionIs = function (ID) {return ($gameMap.regionId($gamePlayer._followers.visibleFollowers()[0]._x, $gamePlayer._followers.visibleFollowers()[0]._y) == ID)}

ttf_alias_Scene_Map_updateScene = Scene_Map.prototype.updateScene;
Scene_Map.prototype.updateScene = function() {
    ttf_alias_Scene_Map_updateScene.call(this);
    if (SceneManager.isSceneChanging()) {return}
    if ($gameMap.isEventRunning()) {return}
    if (Input.isTriggered('ok') || (TouchInput.isTriggered() && TouchInput.clickedOnFollower())) {this.checkTalking()};
};

TouchInput.clickedOnFollower = function() {
    var x = Math.floor(this._x / 48);
    var y = Math.floor(this._y / 48);
    var f = $gamePlayer._followers.visibleFollowers()[0];
    if (f === undefined) return;
    return (x == f._x && y == f._y);
};

Scene_Map.prototype.checkTalking = function() {    
    var f = $gamePlayer._followers.visibleFollowers()[0];
    if (!f) {return}
    var p = $gamePlayer;
    var pd = p._direction;
    var fd = f._direction;
    if ((pd == 8 && fd == 2 && p._y - f._y == 1) || (pd == 2 && fd == 8 && p._y - f._y == -1) || 
        (pd == 4 && fd == 6 && p._x - f._x == 1) || (pd == 6 && fd == 4 && p._x - f._x == -1))
        {$gameTemp.reserveCommonEvent(TTF.eventID)}
};
}