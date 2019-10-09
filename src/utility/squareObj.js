class SquareValue {
    value = 0;

    key = 0;

    i = 0;

    j = 0;

    isSelected=false;

    constructor(value, key, i, j) {
        this.value = value;
        this.key = key;
        this.i = i;
        this.j = j;
    }

    select(){
        this.isSelected=true;
    }

    equal = (orther) => {
        if (orther.key === this.key) {
            return true;
        }
        return false;
    }

    isSameValue = (orther) => {
        if (orther.value === this.value) {
            return true;
        }
        return false;
    }
    
    isComponentValue = (orther) => {
        if (orther.value !== this.value && orther.value !== 0) {
            return true;
        }
        return false;
    }
}
export default SquareValue;