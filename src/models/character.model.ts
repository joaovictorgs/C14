import type { Atributes } from '../enuns/Atributes.js';
import type { Fears } from '../enuns/fears.js';

export interface CharacterProps {
  player: string;
  name: string;
  classType: string;
  origin: string;
  level: number;
  maxMana: number;
  currentMana: number;
  currentHp: number;
  maxHp: number;
  maxSanity: number;
  currentSanity: number;
  fear: Fears;
  AtributoPrincipal: Atributes;
  AtributoSecundario: Atributes;
  forca: number;
  destreza: number;
  constituicao: number;
  inteligencia: number;
  sabedoria: number;
  carisma: number;
}

export class Character {
  constructor(private props: CharacterProps) {}
  get player() {
    return this.props.player;
  }

  get name() {
    return this.props.name;
  }

  get classType() {
    return this.props.classType;
  }

  get origin() {
    return this.props.origin;
  }

  get level() {
    return this.props.level;
  }

  get maxMana() {
    return this.props.maxMana;
  }

  get currentMana() {
    return this.props.currentMana;
  }

  get currentHp() {
    return this.props.currentHp;
  }

  get maxHp() {
    return this.props.maxHp;
  }

  get maxSanity() {
    return this.props.maxSanity;
  }

  get currentSanity() {
    return this.props.currentSanity;
  }

  get fear() {
    return this.props.fear;
  }
}
