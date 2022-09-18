import { createTheme, lighten, Theme } from '@mui/material';
import { makeAutoObservable } from 'mobx';

export class UIStore {
	showSettingsDialog: boolean = false;
	primaryColor: string = '#3f51b5';

	constructor() {
		makeAutoObservable(this);
	}

	get theme(): Theme {
		return createTheme({
			palette: {
				primary: {
					main: this.primaryColor,
				},
				background: {
					default: lighten(this.primaryColor, 0.5),
				},
			},
		});
	}

	setPrimaryColor(color: string) {
		this.primaryColor = color;
	}

	setSettingsDialogVisibility = (SettingsDialog: boolean) => {
		this.showSettingsDialog = SettingsDialog;
	};
}
