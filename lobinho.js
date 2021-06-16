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

    if(msg.content.startsWith("#queroJogar"))
    {
        PedirEntrarLobby(msg.author);
    }

    if(msg.content.startsWith("#lobby"))
    {
        msg.channel.send(getLobby());
    }

    if(msg.content.startsWith("#start") && ChecarSeEhHost(msg.author.id) && !jogoAcontecendo)
    {
        iniciarPartida()
    }
    else if(msg.content.startsWith("#start") && jogoAcontecendo)
    {
        msg.channel.send("Espere pela proxima partida")
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
function LerDM(idUsuario,msg)
{
    console.log(idUsuario.username," enviou no DM: ",msg);
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
//const roles = ["lobo","habitante","suicida","maçom","caçador","otario","clarividente","assassino","homem lobo"];
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

//const cargos = {
//    LOBO:"lobo", HABITANTE:"habitante", SUICIDA:"suicida", MAÇOM:"maçom", XERIFE:"xerife", OTARIO:"otario", CLARIVIDENTE:"clarividente",ASSASSINO:"assassino"
//}

let partida = [];//{player:usuario,cargo:"cargo"} 
let jogoAcontecendo = false;
let votos = [];//votos[index]++
let vivos = [];//vivos[index] = true/false
let horario = "";

function GetCargos()
{
    
}
// #endregion

// #region lobby
let lobby = [];//adicionar quem vai estar jogando
//lobby[i].username = ?
//lobby[i].tag = 1ds7#2469
//lobby[i].id = 1818416834183618364864

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
function NovaRodada()
{

}
function enforcar(quem)
{

}
function matar(quem)
{

}
function SelecionarAlvo(habilidade,eleMesmo)
{
    let mensagem = `Selecione o alvo para você usar sua habilidade.\n#`+habilidade+` alvo\nalvo = nome do alvo.\nOs alvos são:\n`;

    partida.forEach(i =>{
        if(eleMesmo != i.player.id) mensagem+= "``"+i.player.tag +"``,";
    })

    MandarDM(i.player.id,mensagem);

}
function Forca()
{
    for (let index = 0; index < partida.length; index++) {
        SelecionarAlvo("enforcar",partida[index].player.id);
    }

    if(jogoAcontecendo) bot.setTimeout(ficarDeNoite,30000)
}
function ficarDeDia()
{
    MandarMSG(canalPraEnviarMsgs,"Finalmente o dia chegou. Feliz aqueles que sobreviveram.\nO dia tem duração de 2 minutos, discutam entre vocês para decidir quem deve ir pra forca.");

    for (let index = 0; index < partida.length; index++) {
        let habilidade = "";
        let mandarHabilidade = false;
        switch (partida[index].cargo) {
            case "otario":
                mandarHabilidade = true;
                habilidade = "investigar";
                break;
            case "clarividente":
                habilidade = "investigar";
                mandarHabilidade = true;
                break;   
        }
        if(mandarHabilidade) SelecionarAlvo(habilidade,partida[index].player.id);
    }
    if(jogoAcontecendo) bot.setTimeout(Forca,120000)
}
function ficarDeNoite()
{// de noite as habilidades são liberadas
    //let partida = [];//{player:usuario,cargo:"cargo"} 
    MandarMSG(canalPraEnviarMsgs,"A noite chegou, o que será que ela nos aguarda?\nA noite tem duração de 30 segundos, escolha bem seus movimentos");

    horario = "noite";

    for (let index = 0; index < partida.length; index++) {
        let habilidade = "";
        let mandarHabilidade = false;
        switch (partida[index].cargo) {
            case "lobo":
                mandarHabilidade = true;
                habilidade = "matar";
                break;
            case "assassino":
                habilidade = "matar";
                mandarHabilidade = true;
                break;   
        }
        if(mandarHabilidade) SelecionarAlvo(habilidade,partida[index].player.id);
        else MandarDM(partida[index].player.id,"Você foi dormir");
    }
    if(jogoAcontecendo) bot.setTimeout(ficarDeDia,60000)

}
/**
* Descrição da função
* @param {String} emQuem [Id de quem]
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
function GetTag(usuario)
{//1ds7#7925
    return usuario.tag;
}
function GetId(usuario)
{//498307500999966749
    return usuario.id;
}
function GetUsername(usuario)
{//1ds7
    return usuario.username;
}
function GetNickname(usuario)
{//Michelzinho
    return bot.guilds.cache.get(guilda).member(usuario).nickname
}
// #endregion