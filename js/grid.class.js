class Grid {

    gridContainer;

    constructor(gridContainer) {
        this.gridContainer = gridContainer;
    }

    drawEmptyGrid(game) {
        let count = 0;
        for(let y=0; y<game.gridSize; y++) {
            let row=document.createElement('div');
            row.classList.add('gridRow');

            for(let x=0; x<game.gridSize; x++) {
                let cell=document.createElement('span');
                let id='cell-id-'+count;
                cell.setAttribute('id',id);
                cell.classList.add('cellCommon','deadCell');
                row.appendChild(cell);
                count++;
                game.currentGrid[x,y]=0;
                cell.onclick = () => {
                    game.clickCell(x,y,id);
                }
            }
            this.gridContainer.appendChild(row);
        }
    }

    clearGrid() {
        this.gridContainer.innerHTML='';
    }

    drawGrid(tblGrid) {

    }

    setDeadCell(grid,x,y) {

    }

    setAliveCell(grid,x,y) {

    }
}