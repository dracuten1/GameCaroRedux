import * as ActionTypes from './ActionTypes';


export const sqaureSelected = (payLoadsData) => {
    return {
        type: ActionTypes.CHOSE_POSITION,
        square: payLoadsData,
    };
};

export const initGame = (payLoadsdata) => {
    return {
        type: ActionTypes.INIT_GAME,
        payLoads: payLoadsdata
    };
};
export const setStep = (data) => {
    return {
        type: ActionTypes.SET_STEP,
        step:data
    };
};