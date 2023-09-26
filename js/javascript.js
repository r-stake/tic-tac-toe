(() => {
  // Cache DOM elements
  const gameboardElementArray = document.querySelectorAll(".gameboard div");

  const gameBoard = (() => {

    const gameboard = [];

    return {gameboard};
  })();

  const Player = (name, marker) => {
    const getPlayerName = () => name;
    const getPlayerMarker = () => marker;
    return {getPlayerName, getPlayerMarker};
  };

  const playerOne = Player('playerOne', "X");
  const playerTwo = Player('playerTwo', "O");

  console.log(playerOne.getPlayerName());
  console.log(playerTwo.getPlayerName());

  gameBoard.gameboard.push("X");
  gameBoard.gameboard.push("O");
  gameBoard.gameboard.push("X");
  gameBoard.gameboard.push("O");
  gameBoard.gameboard.push("X");
  gameBoard.gameboard.push("O");
  gameBoard.gameboard.push("X");
  gameBoard.gameboard.push("O");
  gameBoard.gameboard.push("X");

  console.log(gameBoard.gameboard);

  function renderBoard() {
    for (i = 0; i < gameboardElementArray.length; i++) {
      gameboardElementArray[i].textContent = gameBoard.gameboard[i];
    }
  };

  renderBoard();



})();