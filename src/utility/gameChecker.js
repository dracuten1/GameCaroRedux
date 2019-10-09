
class Checker {
    static check = (squareValue, squares) => {
        if (this.checkSubDiagonal(squareValue, squares).length > 0) {
            return this.checkSubDiagonal(squareValue, squares)
        }
        if (this.checkCol(squareValue, squares).length > 0) {
            return this.checkCol(squareValue, squares)
        }
        if (this.checkRow(squareValue, squares).length > 0) {
            return this.checkRow(squareValue, squares)
        }
        if (this.checkMainDiagonal(squareValue, squares).length > 0) {
            return this.checkMainDiagonal(squareValue, squares)
        }
        return [];
    }

    static checkCol = (squareValue, squares) => {
        // console.log('Square value', squareValue);
        let twoHeadBlock = false;
        let count = 1;
        let x = squareValue.i + 1;
        let arr = [];
        while (x < 20) {
            if (squareValue.isSameValue(squares[x][squareValue.j])) {
                count+=1;
                x+=1;
                arr = [...arr, squares[x][squareValue.j]]
            } else {
                // console.log(squares[x][squareValue.j].value);
                if (squares[x][squareValue.j].value !== 0) {
                    twoHeadBlock = true;
                    // console.log('Block 1');
                }
                break;
            }
        }
        x = squareValue.i - 1;
        while (x >= 0) {
            const value = squares[x][squareValue.j];
            if (squareValue.isSameValue(value)) {
                count+=1;
                x-=1;
                arr = [...arr, value]
            } else {
                // console.log(squares[x][squareValue.j].value);
                if (value.value !== 0) {
                    twoHeadBlock = twoHeadBlock && true;
                    // console.log('Block 1');
                } else {
                    twoHeadBlock = false;
                }
                break;
            }
        }
        // console.log('Count col', count);
        return (count >= 5) && !twoHeadBlock ? arr : [];
    }

    static checkRow = (squareValue, squares) => {
        // console.log('Square value', squareValue);
        let twoHeadBlock = false;
        let count = 1;
        let x = squareValue.j + 1;
        let arr = [];
        while (x < 20) {

            const value = squares[squareValue.i][x];
            if (squareValue.isSameValue(value)) {
                count+=1;
                x+=1;
                arr = [...arr, value]
            } else {
                // console.log(value);
                if (value.value !== 0) {
                    twoHeadBlock = true;
                    // console.log('Block 1');
                }
                break;
            }
        }

        x = squareValue.j - 1;
        while (x >= 0) {


            const value = squares[squareValue.i][x];
            if (squareValue.isSameValue(value)) {
                count+=1;
                x-=1;
                arr = [...arr, value]
            } else {
                // console.log(value);
                if (value.value !== 0) {
                    twoHeadBlock = twoHeadBlock && true;
                    // console.log('Block 1');
                } else {
                    twoHeadBlock = false;
                }
                break;
            }
        }

        // console.log('Count row', count);
        return (count >= 5) && !twoHeadBlock ? arr : [];
    }

    static checkMainDiagonal = (squareValue, squares) => {
        let twoHeadBlock = false;
        let count = 1;
        let x = squareValue.i + 1;
        let y = squareValue.j + 1;
        let arr = [];
        while (x < 20 && y < 20) {

            const value = squares[x][y];
            if (squareValue.isSameValue(value)) {
                count += 1;
                x+=1;
                y+=1;
                arr = [...arr, value];
            } else {
                // console.log(value);
                if (value.value !== 0) {
                    twoHeadBlock = true;
                    // console.log('Block 1');
                }
                break;
            }
        }
        x = squareValue.i - 1;
        y = squareValue.j - 1;
        while (x >= 0 && y >= 0) {

            const value = squares[x][y];
            if (squareValue.isSameValue(value)) {
                count += 1;
                x-=1;
                y-=1;
                arr = [...arr, value];
            } else {
                // console.log(value);
                if (value.value !== 0) {
                    twoHeadBlock = twoHeadBlock && true;
                    // console.log('Block 1');
                } else {
                    twoHeadBlock = false;
                }
                break;
            }
        }
        // console.log('Check Main Diagonal', count);

        return (count >= 5) && !twoHeadBlock ? arr : [];
    }

    static checkSubDiagonal = (squareValue, squares) => {
        let twoHeadBlock = false;
        let count = 1;
        let x = squareValue.i + 1;
        let y = squareValue.j - 1;
        let arr = [];
        while (x < 20 && y >= 0) {
            const value = squares[x][y];
            if (squareValue.isSameValue(value)) {
                count += 1;
                x+=1;
                y-=1;
                arr = [...arr, value];
            } else {
                // console.log(value);
                if (value.value !== 0) {
                    twoHeadBlock = true;
                    // console.log('Block 1');
                } else {
                    twoHeadBlock = false;
                }
                break;
            }
        }
        x = squareValue.i - 1;
        y = squareValue.j + 1;
        while (x >= 0 && y < 20) {
            const value = squares[x][y];
            if (squareValue.isSameValue(value)) {
                count += 1;
                x-=1;
                y+=1;
                arr = [...arr, value];
            } else {
                // console.log(value);
                if (value.value !== 0) {
                    twoHeadBlock = twoHeadBlock && true;
                    // console.log('Block 1');
                } else {
                    twoHeadBlock = false;
                }
                break;
            }
        }
        // console.log('Check Sub Diagonal', count);
        // console.log('twoHeadBlock', twoHeadBlock);
        return (count >= 5) && !twoHeadBlock ? arr : [];
    }
}
export default Checker;