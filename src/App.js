import React from 'react';
import TextField from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import {INITIAL_STATE, START, CALCULATING, FINISHED} from './constants';

class App extends React.Component {
    state = { ...INITIAL_STATE };
    init = () => {
        this.swap();
        const intervalId = setInterval(this.swap, 2000);
        // store intervalId in the state so it can be accessed later:
        this.setState({
            intervalId: intervalId,
            process: CALCULATING
        });
    };

    swap = () => {
        // setState method is used to update the state
        let { i, swapped } = this.state;
        const array = [...this.state.array];

        if (array.length < 2) {
            this.stopLoop(true);
        }

        if (i + 1 === array.length) {
            i = 0;
            if (swapped === true) {
                swapped = false;
            } else return this.stopLoop(true);
        }
        const a = array[i];
        const b = array[i + 1];

        if (array[i] > array[i + 1]) {
            const temp = array[i];
            array[i] = array[i + 1];
            array[i + 1] = temp;
            swapped = true;
        }
        i += 1;
        this.setState({ a, b, i, swapped, array });
    };

    stopLoop = (finished) => {
        clearInterval(this.state.intervalId);
        let finalState;
        if (finished) {
            let process = FINISHED;
            let array = this.state.array;
            finalState = { ...INITIAL_STATE, process, array };
        } else {
            finalState = { ...INITIAL_STATE }
        }
        this.setState(finalState);
    };

    render() {
        const { intervalId, a, b, i, array, process, inputString } = this.state;
        return (
            <section>
                <h1>Bubble sort visualizer</h1>
                <p>Please fill in elements to be sorted using comma as a separator</p>
                <div className="input">
                    <TextField
                        id='InputArray'
                        required
                        disabled={!!intervalId}
                        error ={!(/[,\d+]/g.test(inputString)) }
                        margin="none"
                        variant="outlined"
                        onChange={ (e) => {
                            const inputString = e.target.value;
                            this.setState({
                                inputString: inputString,
                                array: inputString
                                    .replace(/[\[\]]/g, '')
                                    .split(',')
                                    .map(v => v.trim() === '' ? 'void' : +v)
                                    .filter(i => !['void', NaN].includes(i))
                            })
                        }}
                    />
                </div>
                <p>
                    What basically the algorithm does is comparing two elements of the array and apply action
                    in case if A is bigger than B, then it swaps them and go further till it reaches the end of
                    the array and then the process repeats.
                </p>
                {
                    (process !== START && array.length) ? array.map((item, n) => {
                        const indexA = i;
                        const indexB = i - 1;

                        return <div className={
                            'arrayElement ' + (n === indexA ? ' A' : (n === indexB ? ' B' : '')) +
                            ((n === indexA && item > b) ? ' arrowRight' : '') +
                            ((n === indexB && item < a) ? ' arrowLeft' : '')
                        } key={`${item} – ${n}`}>{item}</div>
                    }) : null
                }
                {
                    process === CALCULATING ?
                        (<h2>
                            So, is
                            <span className={ 'operandA ' }>{ a || a === 0 ? ` ${a}` : '' } </span> >
                            <span className='operandB'>{ b || b === 0 ? ` ${b}` : '' } </span> ?
                        </h2>)
                        :null
                }
                {
                    process === CALCULATING ?
                        a > b ?
                            (<h2><span style={{color: 'lightgreen'}}>Yes</span>, that's why current action is: {b} goes left and {a} goes right</h2>) :
                            (<h2><span style={{color: 'lightgray'}}>Nope</span>, so we are doing nothing <span role="img" aria-label="clock image">🕒</span></h2>)
                        : null
                }
                <h2>{ process === FINISHED ? `The answer is: ${JSON.stringify(array) }` : ''}</h2>
                <br/>
                <Button
                    color="primary"
                    disabled={this.state.array.length < 2 || this.state.process !== START}
                    onClick={ () => this.init() }>
                    Visualize!
                </Button>
                <Button color="primary" onClick={ () => this.stopLoop() }>
                    Reset
                </Button>
            </section>
        );
    }
}

export default App;
