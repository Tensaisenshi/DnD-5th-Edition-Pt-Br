// DND5E-PTBR
// @author Caua539
// @version 0.88.1
import { DND5E } from "../../systems/dnd5e/module/config.js";
import { ActorSheet5eCharacter as Actor} from "../../systems/dnd5e/module/actor/sheets/character.js";
import { ActorSheet5eNPC as NPC} from "../../systems/dnd5e/module/actor/sheets/npc.js";
import { ItemSheet5e as Item} from "../../systems/dnd5e/module/item/sheet.js";

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
			"minute": "Minuto",
			"hour": "Hora",
			"day": "Dia",
			"special": "Especial",
			"legendary": "Ação Lendária",
			"lair": "Ação de Covil"
		};
		DND5E.characterFlags = {
			"powerfulBuild": {
			  name: "Forma Poderosa",
			  hint: "Provê capacidade de carga superior.",
			  section: "Traços Raciais",
			  type: Boolean
			},
			"savageAttacks": {
			  name: "Ataques Selvagens",
			  hint: "Adiciona um dado de arma extra em acertos críticos.",
			  section: "Traços Raciais",
			  type: Boolean
			},
			"elvenAccuracy": {
			  name: "Precisão Élfica",
			  hint: "Role um d20 extra quando possui vantagem em teste de Des, Int, Sab ou Car.",
			  section: "Traços Raciais",
			  type: Boolean
			},
			"halflingLucky": {
			  name: "Pequenino: Sortudo",
			  hint: "Role novamente 1s quando fizer testes com d20.",
			  section: "Traços Raciais",
			  type: Boolean
			},
			"initiativeAdv": {
			  name: "Vantagem em Iniciativa",
			  hint: "De características do personagem ou itens mágicos.",
			  section: "Características",
			  type: Boolean
			},
			"initiativeAlert": {
			  name: "Talento: Alerta",
			  hint: "Provê +5 em Iniciativa.",
			  section: "Características",
			  type: Boolean
			},
			"jackOfAllTrades": {
			  name: "Pau pra Toda Obra",
			  hint: "Meia proficiência para Testes de Atributo em que você não for proficiente.",
			  section: "Características",
			  type: Boolean
			},
			"observantFeat": {
			  name: "Talento: Analítico",
			  hint: "Provê um bônus de +5 para a Percepção passiva e Investigação passiva.",
			  skills: ['prc','inv'],
			  section: "Características",
			  type: Boolean
			},
			"remarkableAthlete": {
			  name: "Atleta Extraordináro",
			  hint: "Adiciona meia Proficiência (arredondada para cima) em Iniciativa e Testes de Atributos físicos.",
			  abilities: ['str','dex','con'],
			  section: "Características",
			  type: Boolean
			},
			"weaponCriticalThreshold": {
			  name: "Extensão de Acerto Crítico",
			  hint: "Permite uma maior chance de acerto crítico; por exemplo Crítico Aprimorado ou Crítico Superior.",
			  section: "Características",
			  type: Number,
			  placeholder: 20
			},
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
