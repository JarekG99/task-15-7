class Stopwatch extends React.Component {
    constructor(display) {
        super(display);
        this.state = {
        running: false,
        display: display,
        times: {
          minutes: 0,
          seconds: 0,
          miliseconds: 0
          },
        }
        this.print();
      }

    reset() {
        this.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        };
    }

    print() {
        this.display.innerText = this.format(this.times);
    }

    format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    }

    start() {
    if (!this.running) {
        this.running = true;
        this.watch = setInterval(() => this.step(), 10);
      }
    }

    step() {
    if (!this.running) return;
    this.calculate();
    this.print();
    }

    calculate() {
    this.times.miliseconds += 1;
    if (this.times.miliseconds >= 100) {
        this.times.seconds += 1;
        this.times.miliseconds = 0;
      }
    if (this.times.seconds >= 60) {
        this.times.minutes += 1;
        this.times.seconds = 0;
      }
    }

    stop() {
        this.running = false;
    clearInterval(this.watch);
    }

    get() {
      let time = document.getElementsByClassName('stopwatch')[0].innerHTML;

      var span =document.createElement('div');
      span.innerHTML = time;
      document.getElementsByClassName('results')[0].appendChild(span);

      this.reset();
      this.print();
    }

    pad0(value) {
        let result = value.toString();
        if (result.length < 2) {
            result = '0' + result;
        }
        return result;
    }

    render() {
      return (
       <div>
        <nav className='controls'>
          <button
            class='button'
            id='start'
            value='Start'
            onClick={this.start()}
          />
          <button
            className='button'
            id='stop'
            value='Stop'
            onClick={this.stop()}
          />
        </nav>
        <div
          class='stopwatch'
          value='this.print()'
        />
        <ul className='results'>
          <button
            class='button'
            id='get'
            value='Get data'
            onClick={this.get()}
          />
        </ul>
      </div>
    );
  }
}

ReactDOM.render(
  <Stopwatch />,
  document.getElementById('content')
);

// const stopwatch = new Stopwatch(document.querySelector('.stopwatch'));
//
// let startButton = document.getElementById('start');
// startButton.addEventListener('click', () => stopwatch.start());
//
// let stopButton = document.getElementById('stop');
// stopButton.addEventListener('click', () => stopwatch.stop());
//
// let getButton = document.getElementById('get');
// getButton.addEventListener('click', () => stopwatch.get());
