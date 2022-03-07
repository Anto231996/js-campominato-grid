document.getElementById('play').addEventListener( "click",
    function(){
        createNewGame();
    }
)

function createNewGame(){

    document.querySelector('#grid').innerHTML = "";

    const level = parseInt( document.getElementById('level').value );

    let cellsPerRow;
    let cellsNumber;

    switch (level) {
        case 1:
        default:
            cellsNumber = 100;
            break;
        case 2:
            cellsNumber = 81;
            break;
        case 3:
            cellsNumber = 49;
            break;
    }

    cellsPerRow = Math.sqrt(cellsNumber);

    for ( let i = 1; i <= cellsNumber; i++){
        const cell = createSquare(i, cellsPerRow);
        cell.addEventListener('click', function(){
            this.classList.add('clicked');
        });
        document.querySelector('#grid').appendChild(cell);
    }

}

function createSquare(number, cellsPerRow){
    let cell = document.createElement('div');
    cell.classList.add('square');
    cell.style.width = `calc(100% / ${cellsPerRow})`
    cell.style.height = cell.style.width;
    cell.innerHTML = `<span>${number}</span>`;
    return cell;
}


function randomInteger (minValue, maxValue){
    if (isNaN(parseInt(minValue)) || isNaN(parseInt(maxValue))){
        console.log(randomInteger)
    }
    return (Math.floor(Math.random()* ((maxValue + 1) - minValue) + minValue))
}