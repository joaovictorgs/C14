# RPG API

Uma API de RPG construída em **TypeScript**, usando **Fastify** como framework web e **Zod** para validação de dados. Este projeto é ideal para gerenciar personagens, equipamentos, habilidades e missões de um jogo de RPG.

---

## Tecnologias

- [TypeScript](https://www.typescriptlang.org/)
- [Fastify](https://www.fastify.io/)
- [Zod](https://github.com/colinhacks/zod)
- Node.js

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/joaovictorgs/C14.git
cd C14
```

2. Instale as dependências

```bash
npm install
```

3. Compile o typescript

```bash
npm run build
```

4. Rode o servidor:

```bash
node dist
```

✅ Pronto! O Projeto está sendo executado!

## Resolução de conflito 

### 1º conflito dia 18/08

Durante o desenvolvimento, o readme.md foi alterado por outra pessoa enquanto outra pessoa também mexia no arquivo.

Esse conflito foi anunciado no vscode, e a sugestão de alteração foi selecionada, pra matér as alterações realizadas pelo usuário joaovictorgs.

Segue a primeira alteração: 

<img width="1542" height="293" alt="image" src="https://github.com/user-attachments/assets/731558ce-28a8-4ce0-a551-4186f1f0de3c" />

Segue a segunda alteração:

<img width="772" height="797" alt="image" src="https://github.com/user-attachments/assets/f6b16c66-e3d0-4700-b2ed-b127fd13a853" />

Foi optado por mantér a segunda alteração, uma vez que ela já incluia todas a informação inicial do outro commit
O conflito foi resolvido usando o fluxo de sugestão do vscode


### 2º conflito dia 02/09

Foi adicionado um multiplicador de dano mental de vezes 10 caso o personagem tomasse dano mental com um de seus medos, porém os testes não foram alterados juntos para acompanharem o valor,
<img width="1014" height="789" alt="image" src="https://github.com/user-attachments/assets/d15bde65-b13c-4d63-902a-06967b40822f" />

Após isso, foi-se analizado que a quantia de vezes 10 era muito absurda, logo foi-se optado apenas por um multiplicador de 3, e os testes foram atualizados, com os testes passando, o merge foi relizado
<img width="1125" height="718" alt="image" src="https://github.com/user-attachments/assets/b55d6aaf-f895-4dee-a4a2-3caeebf653cb" />
