import React from 'react';
import { CirclePicker } from 'react-color';
import { Paper, Typography } from '@mui/material';
import { inject, observer } from 'mobx-react';
import { UIStore } from '../../stores/UIStore';

interface IProps {
	UIStore?: UIStore;
}

@inject('UIStore')
@observer
export class ColorPicker extends React.Component<IProps> {
	render() {
		return (
			<Paper variant="outlined" sx={{ padding: 2 }}>
				<Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
					Color
				</Typography>
				<CirclePicker onChange={(color) => this.props.UIStore!.setPrimaryColor(color.hex)} />
			</Paper>
		);
	}
}
