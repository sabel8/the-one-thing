import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { MainStore } from '../stores/MainStore';
import { inject, observer } from 'mobx-react';

interface IProps {
	MainStore?: MainStore;
}

@inject('MainStore')
@observer
export class Header extends React.Component<IProps> {
	render() {
		return (
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						The One Thing
					</Typography>
					<IconButton
						color="inherit"
						onClick={() => this.props.MainStore?.uiStore.setSettingsDialogVisibility(true)}
					>
						<SettingsIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
		);
	}
}
