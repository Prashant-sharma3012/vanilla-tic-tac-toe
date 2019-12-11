// model
(function () {
  var initBoard = new Array(9).fill("_");

  // helper function to check if any row is equal
  var checkIfRowIsEqual = function (board) {
    for (i = 0; i < board.length; i = i + 3) {
      var sumOfRowElemnts = board[i] + board[i + 1] + board[i + 2];

      if (sumOfRowElemnts === 3 || sumOfRowElemnts === 0) {
        return [i, i + 1, i + 2];
      }
    }

    return false;
  }

  // helper function to check if any row is equal
  var checkIfColIsEqual = function (board) {
    for (i = 0; i < 3; i++) {
      var sumOfColElemnts = board[i] + board[i + 3] + board[i + 6];

      if (sumOfColElemnts === 3 || sumOfColElemnts === 0) {
        return [i, i + 3, i + 6];
      }
    }

    return false;
  }

  // helper function to check if any row is equal
  var checkIfDiagIsEqual = function (board) {
    var sumOfdiag1 = board[0] + board[4] + board[8]
    var sumOfdiag2 = board[2] + board[4] + board[6]

    if (sumOfdiag1 === 3 || sumOfdiag1 === 0) {
      return [0, 4, 8];
    }

    if (sumOfdiag2 === 3 || sumOfdiag2 === 0) {
      return [2, 4, 6];
    }

    return false;
  }

  var _ = self.game = function game() {
    this.board = initBoard;
    this.playerX = true;
  }

  _.prototype = {
    reset: function reset() {
      this.board = new Array(9).fill("_");
      this.playerX = true;
    },

    isPlayable: function isPlayable() {
      return !this.isOver() && this.board.includes('_');
    },

    isOver: function isOver() {
      return checkIfRowIsEqual(this.board) || checkIfColIsEqual(this.board) || checkIfDiagIsEqual(this.board);
    },

    getWinningSpots: function getWinningSpots() {
      var row = checkIfRowIsEqual(this.board);
      var col = checkIfColIsEqual(this.board);
      var diag = checkIfDiagIsEqual(this.board);

      switch (true) {
        case !!row:
          return row;
        case !!col:
          return col;
        case !!diag:
          return diag;
        default:
          break;
      }
    },

    play: function play(position) {

      if (this.board[position] === '_') {
        this.board[position] = this.playerX ? 1 : 0;
        this.playerX = !this.playerX;
      }

      return this.board;
    },

    seeBoard: function seeBoard() {
      var printable = '';

      this.board.map(function (e, i) {
        printable = printable + e + ' ';
        if (i === 2 || i === 5 || i === 8) {
          printable = printable + '\n';
        }
      });

      console.log(printable);
    }
  }

})();

// view
(function () {
  var documentFrg = document.createDocumentFragment();
  var gameBoard = document.getElementById('gameBoard');
  var gameMenu = document.getElementById('gameMenu');

  var _ = self.gameView = function gameView(board) {
    this.boardToRender = board;
  }

  var createBtn = function createBtn(index, board) {
    var btn = document.createElement("BUTTON");

    btn.setAttribute("class", "btn");
    btn.setAttribute("id", "btn-" + index);
    btn.innerText = board[index] === "_" ? " " : (board[index] ? "X" : "O");

    return btn;
  }

  _.prototype = {
    render: function render() {
      var table = this.createBoardLayout();
      documentFrg.appendChild(table);
      gameBoard.appendChild(documentFrg);

      this.createMenu();
    },

    reset: function reset(board) {
      gameBoard.innerHTML = "";
      gameMenu.innerHTML = "";
      this.boardToRender = board;
    },

    markWinningSpots:function markWinningSpots(places) {
      places.map(function (e,i) {
        var btn = document.getElementById('btn-'+ e);
        btn.classList.add("winningRow")
      });
    },

    createMenu: function createMenu() {
      var btn = document.createElement("BUTTON");
      btn.setAttribute("class", "gameButton");
      btn.setAttribute("id", "gameButton");
      btn.innerText = 'Restart'

      var msg = document.createElement("DIV");
      msg.setAttribute("class", "message");
      msg.innerText = ''

      gameMenu.insertAdjacentElement('beforeend', btn);
      gameMenu.insertAdjacentElement('beforeend', msg);
    },

    createBoardLayout: function createBoardLayout() {
      var inputArray = new Array(9).fill(0);
      var table = document.createElement("table");
      table.setAttribute("id", "grid")
      table.createTBody();

      var rowNum = 0;
      var row;

      var thisRef = this;

      // create 3 rows
      inputArray.map(function (e, i) {

        if (i === 0 || i === 3 || i === 6) {
          row = table.insertRow(rowNum);
          row.setAttribute("id", 'row-' + rowNum);
          rowNum = rowNum + 1;
        }

        var btn = createBtn(i, thisRef.boardToRender);

        var operatingRow = table.rows[rowNum - 1];
        var col = operatingRow.insertCell(-1);

        col.appendChild(btn)

        return table;
      });

      return table;

    },

    updateLayout: function updateLayout(atPos, board) {
      var btn = document.getElementById('btn-' + atPos);

      if (this.boardToRender[atPos] === '_') {
        this.boardToRender = new Array().concat(board);
        btn.innerText = this.boardToRender[atPos] ? "X" : "O";
      }
    }
  }

})();

// ctrl
(function () {

  var _ = self.GameCtrl = function GameCtrl() {
    this.model = new game();
    this.view = new gameView(new Array().concat(this.model.board));
  }

  _.prototype = {
    start: function start() {
      this.view.render();
    },

    handleBtnClick: function handleBtnClick(event) {

      if (this.model.isOver()) return;

      var atPos = event.target.id.split('-')[1];

      this.model.play(atPos);
      this.view.updateLayout(atPos, this.model.board);

      if (this.model.isOver()) {
        this.view.markWinningSpots(this.model.getWinningSpots());

        var msg = document.querySelector('.message');
        msg.innerText = 'Player ' + (this.model.playerX ? 'O' : 'X') + ' Wins!!!!!';

      }
    },

    handleReset: function handleReset() {
      this.model.reset();
      this.view.reset(new Array().concat(this.model.board));
      
      // restart the game
      gamectrl.start();
      gamectrl.attachListeners();
    },

    attachListeners: function attachListeners() {
      var table = document.getElementById("grid");
      var resetBtn = document.getElementById("gameButton");

      table.addEventListener('click', this.handleBtnClick.bind(this));
      resetBtn.addEventListener('click', this.handleReset.bind(this));
    },


  }


  var gamectrl = new GameCtrl();
  gamectrl.start();
  gamectrl.attachListeners();

})();



