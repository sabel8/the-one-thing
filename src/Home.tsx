import Container from '@mui/material/Container';
import React from 'react';
import { inject, observer } from 'mobx-react';
import { Thing } from './components/Thing';
import { SettingsDialog } from './components/SettingsDialog';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { Header } from './components/Header';
import { UIStore } from './stores/UIStore';

interface IProps {
	UIStore?: UIStore;
}

@inject('UIStore')
@observer
export class Home extends React.Component<IProps> {
	render() {
		return (
			<ThemeProvider theme={this.props.UIStore!.theme}>
				<CssBaseline />
				<Header />
				<SettingsDialog />
				<Container maxWidth={'sm'} sx={{ margin: '16pt auto' }}>
					<Thing />
				</Container>
			</ThemeProvider>
		);
	}
}
