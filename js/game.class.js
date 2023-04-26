class Game {

    isPlaying = false;
    currentGrid = new Array(new Array);
    nextGrid = new Array(new Array);
    gridSize = 0;
    grid = Object;
    brain = Object;

    constructor(gridContainer,gridSize) {
        this.gridSize = gridSize;
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
            console.log('play');
        }
    }

    pause() {
        if (this.isPlaying) {
            this.isPlaying = false;
            console.log('pause');
        }
    }

    reset() {

    }

    clickCell(x,y,id) {
        if (!this.isPlaying) {
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
    }

    changeGridSize(gridSize) {
        this.grid.gridSize=gridSize;
    }
}