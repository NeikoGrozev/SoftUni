function solve() {

   let trArray =[...document.querySelectorAll('tbody tr')];
   trArray.map(x => x.addEventListener('click', function () {

      if (this.hasAttribute('style')) {
         this.removeAttribute('style');
      } else {
         trArray.map(x => x.removeAttribute('style'));
         this.style.backgroundColor = "#413f5e";
      }
   }));
}