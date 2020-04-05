## CAPÍTULO 2: Proyecto con webpack.config.js

### CAPÍTULO 2: Antes de empezar
Si aún no has seguido los pasos del capítulo 1, sería importante que lo hicieras.  
También sería importante que leyeras el punto llamado ["Antes de empezar"](#capítulo-1-antes-de-empezar) de dicho capítulo.  
Finalmente resultará imprescindible que te hagas a la idea de qué es la configuración de _webpack_, que en resumen es el archivo que rige el proceso de empaquetado (_bundling_ en ingés) que ocurre cada vez que ejecutamos `npx webpack`. Para ello te recomendamos que primero visites [la sección "CONCEPTS"](https://webpack.js.org/concepts/) que encontrarás en la web de _webpack_ para luego continuar con el apartado ["Using a configuration" de la guía "GETTING STARTED"](https://webpack.js.org/guides/getting-started/#using-a-configuration) que encontrarás en la misma web.
  

### CAPÍTULO 2: Pasos previos
Si has seguido los pasos del capítulo 1, tendrás tu proyecto listo para iniciar los pasos del presente capítulo. Pero antes, deberás atender a una cuestión importante: **estás usando un proyecto _git_, que está conectado a un repositorio**. Esto te permitirá hacer una entrega de tu trabajo para poderlo conservar y recuperarlo en este estado actual si lo necesitaras en un futuro.  
Por lo tanto, empecemos con dos pasos previos para asegurar que tu trabajo no corre peligro:

1. Crea un archivo llamado `.gitignore` en tu carpeta `webpack-essential` y añádele el siguiente contenido:  
   ```
   .gitignore
   node_modules
   ```
   Con estas simples líneas te asegurarás de que cualquier operación con _git_ que vayas a realizar, descarte someter al control de versiones de _git_ el propio fichero `.gitignore` y del mismo modo lo haga con la carpeta `node_modules` (que podrás controlar y gestionar con la herramienta _npm_)  

1. Ejecuta las siguientes acciones con la herramienta _git_:
   1. Primero de todo añade todos los archivos de tu proyecto a la entrega que realizarás, con la instrucción:
   ```
   git add -A
   ```
   1. Acto seguido realiza una entrega de los archivos que dispones, con la instrucción:
   ```
   git commit -m "Entrega del capítulo 1"
   ```

Si lo deseas, y sabes cómo puedes llevarlo a cabo, te aconsejamos también que publiques esta entrega en el repositorio/s _git_ remoto con el/los que esté conectado tu proyecto.

### CAPÍTULO 2: Cómo crear webpack.config.js
1. Crea un archivo llamado `webpack.config.js` en la carpeta `webpack-essential`. Puedes usar la instrucción
   ```bash
   touch ./webpack.config.js
   ```  
1. Añádele el siguiente código:
   ```javascript
   module.exports = {}
   ```
   Dentro de este objeto javascript, especificaremos valores de configuración de _webpack_, los **nuestros**.  

1. Comprueba que webpack sigue funcionando aunque nuestra configuración sea aparentemente vacía. Elimina los archivos que haya en la carpeta `dist`. Para ello puedes usar estra instrucción:
   ```bash
   rm -f dist/*
   ```
1. Ahora repite el paso 9 del [primer capítulo](#capítulo-1-cómo-crear-el-proyecto), en que ejecutábamos:
   ```bash
   npx webpack
   ```
   Si inspeccionas el contenido de la carpeta `dist`, deberá aparecer de nuevo el archivo `main.js`.
   Como has podido comprobar, de alguna manera, _webpack_ asume valores de configuración por defecto, que le permiten crear estos archivos, aunque no le hayamos proporcionado configuración alguna, o aunque esté vacía.  

1. Ejecuta ahora la siguiente instrucción para instalar un _plugin_ que nos ayudará a conocer esta configuración:
   ```bash
   npm install --save-dev webpack-config-dump-plugin
   ```
1. Actualiza ahora el archivo `webpack.config.js` tal que su contenido sea el siguiente:
   ```javascript
   const WebpackConfigDumpPlugin = require('webpack-config-dump-plugin')

   module.exports = {
     plugins: [
       new WebpackConfigDumpPlugin()
     ]
   }
   ```
1. Repite nuevamente el paso 4, y ejecuta:
   ```bash
   npx webpack
   ```
1. Abre ahora el archivo llamado `webpack.config.dump` que se ha generado en la carpeta `webpack-essential`. Como verás contiene un contenido que empieza con:
   ```javascript
   module.exports = () => ({ plugins:
      [ { outputPath: './', name: 'webpack.config.dump', depth: 4 } ],
   ```
   A partir del segundo paréntesis de apertura (`(`), vemos un objeto javascript, que finaliza en la última línea, justo antes del último paréntesis de cierre (`)`). **Este objeto contiene la configuración que usa _webpack_ por defecto**.
1. Sustituye el archivo `webpack.config.js` por el archivo `webpack.config.dump`. Para ello puedes usar la instrucción:
   ```
   mv webpack.config.dump webpack.config.js
   ```
   Nuestro proyecto ya está casi listo para la [**VERSIÓN 2.0**](../../releases/tag/v2.0)!  
     
1. Ahora realiza las siguientes modificaciones en el archivo `webpack.config.js`:
   1. Borra el texto que hay entre los claudators de la segunda línea, tal que tu fichero `webpack.config.js` empiece con:
      ```javascript
      module.exports = () => ({ plugins:
          [],
        context:
      ```
   1. Elimina por completo la propiedad `defaultRules` que hay dentro de la propiedad `module`, en caso de que exista. **El objeto que hay en la propiedad `module` no deberá tener ninguna propiedad `defaultRules`**
   1. Modifica la propiedad `minimizer` que hay dentro de la propiedad `optimization`, tal que quede como sigue: `minimizer: [ ],`.  
     
1. Finalmente podemos volver a usar _webpack_ nuevamente, tal que utilize nuestro fichero de configuración.  
   Para ello usaremos la ya conocida instrucción:
   ```
   npx webpack
   ```
  
**HEMOS TERMINADO!**  
Si echas un vistazo a tu carpeta `webpack-essential` encontrarás el siguiente contenido:
```
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
Eso significa que el archivo `webpack.config.js` está correctamente escrito!  
**En el siguiente capítulo aprendremos a modificar algunas de las opciones que en él aparecen**.

### CAPÍTULO 2: Resumen
* Lo primero que has hecho es crear un archivo de configuración para _webpack_, llamado `webpack.config.js`. Como se explica en el apartado ["Using a configuration" de la guía "GETTING STARTED"](https://webpack.js.org/guides/getting-started/#using-a-configuration) que hay en la web de _webpack_, este archivo te permitirá definir opciones de configuración de _webpack_.

* A continuación has creado el contenido básico para este archivo, utilizando `module.exports`, que es manera tradicional (que utiliza sintaxis de _CommonJS_) de exponer el contenido de un módulo _javascript_, como es en este caso el archivo `webpack.config.js`.  
Si desconoces el concepto de **módulo** aplicado a _javascript_, es altamente recomendable que leas el contenido de [esta página](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/M%C3%B3dulos). En ella encontrarás también recursos que te permitirán asimilar una noción sobre qué es el proyecto _CommonJS_.  
Y en caso de que desconozcas su uso en un entorno de un proyecto creado mediante _npm_, o en otras palabras, un proyecto creado mediante herramientas de NodeJS, entonces es oportuno que eches un vistazo a [esta página](https://nodejs.org/en/knowledge/getting-started/what-is-require/), y otro vistazo a [esta otra](https://nodejs.dev/expose-functionality-from-a-nodejs-file-using-exports), para entender porqué y para qué se _expone_ el contenido de un módulo _javascript_.  

* Al alcanzar el punto 5, has instalado un paquete de node llamado `webpack-config-dump-plugin`, sobre el que podrás obtener información en [esta página](https://www.npmjs.com/package/webpack-config-dump-plugin). Y posteriormente, en el punto 6, lo has importado mediante el uso de la función `require` (propia de _CommonJS_) para utilizarlo como **plugin** en la configuración de _webpack_.  
Si no estás familiarizado/a con el concepto "_plugin_" entonces deberías pasarte por el [apartado correspondiente de la sección "CONCEPTS"](https://webpack.js.org/concepts/plugins/) que encontrarás en la web de _webpack_.

* Llegados al punto 8, al ejecutar `npx webpack`, _webpack_ ha hecho uso de este _plugin_ durante su proceso de _empaquetado_, generando un archivo llamado `webpack.config.dump` cuyo contenido es un "volcado" de la configuración que ha utilizado _webpack_ para dicho proceso.

* Luego a partir de esta configuración "volcada" en un fichero, has generado contenido para el archivo de configuración `webpack.config.js`.  
Y como habrás visto la configuración de webpack es muy rica en opciones. De hecho puedes hacerte a la idea de todo lo que podrás configurar si pasas por el apartado ["Options" que hay en la sección "CONFIGURATION"](https://webpack.js.org/configuration/#options) de la web de _webpack_.

* Finalmente, en el punto 10 has realizado algunos ajustes en las opciones de configuración, en tanto que **no existe una correspondencia absoluta** entre el modo en que se expresan las opciones configuración en el archivo `webpack.config.js` y la configuración que hemos obtenido mediante el "volcado".  
Seguramente te habrá llamado la atención el cambio de tipo de dato que ha ocurrido en `module.exports`, pasando de un objeto, tal y como aparecía en el punto 6, a una función. Puedes comprobar si visitas el apartado ["Configuration Types" que hay en la sección "CONFIGURATION"](https://webpack.js.org/configuration/configuration-types/) de la web de _webpack_, que en efecto es posible usar tanto un objeto que contenga opciones de configuración válidas, como también una función que retorne un objeto de ese tipo.