import React from 'react';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import { IPomodoroTimer } from '../models/IPomodoroProps';
import { MainStore } from '../stores/MainStore';
import { inject, observer } from 'mobx-react';
import { PomodoroTimerStore } from '../stores/PomodoroTimerStore';
import { Fab } from '@mui/material';
import PlayIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

interface IProps {
	MainStore?: MainStore;
}

@inject('MainStore')
@observer
export class PomodoroTimer extends React.Component<IProps> {
	private WorkTimer: NodeJS.Timer | undefined;
	private RestTimer: NodeJS.Timer | undefined;
	private pomodoroTimerStore: PomodoroTimerStore;
	constructor(props: IProps) {
		super(props);
		this.pomodoroTimerStore = props.MainStore!.pomodoroTimerStore;
		// let isWorking: boolean = this.pomodoroTimerStore. ?? true;
		// let secondsLeft: number = isWorking ? this.props.workingMinutes : this.props.restingMinutes;
		// if (this.SecondsLeftPropValid(this.props, isWorking))
		// 	secondsLeft = this.props.secondsLeft as number;
		// let cycles: number = this.CycleProp(this.props.cycles);
	}

	private CycleProp(prop?: number): number {
		return prop !== undefined && !isNaN(prop) && prop > 0 ? prop : 0;
	}

	private SecondsLeftPropValid(props: IPomodoroTimer, isWorking: boolean): boolean {
		console.log(
			'🚀 ~ file: PomodoroTimer.tsx ~ line 31 ~ PomodoroTimer ~ SecondsLeftPropValid ~ props',
			props
		);
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
		return this.pomodoroTimerStore.isWorking ? this.WorkTimer : this.RestTimer;
	}

	set currentTimer(timer: NodeJS.Timer | undefined) {
		if (this.pomodoroTimerStore.isWorking) this.WorkTimer = timer;
		else this.RestTimer = timer;
	}

	onStartPause() {
		if (this.pomodoroTimerStore.isStarted) clearInterval(this.currentTimer);
		else this.currentTimer = setInterval(() => this.decrementSecond(), 100);
		this.pomodoroTimerStore.setIsStarted(!this.pomodoroTimerStore.isStarted);
	}

	private decrementSecond() {
		console.log(
			'🚀 ~ file: PomodoroTimer.tsx ~ line 26 ~ PomodoroTimer ~ decrementSecond ~ this.pomodoroTimerStore.secondsLeft',
			this.pomodoroTimerStore.secondsLeft
		);
		if (this.pomodoroTimerStore.secondsLeft <= 1) this.switchMode();
		else this.pomodoroTimerStore.decrementSecondsLeft();
	}

	private switchMode() {
		this.props.MainStore!.audioStore.playChime();
		clearInterval(this.currentTimer);
		this.pomodoroTimerStore.switchMode();
	}

	render() {
		return (
			<Paper>
				<p>{this.pomodoroTimerStore.isWorking ? 'WORKING' : 'RESTING'}</p>
				<p>{this.pomodoroTimerStore.timeLeft}</p>
				<p>Cycles: {this.pomodoroTimerStore.cycles}</p>
				<Fab color="primary" onClick={() => this.onStartPause()}>
					{this.pomodoroTimerStore.isStarted ? <PauseIcon /> : <PlayIcon />}
				</Fab>
				<br />
				<CircularProgress
					variant="determinate"
					value={this.pomodoroTimerStore.doneInPercentages}
				/>
			</Paper>
		);
	}
}
