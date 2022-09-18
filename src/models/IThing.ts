import { IFocusQuestion } from "./IFocusQuestion";
import { IPomodoroTimer } from "./IPomodoroProps";

export interface IThing {
	focusQuestion: IFocusQuestion;
	pomodoroTimer: IPomodoroTimer;
}