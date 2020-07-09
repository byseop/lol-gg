export type GameData = {
  gameData: {
    version: string | undefined;
    champs: Champion[] | undefined;
    spells: SummonerSpell[] | undefined;
    runes: RunesReforged[] | undefined;
  }
}

export interface Champions {
  data: { [key: string]: Champion };
}

export interface Champion {
  version: string;
  id: string;
  key: string;
  name: string;
  title: string;
  blurb: string;
  info: Info;
  image: Image;
  tags: Tag[];
  partype: string;
  stats: { [key: string]: number };
}

export interface Image {
  full: string;
  sprite: Sprite;
  group: Group;
  x: number;
  y: number;
  w: number;
  h: number;
}

export enum Group {
  Champion = 'champion'
}

export enum Sprite {
  Champion0PNG = 'champion0.png',
  Champion1PNG = 'champion1.png',
  Champion2PNG = 'champion2.png',
  Champion3PNG = 'champion3.png',
  Champion4PNG = 'champion4.png'
}

export interface Info {
  attack: number;
  defense: number;
  magic: number;
  difficulty: number;
}

export enum Tag {
  Assassin = 'Assassin',
  Fighter = 'Fighter',
  Mage = 'Mage',
  Marksman = 'Marksman',
  Support = 'Support',
  Tank = 'Tank'
}



export interface SummonerSpellTypes {
  type:    string;
  version: string;
  data:    { [key: string]: SummonerSpell };
}

export interface SummonerSpell {
  id:            string;
  name:          string;
  description:   string;
  tooltip:       string;
  maxrank:       number;
  cooldown:      number[];
  cooldownBurn:  string;
  cost:          number[];
  costBurn:      string;
  datavalues:    Datavalues;
  effect:        Array<number[] | null>;
  effectBurn:    Array<null | string>;
  vars:          Var[];
  key:           string;
  summonerLevel: number;
  modes:         string[];
  costType:      CostType;
  maxammo:       string;
  range:         number[];
  rangeBurn:     string;
  image:         SummonerSpellImage;
  resource:      Resource;
}

export enum CostType {
  S = "s",
  SICooldown = "s %i:cooldown%",
}

export interface Datavalues {
}

export interface SummonerSpellImage {
  full:   string;
  sprite: string;
  group:  string;
  x:      number;
  y:      number;
  w:      number;
  h:      number;
}

export enum Resource {
  CooldownSICooldown = "{{ cooldown }}s %i:cooldown%",
  ICooldownModifiedcooldownS = "%i:cooldown% {{ modifiedcooldown }}s",
}

export interface Var {
  link:  string;
  coeff: number[] | number;
  key:   string;
}

export interface RunesReforged {
  id:    number;
  key:   string;
  icon:  string;
  name:  string;
  slots: Slot[];
}

export interface Slot {
  runes: Rune[];
}

export interface Rune {
  id:        number;
  key:       string;
  icon:      string;
  name:      string;
  shortDesc: string;
  longDesc:  string;
}

