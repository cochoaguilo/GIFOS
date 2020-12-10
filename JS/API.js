const apikey = "NPIhWo3ADWsyjbibfobo8cILB5N5qVs1";
const urlTrend = `https://api.giphy.com/v1/gifs/trending?api_key=${apikey}&limit=8&rating=g`;
const containerGifs = document.getElementById("container-gifs");

function trending() {
  fetch(urlTrend)
    .then((resp) => resp.json())
    .then((json) => {
      for (let index = 0; index < json.data.length; index++) {
        let imagenTrending = json.data[index].images.original;
        addToDOM(
          imagenTrending,
          containerGifs,
          "trending-gifs",
          json.data[index].username
        );
      }
    })
    .catch((e) => console.error("Falló el fetch", e));
}
trending();

let modal = document.getElementById("myModal");
let imagenModal = document.getElementById("imagen-modal");

/* funcion que va a imprimir los gifs que vengan desde el fetch
o incluso desde el local storage */
function addToDOM(info, container, clase, name) {
  //Se crea el container y las imganes dentro
  let nuevoContainer = document.createElement("div");
  let img = document.createElement("img");
  img.setAttribute("src", info.url);
  img.classList.add("estilo-imagenes");
  container.appendChild(nuevoContainer);
  nuevoContainer.appendChild(img);

  nuevoContainer.classList.add(clase);
  //creacion de la tarjeta
  /* todo el codigo siguiente cumple la funcion de crear
    la tarjeta. El hover se hace desde el css*/
  let divFondo = document.createElement("div");
  divFondo.classList.add("bloque-activo");
  nuevoContainer.appendChild(divFondo);
  //container iconos
  let divIconos = document.createElement("div");
  divIconos.classList.add("iconos-tarjeta");
  divFondo.appendChild(divIconos);
  // icono favoritos
  var iconFav = document.createElement("img");
  iconFav.classList.add("iconos-estilo");
  iconFav.setAttribute("src", "../Imagenes/icon-fav.svg");
  // anchor con el icono download
  let a = document.createElement("a");
  a.classList.add("iconos-estilo");
  var iconDownload = document.createElement("img");
  iconDownload.setAttribute("src", "../Imagenes/icon-download.svg");
  //icono maximizar
  var iconMax = document.createElement("img");
  iconMax.classList.add("iconos-estilo");
  iconMax.setAttribute("src", "../Imagenes/icon-max-normal.svg");
  //Append
  divIconos.appendChild(iconFav);
  divIconos.appendChild(a);
  a.appendChild(iconDownload);
  divIconos.appendChild(iconMax);

  //hover iconos tarjetas
  iconFav.addEventListener("mouseover", () => {
    iconFav.src = "../Imagenes/icon-fav-hover.svg";
  });

  iconFav.addEventListener("mouseout", () => {
    iconFav.src = "../Imagenes/icon-fav.svg";
  });

  iconFav.addEventListener("click", () => {
    iconFav.src = "../Imagenes/icon-fav-active.svg";
    console.log(info)
    //saveGifLocalStorage(info);
  });

  iconDownload.addEventListener("mouseover", () => {
    iconDownload.src = "../Imagenes/icon-download-hover.svg";
  });

  iconDownload.addEventListener("mouseout", () => {
    iconDownload.src = "../Imagenes/icon-download.svg";
  });

  iconDownload.addEventListener("click", () => {
    fetch(info.url)
      .then((res) => res.blob())
      .then((data) => {
        a.href = URL.createObjectURL(data);
        a.setAttribute("download", name);
      })
      .catch((err) => console.log(err + " on downloadGif function"));
  });

  iconMax.addEventListener("mouseover", () => {
    iconMax.src = "../Imagenes/icon-max-hover.svg";
  });

  iconMax.addEventListener("mouseout", () => {
    iconMax.src = "../Imagenes/icon-max-normal.svg";
  });
  iconMax.addEventListener("click", () => {
    modal.style.display = "block";
    imagenModal.src = info.url;
  });

  

  //evento que llama al modal
  img.onclick = function () {
    modal.style.display = "block";
    imagenModal.src = this.src;
  };

  
  //events que llaman al cklick dentro del modal. Estan declarads linea 152 Hver-active
  //Repiten el proceso que hace la tarjeta
 /*
  modalFav.addEventListener("click", () => {
    modalFav.src = "../Imagenes/icon-fav-active.svg";
    console.log(img.src)
    //saveGifLocalStorage(info);
  });
  modalDownload.addEventListener("click", () => {
    fetch(info.url)
      .then((res) => res.blob())
      .then((data) => {
        a.href = URL.createObjectURL(data);
        a.setAttribute("download", name);
      })
      .catch((err) => console.log(err + " on downloadGif function"));
  });*/
}

//termina Trending

const containerSearch = document.getElementById("container-search");
const input = document.getElementById("input");

function Busqueda(gifos, limit, i) {
  let urlSearch = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${gifos}&limit=${limit}&offset=20&rating=g&lang=es`;
  fetch(urlSearch)
    .then((resp) => resp.json())
    .then((json) => {
      for (let index = i; index < json.data.length; index++) {
        //imprimo dentro del html los gifs buscados. linea20
        addToDOM(
          json.data[index].images.original,
          containerSearch,
          "gifs-search",
          json.data[index].username
        );
      }
    })
    .catch((err) => console.error("Error", err));
}
const bloque1 = document.getElementById("bloque1");
const trendingText = document.getElementById("trending");

//busqueda icono lupa
iconSearch.addEventListener("click", () => {
  //Primero cambia la imagen de la lupa y su estilo
  let rutaActual = iconSearch.getAttribute("src");
  if (rutaActual == "../Imagenes/icon-search.svg") {
    iconSearch.setAttribute("src", "../Imagenes/close.svg");
    iconSearch.style.width = "16px";
    iconSearch.style.height = "16px";
    Busqueda(input.value, 12, 0); //funcion linea 140
    //cambios de css y html al buscar un gif
    let nombreBusqueda = document.createElement("h4");
    let button = document.createElement("button");
    button.innerText = "VER MAS";
    button.classList.add("button-gifs");
    //Titulo creado a partir de la busqueda
    nombreBusqueda.innerText = input.value;
    nombreBusqueda.classList.add("nombre-busqueda");
    bloque1.insertBefore(nombreBusqueda, containerSearch);
    bloque1.replaceChild(button, trendingText);

    button.addEventListener("click", () => {
      Busqueda(input.value, 24, 12);
    });
    return nombreBusqueda;
  }
  if (rutaActual == "../Imagenes/close.svg") {
    //la lupa vuelve a cambiar
    iconSearch.setAttribute("src", "../Imagenes/icon-search.svg");
    iconSearch.style.height = "20px";
    iconSearch.style.width = "20px";
    input.value = "";
    closeAllLists(); //funcion linea 251
  }
});

//autocompletar el search point

/* Creo elementos de li que se almacenan en un array.
Luego en la funcion autocomplete reemplazo el texto dentro
con los que se generan en evento input keyup */
let recomendados = [];
let form = document.getElementById("form");
let liTags;
for (let i = 0; i <= 3; i++) {
  liTags = document.createElement("li");
  liTags.classList.add("texto-autocomplete");
  recomendados.push(liTags);
}

let urlAutocomplete = `https://api.giphy.com/v1/gifs/search/tags?api_key=${apikey}&limit=5&offset=0&q=`;

function autocomplete() {
  let busqueda = input.value;
  let newUrlAutocomplete = urlAutocomplete + busqueda;
  // Si el input esta vacio, borrar el form y el array recomendados
  if (!input.value) {
    form.classList.remove("form-active");
    for (let index = 0; index <= recomendados.length; index++) {
      form.removeChild(recomendados[index]);
    }

    return false;
  }
  fetch(newUrlAutocomplete)
    .then((resp) => resp.json())
    .then((json) => {
      console.log(json);
      for (let index = 0; index <= recomendados.length - 1; index++) {
        recomendados[index].textContent = json.data[index].name;
        console.log(recomendados[index]);
        refill(recomendados[index]);
      }
    })
    .catch((e) => console.error("Falló el fetch", e));
}
//evento del input

input.addEventListener("keyup", autocomplete);

//function que imprime el nombre y agranda el form
function refill(li) {
  //estilado
  form.classList.add("form-active");
  form.appendChild(li);
  li.addEventListener("click", function (e) {
    input.value = this.innerText;
    //close list autocomplete
    closeAllLists();
  });
  if (!input.value) {
    form.classList.remove("form-active");
  }
}
function closeAllLists(elmnt) {
  let x = document.getElementsByClassName("texto-autocomplete");
  for (let index = 0; index < x.length; index++) {
    if (elmnt != x[index] && elmnt != input.value) {
      form.removeChild(x[index]);
    }
  }
  form.classList.remove("form-active");
}
// modal

let modalClose = document.getElementById("modal-close");

//apretar en cualquier lugar
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
//close modal
function closeModal() {
  modal.style.display = "none";
}

function pruebaModalIMG(prueba){
  
  if ((modal.style.display == 'block') && (imagenModal.src == prueba)) {
    console.log(imagenModal.src)
    /*modalFav.addEventListener("click", () => {
      modalFav.src = "../Imagenes/icon-fav-active.svg";
      console.log(imagenModal.src)
      //saveGifLocalStorage(info);
    });
    modalDownload.addEventListener("click", () => {
      fetch(info.url)
        .then((res) => res.blob())
        .then((data) => {
          a.href = URL.createObjectURL(data);
          a.setAttribute("download", name);
        })
        .catch((err) => console.log(err + " on downloadGif function"));
    });*/
  }
  else{console.log('no se encontro')}
}