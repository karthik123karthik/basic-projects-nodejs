const input = document.querySelector('.color');
const button = document.querySelector('.button');

button.addEventListener('click', (event)=>{
     document.getElementById('body').style.backgroundColor = input.value;
     document.getElementById('form').action = `/${input.value}`;
});

