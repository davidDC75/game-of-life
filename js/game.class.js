class Game {

    isPlaying = false;
    currentGrid = null;
    nextGrid = null;
    gridSize = 0;
    cellIdPrefix = '';
    timer = 2500;
    generation = 0;
    playButton = Object;
    pauseButton = Object;
    resetButton = Object;
    generationValue = Object;
    sliderRandomize = Object;
    sliderRandomizeValue = Object;
    randomizeButton = Object;
    sliderGrid = Object;
    sliderGridValue = Object;
    sliderGridButton = Object;
    sliderTimer = Object;
    sliderTimerValue = Object;
    sliderTimerButton = Object;
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

        this.playButton = document.getElementById('play-button');
        this.playButton.addEventListener('click', () => {
            this.play();
        });

        this.pauseButton = document.getElementById('pause-button');
        this.pauseButton.addEventListener('click',() => {
            this.pause();
        });

        this.pauseButton.classList.add('visibilityHidden');

        this.resetButton = document.getElementById('reset-button');
        this.resetButton.addEventListener('click', () => {
            this.reset();
        })

        this.generationValue = document.getElementById('generation-value');

        this.sliderRandomize = document.getElementById('slider-randomize');
        this.sliderRandomize.addEventListener('change', () => {
            this.sliderRandomizeChange();
        });

        this.sliderRandomizeValue = document.getElementById('slider-randomize-value');

        this.randomizeButton = document.getElementById('randomize-button');
        this.randomizeButton.addEventListener('click', () => {
            this.randomize()
        })

        this.sliderGrid = document.getElementById('slider-grid');
        this.sliderGrid.addEventListener('change', () => {
            this.sliderGridChange();
        });

        this.sliderGridValue = document.getElementById('slider-grid-value');

        this.sliderGridButton = document.getElementById('slider-button');
        this.sliderGridButton.addEventListener('click', () => {
            this.changeGridSize();
        });

        this.sliderTimer = document.getElementById('slider-timer');
        this.sliderTimer.addEventListener('change', () => {
            this.changeTimerValueSlider();
        });

        this.sliderTimerValue = document.getElementById('slider-timer-value');

        this.sliderTimerButton = document.getElementById('timer-button');

        this.sliderTimerButton.addEventListener('click', () => {
            this.changeTimer()
        });

    }

    initGame() {

    }

    play() {
        if (!this.isPlaying) {
            this.isPlaying = true;
            this.myInterval = setInterval( ()=> {
                this.calculateNextGrid();
            },this.timer);
            this.playButton.classList.add('visibilityHidden');
            this.pauseButton.classList.remove('visibilityHidden');
            this.resetButton.classList.add('visibilityHidden');
            this.randomizeButton.classList.add('visibilityHidden');
            this.sliderGridButton.classList.add('visibilityHidden');
            this.sliderTimerButton.classList.add('visibilityHidden');
        }
    }

    pause() {
        if (this.isPlaying) {
            this.isPlaying = false;
            clearInterval(this.myInterval);
            this.playButton.classList.remove('visibilityHidden');
            this.pauseButton.classList.add('visibilityHidden');
            this.resetButton.classList.remove('visibilityHidden');
            this.randomizeButton.classList.remove('visibilityHidden');
            this.sliderGridButton.classList.remove('visibilityHidden');
            this.sliderTimerButton.classList.remove('visibilityHidden');
        }
    }

    reset() {
        if (!this.isPlaying) {
            this.grid.clearGrid();
            this.grid.drawEmptyGrid(this);
            this.generation=0;
            this.refreshGeneration();
        }
    }

    refreshGeneration() {
        this.generationValue.innerHTML = this.generation;
    }

    calculateNextGrid() {
        // On initialise la grille temporaire
        for (let y=0;y<this.gridSize;y++) {
            this.nextGrid[y].fill(0,0,this.gridSize-1);
        }

        let count=0;
        for (let y=0;y<this.gridSize;y++) {
            for (let x=0;x<this.gridSize;x++) {
                let neighborhood=this.calculateNeighborhood(x,y);

                if (this.currentGrid[y][x]==0 && neighborhood==3) {
                    this.nextGrid[y][x]=1;
                    this.grid.setAliveCell(this.cellIdPrefix+count);
                } else if (this.currentGrid[y][x]==1 && neighborhood!=2 && neighborhood!=3) {
                    this.nextGrid[y][x]=0;
                    this.grid.setDeadCell(this.cellIdPrefix+count);
                } else {
                    this.nextGrid[y][x]=this.currentGrid[y][x];
                }
                count++;
            }
        }

        this.generation++;
        this.refreshGeneration();

        // On copie le temporaire dans la grille suivante
        for (let y=0;y<this.gridSize;y++) {
            for (let x=0;x<this.gridSize;x++) {
                this.currentGrid[y][x]=this.nextGrid[y][x];
            }
        }
    }

    calculateNeighborhood(x,y) {
        let top = (y==0) ? this.gridSize-1 : y-1;
        let bottom = (y==this.gridSize-1) ? 0 : y+1;
        let left = (x==0) ? this.gridSize-1 : x-1;
        let right = (x==this.gridSize-1) ? 0 : x+1;
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

    sliderRandomizeChange() {
        this.sliderRandomizeValue.innerHTML=this.sliderRandomize.value;
    }

    sliderGridChange() {
        this.sliderGridValue.innerHTML=this.sliderGrid.value;
    }

    changeGridSize() {
        if (!this.isPlaying) {
            this.gridSize=this.sliderGrid.value;
            this.reset();
        }
    }

    randomize() {
        if (!this.isPlaying) {
            this.reset();
            let count=0;
            for (let y=0;y<this.gridSize;y++) {
                for (let x=0;x<this.gridSize;x++) {
                    let randomNumber = Math.floor(Math.random()*10);
                    if (randomNumber>this.sliderRandomize.value) {
                        this.clickCell(x,y,this.cellIdPrefix+count);
                    }
                    count++;
                }
            }
            this.generation=0;
            this.refreshGeneration();
        }
    }

    changeTimerValueSlider() {
        this.sliderTimerValue.innerHTML=this.sliderTimer.value+"ms";
    }

    changeTimer() {
        this.timer=this.sliderTimer.value;
    }
}