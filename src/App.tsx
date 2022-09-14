import './App.css';
import { FocusQuestion } from './components/FocusQuestion';
import { PomodoroTimer } from './components/PomodoroTimer';

function App() {
	return (
		<div className="App">
			<PomodoroTimer
				workingMinutes={9}
				restingMinutes={7}
				cycles={2}
				secondsLeft={30}
				isWorking={false}
			/>
			<FocusQuestion />
		</div>
	);
}

export default App;
