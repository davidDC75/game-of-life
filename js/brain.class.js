class Brain {

    constructor() {

    }

    clickCell(x,y,id) {
        if (!this.currentGrid[x,y]) {
            this.currentGrid[x,y]=1;
            let cell = document.getElementById(id);
            cell.classList.remove('deadCell');
            cell.classList.add('aliveCell');
        } else {
            this.currentGrid[x,y]=0;
            let cell = document.getElementById(id);
            cell.classList.remove('aliveCell');
            cell.classList.add('deadCell');
        }
    }

    calculateNextStep(gridSize,currentGrid,nextGrid) {

    }
}