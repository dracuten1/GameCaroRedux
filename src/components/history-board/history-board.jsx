import React from 'react';
import './history-board.css';

const historyBoard = props => {
    let arr = [];
    if (!props.arrange) {
        for (let i = props.step; i >=0; i -= 1) {
            arr = [...arr, i];
        }
    }else{
        for (let i = 0; i <= props.step; i += 1) {
            arr = [...arr, i];
        }
    }
    
    // console.log(arr);
    return arr.map((step) => {
        const style = props.current === step ? {
            'backgroundColor': 'green'
        } : null;
        return <li key={step}>
            <button className="button" type="button" style={style} onClick={() => props.backToStep(step)}>Jump to {step}</button>
        </li>
    }


    )
}

export default historyBoard;