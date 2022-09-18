import { createTheme, lighten, Theme } from '@mui/material';
import { makeAutoObservable } from 'mobx';

const PRIMARY_COLOR_CACHE_KEY: string = 'primaryColor';

export class UIStore {
	showSettingsDialog: boolean = false;
	primaryColor: string;

	constructor() {
		this.primaryColor = localStorage[PRIMARY_COLOR_CACHE_KEY] || '#3f51b5';
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
		localStorage[PRIMARY_COLOR_CACHE_KEY] = color;
	}

	setSettingsDialogVisibility = (SettingsDialog: boolean) => {
		this.showSettingsDialog = SettingsDialog;
	};
}
