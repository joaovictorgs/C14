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
});
