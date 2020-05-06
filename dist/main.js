/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "/css/img/3b7bf087cbac835e6f7d4b7dc9711e72.png";

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/components/banner-webpack.js
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
function showBanner(image,alt=null,link,title,delay=3000,container=null){
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
// EXTERNAL MODULE: ./src/assets/img/webpack-logo-on-white-bg.png
var webpack_logo_on_white_bg = __webpack_require__(0);
var webpack_logo_on_white_bg_default = /*#__PURE__*/__webpack_require__.n(webpack_logo_on_white_bg);

// EXTERNAL MODULE: ./src/css/bulma.sass
var bulma = __webpack_require__(1);

// EXTERNAL MODULE: ./src/css/style.css
var style = __webpack_require__(2);

// CONCATENATED MODULE: ./src/index.js



   

window.addEventListener("DOMContentLoaded", () => {
  let h1 = document.createElement("h1")
  h1.innerHTML = "Este es mi primer proyecto <em>webpack</em>!"
  document.body.appendChild(h1)
  showBanner(webpack_logo_on_white_bg_default.a,"Webpack corporative logo","https://webpack.js.org","Web oficial de webpack",3000,document.querySelector("#main"))
}) 



/***/ })
/******/ ]);