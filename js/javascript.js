(() => {
  // Cache DOM elements
  const gameboardElementArray = document.querySelectorAll(".gameboard div");
  const paraVictoryMessage = document.querySelector(".endgame-message");
  const paraError = document.querySelector(".error-message");


  // Gameboard module
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

    // Display board array values on the DOM
    function renderBoard() {
      for (k = 0; k < gameboardElementArray.length; k++) {
        const i = Math.floor(k / columns);
        const j = k % columns;
        gameboardElementArray[k].textContent = board[i][j];
      }
      // Style player marks
      gameboardElementArray.forEach(cell => {
        if (cell.textContent === "X") {
          cell.classList.add("player-one");
        } else if (cell.textContent === "O") {
          cell.classList.add("player-two");
        }
      })
    };

    // Add player markers to the gameboard array
    function updateArray(event) {
      const dataRow = event.getAttribute("data-row");
      const dataColumn = event.getAttribute("data-column");
      if (board[dataRow][dataColumn] === "") {

        board[dataRow][dataColumn] = currentPlayer.getPlayerMarker();
        // When the move is valid, return true
        return true;
      }
      // When the move is invalid, return false
      return false;
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

    // Check if the game is over
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
      }  

      // Diagonal check (top-left to bottom-right)
      if (
        gameBoard.board[0][0] === playerMark && 
        gameBoard.board[1][1] === playerMark && 
        gameBoard.board[2][2] === playerMark
      ) {
        return currentPlayer;
      }
      
      // Diagonal check (top-right to bottom-left)
      if (
        gameBoard.board[0][2] === playerMark && 
        gameBoard.board[1][1] === playerMark && 
        gameBoard.board[2][0] === playerMark
      ) {
        return currentPlayer;
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
        paraVictoryMessage.textContent = "The game ended in a tie";
      } else {
        paraVictoryMessage.textContent = `Congratulations, ${winner.getPlayerName()} has won!`;
      }
    }

    // Start a new game
    function startGame() {
      eventHandler.addEventListeners();
    }

    return {trackCurrentPlayer, checkForGameOver, announceWinner, startGame};

  })();

  // Module for event handler functions
  const eventHandler = (() => {
    // Add 'click' event listeners to the gameboard
    function addEventListeners() {
      gameboardElementArray.forEach(item => {
        item.addEventListener("click", handleClick);
      });
    }

    // Remove 'click' event listeners from the gameboard
    function removeEventListeners() {
      gameboardElementArray.forEach(item => {
        item.removeEventListener("click", handleClick);
      });
    }

    // Actions that happen when 'click' event is activated
    function handleClick(event) {
      const item = event.target;
      const validMove = gameBoard.updateArray(item);
      gameBoard.renderBoard();
      if (validMove) {
        let winner = game.checkForGameOver(currentPlayer);
        if (winner) {
          game.announceWinner(winner);
          removeEventListeners();
        }
        game.trackCurrentPlayer();
      } else {
        paraError.textContent = "Illegal move. Cell is already occupied. Choose an unoccupied cell."
      }
    }

    return {addEventListeners, removeEventListeners, handleClick}

  })();

  game.startGame();

})();