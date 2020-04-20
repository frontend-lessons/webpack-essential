/**
 * Muestra dentro del container y transcurrido el delay marcado,
 * un banner de una imagen enlazada, vaciando todo el contenido del container 
 * @param {string} image fuente de la imagen
 * @param {string} alt texto alternativo para la imagen
 * @param {string} link enlace del banner
 * @param {string} title título del enlace
 * @param {integer} delay tiempo de retraso para la muestra del banner
 * @param {HTMLElement} container 
 */
export function showBanner(image,alt=null,link,title,delay=3000,container=null){
  let promise = new Promise((resolve)=>setTimeout(resolve,delay))
  promise.then(() =>createBanner(image,alt,link,title))
         .then((banner)=>{container.innerHTML=""; container.appendChild(banner)})
}

/**
 * Crea un banner compuesto por una imagen enlazada
 * @param {string} image fuente de la imagen 
 * @param {string} alt 
 * @param {string} link 
 */
function createBanner(image,alt="banner",link, title=link){
  let img = createImage(image,alt) 
  let result = createAnchor(link,title)
  result.appendChild(img)
  return result
}

/**
 * Crea una etiqueta <img>
 * 
 * @param {string} src fuente de datos de la imagen
 * @param {string} alt texto alternativo para la imagen 
 */
function createImage(src,alt="banner"){
  let image = new Image()
  image.src = src
  image.alt = alt
  return image
}

/**
 * Crea una etiqueta <a>
 * 
 * @param {string} link enlace para el atributo href  
 * @param {string} title título del enlace que se muestra en el hover
 */
function createAnchor(link,title=null){
  let anchor = document.createElement("a")
  anchor.href=link
  title && (anchor.title = title)
  return anchor
}