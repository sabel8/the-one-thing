import React from 'react';
import { inject, observer } from 'mobx-react';
import { PomodoroTimerStore } from '../stores/PomodoroTimerStore';
import { CardActions, Fab, Stack, TextField } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';

interface IProps {
	PomodoroTimerStore?: PomodoroTimerStore;
}

@inject('PomodoroTimerStore')
@observer
export class PomodoroTimerEditing extends React.Component<IProps> {
	private pomodoroTimerStore: PomodoroTimerStore;
	constructor(props: IProps) {
		super(props);
		this.pomodoroTimerStore = props.PomodoroTimerStore!;
	}

	render() {
		return (
			<>
				<Stack spacing={2}>
					<TextField
						label="Working minutes"
						type={'number'}
						value={this.pomodoroTimerStore.workingMinutes}
						onChange={(e) => this.pomodoroTimerStore.setWorkingMinutes(+e.target.value)}
					/>
					<TextField
						label="Short resting minutes"
						type={'number'}
						value={this.pomodoroTimerStore.shortRestingMinutes}
						onChange={(e) => this.pomodoroTimerStore.setShortRestingMinutes(+e.target.value)}
					/>
					<TextField
						label="Long resting minutes"
						type={'number'}
						value={this.pomodoroTimerStore.longRestingMinutes}
						onChange={(e) => this.pomodoroTimerStore.setLongRestingMinutes(+e.target.value)}
					/>
				</Stack>

				<CardActions dir="rtl">
					<Fab color="primary" onClick={() => this.pomodoroTimerStore.setEditing(false)}>
						<DoneIcon />
					</Fab>
				</CardActions>
				{/* <Grid container spacing={2} sx={{ alignItems: 'center' }}>
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
				</Grid> */}
			</>
		);
	}
}
