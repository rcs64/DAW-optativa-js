window.addEventListener('load', function() {
    mostrarMensajeCookies();
    let cookies = getCookies();
    let cookies_aceptadas = cookies.cookiesAceptadas;

    if(cookies_aceptadas === 'true') {
        actualizarCookie();
        actualizarRadio();
        actualizarEstilo();
    }
});

function actualizarRadio() { // actualiza el radiobutton para que coincida con la cookie
    let cookies = getCookies();
    let estilo = cookies.estilo;
    let todos_radio = document.querySelectorAll('input[type=radio]'); // consigo todos los radiobuttons

    for(let i=0; i< todos_radio.length; i++) { // recorro los radiobuttons
        todos_radio[i].checked = false; // los descheckeo

        if(todos_radio[i].id == estilo) // checkeo el que toca
            todos_radio[i].checked = true;
    }
}

function getCookies() {
    let cookies = {}; // hago json
    let cookies_lista = document.cookie.split('; '); // separo en lista no asociativa las cookies
    let par; // par llave-valor

    for(let i=0; i<cookies_lista.length; i++) { // recorro las cookies
        par = cookies_lista[i].split('='); // separo por el =
        if(par.length > 1)
            cookies[par[0]] = par[1];  // asocio a lo que hay a la izquierda del igual con lo que hay a la derecha del igual
    }

    return cookies;
}

function actualizarEstilo() { // actualiza el estilo de la pagina segun el radiobutton actual
    let seleccionado = document.querySelector('input[type=radio]:checked');
    if(seleccionado) {
        let cookies = getCookies();
        let estilo = cookies.estilo;
        let estilos_alternativos = document.querySelectorAll('link[rel="alternate stylesheet"]');
        
        for(let i=0; i<estilos_alternativos.length; i++) { // recorro todos los estilos alternativos
            estilos_alternativos[i].disabled = true; // desactivo cada uno
            
            if(estilos_alternativos[i].href.split("css/")[1] == (estilo+'.css')) // si el estilo alternativo de esta iteracion es el que aparece en la cookie
                estilos_alternativos[i].disabled = false; // lo activo
        }
    }
}

function actualizarCookie( event ) { // anyade la cookie o la cambia si ya estaba. Esta durara siempre 45 dias antes de expirar
    let seleccionado = document.querySelector('input[type=radio]:checked');
    let d = new Date(); // defino variable de tipo date
    let dias = 45; // defino los dias que dura la cookie
    d.setTime(d.getTime() + (dias*24*60*60*1000)); // le sumo <dias> dias a la fecha
    let expira = "expires="+ d.toUTCString(); // guardo en formato string UTC esta informacion preparado para la cookie
    if(seleccionado) {
        let estilo_elegido = seleccionado.id; // encuentro el estilo elegido segun el radio button checkado
        if(event) {
            if(event.type !== 'load') // si no tiene que esperar a que cargue el elemento es que simplemente he seleccionado otro radiobutton (onchange).
                document.cookie = `estilo=${estilo_elegido}; ${expira}; path=/`;
            else {// si es load
                if(document.cookie.split('estilo=').length == 1) // si no habia cookie
                    document.cookie = `estilo=predeterminado; ${expira}; path=/`;
                else {
                    let cookies = getCookies();
                    let estilo = cookies.estilo;
                    document.cookie = `estilo=${estilo}; ${expira}; path=/`; // actualizo el tiempo de vida de la cookie
                }
            }
        }
    }
    else {
        document.querySelector('input[id=predeterminado]').checked = true;
        document.cookie = `estilo=predeterminado; ${expira}; path=/`;
    }
}

function ventanaModal() {
    let modal = document.createElement('section');
    modal.style.all = 'initial';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    modal.style.display = 'flex';        
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '1000';
    
    let h2 = document.createElement('h2');
    h2.textContent = 'Cookies';

    let modalContent = document.createElement('section');
    modalContent.style.all = 'initial';
    modalContent.style.backgroundColor = 'white';
    modalContent.style.width = '20%';
    modalContent.style.padding = '20px';
    modalContent.style.borderRadius = '5px';
    modalContent.style.textAlign = 'center';

    let message = document.createElement('p');
    
    
    let texto_mensaje = `Se han guardado sus preferencias en cuanto a cookies. Para cambiar sus preferencias en cualquier momento, consulte nuestra política de cookies o siga el enlace que figura a pie de página.`

    message.textContent = texto_mensaje;
    
    modalContent.appendChild(h2);
    modalContent.appendChild(message);
    modal.appendChild(modalContent);
    document.body.appendChild(modal); // Agregar la ventana modal al documento 
    const timeoutId = setTimeout(() => {
        if (document.body.contains(modal)) document.body.removeChild(modal);
    }, 5000);
}

function mostrarMensajeCookies() {
    if(document.cookie.split('cookiesAceptadas').length > 1) // si esta guardada la cookie cookiesAceptadas (duracion 90 dias)
        document.getElementById('cookies_mensaje').style = 'display: none'; // oculto el mensaje
}

function mostrarEstadoCookies() { // funcion para mostrar el estado de la cookie en la pagina de la politica de las cookies
    const estadoSection = document.getElementById('estadoCookies'); // primero se saca el section donde se mostrara el estado
    const cookiesAceptadas = document.cookie.split('cookiesAceptadas=')[1]; // se saca el valor de la cookie del document.cookie
    
    if(estadoSection) {
        if (cookiesAceptadas === 'true') { // su si que hay cookies aceptadas entonces se muestra el mensaje de aceptadas
            estadoSection.innerHTML = 'Cookies ACEPTADAS - Puedes rechazarlas si cambias de opinión';
            estadoSection.classList.add('aceptadas'); // y se le anyade el css de acpetadas
            estadoSection.classList.remove('rechazadas'); // y se le quita el de rechazadas por si ya lo tenia de antes
        } else if (cookiesAceptadas === 'false') { // si hay cokkies rechazadas entonces se muestra el de rechaazadp
            estadoSection.innerHTML = 'Cookies RECHAZADAS - Puedes aceptarlas si cambias de opinión';
            estadoSection.classList.add('rechazadas'); // y lo mismo con el css
            estadoSection.classList.remove('aceptadas');
        } else { // si no hay cookies directamnete se pone el mensaje de que no hay todavia
            estadoSection.innerHTML = 'No hay una decisión registrada aún. Usa los botones para elegir tu preferencia';
            estadoSection.classList.remove('aceptadas', 'rechazadas'); // y se le quitan las dos clases del css
        }
    }
}

function aceptarCookies() { // funcion para aceptar cookies
    let d = new Date(); // defino variable de tipo date
    let dias = 90; // defino los dias que dura la cookie
    d.setTime(d.getTime() + (dias*24*60*60*1000)); // le sumo <dias> dias a la fecha
    let expira = "expires="+ d.toUTCString(); // guardo en formato string UTC esta informacion preparado para la cookie
    document.cookie = `cookiesAceptadas=true; ${expira}; path=/`; // pone true en la cookie
    mostrarEstadoCookies(); // y se llama a la funcion para que se actualice en el html de la politica de cookies
    actualizarCookie(event);
    actualizarRadio();
    ventanaModal();
}
 
function rechazarCookies() { // funcion para rechazar cookies
    let d = new Date(); // defino variable de tipo date
    let dias = 90; // defino los dias que dura la cookie
    d.setTime(d.getTime() + (dias*24*60*60*1000)); // le sumo <dias> dias a la fecha
    let expira = "expires="+ d.toUTCString(); // guardo en formato string UTC esta informacion preparado para la cookie
    document.cookie = `cookiesAceptadas=false; ${expira}; path=/`; // lo mismo pero con false
    mostrarEstadoCookies();
    ventanaModal();
}