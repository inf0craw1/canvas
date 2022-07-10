
const initCanvas = () => {
    const canvas = document.querySelector('#canvas');

    let ctx = canvas.getContext('2d');
    ctx.fillStyle = "rgba(200,0,0,0.5)";
    ctx.fillRect(10, 10, 50, 50);
    ctx.fillStyle= "rgba(0,0,200,0.5)";
    ctx.fillRect(30, 30, 50, 50);
}

