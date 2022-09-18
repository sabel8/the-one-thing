import React from 'react';
import { CirclePicker } from 'react-color';
import { Paper, Typography } from '@mui/material';
import { inject, observer } from 'mobx-react';
import { MainStore } from '../stores/MainStore';

interface IProps {
	MainStore?: MainStore;
}
interface IState {}

@inject('MainStore')
@observer
export class ColorPicker extends React.Component<IProps, IState> {
	render() {
		return (
			<Paper variant="outlined" sx={{ padding: 2 }}>
				<Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
					Color
				</Typography>
				<CirclePicker
					onChange={(color) => this.props.MainStore?.uiStore.setPrimaryColor(color.hex)}
				/>
			</Paper>
		);
	}
}
