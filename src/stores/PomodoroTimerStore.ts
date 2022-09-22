import { GIFObject } from 'giphy-api';
import { makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import GiphyService from '../services/GiphyService';

export class PomodoroTimerStore {
	isWorking: boolean = true;
	isStarted: boolean = false;
	secondsLeft: number = 0;
	cycles: number = 0;
	workingMinutes: number = 25;
	shortRestingMinutes: number = 5;
	longRestingMinutes: number = 30;
	gifUrl: string = '';
	isEditing: boolean = true;

	constructor() {
		makeAutoObservable(this);
		makePersistable(this, {
			name: 'PomodoroTimerStore',
			properties: [
				'isWorking',
				'cycles',
				'secondsLeft',
				'workingMinutes',
				'shortRestingMinutes',
				'longRestingMinutes',
				'isEditing',
			],
			storage: window.localStorage,
		});
	}

	//#region setters
	setIsWorking = (isWorking: boolean) => {
		this.isWorking = isWorking;
	};

	setIsStarted = (isStarted: boolean) => {
		this.isStarted = isStarted;
		if (isStarted) this.refreshGif();
	};

	setSecondsLeft = (secondsLeft: number) => {
		this.secondsLeft = secondsLeft;
	};

	decrementSecondsLeft = () => {
		this.secondsLeft--;
	};

	setCycles = (cycles: number) => {
		this.cycles = cycles;
	};

	setWorkingMinutes = (workingMinutes: number) => {
		this.workingMinutes = workingMinutes;
	};

	setShortRestingMinutes = (restingMinutes: number) => {
		this.shortRestingMinutes = restingMinutes;
	};

	setLongRestingMinutes = (restingMinutes: number) => {
		this.longRestingMinutes = restingMinutes;
	};

	switchMode() {
		const wasWorking = this.isWorking;
		this.setCycles(!wasWorking ? this.cycles + 1 : this.cycles);
		this.setIsWorking(!this.isWorking);
		this.isStarted = false;
		switch (this.currentState) {
			case 'WORKING':
				this.setSecondsLeft(this.workingMinutes * 60);
				break;
			case 'SHORT REST':
				this.setSecondsLeft(this.shortRestingMinutes * 60);
				break;
			case 'LONG REST':
				this.setSecondsLeft(this.longRestingMinutes * 60);
				break;
		}
	}

	setEditing(editing: boolean) {
		if (!editing) {
			this.setSecondsLeft(this.workingMinutes * 60);
			this.setCycles(0);
			this.setIsWorking(true);
		}
		this.isEditing = editing;
	}
	//#endregion

	//#region computeds
	get doneInPercentages(): number {
		return Math.floor(100 * (1 - this.secondsLeft / this.currentModeLengthInSeconds));
	}

	get timeLeft(): string {
		return new Date(this.secondsLeft * 1000).toISOString().substring(14, 19);
	}

	get currentState(): 'WORKING' | 'SHORT REST' | 'LONG REST' {
		if (this.isWorking) return 'WORKING';
		return (this.cycles + 1) % 3 === 0 ? 'LONG REST' : 'SHORT REST';
	}

	get currentModeLengthInSeconds(): number {
		switch (this.currentState) {
			case 'WORKING':
				return this.workingMinutes * 60;
			case 'SHORT REST':
				return this.shortRestingMinutes * 60;
			case 'LONG REST':
				return this.longRestingMinutes * 60;
		}
		return 0;
	}

	*refreshGif() {
		this.gifUrl = '';
		const gif: GIFObject = yield GiphyService.get(this.isWorking ? 'Working' : 'sleep');
		this.gifUrl = gif.images.original.url;
	}
	//#endregion
}
