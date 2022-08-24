const GRID_GAP = 10;

const initCanvas = () => {

    const initializeCanvas = () => {
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
    }
    const getGridPosition = (location) => {
        let newLocation = JSON.parse(JSON.stringify(location));
        newLocation.x = Math.round(newLocation.x / GRID_GAP) * GRID_GAP;
        newLocation.y = Math.round(newLocation.y / GRID_GAP) * GRID_GAP;

        return newLocation;
    }
    const drawDC = () => {
        DC.clearRect(0, 0, screenWidth, screenHeight);
        for(let i = 0; i < DCElements.length; i++) {
            if(DCElements[i].selected) {
                continue;
            }
            DC.beginPath();
            DC.lineWidth = DCElements[i].lineWidth || 1;
            DC.strokeStyle = DCElements[i].selected ? '#61dafb' : (DCElements[i].strokeStyle || '#ffffff');
            DC.fillStyle = DCElements[i].fillStyle || null;
            DC.rect(DCElements[i].startPositionX, DCElements[i].startPositionY, DCElements[i].width, DCElements[i].height);
            DC.stroke();
        }
    }
    const drawNDC = () => {
        NDC.clearRect(0, 0, screenWidth, screenHeight);
        for(let i = 0; i < NDCElements.length; i++) {
            NDC.beginPath();
            NDC.lineWidth = NDCElements[i].lineWidth || 1;
            NDC.strokeStyle = NDCElements[i].selected ? '#61dafb' : (NDCElements[i].strokeStyle || '#ffffff');
            NDC.fillStyle = NDCElements[i].fillStyle || null;
            NDC.rect(NDCElements[i].startPositionX, NDCElements[i].startPositionY, NDCElements[i].width, NDCElements[i].height);
            NDC.stroke();
        }
    }
    const unselectAll = () => {
        for(let i = 0; i < DCElements.length; i++) {
            DCElements[i].selected = false;
        }
        drawDC();
    };

    let createMode = false;
    const body = document.querySelector('body');
    let mouseLocation = {x: 0, y: 0};

    const BGCanvas = document.querySelector('#backgroundCanvas');
    const BGC = BGCanvas.getContext('2d');
    const DCanvas = document.querySelector('#drawCanvas');
    const DC = DCanvas.getContext('2d');
    const NDCanvas = document.querySelector('#newDrawCanvas');
    const NDC = NDCanvas.getContext('2d');

    let DCElements = [];
    let NDCElements = [];

    let screenWidth = BGCanvas.offsetWidth;
    let screenHeight = BGCanvas.offsetHeight;

    initializeCanvas();

    body.addEventListener('keydown', (e) => {
        if(e.key === 'n' || e.key === 'N') {
            createMode = true;
        }
        if(e.key === 'Escape') {
            unselectAll();
            drawDC();
            drawNDC();
            createMode = false;
        }
        if(e.key === 'Backspace') {
            let newDCElements = [];
            if(!createMode) {
               for(let i = 0; i < DCElements.length; i++) {
                   if(!DCElements[i].selected) {
                       newDCElements.push(DCElements[i]);
                   }
               }
           }
            DCElements = newDCElements;
            NDCElements = [];
            drawDC();
            drawNDC();
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
            DCElements.push({lineWidth: 1, strokeStyle: '#ffffff', fillStyle: "",startPositionX: gridPosition.x, startPositionY: gridPosition.y, width: 100, height: 100, selected: false });
            drawDC();
            createMode = false;
        } else {
            if(e.shiftKey) {
                NDCElements = [];
                unselectAll();
                drawNDC();
            }
            for(let i = 0; i < DCElements.length; i++) {
                if(DCElements[i].startPositionX <= mouseLocation.x && DCElements[i].startPositionY <= mouseLocation.y && DCElements[i].startPositionX + DCElements[i].width >= mouseLocation.x && DCElements[i].startPositionY + DCElements[i].height >= mouseLocation.y) {
                    DCElements[i].selected = true;
                    NDCElements.push(DCElements[i]);
                    drawNDC();
                    break;
                }
            }
            drawDC();
        }
    })
}