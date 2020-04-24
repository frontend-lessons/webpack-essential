## CAPÍTULO 7: Uso de loaders para assets en webpack.config.js

### CAPÍTULO 7: Antes de empezar
Si aún no has seguido los pasos de los [anteriores capítulos](../README.md#capítulos), sería importante que lo hicieras, especialmente los puntos que se llaman "Antes de empezar", que encontrarás en ellos.  
También resultará imprescindible que te hagas a la idea de qué són los _loaders_ para _webpack_; para ello te recomendamos leer [esta página](https://webpack.js.org/concepts/loaders/).  
Finalmente, ya que vamos a trabajar (indirectamente) con el archivo `webpack.config.js` es necesario que tengas una noción clara sobre qué archivo se trata y cual es su uso. En este último caso, te aconsejamos leer el apartado ["Using a configuration" de la guía "GETTING STARTED"](https://webpack.js.org/guides/getting-started/#using-a-configuration) de la web de _webpack_.

### CAPÍTULO 7: Pasos previos
Si has seguido los pasos del capítulo 6, tendrás tu proyecto listo para iniciar los pasos del presente capítulo. Pero antes, deberás atender a una cuestión importante: **estás usando un proyecto _git_, que está conectado a un repositorio**. Esto te permitirá hacer una entrega de tu trabajo para poderlo conservar y recuperarlo en este estado actual si lo necesitaras en un futuro.  
Por lo tanto, empecemos con algunos pasos previos para asegurar que tu trabajo no corre peligro:


Ejecuta las siguientes acciones con la herramienta _git_:
1. Primero de todo añade todos los archivos de tu proyecto a la entrega que realizarás, con la instrucción:
   ```bash
   git add -A
   ```
1. Acto seguido realiza una entrega de los archivos que dispones, con la instrucción:
   ```bash
   git commit -m "Entrega del capítulo 6"
   ```

Si lo deseas, y sabes cómo puedes llevarlo a cabo, te aconsejamos también que publiques esta entrega en el/los repositorio/s _git_ remoto con el/los que esté conectado tu proyecto.  
Si tu proyecto _git_ está correctamente configurado, te bastará con ejecutar:
```bash
git push
```

### CAPÍTULO 7: Cómo usar loaders para assets CSS en webpack
1. Empecemos con el _loader_ llamado `file-loader`.  
   Para usarlo en el proyecto, instálalo primero con el siguiente comando:
   ```bash
   npm install --save-dev file-loader
   ```
2. En el archvio `webpack.plugins.js` que hay en `config/webpack`, comenta la creación de la instancia de `CopyPlugin`, tal que te quede como sigue:
   ```javascript
   /* new CopyPlugin([
        {
            transformPath: getIncrementalFileName,
            from:'./src/css/img',
            to:'css/img',
            toType:'dir'
        }
   ]), */
   ```
3. En el archivo `style.css` que hay en `src/css` modifica las rutas de las propiedades `background-image` de las tres últimas reglas de estilo para que apunten a archivos de imágenes existentes en la carpeta `src/assets/img`. Por ejemplo algo como:
   ```css
   .emoji.emoji-1 {
     background-image: url('../assets/img/1F601.svg');
   }
   .emoji.emoji-2 {
     background-image: url('../assets/img/1F929.svg');
   }
   .emoji.emoji-3 {
     background-image: url('../assets/img/1F918.svg');
   }
   ```
4. Añade el loader `file-loader` al archivo `webpack.module.js` del siguiente modo, reemplazando `svg` en la expresión regular de la propiedad `test` por la extensión de archivo de tus imágenes:
   ```javascript
   {
     test: /\.svg$/,
     use: [
       {
         loader: 'file-loader',
         options: {
           name: '[contenthash].[ext]',
           outputPath: '/css/img'
         }
       }
     ]
   },
   ```
5. Ejecuta ahora el proceso de empaquetado de _webpack_ con:
   ```
   npx webpack
   ```
 > **Si observas con antención, dentro de la carpeta `css/img` se han creado tres archivos `svg` cuyo nombre es un _hash_, y además estos archivos se usan como `background-image` dentro de las tres últimas reglas**  

6. Prueba ahora a cargar una imagen de forma dinámica desde _javascript_.  
   Empieza añadiendo la siguiente instrucción al principio del archivo `index.js` que hay en `src`:  
   ```javascript
   import WebpackLogo from './assets/img/webpack-logo-on-white-bg.png'
   ```
7. Continua añadiendo el siguiente código al final del mismo archivo:
    ```javascript
    window.addEventListener("DOMContentLoaded", () => {
        let anchor = document.createElement("a")
        let Img = new Image()
        Img.src = WebpackLogo
        Img.setAttribute("alt","Webpack corporative logo")
        anchor.appendChild(Img)
        anchor.href="https://webpack.js.org"
        let logo = document.querySelector("#main #logo")
        document.body.appendChild(logo)
        logo.replaceWith(anchor)
    })
    ```
8. Ahora añade el siguiente bloque en el archivo `index.html` que hay en `src/templates`, y hazlo justo antes de la etiqueta de cierre `</body>`:
    ```html
    <main id="main" class="container">
      <img id="logo" src="" alt="Loading">
    </main>
    ```
9. Como necesitas la imagen que se importa en la instrucción del paso 6, descárgala de la dirección
   https://github.com/webpack/media/blob/master/logo/logo-on-white-bg.png y guardala dentro de la carpeta `src/assets/img` con el nombre `webpack-logo-on-white-bg.png`. Para ello puedes usar el siguiente comando:
   ```
   curl -L -o ./src/assets/img/webpack-logo-on-white-bg.png https://github.com/webpack/media/blob/master/logo/logo-on-white-bg.png 
   ```
10. Adapta la expresión regular de la propiedad `test` de la regla que habías creado en el paso 4 para que esa misma regla afecte al archivo que acabamos de descargar. En nuestro caso, la regla debería quedarte como sigue:
    ```javascript
    {
      test: /\.(png|svg)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[contenthash].[ext]',
            outputPath: '/css/img'
          }
        }
      ]
    },
    ```
11. Ejecuta el proceso de empaquetado con:
    ```bash
    npx webpack
    ```
 > **Podrás observar que se ha creado una nueva imagen en la carpeta `css/img` que hay en `dist`, y que el archivo `main.js` la refiere en su código**. 
 
12. Probaremos a continuación el _loader_ `url-loader`.  
    Para hacerlo, instálalo con el siguiente comando:
    ```bash
    npm install --save-dev url-loader
    ```
13. El _loader_ lo usaremos con la imagen que has descargado en el paso 9, pero además usaremos otra imagen decorativa, en este caso un _spinner_ animado que [hay colgado aquí](https://raw.githubusercontent.com/frontend-lessons/webpack-essential/6a62d35/src/assets/img/spinner.svg) y lo guardaremos en `src/assets/img`. Para logarlo puedes usar el siguiente comando:
    ```bash
    curl -L -o ./src/assets/img/spinner.svg https://raw.githubusercontent.com/frontend-lessons/webpack-essential/6a62d35/src/assets/img/spinner.svg
    ```
14. Como se ha dicho, cargaremos dinámicamente la imagen descargada en el paso 9. Para ello crearemos un archivo llamado `banner-webpack.js` dentro de una nueva carpeta llamada `components` que debes crear en `src`. Para lograrlo puedes usar los siguientes comandos:
    ```bash
    mkdir ./src/components
    touch ./src/components/banner-webpack.js
    ```
15. Añade el siguiente código al archivo `banner-webpack.js`, que preparará una función para la carga demorada de un banner:
    ```javascript
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
    ```
16. Ahora, aprovechando que disponemos de la función `showBanner`, vamos a integrarla dentro del archivo `index.js`.  
    Abre el archivo `index.js` de la carpeta `src` y añádele la siguiente importación de la función `showBanner` al principio del código:
    ```javascript
    import {showBanner} from "./components/banner-webpack"
    ```
17. En el mismo archivo, añade la siguiente llamada a `showBanner` al final del código de la función _arrow_ anómina, que se utiliza como _event handler_ para el evento `DOMContentLoaded`. Ponla  de modo que sea la última instrucción en ejecutarse dentro de dicha función, tal que te quede justo después de `document.body.appendChild(h1)`:
    ```javascript
    window.addEventListener("DOMContentLoaded", () => {
        let h1 = document.createElement("h1")
        h1.innerHTML = "Este es mi primer proyecto <em>webpack</em>!"
        document.body.appendChild(h1)
        showBanner(WebpackLogo,"Webpack corporative logo","https://webpack.js.org","Web oficial de webpack",3000,document.querySelector("#main"))
    }) 
    ```
18. Llegado a este punto, como ya no es necesario todo el código del punto 7, hay que borrarlo, porque dicha función la cubre la llamada a `showBanner`
    Por lo tanto, **elimina** del archivo `index.js` el siguiente bloque de código:
    ```javascript
    window.addEventListener("DOMContentLoaded", () => {
        let anchor = document.createElement("a")
        let Img = new Image()
        Img.src = WebpackLogo
        Img.setAttribute("alt","Webpack corporative logo")
        anchor.appendChild(Img)
        anchor.href="https://webpack.js.org"
        let logo = document.querySelector("#main #logo")
        document.body.appendChild(logo)
        logo.replaceWith(anchor)
    }) 
    ``` 
19. Finalmente, vamos usar el _loader_ instalado. Eso sí, lo haremos de modo _inline_, en la misma importación del logo.
    Modifica la importación de `WebpackLogo` para que quede como sigue:
    ```javascript
    import WebpackLogo from "!!url-loader!./assets/img/webpack-logo-on-white-bg.png" 
    ```
20. Ejecuta el proceso de empaquetado para ver el resultado, con:
    ```bash
    npx webpack
    ```
  > *Si te fijas en la carpeta `dist` ha dejado de haber un archivo `png` que correspondía al logo de _webpack_. Este archivo ha pasado a integrarse dentro del archivo `main.js`, concretamente se asigna a modo de _string_ a la variable `webpack_logo_on_white_bg`*.  
  >   
  > **Nuestro proyecto ya está casi listo para la [**VERSIÓN 7.0**](../../releases/tag/v7.0)!**  
21. En tanto que disponemos de una carga diferida de logo, podemos preparar la plantilla `index.html` para que muestre la imagen de _spinner_. Para ello usaremos el loader `html-loader`. Instálalo con el comando:
    ```bash
    npm install --save-dev html-loader
    ```
22. Modifica ahora el archivo `index.html` que hay en `src/templates` para que incorpore el _spinner_ a partir de su ruta, modificando la etiqueta `<img>` que hay dentro de la etiqueta `<main>`, tal que te quede:
    ```html
    <img id="logo" src="../assets/img/spinner.svg" alt="Loading">
    ```
23. Ahora añade una regla para usar `html-loader` en el archivo `webpack.module.js` que hay en la carpeta `config/webpack`; justo como primer elemento dentro del array `rules`, tal que te quede:
    ```javascript
    rules: [
      {
        test: /\.html/,
        loader: "html-loader"
      },
      {
        test: /\.s?[ac]ss$/,
        use: [MiniCssExtractPlugin.loader,"css-loader","sass-loader"],
      },
      {
        test: /\.(png|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[contenthash].[ext]",
              outputPath: "/css/img/",
            }
          }
        ]
      },
    ]   
    ```
24. Ejecuta el proceso de empaquetado, con:
    ```
    npx webpack
    ``` 

**HEMOS TERMINADO!**  
Si echas un vistazo a tu carpeta `webpack-essential` encontrarás el siguiente contenido:
```
config/
  webpack/
    webpack.module.js
    webpack.optimization.js
    webpack.plugins.js
dist/
  css/
    img/
      <hash-emoji1>.svg
      <hash-emoji1>.svg
      <hash-emoji1>.svg
      <hash-spinner>.svg
    style.[hash].css
  index.html
  main.js
  sitemap.html
node_modules/
package.json
package-lock.json
src/
  assets/
    img/
      <imágenes svg>
      spinner.svg
      webpack-logo-on-white-bg.png
  css/
    img/
      <imagen1.svg>
      <imagen2.svg>
      <imagen3.svg>
    bulma.sass
    style.css
  templates/
    index.html
    sitemap.html
  index.js
webpack.config.js
```

Eso significa que los archivos de configuración de _webpack_: `webpack.config.js`, `webpack.module.js`, `webpack.optimization.js` y `webpack.plugins.js` están correctamente escritos!  
  
**En el siguiente capítulo crearemos _chunks_ para distribuir la carga de recursos y de módulos de código, introduciéndonos en el archivo `webpack.optimization.js`, ¡pero también el archivo `webpack.plugins.js`**!

### CAPÍTULO 7: Resumen
* En el primer paso has instalado un _package_ de _npm_ llamado `file-loader`, que básicamente es un _loader_ de _webpack_ que se usa para capturar los archivos importados durante el proceso de empaquetado y posteriormente determinar un lugar y un modo para escribirlos a un _destino_.  
  Si el concepto _loader_ es algo sobre lo tienes dudas, deberías leer el [apartado _Loaders_](https://webpack.js.org/concepts/#loaders) que hay en la sección "CONCEPTS" en la página oficial de _webpack_.  
  Respecto del _loader_ `file-loader`, encontrarás su documentación en la [página dedicada](https://webpack.js.org/loaders/file-loader/) que hay en la web oficial de _webpack_.

* En el paso número 2, básicamente has invalidado el código del _plugin_ `copy-webpack-plugin`, cuyo propósito era esencialmente el de replicar archivos hacia _destinos_ dentro de la carpeta `dist`, en tanto que estos archivos no estaban siendo importados de otra forma.   
  La [página informativa](https://www.npmjs.com/package/copy-webpack-plugin) del paquete _CopyWebpackPlugin_ contiene una breve referencia sus opciones.

* En el tercer paso, se modifican las rutas de los archivos gráficos usados para decoración _CSS_. Estas rutas correspondían a la carpeta que se había fijado en el uso del _plugin_ `copy-webpack-plugin`, cuando se realizaban los pasos de la [_PARTE FINAL_ del capítulo 5](charpter-05.md#parte-final-mostrando-el-resultado-en-indexhtml).  
  Ahora, el cambio de rutas aplicado implica pasar de rutas absolutas a rutas relativas. De este modo se activa el procesamiento de estos archivos gráficos por el _loader_ `css-loader`, que tratará de importarlos durante el proceso de empaquetado, notificando a _webpack_ y lanzándose el loader adecuado para ello (en este caso `file-loader`).  
  Y es que tal y como se advertía en el [_RESUMEN_ del mismo capítulo 5](charpter-05.md#parte-final-mostrando-el-resultado-en-indexhtml-1), ocurre que:
  > Las rutas absolutas, a diferencia de las relativas (como podría ser `css/img/1.svg`) evitan que el _loader_ `css-loader` (necesario para el funcionamiento del plugin `mini-css-extract-plugin`) indique a _webpack_ que hay que empaquetar esos archivos, tal y como es de ver en [este punto dedicado a la opción `url`](https://webpack.js.org/loaders/css-loader/#url) en la página dedicada al _loader_ `css-loader` que hay en la web oficial de _webpack_.
    
  Ahora que ya cuentas con `file-loader`, ya tiene sentido utilizar rutas relativas, porque serán procesadas por este _loader_ en el proceso de empaquetado.

* En el paso 4 justamente se configura _webpack_ para que el _loader_ que acababas de instalar se use para procesar los archivos gráficos referidos. Para ello se establece en la propiedad `test` una expresión regular que permite detectar los archivos cuya extensión sea `svg` (como es justamente nuestro caso), y por otro lado se utiliza un objeto dentro del _array_ de la propiedad `use` en el que has indicado que debe utilizarse el _loader_ `file-loader` para este tipo de archivos.  
  Para las propiedades `test` y `use` de las _rules_, encontrarás la información de referencia en el [apartado _module_](https://webpack.js.org/configuration/module/) que hay en la sección "CONFIGURATION" de la página oficial de _webpack_. Y concretamente, para el contenido del objeto que se ha utilizado para establecer el loader `file-loader`, cabe aclarar que la propiedad `options` está pensada para contener un objeto que contenga parámetros (opcionales) de funcionamiento del _loader_.  
  Añadir que sobre los parámetros `name` y `outputPath` (que son parámetros específicos para `file-loader`) hallarás documentación en el [apartado _Options_](https://webpack.js.org/loaders/file-loader/#options) que hay en la 
  página dedicada a `file-loader` en la web oficial de _webpack_.

  
* En el paso 5, tras ejecutar el proceso de empaquetado, has logrado que el _loader_ `file-loader` procese los archivos `.svg` identificados dentro de `style.css`, de modo que se han generado copias con un _hash_ por nombre en la carpeta que había especificada en `outputPath`, (que es `dist/css/img`).

* A continuación se inicia una serie de pasos (del 6 al 11) en que se usa otra imagen distinta, eso sí, que se procesa con el mismo _loader_. Lo que ocurre es que en este caso en lugar de hacerlo desde _CSS_, se importa desde código _javascript_. Y es justamente por ello, que en el paso 6 has añadido una instrucción en la que se importa una ruta en el archivo `src/index.js`.  
  Este método de procesamiento de imágenes (mediante `import` en _javascript_) está explicado en [el punto "Loading Images"](https://webpack.js.org/guides/asset-management/#loading-images) que hay en el apartado "Asset Management" que encontrarás en la sección "GUIDE" que hay en la web oficial de _webpack_.

* En el paso 7, has creado un bloque de código que añade un segundo _event handler_ para el evento `DOMContentLoaded`. Este _event handler_ está constituido por una función que crea un objeto `Image` al que le asocia la imagen importada en la instrucción que has añadido en el paso anterior (usando el atributo `src`). Al final de la función se inserta dinámicamente (vía ejecución de _javascript_) en el _DOM_, concretamente en una etiqueta cuyo `id` es "logo" que está anidada dentro de otra etiqueta cuyo `id` es "main".
  
* Por lo tanto, en el paso 8, has creado las etiquetas _html_ que son necesarias para que funcione esta carga dinámica de la imagen, que ha sido importada vía _javascript_.

* En el paso 9 has descargado la imagen que será importada por la instrucción del paso 6.
  
* Para poder procesar la imagen descargada, ha sido necesario añadir una extensión adicional (`png`) a la expresión regular utilizada en la propiedad `test` de la _rule_ que usábamos para `file-loader`. Ello lo has hecho en el paso 10.  
  Y, en el paso 11, has puesto a prueba la carga dinámica de la imagen.

* En el paso 12 has instalado `url-loader`, que es un _package_ de _npm_ con el que se provee a _webpack_ de un nuevo _loader_. Este _loader_ permite reemplazar el uso de rutas a archivos de imagen, por _urls_ de tipo `data:image/*;base64.` cuando la ruta apunta a una archivo de imagen que pueda codificarse.  
  Para el _loader_ `ul-loader`, encontrarás su documentación en la [página dedicada a este _loader_](https://webpack.js.org/loaders/url-loader/) que hay en la web oficial de _webpack_.

* Para probar el uso combinado de ambos _loaders_ (`url-loader` y `file-loader`), se propone utilizar dos imágenes, para que cada una de ellas sea procesada mediante un loader distinto. Así que en el paso 13 has descargado una segunda imagen.

  
* En los pasos 14 y 15, es cuando has creado un archivo _javascript_ con código que nos permite crear y mostrar un banner en una página _html_. Como el archivo es un módulo _javascript_ se cuenta con una función exportada, `showBanner`, que justamente sirve a ese propósito.

* A continuación, en los pasos 16, 17 y 18 has adaptado el código del archivo `index.js` para que use esta función específica para realizar la carga de la imagen con el logo de _webpack_ en el _DOM_.

* Y, para logar la combinación de dos loaders en el procesamiento de imágenes, en el paso 19, se añade una indicación para _webpack_ en el archivo `index.js`. Esta indicación se añade a la ruta de importación de la imagen que ya usábamos como _banner_, y condiciona a que el procesamiento se haga con el nuevo _loader_ `url-loader`.  
  Como habrás observado, previo a la ruta aparece una expresión con el nombre del _loader_ `url-loader`. Este tipo de indicaciones se usan para marcar excepciones a las reglas (_rules_) de _webpack_, para que en lugar de utilizar los _loaders_ que habíamos establecido mediante reglas, se usen aquellos que se indiquen antes de la ruta del archivo a importar.  
  La notación que debe emplearse, está explicada en el [punto llamado "Inline" que hay en el apartado _Loaders_](https://webpack.js.org/concepts/loaders/#inline) que hay en la sección "CONCEPTS" de la web oficial de _webpack_.  
  A modo resumido, debe indicarse un listado de los _loaders_ que quieren emplearse para la importación. Los nombres de los _loaders_ deben separarse con el carácter `!`. 

* En el paso 20 has comprobado el funcionamiento del uso de esta sintaxis _inline_ en la sentencia `import`.

* Una vez comprobado el correcto funcionamiento, has proseguido preparando el entorno para la carga de la nueva imagen (la descargada en el paso 13). Concretamente, en el paso 22 has añadido una referencia a la imagen descargada en el atributo `src` de la etiqueta `<img>` que tenía "logo" por `id`.
  
* Como la referencia a esta imagen está situada en una etiqueta _html_, pero no está en una importación hecha con _javascript_, _JSON_, _CSS_ o _SASS_, necesitaremos un nuevo _loader_ llamado `html-lodader`, que justamente has instalado en el paso 21 y configurado en el paso 23.  
  Y es que _webpack_ es capaz de procesar directamente los archivos que se importen desde código _javascript_ y _JSON_, y también es capaz de procesarlos desde código _CSS_ o _SASS_ gracias a los loaders `css-loader` y `sass-loader`; pero para detectar dentro de código _html_ la presencia de archivos que deben ser procesados, se require un _loader_ específico: `html-loader`.  
  Sobre este _loader_ cabe mencionar que puedes encontrar su documentación de referencia en [esta página dedicada](https://webpack.js.org/loaders/html-loader/) que hay en la web oficial de _webpack_.

* Finalmente, en el paso 24 has probado la solución en que coexistía el procesamiento de archivos de imagen.  
  Por un lado `file-loader`, que generaba réplicas de las imágenes en la carpeta `dist/css/img` utlizando un _hash_ para bautizarlas, y por el otro lado `url-loader` que se había indicado vía _inline_ en la importación del logo de _webpack_. 