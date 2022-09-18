import { createTheme, lighten, Theme } from '@mui/material';
import { makeAutoObservable } from 'mobx';

const PRIMARY_COLOR_CACHE_KEY: string = 'primaryColor';
const FONT_FAMILY_CACHE_KEY: string = 'fontFamily';

export class UIStore {
	showSettingsDialog: boolean = false;
	primaryColor: string;
	fontFamily: string[];

	constructor() {
		this.primaryColor = localStorage[PRIMARY_COLOR_CACHE_KEY] || '#3f51b5';
		this.fontFamily = localStorage[FONT_FAMILY_CACHE_KEY]
			? JSON.parse(localStorage[FONT_FAMILY_CACHE_KEY])
			: ['Arial'];
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
			typography: {
				fontFamily: this.fontFamily.join(','),
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
		localStorage[PRIMARY_COLOR_CACHE_KEY] = color;
	}

	setFontFamily(fontFamily: string) {
		this.fontFamily = [fontFamily];
		localStorage[FONT_FAMILY_CACHE_KEY] = JSON.stringify(this.fontFamily);
	}

	setSettingsDialogVisibility = (SettingsDialog: boolean) => {
		this.showSettingsDialog = SettingsDialog;
	};
}
