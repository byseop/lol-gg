export type GameData = {
  gameData: {
    version: string | undefined;
    champs: Champion[] | undefined;
    spells: SummonerSpell[] | undefined;
    runes: RunesReforged[] | undefined;
    items: ItemsData[] | undefined;
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
  image: ChampionImage;
  tags: Tag[];
  partype: string;
  stats: { [key: string]: number };
}

export interface ChampionImage {
  full: string;
  sprite: ChampionSprite;
  group: Group;
  x: number;
  y: number;
  w: number;
  h: number;
}

export enum Group {
  Champion = 'champion'
}

export enum ChampionSprite {
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

export interface Items {
  type:    string;
  version: string;
  basic:   Basic;
  data:    { [key: string]: ItemsData };
  groups:  ItemGroup[];
  tree:    Tree[];
}

export interface Basic {
  name:             string;
  rune:             Rune;
  gold:             Gold;
  group:            string;
  description:      string;
  colloq:           string;
  plaintext:        string;
  consumed:         boolean;
  stacks:           number;
  depth:            number;
  consumeOnFull:    boolean;
  from:             any[];
  into:             any[];
  specialRecipe:    number;
  inStore:          boolean;
  hideFromAll:      boolean;
  requiredChampion: string;
  requiredAlly:     string;
  stats:            { [key: string]: number };
  tags:             any[];
  maps:             { [key: string]: boolean };
}

export interface Gold {
  base:        number;
  total:       number;
  sell:        number;
  purchasable: boolean;
}

export interface Rune {
  isrune: boolean;
  tier:   number;
  type:   string;
}

export interface ItemsData {
  name:              string;
  description:       string;
  colloq:            string;
  plaintext:         string;
  into?:             string[];
  image:             ItemImage;
  gold:              Gold;
  tags:              string[];
  maps:              { [key: string]: boolean };
  stats:             { [key: string]: number };
  inStore?:          boolean;
  from?:             string[];
  effect?:           { [key: string]: string };
  depth?:            number;
  stacks?:           number;
  consumed?:         boolean;
  hideFromAll?:      boolean;
  consumeOnFull?:    boolean;
  specialRecipe?:    number;
  requiredChampion?: string;
  requiredAlly?:     RequiredAlly;
}

export interface ItemImage {
  full:   string;
  sprite: ItemSprite;
  group:  string;
  x:      number;
  y:      number;
  w:      number;
  h:      number;
}

export enum ItemSprite {
  Item0PNG = "item0.png",
  Item1PNG = "item1.png",
  Item2PNG = "item2.png",
}

export enum RequiredAlly {
  Ornn = "Ornn",
}

export interface ItemGroup {
  id:              string;
  MaxGroupOwnable: string;
}

export interface Tree {
  header: string;
  tags:   string[];
}
