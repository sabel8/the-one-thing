import Container from '@mui/material/Container';
import React from 'react';
import { inject, observer } from 'mobx-react';
import { MainStore } from './stores/MainStore';
import { Thing } from './components/Thing';
import { SettingsDialog } from './components/SettingsDialog';
import { ThemeProvider } from '@emotion/react';
import { AppBar, CssBaseline, IconButton, Toolbar, Typography } from '@mui/material';
import { Header } from './components/Header';

interface IProps {
	MainStore?: MainStore;
}

@inject('MainStore')
@observer
export class Home extends React.Component<IProps, {}> {
	render() {
		return (
			<ThemeProvider theme={this.props.MainStore!.uiStore.theme}>
				<CssBaseline />
				<Header />
				<Container maxWidth={'sm'}>
					<SettingsDialog />
					<Thing />
				</Container>
			</ThemeProvider>
		);
	}
}
