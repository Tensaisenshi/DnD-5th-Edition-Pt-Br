// DND5E-PTBR
// @author Caua539
// @version 0.92.0
import {DND5E} from "../../systems/dnd5e/module/config.js";
import Actor from "../../systems/dnd5e/module/actor/sheets/character.js";
import NPC from "../../systems/dnd5e/module/actor/sheets/npc.js";
import Item from "../../systems/dnd5e/module/item/sheet.js";

//Translate non localized strings from the DND5E.CONFIG
Hooks.once('ready', function() {
	let lang = game.i18n.lang;
	if (lang === "pt-BR") {
		DND5E.armorProficiencies = {
			"lgt": "Armaduras Leves",
			"med": "Armaduras Médias",
			"hvy": "Armaduras Pesadas",
			"shl": "Escudos"
		};
		DND5E.abilityActivationTypes = {
			"none": "Nenhuma",
			"action": "Ação",
			"bonus": "Ação Bônus",
			"reaction": "Reação",
			"minute": "Minuto(s)",
			"hour": "Hora(s)",
			"day": "Dia(s)",
			"special": "Especial",
			"legendary": "Ação Lendária",
			"lair": "Ação de Covil"
		};
	}
	
});

Hooks.once('init', () => {

	if(typeof Babele !== 'undefined') {
		
		Babele.get().register({
			module: 'dnd5e_pt-BR',
			lang: 'pt-BR',
			dir: 'compendium'
		});

		Babele.get().registerConverters({
			"weight": (value) => { return parseInt(value) / 2 },
			"range": (range) => {
				if(range) {
					if(range.units === 'ft') {
						if(range.long) {
							range = mergeObject(range, { long: range.long * 0.3 });
						}
						return mergeObject(range, { value: range.value * 0.3 });
					}
					if(range.units === 'mi') {
						if(range.long) {
							range = mergeObject(range, { long: range.long * 1.5 });
						}
						return mergeObject(range, { value: range.value * 1.5 });
					}
					return range;
				}
			},
			"target": (target) => {
				if(target) {
					if(target.units === 'ft') {
						return mergeObject(target, { value: target.value * 0.3 });
					}
					return target;
				}
			}

		});
	}
});

export class ActorSheet5eCharacter extends Actor {
	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
			  classes: ["ptbr5e", "dnd5e", "sheet", "actor", "character"],
			  width: 800,
			  height: 800
		  });
	  }
}

export class ActorSheet5eNPC extends NPC {
	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
			  classes: ["ptbr5e", "dnd5e", "sheet", "actor", "npc"],
			  width: 700,
			  height: 700
		  });
	}
}

export class ItemSheet5e extends Item {
	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
		width: 600,
		height: 420,
		classes: ["ptbr5e", "dnd5e", "sheet", "item"],
		resizable: false,
		scrollY: [".tab.details"]
	  });
	}
}

Hooks.once('ready', function() {
	let lang = game.i18n.lang;
	if (lang === "pt-BR") {
		Actors.unregisterSheet("dnd5e", Actor);
		Actors.registerSheet('dnd5e', ActorSheet5eCharacter, {
			types: ['character'],
			makeDefault: true
		});

		Actors.unregisterSheet("dnd5e", NPC);
		Actors.registerSheet('dnd5e', ActorSheet5eNPC, {
			types: ['npc'],
			makeDefault: true
		});

		Items.unregisterSheet("dnd5e", Item);
		Items.registerSheet("dnd5e", ItemSheet5e);
	}
});
