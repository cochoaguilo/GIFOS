const containerMisGifos = document.getElementById("container-mis-gifos");
const misGifossinContenido = document.getElementById("mis-gifos-sin-contenido");
let urlGiphy = `https://api.giphy.com/v1/gifs`;


let actualGifs = [];
let getGifs = async()=>{
    //funcion que replica el save storage de Hover-Active.js
    //fetch
    actualGifs = JSON.parse(localStorage.getItem('myCrearGifs')) || []
    for (let index = 0; index < actualGifs.length; index++) {
        let objetoGif = actualGifs[index].data.id;
        let gifVideo = await getApiCall(`${urlGiphy}/${objetoGif}?api_key=${apikey}`);
        let videoImagen = gifVideo.images.original;
       // console.log(videoImagen);
        //llama a addtodom de API.js linea 20
        addToDOM(videoImagen, containerMisGifos, 'gifs-mis-gifos',objetoGif, gifVideo.images.downsized);
        let iconosTarjeta = document.getElementsByClassName('iconos-tarjeta');
        //console.log(iconosTarjeta.length)
        let iconTrash = document.createElement('img');
    iconTrash.src = "../GIFOS/Imagenes/icon-trash-normal.svg";
    iconTrash.classList.add('iconos-estilo');
    //reemplazo al icono download por el trash
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
       console.log(objetoGif);
       
        let index = actualGifs.findIndex(gif => gif.data.id === objetoGif);
        console.log(index);
        if (index !== -1) {
            console.log("Producto dado de baja");
            actualGifs.splice(index, 1);
        }
        console.log(actualGifs)
        localStorage.setItem('myCrearGifs', JSON.stringify(actualGifs));
        window.location.reload();
    
     
    })
    }
  
}

const getApiCall = async endpoint => {

    try {

        const res = await fetch(endpoint)
        const data = await res.json()
        return data.data

    } catch (error) {

        console.log(error)
    }
}

getGifs();

let button = document.createElement('button');
if(actualGifs.length>0){
    favsinContenido.remove();
    }
    if(actualGifs.length >=12 ){
        
        
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