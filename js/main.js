/*
    A Game of Life
    with HTML, CSS and Javascript */

gridSize=10;
cellIdPrefix='cell-id-';
timer=1500;
gridContainer=document.getElementById('grid');

game= new Game(gridContainer,gridSize,cellIdPrefix,timer);