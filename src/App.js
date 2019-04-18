import React from 'react';
import TextField from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import {
    INITIAL_STATE,
    START,
    CALCULATING,
    PAUSED,
    FINISHED,

    INPUT_ARRAY_ID,
    INTERVAL,

    getDataInput,
    clearDataInput
} from './constants';

class App extends React.Component {
    state = { ...INITIAL_STATE };
    start = () => {
        // this.forward();
        const intervalId = setInterval(this.forward, INTERVAL);
        // Store intervalId in the state so it can be accessed later:
        if (this.state.process === PAUSED) {
            console.log(this.state);
            debugger;
            //alert('Continue please!');
        } else {
            this.setState({
                intervalId: intervalId,
                process: CALCULATING
            });
        }
    };
    forward = (firedByUser) => {
        if (firedByUser) {
            this.pause();
        }

        let {
            i,
            swapped,
            a,
            b,
            counter,
            process,
            array
        } = this.state;

        if (process !== CALCULATING) {
            this.setState({ process: CALCULATING });
        }

        // const array = [...this.state.array];

        if (array.length < 2) {
            this.stop(true);
        }

        if (i + 1 === array.length) {
            i = 0;
            if (swapped === true) {
                swapped = false;
            } else return this.stop(true);
        }

        if (counter === 0) {
            // FIXME: problem with counter === 0
        }
        if (array[i + 1] < array[i]) {
            const temp = array[i];
            array[i] = array[i + 1];
            array[i + 1] = temp;
            swapped = true;
            console.log(">>")
        }

        a = array[i];
        b = array[i + 1];
        i += 1;
        counter += 1;
        this.setState({ a, b, i, swapped, array, counter });
    };

    backward = (firedByUser) => {
        if (firedByUser) {
            this.pause();

            if (this.state.counter === 0) {
                this.stop(true)
            }
        }
        let { i, swapped } = this.state;
        const array = [...this.state.array];

        if (array.length < 2) {
            this.stop(true);
        }

        if (this.state.process !== CALCULATING) {
            this.setState({
                process: CALCULATING
            });
        }

        if (i === -1) {
            i = array.length - 1;
            // if (swapped === true) {
            //     swapped = false;
            // } else return this.stop(true);
        }

        let a = array[i];
        let b = array[i + 1];
        this.setState({ a, b });

        if (array[i] < array[i + 1]) {
            /*
            const temp = array[i];
            array[i - 1] = array[i];
            array[i] = temp;
            swapped = true;

            a = array[i - 1];
            b = array[i];
            */
            const temp = array[i];
            array[i] = array[i + 1];
            array[i + 1] = temp;
            swapped = true;

            a = array[i];
            b = array[i + 1];
        }
        i -= 1;
        setTimeout(this.setState.bind(this, { a, b, i, swapped, array }), INTERVAL / 2);
    };

    stop = (finished) => {
        clearInterval(this.state.intervalId);
        let finalState;
        if (finished) {
            let process = FINISHED;
            let array = this.state.array;
            finalState = { ...INITIAL_STATE, process, array };
        } else {
            finalState = { ...INITIAL_STATE };
        }
        clearDataInput();
        this.setState(finalState);
    };

    pause = () => this.state.intervalId ? clearInterval(this.state.intervalId) : null;

    render() {
        const { a, b, i, array, process, inputString, intervalId, counter } = this.state;
        const toShowDuringCalculation = process === CALCULATING;

        return (
            <section>
                <h1>Bubble sort visualizer</h1>
                <p>Please fill in elements to be sorted using comma as a separator</p>
                <div className="input">
                    <TextField
                        id={INPUT_ARRAY_ID}
                        required
                        disabled={!!intervalId}
                        error ={!(/["',\d+]/g.test(inputString)) }
                        margin="none"
                        variant="outlined"
                        value="90,21,-5"
                        onChange={ (e) => {
                            const inputString = e.target.value;
                            this.setState({
                                inputString: inputString,
                                array: getDataInput(inputString)
                            })
                        }}
                    />
                </div>
                <p>
                    What basically the algorithm does is comparing two elements of the array and apply action
                    in case if A is bigger than B, then it swaps them and go further till it reaches the end of
                    the array and then the process repeats.
                </p>
                <br/>
                <Button
                    color="primary"
                    title="Pause"
                    disabled={array.length < 2 || process !== CALCULATING}
                    onClick={ () => this.pause() }>
                    ||
                </Button>
                <Button
                    color="primary"
                    title="Stop"
                    disabled={array.length < 2 || process !== CALCULATING}
                    onClick={ () => this.stop() }>
                    █
                </Button>
                <Button
                    color="primary"
                    title="Play"
                    disabled={array.length < 2 || process === CALCULATING || process === PAUSED}
                    onClick={ () => this.start() }>
                    ►
                </Button>
                <Button
                    color="primary"
                    title="Previous step"
                    disabled={array.length < 2 || process === FINISHED}
                    onClick={ () => this.backward(true) }>
                    |◄
                </Button>
                <Button
                    color="primary"
                    title="Next step"
                    disabled={array.length < 2 || process === FINISHED}
                    onClick={ () => this.forward(true) }>
                    ►|
                </Button>
                <br/>
                { getDataInput(this.inputString).map((item, n) => <div className='arrayElement' key={`${item} – ${n}`}>{item}</div>) }
                <br/>
                {
                    array.length ? array.map((item, n) => {
                        const indexA = i;
                        const indexB = i - 1;

                        return <div className={
                            'arrayElement ' + (n === indexA || n === indexB ? ' moving' : '') +
                            (item === a ? ' A ' : (item === b ? ' B ' : '')) +
                            ((n === indexA && item > b) ? ' arrowRight' : '') +
                            ((n === indexB && item < a) ? ' arrowLeft' : '')
                        } key={`${item} – ${n}`}>{item}</div>
                    }) : null
                }
                {
                    toShowDuringCalculation ?
                        (<h2>
                            So, is
                            <span className='operand A'>{a}</span> > <span className='operand B'>{b}</span> ?
                        </h2>)
                        : null
                }
                {
                    toShowDuringCalculation ?
                        a > b ?
                            (<h2><span style={{color: 'lightgreen'}}>Yes</span>, that's why current action is: {b} goes left and {a} goes right</h2>) :
                            (<h2><span style={{color: 'lightgray'}}>Nope</span>, so we are doing nothing <span role="img" aria-label="clock image">🕒</span></h2>)
                        : null
                }
                { process === FINISHED ? <h2>The result is: {JSON.stringify(array)}</h2> : null }
                <br/>
            </section>
        );
    }
}

export default App;
