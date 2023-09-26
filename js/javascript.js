(() => {
  // Cache DOM elements
  const gameboardElementArray = document.querySelectorAll(".gameboard div");

  // Create object to store the gameboard array and functions for displaying gameboard and changing arrays values
  const gameBoard = (() => {

    // Create gameboard array
    const gameboard = [];

    // Function for populating gameboard array with empty values
    function populateArray(location) {
      gameboard.push(location.textContent)
    };

    // Function for displaying gameboard array values on the DOM
    function renderBoard() {
      for (i = 0; i < gameboardElementArray.length; i++) {
        gameboardElementArray[i].textContent = gameBoard.gameboard[i];
      }
    };

    // Update array values
    function updateArray(event, marker) {
      const dataIndex = event.getAttribute("data-index");
      if (gameboard[dataIndex] === "") {
        gameboard[dataIndex] = marker;
      }
    };

    gameboardElementArray.forEach(item => populateArray(item));

    return {gameboard, updateArray, renderBoard};
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
  console.log(playerOne.mark);
  console.log(playerTwo.getPlayerName());

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
    
    function addMark(item) {
      const currentPlayerMarker = currentPlayer.getPlayerMarker();

      if (item.textContent === "") {
        item.textContent = currentPlayerMarker;
        trackCurrentPlayer();
        gameBoard.updateArray(item, currentPlayerMarker);
        console.log(gameBoard.gameboard);
      }
    }

    function startGame() {
      // Display empty board for a new game
      gameBoard.renderBoard();
      // Create event listener for adding marks to the board when the corresponding html element is clicked
      gameboardElementArray.forEach(item => {
        item.addEventListener("click", () => game.addMark(item));
      });
    }

    startGame();

    return {addMark}

  })();

})();