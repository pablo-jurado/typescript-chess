// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------
export const BOARD_DOM = document.getElementById('app');

// names
const PAWN = 'pawn';
const ROOK = 'rook';
const KNIGHT = 'knight';
const BISHOP = 'bishop';
const QUEEN = 'queen';
const KING = 'king';

// pieces
const B_PAWN = '&#9823;';
const W_PAWN = '&#9817;';
const B_ROOK = '&#9820;';
const W_ROOK = '&#9814;';
const B_KNIGHT = '&#9822;';
const W_KNIGHT = '&#9816;';
const B_BISHOP = '&#9821;';
const W_BISHOP = '&#9815;';
const B_QUEEN = '&#9819;';
const W_QUEEN = '&#9813;';
const B_KING = '&#9818;';
const W_KING = '&#9812;';


// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------
type colorType = 'black' | 'white';
type pieceType = null | Piece;

// -----------------------------------------------------------------------------
// Classes
// -----------------------------------------------------------------------------

class Game {
  board: Board;
  player1: Player;
  player2: Player;
  turn: Player;
  isGameOver: boolean;

  constructor(domElement: HTMLElement) {
    this.board = new Board(domElement);
    this.render();
  }

  render() {
    this.board.render();
  }

  switchTurn() {

  }
}

class Player {
  name: string;
  color: colorType;
  turn: boolean;
}

export class Board {
  row = 8;
  col = 8;
  board: Square[][];
  allPieces: Piece[] = [];
  domElement: HTMLElement;

  constructor(domElement) {
    this.domElement = domElement;
    this.buildBoard();
    this.createPieces();
   }

  buildBoard() {
    var arr = [];
    for (var i = 0; i < this.row; i++) {
      var rowArr = [];
      for (var j = 0; j < this.col; j++) {
        var color: colorType = (i % 2 === j % 2) ? "white" : "black";
        rowArr.push(new Square( null, color));
      }
      arr.push(rowArr);
    }
    this.board = arr;
  }

  createPieces() {
    this.allPieces.push(new Pawn(1, 1, "black"));
    this.allPieces.push(new Pawn(1, 2, "black"));
    console.log(this.allPieces);
  }


  render() {
    var boardHTML = this.board.reduce(function(acc, item, index) {
      var row = ''
      item.forEach(function(square) {
        let piece = "";
        if (square.piece) {
          let { value } = square.piece;
          piece = `<div class="game-piece">${value}</div>`;
        }
        row += `<div class="${square.color}">${piece}</div>`;
      })
      return acc += `<div data-y="${index}" class="row">${row}</div>`;
    }, '');
    this.domElement.innerHTML = boardHTML;
  }
}

export class Square {
  piece: pieceType;
  color: colorType;

  constructor(piece: pieceType, color: colorType) {
    this.piece = piece;
    this.color = color;
  }
}

export abstract class Piece {
  x: number;
  y: number;
  color: string;
  id: string;
  abstract value;

  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.id = this.createID();
  }


  createID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  abstract move() :void;
}

class Pawn extends Piece {
  value: string;
  constructor(x, y, color) {
    super(x, y, color);
    this.value = (color === "white") ? W_PAWN : B_PAWN;
  }

  move() {
    console.log("todo!");
  }
}

export const game = new Game(BOARD_DOM);
