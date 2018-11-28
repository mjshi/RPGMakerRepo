//=============================================================================
// RuneSkills.js
//=============================================================================

var Imported = Imported || {};
Imported.RuneSkills = true;

var RuneSkills = {};

/*:
 * @plugindesc A different way of using skills. Combine runes to form epic spells!
 * @author mjshi
 *
 * @param ---Runes---
 * @desc 
 * @default 
 *
 * @param Type ID
 * @parent ---Runes---
 * @desc Type ID of Rune skills. Can be set up in Database >1 Types > Skill Types.
 * @default 3
 *
 * @param Include All
 * @parent ---Runes---
 * @desc yes: all skills that the actor learned will be listed
 * no: only the skills marked as the Type ID will appear
 * @default no
 *
 * @param Allow Failure
 * @parent ---Runes---
 * @desc Allow combinations of runes that do not result in skills? (yes/no)
 * @default yes
 *
 * @param Failure Result
 * @parent ---Runes---
 * @desc Resulting skill. ID, first/last (rune), rfru: random rune, rfre: random skill from runes, any: any random skill
 * @default 7
 * 
 * @param Unknown MP Value
 * @parent ---Runes---
 * @desc The string used when the failure result is unknown (randomized)
 * @default ???
 *
 * @param Ignore Order
 * @parent ---Runes---
 * @desc yes: <runes: 4, 5> is equivalent to <runes: 5, 4>
 * no: Order matters
 * @default no
 *
 * @param Default Minimum Runes
 * @parent ---Runes---
 * @desc Number to use as the number of minimum runes when minimum runes is not defined
 * @default 1
 *
 * @param Default Maximum Runes
 * @parent ---Runes---
 * @desc Number to use as the number of maximum runes when minimum runes is not defined
 * @default 5
 *
 * @param Default Maximum Rune Cap
 * @parent ---Runes---
 * @desc Number cap the max runecount at when the max runecount cap isn't defined
 * @default 10
 *
 * @param ---Appearance---
 * @desc 
 * @default 
 *
 * @param Chosen Runes Window
 * @parent ---Appearance---
 * @desc Displays the icons of chosen runes.
 * x, y, width, height
 * @default 0, 108, 576, 72
 *
 * @param Rune Result Window
 * @parent ---Appearance---
 * @desc Displays the resulting skill (if known)
 * x, y, width, height
 * @default 576, 108, 240, 72
 *
 * @param Icon Spacing
 * @desc Spacing between each icon
 * @parent Chosen Runes Window
 * @default 12
 *
 * @param Unknown Result Name
 * @parent Rune Result Window
 * @desc What to call the skill if the result is unknown
 * @default ???
 *
 * @param Unknown Result Icon
 * @parent Rune Result Window
 * @desc The icon index of the skill if the result is unknown
 * @default 16
 * 
 * @param Rune List Window
 * @parent ---Appearance---
 * @desc List of runes to choose from.
 * x, y, width, height
 * @default 0, 180, 576, 264
 *
 * @param Rune Choice Window
 * @parent ---Appearance---
 * @desc Window that asks what to do with the chosen rune.
 * x, y
 * @default 576, 180
 *
 * @param Show Help Window
 * @parent Rune List Window
 * @desc Display the help window/description box? (yes/no)
 * if "no" I recommend subtracting 108 from all y values
 * @default yes
 *
 * @param ---Behavior---
 * @desc 
 * @default 
 *
 * @param Learn After Cast
 * @parent ---Behavior---
 * @desc (yes/no) Have the actor learn the skill after casting it once.
 * @default no
 *
 * @param Hide MP Value of Unlearned Skills
 * @parent ---Behavior---
 * @desc (yes/no)
 * @default yes
 *
 * @param Actor Specific Learned Skills
 * @parent ---Behavior---
 * @desc (yes/no) "Remembered" skills are actor-specific.
 * @default no
 *
 * @param Return To List After Add
 * @parent ---Behavior---
 * @desc (yes/no) Returns to the rune list after adding a rune.
 * @default no
 *
 * @param Choice List
 * @parent ---Behavior---
 * @desc Add: adds rune to pool. %s is the MP determined by MP formula.
 * @default Add, Cast (%s MP), Delete, Clear All, Cancel
 *
 * @param MP Formula
 * @parent ---Behavior---
 * @desc total = MP of all selected skills, round = average MP, result = resulting skill MP, Number = fixed MP
 * @default result
 * 
 * @param Persistent
 * @parent ---Behavior---
 * @desc Always show the RuneChoice Window and RuneResult Window? (yes/no)
 * @default yes
 *
 * @param
 * 
 * @help
 *
 * ----------------------------------------------------------------------------
 *   Rune Skill System v1.2b by mjshi
 *   Free for both commercial and non-commercial use, with credit.
 * ----------------------------------------------------------------------------
 *
 *  > This plugin no longer needs to be set up first before running. (1.01+)
 *   
 * ----------------------------------------------------------------------------
 *  How to add a skill to be created with runes:
 * ----------------------------------------------------------------------------
 *   Let's say this is your setup in the database.
 *   Skill ID 4: Fire Rune      Skill Type: Rune (type ID 3)
 *   Skill ID 5: Wind Rune      Skill Type: Rune (type ID 3)
 *   Skill ID 6: Raging Flame   Skill Type: Magic (type ID 1)
 *
 *   To set up "Raging Flame" to be created with a Fire rune and a Wind rune,
 *   write in the "Raging Flame" skill's notebox:
 *
 *   <runes: 4, 5>
 *
 *   By default, order matters. <runes: 4, 5> is different from <runes: 5, 4>.
 *   The same rune can also be used multiple times. So <runes: 5, 5> is a
 *   valid combination, as is <runes: 4, 5, 4>.
 *
 *   Additionally, if you put the notetag
 *     <remove after battle>
 *   in a skill's note box, it will be removed after each battle. This applies
 *   to ALL skills, not just rune skills.
 *
 *   With update 1.2, you can now set multiple rune combinations to a single
 *   skill. Use these alternate notetags:
 *
 *   <rune0: 4, 5>
 *   <rune1: 2, 3>
 *   <rune2: 1, 2, 2>
 *   ...
 *   <rune#: X, Y, Z...>
 *
 *   to specify more possible combinations. Note that the numbers have to be
 *   consecutive and start at 0.
 *
 * ----------------------------------------------------------------------------
 *  How to set up minimum and maximum number of runes
 * ----------------------------------------------------------------------------
 *   <minrunes: lvl-number>
 *   <maxrunes: lvl-number> 
 *
 *   Example. <maxrunes: 1-1, 2-2, 3-3>
 *   This will make it so the maximum number of runes that an actor can
 *   combine at LV 1 is 1, LV 2 is 2, LV 3 is 3, etc.
 *
 *   If minrunes and maxrunes are not defined for an actor, they will be set
 *   to whatever the default is (see plugin parameters).
 *   This list should be in numerical order.
 *
 * ............................................................................
 *              The below features are available for maxrunes only
 * ............................................................................
 *   Alternatively, you can set maxrunes to be based on a stat.
 *     <maxrunes:stat statValue-number>
 *   
 *   Example:
 *     <maxrunes:mat 10-1, 20-2, 30-3>
 *
 *   This will make it so that with 10 magic attack, the actor can combine 1
 *   rune, at 20, they can combine 2, at 30, 3, etc.
 *
 *   Valid stats: mhp, mmp, atk, def, mat, mdf, agi, luk
 *   This list should be in numerical order.
 * ............................................................................
 *                **FOR PEOPLE WHO KNOW A BIT OF JAVASCRIPT**
 *
 *   You can also set maxrunes to be based on a formula.
 *     <maxrunes:formula formulaHere>
 *
 *   Examples:
 *     <maxrunes:formula this._level>
 *
 *   This would set maxrunes to scale 1:1 with level. So at level 30, the 
 *   actor can have 30 runes, maximum.
 *     
 *     <maxrunes:formula Math.floor(this['mat'] / 10)>
 *
 *   This would set maxrunes to scale with 10% of the magic attack. So if
 *   the actor had 45 magic attack, they could use up to 4 runes.
 *
 *   Stats can be referenced by this[stat], levels can be referenced by
 *   this._level, and variables can be referenced with $gameVariables.value(ID)
 *
 * ----------------------------------------------------------------------------
 *   How to exclude a skill from being chosen randomly as a failure result
 * ----------------------------------------------------------------------------
 *   This only really applies if you said "yes" to "Allow Failure" and
 *   Failure Result is set to "any". 
 *
 *   Adding <exclude> in the skill notebox will remove it from the random
 *   list. This may be useful for skills that only act as separators (and
 *   thus don't actually do anything) or skills that are way too OP, etc.
 *
 * ----------------------------------------------------------------------------
 *   If skills aren't showing up or look cut off, increase the height of
 *   the Rune List Window, and make sure that in the database they are set
 *   to the correct skill type.
 *
 * ----------------------------------------------------------------------------
 *   Update Notes 
 * > 1.0 plugin released
 * > 1.0 (update) added option to remove help window
 * > 1.01 removed the need to set up the runes first before running
 * > 1.01a compatibility fixes with Yanfly Engine Core
 * > 1.01b Rune Skills now works with battle tests!
 *
 * > 1.1 Quality-of-life and visual improvements. Added option to learn the
 *       skill after casting it, and hide the MP value of unknown skills.
 * > 1.1a Added skill forgetting after battle
 * > 1.1b Save bugfix
 * > 1.2 Added rune result window for "learned" skill combos, overhauled max
 *       rune count to allow for greater customizability
 * > 1.2a Fixed compatibility issue with YEP_X_AnimatedSVEnemies 
 * > 1.2b Added compatibility with Yanfly Limited Skill Uses-- make sure to
 *        place this plugin under it!
 * ----------------------------------------------------------------------------
 *
 * > Is something broken? Go to http://mjshi.weebly.com/contact.html and I'll
 *   try my best to help you!
 *
 */

//=============================================================================
// Import Parameters
//=============================================================================

RuneSkills.Parameters = PluginManager.parameters('RuneSkills');
RuneSkills.SkillType = Number(RuneSkills.Parameters['Type ID']);
RuneSkills.IncludeAll = (String(RuneSkills.Parameters['Include All']) === "yes");
RuneSkills.AllowFailure = (String(RuneSkills.Parameters['Allow Failure']) === "yes");
RuneSkills.FailureResult = String(RuneSkills.Parameters['Failure Result']);
RuneSkills.UnknownMPValue = String(RuneSkills.Parameters['Unknown MP Value']);
RuneSkills.ChosenRunesWindow = (String(RuneSkills.Parameters['Chosen Runes Window'])).split(", ");
RuneSkills.IconSpacing = Number(RuneSkills.Parameters['Icon Spacing']);
RuneSkills.RuneListWindow = (String(RuneSkills.Parameters['Rune List Window'])).split(", ");
RuneSkills.RuneChoiceWindow = (String(RuneSkills.Parameters['Rune Choice Window'])).split(", ");
RuneSkills.ShowHelpWindow = (String(RuneSkills.Parameters['Show Help Window']) === "yes");
RuneSkills.Persist = (String(RuneSkills.Parameters['Persistent']) === "yes");
RuneSkills.ChoiceList = (String(RuneSkills.Parameters['Choice List'])).split(", ");
RuneSkills.MPFormula = String(RuneSkills.Parameters['MP Formula']);
RuneSkills.DefaultMin = Number(RuneSkills.Parameters['Default Minimum Runes']);
RuneSkills.DefaultMax = Number(RuneSkills.Parameters['Default Maximum Runes']);
RuneSkills.DefaultMaxCap = Number(RuneSkills.Parameters['Default Maximum Rune Cap']);
RuneSkills.learnAfterCast = (String(RuneSkills.Parameters['Learn After Cast']) === "yes");
RuneSkills.BackToListAfterAdd = (String(RuneSkills.Parameters['Return To List After Add']) === "yes");
RuneSkills.hideUnlearned = (String(RuneSkills.Parameters['Hide MP Value of Unlearned Skills']) === "yes");
RuneSkills.ignoreOrder = (String(RuneSkills.Parameters['Ignore Order']) === "yes");
RuneSkills.actorSpecific = (String(RuneSkills.Parameters['Actor Specific Learned Skills']) === "yes");
RuneSkills.RuneResultWindow = (String(RuneSkills.Parameters['Rune Result Window'])).split(", ");
RuneSkills.UnknownResultName = String(RuneSkills.Parameters['Unknown Result Name']);
RuneSkills.UnknownResultIcon = Number(RuneSkills.Parameters['Unknown Result Icon']);

RuneSkills.memory = {};
RuneSkills.isPastSkill = function (actorId, skillId) {
	if (RuneSkills.actorSpecific) return RuneSkills.memory[actorId + " " + skillId];
	return RuneSkills.memory[skillId];
}
RuneSkills.rememberSkill = function (actorId, skillId) {
	if (RuneSkills.actorSpecific) {
		RuneSkills.memory[actorId + " " + skillId] = true;
	} else {
		RuneSkills.memory[skillId] = true;
	}
}

//=============================================================================
// Initialize Skills
//=============================================================================

var _runeSkills_DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
	if (RuneSkills.Skill === undefined) RuneSkills.initialize();
	return _runeSkills_DataManager_isDatabaseLoaded.call(this);
};

RuneSkills.areEqual = function (skillId, runeArray) {
	if (!RuneSkills.Skill[skillId]) return false;

	for (var i = 0; i < RuneSkills.Skill[skillId].length; i++) {
		if (RuneSkills.Skill[skillId][i].equals(runeArray)) return true;
		if (RuneSkills.ignoreOrder && RuneSkills.Skill[skillId][i].equals(runeArray.slice().sort())) return true;
	}
	return false;
}

RuneSkills.initialize = function () {
	RuneSkills.Skill = {};
	for (var i = 1; i < $dataSkills.length; i++) {
		if ($dataSkills[i].meta.runes) {
			RuneSkills.Skill[i] = [$dataSkills[i].meta.runes.trim().split(", ").map(Number)];
			if (RuneSkills.ignoreOrder) RuneSkills.Skill[i].sort();
		}

		if ($dataSkills[i].meta.rune0) {
			RuneSkills.Skill[i] = [];
			for (var j = 0; $dataSkills[i].meta["rune" + j]; j++) {
				if (RuneSkills.ignoreOrder)	RuneSkills.Skill[i].push($dataSkills[i].meta["rune" + j].trim().split(", ").map(Number).sort());
					else					RuneSkills.Skill[i].push($dataSkills[i].meta["rune" + j].trim().split(", ").map(Number));
			}
		}
	}

	for (var i = 1; i < $dataActors.length; i++) {
		//===========================================================
		// Min Runes
		//
		var min = $dataActors[i].meta.minrunes;
		if (min) {
			min = min.trim().split(", ");
			for (var j = 0; j < min.length; j++) {
				min[j] = min[j].split("-").map(Number);
			}
			min.sort(function (a, b) {return b[0] - a[0]});
			$dataActors[i].meta.minrunes = min;
		}

		//===========================================================
		// Max Runes
		//
		$dataActors[i].meta.maxrunecap = parseInt($dataActors[i].meta.maxrunecap);
		var max = $dataActors[i].meta.maxrunes;
		if (max) {
			// level-based runecount
			if (max.startsWith(" ")) {
				max = max.trim().split(", ");

			// parameter-based or formula-based runecount
			} else {
				var stat = max.substr(0, max.indexOf(" "));
				if (stat === "formula") {
					$dataActors[i].meta.maxruneformula = max.substring(max.indexOf(" ") + 1);
					continue;

				} else {
					$dataActors[i].meta.maxrunestat = stat;
					max = max.substring(max.indexOf(" ") + 1).split(",");
				}
			}

			for (var j = 0; j < max.length; j++) max[j] = max[j].split("-").map(Number);
			max.sort(function (a, b) {return b[0] - a[0]});
			$dataActors[i].meta.maxrunes = max;
		}
	}
};

//=============================================================================
// Add additional Game_Actor functions
//=============================================================================

Game_Actor.prototype.minRunes = function () {
	var set = $dataActors[this.actorId()].meta.minrunes;
	if (!set) return RuneSkills.DefaultMin;

	for (var i = 0; i < set.length; i++) {
		if (this._level >= set[i][0]) return set[i][1];
	}
};

Game_Actor.prototype.maxRunes = function () {
	var meta = $dataActors[this.actorId()].meta;
	var set = meta.maxrunes;

	if (!set) return RuneSkills.DefaultMax;

	if (meta.maxruneformula) {
		return Math.min(eval(meta.maxruneformula), RuneSkills.DefaultMaxCap);

	} if (meta.maxrunestat) {
		for (var i = 0; i < set.length; i++) {
			if (this[meta.maxrunestat] >= set[i][0]) return Math.min(set[i][1], meta.maxrunecap || RuneSkills.DefaultMaxCap);
		}

	} else {
		for (var i = 0; i < set.length; i++) {
			if (this._level >= set[i][0]) return Math.min(set[i][1], meta.maxrunecap || RuneSkills.DefaultMaxCap);
		}
	}
};

//=============================================================================
// Rune Result Window
//=============================================================================

function Window_RuneResult() {
	this.initialize.apply(this, arguments);
};

Window_RuneResult.prototype = Object.create(Window_Base.prototype);
Window_RuneResult.prototype.constructor = Window_RuneResult;

Window_RuneResult.prototype.initialize = function(selected_window) {
	this._selected = selected_window;
	this._actor = null;
	Window_Base.prototype.initialize.call(this, RuneSkills.RuneResultWindow[0], RuneSkills.RuneResultWindow[1], RuneSkills.RuneResultWindow[2], RuneSkills.RuneResultWindow[3]);
	this.hide();
};

Window_RuneResult.prototype.setActor = function(actor) {
	this._actor = actor;
};

Window_RuneResult.prototype.refresh = function(actor) {
	this.contents.clear();
	if (this._selected.data().length === 0) return;

	var skill = this._selected.getResultingSkill();
	var text = $dataSkills[skill].name;
	var icon = $dataSkills[skill].iconIndex;
	var success = this._selected.isSuccessfulCast();
	if (!success || (success && RuneSkills.hideUnlearned && this._actor && !RuneSkills.isPastSkill(this._actor.actorId(), skill))) {
		text = RuneSkills.UnknownResultName;
		icon = RuneSkills.UnknownResultIcon;
	}

	var x = (this.contents.width - (32 + RuneSkills.IconSpacing) - this.textWidth(text)) / 2;
	var y = (this.contents.height - 32) / 2;
	this.drawIcon(icon, x, y);
	this.drawText(text, x + 32 + RuneSkills.IconSpacing, y);
};

//=============================================================================
// Create Skill Combination Window
//=============================================================================

function Window_RuneSelected() {
	this.initialize.apply(this, arguments);
};

Window_RuneSelected.prototype = Object.create(Window_Base.prototype);
Window_RuneSelected.prototype.constructor = Window_RuneSelected;

Window_RuneSelected.prototype.initialize = function() {
	this._runes = [];
	Window_Base.prototype.initialize.call(this, RuneSkills.ChosenRunesWindow[0], RuneSkills.ChosenRunesWindow[1], RuneSkills.ChosenRunesWindow[2], RuneSkills.ChosenRunesWindow[3]);
	this.hide();
};

Window_RuneSelected.prototype.addSkill = function(skill_id) {
	if (!skill_id) {return}
	this._lastSkill = skill_id;
	this._runes.push(skill_id);
	this.refresh();
};

Window_RuneSelected.prototype.removeSkill = function(skill_id) {
	this._runes.shift(skill_id);
	this.refresh();
};

Window_RuneSelected.prototype.data = function() {
	return this._runes;
};

Window_RuneSelected.prototype.drawRunes = function() {
	var x = (this.contents.width - (this._runes.length * (32 + RuneSkills.IconSpacing))) / 2;
	var y = (this.contents.height - 32) / 2;

	for (var i = 0; i < this._runes.length; i++) {
		var skill = $dataSkills[this._runes[i]];
		this.drawIcon(skill.iconIndex, x, y);
		x += 32 + RuneSkills.IconSpacing;
	}
};

Window_RuneSelected.prototype.refresh = function() {
	if (this.contents) {
		this.contents.clear();
		this.drawRunes();
	}
};

Window_RuneSelected.prototype.isSuccessfulCast = function() {
	for (var skillID in RuneSkills.Skill) {
		if (RuneSkills.areEqual(skillID, this._runes)) return true;
	}
}

Window_RuneSelected.prototype.getResultingSkill = function() {
	for (var skillID in RuneSkills.Skill) {
		if (RuneSkills.areEqual(skillID, this._runes)) return skillID;
	}
	if (RuneSkills.AllowFailure) {
		if (RuneSkills.FailureResult == +RuneSkills.FailureResult) {return Number(RuneSkills.FailureResult)}
		else if (RuneSkills.FailureResult == "first") return this._runes[0];
		else if (RuneSkills.FailureResult == "last")  return this._runes[this._runes.length - 1];
		else if (RuneSkills.FailureResult == "rfru")  return this._runes[Math.floor((Math.random() * this._runes.length) + 1)];
		else if (RuneSkills.FailureResult == "rfre") {
			var possible = [];
			for (var skillID in RuneSkills.Skill) possible.push(skillID);

			return possible[Math.floor((Math.random() * (possible.length - 1)))]}
		else if (RuneSkills.FailureResult == "any") {
			var skill = Math.floor((Math.random() * ($dataSkills.length - 1))) + 1;
			while ($dataSkills[skill].meta.exclude) {skill = Math.floor((Math.random() * ($dataSkills.length - 1))) + 1}
			return skill;
		}
		else {throw new Error('Failure result not defined, or defined incorrectly.')}
	}
};

Window_RuneSelected.prototype.skillIsMatch = function() {
	for (var skillID in RuneSkills.Skill) {
		if (RuneSkills.areEqual(skillID, this._runes))  return true;
	}
	return false;
};

//=============================================================================
// Create Skill Combine List
//=============================================================================

function Window_RuneList() {
	this.initialize.apply(this, arguments);
}

Window_RuneList.prototype = Object.create(Window_SkillList.prototype);
Window_RuneList.prototype.constructor = Window_RuneList;

Window_RuneList.prototype.initialize = function() {
	Window_SkillList.prototype.initialize.call(this, RuneSkills.RuneListWindow[0], RuneSkills.RuneListWindow[1], RuneSkills.RuneListWindow[2], RuneSkills.RuneListWindow[3]);
	this.hide();
	this.deactivate();
};

Window_RuneList.prototype.show = function() {
	this.selectLast();
	this.showHelpWindow();
	Window_SkillList.prototype.show.call(this);
};

Window_RuneList.prototype.hide = function() {
	this.hideHelpWindow();
	Window_SkillList.prototype.hide.call(this);
};

Window_RuneList.prototype.includes = function(item) {
	return item && (RuneSkills.IncludeAll || item.stypeId === this._stypeId);
};

Window_RuneList.prototype.enable = function(item) {
	return this._actor;
};

//=============================================================================
// Create Add/Execute List
//=============================================================================

function Window_RuneChoice() {
	this.initialize.apply(this, arguments);
};

Window_RuneChoice.prototype = Object.create(Window_Command.prototype);
Window_RuneChoice.prototype.constructor = Window_RuneChoice;

Window_RuneChoice.prototype.initialize = function(selected_window) {
	Window_Command.prototype.initialize.call(this, RuneSkills.RuneChoiceWindow[0], RuneSkills.RuneChoiceWindow[1]);
	this._selected = selected_window;
	this._actor = null;
	this.hide();

	this.deactivate();
	this.deselect();
};

Window_RuneChoice.prototype.setActor = function(actor) {
	this._actor = actor;
};

Window_RuneChoice.prototype.makeCommandList = function() {
	var MP = this.calculateTotalMp();
	if (!MP) {
		MP = 0;
	} else {
		if (RuneSkills.hideUnlearned && this._actor && this._selected.isSuccessfulCast() && !RuneSkills.isPastSkill(this._actor.actorId(), this._selected.getResultingSkill())) {
			MP = RuneSkills.UnknownMPValue;
		}
	}

	var execute = RuneSkills.ChoiceList[1].replace("%s", MP);
	this.addCommand(RuneSkills.ChoiceList[0], 'add', this._actor && this._selected._runes.length < this._actor.maxRunes());
	this.addCommand(execute, 'execute', this.canExecute());
	this.addCommand(RuneSkills.ChoiceList[2], 'delete');
	this.addCommand(RuneSkills.ChoiceList[3], 'clear');
	this.addCommand(RuneSkills.ChoiceList[4], 'cancel');
}

Window_RuneChoice.prototype.canExecute = function() {
	return (this._actor && this._actor._mp >= this.calculateTotalMp() &&
		this._selected._runes.length >= this._actor.minRunes() &&
		(RuneSkills.AllowFailure || this._selected.skillIsMatch())) || 
		(RuneSkills.AllowFailure && this.calculateTotalMp() == RuneSkills.UnknownMPValue);
};

Window_RuneChoice.prototype.calculateTotalMp = function() {

	if (!this._actor) {return}
	if (!this._selected._runes.length) {return 0}

	var MP = 0;
	if (RuneSkills.MPFormula === +RuneSkills.MPFormula) { //checks if integer
		return RuneSkills.MPFormula;
	} else if (RuneSkills.MPFormula == "total") {
		for (var i = 0; i < this._selected._runes.length; i++) {
			MP += this._selected._runes[i];
		}
	} else if (RuneSkills.MPFormula == "round") {
		for (var i = 0; i < this._selected._runes.length; i++) {
			MP += this._selected._runes[i];
		}
		MP /= this._selected._runes.length;
	} else if (RuneSkills.MPFormula == "result") {
		if (this._selected.skillIsMatch()) {
			var skill = this._selected.getResultingSkill();
			if ($dataSkills[skill]) {MP += this._actor.mcr * $dataSkills[skill].mpCost}
		} else {
			MP = RuneSkills.UnknownMPValue;
		}
	} else {
		throw new Error('MP formula not defined, or defined incorrectly.');
	}

	return MP;
};

Window_RuneChoice.prototype.open = function() {
	this.show();
	Window_Base.prototype.open.call(this);
}

//=============================================================================
// Scene_Battle modifications
//=============================================================================

var runeSkills_Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
	runeSkills_Scene_Battle_createAllWindows.call(this);
	this.createRuneWindows();
};

var runeSkills_Scene_Battle_anyInputActive = Scene_Battle.prototype.isAnyInputWindowActive;
Scene_Battle.prototype.isAnyInputWindowActive = function() {
	return runeSkills_Scene_Battle_anyInputActive.call(this) || this._runeList.active || this._runeChoice.active;
};

Scene_Battle.prototype.createRuneWindows = function() {
	this._selectedRune = new Window_RuneSelected();
	this.addWindow(this._selectedRune);

	this._runeResult = new Window_RuneResult(this._selectedRune);
	this.addWindow(this._runeResult);

	this._runeList = new Window_RuneList();
	this._runeList.setHandler('ok',     this.onRuneOk.bind(this));
	this._runeList.setHandler('cancel', this.onRuneCancel.bind(this));
	if (RuneSkills.ShowHelpWindow) this._runeList.setHelpWindow(this._helpWindow);
	this.addWindow(this._runeList);
	
	this._runeChoice = new Window_RuneChoice(this._selectedRune);
	this._runeChoice.setHandler('add',     this.onRuneAdd.bind(this));
	this._runeChoice.setHandler('execute', this.onRuneExecute.bind(this));
	this._runeChoice.setHandler('delete',  this.onRuneDelete.bind(this));
	this._runeChoice.setHandler('clear',   this.onRuneClear.bind(this));
	this._runeChoice.setHandler('cancel',  this.onRuneChoiceCancel.bind(this));
	this.addWindow(this._runeChoice);
};

var runeSkills_Scene_Battle_commandSkill = Scene_Battle.prototype.commandSkill;
Scene_Battle.prototype.commandSkill = function() {
	if (this._actorCommandWindow.currentExt() == RuneSkills.SkillType) {
		var actor = BattleManager.actor();
		this._runeList.setActor(actor);
		this._runeList.setStypeId(this._actorCommandWindow.currentExt());
		this._runeList.refresh();
		this._runeList.show();
		this._runeList.activate();

		this._runeChoice.setActor(actor);
		this._runeResult.setActor(actor);
		if (RuneSkills.Persist) {
			this._runeChoice.refresh();
			this._runeChoice.show();
			this._runeResult.refresh();
			this._runeResult.show();
		}

		this._selectedRune._runes = [];
		this._selectedRune.refresh();
		this._selectedRune.show();
	} else {runeSkills_Scene_Battle_commandSkill.call(this)}
};

Game_BattlerBase.prototype.paySkillCost = function(skill) {
	if (this._combine_cost) {
		this._mp -= this._combine_cost;
		combine_cost = 0;
	} else {
		this._mp -= this.skillMpCost(skill);
		this._tp -= this.skillTpCost(skill);
	}
};

Scene_Battle.prototype.onRuneOk = function() {
	this._runeList.deactivate();

	this._runeChoice.refresh();
	if (!RuneSkills.Persist) {
		this._runeChoice.open();
		this._runeResult.refresh();
		this._runeResult.show();
	}
	this._runeChoice.activate();
	this._runeChoice.select(0);
};

Scene_Battle.prototype.onRuneCancel = function() {
	if (this._runeChoice.isOpenAndActive()) {
		this.onRuneChoiceCancel();
		return;
	}

	this._selectedRune._runes = [];
	this._runeList.refresh();
	this.hideRuneRelatedThings();
	this._actorCommandWindow.activate();
};

Scene_Battle.prototype.onRuneAdd = function() {
	var skill = this._runeList.item();
	this._selectedRune.addSkill(skill.id);
	this._runeChoice.refresh();
	this._runeResult.refresh();

	if (RuneSkills.BackToListAfterAdd) {
		this._runeChoice.deactivate();
		this._runeChoice.deselect();
		if (!RuneSkills.Persist) {
			this._runeChoice.close();
			this._runeResult.hide();
		}

		this._runeList.refresh();
		this._runeList.activate();
	} else {
		this._runeChoice.activate();
		this._runeChoice.select(0);
	}
};

Scene_Battle.prototype.onRuneExecute = function() {
	var skill = this._selectedRune.getResultingSkill(); //gets skill ID
	var action = BattleManager.inputtingAction();
	
	if (Imported.YEP_X_LimitedSkillUses) {
		this._selectedRune._runes.forEach(runeID => {
			var skill = $dataSkills[runeID];
			if (BattleManager.actor().isSkillLimitedUse(skill)) {
				BattleManager.actor().paySkillLimitedUseCost(skill.id);
			}
		});
	}

	action.setSkill(skill);
	BattleManager.actor().setLastBattleSkill(skill);
	this._tempRunes = this._selectedRune._runes;
	this.hideRuneRelatedThings();
	BattleManager.actor()._combine_cost = this._runeChoice.calculateTotalMp();
	this.onSelectAction();
};

Scene_Battle.prototype.hideRuneRelatedThings = function() {
	this._selectedRune._runes = [];
	this._selectedRune.refresh();
	this._selectedRune.hide();
	this._runeResult.hide();

	this._runeChoice.hide();
	this._runeChoice.deactivate();
	this._runeChoice.deselect();
	this._runeList.hide();
	this._runeList.deactivate();
};

Scene_Battle.prototype.onRuneClear = function() {
	this._selectedRune._runes = [];
	this._selectedRune.refresh();
	if (!RuneSkills.Persist) {
		this._runeChoice.close();
		this._runeResult.hide();
	} else {
		this._runeChoice.refresh();
		this._runeResult.refresh();
	}
	this._runeChoice.deactivate();
	this._runeChoice.deselect();
	this._runeList.activate();
};

Scene_Battle.prototype.onRuneDelete = function() {
	this._selectedRune._runes.pop();
	this._selectedRune.refresh();

	this._runeResult.refresh();
	this._runeChoice.refresh();
	this._runeChoice.activate();
};

Scene_Battle.prototype.onRuneChoiceCancel = function() {
	if (!RuneSkills.Persist) {
		this._runeChoice.close();
		this._runeResult.hide();
	} else {
		this._runeChoice.refresh();
		this._runeResult.refresh();
	}
	this._runeChoice.deactivate();
	this._runeChoice.deselect();
	this._runeList.activate();
};

var runeSkills_Scene_Battle_onEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
Scene_Battle.prototype.onEnemyCancel = function() {
	if (this._actorCommandWindow.currentExt() == RuneSkills.SkillType) {
		this._enemyWindow.hide();
		this._selectedRune._runes = this._tempRunes;
		this._selectedRune.refresh();
		this._selectedRune.show();
		this._runeResult.show();

		this._runeList.show();
		this._runeChoice.show();
		this._runeChoice.activate();
		this._runeChoice.select(0);
	} else {runeSkills_Scene_Battle_onEnemyCancel.call(this)}
};

var runeSkills_Scene_Battle_onActorCancel = Scene_Battle.prototype.onActorCancel;
Scene_Battle.prototype.onActorCancel = function() {
	if (this._actorCommandWindow.currentExt() == RuneSkills.SkillType) {
		this._actorWindow.hide();
		this._selectedRune._runes = this._tempRunes;
		this._selectedRune.refresh();
		this._selectedRune.show();
		this._runeResult.show();

		this._runeList.show();
		this._runeChoice.show();
		this._runeChoice.activate();
		this._runeChoice.select(0);
	} else {runeSkills_Scene_Battle_onActorCancel.call(this)}
};

var runeSkills_Game_Actor_performAction = Game_Actor.prototype.performAction;
Game_Actor.prototype.performAction = function(action) {
	if (action._subjectActorId > 0) {
		if (RuneSkills.learnAfterCast && action.isSkill() && !this.isLearnedSkill(action.item().id) && $dataSkills[action.item().id].meta.runes) {
			this.learnSkill(action.item().id);
		}

		if (RuneSkills.hideUnlearned) RuneSkills.rememberSkill(this.actorId(), action.item().id);
	}

	runeSkills_Game_Actor_performAction.call(this, action);
};

var runeSkills_BattleManager_processVictory = BattleManager.processVictory;
BattleManager.processVictory = function() {
	$gameParty.removeTemporaryBattleSkills();
	runeSkills_BattleManager_processVictory.call(this);
};

Game_Party.prototype.removeTemporaryBattleSkills = function() {
	this.members().forEach(function(actor) {
		var shouldUnlearn = [];
		actor.skills().forEach(function(skill) {
			if ($dataSkills[skill.id].meta["remove after battle"]) shouldUnlearn.push(skill.id);
		});

		for (var i = 0; i < shouldUnlearn.length; i++) actor.forgetSkill(shouldUnlearn[i]);
	});
};

var runeSkills_DataManager_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
	contents = runeSkills_DataManager_makeSaveContents.call(this);
	contents.runeSkillsMemory = RuneSkills.memory;
	return contents;
};

var runeSkills_DataManager_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
	runeSkills_DataManager_extractSaveContents.call(this, contents);
	RuneSkills.memory = contents.runeSkillsMemory;
};