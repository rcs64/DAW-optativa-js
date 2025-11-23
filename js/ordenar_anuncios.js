function compararAnuncios(a, b, criterio) { // la funcion que se llama en el busquda para filtrar los anuncios que hay 
    let resultado = 0; // para guardar el reultado de la comparacion

    switch(criterio) { // se ordena segun el criterio que se ha tocado en el select (precio, titulo, fecha, ciudad, pais)
        // si es precio ascendente
        case 'precio_asc':
            const precioA = parseInt(a.querySelector('.precio').textContent.match(/\d+/)[0]); // primero se le saca el precio del anuncio a pero solo el numero sin el simbolo para que no se me complique la comparacion y se le hace parseint para pasarlo de texto a numero
            const precioB = parseInt(b.querySelector('.precio').textContent.match(/\d+/)[0]); // lo mismo pero con el anuncio b
            resultado = precioA - precioB; // se le resta el precio del anuncio a menos el del anuncio b para ver cual es mayor y asi ordenarlos
            break;

        // si es precio descendente
        case 'precio_desc': // se le hace lo mismo que en el ascendente pero lo del resultado funciona al reves para ordenar
            const precioA2 = parseInt(a.querySelector('.precio').textContent.match(/\d+/)[0]);
            const precioB2 = parseInt(b.querySelector('.precio').textContent.match(/\d+/)[0]);
            resultado = precioB2 - precioA2;
            break;

        // si es titulo ascendente
        case 'titulo_asc':
            const tituloA = a.querySelector('h2').textContent.toLowerCase(); // se saca el titulo del anuncio a y b y se pasa a minusculas para que no me de problemas al comparar
            const tituloB = b.querySelector('h2').textContent.toLowerCase();
            resultado = tituloA.localeCompare(tituloB); // se usa el localecompare para comprarar y ordenar 
            break;

        // si es titulo descendente
        case 'titulo_desc': // lo mismo que el ascendente pero al reves
            const tituloA2 = a.querySelector('h2').textContent.toLowerCase();
            const tituloB2 = b.querySelector('h2').textContent.toLowerCase();
            resultado = tituloB2.localeCompare(tituloA2);
            break;

        // si es fecha descendente
        case 'fecha_desc':
            const fechaA = new Date(a.querySelector('time').getAttribute('datetime')); // se saca la fecha del anuncio y se pasa a date para poder compararla bien
            const fechaB = new Date(b.querySelector('time').getAttribute('datetime')); // lo mismo
            resultado = fechaB - fechaA; // se le resta la fecha del anuncio b menos la del anuncio a para ver cual es mas reciente y ordenarlos
            break;

        // si es fecha ascendente
        case 'fecha_asc': // lo mismo que el descendente pero al reves
            const fechaA2 = new Date(a.querySelector('time').getAttribute('datetime'));
            const fechaB2 = new Date(b.querySelector('time').getAttribute('datetime'));
            resultado = fechaA2 - fechaB2;
            break;

        // si es ciudad ascendente
        case 'ciudad_asc':
            const ciudadA = a.querySelector('.ciudad').textContent.toLowerCase(); // se le saca la ciudad al anuncio y se pasa a minusculas para que no me de priblemas el comparar
            const ciudadB = b.querySelector('.ciudad').textContent.toLowerCase();
            resultado = ciudadA.localeCompare(ciudadB); // y se usa el localecompare aqui tambien para ordenar
            break;

        // si es ciudad descendente
        case 'ciudad_desc': // lo mismo que el ascendente pero al reves
            const ciudadA2 = a.querySelector('.ciudad').textContent.toLowerCase();
            const ciudadB2 = b.querySelector('.ciudad').textContent.toLowerCase();
            resultado = ciudadB2.localeCompare(ciudadA2);
            break;

        // si es pais ascendente
        case 'pais_asc': // se hace lo mism oque con la ciudad pero sacandole el pais al anuncio
            const paisA = a.querySelector('.pais').textContent.toLowerCase();
            const paisB = b.querySelector('.pais').textContent.toLowerCase();
            resultado = paisA.localeCompare(paisB);
            break;

        // si es pais descendente
        case 'pais_desc': // li mismo que el ascendente pero al reves
            const paisA2 = a.querySelector('.pais').textContent.toLowerCase();
            const paisB2 = b.querySelector('.pais').textContent.toLowerCase();
            resultado = paisB2.localeCompare(paisA2);
            break;

        default:
            resultado = 0;
    }

    return resultado; // se devuelve el resultado de la comparacion
}


function ordenarAnuncios(elementos, criterio) { // funcion para ordenar los anuncios (es el bubblesort porque me parece el mas facil la verdad)
    let arr = elementos.slice();  // se saca una copia del array de los anuncios para no modificar el original por si algo pasa y no se hace bien lo de ordenar
    
    for (let i = 0; i < arr.length - 1; i++) { // recorro el array
        for (let j = 0; j < arr.length - i - 1; j++) { // recorro el array menos lo que ya esta ordenado
            if (compararAnuncios(arr[j], arr[j + 1], criterio) > 0) { // si el anuncio actual es mayor que el siguiente segun el criterio entonces se intercambian de sitio
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // se intercambian de sitio
            }
        }
    }
    
    return arr; // se devuelve el array odenado
}

function mostratAnunciosOrdenados(anuncios) { // funcion para mostrar los resultados en el html
    const ulArticulos = document.getElementById('ul_articulos'); // se saca el ul de los anuncios

    ulArticulos.innerHTML = ''; // se vacia para que no salgan duplicados ni cosas raras
    
    anuncios.forEach(anuncio => { // se recorre todo el array de anuncios
        ulArticulos.appendChild(anuncio); // y se hace appendchild para ir anyadiendo al ul vacio los nuevos anuncios ordenados
    });
}

function ordenarResultados() { // por si se cambia el select del criterio
    const selectOrden = document.getElementById('ordenar_resultados'); // se saca el select con lo que el usuario quiere ordenar
    const criterio = selectOrden.value; // se saca el valor del select
    
    if (!criterio) return; // si no hay criterio pues no se hace nada
    
    const anuncios = Array.from(document.querySelectorAll('#ul_articulos li')); // se sacam todos los anuncios que hay en el ul
    
    const anunciosOrdenados = ordenarAnuncios(anuncios, criterio); // y se ordenan con la funcion para ordenar
    
    mostratAnunciosOrdenados(anunciosOrdenados); // luego se muestra el resultado en el html con la funcion
}

document.addEventListener('DOMContentLoaded', function() { // para que la pagina este atenta cuando se usa un filtro del select
    const selectOrden = document.getElementById('ordenar_resultados'); // se saca el select con lo que el usuario quiere ordenar
    
    if (selectOrden) { // y si existe ese select 
        selectOrden.addEventListener('change', ordenarResultados); // se hace el evento de escuchar el cambio en el select y se llama a la funcion ordenar resultados para ordenar los anuncios con lo que se ha elegido del select
    }
});
