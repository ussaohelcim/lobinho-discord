# lobinho
Remake do jogo "Werewolf for Telegram" para o Discord, utilizando NodeJS e o Discord.js.

## Este jogo, atualmente, não tem suporte para partidas multiplas e nem servidores multiplos, e provavelmente não terá

# Como usar

**Precisa do [Node.js](https://www.nodejs.org) e do Discord.js.**

Baixe o repositorio:
```
git clone https://github.com/ussaohelcim/lobinho.git
```

Crie uma nova aplicação e bot no Discord:

https://discord.com/developers/applications/

Baixe o node.js:

https://www.nodejs.org

Instale o Discord.js utilizando o npm:

```
npm install discord.js
```

Para criar um novo projeto do Nodejs:

```
npm init
```

Modifique o arquivo ``config.json``

```json
{
    "TOKEN":"token do seu bot",
    "CHANNEL":"id do canal para enviar mensagem",
    "GUILDA":"id da guilda",
    "MENSAGENS":["Mensagem"]
}
```

Para iniciar o bot:
```python
node .
#lobinho ligado, auuuuuuuu --output
```

Vá até o canal que o bot está e digite:
```
#help
```
# Estado do desenvolvimento

- [X] Loop dia, forca e noite
- [X] Lobby
- [X] Mudar duração dia, forca e noite 
- [X] Iniciar partida com jogadores no lobby
- [X] Sortear os cargos
- [X] Enviar ações dos jogadores
- [X] Receber ações dos jogadores
- [X] Enforcar jogadores
- [X] Matar jogadores
- [X] Investigar jogadores
- [X] Fim da partida
- [ ] Leaderboard

- Cargos
    - [X] Lobisomen
    - [X] Habitante
    - [X] Suicida
    - [X] Maçom
    - [ ] ~~Caçador~~
    - [X] Otario
    - [X] Clarividente
        - [X] Ver o homem da floresta como lobo
        - [X] Ver o cargo dos outros jogadores
    - [X] Assassino
    - [X] Homem da floresta