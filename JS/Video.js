//Buttons para grabar
let comenzar = document.getElementById('comenzar');
let grabar = document.getElementById('grabar');
let finalizar = document.getElementById('finalizar');
let subirGifo = document.getElementById('subir_gifo');
let button1 =document.getElementById('button1');
let button2 = document.getElementById('button2');
//DOM de los titulos y los videos
let cajaCamara = document.getElementsByClassName('caja-camara')[0];
let h1 = document.getElementById('h1');
let p1 = document.getElementById('p1');
let p2 = document.getElementById('p2');
let video = document.createElement('video');
let videoGIF = document.createElement('img');
let recorder;
//cambio de texto en la pantalla al clickear Comenzar button
comenzar.addEventListener('click',()=>{
   h1.textContent ='¿Nos das acceso a tu cámara?';
   p1.textContent = 'El acceso a tu cámara será válido sólo';
   p2.textContent = 'por el tiempo en el que estés creando el GIFO.';
   
   button1.style.backgroundColor = "#572EE5";
   button1.style.color = "white";
   
})
//click sobre el button2

button2.addEventListener('click',()=>{
    button2.style.backgroundColor = "#572EE5";
    button2.style.color = "white";
    button1.style.backgroundColor = "white";
    button1.style.color = "#572EE5";
    getStreamAndRecord();
})
//llamado al video recorder
const getStreamAndRecord = async()=> { 
    navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
       height: { ideal: 300, max: 480},
       width: {ideal: 580}
    }
 })
 .then(function(stream){
    
    video.srcObject = stream;
    video.play();
    cajaCamara.append(video);
    cajaCamara.removeChild(h1);
    cajaCamara.removeChild(p1);
    cajaCamara.removeChild(p2);
    comenzar.classList.add('hidden');
   grabar.classList.remove('hidden');
   
   const RecordRTC = {
      type: 'gif',
      frameRate: 1,
      quality: 10,
      width: 360,
      hidden: 240,
      onGifRecordingStarted: function() {
       console.log('started');
     }, 
    };
    recorder = new RecordRTCPromisesHandler(stream, RecordRTC)

    grabar.addEventListener('click', ()=>{
      console.log('listo para grabar');
      recorder.startRecording();
      grabar.classList.add('hidden');
      finalizar.classList.remove('hidden');
   })
   finalizar.addEventListener('click',()=>{
      recorder.stopRecording();
      video.pause();
      video.srcObject = null;
      video.remove();
      console.log(recorder);
     
      stopRecordingCamera();
   })
   
 })
  
}


 const stopRecordingCamera = async () => {

   //video.pause()
   //video.srcObject = null

   //await recorder.stopRecording();
   let blob = await recorder.getBlob();
   console.log(blob);
   //let mediaStream = new MediaStream;
     // mediaStream.getVideoTracks(blob);
      
   let videoURL = window.URL.createObjectURL(blob);
   videoGIF.src = videoURL;
   videoGIF.style.width = '480px';
   videoGIF.style.height = '580px';
   cajaCamara.append(videoGIF);
   finalizar.classList.add('hidden');
   subirGifo.classList.remove('hidden');
   let data = new FormData();
   data.append('file', blob, 'myGif.gif');
   console.log(data.get('file'))
   
   subirGifo.addEventListener('click',()=>{
      const apikey = "NPIhWo3ADWsyjbibfobo8cILB5N5qVs1";
      let uploadGiphy = `https://upload.giphy.com/v1/gifs?api_key=${apikey}`;
      postApiCall(uploadGiphy, data);
      //crearGifoLocalStorage(videoURL)
      
   } )
}

let data;
const postApiCall = async (endpoint, body) => {

   const config = {
       method: 'POST',
       mode: 'cors',
       body: body
   }

   try {

       const res = await fetch(endpoint, config)
         data = await res.json()
       console.log(data);
       
       return data;

   } catch (error) {

       console.log(error)
   }
}

console.log(data)

function crearGifoLocalStorage(gifId){
  
   const actualCrearGifos = JSON.parse(localStorage.getItem('myCrearGifs')) || []
   const newCrearGifos = [...actualCrearGifos, gifId]
   localStorage.setItem('myCrearGifs', JSON.stringify(newCrearGifos))

 

}



