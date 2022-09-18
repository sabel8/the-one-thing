export interface IPomodoroTimer {
	workingMinutes: number;
	restingMinutes: number;
	secondsLeft?: number;
	cycles?: number;
	isWorking?: boolean;
}