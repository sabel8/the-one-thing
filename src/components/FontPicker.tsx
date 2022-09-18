import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { inject, observer } from 'mobx-react';
import { MainStore } from '../stores/MainStore';

interface IProps {
	MainStore?: MainStore;
}
interface IState {}

@inject('MainStore')
@observer
export class FontPicker extends React.Component<IProps, IState> {
	render() {
		const { uiStore } = this.props.MainStore!;
		return (
			<FormControl fullWidth>
				<InputLabel>Font</InputLabel>
				<Select
					label="Font"
					value={uiStore.fontFamily}
					onChange={(e) => uiStore.setFontFamily(e.target.value as string)}
				>
					{uiStore.availableFontFamilies.map((font) => (
						<MenuItem value={font} key={font}>
							<Typography sx={{ fontFamily: font }}>{font}</Typography>
						</MenuItem>
					))}
				</Select>
			</FormControl>
		);
	}
}
