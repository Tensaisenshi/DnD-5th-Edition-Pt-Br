// DND5E-PTBR
// @author Caua539
// @version 0.4.0
import { DND5E } from "../../systems/dnd5e/module/config.js";

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
		DND5E.weaponProficiencies = {
			"sim": "Armas Simples",
			"mar": "Armas Marciais"
		};
		DND5E.toolProficiencies = {
			"art": "Ferramentas de artesão",
			"disg": "Kit de disfarce",
			"forg": "Kit de falsificação",
			"game": "Kit de jogos",
			"herb": "Kit de herbalismo",
			"music": "Instrumento musical",
			"navg": "Ferramentas de navegador",
			"pois": "Kit de veneno",
			"thief": "Ferramentas de ladrão",
			"vehicle": "Veículos (terra ou água)"
		};
		DND5E.abilityActivationTypes = {
			"none": "DND5E.None",
			"action": "Ação",
			"bonus": "Ação Bônus",
			"reaction": "Reação",
			"minute": "Minuto",
			"hour": "Hora",
			"day": "Dia",
			"special": "Especial",
			"legendary": "Lendária",
			"lair": "Covil"
		};
		DND5E.actorSizes = {
			"tiny": "Minúsculo",
			"sm": "Pequeno",
			"med": "Médio",
			"lg": "Grande",
			"huge": "Enorme",
			"grg": "Gigantesco"
		};
		DND5E.proficiencyLevels = {
			0: "Não Proficiente",
			1: "Proficiente",
			0.5: "Pau pra Toda Obra",
			2: "Especialista"
		};
	
		DND5E.languages = {
			"common": "Comum",
			"aarakocra": "Aarakocra",
			"abyssal": "Abissal",
			"aquan": "Aquan",
			"auran": "Auran",
			"celestial": "Celestial",
			"deep": "Dialeto Obscuro",
			"draconic": "Dracônico",
			"druidic": "Druídico",
			"dwarvish": "Anão",
			"elvish": "Élfico",
			"giant": "Gigante",
			"gith": "Gith",
			"gnomish": "Gnômico",
			"goblin": "Goblin",
			"gnoll": "Gnoll",
			"halfling": "Pequenino",
			"ignan": "Ignan",
			"infernal": "Infernal",
			"orc": "Orc",
			"primordial": "Primordial",
			"sylvan": "Silvestre",
			"terran": "Terran",
			"cant": "Gíria de Ladrão",
			"undercommon": "Subcomum"
		};
	
		DND5E.characterFlags = {
			"weaponCriticalThreshold": {
			  name: "Extensão de Acerto Crítico com Arma",
			  hint: "Permite uma maior chance de acerto crítico; por exemplo Crítico Aprimorado ou Crítico Superior.",
			  section: "Características",
			  type: Number,
			  placeholder: 20
			},
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
			"initiativeAdv": {
			  name: "Vantagem em Iniciativa",
			  hint: "De características do personagem ou itens mágicos.",
			  section: "Características",
			  type: Boolean
			},
			"initiativeHalfProf": {
			  name: "Meia Proficiência em Iniciativa",
			  hint: "De \"Pau pra Toda Obra\" ou \"Atleta Extraordinário\".",
			  section: "Características",
			  type: Boolean
			},
			"initiativeAlert": {
			  name: "Talento Alerta",
			  hint: "Provê +5 em Iniciativa.",
			  section: "Características",
			  type: Boolean
			},
			"saveBonus": {
			  name: "Bônus de Salvaguarda",
			  hint: "Modificador bônus para todas as Salvaguardas (ex. +1).",
			  section: "Características",
			  type: Number,
			  placeholder: "+0"
			},
			"spellDCBonus": {
			  name: "Bônus em CD de Magia",
			  hint: "Modifica o CD de conjuração normal.",
			  section: "Características",
			  type: Number,
			  placeholder: "+0"
			}
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