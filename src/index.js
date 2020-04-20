import {showBanner} from "./components/banner-webpack"
import WebpackLogo from "!!url-loader!./assets/img/webpack-logo-on-white-bg.png"
import "./css/bulma.sass"
import "./css/style.css"   

window.addEventListener("DOMContentLoaded", () => {
  let h1 = document.createElement("h1")
  h1.innerHTML = "Este es mi primer proyecto <em>webpack</em>!"
  document.body.appendChild(h1)
  showBanner(WebpackLogo,"Webpack corporative logo","https://webpack.js.org","Web oficial de webpack",3000,document.querySelector("#main"))
}) 

