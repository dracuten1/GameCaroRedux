import React, { Component } from 'react';
import { connect } from 'react-redux';
import Board from '../../components/game-board/board';
import './GameCaro.css';
import SquareContext from '../../contexts/square-context';
import HistoryBoard from '../../components/history-board/history-board';
import * as actionCreators from '../../actions/GameActions';

class GameCaro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrangeAsend: true,
        }
    }

    init = () => {
        // const boardSquares = this.getBlankBoard();
        // console.log(boardSquares);
        // eslint-disable-next-line react/destructuring-assignment
        this.props.initGameRefactor();

        // this.setState({
        //     boardSquares,
        //     player: 1,
        //     win: false,
        //     history: []
        // });
    }

    handleClick = (square) => {
        // const { boardSquares } = this.state;
        // const squaresBoard = boardSquares.map((squareRow) => {
        //     squareRow.map(squareM => {
        //         const s = squareM;
        //         s.isSelected = false;
        //         if (squareM.equal(square)) {
        //             // console.log('map', squareM);
        //             if (s.value === 0) {
        //                 const { player, currentStep, history } = this.state;
        //                 s.value = player;
        //                 s.select();
        //                 this.checkWin(s);
        //                 let newHis = [];
        //                 if (currentStep < history.length) {
        //                     newHis = history.slice(0, currentStep)
        //                 } else {
        //                     newHis = [...history]
        //                 }
        //                 this.setState({
        //                     history: [...newHis, {
        //                         location: square.key,
        //                         player
        //                     }],
        //                     player: player === 1 ? 2 : 1,
        //                     currentStep: currentStep + 1,
        //                 });
        //                 // console.log('player', this.state.player)
        //             }
        //         }
        //         return s;
        //     })
        //     return squareRow;
        // })

        // this.setState({ boardSquares: squaresBoard });
        // eslint-disable-next-line react/destructuring-assignment
        this.props.selectedSquare(square);
    }

    backToStep = (step) => {
        // const newBoardHistory = this.getBlankBoard();
        // const { history } = this.state;
        // for (let i = 0; i < step; i += 1) {
        //     const lo = history[i].location;
        //     newBoardHistory.map(boardRow => {
        //         boardRow.map(square => {
        //             const newSquare = square;
        //             newSquare.isSelected = false;
        //             if (newSquare.key === lo) {
        //                 newSquare.value = history[i].player;
        //                 newSquare.select();
        //             }
        //             return newSquare;
        //         })
        //         return boardRow;
        //     })
        // }
        // // console.log(step);
        // let player = 1;
        // if (step !== 0) {
        //     player = history[step - 1].player === 1 ? 2 : 1;
        // }
        // this.setState({
        //     boardSquares: newBoardHistory,
        //     player,
        //     currentStep: step
        // })
        // eslint-disable-next-line react/destructuring-assignment
        this.props.setStep(step);
    }

    // back = () => {
    //     const { currentStep } = this.props;
    //     if (currentStep > 0) {
    //         this.backToStep(currentStep - 1);
    //     }
    // }

    // forward = () => {
    //     const { currentStep, history } = this.props;
    //     if (currentStep < history.length) {
    //         this.backToStep(currentStep + 1);
    //     }
    // }

    render = () => {
        const { arrangeAsend } = this.state;
        const { boardSquares, player, win, history, currentStep } = this.props;
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
                {/* <ol>
                    <li>
                        <button type="button" onClick={this.back}> Step back </button>
                        <button type="button" onClick={this.forward}> Step forward </button>
                    </li>
                </ol> */}
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

const mapStateToProps = state => {
    return {
        boardSquares: state.grc.boardSquares,
        player: state.grc.player,
        win: state.grc.win,
        history: state.grc.history,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        initGameRefactor: () => dispatch(actionCreators.initGame()),
        selectedSquare: (square) => dispatch(actionCreators.sqaureSelected(square)),
        setStep: (step) => dispatch(actionCreators.setStep(step)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(GameCaro);