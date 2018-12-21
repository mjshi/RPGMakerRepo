
function Check() {};

/*:
 * @plugindesc Conditional Branch+ v1.2: Checks for various things.
 * Read help file for more information.
 * @author mjshi
 *
 * @help
 * ------------------------------------------------------------------------------
 *    Conditional Branch+ v1.2
 *     Extends the functionality of what a conditional branch can check.
 *     By mjshi, OK for use in all projects with credit.
 * ------------------------------------------------------------------------------
 * How to use:
 * On a conditional branch, go to the fourth tab and select the "Script" option.
 * Type in desired thing to check. See below...
 * ==============================================================================
 *               Asterisk (*) means multiple inputs are accepted.
 * ==============================================================================
 * Combining Checks
 * Use "&&", "||", and "()" to combine several checks in a conditional branch.
 *   && = this AND that are true
 *   || = this OR that are true
 *   () = order of operations, check innermost parentheses first
 *   !  = translates to NOT. EX. !Check.has(1) checks if player DOESN'T have
 *        item id 1 in their inventory.
 * 
 * -- EX: (Check.has(1) && Check.greater(1 , 0)) || Check.has(2)
 * -- Checks if player has item 1 and variable 1 > 0, or player has item 2.
 * ==============================================================================
 *  Possible Checks
 * ------------------------------------------------------------------------------
 *    Items
 * ------------------------------------------------------------------------------
 * Check.has(*items)
 * -- EX: Check.has(1, 3, 4)
 * -- checks if player has items 1, 3, and 4 in inventory.
 * 
 * Check.has_more(*items, number)
 * -- EX: Check.has_more(1, 2, 3, 4, 5)
 * -- checks if player has at least five (includes 5) of items 1, 2, 3, 4.
 * 
 * Check.has_less(*items, number)
 * -- EX: Check.has_less(1, 2, 3, 4, 5)
 * -- checks if player has at most five (includes 5) of items 1, 2, 3, 4.
 * 
 * Check.has_any(*items)
 * -- EX: Check.has_any(1, 3, 4)
 * -- checks if player has either item 1, 3, or 4 in inventory.
 * 
 * Check.each_more(*[item, number])
 * -- EX: Check.each_more([1, 2], [2, 4])
 * -- checks if there are at least 2 of item 1 and at least 4 of item 2.
 * 
 * Check.each_less(*[item, number])
 * -- EX: Check.each_less([1, 2], [2, 4])
 * -- checks if there are at most 2 of item 1 and at most 4 of item 2.
 * ------------------------------------------------------------------------------
 *    Equipment
 * ------------------------------------------------------------------------------
 * Check.equipped(who, "weapon", *ids, "armor", *ids)
 *  who can be omitted to check ALL members of the party or "active" to check all
 *  party members active in battle, or it can be a list of actor ids.
 *   additionally: stores the ID of the first person it finds with the equips
 *   in Check._whoHad, and if nobody had them equipped, Check._whoHad is 0.
 *   This can be used in Control Variables to set a variable to the ID of the
 *   person who had everything equipped.
 *
 * -- EX: Check.equipped("weapon", 1, "armor", 1, 3, 5)
 * -- this works too: Check.equipped("armor", 1, 3, 5, "weapon", 1)
 * -- checks if armors 1, 3 AND 5 as well as weapon 1 are equipped by anyone in
 *    the party. As you can see, weapon and armor can be anywhere.
 * -- EX: Check.equipped(1, "weapon", 1)
 * -- checks if weapon 1 is equipped by actor id 1
 * -- EX: Check.equipped(1, 2, "armor", 1)
 * -- checks if armor 1 is equipped by actor id 1 or two
 *
 * Check.any_equipped(who, "weapon", *ids, "armor", *ids)
 *  Similar setup to Check.equipped, but is lazier. Also stores the ID of the
 *  first person it finds in Check._whoHad. Check.equipped_any works as well.
 * -- EX: Check.any_equipped(1, "weapon", 3, "armor", 1, 2, 3)
 * -- checks if actor 1 equipped either weapon id 3 or armor id 1 or 2 or 3
 *
 *              **The following commands check the inventory ONLY**
 *
 * Check.has_weapon(*ids)
 * Check.has_armor(*ids)
 * Check.weapon_any(*ids)
 * Check.armor_any(*ids)
 * -- EX: Check.has_weapon(1, 3, 4)
 * -- checks if player has weapons 1, 3, and 4 in their inventory
 * -- EX: Check.armor_any(1, 3, 4)
 * -- checks if player has either armor 1, 3, or 4 in their inventory
 *
 * Check.weapon_more(*ids, number)
 * Check.weapon_less(*ids, number)
 * Check.armor_more(*ids, number)
 * Check.armor_less(*ids, number)
 * -- EX: Check.weapon_more(2, 10)
 * -- checks if there are at least 10 of weapon id 2
 * -- EX: Check.armor_less(2, 10)
 * -- checks if there are at most 10 of armor id 2
 * ------------------------------------------------------------------------------
 *    Gold (Engine Default)
 * ------------------------------------------------------------------------------
 * $gameParty.gold() > amount
 * $gameParty.gold() < amount
 * $gameParty.gold() >= amount
 * $gameParty.gold() <= amount
 *
 * ------------------------------------------------------------------------------
 *    Variables
 * ------------------------------------------------------------------------------
 * Check.is_any(variable, *values)
 * -- EX: Check.is_any(1, 3, 4, 5)
 * -- checks if variable 1 is either 3, 4, or 5.
 * 
 * Check.is_not(variable, *values)
 * -- EX: Check.is_not(1, 3, 4, 5)
 * -- checks if variable 1 is neither 3, 4, nor 5.
 * 
 * Check.greater(*variables, value)
 * -- EX: Check.greater(1, 2, 3, 5)
 * -- checks if variables 1, 2, and 3 are at least 5.
 * 
 * Check.lesser(*variables, value)
 * -- EX: Check.lesser(1, 2, 3, 5)
 * -- checks if variables 1, 2, and 3 are at most 5.
 * 
 * Check.in_range(*variables, start, stop)
 * -- EX: Check.in_range(1, 3, 4, 5)
 * -- checks if variable 1 AND 3 are between 4 and 5, including 4 and 5.
 * 
 * Check.any_inrange(*variables, start, stop)
 * -- EX: Check.any_inrange(1, 3, 4, 5)
 * -- checks if variable 1 OR 3 are between 4 and 5, including 4 and 5.
 * 
 * Check.each_is(*[variable, value])
 * -- EX: Check.each_is([1, 3], [4, 5])
 * -- checks if variable 1 is 3, and variable 4 is 5.
 * 
 * Check.each_greater(*[variable, value])
 * -- EX: Check.each_greater([1, 3], [4, 5])
 * -- checks if variable 1 is at least 3 and variable 4 is at least 5.
 * 
 * Check.each_lesser(*[variable, value])
 * -- EX: Check.each_lesser([1, 3], [4, 5])
 * -- checks if variable 1 is at most 3 and variable 4 is at most 5.
 * 
 * Check.each_inrange(*[variable, start, stop])
 * -- EX: Check.in_range([1, 3, 5], [3, 1, 4])
 * -- checks if variable 1 is between 3 and 5, and variable 3 is between 1 and 4.
 * ------------------------------------------------------------------------------
 *    Switches
 * ------------------------------------------------------------------------------
 * Check.all_true(*switches)
 * -- EX: Check.all_true(1, 2, 3)
 * -- checks if switches 1, 2, 3 are true.
 * 
 * Check.true(*switches)
 * -- Same behavior as above
 *
 * Check.any_true(*switches)
 * -- EX: Check.any_true(1, 2, 3)
 * -- checks if either of switches 1, 2, 3 are true.
 * 
 * Check.all_false(*switches)
 * -- EX: Check.all_false(1, 2, 3)
 * -- checks if switches 1, 2, 3 are false.
 * 
 * Check.false(*switches)
 * -- Same behavior as above
 * 
 * Check.any_false(*switches)
 * -- EX: Check.any_false(1, 2, 3)
 * -- checks if either of switches 1, 2, 3 are false.
 * 
 * Check.each_switch(*[switch, on/off])
 * If on, put 1. If off, put 0.
 * ==============================================================================
 */

/* Items */

Check.has = function () {
	var items = Array.prototype.slice.call(arguments);
	for (var i = 0; i < items.length; i++) {if (!$gameParty.hasItem($dataItems[items[i]])) return false}
		return true;
};

Check.has_more = function () {
	var items = Array.prototype.slice.call(arguments);
	var number = items.pop();

	for (var i = 0; i < items.length; i++) {if ($gameParty.numItems($dataItems[items[i]]) < number) return false}
		return true;
};

Check.has_less = function () {
	var items = Array.prototype.slice.call(arguments);
	var number = items.pop();

	for (var i = 0; i < items.length; i++) {if ($gameParty.numItems($dataItems[items[i]]) > number) return false}
		return true;
};

Check.has_any = function() {
	var items = Array.prototype.slice.call(arguments);
	for (var i = 0; i < items.length; i++) {if ($gameParty.hasItem($dataItems[items[i]])) return true}
		return false;
};

Check.each_more = function() {
	var items_array = Array.prototype.slice.call(arguments);
	for (var i = 0; i < items_array.length; i++) {if ($gameParty.numItems($dataItems[items_array[i][0]]) < items_array[i][1]) return false}
		return true;
};

Check.each_less = function() {
	var items_array = Array.prototype.slice.call(arguments);
	for (var i = 0; i < items_array.length; i++) {if ($gameParty.numItems($dataItems[items_array[i][0]]) > items_array[i][1]) return false}
		return true;
};

/* Equipment */

Check.equipped = function() {
	var args = Array.prototype.slice.call(arguments);
	var actors = [], weapons = [], armors = [];

	//setup actors
	if (isNaN(args[0])) {
		if (args[0] === "active") {for (var i = 0; i < $gameParty.battleMembers().length; i++) {actors.push($gameParty.battleMembers()[i]._actorId)}
		} else {for (var i = 0; i < $gameParty.allMembers().length; i++) {actors.push($gameParty.allMembers()[i]._actorId)}}
	} else {
		for (var i = 0; i < args.length; i++) {
			if (isNaN(args[i])) {break}; //stop when they declare weapon/armor
			actors.push(args[i]);
		} for (var i = 0; i < actors.length; i++) {args.shift()}
	}
	//setup weapons and armors arrays
	for (var i = 0; i < args.length; i++) {
		if (isNaN(args[i])) {phase = args[i]} else {
			eval(phase + "s" + ".push($data"+ phase.charAt(0).toUpperCase() + phase.slice(1) + "s" + "[" + args[i] + "])")
		}
	}

	for (var i = 0; i < actors.length; i++) { //for every person
		var has = false;
		for (var w = 0; w < weapons.length; w++) { //check weapons
			has = $gameActors.actor(actors[i]).hasWeapon(weapons[w]);
			if (!has) {break} //doesn't have it, stop checking
		} if (!has) {continue} //doesn't have it, next person
		for (var a = 0; a < armors.length; a++) { //check armors
			has = $gameActors.actor(actors[i]).hasArmor(armors[a]);
			if (!has) {break} //doesn't have it, stop checking
		} if (!has) {continue} //doesn't have it, next person
			else { //has it! store their ID, return true
				Check._whoHad = actors[i];
				return true;
			}
	}
	//we checked everyone already, and nobody had it
	Check._whoHad = 0;
	return false;
};

Check.any_equipped = function() {
	var args = Array.prototype.slice.call(arguments);
	var actors = [], weapons = [], armors = [];
	//setup actors
	if (isNaN(args[0])) {
		if (args[0] === "active") {for (var i = 0; i < $gameParty.battleMembers().length; i++) {actors.push($gameParty.battleMembers()[i]._actorId)}
		} else {for (var i = 0; i < $gameParty.allMembers().length; i++) {actors.push($gameParty.allMembers()[i]._actorId)}}
	} else {
		for (var i = 0; i < args.length; i++) {
			if (isNaN(args[i])) {break}; //stop when they declare weapon/armor
			actors.push(args[i]);
		} for (var i = 0; i < actors.length; i++) {args.shift()}
	}
	//setup weapons and armors arrays
	for (var i = 0; i < args.length; i++) {
		if (isNaN(args[i])) {phase = args[i]} else {
			eval(phase + "s" + ".push($data"+ phase.charAt(0).toUpperCase() + phase.slice(1) + "s" + "[" + args[i] + "])")
		}
	}

	for (var i = 0; i < actors.length; i++) { //for every person
		var has = false;
		for (var w = 0; w < weapons.length; w++) { //check weapons
			has = $gameActors.actor(actors[i]).hasWeapon(weapons[w]);
		} if (has) { //we got it, stop checking now
			Check._whoHad = actors[i]; //save who had it
			return true}
		for (var a = 0; a < armors.length; a++) { //check armors
			has = $gameActors.actor(actors[i]).hasArmor(armors[a]);
		} if (has) { //we got it, stop checking now
			Check._whoHad = actors[i]; //save who had it
			return true}
	}
	//we checked everyone already, and nobody had it
	Check._whoHad = 0;
	return false;
};

Check.equipped_any = Check.any_equipped;

Check.has_weapon = function() {
	var items = Array.prototype.slice.call(arguments);
	for (var i = 0; i < items.length; i++) {if (!$gameParty.hasItem($dataWeapons[items[i]])) return false}
		return true;
};

Check.has_armor = function() {
	var items = Array.prototype.slice.call(arguments);
	for (var i = 0; i < items.length; i++) {if (!$gameParty.hasItem($dataArmors[items[i]])) return false}
		return true;
};

Check.weapon_any = function() {
	var items = Array.prototype.slice.call(arguments);
	for (var i = 0; i < items.length; i++) {if ($gameParty.hasItem($dataWeapons[items[i]])) return true}
		return false;
};

Check.armor_any = function() {
	var items = Array.prototype.slice.call(arguments);
	for (var i = 0; i < items.length; i++) {if ($gameParty.hasItem($dataArmors[items[i]])) return true}
		return false;
};

Check.weapon_more = function() {
	var items = Array.prototype.slice.call(arguments);
	var number = items.pop();

	for (var i = 0; i < items.length; i++) {if ($gameParty.numItems($dataWeapons[items[i]]) < number) return false}
		return true;
};

Check.armor_more = function() {
	var items = Array.prototype.slice.call(arguments);
	var number = items.pop();

	for (var i = 0; i < items.length; i++) {if ($gameParty.numItems($dataArmors[items[i]]) < number) return false}
		return true;
};

Check.weapon_less = function() {
	var items = Array.prototype.slice.call(arguments);
	var number = items.pop();

	for (var i = 0; i < items.length; i++) {if ($gameParty.numItems($dataWeapons[items[i]]) > number) return false}
		return true;
};

Check.armor_less = function() {
	var items = Array.prototype.slice.call(arguments);
	var number = items.pop();

	for (var i = 0; i < items.length; i++) {if ($gameParty.numItems($dataArmors[items[i]]) > number) return false}
		return true;
};

/* Variables */

Check.is_any = function() {
	var values = Array.prototype.slice.call(arguments);
	var id = values.shift();

	for (var i = 0; i < values.length; i++) {if ($gameVariables.value(id) == values[i]) return true}
		return false;
};

Check.is_not = function() {
	var values = Array.prototype.slice.call(arguments);
	var id = values.shift();

	for (var i = 0; i < values.length; i++) {if ($gameVariables.value(id) == values[i]) return false}
		return true;
};

Check.greater = function() {
	var vars = Array.prototype.slice.call(arguments);
	var value = vars.pop();

	for (var i = 0; i < vars.length; i++) {
		if ($gameVariables.value(vars[i]) < value) return false;
	}
		return true;
};

Check.lesser = function() {
	var vars = Array.prototype.slice.call(arguments);
	var value = vars.pop();

	for (var i = 0; i < vars.length; i++) {
		if ($gameVariables.value(vars[i]) > value) return false;
	}
		return true;
};

Check.in_range = function() {
	var ids = Array.prototype.slice.call(arguments);
	var stop = ids.pop();
	var start = ids.pop();

	for (var i = 0; i < ids.length; i++) {if ($gameVariables.value(ids[i]) < start || $gameVariables.value(ids[i]) > stop) return false}
		return true;
};

Check.any_inrange = function() {
	var ids = Array.prototype.slice.call(arguments);
	var stop = ids.pop();
	var start = ids.pop();

	for (var i = 0; i < ids.length; i++) {if ($gameVariables.value(ids[i]) >= start && $gameVariables.value(ids[i]) <= stop) return true}
		return false;
};

Check.each_is = function() {
	var variable_array = Array.prototype.slice.call(arguments);
	for (var i = 0; i < variable_array.length; i++) {if ($gameVariables.value(variable_array[i][0]) != variable_array[i][1]) return false}
		return true;
};

Check.each_greater = function() {
	var variable_array = Array.prototype.slice.call(arguments);
	for (var i = 0; i < variable_array.length; i++) {if ($gameVariables.value(variable_array[i][0]) < variable_array[i][1]) return false}
		return true;
};

Check.each_lesser = function() {
	var variable_array = Array.prototype.slice.call(arguments);
	for (var i = 0; i < variable_array.length; i++) {if ($gameVariables.value(variable_array[i][0]) > variable_array[i][1]) return false}
		return true;
};

Check.each_inrange = function() {
	var variable_array = Array.prototype.slice.call(arguments);
	for (var i = 0; i < variable_array.length; i++) {if ($gameVariables.value(variable_array[i][0]) < variable_array[i][1] || $gameVariables.value(variable_array[i][0]) > variable_array[i][2]) return false}
		return true;
};

/* Switches */

Check.all_true = function() {
	var switches = Array.prototype.slice.call(arguments);
	for (var i = 0; i < switches.length; i++) {if (!$gameSwitches.value(switches[i])) return false}
		return true;
};

Check.true = Check.all_true;

Check.any_true = function() {
	var switches = Array.prototype.slice.call(arguments);
	for (var i = 0; i < switches.length; i++) {if ($gameSwitches.value(switches[i])) return true}
		return false;
};

Check.all_false = function() {
	var switches = Array.prototype.slice.call(arguments);
	for (var i = 0; i < switches.length; i++) {if ($gameSwitches.value(switches[i])) return false}
		return true;
};

Check.false = Check.all_false;

Check.any_false = function() {
	var switches = Array.prototype.slice.call(arguments);
	for (var i = 0; i < switches.length; i++) {if (!$gameSwitches.value(switches[i])) return true}
		return false;
};

Check.each_switch = function() {
	var switches_array = Array.prototype.slice.call(arguments);
	for (var i = 0; i < switches_array.length; i++) {if ($gameSwitches.value(switches_array[i][0]) != switches_array[i][1]) return false}
		return true;
};