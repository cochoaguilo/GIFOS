const apikey = "NPIhWo3ADWsyjbibfobo8cILB5N5qVs1";
const urlTrend = `https://api.giphy.com/v1/gifs/trending?api_key=${apikey}&limit=8&rating=g`;
const containerGifs = document.getElementById("container-gifs");
const bloque1 = document.getElementById("bloque1");
let arrayGifs = [];



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
          json.data[index].username,
          json.data[index].images.downsized
        );
       
      }
    })
    .catch((e) => console.error("Falló el fetch", e));
}
trending();



/* funcion que va a imprimir los gifs que vengan desde el fetch
o incluso desde el local storage */
function addToDOM(info, container, clase, name,downsized) {
  //Se crea el container y las imganes dentro
  let nuevoContainer = document.createElement("div");
  let img = document.createElement("img");
  img.setAttribute("src", info.url);
  img.classList.add("estilo-imagenes");
  container.appendChild(nuevoContainer);
  //arrayGifs.push(img);
  nuevoContainer.appendChild(img);

  nuevoContainer.classList.add(clase);
  if (nuevoContainer.className == 'gifs-search') {
    arrayGifs.push(nuevoContainer);
  }
  
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
  iconFav.setAttribute("src", "../GIFOS/Imagenes/icon-fav.svg");
  // anchor con el icono download
  let a = document.createElement("a");
  a.classList.add("iconos-estilo");
  var iconDownload = document.createElement("img");
  iconDownload.setAttribute("src", "../GIFOS/Imagenes/icon-download.svg");
  //icono maximizar
  var iconMax = document.createElement("img");
  iconMax.classList.add("iconos-estilo");
  iconMax.setAttribute("src", "../GIFOS/Imagenes/icon-max-normal.svg");
  //Append
  divIconos.appendChild(iconFav);
  divIconos.appendChild(a);
  a.appendChild(iconDownload);
  divIconos.appendChild(iconMax);

  //hover iconos tarjetas
  iconFav.addEventListener("mouseover", () => {
    iconFav.src = "../GIFOS/Imagenes/icon-fav-hover.svg";
  });

  iconFav.addEventListener("mouseout", () => {
    iconFav.src = "../GIFOS/Imagenes/icon-fav.svg";
  });

  iconFav.addEventListener("click", () => {
    iconFav.src = "../GIFOS/Imagenes/icon-fav-active.svg";
    console.log(info)
    saveGifLocalStorage(info);
    if (clase !=='gifs-search') {
      window.location.reload();
    }
    
    
  });

  iconDownload.addEventListener("mouseover", () => {
    iconDownload.src = "../GIFOS/Imagenes/icon-download-hover.svg";
  });

  iconDownload.addEventListener("mouseout", () => {
    iconDownload.src = "../GIFOS/Imagenes/icon-download.svg";
  });

  iconDownload.addEventListener("click", async() => {
    try{
    let res = await fetch(downsized.url);
    let data = await res.blob();
    
        aModal.href = URL.createObjectURL(data);
        aModal.setAttribute("download", name);
        console.log(data)
      }
      catch(err){ console.log(err + " on downloadGif function")};
  });

  iconMax.addEventListener("mouseover", () => {
    iconMax.src = "../GIFOS/Imagenes/icon-max-hover.svg";
    
  });

  iconMax.addEventListener("mouseout", () => {
    iconMax.src = "../GIFOS/Imagenes/icon-max-normal.svg";
  });
  iconMax.addEventListener("click", () => {
    modal.style.display = "block";
    imagenModal.src = info.url;
  });

  //Creacion del Modal
  let modal = document.createElement('div');
  modal.classList.add('modal')
  let modalContent = document.createElement('div');
  modal.appendChild(modalContent);
  modalContent.classList.add('modal-content')
  let modalBody = document.createElement('div');
  modalContent.appendChild(modalBody);
  modalBody.classList.add('modal-body')
  let IconosModal = document.createElement('div');
  modalContent.appendChild(IconosModal);
  IconosModal.classList.add('iconos-modal')
  let modalFav = document.createElement('img');
  modalFav.src = '../GIFOS/Imagenes/icon-fav.svg';
  let aModal = document.createElement('a');
  let modalDownload = document.createElement('img');
  modalDownload.src = '../GIFOS/Imagenes/icon-download.svg';
  aModal.appendChild(modalDownload);
  aModal.classList.add
  IconosModal.appendChild(modalFav);
  IconosModal.appendChild(aModal);
  let imagenModal = document.createElement('img');
  modalBody.appendChild(imagenModal);
  imagenModal.setAttribute('src', img.url)
  imagenModal.id = 'imagen-modal';
  let closeModal = document.createElement('img');
  closeModal.setAttribute('src', '../GIFOS/Imagenes/close.svg');
  closeModal.id = 'close-modal';
  modalBody.appendChild(closeModal);
  //evento que llama al modal
  img.onclick = function () {
    modal.style.display = "block";
    imagenModal.src = this.src;
  };
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
  nuevoContainer.appendChild(modal);
  
  closeModal.onclick = () =>{
    modal.style.display = "none";
  }

  
  //events que llaman al cklick dentro del modal. Estan declarads linea 152 Hver-active
  //Repiten el proceso que hace la tarjeta
 
  modalFav.addEventListener("click", () => {
    modalFav.src = "../GIFOS/Imagenes/icon-fav-active.svg";
    console.log(img.src)
    saveGifLocalStorage(info);
    if (clase !=='gifs-search') {
      window.location.reload();
    }
    
  });
  modalDownload.addEventListener("click", async() => {
    try{
    let res = await fetch(downsized.url);
    let data = await res.blob();
    
        aModal.href = URL.createObjectURL(data);
        aModal.setAttribute("download", name);
        console.log(data)
      }
      catch(err){ console.log(err + " on downloadGif function")};
  });
}

//termina Trending

