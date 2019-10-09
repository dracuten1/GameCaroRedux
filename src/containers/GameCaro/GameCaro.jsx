import React, { Component } from 'react';
import SquareValue from '../../utility/squareObj';
import Checker from '../../utility/gameChecker';
import Board from '../../components/game-board/board';
import './GameCaro.css';
import SquareContext from '../../contexts/square-context';
import HistoryBoard from '../../components/history-board/history-board';

class GameCaro extends Component {
    constructor(props) {
        super(props);
        const boardSquares = this.getBlankBoard();
        this.state = {
            currentStep: 0,
            history: [],
            boardSquares,
            player: 1,
            win: false,
            arrangeAsend: true,
        }
    }

    getBlankBoard = () => {
        const arr = new Array(20).fill(0);
        for (let i = 0; i < arr.length; i += 1) {
            arr[i] = new Array(20);
            for (let j = 0; j < arr[i].length; j += 1) {
                arr[i][j] = new SquareValue(0, i * 10 * 2 + j, i, j);
            }
        }
        return arr;
    }

    init = () => {
        const boardSquares = this.getBlankBoard();
        // console.log(boardSquares);
        this.setState()
        this.setState({
            boardSquares,
            player: 1,
            win: false,
            history: []
        });
    }

    checkWin = (square) => {
        // console.log('square checkwin', square);
        // Checker.check(square, this.state.squares);
        const { boardSquares } = this.state;
        const result = Checker.check(square, boardSquares);

        if (result.length > 0) {
            const newBoard = boardSquares.map(squareRow => {
                squareRow.map(square1 => {
                    const sq = square1;
                    sq.isSelected = false;
                    result.forEach(r => {
                        if (sq.equal(r)) {
                            sq.select();
                        }
                    })
                    return sq;
                })
                return squareRow;

            })
            this.setState({
                win: true,
                boardSquares: newBoard
            })
        }
    }

    handleClick = (square) => {
        const { boardSquares } = this.state;
        const squaresBoard = boardSquares.map((squareRow) => {
            squareRow.map(squareM => {
                const s = squareM;
                s.isSelected = false;
                if (squareM.equal(square)) {
                    // console.log('map', squareM);
                    if (s.value === 0) {
                        const { player, currentStep, history } = this.state;
                        s.value = player;
                        s.select();
                        this.checkWin(s);
                        let newHis = [];
                        if (currentStep < history.length) {
                            newHis = history.slice(0, currentStep)
                        } else {
                            newHis = [...history]
                        }
                        this.setState({
                            history: [...newHis, {
                                location: square.key,
                                player
                            }],
                            player: player === 1 ? 2 : 1,
                            currentStep: currentStep + 1,
                        });
                        // console.log('player', this.state.player)
                    }
                }
                return s;
            })
            return squareRow;
        })

        this.setState({ boardSquares: squaresBoard });
    }

    backToStep = (step) => {
        const newBoardHistory = this.getBlankBoard();
        const { history } = this.state;
        for (let i = 0; i < step; i += 1) {
            const lo = history[i].location;
            newBoardHistory.map(boardRow => {
                boardRow.map(square => {
                    const newSquare = square;
                    newSquare.isSelected = false;
                    if (newSquare.key === lo) {
                        newSquare.value = history[i].player;
                        newSquare.select();
                    }
                    return newSquare;
                })
                return boardRow;
            })
        }
        // console.log(step);
        let player = 1;
        if (step !== 0) {
            player = history[step - 1].player === 1 ? 2 : 1;
        }
        this.setState({
            boardSquares: newBoardHistory,
            player,
            currentStep: step
        })
    }

    back = () => {
        const { currentStep } = this.state;
        if (currentStep > 0) {
            this.backToStep(currentStep - 1);
        }
    }

    forward = () => {
        const { currentStep, history } = this.state;
        if (currentStep < history.length) {
            this.backToStep(currentStep + 1);
        }
    }

    render = () => {
        const { win, player, boardSquares, currentStep, history, arrangeAsend } = this.state;
        return (
            <div className="game">
                {win ? <div>
                    <h1>Congratulation Player {player === 1 ? 'O' : 'X'}</h1>
                </div>
                    : null
                }
                <button type="button" onClick={this.init}>Play again</button>
                <SquareContext.Provider value={
                    {
                        value: 1,
                        onSquareClick: (square) => this.handleClick(square)
                    }
                }>
                    <Board squares={boardSquares}
                        win={win}
                        player={player}
                    />
                </SquareContext.Provider>
                {
                    win === false ?
                        <ol>
                            <HistoryBoard current={currentStep} step={history.length} arrange={arrangeAsend} backToStep={(step) => this.backToStep(step)} />
                        </ol> : null
                }
                <ol>
                    <li>
                        <button type="button" onClick={this.back}> Step back </button>
                        <button type="button" onClick={this.forward}> Step forward </button>
                    </li>
                </ol>
                <ol>
                    <li>
                        <button type="button" onClick={() => this.setState({ arrangeAsend: true })}> Ascending </button>
                        <button type="button" onClick={() => this.setState({ arrangeAsend: false })}> Descending </button>
                    </li>
                </ol>
            </div>
        );
    }
}

export default GameCaro;
