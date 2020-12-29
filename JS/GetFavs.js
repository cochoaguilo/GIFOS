const containerFavoritos = document.getElementById("container-favoritos");
const favsinContenido = document.getElementById("fav-sin-contenido");
let iconosTarjeta = document.getElementsByClassName("iconos-tarjeta");

//menu.classList.remove("menu-active");
let actualGifs = [];
let getGifs = (Index,limit) => {
  //funcion que replica el save storage de Hover-Active.js
  actualGifs = JSON.parse(localStorage.getItem("myGifs")) || [];

  for (let index = Index; index < actualGifs.length && index <limit; index++) {
    
    let objetoGif = actualGifs[index];

    //llama a addtodom de API.js linea 20
    addToDOM(
      objetoGif,
      containerFavoritos,
      "gifs-favoritos",
      objetoGif.size,
      objetoGif
    );

    let iconTrash = document.createElement("img");
    iconTrash.src = "../GIFOS/Imagenes/icon-trash-normal.svg";
    iconTrash.classList.add("iconos-estilo");
    //reemplazo al icono fav por el trash

    //console.log(iconosTarjeta[index])

    let loopIcon = iconosTarjeta[index].firstChild;
    iconosTarjeta[index].replaceChild(iconTrash, loopIcon);
    //funciones que llaman a todos los hover y active del trash
    iconTrash.addEventListener("mouseover", () => {
      iconTrash.src = "../GIFOS/Imagenes/icon-trash-hover.svg";
    });

    iconTrash.addEventListener("mouseout", () => {
      iconTrash.src = "../GIFOS/Imagenes/icon-trash-normal.svg";
    });

    iconTrash.addEventListener("click", () => {
      let index = actualGifs.findIndex((gif) => gif.size === objetoGif.size);
      console.log(index);
      if (index !== -1) {
        console.log("Producto dado de baja");
        actualGifs.splice(index, 1);
      }
      console.log(actualGifs);
      localStorage.setItem("myGifs", JSON.stringify(actualGifs));
      window.location.reload();
    });
    let IconosModal = document.getElementsByClassName("iconos-modal");
   
    //saco al icono fav
    let loopModal = IconosModal[index].firstChild;
    loopModal.remove();
    
    
  }
};

getGifs(0,12);

let button = document.createElement("button");
if (actualGifs.length > 0) {
  favsinContenido.remove();
}
if (actualGifs.length >= 12) {
  //actualGifs.splice(12);

  button.innerText = "VER MAS";
  button.classList.add("button-gifs");
  bloque1.appendChild(button);
}

button.addEventListener("click", () => {
  if (actualGifs.length < 24) {
    getGifs(12,24 );
  } else if (actualGifs.length > 24 && actualGifs.length < 36) {
    getGifs(24, 36);
  }
});
