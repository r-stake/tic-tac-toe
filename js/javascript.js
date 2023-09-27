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
        gameBoard.updateArray(item, currentPlayerMarker);
        checkForGameOver(currentPlayer);

        trackCurrentPlayer();
            console.log(gameBoard.board);
            console.log(item);
      }
    }

    // Function for checking if the game is over
    function checkForGameOver(player) {
      const playerMark = player.getPlayerMarker();
      console.log(playerMark);
      // Check for three in a row horizontally, vertically, or diagonally
      for (let i = 0; i < 3; i++) {
        // Horizontal check
        if (
          gameBoard.board[i][0] === playerMark && 
          gameBoard.board[i][1] === playerMark && gameBoard.board[i][2] === playerMark
        ) {
          console.log(`Congratulations, ${currentPlayer.getPlayerName()} wins!`);
        }

        // Vertical check
        if (
          gameBoard.board[0][i] === playerMark && 
          gameBoard.board[1][i] === playerMark && gameBoard.board[2][i] === playerMark
        ) {
          console.log(`Congratulations, ${currentPlayer.getPlayerName()} wins!`);
        }

        // Diagonal check
        if ((
            gameBoard.board[0][i] === playerMark && 
            gameBoard.board[1][i + 1] === playerMark && gameBoard.board[2][i + 2] === playerMark
          ) ||
          (
            gameBoard.board[0][i] === playerMark && 
            gameBoard.board[1][i - 1] === playerMark && gameBoard.board[2][i - 2] === playerMark
          )) {
            console.log(`Congratulations, ${currentPlayer.getPlayerName()} wins!`);
          }
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

    return {startGame};

  })();

  game.startGame();

})();