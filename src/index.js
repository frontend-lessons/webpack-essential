   import './css/bulma.sass';
   import './css/style.css';   
   window.addEventListener('DOMContentLoaded', (event) => {
     let h1 = document.createElement('h1');
     h1.innerHTML = 'Este es mi primer proyecto <em>webpack</em>!';
     document.body.appendChild(h1);
   }); 
