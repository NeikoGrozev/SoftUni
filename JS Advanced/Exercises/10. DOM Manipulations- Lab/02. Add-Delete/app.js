function addItem() {
   const ul = document.querySelector('#items');
   const input = document.querySelector('#newText').value;

   if(input == ''){
       return;
   }

   const li = document.createElement('li');
   li.textContent = input + ' '; 

   const a = document.createElement('a');
   let linkText = document.createTextNode('[Delete]');

   a.appendChild(linkText);
   a.href = '#';
   a.addEventListener('click', deleteItem);

   li.appendChild(a);
   ul.appendChild(li);

   document.querySelector('#newText').value = '';

   function deleteItem(){
       li.remove();
   }
}