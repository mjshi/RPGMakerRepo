//=============================================================================
// NonCombatMenu_PluginCMD.js
//=============================================================================

var Imported = Imported || {};
if (Imported.NonCombatMenu) {

/*:
 * @plugindesc Addon for Non-Combat Menu that adds plugin commands to the menu
 * @author Valrix
 *
 * @help 
 * ----------------------------------------------------------------------------
 *   Non-Combat Menu Plugin Command Addon v1.1 by Valrix on RMN
 *   Free for both commercial and non-commercial use, with credit.
 * ----------------------------------------------------------------------------
 * 
 * > Place the Non-Combat Menu above this addon.
 *
 * To run a plugin command from the menu use "cmd_" followed by the plugin
 * command you want to run.
 * 
 * Example Menu: Items: item, Crafting: cmd_OpenSynthesis, Quit: toTitle
 * 
 * This menu can open the item screen, open Yanfly's Item_Synthesis plugin, or
 * quit to the title screen. Anything can come after "cmd_" except a comma.
 * This means you can use spaces and call commands such as "cmd_REFRESH ALL"
 *
 */

Scene_NCMenu.prototype.createCommandWindow = function() {
    this._commandWindow = new Window_NCMenu();
    var method, cmd;

    for (var i = 0; i < NCMenu.menuList.length; i++) {
        method = NCMenu.menuList[i][1];
        if (method == 'cancel') continue;
        cmd = method.replace("cmd_", "");
        if (cmd == method) {
            var match = /CEvent_([0-9])+/.exec(method);
            if (match) {
                method = "common";
                cmd = "this.callCommonEvent.bind(this, match[1])";
            } else {cmd = "this.command" + method.charAt(0).toUpperCase() + method.slice(1) + ".bind(this)"}
        } else {
            cmd = "this.commandOther.bind(this, '" + cmd + "')";
        }
        this._commandWindow.setHandler(method, eval(cmd));
    }

    this._commandWindow.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._commandWindow);
};

Scene_NCMenu.prototype.commandOther = function() {
    var args = arguments[0].split(' ');
    Game_Interpreter.prototype.pluginCommand(args.shift(), args);
};

};