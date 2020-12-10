const containerFavoritos = document.getElementById("container-favoritos");
const favsinContenido = document.getElementById("fav-sin-contenido");
let actualGifs;
let getGifs = ()=>{
    //funcion que replica el save storage de Hover-Active.js
    actualGifs = JSON.parse(localStorage.getItem('myGifs')) || []
    for (let index = 0; index < actualGifs.length; index++) {
        let objetoGif = actualGifs[index];
        //llama a addtodom de API.js linea 20
        addToDOM(objetoGif, containerFavoritos, 'gifs-favoritos');
    }
    if(actualGifs.length>0){
    favsinContenido.remove();
    }
    if(actualGifs.length >=12 ){
        let button = document.createElement('button');
        button.innerText = 'VER MAS';
        button.classList.add('button-gifs');
        bloque1.appendChild(button);
       // button.addEventListener('click', ()=>{
        //    getGifs(12,24);
        //})
    }
}

getGifs();

let gifsFav = document.getElementsByClassName('gifs-favoritos');

let iconosTarjeta = document.getElementsByClassName('iconos-tarjeta');


for (let index = 0; index < iconosTarjeta.length; index++) {
    //Creo la imagen del trash y le agrego el mismo estilo que los demas iconos
    let iconTrash = document.createElement('img');
    iconTrash.src = "../Imagenes/icon-trash-normal.svg";
    iconTrash.classList.add('iconos-estilo');
    //reemplazo al icono download por el trash
    let loopIcon = iconosTarjeta[index].firstChild;
    iconosTarjeta[index].replaceChild(iconTrash,loopIcon)
    //funciones que llaman a todos los hover y active del trash
    iconTrash.addEventListener("mouseover", ()=>{
        
        iconTrash.src = "../Imagenes/icon-trash-hover.svg";
    })
    
    iconTrash.addEventListener('mouseout', ()=>{
        iconTrash.src = "../Imagenes/icon-trash-normal.svg";
    })
    
    iconTrash.addEventListener('click', ()=>{
       
        console.log(typeof(localStorage)); 
     
    })
}
