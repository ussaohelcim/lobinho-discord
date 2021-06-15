// #region Config + node stuff
const Discord = require('discord.js')
const bot = new Discord.Client();
const config = require("./config.json")

let canalPraEnviarMsgs = config.CHANNEL;
botToken = config.TOKEN;

bot.login(botToken);

bot.on('message', msg => {
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

    if(msg.content.startsWith("#start") && !jogoAcontecendo)
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
// #endregion

// #region Temporizador
function Esperar(tempo,funcao)
{
    bot.setTimeout(function(){
    /*switch (funcao) 
    {
        case "ficarDeDia":
            
            break;
        case "ficarDeNoite":
        
            break;
    }*/
    AcabouTempo();
    },tempo);

}
function AcabouTempo()
{
    MandarMSG(canalPraEnviarMsgs,"acabou o tempo kkk");
}
// #endregion

// #region lobby
let lobby = [];//adicionar quem vai estar jogando
//lobby[i].username = ?
//lobby[i].tag = 1ds7#2469
//lobby[i].id = 1818416834183618364864

function entrarLobby(usuario)
{
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


    MandarMSG(canalPraEnviarMsgs,"A noite chegou, o que será que ela nos aguarda?\nA noite tem duração de 30 segundos, escolha bem seus movimentos");

    //bot.setTimeout(abrirVotacao,10000)

    jogoAcontecendo = true
    limparLobby();
    Esperar(30000,"agora ta de dia kkkkkk");
}
// #endregion

// #region lobinho

function NovaRodada()
{

}
function enforcar(quem)
{

}
function matar(quem)
{

}
function ficarDeNoite()
{// de noite as habilidades são liberadas
    for (let index = 0; index < partida.length; index++) {
        if(partida[index].role == cargos.LOBO)
        {
            MandarDM(partida[index].jogador.id,"A noite chegou, quem você quer matar?\n#matar numero")
        }
        else if(partida[index].role == cargos.HABITANTE)
        {
            MandarDM(partida[index].jogador.id,"A noite chegou, e você foi dormir.")
        }
        else if(partida[index].role == cargos.SUICIDA)
        {
            MandarDM(partida[index].jogador.id,"A noite chegou, e você foi dormir.")
        }
        else if(partida[index].role == cargos.MAÇOM)
        {
            MandarDM(partida[index].jogador.id,"A noite chegou, e você foi dormir.")
        }
        else if(partida[index].role == cargos.XERIFE)
        {

        }
        else if(partida[index].role == cargos.OTARIO)
        {

        }
        else if(partida[index].role == cargos.CLARIVIDENTE)
        {

        }

    }
}
function abrirVotacao()
{
    for (let index = 0; index < partida.length; index++) {
        const element = array[index];
        
    }
}
function votar(emQuem)
{
    MandarDM("id","Você votou em: ");
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
function embaralharArray(array)
{
    for(let i =0; i < array.length; i++)
    {
        let pos = Math.random()*array.length;
        let temp = array[i];
        array[i] = array[pos];
        array[pos] = temp;
    }
    return array;
}
// #endregion