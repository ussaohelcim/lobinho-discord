const Discord = require('discord.js')
const bot = new Discord.Client();
const config = require("./config.json")

let canalPraEnviarMsgs = config.CHANNEL;
botToken = config.TOKEN;

bot.login(botToken);

bot.on('message', msg => {
    if(msg.channel.type === "dm")
    {
        
    }
    if(msg.content.startsWith("#queroJogar") && !jogoAcontecendo)
    {
        entrarLobby(msg.author);
        //console.log(msg.author)
        msg.channel.send(`${msg.author.username} entrou no lobby`);
        msg.channel.send(getLobby());
    }
    else if(msg.content.startsWith("#queroJogar") && jogoAcontecendo)
    {
        msg.channel.send("Espere pela proxima partida")
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

// lobinho
const roles = ["lobo","habitante","suicida","maçom","xerife","otario","clarividente"];
const cargos = {
    LOBO:"lobo", HABITANTE:"habitante", SUICIDA:"suicida", MAÇOM:"maçom", XERIFE:"xerife", OTARIO:"otario", CLARIVIDENTE:"clarividente"
}
let lobby = [];//adicionar quem vai estar jogando
let partida = [];//{jogador,role} 
let jogoAcontecendo = false;

function entrarLobby(usuario)
{
    lobby.push(usuario);
    //console.log(usuario)
    //console.log(lobby[0])
    //console.log(lobby[0].id)
}
function iniciarPartida()//vetorJogadores = lobby?
{
    //se numero de jogadores > 8 pode ter 2 lobos

    let quantidadeSolitarios = 1;
    
    let loboSorteado = false
    //novoArray = embaralharArray(lobby)
    //let quantidadeSolitarios = Math.random()
    let num;
    for (let index = 0; index < lobby.length; index++) {
        num = Math.floor(Math.random()*roles.length) 

        partida.push({player:lobby[index],role:roles[num]})
        MandarDM(lobby[index].id,"seu cargo é: "+roles[num])
        //console.log("usuario: "+lobby[index].username)
        //console.log("jogador "+partida[index].player+" cargo: "+partida[index].role)
    }

    bot.setTimeout(abrirVotacao,10000)
    jogoAcontecendo = true
}
function acabouTempo()
{

}
function MandarDM(id,msg)
{
    console.log("Mandando DM para o id "+id)
    let x = bot.users.cache.get(id);
    x.send(msg)
}
function getLobby()
{
    msg = "Atualmente, os seguintes jogadores estão no lobby: "
    lobby.forEach(jogador =>{
        msg+= jogador.tag+",";
    })
    //bot.channels.cache.get(canalPraEnviarMsgs).send(msg);
    return msg;
}
function MandarMSG(idcanal,msg)
{
    let canal = bot.channels.cache.get(idcanal);
    canal.send(msg);
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


// FIRULAS

let teste = process.openStdin()
teste.addListener('data',function(a){
    let t = a.toString()
    let canal = bot.channels.cache.get("846193193879470113");
    canal.send(t);
    //bot.channels.cache.get("846193193879470111")
})

function Player()
{
    let funcao = ""
}


function Lobo()
{
    let help = ""
}
function Habitante()
{

    let help = "funcao.ajuda;"
}
function Suicida()
{

    let help = "funcao.ajuda;"
}

