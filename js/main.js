/*
    A Game of Life
    with HTML, CSS and Javascript */

gridSize=10;
gridContainer=document.getElementById('grid');

class Game {

    isPlaying = false;
    grid = Object;

    constructor(gridContainer,gridSize) {
        this.grid = new Grid(gridContainer, gridSize);
        this.grid.drawEmptyGrid();
    }

    initGame() {

    }

    play() {

    }

    stop() {

    }

    reset() {

    }

    changeGridSize(gridSize) {
        this.grid.gridSize=gridSize;
    }
}

class Grid {

    gridSize = 0;
    gridContainer;
    initialGrid;
    currentGrid;
    nextGrid;

    constructor(gridContainer, gridSize) {
        this.gridContainer = gridContainer;
        this.gridSize = gridSize;
        this.initialGrid = new Array(new Array);
        this.currentGrid = new Array(new Array);
        this.nextGrid = new Array(new Array);
    }

    drawEmptyGrid() {
        let count = 0;

        for(let y=0; y<this.gridSize; y++) {
            let row=document.createElement('div');
            row.classList.add('gridRow');

            for(let x=0; x<this.gridSize; x++) {
                let cell=document.createElement('span');
                cell.setAttribute('id','cell-id-'+count);
                cell.classList.add('cellCommon','deadCell');
                row.appendChild(cell);
                count++;
            }

            this.gridContainer.appendChild(row);
        }
    }

    drawGrid(tblGrid) {

    }

    setDeadCell(x,y) {

    }

    setAliveCell(x,y) {

    }
}

class Brain {

    constructor() {

    }

    calculateNextStep(gridSize,currentGrid,nextGrid) {

    }
}

game= new Game(gridContainer,gridSize);