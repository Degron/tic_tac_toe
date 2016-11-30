"use strict"

var num = 1;

class TicTacToe {

    constructor() {
        this.board = document.querySelector('#board');
        this.resetControls = document.querySelector("#reset");
        this.newGame = document.querySelector("#newGame");
        this.messages = document.querySelector(".messages");
        this.instructions = document.querySelector(".instructions");

        this.winningCombos = [
            // horizontal
            [1, 2, 3], [4, 5, 6], [7, 8, 9],

            // vertical
            [1, 4, 7], [2, 5, 8], [3, 6, 9],

            // diagonal
            [1, 5, 9], [3, 5, 7]
        ];

        this.newGame.addEventListener('click', (event) => {
            this.reset();
        });

        this.reset();
    }

    reset() {
        this.board.innerHTML = "";
        this.collection = {};

        for (var i = 1; i < 10; i++) {
            var cell = new Cell(i);
            this.board.appendChild(cell.element);
            this.collection[i] = cell;
        }

        num = 1;
        this.messages.innerHTML = "";
        this.instructions.innerHTML = "";
    }

    checkWinner() {
        this.winningCombos.forEach((combo) => {
            if ((this.collection[combo[0]].status === this.collection[combo[1]].status)
                && this.collection[combo[1]].status === this.collection[combo[2]].status
                && this.collection[combo[1]].status !== "") {
                this.messages.innerHTML = `Congratulations! ` + this.collection[combo[1]].status + ` wins!`;
                this.instructions.innerHTML = 'Press "New Game" if you want to play again!';

                Object.keys(this.collection).forEach((key) => {
                    this.collection[key].element.disabled = true;
                })

            } else if (num === 10) {
                this.messages.innerHTML = 'Tie Game';
                this.instructions.innerHTML = 'Please try again!';
            }
        })
    }
}

class Cell {
    constructor(position) {
        this.status = "";
        this.position = position;
        var btn = document.createElement('button');
        btn.className = 'cell';
        this.element = btn;

        var img = document.createElement('img');
        img.setAttribute("src", "./public/img/board_background_img.png");
        this.element.appendChild(img);

        this.element.addEventListener('click', (event) => {
            this.element.innerHTML = "";
            if (this.status === "") {
                this.setup_img();
                num += 1;
                app.messages.innerHTML = "";
                app.checkWinner();
            } else {
                app.messages.innerHTML = 'You already used this cell!';
            }
        });
    }

    setup_img() {
        var img = document.createElement('img');
        if (num % 2) {
            img.setAttribute("src", "./public/img/cross.png");
            this.status = "X";
        } else {
            img.setAttribute("src", "./public/img/circle.png");
            this.status = "O";
        }
        this.element.appendChild(img);
    };
}

var app = new TicTacToe();