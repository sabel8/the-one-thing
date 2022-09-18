import React from 'react';
import { inject, observer } from 'mobx-react';
import { MainStore } from '../stores/MainStore';
import { ColorPicker } from './ColorPicker';
import { Dialog, DialogTitle, Stack } from '@mui/material';
import { FontPicker } from './FontPicker';

interface IProps {
	MainStore?: MainStore;
}

@inject('MainStore')
@observer
export class SettingsDialog extends React.Component<IProps, {}> {
	render() {
		return (
			<Dialog
				onClose={() => this.props!.MainStore!.uiStore.setSettingsDialogVisibility(false)}
				open={this.props!.MainStore!.uiStore.showSettingsDialog}
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
