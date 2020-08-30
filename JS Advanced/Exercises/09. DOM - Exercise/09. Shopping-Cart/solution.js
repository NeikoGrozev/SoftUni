function solve() {
   const addButtons = document.querySelectorAll('.add-product');
   const checkoutButton = document.querySelector('.checkout');
   let textarea = document.querySelector('textarea');
   let totalPrice = 0;
   let list = [];

   Array.from(addButtons).forEach(x => x.addEventListener('click', addProduct));

   checkoutButton.addEventListener('click', checkout)

   function addProduct(e) {
      const productName = e.target.parentElement.previousElementSibling.children[0].textContent;
      const productPrice = e.target.parentElement.nextElementSibling.textContent;

      if (!list.includes(productName)) {
         list.push(productName);
      }
      
      totalPrice += Number(productPrice);
      textarea.textContent += `Added ${productName} for ${productPrice} to the cart.\n`
   }

   function checkout() {
      // Array.from(addButtons).forEach(x => x.removeEventListener('click', addProduct));
      // checkoutButton.removeEventListener('click', checkout);
      const allButtons = document.querySelectorAll('button');
      Array.from(allButtons).forEach(x => x.disabled = true);

      textarea.textContent += `You bought ${list.join(', ')} for ${totalPrice.toFixed(2)}.`
   }
}