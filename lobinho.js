// #region Config + node stuff
const Discord = require('discord.js')
const bot = new Discord.Client();
const config = require("./config.json")

let canalPraEnviarMsgs = config.CHANNEL;
let botToken = config.TOKEN;
let guilda = config.GUILDA;

bot.login(botToken);

bot.on('message', msg => {
    if(msg.content.startsWith("#nick"))
    {
        MandarMSG(canalPraEnviarMsgs,GetNickname(msg.author))
        MandarMSG(canalPraEnviarMsgs,GetUsername(msg.author))
        MandarMSG(canalPraEnviarMsgs,GetId(msg.author))
        MandarMSG(canalPraEnviarMsgs,GetTag(msg.author))
    }
    if(msg.channel.type === "dm")
    {
        LerDM(msg.author,msg.content);
    }
    if(msg.content.startsWith("#testar")&&msg.author.tag == "1ds7#7925")
    {
        Testar();
    }
    if(msg.content.startsWith("#queroJogar"))
    {
        PedirEntrarLobby(msg.author);
    }

    if(msg.content.startsWith("#lobby"))
    {
        msg.channel.send(getLobby());
    }

    if(msg.content.startsWith("#duracaoDia=") && !jogoAcontecendo && ChecarSeEhHost(msg.author.id))
    {
        let duraDia = msg.content.replace("#duracaoDia=","")
        duracaoDia = Number(duraDia);
        MandarMSG(canalPraEnviarMsgs,`O dia agora vai ter: ${duracaoDia} segundos e a noite ${duracaoNoite} segundos.`);
    }
    if(msg.content.startsWith("#duracaoNoite=") && !jogoAcontecendo && ChecarSeEhHost(msg.author.id))
    {
        let duraNoite = msg.content.replace("#duracaoNoite=","")
        duracaoNoite = Number(duraNoite);
        MandarMSG(canalPraEnviarMsgs,`A noite agora vai ter: ${duracaoNoite} segundos e o dia ${duracaoDia} segundos.`);
    }

    if(msg.content.startsWith("#start")&& !jogoAcontecendo && lobby.length>0 && ChecarSeEhHost(msg.author.id) )
    {
        iniciarPartida()
    }
    else if(msg.content.startsWith("#start") && jogoAcontecendo)
    {
        msg.channel.send("Espere pela proxima partida")
    }
    else if(msg.content.startsWith("#start") && lobby.length == 0)
    {
        MandarMSG(canalPraEnviarMsgs,"Não tem ninguem no lobby")
    }
    else if(msg.content.startsWith("#start") && !ChecarSeEhHost(msg.author))
    {
        MandarMSG(canalPraEnviarMsgs,"Apenas o host pode iniciar a partida")
    }
})

bot.on('ready',function(){
    console.log("lobinho ligado, auuuuuuuu");
})

bot.on('guildMemberAdd',membro =>{
    MandarMSG(canalPraEnviarMsgs,"oh nao");
})
// #endregion

// #region Bot commands
function MandarDM(id,msg)
{
    console.log("Mandando DM para o id "+id);

    let usuario = bot.users.cache.get(id);
    usuario.send(msg);
}
function MandarMSG(idcanal,msg)
{
    let canal = bot.channels.cache.get(idcanal);
    canal.send(msg);
}
/**
 * 
 * @param {Discord.User} idUsuario id do usuario que mandou a mensagem no DM
 * @param {String} msg Conteudo da mensagem:message.content
 */
function LerDM(idUsuario,msg)
{
    switch (horario) {
        case "dia":
            switch (GetCargo(idUsuario)) {
                case "otario":
                    if(msg.startsWith(`#${habilidadades.INVESTIGAR}`))
                    {

                    }
                    break;
            
                case "clarividente":
                    if(msg.startsWith(`#${habilidadades.INVESTIGAR}`))
                    {

                    }
                    break;
            }
            break;
        case "noite":
            switch (GetCargo(idUsuario)) {
                case "lobo":
                    if(msg.startsWith(`#${habilidadades.MATAR}`))
                    {

                    }
                    break;
            
                case "assassino":
                    if(msg.startsWith(`#${habilidadades.MATAR}`))
                    {
                        
                    }
                    break;
            }
            break;
        case "forca":
            if(msg.startsWith(`#${habilidadades.ENFORCAR}`))
            {
                
            }
            break;
    }
    //console.log(idUsuario.username," enviou no DM: ",msg);
}
function PedirEntrarLobby(autorMsg)
{
    if(!jogoAcontecendo)
    {
        entrarLobby(autorMsg);
    }
    else
    {
        msg.channel.send("Existe uma partida em andamento, espere pela proxima partida para conseguir entrar.")
    }
}
// #endregion 

// #region partida

const cargos = [
    {cargo:"lobo",ajuda:"Você é um lobo, e tem a habilidade de matar alguem quando a noite chegar. Você ganha caso o jogo termine e não sobre nenhum não lobo"},

    {cargo:"habitante",ajuda:"Você é um habitante da vila. Você ganha caso o jogo termine e sobre algum habitante"},

    {cargo:"suicida",ajuda:"Você é um suicida. Você ganha caso você morra na forca"},

    {cargo:"maçom",ajuda:"Você é um maçom habitante da vila, porem com uma habilidade especial: você consegue saber quem tambem é maçom. Você ganha caso o jogo termine e sobre algum habitante"},

    {cargo:"caçador",ajuda:"Você é um habitante da vila, porem com uma habilidade especial: caso alguem te ataque você consegue escolher alguem pra matar. Você ganha caso o jogo termine e sobre algum habitante"},

    {cargo:"otario",ajuda:"Você é um clarividente habitante da vila, porem com uma habilidade especial: você consegue saber o cargo que as pessoas são. Você ganha caso o jogo termine e sobre algum habitante"},

    {cargo:"clarividente",ajuda:"Você é um clarividente habitante da vila, porem com uma habilidade especial: você consegue saber o cargo que as pessoas são. Você ganha caso o jogo termine e sobre algum habitante"},

    {cargo:"assassino",ajuda:"Você é um assassino, e tem a habilidade de matar alguem quando a noite chegar. Você ganha caso continue vivo até o fim da partida."},

    {cargo:"homem lobo",ajuda:"Você é um habitante da vila, porem como você passou toda sua vida na floresta o clarividente vai achar que você é um lobo. Você ganha caso o jogo termine e sobre algum habitante."},
];

let partida = [];//{player:usuario,cargo:"cargo"} 
let jogoAcontecendo = false;
let votos = [];//votos[index]++
let vivos = [];//vivos[index] = true/false
let horario = "";

function GetCargo(id)
{
    partida.forEach(i =>{
        if(i.player.id == id)
        {
            return i.cargo
        }
    })
    
}
// #endregion

// #region lobby
let lobby = [];//adicionar quem vai estar jogando
//lobby[i].username = 1ds7
//lobby[i].tag = 1ds7#2469
//lobby[i].id = 1818416834183618364864
let duracaoDia = 60 ;
let duracaoNoite = 30 ;
let duracaoForca = 40 ;

function ChecarSeEhHost(id)
{
    return id == lobby[0].id
}

function entrarLobby(usuario)
{
    if(lobby.length==0) MandarMSG(canalPraEnviarMsgs,usuario.username+", você é o host da partida.")

    lobby.push(usuario);

    MandarMSG(canalPraEnviarMsgs,`${usuario.username} entrou no lobby`)
    MandarMSG(canalPraEnviarMsgs,getLobby())
}
function getLobby()
{
    msg = "Atualmente, os seguintes jogadores estão no lobby: "
    lobby.forEach(jogador =>{
        msg+= jogador.tag+",";
    })
    msg = String(msg).substring(0,msg.length-1)
    //bot.channels.cache.get(canalPraEnviarMsgs).send(msg);
    return msg;
}
function limparLobby()
{
    lobby = [];
}
/**
 * Da os cargos, aleatoriamente, para os jogadores, manda os cargos para o DM e inicia a partida.
 */
function iniciarPartida()
{
    let quantidadeSolitarios = Math.floor(Math.random() * Math.floor(lobby.length/2))+1;
    //numero randomico entre 1 e quantidade de jogadores // 2 
    // ex: 8 jogadores, numero de solitarios entre 1 e 4

    //console.log("solitarios: "+quantidadeSolitarios)

    let loboSorteado = false

    let num;

    for (let index = 0; index < lobby.length; index++) {
        num = Math.floor(Math.random()*cargos.length) 

        partida.push({player:lobby[index],cargo:cargos[num].cargo,ajuda:cargos[num].ajuda});

        //partida.push({player:lobby[index],role:roles[num]})
        // array da partida esta no fim da regiao partida

        //MandarDM(lobby[index].id,cargos[index].ajuda);

    }

    partida.forEach(a =>{
        MandarDM(a.player.id,a.ajuda);
    })


    //bot.setTimeout(abrirVotacao,10000)

    jogoAcontecendo = true
    limparLobby();
    //Esperar(30000,"noite");
    ficarDeNoite();
}
// #endregion

// #region lobinho
let marcadosPraMorrer = [];

const habilidadades = {
    INVESTIGAR:"investigar", MATAR:"matar", ENFORCAR:"enforcar"
}

function NovaRodada()
{

}
function enforcar(quem)
{

}
function matar(quem)
{

}
/**
 * Envia as habilidadades e os possiveis alvos para o DM do jogador.
 * @param {String} habilidade [A habilidade que o jogador vai poder usar]
 * @param {Discord.User} eleMesmo [Id do usuario]
 */
function SelecionarAlvo(habilidade,eleMesmo)
{
    let mensagem = `Selecione o alvo para você usar sua habilidade.\n#`+habilidade+` alvo\nalvo = nome do alvo.\nOs alvos são:\n`;

    partida.forEach(i =>{
        if(eleMesmo != i.player.id) mensagem+= "``"+i.player.tag +"``,";
    })

    MandarDM(eleMesmo,mensagem);

}
/**
 * Função para ativar a votação para quem vai pra forca
 */
function Forca()
{
    MandarMSG(canalPraEnviarMsgs,"Chegou a hora de enforcar alguem")
    for (let index = 0; index < partida.length; index++) {
        SelecionarAlvo(habilidadades.ENFORCAR,partida[index].player.id);
    }

    if(jogoAcontecendo) bot.setTimeout(ficarDeNoite,duracaoForca* 1000)
}
/**
* Função para ativar as atividades diurnas. 
* No final é chamado a função de forca
*/
function ficarDeDia()
{
    MandarMSG(canalPraEnviarMsgs,`Finalmente o dia chegou. Feliz aqueles que sobreviveram.\nO dia tem duração de ${duracaoDia} segundos, depois disso irá começar a votaão de quem vai pra forca, discutam entre vocês para decidir quem deve ir pra forca.`);

    for (let index = 0; index < partida.length; index++) {
        let habilidade = "";
        let mandarHabilidade = false;
        switch (partida[index].cargo) {
            case "otario":
                mandarHabilidade = true;
                habilidade = habilidadades.INVESTIGAR;
                break;
            case "clarividente":
                habilidade = habilidadades.INVESTIGAR;
                mandarHabilidade = true;
                break;   
        }
        if(mandarHabilidade) SelecionarAlvo(habilidade,partida[index].player.id);
    }
    if(jogoAcontecendo) bot.setTimeout(Forca,duracaoDia* 1000)
}
/**
* Função para ativar as atividades noturnas.
* No final é chamado a função de ficar de dia
*/
function ficarDeNoite()
{// de noite as habilidades são liberadas
    //let partida = [];//{player:usuario,cargo:"cargo"} 
    MandarMSG(canalPraEnviarMsgs,`A noite chegou, o que será que ela nos aguarda?\nA noite tem duração de ${duracaoNoite} segundos, escolha bem seus movimentos`);

    horario = "noite";

    for (let index = 0; index < partida.length; index++) {
        let habilidade = "";
        let mandarHabilidade = false;
        switch (partida[index].cargo) {
            case "lobo":
                mandarHabilidade = true;
                habilidade = habilidadades.MATAR; 
                break;
            case "assassino":
                habilidade = habilidadades.MATAR; 
                mandarHabilidade = true;
                break;   
        }
        if(mandarHabilidade) SelecionarAlvo(habilidade,partida[index].player.id);
        else MandarDM(partida[index].player.id,"Você foi dormir");
    }
    if(jogoAcontecendo) bot.setTimeout(ficarDeDia,duracaoNoite* 1000)

}
/**
* Descrição da função
* @param {Discord.User} emQuem Id de quem vai ser votado
* 
*/
function votar(emQuem)
{
    
}

// #endregion

// #region pontuacao
function SalvarPontuacao()
{
    file.writeFile("highscore","teste",function(a)
    {
        if(a) throw a;
    })
}
let highscore;
function LerPontuacao()
{
    file.readFile("highscore",function(erro,dado){
        if(erro) throw erro;
        highscore= dado
    })
}
// #endregion

// #region utilidades
/**
 * Função que retorna a tag de um determinado usuario. EX: 1ds7#7925
 * @param {Discord.User} usuario 
 * @returns {String} Tag do usuario
 */
function GetTag(usuario)
{
    return usuario.tag;
}

/**
 * Função que retorna o ID de um determinado usuario. EX: 498307500999966749
 * @param {Discord.User} usuario 
 * @returns {String} Id do usuario
 */
function GetId(usuario)
{//498307500999966749
    return usuario.id;
}
/**
 * Função que retorna o ID de um determinado usuario. EX: 1ds7
 * @param {Discord.User} usuario 
 * @returns {String} Username do usuario
 */
function GetUsername(usuario)
{
    return usuario.username;
}
/**
 * Função que retorna o nickname de um determinado usuario no servidor. EX: Michelzinho
 * @param {Discord.User} usuario 
 * @returns {String} Nickname do usuario
 */
function GetNickname(usuario)
{
    return bot.guilds.cache.get(guilda).member(usuario).nickname
}
function GetHelp()
{
    return "Lobinho é um 'jogo de engano' baseado no 'Werewolf for Telegram'";
}
function Testar()
{

}
// #endregion