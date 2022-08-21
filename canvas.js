const GRID_GAP = 10;

const getGridPosition = (location) => {
    let newLocation = JSON.parse(JSON.stringify(location));
    newLocation.x = Math.round(newLocation.x / GRID_GAP) * GRID_GAP;
    newLocation.y = Math.round(newLocation.y / GRID_GAP) * GRID_GAP;

    return newLocation;
}

const initCanvas = () => {
    let createMode = false;

    const BGCanvas = document.querySelector('#backgroundCanvas');
    const BGC = BGCanvas.getContext('2d');
    const DCanvas = document.querySelector('#drawCanvas');
    const DC = DCanvas.getContext('2d');
    const NDCanvas = document.querySelector('#newDrawCanvas');
    const NDC = NDCanvas.getContext('2d');

    let screenWidth = BGCanvas.offsetWidth;
    let screenHeight = BGCanvas.offsetHeight;

    BGC.strokeStyle="#666666";
    BGC.lineWidth = 1;
    for(let i = 0; i <= screenWidth; i += 10) {
        BGC.beginPath();
        BGC.moveTo(i, 0);
        BGC.lineTo(i, screenHeight);
        BGC.stroke();
    }
    for(let i = 0; i <= screenHeight; i += 10) {
        BGC.beginPath();
        BGC.moveTo(0, i);
        BGC.lineTo(screenWidth, i);
        BGC.stroke();
    }


    const body = document.querySelector('body');
    let mouseLocation = {x: 0, y: 0};
    body.addEventListener('keydown', (e) => {
        if(e.key === 'n' || e.key === 'N') {
            createMode = true;
        }
        if(e.key === 'Escape') {
            createMode = false;
        }
    })
    body.addEventListener('mousemove', (e) => {
        mouseLocation = {x: e.layerX, y: e.layerY};
        if(createMode) {
            const gridPosition = getGridPosition(mouseLocation);
            NDC.clearRect(0, 0, screenWidth, screenHeight);
            NDC.beginPath();
            NDC.lineWidth = 1;
            NDC.strokeStyle = "#ffffff";
            NDC.rect(gridPosition.x, gridPosition.y, 100, 100);
            NDC.stroke();
        }
    })
    body.addEventListener('click', (e) => {
        if(createMode) {
            const gridPosition = getGridPosition(mouseLocation);
            NDC.clearRect(0, 0, screenWidth, screenHeight);
            DC.beginPath();
            DC.lineWidth = 1;
            DC.strokeStyle = "#ffffff";
            DC.rect(gridPosition.x, gridPosition.y, 100, 100);
            DC.stroke();
            createMode = false;
        }
    })
}