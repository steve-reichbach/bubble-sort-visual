export const START = 'start';
export const CALCULATING = 'calculating';
export const FINISHED = 'finished';

export const INITIAL_STATE = {
    array: [],
    swapped: false,
    i: 0,
    a: null,
    b: null,
    process: START,
    inputString: '',
    intervalId: null
};
