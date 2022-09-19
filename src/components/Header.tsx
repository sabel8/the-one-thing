import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { UIStore } from '../stores/UIStore';
import { inject, observer } from 'mobx-react';

interface IProps {
	UIStore?: UIStore;
}

@inject('UIStore')
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
						onClick={() => this.props.UIStore!.setSettingsDialogVisibility(true)}
					>
						<SettingsIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
		);
	}
}
