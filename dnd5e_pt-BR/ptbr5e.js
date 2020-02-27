// PTBR5eSheet
// @author Caua539
// @version 0.2.0
import { DND5E } from "../../systems/dnd5e/module/config.js";
import { Dice5e } from "../../systems/dnd5e/module/dice.js";
import { Actor5e } from "../../systems/dnd5e/module/actor/entity.js";
import { ActorSheet5eCharacter } from "../../systems/dnd5e/module/actor/sheets/character.js";
import { ActorSheet5eNPC } from "../../systems/dnd5e/module/actor/sheets/npc.js";
import { Item5e } from "../../systems/dnd5e/module/item/entity.js";
import { AbilityUseDialog } from "../../systems/dnd5e/module/apps/ability-use-dialog.js";
import { AbilityTemplate } from "../../systems/dnd5e/module/pixi/ability-template.js";
import { ItemSheet5e } from "../../systems/dnd5e/module/item/sheet.js";

Hooks.once('init', () => loadTemplates([
	'modules/dnd5e_pt-BR/templates/actors/parts/actor-inventory.html',
	'modules/dnd5e_pt-BR/templates/actors/parts/actor-features.html',
	'modules/dnd5e_pt-BR/templates/actors/parts/actor-spellbook.html',
	'modules/dnd5e_pt-BR/templates/actors/parts/actor-traits.html',
	'modules/dnd5e_pt-BR/templates/items/parts/item-action.html',
	'modules/dnd5e_pt-BR/templates/items/parts/item-activation.html',
	'modules/dnd5e_pt-BR/templates/items/parts/item-description.html'
]));

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

export class PtBrSheet5eCharacter extends ActorSheet5eCharacter {
	get template() {
		if ( !game.user.isGM && this.actor.limited ) return "modules/dnd5e_pt-BR/templates/actors/limited-sheet.html";
		return "modules/dnd5e_pt-BR/templates/actors/character-sheet.html";
	}
	
	static get defaultOptions() {
	  return mergeObject(super.defaultOptions, {
			classes: ["ptbr5e", "dnd5e", "sheet", "actor", "character"],
			width: 800,
			height: 800
		});
	}
	
	async _render(force = false, options = {}) {
		this.saveScrollPos();
		await super._render(force, options);
		this.setScrollPos();
	}
	
	saveScrollPos() {
		if (this.form === null) return;
		const html = $(this.form);
		this.scrollPos = {
			top: html.scrollTop(),
			left: html.scrollLeft()
		}
	}
	
	setScrollPos() {
		if (this.form === null || this.scrollPos === undefined) return;
		const html = $(this.form);
		html.scrollTop(this.scrollPos.top);
		html.scrollLeft(this.scrollPos.left);
	}

	/**
   * Organize and classify Owned Items for Character sheets
   * @private
   */
  _prepareItems(data) {

    // Categorize items as inventory, spellbook, features, and classes
    const inventory = {
      weapon: { label: "Armas", items: [], dataset: {type: "weapon"} },
      equipment: { label: "Equipmento", items: [], dataset: {type: "equipment"} },
      consumable: { label: "Consumíveis", items: [], dataset: {type: "consumable"} },
      tool: { label: "Ferramentas", items: [], dataset: {type: "tool"} },
      backpack: { label: game.i18n.localize("DND5E.ItemContainerHeader"), items: [], dataset: {type: "backpack"} },
      loot: { label: "Tesouros", items: [], dataset: {type: "loot"} }
    };

    // Partition items by category
    let [items, spells, feats, classes] = data.items.reduce((arr, item) => {
      item.img = item.img || DEFAULT_TOKEN;
      item.isStack = item.data.quantity ? item.data.quantity > 1 : false;
      item.hasUses = item.data.uses && (item.data.uses.max > 0);
      item.isOnCooldown = item.data.recharge && !!item.data.recharge.value && (item.data.recharge.charged === false);
      item.isDepleted = item.isOnCooldown && (item.data.uses.per && (item.data.uses.value > 0));
      item.hasTarget = !!item.data.target && !(["none",""].includes(item.data.target.type));
      if ( item.type === "spell" ) arr[1].push(item);
      else if ( item.type === "feat" ) arr[2].push(item);
      else if ( item.type === "class" ) arr[3].push(item);
      else if ( Object.keys(inventory).includes(item.type ) ) arr[0].push(item);
      return arr;
    }, [[], [], [], []]);

    // Apply active item filters
    items = this._filterItems(items, this._filters.inventory);
    spells = this._filterItems(spells, this._filters.spellbook);
    feats = this._filterItems(feats, this._filters.features);

    // Organize Spellbook
    const spellbook = this._prepareSpellbook(data, spells);
    const nPrepared = spells.filter(s => {
      return (s.data.level > 0) && (s.data.preparation.mode === "prepared") && s.data.preparation.prepared;
    }).length;

    // Organize Inventory
    let totalWeight = 0;
    for ( let i of items ) {
      i.data.quantity = i.data.quantity || 0;
      i.data.weight = i.data.weight || 0;
      i.totalWeight = Math.round(i.data.quantity * i.data.weight * 10) / 10;
      inventory[i.type].items.push(i);
      totalWeight += i.totalWeight;
    }
    data.data.attributes.encumbrance = this._computeEncumbrance(totalWeight, data);

    // Organize Features
    const features = {
      classes: { label: "Níveis de Classe", items: [], hasActions: false, dataset: {type: "class"}, isClass: true },
      active: { label: "Ativo", items: [], hasActions: true, dataset: {type: "feat", "activation.type": "action"} },
      passive: { label: "Passivo", items: [], hasActions: false, dataset: {type: "feat"} }
    };
    for ( let f of feats ) {
      if ( f.data.activation.type ) features.active.items.push(f);
      else features.passive.items.push(f);
    }
    classes.sort((a, b) => b.levels - a.levels);
    features.classes.items = classes;

    // Assign and return
    data.inventory = Object.values(inventory);
    data.spellbook = spellbook;
    data.preparedSpells = nPrepared;
    data.features = Object.values(features);
  }

	activateListeners(html) {
		super.activateListeners(html);
		
		// Add Rollable CSS Class to Languages
		html.find('[for="data.traits.languages"]').addClass("rollable");
		
		// Send Languages to Chat onClick
		html.find('[for="data.traits.languages"]').click(event => {
			event.preventDefault();
			let langs = this.actor.data.data.traits.languages.value.map(l => DND5E.languages[l] || l).join(", ");
            let custom = this.actor.data.data.traits.languages.custom;
            if (!langs) {
                langs = custom
            } else if (custom) {
                langs += ", " + custom.replace(/;/g, ",");
            }
			let content = `
				<div class="dnd5e chat-card item-card" data-acor-id="${this.actor._id}">
					<header class="card-header flexrow">
						<img src="${this.actor.data.token.img}" title="" width="36" height="36" style="border: none;"/>
						<h3>Idiomas Conhecidos</h3>
					</header>
					<div class="card-content">${langs}</div>
				</div>
			`;
			
			// Send to Chat
			let rollWhisper = null;
			let rollBlind = false;
			let rollMode = game.settings.get("core", "rollMode");
			if (["gmroll", "blindroll"].includes(rollMode)) rollWhisper = ChatMessage.getWhisperIDs("GM");
			if (rollMode === "blindroll") rollBlind = true;
			ChatMessage.create({
				user: game.user._id,
				content: content,
				speaker: {
					actor: this.actor._id,
					token: this.actor.token,
					alias: this.actor.name
				},
				type: CONST.CHAT_MESSAGE_TYPES.OTHER
			});
		});
		
		// Roll a Death Save
		html.find('.deathsave').click(event => {
			event.preventDefault();
			// new Roll("1d20cs>=" + weight).roll().toMessage({user : game.user.id})
			let roll = new Roll("1d20").roll();
			let result = roll.total;
			let message = `
			<div class="dnd5e chat-card item-card">
				<header class="card-header flexrow">
					<h3 style="line-height: unset; margin: auto 0px;">${this.actor.name} rolou ${result} na sua Salvaguarda Contra a Morte.</h3>
				</header>
			</div>
			`;
			ChatMessage.create({
				user: game.user._id,
				speaker: {
					actor: this.actor._id,
					token: this.actor.token,
					alias: this.actor.name
				},
				content: message,
				type: CONST.CHAT_MESSAGE_TYPES.OTHER,
				sound: CONFIG.sounds.dice
			});
		});
		
		// Item Delete Confirmation
		html.find('.item-delete').off("click");
		html.find('.item-delete').click(event => {
			let li = $(event.currentTarget).parents('.item');
			let itemId = li.attr("data-item-id");
			let item = this.actor.getOwnedItem(itemId);
			new Dialog({
				title: `Excluindo ${item.data.name}`,
				content: `<p>Você tem certeza que deseja excluir ${item.data.name}?</p>`,
				buttons: {
					Yes: {
						icon: '<i class="fa fa-check"></i>',
						label: 'Sim',
						callback: dlg => {
							this.actor.deleteOwnedItem(itemId);
						}
					},
					cancel: {
						icon: '<i class="fas fa-times"></i>',
						label: 'Não'
					},
				},
				default: 'cancel'
			}).render(true);
		});
	}
}

export class PtBrSheet5eNPC extends ActorSheet5eNPC {
	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
			  classes: ["ptbr5e", "dnd5e", "sheet", "actor", "npc"],
			  width: 700,
			  height: 700
		  });
	}

	get template() {
		if ( !game.user.isGM && this.actor.limited ) return "modules/dnd5e_pt-BR/templates/actors/limited-sheet.html";
		return "modules/dnd5e_pt-BR/templates/actors/npc-sheet.html";
	}

	_prepareItems(data) {

		// Categorize Items as Features and Spells
		const features = {
		  weapons: { label: "Ataques", items: [] , hasActions: true, dataset: {type: "weapon", "weapon-type": "natural"} },
		  actions: { label: "Ações", items: [] , hasActions: true, dataset: {type: "feat", "activation.type": "action"} },
		  passive: { label: "Características", items: [], dataset: {type: "feat"} },
		  equipment: { label: "Inventário", items: [], dataset: {type: "loot"}}
		};
	
		// Start by classifying items into groups for rendering
		let [spells, other] = data.items.reduce((arr, item) => {
		  item.img = item.img || DEFAULT_TOKEN;
		  item.isStack = item.data.quantity ? item.data.quantity > 1 : false;
		  item.hasUses = item.data.uses && (item.data.uses.max > 0);
		  item.isOnCooldown = item.data.recharge && !!item.data.recharge.value && (item.data.recharge.charged === false);
		  item.isDepleted = item.isOnCooldown && (item.data.uses.per && (item.data.uses.value > 0));
		  item.hasTarget = !!item.data.target && !(["none",""].includes(item.data.target.type));
		  if ( item.type === "spell" ) arr[0].push(item);
		  else arr[1].push(item);
		  return arr;
		}, [[], []]);
	
		// Apply item filters
		spells = this._filterItems(spells, this._filters.spellbook);
		other = this._filterItems(other, this._filters.features);
	
		// Organize Spellbook
		const spellbook = this._prepareSpellbook(data, spells);
	
		// Organize Features
		for ( let item of other ) {
		  if ( item.type === "weapon" ) features.weapons.items.push(item);
		  else if ( item.type === "feat" ) {
			if ( item.data.activation.type ) features.actions.items.push(item);
			else features.passive.items.push(item);
		  }
		  else if (["equipment", "consumable", "tool", "loot"].includes(item.type)) {
			features.equipment.items.push(item);
		  }
		}
	
		// Assign and return
		data.features = Object.values(features);
		data.spellbook = spellbook;
	  }
}

export class PtBrItemSheet5e extends ItemSheet5e {
	constructor(...args) {
		super(...args);
	
		/**
		 * The tab being browsed
		 * @type {string}
		 */
		this._sheetTab = null;
	}

	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
		width: 600,
		height: 420,
		classes: ["ptbr5e", "dnd5e", "sheet", "item"],
		resizable: false,
		scrollY: [".tab.details"]
	  });
	}

	get template() {
		const path = "modules/dnd5e_pt-BR/templates/items/";
		return `${path}/${this.item.data.type}.html`;
	}

	_getItemStatus(item) {
		if ( item.type === "spell" ) return item.data.preparation.prepared ? "Preparada" : "Despreparada";
		else if ( ["weapon", "equipment"].includes(item.type) ) return item.data.equipped ? "Equipado" : "Não Equipado";
		else if ( item.type === "tool" ) return item.data.proficient ? "Proficiente" : "Não Proficiente";
	  }
}

Hooks.once('ready', function() {
	let lang = game.i18n.lang;
	if (lang === "pt-BR") {
		Actors.unregisterSheet("dnd5e", ActorSheet5eCharacter);
		Actors.registerSheet('dnd5e', PtBrSheet5eCharacter, {
			types: ['character'],
			makeDefault: true
		});

		Actors.unregisterSheet("dnd5e", ActorSheet5eNPC);
		Actors.registerSheet('dnd5e', PtBrSheet5eNPC, {
			types: ['npc'],
			makeDefault: true
		});

		Items.unregisterSheet("dnd5e", ItemSheet5e);
		Items.registerSheet("dnd5e", PtBrItemSheet5e);
	}
});