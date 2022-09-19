import React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CircularProgress, { circularProgressClasses } from '@mui/material/CircularProgress';
import { inject, observer } from 'mobx-react';
import { PomodoroTimerStore } from '../../stores/PomodoroTimerStore';
import { Box, Fab, Grid, IconButton } from '@mui/material';
import PlayIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { PomodoroTimerEditing } from './PomodoroTimerEditing';
import EditIcon from '@mui/icons-material/Edit';
import AudioService from '../../services/AudioService';

interface IProps {
	PomodoroTimerStore?: PomodoroTimerStore;
}

@inject('PomodoroTimerStore')
@observer
export class PomodoroTimer extends React.Component<IProps> {
	private WorkTimer: NodeJS.Timer | undefined;
	private RestTimer: NodeJS.Timer | undefined;
	private pomodoroTimerStore: PomodoroTimerStore;
	constructor(props: IProps) {
		super(props);
		this.pomodoroTimerStore = props.PomodoroTimerStore!;
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
		else this.currentTimer = setInterval(() => this.decrementSecond(), 1000);
		this.pomodoroTimerStore.setIsStarted(!this.pomodoroTimerStore.isStarted);
	}

	private decrementSecond() {
		if (this.pomodoroTimerStore.secondsLeft <= 1) this.switchMode();
		else this.pomodoroTimerStore.decrementSecondsLeft();
	}

	private switchMode() {
		AudioService.playChime();
		clearInterval(this.currentTimer);
		this.pomodoroTimerStore.switchMode();
	}

	render() {
		return (
			<Card>
				<Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
					<Typography variant="h5">Pomodoro timer</Typography>
					{!this.pomodoroTimerStore.isEditing && (
						<IconButton onClick={() => this.pomodoroTimerStore.setEditing(true)}>
							<EditIcon />
						</IconButton>
					)}
				</Box>
				{this.pomodoroTimerStore.isEditing ? (
					<PomodoroTimerEditing />
				) : (
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
						{this.pomodoroTimerStore.isStarted && this.pomodoroTimerStore.gifUrl !== '' && (
							<Grid item xs={12} sx={{ textAlign: 'center' }}>
								<img
									src={this.pomodoroTimerStore.gifUrl}
									alt="giphy"
									style={{
										maxHeight: '30vh',
										maxWidth: '75%',
										height: 'auto',
										width: 'auto',
									}}
								/>
							</Grid>
						)}
					</Grid>
				)}
			</Card>
		);
	}
}
