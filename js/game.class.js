class Game {

    isPlaying = false;
    currentGrid = null;
    nextGrid = null;
    gridSize = 0;
    cellIdPrefix = '';
    timer = 2500;
    myInterval = Object;
    grid = Object;

    constructor(gridContainer,gridSize,cellIdPrefix,timer) {
        this.gridSize = gridSize;
        this.cellIdPrefix = cellIdPrefix;
        this.timer = timer;

        this.currentGrid=new Array(gridSize);
        this.nextGrid=new Array(gridSize);

        this.grid = new Grid(gridContainer);
        this.grid.drawEmptyGrid(this);
        let play = document.getElementById('play-button');
        play.onclick = () => {
            this.play();
        }
        let pause = document.getElementById('pause-button');
        pause.onclick = () => {
            this.pause();
        }
    }

    initGame() {

    }

    play() {
        if (!this.isPlaying) {
            this.isPlaying = true;
            this.myInterval = setInterval( ()=> {
                this.calculateNextGrid();
            },this.timer);
        }
    }

    pause() {
        if (this.isPlaying) {
            this.isPlaying = false;
            clearInterval(this.myInterval);
        }
    }

    reset() {

    }

    calculateNextGrid() {
        console.log('dans calculateNextGrid');
        let count=0;
        for (let y=0;y<this.gridSize;y++) {
            for (let x=0;x<this.gridSize;x++) {
                let neighborhood=this.calculateNeighborhood(x,y);
                if (this.currentGrid[y][x]==0 && neighborhood==2) {
                    this.nextGrid[y][x]=1;
                    this.grid.setAliveCell(this.cellIdPrefix+count);
                } else if (this.currentGrid[y][x]==1 && (neighborhood==2 || neighborhood==3)) {
                    this.grid.setAliveCell(this.cellIdPrefix+count);
                    this.nextGrid[y][x]=1;
                } else if (this.currentGrid[x][y]==1 && neighborhood!=2 && neighborhood!=3) {
                    this.nextGrid[y][x]=0;
                    this.grid.setDeadCell(this.cellIdPrefix+count);
                } else {
                    this.nextGrid[y][x]=0;
                    this.grid.setDeadCell(this.cellIdPrefix+count);
                }
                count++;
            }
        }
        this.currentGrid=this.nextGrid;
    }

    calculateNeighborhood(x,y) {
        let top= (y==0) ? this.gridSize-1 : y-1;
        let bottom= (y==this.gridSize-1) ? 0 : y+1;
        let left= (x==0) ? this.gridSize-1 : x-1;
        let right= (x==this.gridSize-1) ? 0 : x+1;
        let nbCell=0;
        // On commence par top et on tourne dans le sens d'une aiguille d'une montre
        if (this.currentGrid[top][x]==1) nbCell++;
        if (this.currentGrid[top][right]==1) nbCell++;
        if (this.currentGrid[y][right]==1) nbCell++;
        if (this.currentGrid[bottom][right]==1) nbCell++;
        if (this.currentGrid[bottom][x]==1) nbCell++;
        if (this.currentGrid[bottom][left]==1) nbCell++;
        if (this.currentGrid[y][left]==1) nbCell++;
        if (this.currentGrid[top][left]==1) nbCell++;
        return nbCell;
    }

    clickCell(x,y,id) {
        if (!this.isPlaying) {
            if (!this.currentGrid[y][x]) {
                this.currentGrid[y][x]=1;
                this.grid.setAliveCell(id);
            } else {
                this.currentGrid[y][x]=0;
                this.grid.setDeadCell(id);
            }
        }
    }

    changeGridSize(gridSize) {
        this.grid.gridSize=gridSize;
    }
}