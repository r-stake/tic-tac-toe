(() => {
  // Cache DOM elements
  const gameboardElementArray = document.querySelectorAll(".gameboard div");
  const gameBoardCell = document.querySelector(".gameboard div");



  // Create object to store the gameboard array and functions for displaying gameboard and changing arrays values

  const gameBoard = (() => {

    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i].push("");
      }
    }

    // Function for displaying board array values on the DOM
    function renderBoard() {
      for (k = 0; k < gameboardElementArray.length; k++) {
        const i = Math.floor(k / columns);
        const j = k % columns;
        gameboardElementArray[k].textContent = board[i][j];
      }
    };

    // Function for adding player markers to the gameboard array
    function updateArray(event, marker) {
      const dataRow = event.getAttribute("data-row");
      const dataColumn = event.getAttribute("data-column");
      if (board[dataRow][dataColumn] === "") {
        board[dataRow][dataColumn] = marker;
      }
    };

    return {board, updateArray, renderBoard};
  })();



  // Factory function for creating players
  const Player = (name, marker, identifier) => {
    const getPlayerIdentifier = () => identifier;
    const getPlayerName = () => name;
    const getPlayerMarker = () => marker;
    return {getPlayerMarker, getPlayerName, getPlayerIdentifier}
  };



  const playerOne = Player("Mr. Pink", "X", "player-one");
  const playerTwo = Player("Mr. Yellow", "O", "player-two");
      console.log(playerOne);
      console.log(playerTwo);
      console.log(playerOne.getPlayerName());
      console.log(playerTwo.getPlayerName());



  // Module for game management
  const game = (() => {
    // let gameWon = false;
    let currentPlayer = playerOne;

    function trackCurrentPlayer() {
      if (currentPlayer === playerOne) {
        currentPlayer = playerTwo;
      } else {
        currentPlayer = playerOne;
      }
    }
    
    // Function used for adding players mark to the HTML elements and the gameboard array
    function addMark(item) {
      const currentPlayerMarker = currentPlayer.getPlayerMarker();

      if (item.textContent === "") {
        item.textContent = currentPlayerMarker;
        item.classList.add(`${currentPlayer.getPlayerIdentifier()}`);
        
        trackCurrentPlayer();
        gameBoard.updateArray(item, currentPlayerMarker);

            console.log(gameBoard.board);
            console.log(item);
      }
    }

    // Function used to initialize new game
    function startGame() {
      
      gameBoard.renderBoard();
      // Create event listener for adding marks to the board when the corresponding html element is clicked
      gameboardElementArray.forEach(item => {
        item.addEventListener("click", () => addMark(item));
      });
    }

    startGame();

  })();

})();