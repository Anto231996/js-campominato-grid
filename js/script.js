const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const select = document.getElementById("level");
const grid = document.getElementById("grid");
const button = document.getElementById("start");

function start() {

    grid.innerHTML = '';
    grid.style.display = 'flex';

    let attempts = 0;
    const totalBombs = 16;

    let columns;

    switch (select.value) {
        case "2":
            columns = 9;
            break;
        case "3":
            columns = 7;
            break;
        default:
            columns = 10;
            break;
    }

    const totalCells = columns * columns;

    const maxAttempts = totalCells - totalBombs;
    let bombs = [];

    const generateBombs = (totalBombs, totalNumber) => {
        const bombs = [];
        while (bombs.length < totalBombs) {
            const randNumber = getRandomNumber(1, totalNumber);
            if (!bombs.includes(randNumber)) {
                bombs.push(randNumber);
            }
        }
        return bombs;
    }

    const generateGrid = (cellsNumber, cellsPerRow, bombs) => {
        for (let i = 1; i <= cellsNumber; i++) {
            const cell = createCell(i, cellsPerRow);
            cell.addEventListener('click', onCellClick);
            grid.appendChild(cell);
        }
    }

    function createCell(cellNumber, cellsPerRow) {
        const cell = document.createElement("div");
        cell.id =  cellNumber;
        cell.className = "cell";
        cell.innerText = cellNumber;
        const wh = `calc(100% / ${cellsPerRow})`;
        cell.style.height = wh;
        cell.style.width = wh;
        return cell;
    }

    function onCellClick(event) {
        const cell = event.target;
        cell.removeEventListener("click", onCellClick);

        let number = parseInt(cell.id);

        if (bombs.includes(number)) {
            gameOver(bombs, attempts, true);
        } else {
            cell.classList.add("safe")
            attempts++;
            if (attempts === maxAttempts) {
                gameOver(bombs, attempts, false);
            }
        }
    }

    const gameOver = (bombs, attempts, hasLost) => {
        const allCells = grid.querySelectorAll('.cell');

        for (let i = 0; i < allCells.length; i++) {
            allCells[i].removeEventListener('click', onCellClick);
        }

        showBoms(bombs);

        const message = document.createElement('h2');
        message.className = 'message';

        const messageText = hasLost ? `HAI PERSO, RIPROVA (questo è il tuo punteggio ${attempts})` : `HAI VINTO!`
        message.innerText = messageText;
        grid.appendChild(message);

    }

    const showBoms = (bombs) => {
        const cells = document.querySelectorAll('.cell');
        for (let i = 0; i < totalCells; i++) {
            const cell = cells[i];
            const cellNumber = parseInt(cell.innerText);
            if (bombs.includes(cellNumber)) {
                cell.classList.add('bomb');
            }
        }
    }

    bombs = generateBombs(totalBombs, totalCells)
    console.log(bombs);

    generateGrid(totalCells, columns, bombs);
}

button.addEventListener("click", () => start());