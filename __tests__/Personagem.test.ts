import { Personagem } from '../src/models/Personagem.js';
import type { PersonagemProps } from '../src/models/Personagem.js';
import { Medos } from '../src/enuns/Medos.js';
import { Atributos } from '../src/enuns/Atributos.js';

describe('Personagem', () => {
  let personagemProps: PersonagemProps;
  let personagem: Personagem;

  beforeEach(() => {
    personagemProps = {
      jogador: 'TestPlayer',
      nome: 'TestCharacter',
      tipoClasse: 'Guerreiro',
      origem: 'TestOrigin',
      nivel: 5,
      manaMaxima: 100,
      manaAtual: 80,
      vidaAtual: 90,
      vidaMaxima: 100,
      sanidadeMaxima: 80,
      sanidadeAtual: 70,
      medo: [Medos.NICTOFOBIA, Medos.ARACNOFOBIA],
      atributoPrincipal: Atributos.FORCA,
      atributoSecundario: Atributos.CONSTITUTION,
      forca: 16,
      destreza: 12,
      constituicao: 14,
      inteligencia: 10,
      sabedoria: 13,
      carisma: 11,
      armadura: 5,
    };
    personagem = new Personagem(personagemProps);
  });
  describe('receberDanoFisico', () => {
    test('should apply damage reduced by armor', () => {
      const danoEfetivo = personagem.receberDanoFisico(15);
      expect(danoEfetivo).toBe(10);
      expect(personagem.vidaAtual).toBe(80);
    });

    test('should not apply negative damage when armor is higher than damage', () => {
      const danoEfetivo = personagem.receberDanoFisico(3);
      expect(danoEfetivo).toBe(0);
      expect(personagem.vidaAtual).toBe(90);
    });

    test('should not reduce life below 0', () => {
      const danoEfetivo = personagem.receberDanoFisico(200);
      expect(danoEfetivo).toBe(195);
      expect(personagem.vidaAtual).toBe(0);
    });

    test('should handle zero damage', () => {
      const danoEfetivo = personagem.receberDanoFisico(0);
      expect(danoEfetivo).toBe(0);
      expect(personagem.vidaAtual).toBe(90);
    });
  });
  describe('receberDanoMental', () => {
    test('should apply mental damage normally without specific fear', () => {
      const danoEfetivo = personagem.receberDanoMental(20);
      expect(danoEfetivo).toBe(20);
      expect(personagem.sanidadeAtual).toBe(50);
    });

    test('should double damage when fear matches character fear', () => {
      const danoEfetivo = personagem.receberDanoMental(10, Medos.NICTOFOBIA);
      expect(danoEfetivo).toBe(20);
      expect(personagem.sanidadeAtual).toBe(50);
    });

    test('should apply normal damage when fear does not match character fears', () => {
      const danoEfetivo = personagem.receberDanoMental(15, Medos.ACROFOBIA);
      expect(danoEfetivo).toBe(15);
      expect(personagem.sanidadeAtual).toBe(55);
    });

    test('should not reduce sanity below 0', () => {
      const danoEfetivo = personagem.receberDanoMental(100);
      expect(danoEfetivo).toBe(100);
      expect(personagem.sanidadeAtual).toBe(0);
    });

    test('should handle zero mental damage', () => {
      const danoEfetivo = personagem.receberDanoMental(0);
      expect(danoEfetivo).toBe(0);
      expect(personagem.sanidadeAtual).toBe(70);
    });
  });
  describe('curarVida', () => {
    test('should heal life points', () => {
      personagem.receberDanoFisico(30);
      personagem.curarVida(20);
      expect(personagem.vidaAtual).toBe(85);
    });

    test('should not exceed maximum life', () => {
      personagem.curarVida(50);
      expect(personagem.vidaAtual).toBe(100);
    });

    test('should handle zero healing', () => {
      const vidaAntes = personagem.vidaAtual;
      personagem.curarVida(0);
      expect(personagem.vidaAtual).toBe(vidaAntes);
    });
  });
  describe('curarMana', () => {
    test('should restore mana points', () => {
      personagem.curarMana(15);
      expect(personagem.manaAtual).toBe(95);
    });

    test('should not exceed maximum mana', () => {
      personagem.curarMana(50);
      expect(personagem.manaAtual).toBe(100);
    });

    test('should handle zero mana restoration', () => {
      const manaAntes = personagem.manaAtual;
      personagem.curarMana(0);
      expect(personagem.manaAtual).toBe(manaAntes);
    });
  });
  describe('recuperarSanidade', () => {
    test('should restore sanity points', () => {
      personagem.recuperarSanidade(5);
      expect(personagem.sanidadeAtual).toBe(75);
    });

    test('should not exceed maximum sanity', () => {
      personagem.recuperarSanidade(50);
      expect(personagem.sanidadeAtual).toBe(80);
    });

    test('should handle zero sanity restoration', () => {
      const sanidadeAntes = personagem.sanidadeAtual;
      personagem.recuperarSanidade(0);
      expect(personagem.sanidadeAtual).toBe(sanidadeAntes);
    });
  });

  describe('estaMorto', () => {
    test('should return false when character has life', () => {
      expect(personagem.estaMorto()).toBe(false);
    });

    test('should return true when character has 0 life', () => {
      personagem.receberDanoFisico(200);
      expect(personagem.estaMorto()).toBe(true);
    });
  });

  describe('estaInsano', () => {
    test('should return false when character has sanity', () => {
      expect(personagem.estaInsano()).toBe(false);
    });

    test('should return true when character has 0 sanity', () => {
      personagem.receberDanoMental(100);
      expect(personagem.estaInsano()).toBe(true);
    });
  });
  describe('temMedo', () => {
    test('should return true for fears character has', () => {
      expect(personagem.temMedo(Medos.NICTOFOBIA)).toBe(true);
      expect(personagem.temMedo(Medos.ARACNOFOBIA)).toBe(true);
    });

    test('should return false for fears character does not have', () => {
      expect(personagem.temMedo(Medos.ACROFOBIA)).toBe(false);
      expect(personagem.temMedo(Medos.CLAUSTROFOBIA)).toBe(false);
    });
  });

  describe('gastarMana', () => {
    test('should spend mana and return true when enough mana available', () => {
      const resultado = personagem.gastarMana(30);
      expect(resultado).toBe(true);
      expect(personagem.manaAtual).toBe(50);
    });

    test('should not spend mana and return false when not enough mana', () => {
      const resultado = personagem.gastarMana(100);
      expect(resultado).toBe(false);
      expect(personagem.manaAtual).toBe(80);
    });

    test('should spend exact mana amount available', () => {
      const resultado = personagem.gastarMana(80);
      expect(resultado).toBe(true);
      expect(personagem.manaAtual).toBe(0);
    });

    test('should handle zero mana cost', () => {
      const resultado = personagem.gastarMana(0);
      expect(resultado).toBe(true);
      expect(personagem.manaAtual).toBe(80);
    });
  });

  describe('podeUsarHabilidade', () => {
    test('should return true when character has enough mana and is alive and sane', () => {
      expect(personagem.podeUsarHabilidade(50)).toBe(true);
    });

    test('should return false when not enough mana', () => {
      expect(personagem.podeUsarHabilidade(100)).toBe(false);
    });

    test('should return false when character is dead', () => {
      personagem.receberDanoFisico(200);
      expect(personagem.podeUsarHabilidade(10)).toBe(false);
    });

    test('should return false when character is insane', () => {
      personagem.receberDanoMental(100);
      expect(personagem.podeUsarHabilidade(10)).toBe(false);
    });

    test('should return false when character is both dead and insane', () => {
      personagem.receberDanoFisico(200);
      personagem.receberDanoMental(100);
      expect(personagem.podeUsarHabilidade(10)).toBe(false);
    });

    test('should handle zero mana cost', () => {
      expect(personagem.podeUsarHabilidade(0)).toBe(true);
    });
  });

  describe('getStatusInfo', () => {
    test('should return correct status info for healthy character', () => {
      const status = personagem.getStatusInfo();
      expect(status.vidaPercentual).toBe(90);
      expect(status.manaPercentual).toBe(80);
      expect(status.sanidadePercentual).toBe(87.5);
      expect(status.estadoFisico).toBe('Saudável');
      expect(status.estadoMental).toBe('Estável');
    });

    test('should return correct status for critically injured character', () => {
      personagem.receberDanoFisico(75);
      const status = personagem.getStatusInfo();
      expect(status.vidaPercentual).toBe(20);
      expect(status.estadoFisico).toBe('Gravemente Ferido');
    });

    test('should return correct status for agonizing character', () => {
      personagem.receberDanoFisico(85);
      const status = personagem.getStatusInfo();
      expect(status.vidaPercentual).toBe(10);
      expect(status.estadoFisico).toBe('Agonizante');
    });

    test('should return correct status for dead character', () => {
      personagem.receberDanoFisico(200);
      const status = personagem.getStatusInfo();
      expect(status.vidaPercentual).toBe(0);
      expect(status.estadoFisico).toBe('Morto');
    });

    test('should return correct status for mentally disturbed character', () => {
      personagem.receberDanoMental(50);
      const status = personagem.getStatusInfo();
      expect(status.sanidadePercentual).toBe(25);
      expect(status.estadoMental).toBe('Perturbado');
    });

    test('should return correct status for psychotic character', () => {
      personagem.receberDanoMental(62);
      const status = personagem.getStatusInfo();
      expect(status.sanidadePercentual).toBe(10);
      expect(status.estadoMental).toBe('Psicótico');
    });

    test('should return correct status for insane character', () => {
      personagem.receberDanoMental(100);
      const status = personagem.getStatusInfo();
      expect(status.sanidadePercentual).toBe(0);
      expect(status.estadoMental).toBe('Insano');
    });

    test('should return correct status for wounded character (26-50% health)', () => {
      personagem.receberDanoFisico(55);
      const status = personagem.getStatusInfo();
      expect(status.vidaPercentual).toBe(40);
      expect(status.estadoFisico).toBe('Ferido');
    });

    test('should return correct status for lightly wounded character (51-75% health)', () => {
      personagem.receberDanoFisico(35);
      const status = personagem.getStatusInfo();
      expect(status.vidaPercentual).toBe(60);
      expect(status.estadoFisico).toBe('Levemente Ferido');
    });

    test('should return correct status for shaken character (26-50% sanity)', () => {
      personagem.receberDanoMental(40);
      const status = personagem.getStatusInfo();
      expect(status.sanidadePercentual).toBe(37.5);
      expect(status.estadoMental).toBe('Abalado');
    });

    test('should return correct status for nervous character (51-75% sanity)', () => {
      personagem.receberDanoMental(20);
      const status = personagem.getStatusInfo();
      expect(status.sanidadePercentual).toBe(62.5);
      expect(status.estadoMental).toBe('Nervoso');
    });
  });
});
