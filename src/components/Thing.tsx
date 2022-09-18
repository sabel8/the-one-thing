import React from 'react';
import { observer, inject } from 'mobx-react';
import { PomodoroTimer } from './PomodoroTimer';
import { MainStore } from '../stores/MainStore';
import { FocusQuestion } from './FocusQuestion';
import { Stack } from '@mui/material';

interface IProps {
	MainStore?: MainStore;
}

@inject('MainStore')
@observer
export class Thing extends React.Component<IProps> {
	render() {
		return (
			<Stack spacing={2}>
				<PomodoroTimer />
				<FocusQuestion />
			</Stack>
		);
	}
}
