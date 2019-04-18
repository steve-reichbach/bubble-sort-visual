export const START = 'start';
export const CALCULATING = 'calculating';
export const FINISHED = 'finished';
export const PAUSED = 'paused';

export const INPUT_ARRAY_ID = 'InputArray';
export const INTERVAL = 2000;

export const INITIAL_STATE = {
    array: [],
    swapped: false,
    i: 0,
    a: null,
    b: null,
    process: START,
    inputString: '',
    intervalId: null,
    counter: 0
};

export const getDataInput = (str = ' ') => {
    if (!str) {
        return str;
    }
    // eslint-disable-next-line
    return str.replace(/[\[\]]/g, '')
        .split(',')
        .map(v => v.trim() === '' ? 'void' : +v)
        .filter(x => !['void', NaN].includes(x))
};

export const clearDataInput = () => {
    document.getElementById(INPUT_ARRAY_ID).value = [];
}