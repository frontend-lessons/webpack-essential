## CAPÍTULO 5: Uso combinado de plugins en webpack.config.js

### CAPÍTULO 5: Antes de empezar
Si aún no has seguido los pasos de los [anteriores capítulos](../README.md#capítulos), sería importante que lo hicieras, especialmente los puntos que se llaman "Antes de empezar", que encontrarás en ellos.  
También resultará imprescindible que te hagas a la idea de qué són los _plugins_ para _webpack_; para ello te recomendamos leer [esta página](https://webpack.js.org/concepts/plugins/).  
Finalmente, ya que vamos a trabajar (indirectamente) con el archivo `webpack.config.js` es necesario que tengas una noción clara sobre qué archivo se trata y cual es su uso. En este último caso, te aconsejamos leer el apartado ["Using a configuration" de la guía "GETTING STARTED"](https://webpack.js.org/guides/getting-started/#using-a-configuration) de la web de _webpack_.

### CAPÍTULO 5: Pasos previos
Si has seguido los pasos del capítulo 4, tendrás tu proyecto listo para iniciar los pasos del presente capítulo. Pero antes, deberás atender a una cuestión importante: **estás usando un proyecto _git_, que está conectado a un repositorio**. Esto te permitirá hacer una entrega de tu trabajo para poderlo conservar y recuperarlo en este estado actual si lo necesitaras en un futuro.  
Por lo tanto, empecemos con algunos pasos previos para asegurar que tu trabajo no corre peligro:


Ejecuta las siguientes acciones con la herramienta _git_:
1. Primero de todo añade todos los archivos de tu proyecto a la entrega que realizarás, con la instrucción:
   ```bash
   git add -A
   ```
1. Acto seguido realiza una entrega de los archivos que dispones, con la instrucción:
   ```bash
   git commit -m "Entrega del capítulo 4"
   ```

Si lo deseas, y sabes cómo puedes llevarlo a cabo, te aconsejamos también que publiques esta entrega en el/los repositorio/s _git_ remoto con el/los que esté conectado tu proyecto.  
Si tu proyecto _git_ está correctamente configurado, te bastará con ejecutar:
```
git push
```

### CAPÍTULO 5: Cómo usar plugins en webpack
 #### PARTE 1: Inyectando javascript con HtmlWebpackPlugin
1. Abre el archivo `index.html` que hay en `webpack-essential`, y eliminale la línea que contiene esta etiqueta:
   ```html
   <script defer src="dist/main.js"></script>
   ```
2. Ejecuta el proceso de empaquetado de webpack, con:
   ```bash
   npx webpack
   ```  

 > *Como cabía esperar, el archivo `index.html` dentro de la carpeta `dist` es una copia exacta del archivo `index.html` que hay en la carpeta principal del proyecto (`webpack-essential`)*.    

3. Invierte el valor de la propiedad `injected` del archivo `webpack.plugins.js` que hay en la carpeta `config/webpack`, para que la creación de la instancia `HtmlWebpackPlugin` contenga las siguientes opciones:
   ```javascript
   module.exports = [
      ...
      new HtmlWebpackPlugin({
         template: 'index.html',
         inject: true,
         minify: false
      })
   ]
   ```

4. Ejecuta nuevamente el proceso de empaquetado de webpack, con:
   ```bash
   npx webpack
   ```
   
 > **Verás que ahora el archivo `index.html` dentro de la carpeta `dist` ya no es una copia exacta del archivo `index.html` que hay en la carpeta principal del proyecto (`webpack-essential`)**.  
 > **El primer archivo, que se ha regenerado con el proceso de empaquetado, contiene una etiqueta `<script>` al final de body**.  
    
 #### PARTE 2: Creando múltiples páginas HTML con HtmlWebpackPlugin
5. Crea ahora una carpeta llamada `templates` dentro de la carpeta `src`. Puedes usar la siguiente instrucción para ello:
   ```bash
   mkdir ./src/templates
   ```

6. Mueve el archivo `index.html` que hay en la carpeta _raíz_ del proyecto (`webpack-essential`) dentro de esta carpeta que acabas de crear (`src/templates`). Para ello te recomendamos usar la siguiente instrucción de _git_:
   ```bash
   git mv ./index.html ./src/templates/index.html
   ```

7. Crea ahora una copia del archivo `index.html` que hay en la carpeta `src/templates` y ponle de nombre `sitemap.html`. Puedes usar la siguiente instrucción para ello:
   ```bash
   cp ./src/templates/index.html ./src/templates/sitemap.html
   ```

8. Modifica la opción `template` del plugin `HtmlWebpackPlugin` que se usa en el archivo `webpack.plugins.js` para que quede como sigue (incluida la coma del final):
   ```javascript
   new HtmlWebpackPlugin({
      template: 'src/templates/index.html',
      inject: true,
      minify: false
   }),
   ```
9. Modifica el archivo `webpack.plugins.js`, y añade este código al continuación del código creado en el anterior punto (justo como elemento último del array que está asignado a `module.exports`):
   ```javascript
   new HtmlWebpackPlugin({
      template: "src/templates/sitemap.html",
      filename: "sitemap.html",
      inject: true,
      minify: false
   })
   ```
0. Ejecuta nuevamente el proceso de empaquetado, con:
    ```bash
    npx webpack
    ```  
   
 > **Como podrás observar, hay un nuevo archivo llamado `sitemap.html` justo en el directorio `dist`**.  

 #### PARTE 3: Importando CSS con MiniCSSExtractPlugin e inyectándolo con HtmlWebpackPlugin
11. Instala ahora, con el siguiente comando, el _framework CSS_ llamado `bulma` (que justamente se usa como hoja de estilos en el archivo `index.html` que hay en `src/templates`):
    ```bash
    npm install --save bulma
    ```

2. Elimina la siguiente etiqueta en los archivos `index.html` y `sitemap.html` que hay en la carpeta `src/templates`:
   ```html
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.8.1/css/bulma.min.css" integrity="sha256-1nEaE91OpXJD7M6W5uSiqxhdmrY+lOOTHC1iUxU9Pds=" crossorigin="anonymous" />
   ```

3. Al principio del archivo `index.js` que hay en la carpeta `src`, añade la siguiente instrucción: 
   ```javascript
   import 'bulma/css/bulma.min.css';
   ```   

4. Ahora instala el _plugin_ `mini-css-extract-plugin` mediante el siguiente comando:
   ```bash
   npm install --save-dev mini-css-extract-plugin
   ``` 
5. Añade la siguiente línea al principio del archivo `webpack.plugins.js`
   ```javascript
   const MiniCssExtractPlugin = require('mini-css-extract-plugin');
   ```
6. Ahora añade en el mismo fichero `webpack.plugins.js`, la creación instancia de este plugin en medio del array de plugins (junsto antes de la primera instancia de `HtmlWebpackPlugin`), y usa las opciones de creación del siguiente bloque:
   ```bash
   new MiniCssExtractPlugin({
      filename: 'css/bulma.[hash].css'
   }),
   ```   
7. Ahora necesitarás instalar el package `css-loader`, que, a diferencia de los anteriores paquetes, se trata de un _loader_.
   Para ello deberás ejecutar:
   ```bash
   npm install --save-dev css-loader
   ```
8. Abre ahora el archivo `webpack.module.js` y añade al principio la siguiente línea de código:
   ```javascript
   const MiniCssExtractPlugin = require('mini-css-extract-plugin');
   ```
9. En ese mismo fichero, añade ahora al final del objeto exportado (`module.exports`) la propiedad `rules`, con los valores que propone este fragmento de código:
   ```javascript
   rules: [
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader,'css-loader'],
        },
    ]
   ```
0. Ejecuta el empaquetado de webpack con:
   ```bash
   npx webpack
   ```  

 > **Verás que, dentro de la carpeta `dist/css`, se ha creado un nuevo archivo llamado `bulma.[hash].css` (donde `[hash]` es un valor de tipo _hash_ generado por webpack)**.  
 > **Además, si te fijas en los archivos `index.html` y `sitemap.html` que hay en la carpeta `dist`, ahora incluyen este primer archivo como hoja de estilos mediante una etiqueta `<link>`**.  
 
 #### PARTE 4: Combinando archivos CSS con MiniCSSExtractPlugin e inyectándolos con HtmlWebpackPlugin
21. Visto que se genera un archivo `bulma.[hash].css` por la instrucción del paso 13, procedamos con el archivo `style.css`, sustituyendo el archivo que habías generado mediante réplica con el plugin `copy-webpack-plugin`, añade ahora la siguiente instrucción tras el primer `import` que hay en el archivo `index.js` de la carpeta `src`:
    ```javascript
    import './css/style.css`;
    ```

2. Elimina la etiqueta `<link>` que hay en los archivos `index.html` y `sitemap.html` de la carpeta `src/templates` que apunta a la hoja de estilos `dist/css/style.[hash].css`:
   ```html
   <link rel="stylesheet" href="dist/css/style.17b707910e897f3e7a428f4b4d780941.css">
   ```
3. Ahora elimina el bloque siguiente del archivo `webpack.plugins.js`, que hay en la carpeta `config/webpack`:
   ```javascript
   new CopyPlugin(
    [
        {
          from:'./src/css',
          to:'css/[name].[hash].[ext]'
        }
    ]),
   ```
4. Y para terminar, modifica `bulma` por `style` en la opción `filename` que se usa en la creación de la instancia `MiniCssExtractPlugin` del mismo fichero `webpack.plugins.js`. La creación de la instancia debería quedarte como sigue:
   ```javascript
   new MiniCssExtractPlugin({
       filename: 'css/style.[hash].css'
   }),
   ```
5. Ya puedes lanzar el empaquetado de _webpack_, con:
   ```bash
   npx webpack
   ```

 > **Verás que a los archivos `index.html` y `sitemap.html` que hay en la carpeta `dist` les ha cambiado el valor del atributo `href` de la etiqueta `<link>` que había en `<head>`**.  
 >  
 > **La anterior hoja de estilos llamada `bulma.[hash].css` es ahora `style.[hash].css`**.  
 > **Aunque lo realmente interesante es que esta hoja de estilos contiene el código de ambos archivos originales _CSS_ (`style.css` y `bulma.css`), y está ordenado tal como los hemos importado en `index.js`, pero a su vez, está correctamente formado (con el `@import` de `style.css` como primera línea aunque el contenido del archivo deba ir a continuación del de `bulma.css`)**.  
 > 
 > **Nuestro proyecto ya está casi listo para la [**VERSIÓN 5.0**](../../releases/tag/v5.0)!**  
    
 #### PARTE 5: Copiando imágenes para CSS con CopyWebpackPlugin
26. Como cierre, recuperaremos el uso del plugin `copy-webpack-plugin`.  
    Para ello crea una carpeta llamada `img` dentro de una nueva carpeta llamada `assets` dentro de la carpeta `src`. Puedes usar la siguiente instrucción:
    ```bash
    mkdir -p ./src/assets/img
    ```
7. Ahora descarga en esta carpeta imágenes que puedan servir como _emojis_; **un mínimo de 3 y que tengan todas la misma extensión de archivo**.  
   Por ejemplo, puedes descargar y descomprimir un zip con emojis del proyecto _openmoji_. Usa las siguientes instrucciones para seguir el ejemplo propuesto:
   ```bash
   curl -L -o ./src/assets/img/emoji.zip https://github.com/hfg-gmuend/openmoji/releases/latest/download/openmoji-svg-color.zip \
   && unzip -d ./src/assets/img ./src/assets/img/emoji.zip \
   && rm ./src/assets/img/emoji.zip
   ```
8. Crea una carpeta llamada `img` dentro de la carpeta `css` que hay en `src`, y copia en ella tres de las imágenes en ella.  
   Para el caso del ejemplo anterior, puedes usar la siguiente instrucción:
   ```bash
   mkdir -p ./src/css/img
   cp ./src/assets/img/{1F601,1F929,1F918}.svg ./src/css/img/
   ```
9. Añade ahora el siguiente bloque de código al archivo `webpack.plugins.js`, justo después del bloque de instrucciones en que se definen constantes que se inicializan usando la función `require`:
   ```javascript
   const path = require('path');
   const getIncrementalFileName = function(targetPath,absolutePath){
       getIncrementalFileName.offset++
       let extension = path.extname(targetPath)
       let target_dir = path.dirname(targetPath)
       return path.join(target_dir,getIncrementalFileName.offset.toString()+extension)
   }
   getIncrementalFileName.offset = 0;
   ```

0. Continúa añadiendo la siguiente creación de una instancia de `CopyPlugin`. Hazlo justo tras la instancia de `CleanWebpackPlugin` del siguiente modo:
   ```javascript
   new CopyPlugin([
      {
         transformPath: getIncrementalFileName,
         from:'./src/css/img',
         to:'css/img',
         toType:'dir'
      }
   ]),
   ```

1. Prueba el funcionamiento de `copy-webpak-plugin` ejecutando el proceso de empaquetado, con:
   ```
   npx webpack
   ```

> **Como podrás observar se ha creado una nueva carpeta llamada `img` dentro de la carpeta `css` que hay en `dist`. Y efectivamente, en la carpeta `img` se hallan las tres imágenes que se habían elegido en el paso 28, aunque con su nombre modificado. En lugar de tener su nombre original, su nombre (sin la extensión de archivo) es un número entre el 1 y el 3**. 

 #### PARTE FINAL: Mostrando el resultado en index.html
32. En tanto que hemos logrado crear un sistema que copia las imágenes seleccionadas numerándolas a partir del número 1, podemos desarrollar reglas _CSS_ que se sustenten en esa premisa. 
    Entonces, puedes crear las siguientes reglas _CSS_ al final del archivo `style.css` que hay en la carpeta `css` dentro de la carpeta `src`.  
    Pero cuidado, **en las tres últimas reglas tendrás que emplear, en lugar de `svg` la extensión de archivo correspondiente a las imágenes _emoji_ que hubieras descargado en el paso 27**:
    ```css
    .emoji {
      display: inline-block;
      width: 4em;
      height: 4em;
    }
    .emoji.emoji-1 {
      background-image: url('/css/img/1.svg');
    }
    .emoji.emoji-2 {
      background-image: url('/css/img/2.svg');
    }
    .emoji.emoji-3 {
      background-image: url('/css/img/3.svg');
    }
    ```
3. Y a continuación, modifica el archivo `index.html` que hay en la carpeta `templates`, dentro de la carpeta `src` para que use los estilos proporcionados tanto por _bulma_ como los del paso anterior. Para ello reemplaza la etiqueta `<body>` con el siguiente contenido:
   ```html
   <body class="has-text-centered">
       <div class="columns">
       <div class="column"><span class="emoji emoji-1"></span></div>
           <div class="column"><span class="emoji emoji-2"></span></div>
           <div class="column"><span class="emoji emoji-3"></span></div>
       </div> 
   </body>
   ```
4. Finalmente, observa el resultado del trabajo combinado empaquetando el proyecto de nuevo, con:
   ```
   npx webpack
   ```

Si sabes "servir" la carpeta `dist` a través de un servidor web y te conectas a ella mediante un navegador, deberás observar una página (`index.html`) con tres imágenes alineadas y el mensaje "Este es mi primer proyecto _webpack_!".

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
      1.svg
      2.svg
      3.svg
    style.[hash].css
  index.html
  main.js
  sitemap.html
index.html
node_modules/
package.json
package-lock.json
src/
  assets/
    img/
      <imágenes>
  css/
    img/
      <imagen1.svg>
      <imagen2.svg>
      <imagen3.svg>
    style.css
  templates/
    index.html
    sitemap.html
  index.js
webpack.config.js
```

Eso significa que los archivos de configuración de _webpack_: `webpack.config.js`, `webpack.module.js`, `webpack.optimization.js` y `webpack.plugins.js` están correctamente escritos!  
  
**En el siguiente capítulo nos adentraremos en el concepto de _loader_ modificando el archivo `webpack.module.js`**.

### CAPÍTULO 5: Resumen
#### PARTE 1: Inyectando javascript con HtmlWebpackPlugin
* En los pasos del 1 al 4 has eliminado  etiqueta `<script>` del archivo `index.html`, que es el archivo que se utilizaba como plantilla para que `html-webpack-plugin` generara el archivo `index.html` en la carpeta `dist`. El motivo de la eliminación se esconde en la opción `inject`, que se pasa a la creación de la instancia del _plugin_ en el archivo `webpack.plugin.js`.  
  
  Cuando esta opción está activada (valor `true`), el _plugin_ añade al final de `<body>` una etiqueta `<script>` con el atributo `src` apuntando a `main.js`.  
    
  Puedes leer sobre este comportamiento en la [sección dedicada a las opciones](https://github.com/jantimon/html-webpack-plugin#options) de la página de _html-webpack-plugin_.

#### PARTE 2: Creando múltiples páginas HTML con HtmlWebpackPlugin
* En los pasos 5 y 6 has definido una carpeta específica para almacenar _templates_ (plantillas) para el plugin `html-webpack-plugin`, que son básicamente documentos (mayoritariamente escritos en _HTML_) que se usan como molde para crear páginas dentro de la carpeta `dist`. Es por eso que el archivo `index.html`, en tanto que venía usándose como `template`, se ha movido dentro de esta carpeta (`src/templates`).  
  Puedes leer sobre esta opción (`template`) en la [sección dedicada a las opciones](https://github.com/jantimon/html-webpack-plugin#options) de la página del plugin.  

* Gracias al planteamiento anterior, en los siguientes 5 pasos hemos definido una nueva plantilla (`sitemap.html`) en la carpeta `src/templates`, y hemos creado una  segunda instancia del _plugin_ `html-webpack-plugin`, para que se encargue de generar un archivo _HTML_ en la carpeta `dist` usando esta nueva plantilla.

#### PARTE 3: Importando CSS con MiniCSSExtractPlugin e inyectándolo con HtmlWebpackPlugin
* En los pasos 11 y 12 has instalado en tu proyecto el framework _CSS_ llamado "bulma" a modo de _package_ de _npm_, para así  renunciar a cargarlo usando la etiqueta `<link>` en las _templates_.
  Para saber mas sobre el package `bulma`, puedes visitar [esta página](https://www.npmjs.com/package/bulma).

* En el paso 13 has importado el archivo `bulma.min.css` (vía `import` de javascript), desde el archivo `index.js`. Para ello has localizado el archivo _CSS_ dentro del _package_ `bulma` que se ha creado dentro de la carpeta `node_modules`.  
  Como se explicaba en [una de las lecturas recomendadas](https://docs.npmjs.com/downloading-and-installing-packages-locally) que aparecían  en [el resumen del primer capítulo](charpter-01.md#capítulo-1-resumen), al instalar un _package_ de _npm_ se despliega el contenido de este package en una nueva carpeta (llamada como el _package_) que se crea dentro de `node_modules`.  
  De hecho, a tenor de [las aclaraciones sobre las reglas de resolución de la cláucula `import`](https://webpack.js.org/concepts/module-resolution/) que hay en la sección "CONCEPTS" de la web official de _webpack_, la importación de archivos de la aplicación debe procederse con rutas relativas, mientras que las rutas absolutas se resolverán hacia la carpeta `node_modules`.  
    
  Esta "política" de resolución de importaciones, debería resultarte familiar si has trabajado con _NodeJS_, en tanto que no difiere de [la política que utiliza _NodeJS_ en su resolución de importaciones](https://nodejs.org/api/esm.html#esm_import_statements).

* En el paso 14 has instalado el _plugin_ `mini-css-extract-plugin` como _package_ de _npm_.  
  Como se explica en [esta página](https://webpack.js.org/plugins/mini-css-extract-plugin/), este _plugin_ se usa para crear archivos que contengan el código _CSS_ que se haya importado _vía javascript_ en los módulos de la aplicación. 

* En los subsiguientes pasos (15 y 16) lo que has hecho es usar este plugin en _webpack_, primero importándolo mediante la función `require` y luego instanciándolo en el array de _plugins_.  
  Habrás visto que, en la instanciación del _plugin_, se usa una opción llamada `filename`, y aunque esta opción no está explícitamente documentada, en los snippets que encontramos en el [apartado llamado "Options"](https://webpack.js.org/plugins/mini-css-extract-plugin/#options) de la página dedicada a este _plugin_, vemos **un comentario de código relevante** que nos permite indagar sobre el uso de la opción `filename`:
    
  ```javascript
  new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
  }),
  ```  
  Por lo tanto cabe suponer que el uso de esta opción tendrá un uso equivalente a la opción `filename` de la sección `output` (perteneciente a la configuración general de _webpack_).  
    
  Y en efecto, en la documentación de _webpack_ encontramos un [apartado dedicado a `filename`](https://webpack.js.org/configuration/output/#outputfilename), que nos aclara:

  > This option determines the name of each output bundle. The bundle is written to the directory specified by the `output.path` option.

  Entonces, hay que asumir que el nombre de archivo indicado en `filename` será usado como pauta de creación del nombre del archivo que creará `mini-css-extract-plugin` con todo el código _CSS_ importado.

* En los pasos 17, 18 y 19, por exigencia del _plugin_ `mini-css-extract-plugin` hemos tenido que instalar, importar y configurar un _loader_ que permitirá importar correctamente el código _CSS_ desde el archivo `index.js` para que el _plugin_ pueda procesarlo.  
  El concepto _loader_ se explica en un [apartado llamado "Loaders"](https://webpack.js.org/concepts/#loaders) de la sección "CONCEPTS" que se halla en la página oficial de _webpack_, y de hecho en el [siguiente capítulo](charpter-05.md) se abarcará con más detalle.

* En el paso 20, se ejecuta el proceso de empaquetado en el que se crea un archivo _CSS_ cuyo nombre se basa en la pauta marcada en la opción `filename` fijada en el paso 16.  
  Además, en este paso es cuando sale a relucir que el _plugin_ `html-webpack-plugin` es el responsable de reponer la etiqueta `<link>` que habíamos retirado en el paso 12.  
  Esta capacidad del plugin `html-webpack-plugin` se explica en el [punto "Basic usage"](https://webpack.js.org/plugins/html-webpack-plugin/#basic-usage) de la página dedicada a este plugin en la web oficial de _webpack_, del siguiente modo:
    
  > If you have any CSS assets in webpack's output (for example, CSS extracted with the [MiniCssExtractPlugin](https://webpack.js.org/plugins/mini-css-extract-plugin/)) then these will be included with `<link>` tags in the `<head>` element of generated HTML.

#### PARTE 4: Combinando archivos CSS con MiniCSSExtractPlugin e inyectándolos con HtmlWebpackPlugin
* En los paso 21 y 22 se aprovecha la incoporación del _plugin_ `mini-css-extract-plugin` para operar con el archivo `style.css` del mismo modo a como se ha hecho en la parte 3 con el archivo `bulma.min.css`. Es por ello que se elimina la etiqueta `<link>`. Esta etiqueta será repuesta por `html-webpack-plugin` cuando lancemos el proceso de empaquetado.
  
* Justamente porque el plugin `mini-css-extract-plugin` se encargará de recoger el código _CSS_ que importemos en los módulos _javascript_ de nuestra aplicación, ya no será necesario usar el plugin `copy-webpack-plugin` para copiar los archivos _CSS_ a la carpeta `dist`, ya que ahora los importaremos con `import`.  
Y es justamente por eso que en el paso 23 se insta a eliminar la instancia `CopyPlugin` del array de `plugins` que se expone en el archivo `webpack.plugins.js`.
  
* Tal como se nos indica en la cabecera de la página dedicada al plugin `mini-css-extract-plugin` que hay en la web oficial de _webpack_ ocurre que:

  > This plugin extracts CSS into separate files. **It creates a CSS file per JS file which contains CSS**. It supports On-Demand-Loading of CSS and SourceMap
    
  Aplicado a nuestro caso, significa que, por cada _entry point_ (punto de entrada) de nuestra aplicación, se creará un archivo _CSS_ que unirá todo el código _CSS_ que se haya importado via _javascript_.  
  Cabe aclarar que solo tenemos un único "punto de entrada" para _webpack_, en este caso el archivo `index.js`. Y es por ello que cabe esperar que si desde este archivo se realizan dos importaciones de código _CSS_, el código será reunido por `mini-css-extract-plugin` en un único archivo.  
  De lo anterior parte el paso 24 en que has cambiado el nombre del archivo _CSS_, para que en lugar de `bulma` use un nombre más acorde al contenido que reunirá, como en este caso `style`.

* Y es así como en el paso 25 al ejecutar el proceso de empaquetado, se ve como se cumple lo prometido, y aparece el archivo `style.[hash].css` que es enlazado mediante una etiqueta `<link>` en los archivos `index.html` y `sitemap.html`

#### PARTE 5: Copiando imágenes para CSS con CopyWebpackPlugin
* Para que la potencia de todos los plugins combinados tenga efecto, en el punto 30 se rescata el _plugin_ `copy-webpack-plugin` (que se había desechado en el paso 23), y que justifica los pasos anteriores (del 26 al 29).  
  Para que este _plugin_ opere con archivos que se usen en el proyecto, se le especifican cuatro opciones: `transformPath`, `from`, `to` y `toType`.  
    
  Todas estas opciones se listan en el [punto "Options"](https://webpack.js.org/plugins/copy-webpack-plugin/#options) que hay en la página dedicada a este plugin en la web oficial de _webpack_. El listado en sí es un índice que conduce a otros puntos en que se detallan dichas opciones.  
  Para aclarar brevemente, cabe decir que la opción `from` determina la ruta absoluta, o alternativamente la ruta relativa al _context_ de _webpack_, en la que se encuentran los archivos que el _plugin_ va a copiar a un _destino_ y que este _destino_ se fija justamente con la opción `to`, en la que indicamos la ruta relativa al `path` de _webpack_, y que en nuestro caso es la carpeta `dist`. Por otro lado la opción `toType` ayuda a especificar qué tipo de _destino_ se está usando, dado que tanto puede ser un archivo como una carpeta. Es por ello que se asigna el valor `'dir'`. Finalmente, la opción `transformPath` nos permite modificar el nombre de los archivos una vez copiados. Esta opción deberá recibir como valor una función que retorne un _String_ con el nombre a asignar al archivo que haya sido copiado en ese momento.  
    
  En cuanto a los conceptos _context_ y _path_ de _webpack_, estos corresponden a opciones de la configuración de _webpack_, que están documentados en [esta página](https://webpack.js.org/configuration/entry-context/) y en [esta otra](https://webpack.js.org/configuration/output/#outputpath), respectivamente.
  
* Para proveer de contenido la acción del plugin `copy-webpack-plugin` se proponen los pasos previos al paso 30. En los pasos 26, 27 y 28 se crea contenido a modo de imágenes, de entre las cuales se seleccionará una muestra para colocarse en la carpeta fijada en la opción `from` del plugin `copy-webpack-plugin`.
  
* Tras la selección de la muestra, en el paso 29 se desarrolla la función `getIncrementalFilename` que se utilizará para generar números succesivos que puedan emplearse para nombrar los archivos copiados por `copy-webpack-plugin`. Es por ello que esta función se asigna a la opción `transformPath`.
  
* Finalmente, en el punto 31, se pone a prueba la copia y renombramiento de los archivos tomados como muestra ejecutando el proceso de empaquetado.

#### PARTE FINAL: Mostrando el resultado en index.html
* En el paso 32 has creado reglas _CSS_ que aprovecharán los archivos copiados en la parte 5, ahora que sus nombres son predictibles ('1', '2', '3' ...) gracias a la función `getIncrementalFilename`.  
  Es importante recalcar que las rutas empleadas en las propiedades `background-image` se especifican como rutas absolutas. Estas rutas parten de la dirección base en que se halle la aplicación una vez publicada; y coinciden con la jerarquía de carpetas `css` e `img` que se habían creado en la parte 5, y que se habían determinado en la opción `to` de `copy-webpack-plugin`.  
  Una dirección base, es un concepto relacionado con el hospedaje y publicación de páginas y aplicaciones web, sobre el que podrás tomar nociones en [esta página](https://developer.mozilla.org/es/docs/Web/HTML/Elemento/base).  
  Las rutas absolutas, a diferencia de las relativas (como podría ser `css/img/1.svg`) evitan que el _loader_ `css-loader` (necesario para el funcionamiento del plugin `mini-css-extract-plugin`) indique a _webpack_ que hay que empaquetar esos archivos, tal y como es de ver en [este punto dedicado a la opción `url`](https://webpack.js.org/loaders/css-loader/#url) en la página dedicada al _loader_ `css-loader` que hay en la web oficial de _webpack_. 

* En el punto 33 se aprovechan esas reglas. Se hace justamente añadiendo clases seleccionadas por las reglas _CSS_, al archivo `index.html` que se usa como _template_ del plugin `html-webpack-plugin`. De este modo, cuando se haya realizado el proceso de empaquetado (en el punto 34), y se sirva el archivo `index.html` resultante (en la carpeta `dist`) a través de un servidor web, aparecerán las imágenes (`background-image`) en la renderización de `index.html` cuando se acceda desde un dispositivo cliente.  
   
  Es importante recalcar que conceptos como "servidor web", "dispositivo cliente" o "renderización" deberían serte muy familiares, y que se parte de esa premisa. En caso de que no sea así, es muy recomendable que consultes los siguientes recursos:
  * ["¿Cómo funciona internet?" en MDN](https://developer.mozilla.org/es/docs/Learn/Common_questions/How_does_the_Internet_work)
  * ["¿Cómo funciona la web?" en MDN](https://developer.mozilla.org/es/docs/Learn/Getting_started_with_the_web/C%C3%B3mo_funciona_la_Web)
  * ["¿Qué es un servidor web?" en MDN](https://developer.mozilla.org/es/docs/Learn/Common_questions/Que_es_un_servidor_WEB)
  * ["How browsers work?" en MDN](https://developer.mozilla.org/en-US/docs/Web/Performance/How_browsers_work)
  * ["Cliente" en wikipedia.org](https://es.wikipedia.org/wiki/Cliente_(inform%C3%A1tica))
  
* Finalmente, y en consecuencia, en el paso 34 se ejecuta el proceso de empaquetado para ver los resultados de esta parte final.