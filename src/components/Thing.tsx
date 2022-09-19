import React from 'react';
import { observer } from 'mobx-react';
import { PomodoroTimer } from './PomodoroTimer';
import { FocusQuestion } from './FocusQuestion';
import { Stack } from '@mui/material';

@observer
export class Thing extends React.Component {
	render() {
		return (
			<Stack spacing={2}>
				<PomodoroTimer />
				<FocusQuestion />
			</Stack>
		);
	}
}
