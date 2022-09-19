import React from 'react';
import { inject, observer } from 'mobx-react';
import { UIStore } from '../stores/UIStore';
import { ColorPicker } from './ColorPicker';
import { Dialog, DialogTitle, Stack } from '@mui/material';
import { FontPicker } from './FontPicker';

interface IProps {
	UIStore?: UIStore;
}

@inject('UIStore')
@observer
export class SettingsDialog extends React.Component<IProps, {}> {
	render() {
		return (
			<Dialog
				onClose={() => this.props.UIStore!.setSettingsDialogVisibility(false)}
				open={this.props.UIStore!.showSettingsDialog}
			>
				<DialogTitle>Settings</DialogTitle>
				<Stack spacing={3} sx={{ padding: 2 }}>
					<ColorPicker />
					<FontPicker />
				</Stack>
			</Dialog>
		);
	}
}
