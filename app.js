const grupo = document.querySelector('#grupo');
const centena = document.querySelector('#centena');
const milhar = document.querySelector('#milhar');
const img = document.getElementById('img');
const img2 = document.getElementById('img2');
const tentativa = document.getElementById('try-again');
const p1 = document.getElementById('p1');
let zero = '0';
let zero2 = '00';
let zero3 = '000';

const timer = function(elem) {
  setInterval(function(){
    if(elem.style.visibility == 'hidden'){
      elem.style.visibility = 'visible';
    }else{
      elem.style.visibility = 'hidden';
    }
  }, 1200);
}

timer(img);

const gr = () => {
  let gru = Math.floor(Math.random() * 25) + 1;
  img2.setAttribute('style', 'block');
  setTimeout(() => img2.setAttribute('style', 'display: none'), 4000);

  setTimeout(() => {
  if(gru == 1) {
    img.innerHTML = `<img src="img/avestruz.png">`   
  } else if(gru == 2) {
    img.innerHTML = `<img src="img/aguia.jpg">`
  } else if(gru == 3) {
    img.innerHTML = `<img src="img/burro.jpg">`
  } else if(gru == 4) {
    img.innerHTML = `<img src="img/borboleta.png">`
  } else if(gru == 5) {
    img.innerHTML = `<img src="img/dog.jpg">`
  } else if(gru == 6) {
    img.innerHTML = `<img src="img/cabra.jpg">`
  } else if(gru == 7) {
    img.innerHTML = `<img src="img/bode.jpg">`
  } else if(gru == 8) {
    img.innerHTML = `<img src="img/camel.jpg">`
  } else if(gru == 9) {
    img.innerHTML = `<img src="img/cobra.jpg">`
  } else if(gru == 10) {
    img.innerHTML = `<img src="img/coelho.jpg">`
  } else if(gru == 11) {
    img.innerHTML = `<img src="img/cavalo1.jpg">`
  } else if(gru == 12) {
    img.innerHTML = `<img src="img/elefante.jpg">`
  } else if(gru == 13) {
    img.innerHTML = `<img src="img/galo.png">`
  } else if(gru == 14) {
    img.innerHTML = `<img src="img/cat.jpg">`
  } else if(gru == 15) {
    img.innerHTML = `<img src="img/alligator.jpg">`
  } else if(gru == 16) {
    img.innerHTML = `<img src="img/lion.jpg">`
  } else if(gru == 17) {
    img.innerHTML = `<img src="img/macaco.jpg">`
  } else if(gru == 18) {
    img.innerHTML = `<img src="img/pig.jpg">`
  } else if(gru == 19) {
    img.innerHTML = `<img src="img/pavaum.png">`
  } else if(gru == 20) {
    img.innerHTML = `<img src="img/peru.jpg">`
  } else if(gru == 21) {
    img.innerHTML = `<img src="img/bull.jpg">`
  } else if(gru == 22) {
    img.innerHTML = `<img src="img/tiger.jpg">`
  } else if(gru == 23) {
    img.innerHTML = `<img src="img/bear.jpg">`
  } else if(gru == 24) {
    img.innerHTML = `<img src="img/veado.jpg">`
  } else if(gru == 25) {
    img.innerHTML = `<img src="img/vaca.jpg">`
  }
  }, 4000);
}

const ct = () => {
  img2.setAttribute('style', 'block');
  setTimeout(() => {
  let cen = Math.floor(Math.random() * 999);
  if(cen < 10) {
    cen = zero2 + cen
  } else if(cen < 100) {
    cen = zero + cen
  }
  //timer(conteudo);
  img2.setAttribute('style', 'display: none');
  img.innerHTML = `
    <h1 class="bg-dark text-white text-center p-3">${cen}</h1>`;
  }, 4000);
}

const mi = () => {
  img2.setAttribute('style', 'block');

  setTimeout(() => {
    let mil = Math.floor(Math.random() * 9999);
  
    if(mil < 10) {
      mil = zero3 + mil
    } else if(mil < 100) {
      mil = zero2 + mil
    } else if(mil < 1000) {
      mil = zero + mil
    }
    img2.setAttribute('style', 'display: none');
    img.innerHTML = `
    <h1 class="bg-dark text-white text-center p-3">${mil}</h1>`
  }, 4000);  
}

grupo.addEventListener('click', gr);
centena.addEventListener('click', ct);
milhar.addEventListener('click', mi);
tentativa.addEventListener('click', () => window.location.reload())
 

