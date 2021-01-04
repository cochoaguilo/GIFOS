const containerSearch = document.getElementById("container-search");
const input = document.getElementById("input");
const trendingText = document.getElementById("trending");
const iconSearch = document.getElementById("icon-search");
const iconClose = document.getElementById("icon-close");
let form = document.getElementById("form");
let nombreBusqueda = document.createElement("h4");
let button = document.createElement("button");

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
          json.data[index].username,
          json.data[index].images.downsized
        );
       
      }
      iconSearch.style.display = 'none';
      iconClose.style.display = 'block';
      //close list autocomplete
    form.classList.remove("form-active");
    button.innerText = "VER MAS";
    button.classList.add("button-gifs");
    //Titulo creado a partir de la busqueda
    nombreBusqueda.innerText = input.value;
    nombreBusqueda.classList.add("nombre-busqueda");
    recomendados.forEach(recomendado => recomendado.remove())
    bloque1.removeChild(trendingText)
    bloque1.insertBefore(nombreBusqueda, containerSearch);
    bloque1.appendChild(button);
    return false
    })
    .catch((err) => console.error("Error", err));
}


//busqueda icono lupa


//autocompletar el search point

/* Creo elementos de li que se almacenan en un array.
Luego en la funcion autocomplete reemplazo el texto dentro
con los que se generan en evento input keyup */
let recomendados = [];

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
  iconSearch.style.left = "-68%";
    iconClose.style.display = 'flex';
  // Si el input esta vacio, borrar el form y el array recomendados
  if (!input.value) {
    form.classList.remove("form-active");
    iconSearch.style.display = '';
    iconClose.style.display = 'none';
    iconSearch.style.left = "";
    recomendados.forEach(recomendado => recomendado.remove())
    

    return false;
  }
  fetch(newUrlAutocomplete)
    .then((resp) => resp.json())
    .then((json) => {
      for (let index = 0; index <= recomendados.length - 1; index++) {
        recomendados[index].textContent = json.data[index].name;
        refill(recomendados[index]);
      }
    })
    .catch((e) => console.error("Falló el fetch", e));
}
//evento del input

input.addEventListener("keyup", autocomplete);
input.addEventListener("keyup", function(Event){
  if (Event.key === "Enter") {
    
    console.log('hola');
    //alert('hola');
    ev.preventDefault();
    Busqueda(input.value,12,0);
  }
});

//function que imprime el nombre y agranda el form
function refill(li) {
  //estilado
  form.classList.add("form-active");
  form.appendChild(li);

  li.addEventListener("click", function (e) {
    input.value = this.innerText;
    Busqueda(input.value, 12, 0);
    
    
    /*if (bloque1.firstChild !==nombreBusqueda) {
      bloque1.insertBefore(nombreBusqueda, containerSearch);
      bloque1.replaceChild(button, trendingText);
    }else{
      nombreBusqueda.remove();
      bloque1.replaceChild(trendingText, button);
    }*/
    
  });
  if (!input.value) {
    form.classList.remove("form-active");
    iconSearch.style.display = 'block';
    iconSearch.style.left = "";
    iconClose.style.display = 'none';
    form.removeChild(li)
   
  }
}
button.addEventListener("click", () => {

  let gifsSearch = document.getElementsByClassName("gifs-search");
  let length = gifsSearch.length;
  if (length == 12) {
    Busqueda(input.value, 24, 12);//linea 4
  }else{
    Busqueda(input.value,length +12, length);
  }
  
});

iconSearch.addEventListener("click", () => {
  //Primero cambia la imagen de la lupa y su estilo
    //form.classList.remove("form-active");
    //iconSearch.style.display = 'none';
    //iconClose.style.display = 'block';
    Busqueda(input.value, 12, 0); //funcion linea 4
    //cambios de css y html al buscar un gif
    
    //button.innerText = "VER MAS";
    //button.classList.add("button-gifs");
    //Titulo creado a partir de la busqueda
    //nombreBusqueda.innerText = input.value;
    //nombreBusqueda.classList.add("nombre-busqueda");
    
    //recomendados.forEach(recomendado => recomendado.remove())
    
  
});

iconClose.addEventListener("click", () =>{
  //nombreBusqueda.innerHTML = '';
  form.classList.remove("form-active");
  recomendados.forEach(recomendado => recomendado.remove())
  if (bloque1.lastChild = button) {
    console.log('hola')
    bloque1.replaceChild(trendingText, button);
    arrayGifs.forEach(gif => gif.remove());
    nombreBusqueda.remove();
  }
  /*if (bloque1.firstChild !==nombreBusqueda) {
    bloque1.insertBefore(nombreBusqueda, containerSearch);
    bloque1.replaceChild(button, trendingText);
  }else{
    nombreBusqueda.remove();
    bloque1.replaceChild(trendingText, button);
  }*/
  iconSearch.style.display = '';
  iconClose.style.display = 'none';
  iconSearch.style.left = "";
  input.value = "";
  
  
}) 
