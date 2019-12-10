// model
(function () {

  // Our initial array will look like
  // [_,_,_,
  // _,_,_,
  // _,_,_]
  var initBoard = new Array(9).fill("_");

  // helper function to check if any row is equal
  var checkIfRowOrColIsEqual = function (board) {
    var isEqual = false;

    for (i = 0; i < board.length; i = i + 3) {
      if (board[i] === board[i + 1] && board[i] === board[i + 2]) {
        isEqual = true;
        break;
      }
    }

    return isEqual;
  }

  // helper function to check if any row is equal
  var checkIfColIsEqual = function (board) {
    var isEqual = false;

    for (i = 0; i < 3; i++) {
      if (board[i] === board[i + 3] && board[i] === board[i + 6]) {
        isEqual = true;
        break;
      }
    }

    return isEqual;
  }

  // helper function to check if any row is equal
  var checkIfDiagIsEqual = function (board) {
    var isEqual = false;

    if(board[0] === board[4] && board[8] === board[4]){
      isEqual = true;
    }

    if(board[2] === board[4] && board[6] === board[4]){
      isEqual = true;
    }

    return isEqual;
  }

  var _ = self.game = function game() {
    this.board = initBoard;
    this.playerX = true;
  }

  _.prototype = {
    isPlayable: function isPlayable() {
      return !(this.board.includes('_') && !this.isOver());
    },

    isOver: function isOver() {
      return checkIfRowIsEqual(this.board) || checkIfColIsEqual(this.board) || checkIfDiagIsEqual(this.board);
    },

    play: function play(position) {
      this.board[position] = this.playerX ? 'X' : 'O';
      this.playerX = !this.playerX;

      return this.board;
    },

    seeBoard: function seeBoard() {
      var printable = '';

      this.board.map(function(e,i){
        printable = printable + e + ' ';
        if(i === 2 || i === 5 || i === 8){
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