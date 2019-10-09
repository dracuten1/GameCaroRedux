import React from 'react';

const squareContext = React.createContext({
    // eslint-disable-next-line no-unused-vars
    onSquareClick: (square) => { },
    value: null
});

export default squareContext;