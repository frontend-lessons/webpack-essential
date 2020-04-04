# webpack-essential
Cómo crear un proyecto [webpack](https://webpack.js.org/) **esencial**

## CAPÍTULO 1: Proyecto con webpack sin configuración

### CAPÍTULO 1: Antes de empezar
Si eres nuev@ en esto del desarrollo frontend usando _webpack_, asegúrate antes de tener nociones sólidas sobre _HTML5_, _Javascript_, _JSON_, _ECMAScript_,  _Node.JS_ y _Git_.  
  
A parte deberás disponer de un entorno de desarrollo que cuente con los cliente de terminal _git_ (_git-bash_ si usas Windows) y _npm_ así como también un _IDE_ (entorno de desarrollo de software) para poder editar archivos de código de forma amigable.  
  
Una vez dispongas de todo ello, por favor, asegúrate de tener nociones claras sobre **qué es** _webpack_ y **para qué sirve**.

### CAPÍTULO 1: Cómo crear el proyecto
1. Crea un proyecto nuevo, aquí en github o dónde quieras, y clónalo en tu sistema ejecutando en tu terminal una instrucción git-clone
   ```bash
   git clone git@github.com:{propietario}/{proyecto}.git webpack-essential
   ```  
1. Accede al nuevo directorio con
   ```bash
   cd webpack-essential
   ```  
1. Inicializa un nuevo proyecto node con
   ```bash
   npm init --yes
   ```
1. Ahora deberemos instalar las dependencias `webpack` y `webpack-cli` con
   ```bash
   npm install --save-dev webpack webpack-cli
   ```
   Nuestro proyecto ya está casi listo para la [**VERSIÓN 1.0**](../../releases/tag/v1.0)!  
1. Crea ahora una carpeta src, puedes usar la instrucción 
   ```bash
   mkdir ./src
   ```
1. Ahora añade un archivo llamado `index.js` en la carpeta `src`.
   Puedes usar esta instrucción para crearlo rápidamente:
   ```bash
   touch ./src/index.js
   ```
1. A tu fichero le podrías añadir el siguiente código escrito en _javascript_:
   ```js
   window.addEventListener('DOMContentLoaded', (event) => {
     let h1 = document.createElement('h1');
     h1.innerHTML = 'Este es mi primer proyecto <em>webpack</em>!';
     document.body.appendChild(h1);
   }); 
   ```
1. Y para para terminar, deberás crear un archivo llamado `index.html` (usa la instrucción `touch index.html` si lo deseas), que contenga el siguiente código:
   ```
   <!DOCTYPE html>
   <html lang="en">
   <head>
     <meta charset="UTF-8">
     <title>Mi primer proyecto Webpack</title>
     <script defer src="dist/main.js"></script>
   </head>
   <body>

   </body>
   </html>
   ```
1. Finalmente ya podemos usar _webpack_ por primera vez.
   Para ello lanzaremos la siguiente instrucción:
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
```
  
En este anterior listado de contenido de la carpeta, hemos destacado dos archivos _javascript_: `main.js` e `index.js`. Este último es el que habías creado en los pasos 6 y 7. Y **el primero**, llamado `main.js`, ha sido generado por _webpack_ cuando hemos ejecutado la instrucción del paso 9.  
Ahora que tienes este fichero, puedes abrir en un navegador (moderno) el archivo `index.html` y verás como aparece un mensaje como este:
> ## Este es mi primer proyecto _webpack_!

### CAPÍTULO 1: Resumen
* Lo primero que has hecho es crear un proyecto [git](https://git-scm.com/doc) en un sistema de hospedaje de repositorios _git_, como [_github_](https://github.com/new), [_gitlab_](https://gitlab.com/projects/new), [_bitbucket_](https://bitbucket.org/repo/create), [_sourceforge_](https://sourceforge.net/p/add_project) u [otros](https://alternativeto.net/software/github/).  
Al crear un proyecto obtienes una dirección para clonar.  
  
* La instrucción `git clone` te permite clonar en un directorio local (en nuestro caso `webpack-essential`) un repositorio _git_ que hayas hospedado en un sistema remoto (como _github_, _gitlab_, _bitbucket_ o _sourceforge_). [Aquí tienes un artículo](https://www.atlassian.com/git/tutorials/setting-up-a-repository/git-clone) en el que se te explica cómo y para qué usar esta instrucción.  
  
* El siguiente paso que has seguido es la creación de un archivo `package.json`, mediante la instrucción `npm init --yess`, que permitirà que trabajes con un proyecto _node_ en tu directorio `webpack-essential`.  
Si quieres entender un poco mejor la herramienta _npm_ [pásate por esta página](https://docs.npmjs.com/about-npm/).  
También puedes leer sobre el archivo `package.json` [en esta página](https://nodejs.org/en/knowledge/getting-started/npm/what-is-the-file-package-json/) y puedes leer sobre la instrucción `npm init` [en esta otra](https://docs.npmjs.com/creating-a-package-json-file)
  
* Acto seguido has instalado mediante la instrucción `npm install` dos dependencias clave para usar webpack: `webpack` y `webpack-cli`.  
`webpack` es el paquete que contiene la lógica que utiliza _Webpack_ para empaquetar el código y los assets de tu proyecto _frontend_.  
`webpack-cli` es el paquete que contiene la herramienta que te permite interactuar con `webpack` mediante el comando de terminal `webpack`.  
Para entender un poco mejor cómo funciona la instrucción `npm install`, te aconsejamos [visitar esta página](https://docs.npmjs.com/downloading-and-installing-packages-locally). Y si además te interesa conocer más de cerca las dependencias que has instalado, no dudes en visitar [la página del paquete _webpack_](https://www.npmjs.com/package/webpack) y también [la página del paquete _webpack-cli_](https://www.npmjs.com/package/webpack-cli)

* En los siguientes tres pasos, has creado el archivo principal de aplicación (`index.js`), sobre la que se basará nuestro proyecto _frontend_. Es un archivo escrito en _javascript_ que contiene algunos rasgos de _ECMAScript2015_ (conocido como _harmony_ o como _ES6_), como en este caso una "arrow function".  
Puedes conocer más de cerca la notación _arrow_ para funciones de _javascript_ visitando [esta página](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Funciones/Arrow_functions).  
El código de este archivo utiliza el evento `DOMContentLoaded` para inyectar en un documento _html_ una etiqueta `<h1>` con un título.  
Puedes leer sobre este evento [en esta página](https://developer.mozilla.org/es/docs/Web/Events/DOMContentLoaded) si no lo conocías. 

* A continuación, has concentrado en un único paso, la creación de un documento _html_ que contiene una etiqueta `<script>` que usará el código de un archivo `dist/main.js`, hasta el momento desconocido. Esta etiqueta, usa además el atributo `defer` para que la ejecución de dicho archivo ocurra cuando se haya "parseado" el documento _html_.  
Si no conocías este atributo (`defer`), puedes leer sobre el en [esta página](https://developer.mozilla.org/es/docs/Web/HTML/Elemento/script).  
Si el término "parseado" (_parsing_ en inglés) te suena a extraterrestre, deberías leer al respecto en [páginas como esta](https://developer.mozilla.org/en-US/docs/Web/Performance/How_browsers_work).

* Finalmente has ejecutado una instrucción de la herramienta _npx_ que lanza el proceso de empaquetaje (_bundling_) de _webpack_ (usando para ello la herramienta que hemos instalado con el paqueta `webpack-cli`).  
Este proceso crea el archivo `dist/main.js` a partir del contenido del archivo `index.js` y de sus dependencias, aunque en nuestro caso no tenga.  
Si quieres conocer la herramienta _npx_ es aconsejable que visites [esta página](https://nodejs.dev/the-npx-nodejs-package-runner).
