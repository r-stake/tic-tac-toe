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
  const Player = (name, marker) => {
    const getPlayerName = () => name;
    const getPlayerMarker = () => marker;
    return {getPlayerMarker, getPlayerName}
  };

  const playerOne = Player("Mr. Pink", "X");
  const playerTwo = Player("Mr. Yellow", "O");
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
        trackCurrentPlayer();
        gameBoard.updateArray(item, currentPlayerMarker);

            console.log(gameBoard.board);
      }
    }

    // Function used to initialize new game
    function startGame() {
      // Display empty board for a new game
      gameBoard.renderBoard();
      // Create event listener for adding marks to the board when the corresponding html element is clicked
      gameboardElementArray.forEach(item => {
        item.addEventListener("click", () => addMark(item));
      });
    }

    startGame();

  })();

})();