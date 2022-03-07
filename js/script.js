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
                if (bombs.includes(i)){
                    this.classList.add('clicked');
                } else {
                    this.classList.add('clicked-bomb');
                }

            });
        
        document.querySelector('#grid').appendChild(cell);
    }

    const bombs = generateBombList(16, cellsNumber)
    console.log(bombs)

}

function createSquare(number, cellsPerRow){
    let cell = document.createElement('div');
    cell.classList.add('square');
    cell.style.width = `calc(100% / ${cellsPerRow})`
    cell.style.height = cell.style.width;
    cell.innerHTML = `<span>${number}</span>`;
    return cell;
}

function generateUniqueRandomNumber(numsBlacklist, minValue, maxValue){
    let check = false;
    let randomInt;

    while (!check){
        randomInt = (Math.floor(Math.random()* ((maxValue + 1) - minValue) + minValue));

        if (!numsBlacklist.includes(randomInt)){
            check = true;
        }

    }

    return randomInt;
}

function generateBombList (bombs, numberOfCells){
    const bombList = []
    for( i = 0; i < bombs; i++){
        bombList.push(generateUniqueRandomNumber(bombList, 1, numberOfCells))
    }
    return bombList
}