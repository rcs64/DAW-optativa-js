window.addEventListener('load', function() {

});
// Lee el valor de una cookie por nombre
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}


// Aplica una hoja de estilos al documento. `href` debe ser la ruta al .css
function applyStyleHref(href) {
    if(!href) 
        return;
    let link = document.getElementById('estilo-actual');
    if (!link) {
        link = document.createElement('link');
        link.rel = 'stylesheet';
        link.id = 'estilo-actual';
        document.head.appendChild(link);
    }
    if (link.href !== href && !link.href.endsWith(href)) {
        // Usar href absoluto o relativo; asignar directamente
        link.href = href;
    }
}

// Determina el archivo CSS asociado a un radio (intenta data-css, sino css/<id>.css)
function cssFromRadio(radio) {
    if (!radio) return null;
    if (radio.dataset && radio.dataset.css) return radio.dataset.css;
    // fallback: suponer que el id del radio corresponde a un archivo en carpeta css
    return `css/${radio.id}.css`;
}

// Aplica el estilo según el radio seleccionado actualmente
function actualizarEstilo() {
    const seleccionado = document.querySelector('input[type=radio]:checked');
    if (!seleccionado) return;
    const css = cssFromRadio(seleccionado);
    applyStyleHref(css);
}

function actualizarCookie() {
    let estilo_elegido = document.querySelector('input[type=radio]:checked').id; // encuentro el estilo elegido segun el radio button checkado
    let d = new Date(); // defino variable de tipo date
    let dias = 45; // defino los dias que dura la cookie
    d.setTime(d.getTime() + (dias*24*60*60*1000)); // le sumo <dias> dias a la fecha
    let expira = "expires="+ d.toUTCString(); // guardo en formato string UTC esta informacion preparado para la cookie

    document.cookie = `estilo=${estilo_elegido}; ${expira}; path=/`;
}