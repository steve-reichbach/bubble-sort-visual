import React from 'react';
import TextField from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import {
    INITIAL_STATE,
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

        if (array.length < 2) {
            this.stop(true);
        }

        if (i + 1 === array.length) {
            i = 0;
            if (swapped === true) {
                swapped = false;
            } else return this.stop(true);
        }

        if (array[i + 1] < array[i]) {
            const temp = array[i];
            array[i] = array[i + 1];
            array[i + 1] = temp;
            swapped = true;
        }

        a = array[i + 1];
        b = array[i];
        i += 1;
        counter += 1;
        this.setState({ a, b, i, swapped, array, counter });
    };

    backward = (firedByUser) => {
        if (firedByUser) {
            this.pause();
            if (this.state.counter === 0) {
                return;
            }
        }

        let {
            i,
            swapped,
            a,
            b,
            counter,
            array
        } = this.state;

        if (array.length < 2) {
            this.stop(true);
        }

        if (i === 0) {
            i = array.length - 1;
            if (swapped === true) {
                swapped = false;
            }
        }

        if (array[i] > array[i - 1]) {
            const temp = array[i];
            array[i] = array[i - 1];
            array[i - 1] = temp;
            swapped = true;
        }

        a = array[i];
        b = array[i - 1];
        i -= 1;
        counter -= 1;
        this.setState({ a, b, i, swapped, array, counter });
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
        const { a, b, array, process, inputString, intervalId, counter } = this.state;
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
                        onChange={ (e) => {
                            const inputString = e.target.value;
                            const data = getDataInput(inputString);
                            this.setState({
                                inputString: inputString,
                                array: data,
                                a: data[0],
                                b: data[1],
                                i: 0,
                                swapped: false
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
                        return <div className={
                            'arrayElement ' +
                            (counter > 0 && (item === a ? ' A ' : (item === b ? ' B ' : '')))
                        } key={`${item} – ${n}`}>{item}</div>
                    }) : null
                }
                {
                    toShowDuringCalculation ?
                        (<h2>
                            Was <span className='operand A'>{a}</span> > <span className='operand B'>{b}</span> ?
                        </h2>)
                        : null
                }
                {
                    toShowDuringCalculation ?
                        a > b ?
                            (<h2><span style={{color: 'lightgreen'}}>Yes</span>, that's why {b} went left and {a} – right</h2>) :
                            (<h2><span style={{color: 'lightgray'}}>Nope</span>, so we didn't do anything <span role="img" aria-label="clock image">🕒</span></h2>)
                        : null
                }
                { process === FINISHED ? <h2>The result is: {JSON.stringify(array)}</h2> : null }
                <br/>
            </section>
        );
    }
}

export default App;
