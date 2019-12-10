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

})()

  // view
  (function () {
  })()

  // ctrl
  (function () {
  })()