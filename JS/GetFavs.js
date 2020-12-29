const containerFavoritos = document.getElementById("container-favoritos");
const favsinContenido = document.getElementById("fav-sin-contenido");
let iconosTarjeta = document.getElementsByClassName('iconos-tarjeta');

//menu.classList.remove("menu-active");
let actualGifs = [];
let getGifs = (length, Index)=>{
    //funcion que replica el save storage de Hover-Active.js
    actualGifs = JSON.parse(localStorage.getItem('myGifs')) || []
    for (let index = Index; index < length; index++) {
        let objetoGif = actualGifs[index];
        //llama a addtodom de API.js linea 20
        addToDOM(objetoGif, containerFavoritos, 'gifs-favoritos',actualGifs[index].size, objetoGif);
        
        
        let iconTrash = document.createElement('img');
    iconTrash.src = "../GIFOS/Imagenes/icon-trash-normal.svg";
    iconTrash.classList.add('iconos-estilo');
    //reemplazo al icono fav por el trash
    
        
        console.log(iconosTarjeta[index])
    
    let loopIcon = iconosTarjeta[index].firstChild;
    iconosTarjeta[index].replaceChild(iconTrash,loopIcon)
    //funciones que llaman a todos los hover y active del trash
    iconTrash.addEventListener("mouseover", ()=>{
        
        iconTrash.src = "../GIFOS/Imagenes/icon-trash-hover.svg";
    })
    
    iconTrash.addEventListener('mouseout', ()=>{
        iconTrash.src = "../GIFOS/Imagenes/icon-trash-normal.svg";
    })
    
    iconTrash.addEventListener('click', ()=>{
        
        let index = actualGifs.findIndex(gif => gif.size === objetoGif.size);
        console.log(index);
        if (index !== -1) {
            console.log("Producto dado de baja");
            actualGifs.splice(index, 1);
        }
        console.log(actualGifs)
        localStorage.setItem('myGifs', JSON.stringify(actualGifs));
        window.location.reload();
    
    })
    }
   
}

getGifs(12,0);

let button = document.createElement('button');
if(actualGifs.length>0){
    favsinContenido.remove();
    }
    if(actualGifs.length >=12 ){
        //actualGifs.splice(12);
        
        button.innerText = 'VER MAS';
        button.classList.add('button-gifs');
        bloque1.appendChild(button);
       
    }

button.addEventListener('click', ()=>{
    if (actualGifs.length <24) {
        
        
        getGifs(actualGifs.length, 12);
    }else if(actualGifs.length >24 && actualGifs.length <36){
        getGifs(actualGifs.length, 24);
    }
      
    })
//let gifsFav = []
//gifsFav = document.getElementsByClassName('gifs-favoritos').item(0);


//console.log(iconosTarjeta.length)
//console.log(containerFavoritos.children.item(iconosTarjeta))

/*
for (let index = 0; index < iconosTarjeta.length; index++) {
    //Creo la imagen del trash y le agrego el mismo estilo que los demas iconos
    let iconTrash = document.createElement('img');
    iconTrash.src = "../GIFOS/Imagenes/icon-trash-normal.svg";
    iconTrash.classList.add('iconos-estilo');
    //reemplazo al icono download por el trash
    //console.log(iconosTarjeta[index])
    let loopIcon = iconosTarjeta[index].firstChild;
    iconosTarjeta[index].replaceChild(iconTrash,loopIcon)
    //funciones que llaman a todos los hover y active del trash
    iconTrash.addEventListener("mouseover", ()=>{
        
        iconTrash.src = "../GIFOS/Imagenes/icon-trash-hover.svg";
    })
    
    iconTrash.addEventListener('mouseout', ()=>{
        iconTrash.src = "../GIFOS/Imagenes/icon-trash-normal.svg";
    })
    
    iconTrash.addEventListener('click', ()=>{
        let filtro = actualGifs.filter(element =>{
            element.url !== gifsFav.src;
        })
        console.log(filtro);
        
       
    })
}*/

