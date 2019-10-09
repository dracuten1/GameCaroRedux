import React from 'react';
import './square.css';
import SquareContext from '../../contexts/square-context';

class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        // console.log(this.props.value)
        // console.log(this.props.squareObj);
        const { value, isSelected, squareObj } = this.props;
        const style = isSelected ? {
            'backgroundColor': 'green'
        } : null;
        let mark = '';
        if (value === 1) {
            mark = 'X';
        } else if (value === 2) {
            mark = 'O';
        }

        return (
            <SquareContext.Consumer>
                {context =>
                    <button
                        type="button"
                        className="square"
                        style={style}
                        onClick={() => context.onSquareClick(squareObj)}
                    >
                        {mark}
                    </button>
                }
            </SquareContext.Consumer>
        );
    }
}
export default Square;