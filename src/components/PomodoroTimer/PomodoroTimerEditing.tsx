import React from 'react';
import { inject, observer } from 'mobx-react';
import { PomodoroTimerStore } from '../../stores/PomodoroTimerStore';
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
			</>
		);
	}
}
