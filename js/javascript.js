(() => {
  // Cache DOM elements
  const gameboardElementArray = document.querySelectorAll(".gameboard div");


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
    function updateArray(event) {
      const dataRow = event.getAttribute("data-row");
      const dataColumn = event.getAttribute("data-column");
      if (board[dataRow][dataColumn] === "") {

        board[dataRow][dataColumn] = currentPlayer.getPlayerMarker();
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

  let currentPlayer = playerOne;


  // Module for game management
  const game = (() => {

    function trackCurrentPlayer() {
      if (currentPlayer === playerOne) {
        currentPlayer = playerTwo;
      } else {
        currentPlayer = playerOne;
      }
    }
    
    // Function used for adding players mark to the HTML elements and the gameboard array
    function addMark(item) {
      if (item.textContent === "") {
        const currentPlayerMarker = currentPlayer.getPlayerMarker();
        item.textContent = currentPlayerMarker;
        item.classList.add(`${currentPlayer.getPlayerIdentifier()}`);
        
            console.log(gameBoard.board);
            console.log(item);
      }
    }

    // Function for checking if the game is over
    function checkForGameOver(player) {
      const playerMark = player.getPlayerMarker();

      // Check for three in a row horizontally, vertically, or diagonally
      for (let i = 0; i < 3; i++) {
        
        // Horizontal check
        if (
          gameBoard.board[i][0] === playerMark && 
          gameBoard.board[i][1] === playerMark && gameBoard.board[i][2] === playerMark
        ) {
          return currentPlayer;
        }

        // Vertical check
        if (
          gameBoard.board[0][i] === playerMark && 
          gameBoard.board[1][i] === playerMark && gameBoard.board[2][i] === playerMark
        ) {
          return currentPlayer;
        }

        // Diagonal check (top-left to bottom-right)
        if (
          gameBoard.board[0][i] === playerMark && 
          gameBoard.board[1][i + 1] === playerMark && gameBoard.board[2][i + 2] === playerMark
        ) {
          return currentPlayer;
        }
        
        // Diagonal check (top-right to bottom-left)
        if (
          gameBoard.board[0][i] === playerMark && 
          gameBoard.board[1][i - 1] === playerMark && gameBoard.board[2][i - 2] === playerMark
        ) {
          return currentPlayer;
        }
      }  

      // Check for a tie
      const noLegalMoves = Array.from(gameboardElementArray).every(element => {
        return element.textContent !== "";
      });

      if (noLegalMoves) {
        return `tie`;
      }
    }

    function announceWinner(winner) {
      if (winner === "tie") {
        console.log(`The game ended in a tie.`);
      } else {
        console.log(`Congratulations, ${winner.getPlayerName()} has won!`);
      }
    }

    // Function used to initialize new game
    function startGame() {
      gameBoard.renderBoard();
      eventHandler.addEventListeners();
    }

    return {trackCurrentPlayer, addMark, checkForGameOver, announceWinner, startGame};

  })();

  // Module for event handler functions
  const eventHandler = (() => {

    // Function to add event listeners for clicking the gameboard
    function addEventListeners() {
      gameboardElementArray.forEach(item => {
        item.addEventListener("click", handleClick);
      });
    }

    // Function to remove event listeners from the gameboard
    function removeEventListeners() {
      gameboardElementArray.forEach(item => {
        item.removeEventListener("click", handleClick);
      });
    }

    function handleClick(event) {
      const item = event.target;
      game.addMark(item);
      gameBoard.updateArray(item);
      let winner = game.checkForGameOver(currentPlayer);
      if (winner) {
        game.announceWinner(winner);
        removeEventListeners();
      }
      game.trackCurrentPlayer();
    }

    return {addEventListeners, removeEventListeners, handleClick}

  })();

  game.startGame();

})();