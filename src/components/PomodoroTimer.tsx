import React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CircularProgress, { circularProgressClasses } from '@mui/material/CircularProgress';
import { IPomodoroTimer } from '../models/IPomodoroProps';
import { MainStore } from '../stores/MainStore';
import { inject, observer } from 'mobx-react';
import { PomodoroTimerStore } from '../stores/PomodoroTimerStore';
import { Box, Fab, Grid } from '@mui/material';
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
			<Card sx={{ padding: 2 }}>
				<Grid container spacing={2} sx={{ alignItems: 'center' }}>
					<Grid item xs={6} sm={4} sx={{ textAlign: 'center' }}>
						<Typography variant="h3">{this.pomodoroTimerStore.timeLeft}</Typography>
					</Grid>
					<Grid item xs={6} sm={4} sx={{ textAlign: 'center' }}>
						<Box sx={{ position: 'relative', display: 'inline-flex' }}>
							<CircularProgress
								variant="determinate"
								size={80}
								sx={{
									[`& .${circularProgressClasses.circle}`]: { strokeLinecap: 'round' },
								}}
								value={this.pomodoroTimerStore.doneInPercentages}
							/>
							<Box
								sx={{
									top: 0,
									left: 0,
									bottom: 0,
									right: 0,
									position: 'absolute',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<Fab color="primary" onClick={() => this.onStartPause()}>
									{this.pomodoroTimerStore.isStarted ? <PauseIcon /> : <PlayIcon />}
								</Fab>
							</Box>
						</Box>
					</Grid>
					<Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
						<Typography variant="h6">{this.pomodoroTimerStore.currentState}</Typography>
						<Typography variant="body1">
							Cycles done: {this.pomodoroTimerStore.cycles}
						</Typography>
					</Grid>
				</Grid>
			</Card>
		);
	}
}
