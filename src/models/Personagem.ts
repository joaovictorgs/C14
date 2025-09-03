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
  armadura: number;
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

  get armadura() {
    return this.props.armadura;
  }

  receberDanoFisico(dano: number): number {
    const danoEfetivo = Math.max(0, dano - this.props.armadura);
    this.props.vidaAtual = Math.max(0, this.props.vidaAtual - danoEfetivo);
    return danoEfetivo;
  }

  receberDanoMental(dano: number, tipoMedo?: Medos): number {
    let danoEfetivo = dano;

    if (tipoMedo && this.props.medo.includes(tipoMedo)) {
      danoEfetivo *= 3;
    }

    this.props.sanidadeAtual = Math.max(
      0,
      this.props.sanidadeAtual - danoEfetivo
    );
    return danoEfetivo;
  }

  curarVida(pontos: number): void {
    this.props.vidaAtual = Math.min(
      this.props.vidaMaxima,
      this.props.vidaAtual + pontos
    );
  }

  curarMana(pontos: number): void {
    this.props.manaAtual = Math.min(
      this.props.manaMaxima,
      this.props.manaAtual + pontos
    );
  }

  recuperarSanidade(pontos: number): void {
    this.props.sanidadeAtual = Math.min(
      this.props.sanidadeMaxima,
      this.props.sanidadeAtual + pontos
    );
  }

  estaMorto(): boolean {
    return this.props.vidaAtual <= 0;
  }

  estaInsano(): boolean {
    return this.props.sanidadeAtual <= 0;
  }

  temMedo(tipoMedo: Medos): boolean {
    return this.props.medo.includes(tipoMedo);
  }

  gastarMana(pontos: number): boolean {
    if (this.props.manaAtual >= pontos) {
      this.props.manaAtual -= pontos;
      return true;
    }
    return false;
  }

  podeUsarHabilidade(custoMana: number): boolean {
    return (
      this.props.manaAtual >= custoMana &&
      !this.estaMorto() &&
      !this.estaInsano()
    );
  }

  getStatusInfo(): {
    vidaPercentual: number;
    manaPercentual: number;
    sanidadePercentual: number;
    estadoFisico: string;
    estadoMental: string;
  } {
    const vidaPercentual = (this.props.vidaAtual / this.props.vidaMaxima) * 100;
    const manaPercentual = (this.props.manaAtual / this.props.manaMaxima) * 100;
    const sanidadePercentual =
      (this.props.sanidadeAtual / this.props.sanidadeMaxima) * 100;

    let estadoFisico = 'Saudável';
    if (this.estaMorto()) {
      estadoFisico = 'Morto';
    } else if (vidaPercentual <= 10) {
      estadoFisico = 'Agonizante';
    } else if (vidaPercentual <= 25) {
      estadoFisico = 'Gravemente Ferido';
    } else if (vidaPercentual <= 50) {
      estadoFisico = 'Ferido';
    } else if (vidaPercentual <= 75) {
      estadoFisico = 'Levemente Ferido';
    }

    let estadoMental = 'Estável';
    if (this.estaInsano()) {
      estadoMental = 'Insano';
    } else if (sanidadePercentual <= 10) {
      estadoMental = 'Psicótico';
    } else if (sanidadePercentual <= 25) {
      estadoMental = 'Perturbado';
    } else if (sanidadePercentual <= 50) {
      estadoMental = 'Abalado';
    } else if (sanidadePercentual <= 75) {
      estadoMental = 'Nervoso';
    }

    return {
      vidaPercentual,
      manaPercentual,
      sanidadePercentual,
      estadoFisico,
      estadoMental,
    };
  }
}
