import * as actionTypes from '../actions/ActionTypes';
import SquareValue from '../utility/squareObj';
import Checker from '../utility/gameChecker';


const getBlankBoard = () => {
    const arr = new Array(20).fill(0);
    for (let i = 0; i < arr.length; i += 1) {
        arr[i] = new Array(20);
        for (let j = 0; j < arr[i].length; j += 1) {
            arr[i][j] = new SquareValue(0, i * 10 * 2 + j, i, j);
        }
    }
    return arr;
}

const initialState = {
    boardSquares: getBlankBoard(),
    player: 1,
    win: false,
    history: [],
    currentStep: 0
};
const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.ADD_HISTORY:
            return {
                ...state,
                counter: state.counter - 1
            }
        case actionTypes.CHOSE_POSITION: {
            const { boardSquares } = state;
            let newState = { ...state };
            const { square } = action;
            const squaresBoard = boardSquares.map((squareRow) => {
                squareRow.map(squareM => {
                    const s = squareM;
                    s.isSelected = false;
                    if (squareM.equal(square)) {
                        // console.log('map', squareM);
                        if (s.value === 0) {
                            const { player, currentStep, history } = state;
                            s.value = player;
                            s.select();
                            //
                            const result = Checker.check(square, boardSquares);

                            if (result.length > 0) {
                                const newBoard = boardSquares.map(sr1 => {
                                    sr1.map(square1 => {
                                        const sq = square1;
                                        sq.isSelected = false;
                                        result.forEach(r => {
                                            if (sq.equal(r)) {
                                                sq.select();
                                            }
                                        })
                                        return sq;
                                    })
                                    return sr1;

                                })
                                newState = {
                                    ...newState,
                                    win: true,
                                    boardSquares: newBoard
                                }
                            }

                            //
                            let newHis = [];
                            if (currentStep < history.length) {
                                newHis = history.slice(0, currentStep)
                            } else {
                                newHis = [...history]
                            }
                            newState = {
                                ...newState,
                                history: [...newHis, {
                                    location: square.key,
                                    player
                                }],
                                player: player === 1 ? 2 : 1,
                                currentStep: currentStep + 1,
                            }
                        }
                    }
                    return s;
                })
                return squareRow;
            })
            newState = {
                ...newState,
                boardSquares: squaresBoard
            }
            return newState;
        }

        case actionTypes.INIT_GAME: {
            const boardSquares = getBlankBoard();
            return {
                ...state,
                boardSquares,
                player: 1,
                win: false,
                history: []
            }
        }
        case actionTypes.SET_STEP: {
            // console.log('Set step');
            const newBoardHistory = getBlankBoard();
            const { history } = state;
            for (let i = 0; i < action.step; i += 1) {
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
            if (action.step !== 0) {
                player = history[action.step - 1].player === 1 ? 2 : 1;
            }
            // this.setState({
            //     boardSquares: newBoardHistory,
            //     player,
            //     currentStep: action.step
            // })
            return {
                ...state,
                boardSquares: newBoardHistory,
                player,
                currentStep: action.step
            }
        }
        default:
            return state;
    }
};

export default reducer;