// Variables


const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners() {
    // Cuando presionar el botón "agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    //Elimina cursos de el carrito
    carrito.addEventListener('click', eliminarCurso);

    //Muestra los cursos de localStorage

    document.addEventListener('DOMContentLoaded', () =>{
        articulosCarrito = JSON.parse(localStorage.getItem('carrito') || []);
    
        carritoHTML();
    
    })



    //Vaciar el carrito

    vaciarCarritoBtn.addEventListener('click', () =>{
        articulosCarrito = []; //reseteamos el arreglo
        limpiarHTML(); //Eliminamos todo el html
    })

}




//Funciones

function agregarCurso(e) {
    e.preventDefault();



    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }

}

// Elimina un curso de el carrito

function eliminarCurso(e){
    console.log(e.target.classList);
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        //Elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)
        
        carritoHTML(); //Iterar sobre el carrito y mostrar su html
    }
}


// Lee el contenido del HTML al que le dimos click y extrae la informacion del curso


function leerDatosCurso(curso) {
    console.log(curso);

    //Crear un objeto con el contenido de el curos actual

    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    }
    //Revisa si un elemnto ya esta en el carrito

    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if(existe){
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; // retorna el objeto actualizado
            }else{
                return curso;//retorna los objetos no duplicados
            }
        });
        articulosCarrito = [...cursos];
    }else{
        //Agregamos el curso al carrito
        
    articulosCarrito = [...articulosCarrito, infoCurso];
    }

    // Agregar elementos al arreglo del carrito


    console.log(articulosCarrito);
    carritoHTML();
}

// Muestra el carrito de compras en el HTML

function carritoHTML() {

    // Limpiar el HTML

    limpiarHTML();

    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach(curso => {
        console.log(curso);
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = ` 
        <td>
            <img src="${imagen}" width=100>
        </td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}">X</a>
        </td>
        `;
        // Agrega el HTML del carrito en el tbody

        contenedorCarrito.appendChild(row);
    });

    //Agregar el carrito al localStorage

    sincronizarStorage();

}


    function sincronizarStorage() {
        localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
    }



// Elimina los cursos del tbody

function limpiarHTML() {
    // Forma lenta
    // contenedorCarrito.innerHTML = '';


    // Recomendada
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }

}