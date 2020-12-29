//Menu hamburgesa
const iconoMenu = document.getElementById("icono-menu");
const menuClose = document.getElementById("menu-close")

iconoMenu.addEventListener("click", modify);
menuClose.addEventListener("click",modify)
//Modifica menu y boton  
function modify(){
  
  rutaActual = menu.getAttribute('class');
  if (rutaActual == "hidden"){
    menu.classList.replace('hidden','menu-active');
  }else {
   
    menu.classList.replace('menu-active','hidden');
  }
  iconoMenu.classList.toggle("hidden")
  menuClose.classList.toggle('hidden')
  
  
}

//Button crear GIFO

const crear_gifo = document.querySelector("#crear-gifo");

crear_gifo.addEventListener("mouseover", () => {
  crear_gifo.src = "Imagenes/CTA-crear-gifo-hover.svg";
});

crear_gifo.addEventListener("mouseout", () => {
  crear_gifo.src = "Imagenes/button-crear-gifo.svg";
});

crear_gifo.addEventListener("click", () => {
  crear_gifo.src = "Imagenes/CTA-crear-gifo-active.svg";
});

//Iconos redes sociales

const twitter = document.getElementById("twitter");
const facebook = document.querySelector("#facebook");
const instagram = document.querySelector("#instagram");

twitter.addEventListener("mouseover", () => {
  twitter.src = "Imagenes/icon-twitter-hover.svg";
});

twitter.addEventListener("mouseout", () => {
  twitter.src = "Imagenes/icon-tw-normal.svg";
});

facebook.addEventListener("mouseover", () => {
  facebook.src = "Imagenes/icon_facebook_hover.svg";
});

facebook.addEventListener("mouseout", () => {
  facebook.src = "Imagenes/icon_facebook.svg";
});

instagram.addEventListener("mouseover", () => {
  instagram.src = "Imagenes/icon_instagram-hover.svg";
});

instagram.addEventListener("mouseout", () => {
  instagram.src = "Imagenes/icon_instagram.svg";
});



//iconos GIFS active y hover



//button slider

const sliderLeft = document.getElementById("slider-left");

sliderLeft.addEventListener("mouseover", () => {
  sliderLeft.src = "Imagenes/button-slider-left-hover.svg";
});
sliderLeft.addEventListener("mouseout", () => {
  let sliderleftDark = sliderLeft.getAttribute("data-theme");
  if (sliderleftDark == "light") {
    sliderLeft.src = "Imagenes/button-slider-left.svg";
  }
  if (sliderleftDark == "dark") {
    sliderLeft.src = "Imagenes/button-slider-left-md-noct.svg";
  }
});

const sliderRight = document.getElementById("slider-right");

sliderRight.addEventListener("mouseover", () => {
  sliderRight.src = "Imagenes/Button-Slider-right-hover.svg";
});
sliderRight.addEventListener("mouseout", () => {
  let sliderrightDark = sliderRight.getAttribute("data-theme");
  if (sliderrightDark == "light") {
    sliderRight.src = "Imagenes/Button-Slider-right.svg";
  }
  if (sliderrightDark == "dark") {
    sliderRight.src = "Imagenes/button-slider-right-md-noct.svg";
  }
});

sliderLeft.addEventListener('click', ()=>{
  
  scroll("izquierda");//llama a la funcion linea 117
  
})
sliderRight.addEventListener('click', ()=>{
  
  scroll("derecha");//llama a la funcion linea 117
  
})
//slide de gifos

function scroll(direccion){
  let scrollAmount = 0;
    const distanceToScroll = 500;
    const step = 10;
    const slideTimer = setInterval(function() {
        if (direccion === "derecha") {
            containerGifs.scrollLeft += step;
        } else {
            containerGifs.scrollLeft -= step;
        }
        scrollAmount += step;
        //si la distancia es menor a 500, se borra el interval
        if (scrollAmount >= distanceToScroll) {
            window.clearInterval(slideTimer);
        }
    }, 10);
}

//guardar mis favoritos, get y set item

function saveGifLocalStorage(gifId){
  
    const actualGifs = JSON.parse(localStorage.getItem('myGifs')) || []
    const newGifs = [...actualGifs, gifId]
    localStorage.setItem('myGifs', JSON.stringify(newGifs))

  

}
