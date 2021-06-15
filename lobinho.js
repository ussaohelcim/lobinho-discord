// lobinho
const roles = ["lobo","habitante","suicida","maçom","xerife","otario","clarividente","assassino"];
const cargos = {
    LOBO:"lobo", HABITANTE:"habitante", SUICIDA:"suicida", MAÇOM:"maçom", XERIFE:"xerife", OTARIO:"otario", CLARIVIDENTE:"clarividente",ASSASSINO:"assassino"
}
let lobby = [];//adicionar quem vai estar jogando
let partida = [];//{jogador,role} 
let jogoAcontecendo = false;
let votos = [];//votos[index]++
let vivos = [];//vivos[index] = true/false

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
    //lobby = []

    //bot.setTimeout(abrirVotacao,10000)
    jogoAcontecendo = true
}


function acabouTempo()
{

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

