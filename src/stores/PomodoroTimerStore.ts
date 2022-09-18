import { makeAutoObservable } from 'mobx';

export class PomodoroTimerStore {
	isWorking: boolean;
	isStarted: boolean;
	secondsLeft: number;
	cycles: number;
	workingMinutes: number;
	restingMinutes: number;

	constructor() {
		//load from cache
		this.isWorking = true;
		this.isStarted = false;
		this.cycles = 0;
		this.workingMinutes = 1;
		this.restingMinutes = 5;
		this.secondsLeft = (this.isWorking ? this.workingMinutes : this.restingMinutes) * 60;
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

	setRestingMinutes = (restingMinutes: number) => {
		this.restingMinutes = restingMinutes;
	};

	switchMode() {
		const wasWorking = this.isWorking;
		this.cycles = !wasWorking ? this.cycles + 1 : this.cycles;
		this.secondsLeft = (wasWorking ? this.restingMinutes : this.workingMinutes) * 60;
		this.isWorking = !this.isWorking;
		this.isStarted = false;
	}
	//#endregion

	//#region computeds
	get doneInPercentages(): number {
		return Math.floor(
			100 *
				(1 -
					this.secondsLeft /
						(60 * (this.isWorking ? this.workingMinutes : this.restingMinutes)))
		);
	}

	get timeLeft(): string {
		return new Date(this.secondsLeft * 1000).toISOString().substring(14, 19);
	}
	//#endregion
}
