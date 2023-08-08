class Grid {

    gridContainer;

    constructor(gridContainer) {
        this.gridContainer = gridContainer;
    }

    drawEmptyGrid(game) {
        this.gridContainer.style.width=20*game.gridSize+"px";
        let count = 0;
        for(let y=0; y<game.gridSize; y++) {
            let row=document.createElement('div');
            row.classList.add('gridRow');
            game.currentGrid[y]=new Array(game.gridSize);
            game.nextGrid[y]=new Array(game.gridSize);

            for(let x=0; x<game.gridSize; x++) {
                let cell=document.createElement('div');
                let id=game.cellIdPrefix+count;
                cell.setAttribute('id',id);
                cell.classList.add('cellCommon','deadCell');
                game.currentGrid[y][x]=0;
                game.nextGrid[y][x]=0;
                cell.addEventListener('click', () => {
                    game.clickCell(x,y,id);
                });
                row.appendChild(cell);
                count++;
            }
            this.gridContainer.appendChild(row);
        }
    }

    clearGrid() {
        this.gridContainer.innerHTML='';
    }

    setDeadCell(id) {
        let cell=document.getElementById(id);
        cell.classList.remove('aliveCell');
        cell.classList.add('deadCell');
    }

    setAliveCell(id) {
        let cell=document.getElementById(id);
        cell.classList.remove('deadCell');
        cell.classList.add('aliveCell');
    }
}