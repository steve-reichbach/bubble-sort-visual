export const INITIAL_STATE = {
    array: [],
    swapped: false,
    i: 0,
    a: null,
    b: null,
    process: 'start',
    inputString: '',
    intervalId: null
};

export const START = 'start';
export const CALCULATING = 'calculating';
export const FINISHED = 'finished';
