import { makeAutoObservable } from 'mobx';

export class PomodoroTimerStore {
	isWorking: boolean;
	isStarted: boolean;
	secondsLeft: number;
	cycles: number;
	workingMinutes: number;
	shortRestingMinutes: number;
	longRestingMinutes: number;

	constructor() {
		//load from cache
		this.isWorking = true;
		this.isStarted = false;
		this.cycles = 0;
		this.workingMinutes = 1;
		this.shortRestingMinutes = 1;
		this.longRestingMinutes = 2;
		this.secondsLeft = (this.isWorking ? this.workingMinutes : this.shortRestingMinutes) * 60;
		this.secondsLeft = 5;
		makeAutoObservable(this);
	}

	//#region setters
	setIsWorking = (isWorking: boolean) => {
		this.isWorking = isWorking;
	};

	setIsStarted = (isStarted: boolean) => {
		this.isStarted = isStarted;
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
		this.cycles = !wasWorking ? this.cycles + 1 : this.cycles;
		this.isWorking = !this.isWorking;
		this.isStarted = false;
		switch (this.currentState) {
			case 'WORKING':
				this.secondsLeft = this.workingMinutes * 60;
				break;
			case 'SHORT REST':
				this.secondsLeft = this.shortRestingMinutes * 60;
				break;
			case 'LONG REST':
				this.secondsLeft = this.longRestingMinutes * 60;
				break;
		}
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

	//#endregion
}
