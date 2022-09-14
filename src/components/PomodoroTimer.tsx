import React from 'react';

interface IProps {
	workingMinutes: number;
	restingMinutes: number;
	secondsLeft?: number;
	cycles?: number;
	isWorking?: boolean;
}

interface IState {
	isWorking: boolean;
	isStarted: boolean;
	secondsLeft: number;
	cycles: number;
}

export class PomodoroTimer extends React.Component<IProps, IState> {
	private WorkTimer: NodeJS.Timer | undefined;
	private RestTimer: NodeJS.Timer | undefined;
	constructor(props: IProps) {
		super(props);
		let isWorking: boolean = this.props.isWorking ?? true;
		let secondsLeft: number = isWorking ? this.props.workingMinutes : this.props.restingMinutes;
		if (this.SecondsLeftPropValid(this.props, isWorking))
			secondsLeft = this.props.secondsLeft as number;
		let cycles: number = this.CycleProp(this.props.cycles);
		this.state = { isWorking, isStarted: false, secondsLeft, cycles };
	}

	private CycleProp(prop?: number): number {
		return prop !== undefined && !isNaN(prop) && prop > 0 ? prop : 0;
	}

	private SecondsLeftPropValid(props: IProps, isWorking: boolean): boolean {
		if (props.secondsLeft === undefined || isNaN(props.secondsLeft)) return false;
		if (
			props.secondsLeft < 1 ||
			props.secondsLeft > (isWorking ? props.workingMinutes : props.workingMinutes)
		) {
			console.error('Invalid secondsLeft prop!');
			return false;
		}
		return true;
	}

	get currentTimer(): NodeJS.Timer | undefined {
		return this.state.isWorking ? this.WorkTimer : this.RestTimer;
	}

	set currentTimer(timer: NodeJS.Timer | undefined) {
		if (this.state.isWorking) this.WorkTimer = timer;
		else this.RestTimer = timer;
	}

	onStartPause() {
		if (this.state.isStarted) clearInterval(this.currentTimer);
		else this.currentTimer = setInterval(() => this.decrementSecond(), 500);
		this.setState((prev) => ({ isStarted: !prev.isStarted }));
	}

	private decrementSecond() {
		console.log(
			'🚀 ~ file: PomodoroTimer.tsx ~ line 26 ~ PomodoroTimer ~ decrementSecond ~ this.state.secondsLeft',
			this.state.secondsLeft
		);
		if (this.state.secondsLeft <= 1) this.switchMode();
		else this.setState((prev) => ({ secondsLeft: prev.secondsLeft - 1 }));
	}

	private switchMode() {
		clearInterval(this.currentTimer);
		this.setState((prev) => ({
			cycles: !prev.isWorking ? prev.cycles + 1 : prev.cycles,
			isWorking: !prev.isWorking,
			secondsLeft: prev.isWorking ? this.props.restingMinutes : this.props.workingMinutes,
			isStarted: false,
		}));
	}

	render() {
		return (
			<div>
				<p>{this.state.isWorking ? 'WORKING' : 'RESTING'}</p>
				<p>
					{Math.floor(this.state.secondsLeft / 60)}:{this.state.secondsLeft % 60}
				</p>
				<p>Cycles: {this.state.cycles}</p>
				<button onClick={() => this.onStartPause()}>
					{this.state.isStarted ? 'PAUSE' : 'START'}
				</button>
				<br />
				<span>
					{Math.floor(
						100 *
							(1 -
								this.state.secondsLeft /
									(this.state.isWorking
										? this.props.workingMinutes
										: this.props.restingMinutes))
					)}
					%
				</span>
			</div>
		);
	}
}
