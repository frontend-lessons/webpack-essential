## CAPÍTULO 4: Uso de plugins en webpack.config.js

### CAPÍTULO 4: Antes de empezar
Si aún no has seguido los pasos de los [anteriores capítulos](../README.md#capítulos), sería importante que lo hicieras, especialmente los puntos que se llaman "Antes de empezar", que encontrarás en ellos.  
También resultará imprescindible que te hagas a la idea de qué són los _plugins_ para _webpack_; para ello te recomendamos leer [esta página](https://webpack.js.org/concepts/plugins/).  
Finalmente, ya que vamos a trabajar, indirectamente, con el archivo `webpack.config.js` es necesario que tengas una noción clara sobre de qué archivo se trata y cual es su uso. En este último caso, te aconsejamos leer el apartado ["Using a configuration" de la guía "GETTING STARTED"](https://webpack.js.org/guides/getting-started/#using-a-configuration) de la web de _webpack_.

### CAPÍTULO 4: Pasos previos
Si has seguido los pasos del capítulo 3, tendrás tu proyecto listo para iniciar los pasos del presente capítulo. Pero antes, deberás atender a una cuestión importante: **estás usando un proyecto _git_, que está conectado a un repositorio**.  
Esto te permitirá hacer una entrega de tu trabajo para poderlo conservar y recuperarlo en este estado actual si lo necesitaras en un futuro.  
Por lo tanto, empecemos con algunos pasos previos para asegurar que tu trabajo no corre peligro:


Ejecuta las siguientes acciones con la herramienta _git_:
1. Primero de todo añade todos los archivos de tu proyecto a la entrega que realizarás, con la instrucción:
   ```bash
   git add -A
   ```
1. Acto seguido realiza una entrega de los archivos que dispones, con la instrucción:
   ```bash
   git commit -m "Entrega del capítulo 3"
   ```

Si lo deseas, y sabes cómo puedes llevarlo a cabo, te aconsejamos también que publiques esta entrega en el repositorio/s _git_ remoto con el/los que esté conectado tu proyecto.  
Si tu proyecto _git_ está correctamente configurado, te bastará con ejecutar:
```
git push
```

### CAPÍTULO 4: Cómo usar plugins en webpack
1. Del mismo modo a como se realizó con el _plugin_ "webpack-config-dump" que se instaló en el [paso número 5](https://github.com/frontend-lessons/webpack-essential/blob/master/doc/charpter-02.md#cap%C3%ADtulo-2-c%C3%B3mo-crear-webpackconfigjs) del capítulo 2 ("_Proyecto con webpack.config.js_"), instala ahora el plugin _copy-webpack-plugin_ mediante la instrucción:
   ```bash
   npm install --save-dev copy-webpack-plugin
   ```
1. Abre el archivo `webpack.plugins.js`, que hay en la carpeta `config/webpack`, y añádele el siguiente código al principio:
   ```javascript
   const CopyPlugin = require('copy-webpack-plugin');
   ```
1. En ese mismo fichero, modifica ahora el array asignado a `module.exports` para que quede como el siguiente código: 
   ```javascript
   module.exports = [
       new CopyPlugin(
       [
           {
             from:'./src/css',
             to:'css/[name].[hash].[ext]'
           }
       ])
   ]
   ```
1. Crea un archivo llamado `style.css` en una nueva carpeta llamada `css` que deberás crear dentro de la carpeta `src`. Para ello puedes usar las siguientes instrucciones de cónsola: 
   ```bash
   mkdir -p ./src/css
   touch ./src/css/style.css
   ```
1. Abre este archivo `style.css` y anádele el siguiente código: 
   ```css
   @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

   h1 {
     font-family: Roboto;
   }
   ```
1. Ejecuta la instrucción del proceso de empaquetado de _webpack_, y comprueba que todo ha ido correctamente.   
   ```bash
   npx webpack
   ```
   Como podrás observar se ha creado un archivo llamado `css/style.17b707910e897f3e7a428f4b4d780941.css` en la carpeta `dist`.  

1. Añade la siguiente etiqueta _html_ dentro la etiqueta `<head>` del archivo `index.html`:
   ```html
   <link rel="stylesheet" href="dist/css/style.17b707910e897f3e7a428f4b4d780941.css">
   ```
   Si abres el archivo `index.html` en un navegador, verás que ahora el título generado ("_Este es mi primer proyecto webpack!_") aparece con la fuente de texto "Roboto".
     
1. Añade ahora la siguiente etiqueta dentro de `<head>`, pero hazlo justo antes de la que has creado en el punto anterior:
   ```html
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.8.1/css/bulma.min.css" integrity="sha256-1nEaE91OpXJD7M6W5uSiqxhdmrY+lOOTHC1iUxU9Pds=" crossorigin="anonymous" />
   ```
   Si abres el archivo `index.html` en el navegador, o bien si actualizas la pestaña en la que lo tuvieras abierto, verás que el tamaño de la fuente ha decrecido.  
     
1. Modifica ahora el archivo `style.css` que hay en la carpeta `src/css` y fija un tamaño de fuente para los elementos `h1`, tal que la regla _css_ que habíamos creado quede similar a esta:
   ```css
   h1 {
     font-family: Roboto;
     font-size: 3rem;
   }
   ```
1. Vuelve a ejecutar el proceso de empaquetado de _webpack_ con:
   ```bash
   npx webpack
   ```  
   Si vuelves a abrir el archivo `index.html` o a refrescar la pestaña del navegador en el que estuviera abierto, verás que **EL TAMAÑO DE SU FUENTE NO CAMBIA**.  
   Por otro lado verás que en la carpeta `dist/css` ha aparecido un archivo llamado `style.fa574c5cabfaf6fbaf76dc391c67c0d5.css`, y que este archivo sí contiene la propiedad `font-size` tal y como la habíamos definido en el punto anterior.  
     
1. Instala ahora el _plugin_ `clean-webpack-plugin` con la siguiente instrucción:
   ```bash
   npm install --save-dev clean-webpack-plugin
   ```
1. Añade la siguiente línea al inicio del archivo `webpack.plugins.js` que hay en la carpeta `config/webpack`:
   ```javascript
   const { CleanWebpackPlugin } = require('clean-webpack-plugin');
   ```
1. Ahora deberás añadir al array asignado a `module.exports` una nueva instancia de `CleanWebpackPlugin`, tal que te quede como sigue:
   ```javascript
   module.exports = [
      new CleanWebpackPlugin(),
      new CopyPlugin(
      [
          {
             from:'./src/css',
             to:'css/[name].[hash].[ext]'
          }
      ])
   ]
   ```
1. Ejecutaremos nuevamente el empaquetado de webpack con:
   ```bash
   npx webpack
   ```  
   Fíjate que el archivo `style.17b707910e897f3e7a428f4b4d780941.css` ya no se encuentra en la carpeta `dist/css/`.  
     
1. Ahora es el turno del _plugin_  _HtmlWebpackPlugin_, que instalaremos con:
   ```bash
   npm install --save-dev html-webpack-plugin
   ```
1. Añade la siguiente línea al principio del archivo `webpack.plugins.js`, que hay en la carpeta `config/webpack`
   ```javascript
   const HtmlWebpackPlugin = require('html-webpack-plugin');
   ```
1. Ahora añade una instancia al final del array que compone el valor de `module.exports` en el mismo archivo, tal que obtengas:  
   ```javascript
   module.exports = [
      new CleanWebpackPlugin(),
      new CopyPlugin(
      [
          {
             from:'./src/css',
             to:'css/[name].[hash].[ext]'
          }
      ]),
      new HtmlWebpackPlugin()
   ]
   ```
   Nuestro proyecto ya está casi listo para la [**VERSIÓN 4.0**](../../releases/tag/v4.0)!  
     
1. Si ejecutas ahora el proceso de empaquetado de webpack, con
   ```bash
   npx webpack
   ```  
   podrás observar como aparece un archivo `index.html` dentro de la carpeta `dist`.  
   Si lo abres en un navegador verás el mismo resultado que el que teníamos al principio de este capítulo cuando abríamos el archivo `index.html` de la carpeta `webpack-essential`.  
     
1. Finalmente, añade los siguientes parámetros en la creación de la instancia `HtmlWebpackPlugin` en el archivo `webpack.plugins.js` que hay en la carpeta `config/webpack`. En este caso deberá quedarte del siguiente modo,:
   ```javascript
   module.exports = [
      new CleanWebpackPlugin(),
      new CopyPlugin(
      [
          {
             from:'./src/css',
             to:'css/[name].[hash].[ext]'
          }
      ]),
      new HtmlWebpackPlugin({
          template: 'index.html',
          inject: false,
          minify: false
      })
   ]
   ```
1. Y como término, bastará con ejecutar nuevamente el empaquetamiento:
   ```bash
   npx webpack
   ```  
   Al abrir el archivo `dist/index.html`, vemos que el código es idéntico al del archivo `index.html`.  


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
    style.fa574c5cabfaf6fbaf76dc391c67c0d5.css
  index.html
  main.js
index.html
node_modules/
package.json
package-lock.json
src/
  css/
    style.css
  index.js
webpack.config.js
```

Eso significa que el archivo de configuración parcial de _webpack_: `webpack.plugins.js` está correctamente escrito!  
**En el siguiente capítulo combinaremos el uso de varios _plugins_  modificando este mismo archivo**.

### CAPÍTULO 4: Resumen
* En este capítulo tus tres primeros pasos (1, 2 y 3) han consistido en la instalación del paquete de Node llamado `copy-webpack-plugin` y su integración en el archivo de configuración de la opción plugins.  
**Estos plugins se ejecutarán de manera secuencial (uno tras otro) en el mismo orden en que aparezcan en el array asignado a la opción `plugins`.**  

  Este paquete que hemos instalado es un _plugin_ con el que podemos añadir pasos y funcionalidades extras al proceso de empaquetado.  
  El concepto _plugin_ de _webpack_ se introduce en el [apartado "Plugins"](https://webpack.js.org/concepts/plugins/) que hay en la sección "CONCEPTS" de la web de _webpack_; y se extiende en [la sección llamada "PLUGINS"](https://webpack.js.org/plugins/), que actúa de referencia para algunos _plugins_ conocidos y apoyados por el equipo de desarrollo de _webpack_.  
  Y justamente cuando la leemos se nos invita a visitar [esta sección](https://github.com/webpack-contrib/awesome-webpack#webpack-plugins) de la página github de _awesome-webpack_, en la que aparece una referencia completa de plugins "_contrib_", es decir, conocidos por el equipo de _webpack_.  
  La [página informativa](https://www.npmjs.com/package/copy-webpack-plugin) del paquete _CopyWebpackPlugin_ contiene una breve referencia a las opciones de tipo _patterns_ `from` y `to`, que hemos utilizado en el paso 3.  

* En los siguientes 3 pasos (4, 5 y 6) se ha creado una carpeta `css` en la que se ha guardado un nuevo archivo _CSS_. Esta carpeta se había indicado en la opción `from` del parámetro _patterns_ usado en el paso 3. Es por ello que al ejecutar el paso 6 se crea dentro de la carpeta `dist/css`, un archivo "réplica" del que habíamos creado en los pasos 4 y 5. El nombre con que debía generarse este archivo "réplica" había sido especificado en la opción `to` del paso 3.  
  Este uso del plugin `copy-webpack-plugin` puede parecer un tanto confuso y poco útil, pero combinado con otros plugins, permite actualizar de manera masiva (por carpetas y/o extensiones de archivo) los archivos que use una web. Organizándolos por carpetas finales.

* En el paso 7, para comprobar que efectivamente el archivo generado era una copia de `style.css`, se ha modificado el archivo `index.html` para que lo utilizara como hoja de estilos.
 
* En el paso 8 se añade el uso de un framework CSS (_Bulma_) como hoja de estilos principal de `index.html`, con la única intención de alterar el resultado producido en el paso 7 y así forzar a que deba modificarse el archivo `style.css` en el paso 9.  
Esta modificación de `style.css` creará un nuevo archivo "réplica" en el paso 10, pero en este caso con un nombre distinto. Ello se debe a la opción `to` empleada en el paso 3, que indica que el nombre de los archivos réplica debe incluir un _hash_ justo antes de la extensión de archivo.  
El término "hash" se emplea para hablar de "aleatoriedad" o "dispersión", y se usa cuando se hace referencia a un algoritmo informático que calcula un valor numérico o alfanumérico a partir de otro valor, o cuando se hace referencia directamente a este valor calculado. En nuestro caso, en la fórmula de generación del nombre de archivo "réplica", la posición `[hash]` indica que hay que usar el resultado de emplear un algoritmo de este tipo con el contenido del archivo original. De este modo, cuando cambia el contenido del archivo original (en nuestro caso `style.css`) que el plugin `CopyWebpackPlugin` se disponía a copiar, el nombre del archivo réplica generado cambiará (en su posición "[hash]").  
Este plugin está documentado en [esta página](https://www.npmjs.com/package/clean-webpack-plugin)

* Como en los pasos 6 y 10 se han generado dos archivos réplica, de los cuales únicamente llegaríamos a necesitar uno de ellos, en el siguiente paso (el número 11) lo que se hace es instalar un plugin, llamado `clean-webpack-plugin`, cuya finalidad esencial es la de eliminar el contenido de la carpeta `dist` cuando se realiza el proceso de empaquetado.

* Una vez instalado, gracias a los pasos 12 y 13, el plugin se usa justo antes de CopyPlugin, para evitar que elimine los archivos "réplica" que se crean con el plugin `copy-webpack-plugin`.  
  Es por ello que al ejecutar el empaquetado en el paso 14, el archivo réplica sobrante desaparece.

* A continuación, en los pasos 15, 16 y 17 se añade a nuestro proceso de empaquetado el plugin `html-webpack-plugin`, que sin duda es, hoy por hoy, el plugin más popular de _webpack_.  
  El plugin HTML se situa como el último en ejecutarse, algo que es aconsejable siempre que la ejecución de los plugins sea secuencial. 

* El plugin se pone a prueba en el paso 18, obteniendo un archivo `index.html` en el directorio `dist`.

* Finalmente en los dos últimos pasos (19 y 20), se modifican opciones del plugin `html-webpack-plugin` para que tome al archivo `index.html` (del directorio `webpack-essential`) como plantilla para la generación del archivo `index.html` que se crea en `dist`.  
  Adicionalmente se indican otras opciones que serán abarcadas en posteriores capítulos, y que deben indicarse para que el archivo `index.html` resultante en la carpeta `dist` sea idéntico al archivo `index.html` original.  

  En este punto es natural que pueda discreparse del uso de un plugin nuevo, para lograr el mismo resultado que podría obtenerse con el plugin `copy-webpack-plugin`. Sin duda esta observación tiene todo el sentido.  
  Ahora bien, que se haya elegido el plugin `html-webpack-plugin` no es casual. Su elección está orientada a facilitar la introducción al siguiente capítulo de esta série, en el que se utilizará dicho plugin para realizar operativas específicas que justifican su elección.  

  En [esta página](https://www.npmjs.com/package/html-webpack-plugin) puede leerse documentación extensa sobre el uso de este plugin y las integraciones con otros plugins que admite.


