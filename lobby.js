class Lobby 
{
    constructor()
    {
        this.jogadores = []
    }
    Adicionar(quem)
    {
        jogadores.push(quem);
    }
    MostrarParticipantes()
    {
        let nomes = ""
        this.jogadores.forEach(jogador =>{
            nomes += jogador +",";
        });
        nomes = nomes.substring(0,nomes.length-1)
        return nomes;
    }
    IniciarJogo()
    {

    }
    LimparLobby()
    {
        this.jogadores = []
    }
    SairLobby(quem)
    {

    }
}