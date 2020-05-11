## CAPÍTULO 8: Creación de _bundles_ para recursos con webpack.config.js

### CAPÍTULO 8: Antes de empezar
Si aún no has seguido los pasos de los [anteriores capítulos](../README.md#capítulos), sería importante que lo hicieras, especialmente los puntos que se llaman "Antes de empezar", que encontrarás en ellos.  
También resultará imprescindible que te hagas a la idea de qué són los _loaders_ para _webpack_; para ello te recomendamos leer [esta página](https://webpack.js.org/concepts/loaders/).  
Por otro lado, es muy conveniente que partamos de una idea concreta del significado de _bundle_ en términos de _webpack_.  
Si nos ceñimos a la descripción del término _loader_ que nos proporciona _webpack_ en su [página dedicada a los _loaders_](https://webpack.js.org/loaders/), vemos que se nos explicita que "(un loader) nos permite empaquetar cualquier recurso estático más allá de Javascript".  
El verbo empaquetar (_bundle_ en inglés) aplicado a los recursos estáticos (_assets_) nos indica que podemos considerar un _bundle_ como un paquete que contendrá _assets_, o en otras palabras, código CSS o imágenes.  
Finalmente, decir que, ya que vamos a trabajar (indirectamente) con el archivo `webpack.config.js` es necesario que tengas una noción clara sobre qué archivo se trata y cual es su uso. En este último caso, te aconsejamos leer el apartado ["Using a configuration" de la guía "GETTING STARTED"](https://webpack.js.org/guides/getting-started/#using-a-configuration) de la web de _webpack_.


### CAPÍTULO 8: Pasos previos
Si has seguido los pasos del capítulo 7, tendrás tu proyecto listo para iniciar los pasos del presente capítulo. Pero antes, deberás atender a una cuestión importante: **estás usando un proyecto _git_, que está conectado a un repositorio**. Esto te permitirá hacer una entrega de tu trabajo para poderlo conservar y recuperarlo en este estado actual si lo necesitaras en un futuro.  
Por lo tanto, empecemos con algunos pasos previos para asegurar que tu trabajo no corre peligro:


Ejecuta las siguientes acciones con la herramienta _git_:
1. Primero de todo añade todos los archivos de tu proyecto a la entrega que realizarás, con la instrucción:
   ```bash
   git add -A
   ```
1. Acto seguido realiza una entrega de los archivos que dispones, con la instrucción:
   ```bash
   git commit -m "Entrega del capítulo 7"
   ```

Si lo deseas, y sabes cómo puedes llevarlo a cabo, te aconsejamos también que publiques esta entrega en el/los repositorio/s _git_ remoto con el/los que esté conectado tu proyecto.  
Si tu proyecto _git_ está correctamente configurado, te bastará con ejecutar:
```bash
git push
```

### CAPÍTULO 8: Cómo crear _bundles_ en webpack

#### INTRODUCCIÓN
A lo largo de los anteriores 7 capítulos, habrá sido habitual encontrar mensajes de tipo _WARNING_ mostrados por el proceso de empaquetado de _webpack_. Estos mensajes venían advirtiéndonos del impacto en el rendimiento que ocasionaban archivos como `main.js`, que vulneraba dos límites de tamaño de archivo recomendados por webpack: _asset size limit_ y _entrypoint size limit_.  
  
Webpack, concretamente nos lo reportaba del siguiente modo, cuando ejecutábamos `npx webpack`:  
```
WARNING in asset size limit: The following asset(s) exceed the recommended size limit (244 KiB).
This can impact web performance.
Assets: 
  main.js (316 KiB)

WARNING in entrypoint size limit: The following entrypoint(s) combined asset size exceeds the recommended limit (244 KiB). This can impact web performance.
Entrypoints:
  main (362 KiB)
      css/style.d35b7021c9d05c436962.css
      main.js


WARNING in webpack performance recommendations: 
You can limit the size of your bundles by using import() or require.ensure to lazy load some parts of your application.
For more info visit https://webpack.js.org/guides/code-splitting/
```
  
En este capítulo trataremos de mitigar dichos problemas, generando _bundles_ que descarguen de tamaño dicho archivo, para que el tamaño del archivo main.js sea inferior a los límites recomendados por _webpack_.

#### PARTE 1: Límite de `url-loader` para crear _bundles_ de imágenes png
1. Empecemos fijando un límite en el uso de `url-loader` en la importación de la imagen del logo de _webpack_. Por ejemplo fija dicho límite en 32KB, modificando la importación de la imagen en el archivo `index.js`, para que quede del siguiente modo:
    ```javascript
    import WebpackLogo from "!!url-loader?{'limit':32768,'name':'[contenthash].[ext]','outputPath': '/css/img/'}!./assets/img/webpack-logo-on-white-bg.png"
    ```
2. Ya puedes ejecutar el comando de empaquetado:
   ```bash
   npx webpack
   ```
 > Tras la ejecución del proceso de empaquetado, puedes ver que los mensajes de _warning_ han desaparecido.  
 > Y por otro lado, se ha generado un nuevo archivo con extensión `.png` en la 
 carpeta `dist/css/img`, correspondiente al logo de _webpack_.  
   

3. Prueba ahora a utilizar `url-loader` desde el archivo `webpack.module.js` en lugar de usarlo en la importación en `index.js`. Recupera la importación del logo en el archivo `src/index.js` tal que quede:
    ```javascript
    import WebpackLogo from "./assets/img/webpack-logo-on-white-bg.png"
    ```

4. Sigue con el archivo `webpack.module.js` que hay en la carpeta `config/webpack`. Añadele las siguientes constantes tras la creación de `MiniCssExtractPlugin`:
    ```javascript
    const FILE_LOADER = {
      loader: "file-loader",
      options: {
        name: "[contenthash].[ext]",
        outputPath: "/css/img/",
      }
    }

    const URL_LOADER = {
      loader: "url-loader",
      options:{
        fallback: FILE_LOADER,
        limit: 32768  
      }
    }
    ```
5. Ahora, en este mismo archivo puedes reemplazar el primer objeto de la propiedad `use` por la constante `FILE_LOADER`, tal que te quede:
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
          FILE_LOADER
        ]
      },
    ]
    ```
 > **Si ejecutas el proceso de empaquetado tendrás la sensación de que nada ha cambiado, con respecto al paso 2. En realidad en estos momentos el loader `url-loader` no se está usando.**

6. Recupera el uso de `url-loader` modificando la última regla para que sea como la siguiente:
    ```javascript
    {
      test: /\.(png|svg)$/,
      oneOf: [
        Object.assign(URL_LOADER,{issuer:/index\.js$/,test:/\.png$/}),
        FILE_LOADER,
      ]
    },
    ```
  > **Tras ampliar la regla con URL_LOADER, este actuará para aquellos archivos `png` que se importen desde `index.js`.**    

 #### PARTE 1: Resumen
 * En el primer paso has añadido una _query_ a la indicación del _loader_ a utilizar en la importación de `./assets/img/webpack-logo-on-white-bg.png`. Esta _query_, puede expresarse en la forma de _query string_ (una de las [secciones que integran una URI](https://es.wikipedia.org/wiki/Query_string)), y también puede expresarse en forma de objeto en notación _JSON_, tal y como se muestra en el [punto llamado "Inline" que hay en el apartado _Loaders_](https://webpack.js.org/concepts/loaders/#inline) que hay en la sección "CONCEPTS" de la web oficial de _webpack_.  
  Este objeto contiene aquellas opciones admitidas para el _loader_ `url-loader`, como es el caso de `limit`. Ahora bien, el caso de `name` y de `outputPath` son opciones propias de `file-loader`, que es el _loader_ al que recurre `url-loader` cuando el _recurso_ a tratar tiene un tamaño superior al `limit` (indicado en _bytes_). Es por eso que `url-loader` admite opciones de `file-loader`, puesto que en caso de recurrir a él, le serán facilitadas.
  Las opciones admitidas por el plugin `url-loader` se explican en el [apartado "Options"](https://webpack.js.org/loaders/url-loader/#options) que hay en la página dedicada a este _loader_ dentro de la web oficial de _webpack_.  
  En cuanto a las opciones de `file-loader`, estas pueden consultarse en el [apartado del mismo nombre](https://webpack.js.org/loaders/file-loader/#options) ("Options") que hay en la página dedicada a este otro _loader_ en la web oficial de _webpack_.
 * El el paso **2** has probado el funcionamiento de la indicación del _loader_ en la ruta de importación.
  En este caso dado que el archivo tiene 233KB de tamaño, supera el límite establecido en `limit`, y por lo tanto se utiliza `file-loader` para empaquetarlo, generando una copia en la carpeta `/css/img` dentro de `dist`, tal y como se ha especificado en `outputPath`
 * En los pasos **3** y **4** se ha eliminado la indicación añadida en el paso 1, y se ha trasladado a una constante llamada `URL_LOADER`, que a su vez usa una segunda constante, `FILE_LOADER`.  
  Estas constantes serán empleadas en la configuración en los siguientes dos pasos (5 y 6), y corresponden a un tipo de objeto determinado conocido como _use entries_.  
  En el caso de la _use entry_ `FILE_LOADER`, los valores son los mismos que los que ya se usaban en la _rule_ para archivos `png` y `svg`.
  En cuanto a la _use entry_ `URL_LOADER`, corresponde a los valores de la query que se empleaba en el paso 1, solo que hay una pequeña novedad: la propiedad `fallback`, en la cual indicamos en este caso la _use entry_ `FILE_LOADER`
  Esta propiedad `fallback`, la usa `url-loader` cuando el recurso a procesar supera el tamaño marcado por `limit`. Ambas [están detalladas en la página dedicada al `url-loader`](https://webpack.js.org/loaders/url-loader/#fallback) en la web oficial de _webpack_.
  La propiedad `fallback` permite especificar tanto una _use entry_ como un _string_ (que indique el nombre del _loader_). Cuando la propiedad `fallback` está especificada, se emplea ese _loader_ en lugar de usar `file-loader` (que es el loader por defecto).    
  El concepto _use entry_ está explicado en [el apartado _UseEntry_](https://webpack.js.org/configuration/module/#useentry) dentro de la sección "CONFIGURATION" que hay en la web oficial de _webpack_.
 * Como se ha comentado, en los pasos **5** y **6**, has empleado estas dos constantes para configurar las _rules_ de _webpack_.  
   En el paso 5 has reemplazado la _use entry_ que había para los archivos `png` y `svg`.  
   Y en el paso 6, has substituido `use` por `oneOf` para añadir la _use entry_ `URL_LOADER`, eso sí, añadiéndole dos propiedades (mediante el método [Object.assign](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Object/assign)): `issuer`, que refiere al recurso (archivo) desde el que se solicitó la importación del recurso que está sindo procesado, y `test`, que refiere a la fórmula de detección de archivos que se importen, sobre los que se aplicará una _rule_.
   La propiedad `oneOf` está explicada en [el apartado _OneOf_](https://webpack.js.org/configuration/module/#ruleoneof) dentro de la sección "CONFIGURATION" que hay en la web oficial de _webpack_. En cualquier caso, tal y como aparece en el paso 6, esta propiedad permite alternar entre _rules_ y _use entries_ indistintamente.  
   A fin de cuentas, las _rules_ se componen de propiedades de entrada, como `test` o `issuer`, y también de propiedades de salida, en este caso o bien `use`, o bien una _use entry_ (que dispone de propiedades como `options` o `loader`) 

 #### PARTE 2: Límite de `svg-url-loader` para crear bundles de imágenes svg
7. Usaremos ahora `svg-url-loader` para reducir el número de peticiones hacia _assets_ de tipo _SVG_ que podamos integrar dentro de los archivos _javascript_, _html_ y _css_, y emitir _bundles_ con aquellos que realmente lo requieran.  
   Instala este loader con el siguiente comando:
    ```bash
    npm install --save-dev svg-url-loader
    ```
8. Añade la siguiente constante tras la creación de `URL_LOADER`, en el archivo `webpack.module.js` que hay en la carpeta `config/webpack`:
    ```javascript
    const SVG_URL_LOADER = {
      loader: "svg-url-loader",
      options: {
        stripdeclarations:true,
        limit: 32768,    
      }
    }
    ```
9. Y a continuación, inserta entre las reglas `oneOf`, justo antes de `FILE_LOADER` la siguiente regla:
    ```javascript
    {
      test: /\.svg$/,
      loader: SVG_URL_LOADER
    },
    ```
10. Y para terminar este bloque, reemplaza la primera regla por esta otra:
    ```javascript
    {
      test: /\.html/,      
      loader: "html-loader",
      options: {
        minimize: {
          removeAttributeQuotes: false
        }
      }
    },
    ``` 
11. Ejecuta el proceso de empaquetado para ver los resultados, con
    ```bash
    npx webpack
    ```
 >**Si inspeccionas la carpeta `css/img` que hay dentro de `dist`, verás que únicamente hay un solo archivo: `[contenthash].png` que corresponde al logo de _webpack_**. **El resto de archivos, de tipo _SVG_ han sido incluidos _inline_ en el archivo _css_ llamado `style.[hash].css` y en el archivo _HTML_ llamado `index.html`**. **Es decir, los archivos inline han sido agrupados en los mismos _bundles_ que el código _HTML_ y el código _CSS_.**

 #### PARTE 2: Resumen
 * En la parte 2 se ha buscado una alternativa a `url-loader` para gestionar la inyección _inline_ de archivos `svg`, según el mismo criterio empleado en los anteriores pasos: un tamaño máximo de archivo (para lo que hemos usando la opción `limit` de `url-loader`)
  El _loader_ `url-loader`, permite codificar imágenes de todo tipo, incluidas `svg`, pero el _loader_ `svg-url-loader` está especializado en este tipo, ofreciendo algunas opciones específicas, que `url-loader` presumiblemente no dispone.  
  Es por eso que en el paso **7** has ejecutado la instalación del paquete de _node_ `svg-url-loader` que importa este loader.
 * Has continuado en el paso **8** con la creación de una _use entry_ para el uso de este _loader_, tal y como habías hecho en los paso 5.
  En esta _use entry_ aparece la opción `stripdeclarations`, que elimina las cabeceras _xml_ del string resultante de procesar un archivo `svg`.  
  En [la página de _svg-url-loader_](https://github.com/bhovhannes/svg-url-loader#supported-parameters) encontrarás la documentación de  `stripdeclarations` y otras opciones.
 * En el paso **9**, para procesar los archivos `svg`, has creado una nueva _rule_ dentro de `oneOf`, que contiene esta _use entry_ del paso anterior. 
 * En el paso **10** has adaptado la _use entry_ en la que usabas _html-loader_ para evitar que se generara un archivo `dist/index.html` en el que el atributo `src` de la etiqueta `<img>` que había en la _template_ `index.html` terminara con un valor entrecomillado (`<img src="data:image..."`).
  En este caso has añadido la propiedad `removeAttributeQuotes` del _loader_ `html-loader`, que encontrarás documentada en [la página de este _loader_](https://github.com/webpack-contrib/html-loader#minimize).
 * En el paso **11**, has lanzado el proceso de empaquetado, y como era previsible, el atributo `src` de la etiqueta `<img>` contiene la versión _inline_ del archivo `svg` importado.
  
 #### PARTE 3: Issuer de `svg-url-loader` para crear bundles de imágenes svg
12. Ahora modificaremos la configuración que usa el _loader_ `svg-url-loader` para afecte únicamente a aquellos archivos que hayan sido cargados desde _html_. Reemplaza el segundo ítem de la propiedad `oneOf` en la regla que afecta a los archivos `png` y `svg` para que quede como sigue:
    ```
    oneOf: [
      { test:/\.png$/,
        issuer:/index\.js$/,          
        ...URL_LOADER
      },
      { test: /\.svg/,
        issuer:/.*\.html$/,           
        ...SVG_URL_LOADER
      },        
      FILE_LOADER,
    ]
    ```
13. Ejecuta nuevamente el proceso de empaquetado, con
    ```
    npx webpack
    ```
 > **Verás que aquellos archivos _SVG_ que havían sido emitidos _inline_ dentro del archivo `style.[hash].css` ahora han sido generados como archivos con extensión `.svg` dentro de la carpeta `css/img` que hay en `dist`.**
14. Ahora reduciremos el límite de _SVG_URL_LOADER para lograr emitir la imagen externamente. Modifica el límite establecido en 32KB (`32768`) y redúcelo a 3,2KB (`3277`) tal que te quede:
    ```javascript
    const SVG_URL_LOADER = {
      loader: "svg-url-loader",
      options: {
        stripdeclarations:true,
        limit: 3277,    
      }
    }
    ```
15. Ejecuta el proceso de empaquetado, con:
    ```bash
    npx webpack
    ```
> **Si ejecutas el proceso de empaquetado, verás que se crea un archivo `[hash].svg` en la carpeta `dist` que corresponde al archivo `spinner.svg` que teníamos en `src/assets/img`.**

 #### PARTE 3: Resumen
 * Tal y como habías hecho en el paso 6, usando la propiedad `issuer` en la primera _rule_ dentro de `oneOf`, en esta tercera parte, los pasos seguidos han llevado a concretar un `issuer` que limite el uso de este _loader_ (`svg-url-loader`) a aquellas importaciones que se realicen desde dentro de archivos `html`.
   Es por ello que en el paso **12** has incluido `issuer` en la _rule_ que habías creado en el paso 9, con la intención de evitar que dicho _loader_ actuara con cualquier archivo `svg` que se importara (lo que incluía los usados como `background-image` en el archivo `style.css`).
 * Por lo anterior, al volver a ejecutar el proceso de empaquetado en el paso **13**, los archivos `svg` que habían sido incluidos en modo _inline_ en el paso 11, ahora no han sido procesados por `svg-url-loader` al no pertenecer al mismo `issuer`. 
 * En los dos siguientes pasos has comprobado el funcionamiento de `svg-url-loader` con aquellos archivos que superan el límite de tamaño impuesto por `limit`.
   En este caso, para llevar a cabo una comprobación rápida, te ha bastado con reducir el valor de `limit` en el paso **14**, y lanzar el proceso de empaquetado en el paso 15.

 #### PARTE 4: Fallback de `svg-url-loader` para crear bundles de imágenes svg
16. Utilizaremos los parámetros empleados para las reglas que empleaban `file-loader`, para que la regla que usa `svg-url-loader` los tenga también.  
    Modifica entonces el archivo `webpack.module.js` para que la constante `SVG_URL_LOADER` quede como sigue:
    ```javascript
    const SVG_URL_LOADER = {
      loader: "svg-url-loader",
      options: {
        stripdeclarations:true,
        limit: 3277,
        ...FILE_LOADER.options
      }
    }
    ```
17. Ejecuta nuevamente el proceso de empaquetado, con:
     ```bash
     npx webpack
     ```
 > **Si te fijas, en la carpeta `dist` ya no encontrarás el archivo `[hash].svg` correspondiente al _spinner_ (`spinner.svg`), si no que lo verás junto al resto de archivos de imagen procesadas por `file-loader`, en la carpeta `css/img` que hay en `dist`**.

 #### PARTE 4: Resumen
 * Como resultado del paso 15, el archivo `svg` en lugar de haber sido emitido en `dist/css/img` (como ocurría con el resto de `svg`) había sido emitido directamente en `dist`. Naturalmente, porque, al igual que como ocurría con la _use entry_ para `url-loader`, era necesario especificar dicha ruta, cosa que no estaba ocurriendo.  
   Es por eso que en el paso **16** se realiza un _spread_ de la propiedad `options` de la _use entry_ correspondiente a `file-loader` dentro de la _use entry_ para `svg-url-loader`.  
   A diferencia de como ocurre con `url-loader`, el loader `svg-url-loader` no dispone de una propiedad `fallback`, pero admite `options` que correspondan con `file-loader`.  
   Este paso de opciones ya ocurría en el paso 1, en que en la especificación _inline_ de `url-loader` en la importación de lo logo de webpack desde `index.js`, se usaban las opciones `name` y `outputPath`, propias de `file-loader`
    ```javascript
    import WebpackLogo from "!!url-loader?{'limit':32768,'name':'[contenthash].[ext]','outputPath': '/css/img/'}!./assets/img/webpack-logo-on-white-bg.png"
    ```
    Al realizar este _spread_ de las `options` de `FILE_LOADER` en `SVG_URL_LOADER`, la _use entry_ que obtenemos sería:
     ```javascript
     const SVG_URL_LOADER = {
       loader: "svg-url-loader",
       options: {
         stripdeclarations:true,
         limit: 3277,
         name: "[contenthash].[ext]",
         outputPath: "/css/img/",
       }
     }
     ```
 * Las `options` facilitadas a `svg-url-loader` que son propias de `file-loader` han sido utilizadas, como ocurría con `url-loader` para ser pasadas a `file-loader`, que en este caso en el `loader` utilizado como _fallback_ por parte de `svg-url-loader`.  
   Al ejecutar el paso **17** justamente se ve como el directorio destino de la imagen `svg` procedente de `index.html` ya se corresponde con la del resto de archivos `svg`.  
   Con respecto a disponer un _fallback_ por defecto, ello está ligeramente documentado en [el apartado explicando la opción `limit`](https://github.com/bhovhannes/svg-url-loader#limit) que hay la página web dedicada a `svg-url-loader`.

 #### PARTE 5: Invalidación de `html-loader` para tener templates _html_
18. Modificaremos ahora el código `html` para que en lugar de usar una etiqueta `img` se use directamente la imagen `svg` a modo _inline_. Por lo tanto, deberás reemplazar el uso de la etiqueta `<img>` que hay en el archivo `index.html` de la carpeta `src/templates` tal que el contenido de la etiqueta `<main>` te quede como sigue:
    ```template
    <main id="main" class="container">
    <% var spinner = require("../assets/img/spinner.svg") %>
    <% if (/\.svg$/.test(spinner)){ %>
       <img id="logo" src="<%= spinner %>" alt="Loading">
    <% }else{ %>
       <%= spinner %>
    <% } %>
    </main>
    ```
19. A continuación invalidaremos el loader `html-loader` que añadimos en el paso 23 del [anterior capítulo](charpter07.md), dejando la regla comentada en el archivo `webpack.module.js` de la carpeta `config/webpack`:
    ```javascript
    /*{
      test: /\.html/,      
      loader: "html-loader",
      options: {
        minimize: {
          removeAttributeQuotes: false
        }
      }
    },*/
    ```
20. Si recuperamos el anterior valor de `limit`, que habíamos modificado en el paso 16, para que vuelva a ser `32768`, podremos ver el resultado de los cambios realizados en `index.html`. Modifica, por tanto, el archivo `webpack.module.js` que hay en la carpeta `config/webpack`, tal que quede:
    ```javascript
    const SVG_URL_LOADER = {
      loader: "svg-url-loader",
      options: {
        stripdeclarations:true,
        limit: 32768,
        ...FILE_LOADER.options
      }
    }
    ```
21. Lanza el proceso de empaquetado para ver qué resultado producen las modificaciones.
    Haz:
    ```bash
    npx webpack
    ```
 > **Si examinas el archivo `index.html` que se ha generado en la carpeta `dist` observarás que contiene un valor `data/image` propio de los atributos `src` de las etiquetas `<img>`, allá donde esperábamos obtener una etiqueta `<svg>`.**

 #### PARTE 5: Resumen
 * Esta parte es una preparación de la siguiente parte, en que se logrará insertar el contenido del archivo `svg`, como una etiqueta.  
   Es por eso que en el paso **18** has reemplazado la etiqueta `<img>` (que será sustituida por `<svg>` en algunos casos) por una sentencia `if..else` escrita en lenguaje de _templating_.  
   Al utilizarse la función `require` se detectará la importación de `spinner.svg` y será procesado según la regla que habías creado en el paso 9 y mejorado en el paso 12.  
      
   La sintaxis de _templating_ utilizado por `Html-Webpack-Plugin` es la de _lodash_, tal y como se aclara al final del [punto _Writing your own templates_](https://github.com/jantimon/html-webpack-plugin#writing-your-own-templates) en la página de este _loader_.  
   Las especificaciones de esta sintaxis de _templating_ de _lodash_ las podrás encontrar en [el ejemplo del punto _template_](https://lodash.com/docs/#template) dentro de la documentación oficial de _lodash_.
 * En el paso **19** has invalidado la _rule_ que determinaba procesar los archivos `html` mediante `html-loader`.  
   La razón no es del todo simple. `html-loader` está pensado para procesar los archivos `html`. El caso es que las etiquetas propias de la sintaxis de _templating_ propias de _lodash_ no son reconocidas por `html-loader`, tal y como se explica en las respuestas de _@jantimon_ (autor de `html-webpack-plugin`) [a este _issue_](https://github.com/jantimon/html-webpack-plugin/issues/1196), y por otro lado historicamente han existido incompabilidades entre el uso de este plugin y el loader `html-loader`, tal y como es de ver en este [otro _issue_](https://github.com/jantimon/html-webpack-plugin/issues/1431#issuecomment-626231419).  
   Por todo lo expresado anteriormente, se ha optado por comentar `html-loader`, en tanto que se usará preferiblemente sintaxis de _templating_ para importar recursos, en lugar de rutas.
 * En el paso **21** has puesto a prueba la correcta ejecución del código escrito en sintaxis de _templating_. Eso sí, habiendo recuperado el valor de `limit` en el paso **20**. Con lo que el código ejecutado en la _template_ corresponde al bloque _else_, en que en lugar de usarse una etiqueta `<img>` y emitirse un _bundle_ para la imagen `svg`, se debería incrustar la imagen `svg` dentro del código _HTML_, formando un único _bundle_ (`dist/index.html`).  
 Ahora bien, según se destaca en lugar de incrustarse una etiqueta, se incrusta una _url_ con la imagen `svg` (que es justamente para lo que hemos venido usando `svg-url-loader`)

 #### PARTE 6: Loader `svg-inline-loader` para incrustación de imágenes _svg_
22. Para lograr extraer el código del archivo `spinner.svg` sin codificarlo, instalaremos `svg-inline-loader`, con el comando:
    ```bash
    npm install --save-dev svg-inline-loader
    ```
23. Añade ahora al archivo `webpack.modules.js` la siguiente constante, justo tras `SVG_URL_LOADER`:
    ```javascript
    const SVG_INLINE_LOADER = {
      loader: "svg-inline-loader",
      options: {
        removeSVGTagAttrs: false,
      }
    }
    ```
24. Ahora sustituye el uso de `SVG_URL_LOADER` por `SVG_INLINE_LOADER` en el array `oneOf`, tal que te quede:
    ```javascript
    oneOf: [
      { test:/\.png$/,
        issuer:/index\.js$/,          
        ...URL_LOADER
      },
      { test: /\.svg/,
        issuer:/.*\.html$/,           
        ...SVG_INLINE_LOADER
      },        
      FILE_LOADER,
    ]
    ```
25. Ya puedes ejecutar el proceso de empaquetado, con:
    ```bash
    npx webpack
    ```
 > **Verás en el archivo `index.html` que hay en la carpeta `dist`, que contiene una etiqueta `<svg>`, con el contenido del archivo `spinner.svg` preparado para incrustar directamente en _HTML_.**

 #### PARTE 6: Resumen
* En el paso 7 se había instalado `svg-url-loader` como alternativa a `url-loader` que se encargara de gestinar la inyección _inline_ dentro de los bundles _javascript_, _CSS_ y _HTML_, de aquellos archivos `svg` cuyo tamaño estubiera por debajo de cierto `limit`.  
  Ocurre que el lenguaje _SVG_, con el que están escritos los archivos `svg`, es una extensión de _XML_ que puede incrustarse directamente en _HTML_ como una etiqueta más. Por lo tanto, _loaders_ como `url-loader` o `svg-url-loader`, que producen una cadena con el contenido del archivo `svg` para ser usada como `url`, no están pensados para insertar código _SVG_ dentro de código _HTML_, y por ello podemos plantear mejores alternativas.  
  Esta es la razón por la que se elije instalar `svg-inline-loader` en el paso **22**.  
  Antes de continuar, debes saber que en [la página de este _loader_](https://github.com/webpack-contrib/svg-inline-loader) podrás informarte sobre el mismo.
* A continuación, en el paso **23**, al igual que en pasos anteriores, has creado una _use entry_ llamada `SVG_INLINE_LOADER`.
* En el siguiente paso, **24**, has usado esa _use entry_ en la _rule__ aplicable a los archivos `svg`, que se importen desde archivos `html`.  
  Hasta ese momento esa _rule_ usaba una _use entry_ con `svg-url-loader`.
* Y finalmente, en el paso **25** has vuelto a lanzar el proceso de empaquetado, consiguiendo insertar la etiqueta `<svg>` allá donde antes había una _url_
  
 #### PARTE 7: Límite de `svg-url-loader` para crear bundles de imágenes svg
26. Como `svg-inline-loader` no dispone de límite, deberás crear un _loader_ propio.
    Crea una carpeta llamada `loaders` dentro de `config/webpack`. Y dentro de esta carpeta crea un archivo llamado `svg-loader.js`.
    Puedes usar para ello los siguientes comandos:
    ```bash
    mkdir -p ./config/webpack/loaders
    touch ./config/webpack/loaders/svg-loader.js
    ```

27. Para crear nuestro loader `svg-loader` empezaremos creando el siguiente código facilitado por _webpack_, dentro del archivo que acabamos de crear (`svg-loader.js`):
    ```javascript
    import { getOptions } from 'loader-utils';
    import validateOptions from 'schema-utils';

    const schema = {
      type: 'object',
      properties: {
        test: {
          type: 'string'
        }
      }
    };

    export default function(source) {
      const options = getOptions(this);

      validateOptions(schema, options, 'Example Loader');

      // Apply some transformations to the source...

      return `export default ${ JSON.stringify(source) }`;
    }
    ```
28. En tanto que *actualmente* (2020) existen aún incompatibilidades en el uso de la sintaxis _ES2015+_ con la sintaxis _CommonJS_ en relación a las directivas de importación y exportación de valores en los módulos que són procesados directamente por _NodeJS_, debes traducir el código anterior a _CommonJS_ por integridad con el resto de archivos de configuración de _webpack_.
    Modifica el código anterior para que te queden las dos importaciones iniciales como siguen:
    ```javascript
    const { getOptions } = require('loader-utils');
    const validateOptions = require('schema-utils');
    ```
29. Define ahora las opciones válidas para nuestro nuevo loader dejando la constante `schema` en el archivo `svg-loader.js` tal como sigue:
    ```javascript
    const schema = {
      type: "object",
      properties: {
        limit: {
          description: "Module (or resource) size limit in bytes",
          anyOf: [
            {type: "integer"},
            {type: "null"}
          ]
        },
        loader: {
          description: "Primary loader to use with the module (or resource)",
          anyOf: [
            {type: "object"},
            {type: "string"},
            {type: "null"}
          ]
        },
        fallback: {
          description: "Fallback loader to use when size limit is reached",
          anyOf: [
            {type: "object"},
            {type: "string"},
            {type: "null"}
          ]
        },
      },
      additionalProperties: true
    };
    ```
30. En tanto que ya disponemos de las opciones, puedes definir la lógica del _loader_.  
    Para ello modifica la función que hay asignada a `module.exports` en ese mismo archivo (`svg-loader.js`) tal que pase a tener este código:
    ```javascript
    module.exports = function(source) {
      let loader, context
      const options = getOptions(this)||{}
      validateOptions(schema, options, "svg-loader")

      if (!isLimitReached(options.limit,source)){
        // El loader elegido es el preferente
        loader = require( getLoader(options.loader || 'svg-inline-loader') )
        // Context es la variable que se empleará como contexto "this" en la llamada al loader elegido
        context = {
          ...this, 
          // Query es la propiedad que contiene las "options" empleadas para el loader elegido
          query: getQuery(options.loader) || 
            {
              removeSVGTagAttrs: false
            } 
        }    
      }else{    
        // El loader elegido es el fallback
        loader = require( getLoader(options.fallback || 'file-loader') )
        // Context es la variable que se empleará como contexto "this" en la llamada al loader elegido
        context = {
          ...this, 
          // Query es la propiedad que contiene las "options" empleadas para el loader elegido
          query: getQuery(options.fallback) || 
            {
              name: "[contenthash].[ext]",
              outputPath: "/css/img/",
            }
        }
      }
      try{
        // En la llamada al loader elegido debe preservarse el contexto (objeto this replicado en context)
        return loader.call(context, source)             
      }catch(error){
        return `export default ${ JSON.stringify(source) }`
      }
    }    
    ```
31. Define las funciones `isLimitReached`, `getLoader` y `getQuery`, añadiendo el siguiente código al final del archivo `svg-loader.js`:
    ```javascript
    function isLimitReached(limit, content){
      return (parseInt(limit||0)<content.length)  
    }

    function getLoader(loader){
      if (typeof loader === 'object')
        return loader.loader
      return loader
    }

    function getQuery(loader){
      if (typeof loader.options !== 'undefined')
        return loader.options
      return false
    }
    ```
32. Ahora que has terminado el código del nuevo `loader` ya puedes añadir la siguiente constante tras la creación de `SVG_INLINE_LOADER`, en el archivo `webpack.module.js` que hay en la carpeta `config/webpack`:
    ```javascript
    const SVG_LOADER = {
      loader: path.resolve(__dirname,'loaders/svg-loader.js'),
      options: {    
        limit: 32768,
        loader: SVG_INLINE_LOADER,
        fallback:FILE_LOADER,    
      }
    }
    ```
33. Para que la propiedad `loader` de la anterior constante adquiera un valor, deberás previamente importar el _package_ `path`.  
    Añade la siguiente importación al inicio del mismo archivo ( `config/webpack/webpack.module.js`):
    ```javascript
    const path = require("path")
    ```
34. Y para cierre, reemplaza el _loader_ `SVG_INLINE_LOADER` por `SVG_LOADER` en la propiedad `oneOf` del mismo archivo, tal que te quede como sigue:
    ```javascript 
    oneOf: [
      { test:/\.png$/,
        issuer:/index\.js$/,          
        ...URL_LOADER
      },
      { test: /\.svg/,
        issuer:/.*\.html$/,           
        ...SVG_LOADER
      },        
      FILE_LOADER,
    ]
    ```
35. Ejecuta el proceso de empaquetado, con:
    ```bash
    npx webpack
    ``` 
 > **Observarás que no se ha producido ningún cambio en la carpeta `dist`, y ello significa que el nuevo loader funciona correctamente, y delega la carga del `svg` importado en la _template_ `index.html` a `svg-inline-loader`**.
 > **Nuestro proyecto ya está casi listo para la [**VERSIÓN 8.0**](../../releases/tag/v8.0)!**  
36. Para comprobar que nuestro _loader_ utiliza también `file-loader` cuando el archivo excede del límite marcado, modifica el límite máximo que hay fijado en la propiedada `limit` de la constante `SVG_LOADER`, en el archivo `webpack.module.js` y rebájalo a `3277` tal que la constante quede:
    ```javascript
    const SVG_LOADER = {
      loader: path.resolve(__dirname,'loaders/svg-loader.js'),
      options: {    
        limit: 3277,
        loader: SVG_INLINE_LOADER,
        fallback:FILE_LOADER,    
      }
    }
    ```
37. Comprueba la acción de `file-loader` Ejecutando nuevamente el proceso de empaquetado, con:
    ```bash
    npx webpack
    ```
 > **Observarás también que en el archivo `index.html` de la carpeta `dist` aparece `[object Module]` allá donde esperábamos `<img id="logo" src="/css/img/[hash].svg" alt="Loading">`**.
38. Para corregir este resultado bastará con que añadas la propiedad `esModule` en la `options` de la constante `FILE_LOADER` y le asignes el valor `false`. Modifica en el archivo `webpack.module.js` de la carpeta `config/webpack`, el valor de la constante `FILE_LOADER` para que quede como sigue:
    ```javascript
    const FILE_LOADER = {
      loader: "file-loader",
      options: {
        name: "[contenthash].[ext]",
        outputPath: "/css/img/",
        esModule: false
      }
    }
    ```
39. Ya puedes lanzar el proceso de empaquetado, y comprobar el correcto funcionamiento del loader y la creación de un _bundle_ para el archivo `svg` cuando mide más de 3KB. Ejecuta:
    ```bash
    npx webpack
    ```
 #### PARTE 7: Resumen
 * En la parte 6, habías llegado a omitir la creación de un _bundle_ para la imagen _spinner.svg_, optando por insertarla _inline_ en el código _html_. Y en esta séptima parte, has preparado y comprobado lo que debe ocurrir cuando se supera el `limit` permitido, que no es otra cosa que la creación de un _bundle_ para la imagen _spinner.svg_.  
   En este caso concreto, el propósito ha sido lograr que se ejecutara el código del `if` que hay en la _template_ `index.html`, para que en lugar de incrustarse una etiqueta `<svg>` apareciera una etiqueta `<img>` con el atributo `src` apuntando a la ruta del _bundle_ (que tendría la forma `/css/img/[content-hash].svg`).  
   Para ello, en los pasos **26** y **27**, has realizado la creación inicial de un módulo _javascript_ con un _loader_ para _webpack_.  
   Puedes comprobar que `svg-inline-loader` no dispone de una _option_ de tipo `limit` si consultas el [apartado "Query options"](https://github.com/webpack-contrib/svg-inline-loader#query-options) que hay en su página web.  
   A parte, en el área "CONTRIBUTE" de la web oficial de _webpack_ podrás encontrar [la sección "Writing a loader"](https://webpack.js.org/contribute/writing-a-loader/) en la que se dan indicaciones de cómo crear un archivo inicial para implementar un nuevo _loader_ de _webpack_.  
   **Si te ha extrañado** que no haya sido necesario instalar los _packages_ de _npm_ llamados `loader-utils` y `schema-utils`, es precisamente por que el _package_ `webpack` ya los incluye como dependencias, y por lo tanto, al haber sido instalado _webpack_ en el [paso 4 del primer capítulo](charpter-01.md), ambos _packages_ fueron instalados en `node_modules`. En cualquier caso, puedes documentarte sobre el propósito y prestaciones de ambos _packages_ consultando la [página de `loader-utils`](https://www.npmjs.com/package/loader-utils) por un lado, y la [página de `schema-utils`](https://www.npmjs.com/package/schema-utils) por otro.
 * A continuación, en el paso **28** has aplicado un _workaround_ para adaptar el código obtenido de la sección "Writing a loader" a un entorno _NodeJs_ en el que aún no se permitan la importación híbrida de módulos, es decir, una importación en que se use a la vez sintaxis _CommonJS_ y sintaxis _ES6_. Y es por eso que has cambiado instrucciones _ES6_, tipo `import constante from "package"`, por instrucciones _CommonJS_, tipo `const constante = require("package")`.  
   Al respecto de este paso, el término _workaround_ debería resultarte familiar; en cualquier caso, puedes atribuirle el significado que se [te explica en esta página](https://es.wikipedia.org/wiki/Paliativo_\(inform%C3%A1tica\)).  
   Por otro lado, y con respecto del que _NodeJS_ tenga un soporte parcial a los módulos _ES6_, encontrarás la documentación más reciente en esta [página dedicada al soporte de módulos _ES6_ en nodejs.org](https://nodejs.org/api/esm.html)
 * Acto seguido, en el paso **29** has definido un _schema_ válido para las _options_ del nuevo _loader_, basándote en las opciones conocidas, como `limit` y `fallback` (inspiradas en el _loader_ `url-loader`) a las que les has sumado una nueva _option_, llamada `loader`.  
   Esta última _option_ servirá para especificar el _loader_ real que procesará el recurso cuando su tamaño esté por debajo de `limit`.  
   Para conocer más de cerca el modo en que deben especificarse las opciones de los _loaders_, cuando se utilizarán herramientas como `schema-utils` para validarlas, es importante echar un vistazo [al apartado "schema"](https://www.npmjs.com/package/schema-utils#schema) en la página de este _package_ de _npm_.
 * El paso **30** merece un detenimiento.  
   En este paso has incorporado lógica a la función principal (`module.exports`) del módulo que contiene nuestro _loader_. Esta lógica se sustenta en una sentencia `if..else`, en que se consulta si el recurso (`source`) excede el tamaño expresado por la opción `limit` (`option.limit` en el código de la función). En el caso que el límite no sea excedido, se requiere el _loader_ que había sido proporcionado en la opción `loader` para el procesamiento final del recurso. Y en caso que el límite sí sea excedido, se requiere el _loader_ facilitado en la opción `fallback`.  
    Si te fijas, cuando la opción `loader` no ha sido especificada, se tomará `svg-inline-loader` por defecto; y cuando ocurra con `fallback`, se  tomará `file-loader`.
    En cuanto a las opciones que serán facilitadas a uno y otro _loaders_, también se proponen opciones por defecto, que son las mismas que ya han sido empleadas para uno y otro _loader_.
 * El paso **31** has definido el cuerpo de las tres funciones que se invocaban en el cuerpo de la función del paso 30.  
   Es importante recalcar algunos aspectos de estas funciones.  
   La primera, `isLimitReached`, utiliza la propiedad `length` del parámetro `content`. Este parámetro había recibido `source` como argumento. Cabe decir al respecto que el parámetro `source` de la función principal, recibirá el retorno del _loader_ anterior una vez haya procesado el recurso, o bien el recurso directamente, en caso de no haber ningún _loader_ que haya actuado antes.  
   Esta explicación anterior aparece en [el apartado "Loader Interface"](https://webpack.js.org/api/loaders/) en la sección "API" que hay en la web oficial de _webpack_.
   En cuanto a las funciones `getLoader` y `getQuery` son invocadas con contenido del objeto `options` que es generado por la función `getOptions`.  
   Esta función pertenece al _package_ `loader-utils`, y está documentada en [este punto](https://www.npmjs.com/package/loader-utils#getoptions) de la página de el _package_.
 * Los pasos **32**, **33** y **34** han servido para añadir y utilizar una nueva _use entry_ que utiliza nuestro loader.  
   A diferencia del resto de _use entries_ (`FILE_LOADER`, `URL_LOADER`, `SVG_URL_LOADER` o `SVG_LOADER`) no nos bastaba con el nombre del _package_ que contubiera el _loader_, puesto que lo hemos creado como un módulo _javascript_ y no como un _package_ (instalado en `node_modules`). Es por eso que se ha proporcionado la ruta (`path.resolve`) hacia el archivo `svg-loader.js`.
 * En el paso **35** se ha comprobado el correcto funcionamiento del _loader_ cuando el recurso (en este caso `spinner.svg`) no supera el tamaño `limit` permitido.
 * Y finalmente, en los pasos **36**, **37**, **38** y **39** han servido para probar y corregir el caso contrario (cuando el tamaño sí excedía `limit`).
   Es importante destacar la adición de `esModule` en el paso 38 para enmendar el problema ocurrido en el paso 37. Esta propiedad indica si el formato de exportación del recurso recibido por `file-loader` debe ser un módulo _javascript_ con sintaxis _ES6_ (cuando el valor es `true`) o bien un módulo con sintaxis _CommonJs_ (cuando el valor es `false`).  
   Date cuenta que en la plantilla `src/templates/index.html` se importaba el recurso con sintaxis _CommonJs_, usando `require`:
   ```ejs
   <% var spinner = require("../assets/img/spinner.svg") %>
   ```

**¡ENHORABUENA! HEMOS TERMINADO**  
Si echas un vistazo a tu carpeta `webpack-essential` encontrarás el siguiente contenido:
```
config/
  webpack/
    loaders/
      svg-loader.js
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
      <hash-webpack-logo>.png
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

Eso significa que los archivos de configuración de _webpack_: `webpack.config.js`, `webpack.module.js`, `webpack.optimization.js` y `webpack.plugins.js` están correctamente escritos, así como también el nuevo archivo `svg-loader.js`!  
  
**En el siguiente capítulo crearemos bundles de código con `bundle-loader` para distribuir la carga de recursos que sean módulos de código, continuando con el archivo `webpack.module.js`, pero profundizando en nuevos métodos para importar recursos y emitir _bundles_ .

### CAPÍTULO 8: Resumen general
En este capítulo has utilizado 3 _loaders_ nuevos. Dos de ellos, `svg-url-loader` y  `svg-inline-loader`, han sido instalados vía `npm` y el tercero, ha sido creado durante el presente capítulo: `svg-loader.js`.  
A lo largo del capítulo se ha tratado de gestionar una política de emisión de recursos vía `file-loader` para aquellos casos en que se superara un límite propuesto de 32KB, y para el caso contrario se han utilizado fórmulas, pasando por distintos _loaders_ que permitieran inyectar _inline_ el contenido del recurso en el archivo que lo importara (ya fuera desde archivos de código _javascript_ como archivos de plantillas de `html-webpack-plugin`).  
Cada _loader_ que se ha ido utilizando, ha implicado la creación de una _use entry_ que ha formado parte en algún momento de la _rule_ que tiene  `test: /\.(png|svg)$/`, eso sí, en lugar de añadirse en un array en la propiedad `use`, se ha añadido a un array en la propiedad `oneOf`.  
También has desactivado el loader `html-loader` para que no interfiriera con el procesamiento de lenguaje de _templating_ de _lodash_ en los archivos de plantilla procesados por `html-webpack-plugin`, y a su vez has introducido código de _templating_ en el archivo `index.html` para que se importara (sin `html-loader`) el recurso `spinner.svg` desde este archivo.  
Sobre el _loader_ que has creado, has partido de un módulo _CommonJS_ en que se exporta una función principal que recibe un recurso a través del parámetro `source` y lo retorna una vez procesado. En este caso, el resultado lo obtiene delegando en otro _loader_ dicho procesamiento del recurso.  
Y el resultado es que tienes una plantilla en _HTML_ en la que se incrusta un archivo `svg` en funcion de un límite de tamaño de archivo. 
