/**
 * Lobinho v0.0.5 by ussaohelcim.
 * 
 */

const Discord = require('discord.js')
const bot = new Discord.Client();
const config = require("./config.json")
const file = require('fs')

let lobby = new Lobby();

let canalPraEnviarMsgs = config.CHANNEL;
botToken = config.TOKEN;

bot.login(botToken);

bot.on('message', msg => {
    
    if(msg.channel.type === "dm")
    {
        if(msg.author in partida)
        {
            console.log("ele ta na partida")
        }
        if(msg.content.startsWith("#votar"))
        {

        }
        if(msg.content.startsWith("#matar"))
        {

        }
        if(msg.content.startsWith("#bizoiar"))
        {

        }
    }
    else
    {
        //console.log(msg.member.nickname)
        console.log("   "+msg.author.tag+" : "+ msg.content)
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
    }
})

bot.on('ready',function(){
    console.log("lobinho ligado, auuuuuuuu");
})

bot.on('guildMemberAdd',membro =>{
    MandarMSG(canalPraEnviarMsgs,"oh nao");
})

function MandarMSG(msg)
{
    let canal = bot.channels.cache.get(canalPraEnviarMsgs);
    canal.send(msg);
    //console.log(canalPraEnviarMsgs)
}

function MandarDM(id,msg)
{
    console.log("Mandando DM para o id "+id)
    let x = bot.users.cache.get(id);
    x.send(msg)
}

let teste = process.openStdin()
teste.addListener('data',function(a){
    let t = a.toString()
    //let x = bot.channels.cache.get(canalPraEnviarMsgs);
    //x.send(t);
    MandarMSG(t);
    //bot.channels.cache.get("846193193879470111")
})
