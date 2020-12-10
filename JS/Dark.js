//Modo nocturno

let element = document.body;


function bodyDark() {
  let data_theme = element.getAttribute("data-theme");
  if (data_theme == "light") {
    element.setAttribute("data-theme", "dark");
  } else {
    element.setAttribute("data-theme", "light");
  }
  return data_theme;
}
let modonocturno = document.getElementById('modonocturno');
let liMenu = document.getElementsByClassName('li-menu');
function anchorDark() {
  
    let data_theme = modonocturno.getAttribute("data-theme");
    if (data_theme == "light") {
      for (let index = 0; index < liMenu.length; index++) {
        liMenu[index].setAttribute("data-theme", "dark");
      }
      
      modonocturno.textContent = "Modo Diurno";
    } else {
      for (let index = 0; index < liMenu.length; index++) {
        liMenu[index].setAttribute("data-theme", "light");
      }
      
      modonocturno.textContent = "Modo Nocturno";
    }
  
}

let bloque2 = document.getElementById("bloque2");
function bloque2Dark() {
  let data_theme = bloque2.getAttribute("data-theme");
  if (data_theme == "light") {
    bloque2.setAttribute("data-theme", "dark");
  } else {
    bloque2.setAttribute("data-theme", "light");
  }
}
let logo = document.querySelector("#logo-mobile");

function logoDark() {
  let logoDark = logo.getAttribute("data-theme");
  if (logoDark == "light") {
    logo.getAttribute("src");
    logo.setAttribute("src", "../Imagenes/logo-mobile-modo-noct.svg");
    logo.setAttribute("data-theme", "dark");
  }
  if (logoDark == "dark") {
    logo.setAttribute("data-theme", "light");
    logo.setAttribute("src", "../Imagenes/logo-mobile.svg");
  }
}

const menu = document.querySelector("#menu");
function menuDark() {
  let menuDark = menu.getAttribute("data-theme");
  if (menuDark == "light") {
    menu.setAttribute("data-theme", "dark");
  } else {
    menu.setAttribute("data-theme", "light");
  }
}

function sliderleftDark() {
  let sliderleftDark = sliderLeft.getAttribute("data-theme");
  if (sliderleftDark == "light") {
    sliderLeft.getAttribute("src");
    sliderLeft.setAttribute(
      "src",
      "../Imagenes/button-slider-left-md-noct.svg"
    );
    sliderLeft.setAttribute("data-theme", "dark");
  }
  if (sliderleftDark == "dark") {
    sliderLeft.setAttribute("data-theme", "light");
    sliderLeft.setAttribute("src", "../Imagenes/button-slider-left.svg");
  }
}
function sliderrightDark() {
  let sliderrightDark = sliderRight.getAttribute("data-theme");
  if (sliderrightDark == "light") {
    sliderRight.getAttribute("src");
    sliderRight.setAttribute(
      "src",
      "../Imagenes/button-slider-right-md-noct.svg"
    );
    sliderRight.setAttribute("data-theme", "dark");
  }
  if (sliderrightDark == "dark") {
    sliderRight.setAttribute("data-theme", "light");
    sliderRight.setAttribute("src", "../Imagenes/button-Slider-right.svg");
  }
}
const footer = document.getElementsByTagName("footer");
function footerDark() {
  let footerDark = footer[0].getAttribute("data-theme");
  if (footerDark == "light") {
    footer[0].setAttribute("data-theme", "dark");
  } else {
    footer[0].setAttribute("data-theme", "light");
  }
}

let menuBtn = document.querySelector("#icono-menu");
function burgerDark() {
  let burgerDark = menuBtn.getAttribute("data-theme");
  if (burgerDark == "light" || rutaActual == "../Imagenes/close.svg") {
    menuBtn.setAttribute("src", "../Imagenes/close-modo-noct.svg");
    /*menuBtn.removeAttribute('data-theme');*/
  }
  /*if(!(menuBtn.hasAttribute('data-theme'))){
    menuBtn.setAttribute('src', 'Imagenes/burger.svg');
  }*/
}

function darkMode() {
  bodyDark();
  logoDark();
  burgerDark();
  bloque2Dark();
  footerDark();
  menuDark();
  sliderleftDark();
  sliderrightDark();
  anchorDark();
}

modonocturno.addEventListener("click", darkMode);
