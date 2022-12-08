//Variables
const carrito = document.querySelector('#carrito');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const divCarrito = document.querySelector('#lista-carrito tbody');
const listaArticulos = document.querySelector('#lista-articulos');

let articulosCarrito = [];

registrarEventListeners()

//-----------------FUNCIONES----------------------
//capturamos los eventos con esta funcion
function registrarEventListeners(){
    //este evento llama la funcion agregar articulo
    listaArticulos.addEventListener('click',agregarArticulo);

    //este evento llama la funcion eliminarArticulo
    carrito.addEventListener('click',eliminarArticulo);

    //escuchar el boton de vaciar carrito
    vaciarCarrito.addEventListener('click',()=>{
        articulosCarrito = [];//vuelvo y dejo el arreglo vacio
        limpiarHtml();//borramos todo el html
    })
} 

//agregamos los articulos al carrito
function agregarArticulo(e){
    e.preventDefault();//previene que el boton recargue la pagina
    if(e.target.classList.contains('agregar-carrito')){
        const articuloSelecionado = e.target.parentElement.parentElement;
        leerDatosArticulo(articuloSelecionado)
        /* console.log(e.target.parentElement.parentElement) */
    }
} 

//funcion para eliminar articulos
function eliminarArticulo(e){
    if(e.target.classList.contains('borrar-articulo')){
        const ArticuloId = e.target.getAttribute('data-id');
        /* console.log(e.target.getAttribute('data-id')) */
        articulosCarrito = articulosCarrito.filter(articulo=> articulo.id !== ArticuloId);
        carritoHtml();
    }
}



//leer el html donde dimos click y lo extraemos
function leerDatosArticulo(articulo){
    //creemos un objeto con los datos de card
    const infoArticulo = {
        imagen:articulo.querySelector('.card img').src,
        titulo:articulo.querySelector('h4').textContent,
        precio:articulo.querySelector('.precio span').textContent,
        id:articulo.querySelector('a').getAttribute('data-id'),
        cantidad:1
    }
    //revisemos si el articulo ya esta en el array y si si solo actualizao la cantidad
    //sino adiciono el nuevo articulo
    const existeArticulo = articulosCarrito.some(articulo=> articulo.id === infoArticulo.id);
    if(existeArticulo){
        const articulos = articulosCarrito.map(articulo=>{
            if (articulo.id === infoArticulo.id){
                articulo.cantidad++;
                return articulo;//retornamos el array mapeado solo con la condicion
            }else{
                return articulo;
            }
        })
        articulosCarrito = [...articulos]
    }else{
        //sino agregamos el producto alcarrito
        articulosCarrito = [...articulosCarrito,infoArticulo]
    }


    carritoHtml()
}

//Inyectar los articulos del array en el html del carrito (tbody)
function carritoHtml(){
    //llamamos la funcion que limpia el html
    limpiarHtml();

    //recorre el array y genera el html
    articulosCarrito.forEach( articulo =>{
        const {imagen,titulo,precio,cantidad,id} = articulo;//destructuring
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${imagen}" width="100">
        </td>
        <td>
            ${titulo}
        </td>
        <td>
            ${precio}
        </td>
        <td>
            ${cantidad}
        </td>
        <td>
            <a href="#" class="borrar-articulo" data-id="${id}">X</a>
        </td>
        `;
        divCarrito.appendChild(row)
    })
}

//creemos una funcion que nos limpie el html del carrito cuando demos click
function limpiarHtml(){
    //esta forma es una forma lenta y sirve para aplicativos pequeños
    //divCarrito.innerHTML = '';

    //esta forma es mucho mejor para limpiar el html
    while(divCarrito.firstChild){
        divCarrito.removeChild(divCarrito.firstChild)
    }
}
