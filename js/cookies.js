window.addEventListener('load', function() {
    actualizarCookie();
    actualizarRadio();
    actualizarEstilo();
});

function actualizarRadio() { // actualiza el radiobutton para que coincida con la cookie
    let estilo = document.cookie.split('estilo=')[1]; // consigo el estilo de la cookie
    let todos_radio = document.querySelectorAll('input[type=radio]'); // consigo todos los radiobuttons

    for(let i=0; i< todos_radio.length; i++) { // recorro los radiobuttons
        todos_radio[i].checked = false; // los descheckeo

        if(todos_radio[i].id == estilo) // checkeo el que toca
            todos_radio[i].checked = true;
    }
}

function actualizarEstilo() { // actualiza el estilo de la pagina segun el radiobutton actual
    let seleccionado = document.querySelector('input[type=radio]:checked');
    if(seleccionado) {
        let estilo = document.cookie.split('estilo=')[1];
        let estilos_alternativos = document.querySelectorAll('link[rel="alternate stylesheet"]');
        
        for(let i=0; i<estilos_alternativos.length; i++) { // recorro todos los estilos alternativos
            estilos_alternativos[i].disabled = true; // desactivo cada uno
            
            if(estilos_alternativos[i].href.split("css/")[1] == (estilo+'.css')) // si el estilo alternativo de esta iteracion es el que aparece en la cookie
                estilos_alternativos[i].disabled = false; // lo activo
        }
    }
}

function actualizarCookie( event ) { // anyade la cookie o la cambia si ya estaba. Esta durara siempre 45 dias antes de expirar
    let estilo_elegido = document.querySelector('input[type=radio]:checked').id; // encuentro el estilo elegido segun el radio button checkado
    let d = new Date(); // defino variable de tipo date
    let dias = 45; // defino los dias que dura la cookie
    d.setTime(d.getTime() + (dias*24*60*60*1000)); // le sumo <dias> dias a la fecha
    let expira = "expires="+ d.toUTCString(); // guardo en formato string UTC esta informacion preparado para la cookie
    if(event) {
        if(event.type !== 'load') // si no tiene que esperar a que cargue el elemento es que simplemente he seleccionado otro radiobutton (onchange).
            document.cookie = `estilo=${estilo_elegido}; ${expira}; path=/`;
        else {// si es load
            if(document.cookie.split('estilo=').length == 1) // si no habia cookie
                document.cookie = `estilo=predeterminado; ${expira}; path=/`;
            else {
                estilo_elegido = document.cookie.split('estilo=')[1]; // copio el estilo que ya habia
                document.cookie = `estilo=${estilo_elegido}; ${expira}; path=/`; // actualizo el tiempo de vida de la cookie
            }
        }
    }
}