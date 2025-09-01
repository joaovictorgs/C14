import type { Atributos } from '../enuns/Atributos.js';
import type { Medos } from '../enuns/Medos.js';

export interface PersonagemProps {
  jogador: string;
  nome: string;
  tipoClasse: string;
  origem: string;
  nivel: number;
  manaMaxima: number;
  manaAtual: number;
  vidaAtual: number;
  vidaMaxima: number;
  sanidadeMaxima: number;
  sanidadeAtual: number;
  medo: Medos[];
  atributoPrincipal: Atributos;
  atributoSecundario: Atributos;
  forca: number;
  destreza: number;
  constituicao: number;
  inteligencia: number;
  sabedoria: number;
  carisma: number;
}

export class Personagem {
  constructor(private props: PersonagemProps) {}
  get jogador() {
    return this.props.jogador;
  }

  get nome() {
    return this.props.nome;
  }

  get tipoClasse() {
    return this.props.tipoClasse;
  }

  get origem() {
    return this.props.origem;
  }

  get nivel() {
    return this.props.nivel;
  }

  get manaMaxima() {
    return this.props.manaMaxima;
  }

  get manaAtual() {
    return this.props.manaAtual;
  }

  get vidaAtual() {
    return this.props.vidaAtual;
  }

  get vidaMaxima() {
    return this.props.vidaMaxima;
  }

  get sanidadeMaxima() {
    return this.props.sanidadeMaxima;
  }

  get sanidadeAtual() {
    return this.props.sanidadeAtual;
  }
  get medo() {
    return this.props.medo;
  }

  get atributoPrincipal() {
    return this.props.atributoPrincipal;
  }
  get atributoSecundario() {
    return this.props.atributoSecundario;
  }
  get forca() {
    return this.props.forca;
  }
  get destreza() {
    return this.props.destreza;
  }
  get constituicao() {
    return this.props.constituicao;
  }
  get inteligencia() {
    return this.props.inteligencia;
  }
  get sabedoria() {
    return this.props.sabedoria;
  }
  get carisma() {
    return this.props.carisma;
  }
}
