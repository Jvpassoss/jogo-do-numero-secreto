let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function escrevaNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function mensagemInicial() {
    escrevaNaTela('h1', 'Jogo do Número Secreto');
    escrevaNaTela('p', 'Escolha um número entre 1 e 10');
}

mensagemInicial();

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados)
        return numeroEscolhido;
    }
}

function verificarChute() {
    let chute = document.querySelector('input').value;

    if(chute == numeroSecreto) {
        let palavraTentativas = tentativas == 1 ? 'tentativa' : 'tentativas';
        let numeroDeTentativas = `Você precisou de ${tentativas} ${palavraTentativas}.`;

        escrevaNaTela('h1', 'ACERTOU!!!')
        escrevaNaTela('p', numeroDeTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if(chute < numeroSecreto) {
            escrevaNaTela('p', 'O número secreto é maior');
        } else {
            escrevaNaTela('p', 'O número secreto é menor');
        }
    }
    tentativas++;
    limparCampo();
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

reiniciarJogo();

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 1;
    limparCampo();
    mensagemInicial();
}
