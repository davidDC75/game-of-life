class Game {

    isPlaying = false;
    currentGrid = new Array(new Array);
    nextGrid = new Array(new Array);
    gridSize = 0;
    cellIdPrefix = '';
    timer = 0;
    myInterval = Object;
    grid = Object;

    constructor(gridContainer,gridSize,cellIdPrefix,timer) {
        this.gridSize = gridSize;
        this.cellIdPrefix = cellIdPrefix;
        this.timer = 0;
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
            this.myInterval = setInterval(this.calculateNextGrid(),this.timer);
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
        console.log('Dans calculateNextGrid');
        let count=0;
        for (let y=0;y<this.gridSize;y++) {
            for (let x=0;x<this.gridSize;x++) {
                let cell=document.getElementById(this.cellIdPrefix+count);
                console.log("id cell : "+this.cellIdPrefix+count)
                let neighborhood=this.calculateNeighborhood(x,y);
                if (this.currentGrid[x,y]==0 && neighborhood==2) {
                    this.nextGrid[x,y]=1;
                    this.grid.setAliveCell(cell);
                } else if (this.currentGrid[x,y]==1 && (neighborhood==2 || neighborhood==3)) {
                    this.grid.setAliveCell(cell);
                    this.nextGrid[x,y]=1;
                } else if (this.currentGrid[x,y]==1 && neighborhood!=2 && neighborhood!=3) {
                    this.nextGrid[x,y]=0;
                    this.grid.setDeadCell(cell);
                } else {
                    this.nextGrid[x,y]=0;
                    this.grid.setDeadCell(cell);
                }
                count++;
            }
        }
        this.currentGrid=this.nextGrid;
    }

    calculateNeighborhood(x,y) {
        let top=(y==0)?this.gridSize-1:y;
        let bottom=(y==this.gridSize-1)?0:y;
        let left=(x==0)?this.gridSize-1:x;
        let right=(x==this.gridSize-1)?0:x;
        let nbCell=0;
        // On commence par top et on tourne dans le sens d'une aiguille d'une montre
        if (this.gridSize[x,top]==1) nbCell++;
        if (this.gridSize[right,top]==1) nbCell++;
        if (this.gridSize[right,y]==1) nbCell++;
        if (this.gridSize[right,bottom]==1) nbCell++;
        if (this.gridSize[x,bottom]==1) nbCell++;
        if (this.gridSize[left,bottom]==1) nbCell++;
        if (this.gridSize[left,y]==1) nbCell++;
        if (this.gridSize[left,top]==1) nbCell++
        return nbCell;
    }

    clickCell(x,y,id) {
        if (!this.isPlaying) {
            if (!this.currentGrid[x,y]) {
                this.currentGrid[x,y]=1;
                let cell = document.getElementById(id);
                this.grid.setAliveCell(cell);
            } else {
                this.currentGrid[x,y]=0;
                let cell = document.getElementById(id);
                this.grid.setDeadCell(cell);
            }
        }
    }

    changeGridSize(gridSize) {
        this.grid.gridSize=gridSize;
    }
}