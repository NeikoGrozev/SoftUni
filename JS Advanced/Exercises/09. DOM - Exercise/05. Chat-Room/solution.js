function solve() {

   document.getElementById('send').addEventListener('click', onClick);

   function onClick() {
      const message = document.getElementById('chat_input').value;

      if (message !== '') {
         const chat = document.getElementById('chat_messages');
         const div = document.createElement('div');
         div.setAttribute('class', 'message my-message');
         div.textContent = message;
         chat.appendChild(div);

         document.getElementById('chat_input').value = '';
      }
   }
}