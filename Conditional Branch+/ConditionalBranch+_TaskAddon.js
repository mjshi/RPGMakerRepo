//==============================================================================
// ConditionalBranch+_TaskAddon.js
//==============================================================================

/*:
* @plugindesc Conditional Branch+ Task Addon
* @author mjshi
*
* @param 
* @desc 
* @default 
*
* @param
* @help 
* ------------------------------------------------------------------------------
*   ConditionalBranch+ Task Addon v1.0 by mjshi
*   Free for both commercial and non-commercial use, with credit.
* ------------------------------------------------------------------------------
*   Requires Conditional Branch+ to run.
*   Place this plugin below Conditional Branch+ in the Plugin Manager.
* ------------------------------------------------------------------------------
*                             ** In Script Command**
* ------------------------------------------------------------------------------
* Check.add_task(type, id, num)
* -- type can be anything so long as it starts with one of four letters:
*    i : item
*    w : weapon
*    a : armor
*    g : gold (omit id)
* -- As an example, Check.add_task("i", 34, 2) would add 2 of item ID 34 to 
*    the task requirements. Check.add_task("item", 34, 2) does the same thing.
* -- Check.add_task("gold", 100) adds 100 gold to the list of requirements. 
*    ID is ommitted for gold-checking.
*
* Check.clear_tasks()
* -- clears all tasks
*
* Check.clear_tasks(type)
* -- clears tasks of a certain type. Type can be: items, weapons, armors, gold
* ------------------------------------------------------------------------------
*                          ** In Conditional Branch**
* ------------------------------------------------------------------------------
* Check.check_task()
* Check.check_task(dontRemove)
* -- dontRemove can be left out or set to false if you want items to be
*    removed when the player has fulfilled the task requirements.
* -- if dontRemove is true, the items will not be removed.
*
* Tasks are cleared once Check.check_task runs true, remain unchanged otherwise.
* ------------------------------------------------------------------------------
*
* > Is something broken? Go to http://mjshi.weebly.com/contact.html and I'll
*   try my best to help you!
*/

Check.task = {
	items: [],
	weapons: [],
	armors: [],
	gold: 0,
}

Check.add_task = function(type, id, num) {
	if (type.toLowerCase().startsWith("i")) Check.task.items.push([id, num]);
	if (type.toLowerCase().startsWith("w")) Check.task.weapons.push([id, num]);
	if (type.toLowerCase().startsWith("a")) Check.task.armors.push([id, num]);
	if (type.toLowerCase().startsWith("g")) Check.task.gold = id;
}

Check.check_task = function (dontRemove) {
	var hasItems = Check.has_more(Check.task.items),
		hasWeapons = Check.weapon_more(Check.task.weapons),
		hasArmors = Check.armor_more(Check.task.armors),
		hasGold = $gameParty.gold() >= Check.task.gold;

	if (hasItems && hasWeapons && hasArmors && hasGold) {
		if (dontRemove === undefined) {
			for (var i = 0; i < Check.task.items.length; i++) $gameParty.loseItem($dataItems[Check.task.items[i][0]], Check.task.items[i][1]);
			for (var i = 0; i < Check.task.weapons.length; i++) $gameParty.loseItem($dataWeapons[Check.task.weapons[i][0]], Check.task.weapons[i][1]);
			for (var i = 0; i < Check.task.armors.length; i++) $gameParty.loseItem($dataArmors[Check.task.armors[i][0]], Check.task.armors[i][1]);
			$gameParty.loseGold(Check.task.gold);
		}
		Check.clear_tasks();

		return true;
	}
	return false;
}

Check.check_tasks = Check.check_task;

Check.clear_tasks = function (what) {
	if (what === undefined) {
		Check.task.items = [];
		Check.task.weapons = [];
		Check.task.armors = [];
		Check.task.gold = 0;
		return;
	}

	if (what === "gold") {
		Check.task.gold = 0;
		return;
	}

	Check.task[what] = [];
}