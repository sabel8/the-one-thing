import { createTheme, lighten, Theme } from '@mui/material';
import { makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

export class UIStore {
	showSettingsDialog: boolean = false;
	primaryColor: string = '#3f51b5';
	fontFamily: string[] = ['Arial'];

	constructor() {
		makeAutoObservable(this);
		makePersistable(this, {
			name: 'UIStore',
			properties: ['primaryColor', 'fontFamily'],
			storage: window.localStorage,
		});
	}

	get theme(): Theme {
		return createTheme({
			palette: {
				primary: { main: this.primaryColor },
				background: { default: lighten(this.primaryColor, 0.5) },
			},
			typography: { fontFamily: this.fontFamily.join(',') },
			components: {
				MuiCard: { styleOverrides: { root: { padding: '20pt 40pt' } } },
			},
		});
	}

	get availableFontFamilies(): string[] {
		return [
			'Arial',
			'Verdana',
			'Tahoma',
			'Trebuchet MS',
			'Times New Roman',
			'Georgia',
			'Garamond',
			'Courier New',
			'Brush Script MT',
		];
	}

	setPrimaryColor(color: string) {
		this.primaryColor = color;
	}

	setFontFamily(fontFamily: string) {
		this.fontFamily = [fontFamily];
	}

	setSettingsDialogVisibility = (SettingsDialog: boolean) => {
		this.showSettingsDialog = SettingsDialog;
	};
}
