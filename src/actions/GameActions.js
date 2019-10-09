import * as ActionTypes from './ActionTypes';


export const sqaureSelected = () => {
    return {
        type: ActionTypes.CHOSE_POSITION
    };
};

export const initGame = () => {
    return {
        type: ActionTypes.INIT_GAME
    };
};
export const saveHistory = () => {
    return {
        type: ActionTypes.ADD_HISTORY
    };
};