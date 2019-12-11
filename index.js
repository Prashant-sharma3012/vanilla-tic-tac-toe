// model
(function () {

  // Our initial array will look like
  // [_,_,_,
  // _,_,_,
  // _,_,_]
  var initBoard = new Array(9).fill("_");

  // helper function to check if any row is equal
  var checkIfRowIsEqual = function (board) {
    for (i = 0; i < board.length; i = i + 3) {
      if (board[i] + board[i + 1] + board[i + 2] === 3) {
        return true;
      }
    }

    return false;
  }

  // helper function to check if any row is equal
  var checkIfColIsEqual = function (board) {
    for (i = 0; i < 3; i++) {
      if (board[i] + board[i + 3] + board[i + 6] === 3) {
        return true;
      }
    }

    return false;
  }

  // helper function to check if any row is equal
  var checkIfDiagIsEqual = function (board) {
    if ((board[0] + board[4] + board[8] === 3) ||
      (board[2] + board[4] + board[6] === 3)) {
      return true;
    }

    return false;
  }

  var _ = self.game = function game() {
    this.board = initBoard;
    this.playerX = true;
  }

  _.prototype = {
    isPlayable: function isPlayable() {
      return !this.isOver() && this.board.includes('_');
    },

    isOver: function isOver() {
      return checkIfRowIsEqual(this.board) || checkIfColIsEqual(this.board) || checkIfDiagIsEqual(this.board);
    },

    play: function play(position) {
      this.board[position] = this.playerX ? 1 : 0;
      this.playerX = !this.playerX;

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
  var domNode = document.getElementById('game');

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
      var table = this.createLayout();
      documentFrg.appendChild(table);
      domNode.appendChild(documentFrg);
    },

    createLayout: function createLayout() {
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

    updateLayout: function updateLayout(atPos) {
      var btn = document.getElementById('btn-'+atPos);
      btn.innerText = this.boardToRender[atPos] ? "X" : "O";
    }
  }

})();

// ctrl
(function () {

  var _ = self.GameCtrl = function GameCtrl() {
    this.model = new game();
    this.view = new gameView(new Array(this.model.board));
  }

  _.prototype = {
    start: function start() {
      this.view.render();
    },

    handleBtnClick: function handleBtnClick(event) {
      var atPos = event.target.id.split('-')[1];

      this.model.play(atPos);
      this.view.updateLayout(atPos);
    },

    attachListeners: function attachListeners() {
      var table = document.getElementById("grid");

      table.addEventListener('click', this.handleBtnClick.bind(this))
    },


  }


  var gamectrl = new GameCtrl();
  gamectrl.start();
  gamectrl.attachListeners()

})();



