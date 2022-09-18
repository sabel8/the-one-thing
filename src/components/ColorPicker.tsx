import React from 'react';
import Paper from '@mui/material/Paper';
import { CirclePicker } from 'react-color';
import { Box } from '@mui/material';
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
			<Box>
				<CirclePicker
					onChange={(color) => this.props.MainStore?.uiStore.setPrimaryColor(color.hex)}
				/>
			</Box>
		);
	}
}
