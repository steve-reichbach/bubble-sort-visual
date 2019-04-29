export const STEP_NEXT = 'STEP:NEXT';
export const STEP_BACK = 'STEP:BACK';
export const STOP = 'STOP';
export const START = 'START';
export const FORWARD = 'FORWARD';
export const PAUSE = 'PAUSE';
export const SET_INPUT_DATA = 'SET:INPUT:DATA';

export const goBack = i => ({
    type: STEP_BACK,
    payload: { i }
});

export const goNext = id => ({
    type: STEP_NEXT,
    payload: { id }
});

export const stop = (finished, intervalId) => ({
    type: STOP,
    payload: { finished, intervalId }
});

export const start = () => ({
    type: START
});

export const forward = (byUser) => ({
    type: FORWARD,
    payload: { byUser }
});

export const pause = () => ({
    type: PAUSE
});

export const setInputData = () => ({
    type: SET_INPUT_DATA
});
