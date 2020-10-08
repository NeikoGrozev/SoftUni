function solve() {
    let inputs = document.querySelectorAll('input');
    const checkBtn = document.querySelector('button');
    const clearBtn = document.querySelectorAll('button')[1];
    const table = document.querySelector('table');
    const p = document.querySelector('#check > p');

    checkBtn.addEventListener('click', checking);
    clearBtn.addEventListener('click', reset);

    function checking(e) {

        let matrix = [];
        let countInput = 0;

        for (let row = 0; row < 3; row++) {

            matrix[row] = [];

            for (let col = 0; col < 3; col++) {
                let num = inputs[countInput].value;

                if (num != undefined) {
                    matrix[row][col] = Number(num);
                } else {
                   break;
                }

                countInput++;
            }
        }

        let isSudomu = true;

        for (let i = 0; i < matrix.length; i++) {
            let row = matrix[i];
            let col = matrix.map(row => row[i]);
            
            if (col.length != [...new Set(col)].length || row.length != [...new Set(row)].length) {
                isSudomu = false;
                break;
            }
        }

        if(isSudomu){
            table.style.border = "2px solid green";
            p.style.color = "green";
            p.textContent = "You solve it! Congratulations!";
        } else{
            table.style.border = "2px solid red";
            p.style.color = "red";
            p.textContent = "NOP! You are not done yet...";
        }
    }

    function reset(e){
        [...inputs].forEach(x => x.value = '');
        table.style.border = "none";
        p.style.color = '';
        p.textContent = '';
    }
}