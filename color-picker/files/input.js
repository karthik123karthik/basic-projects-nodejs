const input = document.querySelector('.color');
const button = document.querySelector('.button');
const button2 = document.querySelector('.button2')
const button3 = document.querySelector('.button3')

button.addEventListener('click', (event)=>{
     document.getElementById('form').method = `GET`;
     document.getElementById('form').action = `/${input.value}`;
});

button2.addEventListener('click', (event)=>{
     document.getElementById('form').method = `POST`;
     document.getElementById('form').action = `/${input.value}`;
});
button3.addEventListener('click', (event)=>{
     document.getElementById('form').method = `DELETE`;
     document.getElementById('form').action = `/${input.value}`;
});




