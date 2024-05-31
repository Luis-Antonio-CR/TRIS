// Dichiarazione variabili e costanti.

const TABLE = document.querySelector('#tris'); // non constringo il browser a cercare continuamente il nodo.
const TABLEDIMENSION = 3;
const MAXMOVES = 5;
const PLAYER_SYMBOLS = ["", "X", "O"];

var gameData = []; //Matrice di dati. Registra lo stato della partita.

var gameMoves = []; //Matrice delle mosse dei giocatori.

var activePlayer = 1; //Giocatore possibile 1 o 2

//restituisce un oggetto {r,c}, con le coordinate dell-ID
const fromIdToCords = function(id) {
    var row = Number(id[1]); //conversione esplicita.
    var col = id[2] - 0; //conversione implicita.
    return {row:row, col:col}
};

// Scambia il giocatore attivo tra 1 e 2
function exchangePlayer(){
    if (activePlayer == 1){
        activePlayer = 2;
    } else {
        activePlayer = 1;
    }
}

function controllMoves(cellObj){
    //controllare che lunghezza di gameMoves sia minore di massimo mosse
    if(gameMoves.length < MAXMOVES-1){
        //se si aggiungo segno la casella
        gameMoves.push(cellObj);
    } else if(gameMoves.length < MAXMOVES) {
        var cellFirtsMove = document.querySelector(`#C${gameMoves[0].row}${gameMoves[0].col}`);
        cellFirtsMove.bgColor = "#96e072";
        gameMoves.push(cellObj);
    } else {
        //Pulisco la prima cella inserita.
        var cellToRemove = document.querySelector(`#C${gameMoves[0].row}${gameMoves[0].col}`);
        cellToRemove.innerHTML = "";
        cellToRemove.bgColor = "";
        gameData[gameMoves[0].row][gameMoves[0].col] = 0;
        //Aggiungo la nuova cella.
        gameMoves.shift();
        gameMoves.push(cellObj);
        //Segno la prossima cella che verra' cancellata.
        var cellFirtsMove = document.querySelector(`#C${gameMoves[0].row}${gameMoves[0].col}`);
        cellFirtsMove.bgColor = "#96e072";
    }
}

function controllCombos (combination, player){
    switch(combination){
        case "o0":
            if(gameData[0][0]==player && gameData[0][1]==player && gameData[0][2]==player){
                return true;
            }
        case "o1":
            if(gameData[1][0]==player && gameData[1][1]==player && gameData[1][2]==player){
                return true;
            }
        case "o2":
            if(gameData[2][0]==player && gameData[2][1]==player && gameData[2][2]==player){
                return true;
            }
        case "v0":
            if(gameData[0][0]==player && gameData[1][0]==player && gameData[2][0]==player){
                return true;
            }
        case "v1":
            if(gameData[0][1]==player && gameData[1][1]==player && gameData[2][1]==player){
                return true;
            }
        case "v2":
            if(gameData[0][2]==player && gameData[1][2]==player && gameData[2][2]==player){
                return true;
            }
        case "d0":
            if(gameData[0][0]==player && gameData[1][1]==player && gameData[2][2]==player){
                return true;
            }
        case "d2":
            if(gameData[2][0]==player && gameData[1][1]==player && gameData[0][2]==player){
                return true;
            }
    }  
}

function playerWin (cell, player){
    if (cell.row == cell.col == 1){
        if(controllCombos("d1", player)){return true};
        if(controllCombos("d2", player)){return true};
    }
    if (cell.row % 2 == 0 && cell.col % 2 == 0){
        if(cell.row == cell.col){
            if(controllCombos("d1", player)){return true};
        }else{
            if(controllCombos("d2", player)){return true};
        }
    }
    if(controllCombos(`v${cell.col}`, player)){return true};
    if(controllCombos(`o${cell.row}`, player)){return true};
}

const clickOnCell = function(evt){
    //Controllo che sia corretta 
    var cell = evt.target;
    var cellId = cell.id;
    var cellObj = fromIdToCords(cellId);
    //console.log('Cell: ' + cellObj.row + ', ' + cellObj.col);
    if (gameData[cellObj.row][cellObj.col] == 0){
        // Assegno la cella al giocatore che sta giocando 
        gameData[cellObj.row][cellObj.col] = activePlayer;
        cell.innerHTML = PLAYER_SYMBOLS[activePlayer];
        controllMoves(cellObj);

        // Decido se il giocatore ha vinto o meno
        if(playerWin(cellObj, activePlayer)){
            // Se ha vinto finisce il gioco 
            TABLE.innerHTML = "WINNER : " + activePlayer;
        }else{
            // Se non ha vinto cambia giocatore
            exchangePlayer();
        }
    } else {
    }

}

// ---- FLUSSO DEL Tris ----

// Inizializzazione del gioco
function initGame(){
    // Creare la struttura dati per la gestione della partita.
    console.log('Partita iniziata!');
    // Creo il contenuto della tabella. 
    initGameData();
    // Imposto il giocatore attivo.
}
//Crea array in ram e table nella pagina
function initGameData(){
    // Genero l'html della tabella
    var html = "";
    // Genero la struttura del gameData
    for(var row=0; row < TABLEDIMENSION; row++){
        gameData[row]=[];
        html += "<tr>"
        for(var col=0; col < TABLEDIMENSION; col++){
            html += `<td id="C${row}${col}"> </td>`
            gameData[row][col] = 0;
        }
        html+="</tr>"
    }
    TABLE.innerHTML = html;
}
// Clicco su una cella 
function initEvent(){
    // Associo la gestione del click alla tabella.
    TABLE.addEventListener('click', clickOnCell)
}
// Assegno la cella al giocatore che sta giocando 

// Decido se il giocatore ha vinto o meno

// Se ha vinto finisce il gioco 

// Se non ha vinto cambia giocatore
initGame();
initEvent();