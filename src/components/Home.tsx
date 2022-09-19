import Container from '@mui/material/Container';
import React from 'react';
import { inject, observer } from 'mobx-react';
import { SettingsDialog } from './Settings/SettingsDialog';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline, Stack } from '@mui/material';
import { Header } from './Header';
import { UIStore } from '../stores/UIStore';
import { FocusQuestion } from './FocusQuestion/FocusQuestion';
import { PomodoroTimer } from './PomodoroTimer/PomodoroTimer';

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
						<FocusQuestion />
						<PomodoroTimer />
					</Stack>
				</Container>
			</ThemeProvider>
		);
	}
}
