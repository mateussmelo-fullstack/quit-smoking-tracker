const diasEl = document.getElementById("dias");
const tempoEl = document.getElementById("tempo");
const btnTimer = document.getElementById("btnTimer");
const btnReset = document.getElementById("btnReset");

let inicio = localStorage.getItem("inicio");
let interval;
let timerRodando = false;


if(inicio){
    atualizarContador()
};


function atualizarContador(){
    const agora = new Date();
    const dataInicio = new Date(inicio);

    const diferenca = agora - dataInicio;

    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    diasEl.textContent = dias;

    const horas = Math.floor((diferenca / (1000 *60 * 60)) % 24);
    const minutos = Math.floor((diferenca / (1000 * 60))% 60);
    const segundos = Math.floor((diferenca / 1000) % 60);

    tempoEl.textContent = 
    `${String(horas).padStart(2,'0')}:` +
    `${String(minutos).padStart(2,'0')}:` +
    `${String(segundos).padStart(2,'0')}`; 
}

btnTimer.addEventListener("click", ()  => {
    if(!inicio) {
        inicio = new Date();
        localStorage.setItem("inicio", inicio);
    }

    if(!timerRodando){
        interval = setInterval(atualizarContador, 1000);
        timerRodando = true;
        btnTimer.textContent = "Timer Ativo";
    }

});

btnReset.addEventListener("click", () => {
    if(confirm("tem certeza que deseja reniciar?")){
        localStorage.removeItem("inicio");
        clearInterval(interval);
        inicio = null;
        diasEl.textContent = 0;
        tempoEl.textContent = "00:00:00";
        btnTimer.textContent = "Iniciar Timer";
        timerRodando = false;
    }
});