## CAPÍTULO 6: Uso de loaders para CSS en webpack.config.js

### CAPÍTULO 6: Antes de empezar
Si aún no has seguido los pasos de los [anteriores capítulos](../README.md#capítulos), sería importante que lo hicieras, especialmente los puntos que se llaman "Antes de empezar", que encontrarás en ellos.  
También resultará imprescindible que te hagas a la idea de qué són los _loaders_ para _webpack_; para ello te recomendamos leer [esta página](https://webpack.js.org/concepts/loaders/).  
Finalmente, ya que vamos a trabajar (indirectamente) con el archivo `webpack.config.js` es necesario que tengas una noción clara sobre qué archivo se trata y cual es su uso. En este último caso, te aconsejamos leer el apartado ["Using a configuration" de la guía "GETTING STARTED"](https://webpack.js.org/guides/getting-started/#using-a-configuration) de la web de _webpack_.

### CAPÍTULO 6: Pasos previos
Si has seguido los pasos del capítulo 5, tendrás tu proyecto listo para iniciar los pasos del presente capítulo. Pero antes, deberás atender a una cuestión importante: **estás usando un proyecto _git_, que está conectado a un repositorio**. Esto te permitirá hacer una entrega de tu trabajo para poderlo conservar y recuperarlo en este estado actual si lo necesitaras en un futuro.  
Por lo tanto, empecemos con algunos pasos previos para asegurar que tu trabajo no corre peligro:


Ejecuta las siguientes acciones con la herramienta _git_:
1. Primero de todo añade todos los archivos de tu proyecto a la entrega que realizarás, con la instrucción:
   ```bash
   git add -A
   ```
1. Acto seguido realiza una entrega de los archivos que dispones, con la instrucción:
   ```bash
   git commit -m "Entrega del capítulo 5"
   ```

Si lo deseas, y sabes cómo puedes llevarlo a cabo, te aconsejamos también que publiques esta entrega en el/los repositorio/s _git_ remoto con el/los que esté conectado tu proyecto.  
Si tu proyecto _git_ está correctamente configurado, te bastará con ejecutar:
```
git push
```

### CAPÍTULO 6: Cómo usar loaders para CSS en webpack
1. Empecemos con el _loader_ llamado `sass-loader`.  
   Para usarlo en el proyecto, instálalo primero con el siguiente comando:
   ```bash
   npm install --save-dev sass-loader
   ```
2. Instala ahora su principal dependencia para cuando va a usarse en un proyecto webpack, el package llamado `node-sass`, con el siguiente comando:
   ```bash
   npm install --save-dev node-sass
   ```
3. Ahora añade `sass-loader` al archivo webpack.module.js del siguiente modo, creando una nueva _rule_:
   ```javascript
   rules: [
      {
         test: /\.css$/,
         use: [MiniCssExtractPlugin.loader,'css-loader'],
      },
      {
         test: /\.s(a|c)ss$/,
         use: [MiniCssExtractPlugin.loader,'css-loader','sass-loader'],
      },
   ]   
   ```
4. En el archivo `index.js` que hay en la carpeta `src`, comenta la línea que realiza el import de `bulma.min.css`, tal que te quede:
   ```javascript
   // import 'bulma/css/bulma.min.css';
   ```
5. Y añade la siguiente instrucción al principio del archivo `style.css` que hay en la carpeta `css` dentro de `src`:
   ```css
   @import '~bulma/css/bulma.min.css';
   ```
6. Lanza el proceso de empaquetado, con:
   ```bash
   npx webpack
   ```
 > **Si observas el archivo `style.[hash].css` generado en la carpeta `dist/css`, verás que la directiva `@import` de _CSS_ ha sido capaz de sostener la importación del archivo bulma que anteriormente estaba siendo importado desde la directiva `import` de _javascript_**.
   
7. Cambiemos ahora _CSS_ por _SASS_ en ese `@import`, modificandolo para que quede así:
   ```css
   @import '~bulma/bulma.sass';
   ```
8. Ejecuta el proceso de empaquetado para observar los cambios en el archivo `style.[hash].css` que se crea en la carpeta `css` dentro de la carpeta `dist`, con:
   ```bash
   npx webpack
   ```
 > **Como habrás podido observar, en el archivo _CSS_ que se ha creado, aparece el contenido del archivo `bulma.sass`, pero este no se ha compilado hacia CSS**.
9. Para lograr que el código _SASS_ se compile hacia _CSS_ bastará con renombrar el archivo `style.css` como `style.scss`. Para ello puedes usar la siguiente instrucción:
   ```bash
   git mv ./src/css/style.css ./src/css/style.scss
   ```
10. Acto seguido corrige la importación del archivo `index.js` que hay en la carpeta `src`, tal que quede:
    ```javascript
    import './css/style.scss';
    ``` 
11. Ejecuta nuevamente el proceso de empaquetado con:
    ```bash
    npx webpack
    ```
 > **Observarás que en esta ocasión el archivo `style.[hash].css` ya contiene el código _CSS_ tras haberse compilado el código _SASS_**.

12. Puedes lograr este mismo resultado, unificando la carga de código _CSS_ y _SASS_ con una única cadena de _loaders_. Para ello adapta el archivo `webpack.module.js` para que contenga esta única regla:
    ```javascript
    rules: [
    {
       test: /\.s?[ac]ss$/,
       use: [MiniCssExtractPlugin.loader,'css-loader','sass-loader'],
    },
    ```
13. Por lo tanto, debes deshacer el cambio de extensión del archivo `style.scss` de la carpeta `css` que hay en `src`, y volver a dejarlo como `style.css`. Puedes usar el siguiente comando para ello:
    ```bash
    git mv ./src/css/style.scss ./src/css/style.css
    ```
14. En consecuencia corrige el `import` del archivo `index.js` que hay en la carpeta `src`, para que quede como:
    ```javascript
    import './css/style.css';
    ``` 
15. Ejecuta el proceso de empaquetado nuevamente y comprueba que se sigue produciendo correctamente el archivo `style.[hash].css` en la carpeta `css` que hay en `dist`.
    ```bash
    npx webpack
    ``` 

 > **Nuestro proyecto ya está casi listo para la [**VERSIÓN 6.0**](../../releases/tag/v6.0)!**  

16. Elimina la línea con `@import` del archivo `style.css` que importaba bulma, que era como la que sigue:
    ```css
    @import '~bulma/bulma.sass';
    ```
17. Sustituye la línea comentada en `index.js` de la carpeta `src` por la siguiente:
    ```javascript
    import './css/bulma.sass';
    ```
18. Crea un archivo llamado `bulma.sass` dentro de la carpeta `css` que hay en la carpeta `src`, con el siguiente contenido:
    ```css
    @import '~bulma/sass/utilities/initial-variables';
    @import '~bulma/sass/utilities/functions';
    @import '~bulma/sass/utilities/derived-variables';
    @import '~bulma/sass/utilities/mixins';
    @import '~bulma/sass/base/_all';
    @import '~bulma/sass/grid/columns';
    ```
19. Finalmente puedes ejecutar el proceso de empaquetado para obtener un archivo `styles.[hash].css` con únicamente el mínimo _CSS_ necesario de bulma, reduciendo el tamaño del archivo de 191KB a 46KB.
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
    bulma.sass
    style.css
  templates/
    index.html
    sitemap.html
  index.js
webpack.config.js
```

Eso significa que los archivos de configuración de _webpack_: `webpack.config.js`, `webpack.module.js`, `webpack.optimization.js` y `webpack.plugins.js` están correctamente escritos!  
  
**En el siguiente capítulo usaremos loaders para la gestión de imágenes y otros archivos mientras continuamos modificando el archivo `webpack.module.js`, ¡pero también el archivo `webpack.plugins.js`**!

### CAPÍTULO 6: Resumen
* En el primer paso has instalado un _package_ de _npm_ llamado `sass-loader`, que básicamente es un _loader_ de _webpack_ que permite la correcta carga de archivos escritos en lenguaje _SASS_, y que por lo tanto tengan extensión `.scss` o `.sass`.  
Para entendernos, los _loaders_ actuán allá donde _webpack_ no llega, durante la resolución de cargas de archivos que no sean _javascript_ o _json_, y que deban resolverser por haberse encontrado sentencias `require` o `import` de _javascript_, o `@import` de _CSS_, o funciones `import(..)` de _javascript_ o `url(..)` de _CSS_, por poner unos ejemplos.  
Si aún y así, el concepto _loader_ era algo sobre lo que guardas dudas, deberías leer el [apartado _Loaders_](https://webpack.js.org/concepts/#loaders) que hay en la sección "CONCEPTS" en la página oficial de _webpack_.  
Respecto al paquete `sass-loader`, puedes encontrar documentación e información en [esta página](http://npmjs.com/package/sass-loader). 
* Para que webpack, pueda compilar el código _SASS_ y convertirlo en código _CSS_, es por lo que en el paso 2 has instalado el _package_ `node-sass`, que básicamente es un paquete que hace de enlace entre _node_ y la librería _libsass_, que es la que realmente realiza la compilación del código _SASS_.  
  Sobre la librería _libsass_ así como sobre métodos para instalarla en tu sistema, puedes documentarte visitando [esta página](https://github.com/sass/libsass).  
  Sobre el paquete `node-sass`, puedes obtener información visitando esta [otra página](https://www.npmjs.com/package/node-sass).  
  Finalmente, y sobre la compilación (que ocurre en los pasos 11, 15 y 19), cabe mencionar que es el proceso por el cual a partir de un "código informático" se obtiene otro más compacto y procesable, ya sea por un procesador o por un intérprete.   
  Los conceptos "compilación", "procesador" o "intérprete", así como el propio término _SASS_ los puedes consultar en estos recursos:
  - [Intérprete en wikipedia.org](https://es.wikipedia.org/wiki/Int%C3%A9rprete_(inform%C3%A1tica))
  - [Procesador en wikipedia.org](https://es.wikipedia.org/wiki/Unidad_central_de_procesamiento)
  - [Compilación en wikipedia.org](https://es.wikipedia.org/wiki/Compilador)
  - [SASS en wikipedia.org](https://es.wikipedia.org/wiki/Sass)
  
* En el paso 3 has creado una nueva _rule_ (regla) para _webpack_. La reglas se expresan mediante dos propiedades: `test` y `use`, y permiten seleccionar una cadena (un array para ser concretos) de _loaders_ que serán utilizados para transformar o cargar en _webpack_, un determinado tipo de archivos de los que se detecte una importación.
  En la primera regla, había indicado (en la propiedad `test`) una expresión regular que identificaba todo aquello que termine con `.css` y en la segunda regla, has indicado una expresión regular que identifica todo aquello que termine con `.scss` o con `.sass`.  
  Y es que la función de la propiedad `test` es la de expresar una fórmula de detección de archivos (normalmente mediante una expresión regular) que se usa por cada importación detectada a partir del archivo de punto de entrada (en nuestro caso `index.js` en `src`). Cuando la fórmula detecta que el archivo debe ser procesado por la regla, es entonces cuando se usan los _loaders_ que se han indicado en la propiedad `use`.  
  Esta propiedad, se expresa como una lista de _loaders_ (expresados mediante su nombre), que deberán emplearse de manera consecutiva sobre el archivo detectado. El procesamiento se inicia **siempre con el último _loader_ de la lista** y se recorre la lista en sentido inverso (de fin a principio). Por lo tanto, el último _loader_ indicado, será el primero en aplicarse.  
  Y es justamente por esta razón que el _loader_ proporcionado por el _plugin_ `mini-css-extrac-plugin` se coloca el primero de la lista, en tanto que será el responsable de facilitar el código entregado por su antecesor (el _loader_ `css-loader`) al _plugin_ para que este genere una archivo `css` con dicho código, como vimos en el [capítulo 5](charpter-05.md).  
  Como puedes imaginar, el _loader_ `css-loader` se encarga de obtener el código _CSS_ que pueda haber en los archivos _CSS_ que vengan siendo importados a partir de nuestro _entry point_ `index.js`.  
    
  Sobre las propiedades `test` y `use` de las _rules_, encontrarás la información de referencia en el [apartado _module_](https://webpack.js.org/configuration/module/) que hay en la sección "CONFIGURATION" de la página oficial de _webpack_.

* En los pasos 4 y 5 has trasladado una importación del archivo `bulma.min.css` de un archivo escrito en _javascript_ a un archivo escrito en _CSS_, para poder observar que las importaciones son identificadas por _webpack_ y son procesadas a través de los _loaders_ con relativa "independencia" de su procedencia, siempre y cuando esta importación haya sido consecuencia del procesamiento inicial de un _entry point_, en nuestro caso `index.js`.  
  En el caso concreto de estos pasos, la "cadena de importación" empieza en `index.js` (de la carpeta `src`) que contiene una sentencia `import` para el archivo `style.css` (de la carpeta `src/css`). Y tras el paso 5, este archivo importa, mediante una directiva `@import` el archivo `bulma.min.css`.  
  Es importante resaltar que la sentencia `import` no resuelve las rutas del mismo modo que la directiva `@import`, y es por ello que se añade la tilde (`~`) al principio de la ruta importada en el archivo `style.css`. El uso de la tilde para lograr la importación de archivos que se hallan en `node_modules` en la directiva `@import`, está documentado en [la entrada _import_](https://webpack.js.org/loaders/css-loader/#import) que hay en la página dedicada a `css-loader` en la sección "LOADERS" de la web oficial de _webpack_.esta página (ahora bien)

* En el paso 6 has puesto a prueba la cadena de importación descrita para los pasos anteriores (`index.js` -> `style.css` -> `bulma.min.css`).

* En los pasos 7 y 8, has tratado de usar el archivo `bulma.sass` que es, [según la web oficial de _bulma_](https://bulma.io/documentation/customize/with-webpack/) el archivo a partir del cual se genera (mediante compilación) el mismo código _CSS_ que el contenido en el archivo `bulma.min.css`. Con todo esto, que cabía esperar tener el mismo resultado al ejecutar el proceso de empaquetado, que el que habías logrado en el paso 6, ya que en los pasos 1, 2 y 3 habías preparado el proyecto para realizar la compilación de código _SASS_ mediante el _loader_ `sass-loader`. Pero hay un "pero", que lo impide.  
  Habrás podido ver en su momento, que el código resultante en el archivo `style.[hash].css` ya no era el mismo y que aparecían en el toda una serie de importaciones como las siguientes: 
  ```css
  @import "sass/utilities/_all"
  @import "sass/base/_all"
  @import "sass/elements/_all"
  @import "sass/form/_all"
  @import "sass/components/_all"
  @import "sass/grid/_all"
  @import "sass/layout/_all"
  ```
  Todo ello es porqué la cadena de _loaders_ que se había preparado para procesar el archivo `style.css` (que era el archivo que importaba `bulma.sass`) no contenía `sass-loader`, con lo que aunque a lo largo de su cadena aparecieran archivos escritos en _SASS_ los loaders disponibles no serían capaces de continuar correctamente la cadena de procesamiento, y por lo tanto no se obtendría la compilación del código de `bulma.sass`, tal y como ha ocurrido.

* Por lo ocurrido en estos pasos (7 y 8), en los pasos siguientes, es decir, los pasos 9, 10 y 11, lo que se ha hecho es mitigar este problema, mediante el cambio de lenguaje del hasta entonces archivo `style.css`, para que pasara a ser un archivo inicialmente escrito en _SASS_, cuya extensión de archivo (`scss`) contentara la fórmula `test` de la segunda regla que se había añadido en el paso 3. Gracias al cambio de nombre de `style.css` a `style.scss` se detectaría como un archivo al que aplicar la segunda regla y por lo tanto se prepararía una lista de _loaders_ en la que encontraba ya `sass-loader`. Es por ello que el resultado de ejecutar el paso 11 resulta tan exitoso como cuando se ejecutó el paso 6.  
  Cabe resaltar que, a falta de mayor profundidad en el estudio del apartado `module` en la configuración de _webpack_, las _rules_ que se han configurado en el archivo `webpack.module.js` se usan en las importaciones que se encuentran directamente en los archivos _javascript_, cargando una única lista de _loaders_ por cada importación.  
  Dicho de otro modo, una vez cargada la lista de loaders para un archivo _CSS_, aunque esta contenga importaciones de otros recursos (imágenes u otros archivos _CSS_, por ejemplo), ya no se utilizará ninguna otra _rule_, y por lo tanto no se usarán otros _loaders_ que los que ya se habían elegido para la primera importación del archivo _CSS_.  

* En los pasos 12, 13 y 14, lo que has hecho es justamente preparar una única lista de _loaders_ para usarla con archivos con extensiones `.css`, `.sass` y `.scss`, es decir, archivos _CSS_ y archivos _SASS_, por igual. Es por ello que al ejecutar el paso 15, el resultado ya es exitoso, porque el loader `sass-loader` se usa en las importaciones originadas por el `import` inicial del archivo `style.css`, y por lo tanto el código de `bulma.sass` se compila (al contrario de lo que nos ocurría con los pasos 7 y 8).

* Finalmente, en los pasos 16, 17 y 18, lo que has hecho es utilizar la posibilidad que ofrecen los frameworks CSS, como _bulma_ de compilar únicamente el código _SASS_ que crea las reglas _CSS_ que usaremos sin tener que compilar todo el framework íntegro. Es por eso que se crea un archivo `bulma.sass` dentro de la carpeta `src/css` que contiene las importaciones indispensables para crear el código _CSS_ que da formato a las clases que se usan en el _HTML_ que hay en el archivo `index.html` que se encuentra en `src/templates`: `column`, `columns` y `has-text-centered`.  
  Y el paso 19 te permite comprobar el correcto funcionamiento de la compilación obtenida a partir del uso de `sass-loader`, cuyo resultado en forma de _CSS_ es procesado a continuación por `css-loader` y finalmente por el _loader_ del _plugin_ `mini-css-extract-plugin`.