const Discord = require('discord.js')
const bot = new Discord.Client();

botToken = "";
bot.login(botToken);

bot.on('message', msg => {

})
bot.on('ready',function(){

})
bot.on('guildMemberAdd',membro =>{

})

//
roles = ["lobo","vileiro"];
jogadores = [];//adicionar quem vai estar jogando

function entrarLobby(quem)
{
    jogadores.push(quem);
}
function enforcar(quem)
{

}
function matar(quem)
{

}
function votar(emQuem)
{

}