import WebpackLogo from "./assets/img/webpack-logo-on-white-bg.png"
import "./css/bulma.sass"
import "./css/style.css"   

window.addEventListener("DOMContentLoaded", () => {
    let h1 = document.createElement("h1")
    h1.innerHTML = "Este es mi primer proyecto <em>webpack</em>!"
    document.body.appendChild(h1)
}) 

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
