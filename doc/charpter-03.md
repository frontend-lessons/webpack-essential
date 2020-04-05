## CAPÍTULO 3: Uso de require en webpack.config.js

### CAPÍTULO 3: Antes de empezar
Si aún no has seguido los pasos de los [anteriores capítulos](../README.md#capítulos), sería importante que lo hicieras, especialmente los puntos que se llaman "Antes de empezar", que encontrarás en ellos.  
También resultará imprescindible que te hagas a la idea de qué es la función `require` y para qué se usa; para ello te recomendamos leer [esta página](https://nodejs.org/en/knowledge/getting-started/what-is-require/).  
Finalmente, ya que vamos a trabajar con el archivo `webpack.config.js` es necesario que tengas una noción clara sobre qué archivo se trata y cual es su uso. En este último caso, te aconsejamos leer el apartado ["Using a configuration" de la guía "GETTING STARTED"](https://webpack.js.org/guides/getting-started/#using-a-configuration) de la web de _webpack_.

### CAPÍTULO 3: Pasos previos
Si has seguido los pasos del capítulo 2, tendrás tu proyecto listo para iniciar los pasos del presente capítulo. Pero antes, deberás atender a una cuestión importante: **estás usando un proyecto _git_, que está conectado a un repositorio**. Esto te permitirá hacer una entrega de tu trabajo para poderlo conservar y recuperarlo en este estado actual si lo necesitaras en un futuro.  
Por lo tanto, empecemos con dos pasos previos para asegurar que tu trabajo no corre peligro:

1. Abre el archivo llamado `.gitignore` que hay en tu carpeta `webpack-essential` y **añádele** el siguiente contenido:  
   ```
   *.dump
   ```
   Con estas simples líneas te asegurarás de que cualquier operación con _git_ que vayas a realizar, descarte someter al control de versiones de _git_ ficheros como `webpack.config.dump`  

1. Ejecuta las siguientes acciones con la herramienta _git_:
   1. Primero de todo añade todos los archivos de tu proyecto a la entrega que realizarás, con la instrucción:
   ```
   git add -A
   ```
   1. Acto seguido realiza una entrega de los archivos que dispones, con la instrucción:
   ```
   git commit -m "Entrega del capítulo 2"
   ```

Si lo deseas, y sabes cómo puedes llevarlo a cabo, te aconsejamos también que publiques esta entrega en el repositorio/s _git_ remoto con el/los que esté conectado tu proyecto.

### CAPÍTULO 3: Cómo usar require en webpack.config.js
1. Crea una carpeta llamada `config` y dentro de ella crea una carpeta llamada `webpack`. Puedes usar la siguiente instrucción para lograrlo rápidamente:
   ```bash
   mkdir -p ./config/webpack/   
   ```  
1. Crea ahora dentro de la carpeta `webpack` los siguientes archivos: `webpack.plugins.js`, `webpack.optimization.js` y `webpack.module.js`. Puedes usar las siguiente instrucción para crearlos fácilmente
   ```bash
   touch ./config/webpack/webpack.{plugins,optimization,module}.js
   ```
1. Añade en cada uno de estos archivos el siguiente código
   ```javascript
   module.exports = 
   ```
1. Ahora copia el valor de la propiedad `plugins` que hay en el archivo `webpack.config.js` y pégalo al final del código del archivo `config/webpack/webpack/webpack.plugins.js`, tal que el contenido de este último quede como sigue:
   ```javascript
   module.exports = []
   ```
1. Repite con el valor de la propiedad `module` que hay en `webpack.config.js` y pégalo al final del cósdigo de `config/webpack/webpack.module.js`. Este último archivo deberá empezar de modo parecido al siguiente código:
   ```javascript
   module.exports = { 
    unknownContextRequest: '.',
    unknownContextRecursive: true,
    unknownContextCritical: true,
   ```
1. Y ahora repite con el valor de la propiedad `optimization` que hay en `webpack.config.js` y pégalo al final del cósdigo de `config/webpack/webpack.optimization.js`. Este último archivo deberá empezar de modo parecido al siguiente código:
   ```javascript
   module.exports = { 
    removeAvailableModules: true,
    removeEmptyChunks: true,
    mergeDuplicateChunks: true,
   ```
1. Ahora deberás actualizar los valores de las opciones `plugins`, `module` y `optimization` del archivo `webpack.config.js` usando la función `require`. Sigue los siguientes pasos para ello:
   1. Usa el valor `require('./config/webpack/webpack.plugins.js')` para la opción `plugins`, tal que obtengas algo como:
      ```javascript
      plugins: require('./config/webpack/webpack.plugins.js'),
      ```
   1. Usa ahora el valor `require('./config/webpack/webpack.module.js')` para la opción `module`, tal que tengas algo como:
      ```javascript
      module: require('./config/webpack/webpack.module.js'),
      ```
   1. Finalmente, usa el valor `require('./config/webpack/webpack.optimization.js')` para la opción `optimization`, tal que te quede algó así:
      ```javascript
      optimization: require('./config/webpack/webpack.optimization.js'),
      ```
1. Ejecuta la instrucción del proceso de empaquetado de _webpack_, y comprueba que todo ha ido correctamente.   
   ```
   npx webpack
   ```
   Nuestro proyecto ya está casi listo para la [**VERSIÓN 3.0**](../../releases/tag/v3.0)!  

1. Ahora usaremos la función `require` para importar el módulo `path`, y así poder usar sus funciones en las opciones que usan rutas de sistema. Añade, por tanto, el siguiente código al principio del archivo `webpack.config.js`:
   ```javascript
   const path = require('path');
   ```
1. Sustituye el valor de la opción `context` en el archivo `webpack.config.js` por `path.resolve(__dirname)`, tal que obtengas:  
   ```javascript
   context: path.resolve(__dirname),
   ```
1. Procede ahora con el valor de la opción `path` que hay dentro de la opción `output` en el archivo `webpack.config.js`, tal que quede de este modo:
   ```javascript
   path: path.resolve(__dirname,'dist'),
   ```
     
1. Finalmente podemos volver a usar _webpack_ nuevamente, tal que utilize nuestro fichero de configuración.  
   Para ello usaremos la ya conocida instrucción:
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
  main.js
index.html
node_modules/
package.json
package-lock.json
src/
  index.js
webpack.config.js
```
Eso significa que los archivos de configuración de _webpack_: `webpack.config.js`, `webpack.module.js`, `webpack.optimization.js` y `webpack.plugins.js` están correctamente escritos!  
**En el siguiente capítulo aprendremos la opción `plugins` modificando el archivo `webpack.plugins.js`**.

### CAPÍTULO 3: Resumen
* Lo primero que has hecho es crear una carpeta en la que se almacenarán varios archivos de configuración parcial de _webpack_, llamada `config/webpack`. 

* Justo después has creado dichos archivos, cuyos nombres están relacionados con las opciones de _webpack_ `plugins`, `optimization` y `module`.  
   Estas opciones están documentadas en los siguientes apartados de la sección "CONFIGURATION"](https://webpack.js.org/configuration/#options) de la web de _webpack_: 
   - Apartado ["plugins"](https://webpack.js.org/configuration/plugins/) 
   - Apartado ["module"](https://webpack.js.org/configuration/module/)
   - Apartado ["optimization"](https://webpack.js.org/configuration/optimization/) 

   Los conceptos que residen detrás de términos como "plugins" o "module", se pueden adquirir visitando, respectivamente, el [apartado "Plugins"](https://webpack.js.org/concepts/plugins/) y el [apartado "Loaders"](https://webpack.js.org/concepts/loaders/) que hay en la sección "CONCEPTS" de la web de _webpack_.

* En los pasos 3, 4, 5 y 6 has extraido los valores de configuración de las opciones `plugins`, `optimization` y `module` y los has trasladado a los ficheros de configuración parcial. Estos ficheros de configuración parcial se usan como módulos de _javascript_, y exponen su contenido para que pueda ser _requerido_ o _importado_ desde otros módulos _javascript_.  
Si desconoces el concepto de **módulo** aplicado a _javascript_, es altamente recomendable que leas el contenido de [esta página](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/M%C3%B3dulos). En ella encontrarás también recursos que te permitirán asimilar una noción sobre qué es el proyecto _CommonJS_. 

* Acto seguido, en el punto 7, has utilizado la función `require` para _importar_ al módulo principal (el archivo `webpack.config.js`) los contenidos expuestos por cada uno de los módulos anteriores (los archivos de configuración parcial); y para que los contenidos de los módulos se ubiquen exactamente en los lugares que les corresponden, has utilizado la función require en las opciones `plugins`, `optimization` y `module` (que son las opciones de donde habíamos extraído sus valores).  
Si consideras que para tí, la función `require` es un concepto lejano, entonces es oportuno que eches un vistazo a [esta página](https://nodejs.org/en/knowledge/getting-started/what-is-require/), y otro vistazo a [esta otra](https://nodejs.dev/expose-functionality-from-a-nodejs-file-using-exports), para entender porqué y para qué se _expone_ el contenido de un módulo _javascript_, y cómo mediante la función `require` se _importa_ hacia otro módulo que usará ese contenido que ha sido distribuido en módulos.  

* Al alcanzar el punto 9, mediante el uso nuevamente de `require`, se ha _importado_ justamente un objeto `path` dotado de algunos métodos que necesitábamos usar. El objeto _path_ se ha creado mediante la importación del módulo de _npm_ que lleva ese mismo nombre, y sobre el cual podrás encontrar información en [esta página](https://www.npmjs.com/package/path).  
   Seguramente habrás notado que existe una diferencia llamativa en la manera en que se indica a la función `require` el módulo que queremos importar.  
   Todo ello se explica en un párrafo al final de [esta página](https://nodejs.org/en/knowledge/getting-started/what-is-require/) que dice literalmente:  
     
   > _The rules of where `require` finds the files can be a little complex, but a simple rule of thumb is that if the file doesn't start with "./" or "/", then it is either considered a core module (and the local Node.js path is checked), or a dependency in the local `node_modules` folder_. _If the file starts with "./" it is considered a relative file to the file that called `require`. If the file starts with "/", it is considered an absolute path_. _NOTE: you can omit ".js" and `require` will automatically append it if needed_. 
  
  
* Y finalmente, en los punto 10 y 11, has reemplazado los valores de las opciones `context` y `path`, para que utilicen el método `resolve` del módulo path, en lugar de tener una ruta escrita de manera literal.  
   Y es que gracias a este método, el contenido del archivo `webpack.config.js` se ha vuelto independiente de la ubicación del proyecto en el que se use, y por lo tanto ha pasado a ser **reaprovechable**.  

   En cuanto a la función `resolve` del módulo `path`, básicamente devuelve una ruta construida a partir de sus tramos. Verás que esta función está documentada en [esta página](https://nodejs.org/docs/latest/api/path.html#path_path_resolve_paths).  
     
   Para terminar, es interesante que sepas que `__dirname` es una _variable_ disponible en cualquier módulo, a la que _NodeJS_ le asigna el valor del resultado de ejecutar la función `dirname` del módulo `path`, y que básicamente corresponde a la ruta hacia la carpeta en la que se encuentra el archivo donde se usa (ya sea `__dirname` o la función `dirname`).  
   Podrás leer al respecto de `__dirname` en [esta página](https://nodejs.org/docs/latest/api/modules.html#modules_dirname) y de la función `dirname` en [esta otra](https://nodejs.org/docs/latest/api/path.html#path_path_dirname_path).