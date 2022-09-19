import Container from '@mui/material/Container';
import React from 'react';
import { inject, observer } from 'mobx-react';
import { SettingsDialog } from './components/Settings/SettingsDialog';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline, Stack } from '@mui/material';
import { Header } from './components/Header';
import { UIStore } from './stores/UIStore';
import { FocusQuestion } from './components/FocusQuestion/FocusQuestion';
import { PomodoroTimer } from './components/PomodoroTimer/PomodoroTimer';

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
					<Stack spacing={2}>
						<PomodoroTimer />
						<FocusQuestion />
					</Stack>
				</Container>
			</ThemeProvider>
		);
	}
}
