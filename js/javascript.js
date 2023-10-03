(() => {
  // Cache DOM elements
  const gameboardElementArray = document.querySelectorAll(".gameboard button");
  const paraDisplayCurrentPlayer = document.querySelector(".current-player");
  const paraEndgameMessage = document.querySelector(".endgame-message");
  const paraError = document.querySelector(".error-message");
  const spanPlayerOne = document.querySelector("span.player-one");
  const spanPlayerTwo = document.querySelector("span.player-two");

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

  // Module for user interface
  const userInterface = (() => {

    function announceWinner(player) {
      // Create message
      if (player === "tie") {
        paraEndgameMessage.textContent = "The game ended in a tie";
      } else {
        paraEndgameMessage.innerHTML = `Congratulations! <span></span> has won!`;
      }

      // Create a reference to a span element withing endgame message, display players name and style it with players color
      const spanWinner = document.querySelector(".endgame-message span");
      displayName(spanWinner);
    }

    // Displays names of the players that are currently playing the game
    function displayPlayerNames() {
      spanPlayerOne.textContent = playerOne.getPlayerName();
      spanPlayerTwo.textContent = playerTwo.getPlayerName();
    }

    function displayCurrentPlayer() {
      // Create a message showing who's turn it is
      paraDisplayCurrentPlayer.innerHTML = `<span></span>'s turn`;
      // Create a reference to the span element within the message
      const spanDisplayCurrentPlayer = document.querySelector(".current-player span");
      displayName(spanDisplayCurrentPlayer);
    }


    // Display player name and style it with players color
    function displayName(element) {
      element.textContent = `${currentPlayer.getPlayerName()}`;
      element.classList.add(currentPlayer.getPlayerIdentifier());
    }

    function displayErrorMessage(condition) {
      if (!condition) {
        paraError.textContent = "Illegal move. Cell is already occupied. Choose an unoccupied cell."
      }   
    }

    function displayUI() {
      displayCurrentPlayer();
      displayPlayerNames();
    }

    function updateUI() {
      displayCurrentPlayer();
      // Reset error message
      paraError.textContent = "";
    }

    return {announceWinner, displayErrorMessage, displayUI, updateUI};
  })();


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

    // Start a new game
    function startGame() {
      eventHandler.addEventListeners();
      userInterface.displayUI();
    }

    return {trackCurrentPlayer, checkForGameOver, startGame};

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
          userInterface.announceWinner(winner);
          removeEventListeners();
          // Remove current player from the UI when the game is over
          paraDisplayCurrentPlayer.remove();
        } else {
          game.trackCurrentPlayer();
          userInterface.updateUI();
        }
      } else {
        userInterface.displayErrorMessage(validMove);
      }
    }

    return {addEventListeners, handleClick}

  })();

  game.startGame();

})();