import { GIFObject } from 'giphy-api';
import { makeAutoObservable } from 'mobx';
import GiphyService from '../services/GiphyService';

const SECONDS_LEFT_CACHE_KEY = 'secondsLeft';
const CYCLES_CACHE_KEY = 'cycles';
const IS_WORKING_CACHE_KEY = 'isWorking';
const WORKING_MINUTES_CACHE_KEY = 'workingMinutes';
const SHORT_REST_MINUTES_CACHE_KEY = 'shortRestMinutes';
const LONG_REST_MINUTES_CACHE_KEY = 'longRestMinutes';

export class PomodoroTimerStore {
	isWorking: boolean;
	isStarted: boolean;
	secondsLeft: number;
	cycles: number;
	workingMinutes: number;
	shortRestingMinutes: number;
	longRestingMinutes: number;
	gifUrl: string;
	isEditing: boolean;

	constructor() {
		//todo: load from cache
		this.isEditing =
			!localStorage[WORKING_MINUTES_CACHE_KEY] &&
			!localStorage[SHORT_REST_MINUTES_CACHE_KEY] &&
			!localStorage[LONG_REST_MINUTES_CACHE_KEY];
		this.isWorking = localStorage[IS_WORKING_CACHE_KEY]
			? JSON.parse(localStorage[IS_WORKING_CACHE_KEY])
			: true;
		this.isStarted = false;
		this.cycles = localStorage[CYCLES_CACHE_KEY] || 0;
		this.workingMinutes = localStorage[WORKING_MINUTES_CACHE_KEY] || 25;
		this.shortRestingMinutes = localStorage[SHORT_REST_MINUTES_CACHE_KEY] || 5;
		this.longRestingMinutes = localStorage[LONG_REST_MINUTES_CACHE_KEY] || 30;
		this.secondsLeft = localStorage[SECONDS_LEFT_CACHE_KEY] || this.currentModeLengthInSeconds;
		this.gifUrl = '';
		makeAutoObservable(this);
	}

	//#region setters
	setIsWorking = (isWorking: boolean) => {
		this.isWorking = isWorking;
		localStorage[IS_WORKING_CACHE_KEY] = isWorking;
	};

	setIsStarted = (isStarted: boolean) => {
		this.isStarted = isStarted;
		if (isStarted) this.refreshGif();
	};

	setSecondsLeft = (secondsLeft: number) => {
		this.secondsLeft = secondsLeft;
		localStorage[SECONDS_LEFT_CACHE_KEY] = secondsLeft;
	};

	decrementSecondsLeft = () => {
		this.secondsLeft--;
		localStorage[SECONDS_LEFT_CACHE_KEY] = this.secondsLeft;
	};

	setCycles = (cycles: number) => {
		this.cycles = cycles;
		localStorage[CYCLES_CACHE_KEY] = cycles;
	};

	setWorkingMinutes = (workingMinutes: number) => {
		this.workingMinutes = workingMinutes;
		localStorage[WORKING_MINUTES_CACHE_KEY] = workingMinutes;
	};

	setShortRestingMinutes = (restingMinutes: number) => {
		this.shortRestingMinutes = restingMinutes;
		localStorage[SHORT_REST_MINUTES_CACHE_KEY] = restingMinutes;
	};

	setLongRestingMinutes = (restingMinutes: number) => {
		this.longRestingMinutes = restingMinutes;
		localStorage[LONG_REST_MINUTES_CACHE_KEY] = restingMinutes;
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
		if (editing) {
			localStorage.removeItem(WORKING_MINUTES_CACHE_KEY);
			localStorage.removeItem(SHORT_REST_MINUTES_CACHE_KEY);
			localStorage.removeItem(LONG_REST_MINUTES_CACHE_KEY);
			localStorage.removeItem(IS_WORKING_CACHE_KEY);
			localStorage.removeItem(CYCLES_CACHE_KEY);
			localStorage.removeItem(SECONDS_LEFT_CACHE_KEY);
		} else {
			localStorage[WORKING_MINUTES_CACHE_KEY] = this.workingMinutes;
			localStorage[SHORT_REST_MINUTES_CACHE_KEY] = this.shortRestingMinutes;
			localStorage[LONG_REST_MINUTES_CACHE_KEY] = this.longRestingMinutes;
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
