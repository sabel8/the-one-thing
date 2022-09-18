import { AudioStore } from './AudioStore';
import { FocusQuestionStore } from './FocusQuestionStore';
import { PomodoroTimerStore } from './PomodoroTimerStore';
import { UIStore } from './UIStore';

export class MainStore {
	pomodoroTimerStore: PomodoroTimerStore = new PomodoroTimerStore();
	audioStore: AudioStore = new AudioStore();
	uiStore: UIStore = new UIStore();
	focusQuestionStore: FocusQuestionStore = new FocusQuestionStore();
}
