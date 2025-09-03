import { buildApp } from './app.js';
import { Personagem } from './models/Personagem.js';
import { Medos } from './enuns/Medos.js';
import { Atributos } from './enuns/Atributos.js';

const app = buildApp();

console.log('=== TESTES DO PERSONAGEM ===\n');

const personagemTeste = new Personagem({
  jogador: 'João',
  nome: 'Aragorn',
  tipoClasse: 'Guerreiro',
  origem: 'Gondor',
  nivel: 5,
  manaMaxima: 50,
  manaAtual: 50,
  vidaAtual: 100,
  vidaMaxima: 100,
  sanidadeMaxima: 80,
  sanidadeAtual: 80,
  medo: [Medos.NICTOFOBIA, Medos.ARACNOFOBIA],
  atributoPrincipal: Atributos.FORCA,
  atributoSecundario: Atributos.CONSTITUTION,
  forca: 18,
  destreza: 14,
  constituicao: 16,
  inteligencia: 12,
  sabedoria: 13,
  carisma: 15,
  armadura: 5,
});

console.log('1. INFORMAÇÕES BÁSICAS DO PERSONAGEM:');
console.log(`Nome: ${personagemTeste.nome}`);
console.log(`Jogador: ${personagemTeste.jogador}`);
console.log(`Classe: ${personagemTeste.tipoClasse}`);
console.log(`Nível: ${personagemTeste.nivel}`);
console.log(`Armadura: ${personagemTeste.armadura}`);
console.log(`Medos: ${personagemTeste.medo.join(', ')}`);

console.log('\n2. STATUS INICIAL:');
console.log(personagemTeste.getStatusInfo());

console.log('\n3. TESTE DE DANO FÍSICO:');
console.log('Recebendo 10 de dano físico (armadura 5):');
const danoFisico = personagemTeste.receberDanoFisico(10);
console.log(`Dano efetivo: ${danoFisico}`);
console.log(`Vida atual: ${personagemTeste.vidaAtual}`);
console.log('Status após dano:', personagemTeste.getStatusInfo());

console.log('\n4. TESTE DE DANO MENTAL SEM MEDO ESPECÍFICO:');
console.log('Recebendo 15 de dano mental (sem medo específico):');
const danoMental1 = personagemTeste.receberDanoMental(15);
console.log(`Dano mental: ${danoMental1}`);
console.log(`Sanidade atual: ${personagemTeste.sanidadeAtual}`);

console.log('\n5. TESTE DE DANO MENTAL COM MEDO ESPECÍFICO:');
console.log('Recebendo 10 de dano mental com NICTOFOBIA (dobra o dano):');
const danoMental2 = personagemTeste.receberDanoMental(10, Medos.NICTOFOBIA);
console.log(`Dano mental dobrado: ${danoMental2}`);
console.log(`Sanidade atual: ${personagemTeste.sanidadeAtual}`);

console.log('\n6. TESTE DE VERIFICAÇÃO DE MEDOS:');
console.log(`Tem medo de aracnofobia: ${personagemTeste.temMedo(Medos.ARACNOFOBIA)}`);
console.log(`Tem medo de acrofobia: ${personagemTeste.temMedo(Medos.ACROFOBIA)}`);

console.log('\n7. TESTE DE USO DE MANA:');
console.log(`Mana atual antes: ${personagemTeste.manaAtual}`);
const gastouMana = personagemTeste.gastarMana(20);
console.log(`Conseguiu gastar 20 de mana: ${gastouMana}`);
console.log(`Mana atual depois: ${personagemTeste.manaAtual}`);

console.log('\n8. TESTE DE HABILIDADES:');
console.log(`Pode usar habilidade que custa 40 de mana: ${personagemTeste.podeUsarHabilidade(40)}`);
console.log(`Pode usar habilidade que custa 25 de mana: ${personagemTeste.podeUsarHabilidade(25)}`);

console.log('\n9. TESTE DE CURA:');
console.log('Curando 30 pontos de vida:');
personagemTeste.curarVida(30);
console.log(`Vida após cura: ${personagemTeste.vidaAtual}`);
console.log('Recuperando 10 pontos de mana:');
personagemTeste.curarMana(10);
console.log(`Mana após recuperação: ${personagemTeste.manaAtual}`);

console.log('\n10. STATUS FINAL:');
console.log(personagemTeste.getStatusInfo());

console.log('\n11. TESTE DE ESTADO CRÍTICO:');
console.log('Causando dano massivo para testar estados críticos...');
personagemTeste.receberDanoFisico(85);
personagemTeste.receberDanoMental(35);
console.log('\nStatus crítico:');
console.log(personagemTeste.getStatusInfo());

console.log('\n=== FIM DOS TESTES ===\n');

app.listen({ port: 5000 }).then(() => {
  console.log(`Server running at http://localhost:5000`);
});
