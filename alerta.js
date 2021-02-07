const form = document.getElementById('alerta');
const f1 = document.getElementById('f1');
const f2 = document.getElementById('f2');
const celular = document.getElementById('celular');

if(localStorage.key('bardoveio') === null){
  setTimeout(() => {
    form.removeAttribute('style', 'display: none;');
  }, 5000)
}

f1.addEventListener('submit', (e) =>{

  const reg = /^\(?\d{2}\)?[ ]?\d{5}[-]?\d{4}$/;

  if(!reg.test(celular.value)){
    const falha = document.createElement('div');
    falha.setAttribute('class', 'alert alert-light mt-2 w-100');
    falha.innerText = 'Favor preencha com o número de celular completo';
    f1.insertBefore(falha, f2);
    setTimeout(() => {
      falha.setAttribute('style', 'display: none;')
    }, 6000);
  } else {
    const falha = document.createElement('div');
    falha.setAttribute('class', 'alert alert-success mt-2 w-100');
    falha.innerText = 'Seu número foi salvo enviaremos notícias e palpites diretamente no seu celular!';
    f1.insertBefore(falha, f2);
    setTimeout(() => {
      form.setAttribute('style', 'display: none;')
    }, 10000);
    localStorage.setItem('bardoveio', celular.value);
  }
  e.preventDefault();
})
document.getElementById('fechar').addEventListener('click', () =>{
  form.remove();
})
  

  
