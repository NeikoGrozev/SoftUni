function loadCanvas(player) {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");

    let background = new Image();
    let target = new Image();
    let sight = new Image();

    ctx.font = "24px serif";
    ctx.fillStyle = "yellow";

    let targetObj = { speed: 5, x: 0, y: 100, width: 300, height: 500 };
    let mouse = { x: 0, y: 100 };

    background.src = "imgs/west.jpg";
    target.src = "imgs/target.png";
    sight.src = "imgs/sight.png";

    let backgroundPromise = new Promise((resolve, reject) => {
        $(background).on('load', resolve);
    });

    let targetPromise = new Promise((resolve, reject) => {
        $(target).on('load', resolve);
    });

    let sightPromise = new Promise((resolve, reject) => {
        $(sight).on('load', resolve);
    });

    Promise.all([backgroundPromise, targetPromise, sightPromise]).then(() => {
        drawCanvas(canvas.width / 2, canvas.height / 2);
    });

    elements.saveBtn().addEventListener('click', () => {
        saveGame(player);
    }); 

    function drawCanvas(mouseX, mouseY) {
        ctx.drawImage(background, 0, 0, 800, 600);
        ctx.drawImage(target, targetObj.x, targetObj.y, targetObj.width, targetObj.height);
        ctx.fillText(`Player: ${player.name}`, 650, 25);
        ctx.fillText(`Money: ${player.money}`, 650, 50);
        ctx.fillText(`Bullets: ${player.bullets}`, 650, 75);

        if (player.bullets === 0 || player.money <= 0) {
            ctx.font = "48px serif";
            ctx.fillStyle = "red";
            ctx.fillText(`Reload!`, canvas.width / 2 - 50, canvas.height / 2);
            ctx.font = "24px serif";
            ctx.fillStyle = "yellow";

            elements.reloadBtn().addEventListener('click', () => {
                if (player.bullets === 0 && player.money <= 0) {
                    player.bullets = 6;
                    player.money = 500;
                } else if (player.money <= 0) {
                    player.money = 500;
                } else {
                    player.bullets = 6;
                }
            });
        }

        ctx.drawImage(sight, mouseX, mouseY, 50, 50);
    }

    $(canvas).mousemove(function (event) {
        mouse.x = event.clientX - 35;
        mouse.y = event.clientY - 20;
        drawCanvas(mouse.x, mouse.y);
    });

    $(canvas).click(function (event) {
        if (player.bullets > 0) {
            if (event.clientX > targetObj.x && event.clientX < targetObj.x + targetObj.width
                && event.clientY > targetObj.y && event.clientY < targetObj.y + targetObj.height) {
                player.money += 40;
            }

            if (player.money > 0) {
                player.bullets--;
                player.money -= 20;
            }

            if (player.money < 0) {
                player.bullets = 0;
                player.money = 0;
            }
        }
    });

    //Set a property in the Canvas to allow for cleaning the interval from outside
    canvas.intervalId = setInterval(moveTarget, 50);

    function moveTarget() {
        if (targetObj.speed > 0 && targetObj.x + targetObj.width >= canvas.width) {
            targetObj.speed = 0 - targetObj.speed;
        }
        else if (targetObj.speed < 0 && targetObj.x <= 0) {
            targetObj.speed = 0 - targetObj.speed;
        }

        targetObj.x += targetObj.speed;
        drawCanvas(mouse.x, mouse.y)
    }
}