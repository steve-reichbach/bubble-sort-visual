import {
    STEP_NEXT,
    STEP_BACK,
    STOP,
    START,
    FORWARD,
    PAUSE,
    SET_INPUT_DATA,

    forward,
    stop,
    pause
} from '../actions/';

import {
    clearDataInput,
    getDataInput,
    CALCULATING,
    FINISHED,
    INITIAL_STATE,
    INTERVAL,
    PAUSED
} from '../../constants';

const operations = (state = {}, action) => {
    let {
        a,
        b,
        i,
        array,
        process,
        inputString,
        intervalId,
        swapped,
        counter
    } = state;

    switch (action.type) {
        case SET_INPUT_DATA:
            let data = getDataInput(action.payload.inputString);
            return ({
                ...state,
                inputString: inputString,
                array: data,
                a: data[0],
                b: data[1],
                i: 0,
                swapped: false
            });
        case START:
            // FIXME
            // Store intervalId in the state so it can be accessed later:
            return process === PAUSED ? {
                ...state,
                intervalId: intervalId,
                process: CALCULATING
            } : { ...state };
        case STEP_NEXT:
            return {
                ...state,
                list: action.payload,
                current: action.payload
            };
        case STEP_BACK:
            // FIXME
            return {...state};
        case STOP:
            let finalState;
            if (action.finished) {
                process = FINISHED;
                finalState = { ...INITIAL_STATE, process, array };
            } else {
                finalState = { ...INITIAL_STATE };
            }
            return { ...finalState };
        case FORWARD:
                return {
                    ...finalState,
                    a,
                    b,
                    i,
                    swapped,
                    array,
                    counter
                };
                // this.setState({ a, b, i, swapped, array, counter });
        case PAUSE:
            if (intervalId) { clearInterval(intervalId) }
            return { ...state };

        default:
            return state
    }
};

export default operations
