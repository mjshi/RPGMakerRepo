//=============================================================================
// MOG_BattleCry_A2Aaddon.js
//=============================================================================

var Imported = Imported || {};
Imported.MOG_BattleCry_A2Aaddon = true;

if (Imported.MOG_BattleCry) {

/*:
 * @plugindesc Separate voicefiles depending on who item is being used on
 * @author mjshi
 *
 * @help
 * ----------------------------------------------------------------------------
 *   Addon for MOG_BattleCry by mjshi
 *   Free for both commercial and non-commercial use, with credit.
 * ----------------------------------------------------------------------------
 *
 * > Is something broken? Go to http://mjshi.weebly.com/contact.html and I'll
 *   try my best to help you!
 *
 * > Plugin order should be:
 *   Yanfly scripts
 *   MOG BattleCry
 *   MOG BattleCry A2Aaddon
 *
 * > This addon provides compatibility edits for Yanfly Victory Aftermath
 *   as well as an added functionality of different voice files being played
 *   depending on who the item is being used on.
 * 
 */

	Moghunter.v_actortoactor_item = [];

//=============================================================================
// BEGIN CONFIGURATION
//=============================================================================
	
	// What's the largest actor ID that you have that will join the party?
	Moghunter.totalActors = 4;

	// -----------------------------------------------------------------------	
	// don't touch this, things will break if you do.
	// What I'm doing here is making a double array so you can call voices like [id1][id2]	
	for (var i = 0; i < Moghunter.totalActors + 1; i++) {
		Moghunter.v_actortoactor_item[i] = new Array(Moghunter.totalActors + 1);
	}
	// OK to start touching again :P
	// -----------------------------------------------------------------------	

	// -----------------------------------------------------------------------
	// ACTOR TO ACTOR- ITEM -- Soundfile played depends on person the item
	// is being used on. If no soundfile is specified, the normal
	// "Moghunter.v_actor_item" soundfile will be played.
	//
	// Moghunter.v_actortoactor_item[A][B] = {C:[D,D,D]}
	// Actor to actor soundfiles take priority over normal item soundfiles.
	//
	// A - Actor ID - 1
	// B - Target Actor ID
	// C - Item ID
	// D - Soundfiles
	// -----------------------------------------------------------------------
	// Examples of the v_actor_item (not actor to actor!)
	// -----------------------------------------------------------------------
 	// Moghunter.v_actor_item[1] = {
	// 	1:["P1_Action_01","P1_Action_02","P1_Action_03"],  // Potion
	//     3:["P1_Action_01","P1_Action_02","P1_Action_03"]}; // Full Potion
	// Moghunter.v_actor_item[2] = {1:["P2_Action_01","P2_Action_02","P2_Action_03"]};
	// -----------------------------------------------------------------------
	// Examples of actor to actor item use
	// -----------------------------------------------------------------------
	// Moghunter.v_actortoactor_item[1][1] = { //actor 1 using item on himself
	// 	1:["Recording1-1","Recording1-1A"], // Potion
	// 	3:["Recording1-1A"], // Full Potion
	// };
	// Moghunter.v_actortoactor_item[1][2] = { //actor 1 using item on actor 2
	// 	1:["Recording1-2"]
	// };
	// Moghunter.v_actortoactor_item[2][1] = { //actor 2 using item on actor
	// 	1:["Recording2-1"]
	// };

//=============================================================================
// END OF CONFIGURATION
//=============================================================================

//==================================
// ** Process Victory
//==================================

	if (Imported.YEP_VictoryAftermath) {
		BattleManager.processVictory = _alias_mog_bcry_processVictory;
		console.log(_alias_mog_bcry_processVictory);

		var _alias_Yanfly_VA_BattleManager_playVictoryMe = Yanfly.VA.BattleManager_playVictoryMe;
		BattleManager.playVictoryMe = function() {
		    var actor = this.randomActor();
		    if (actor) {SoundManager.selectVoice(actor._v_victory)};
		    _alias_Yanfly_VA_BattleManager_playVictoryMe.call(this);
		};
	}

//===============================
// ** play Voice Action
//===============================
	Game_Battler.prototype.playVoiceAction = function(action) {
	     var actionID = action.item().id;

		 if (this.isActor()) {
		 	
		 	 var v_targetID = action._targetIndex + 1;
			 if (action.isSkill() && Moghunter.v_actor_skill[this._actorId] && 
			     Moghunter.v_actor_skill[this._actorId][actionID]) {
	    		 SoundManager.selectVoice(Moghunter.v_actor_skill[this._actorId][actionID]);
				 return;
			 } 
			 else if (action.isItem() && Moghunter.v_actortoactor_item[this._actorId][v_targetID] && 
			 	Moghunter.v_actortoactor_item[this._actorId][v_targetID][actionID])
			 {
			 	SoundManager.selectVoice(Moghunter.v_actortoactor_item[this._actorId][v_targetID][actionID]);
			 	return;
			 }
			 else if (action.isItem() && Moghunter.v_actor_item[this._actorId] &&
			     Moghunter.v_actor_item[this._actorId][actionID]) {
				 SoundManager.selectVoice(Moghunter.v_actor_item[this._actorId][actionID]); 
				 return;
			 };

		 } else if (this.isEnemy()) {
			 if (Moghunter.v_enemy_skill[this._enemyId] && Moghunter.v_enemy_skill[this._enemyId][actionID]) {
	    		 SoundManager.selectVoice(Moghunter.v_enemy_skill[this._enemyId][actionID]);
				 return;
			 };		 
		 }

		SoundManager.selectVoice(this._v_default_action);
	};

};