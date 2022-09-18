import { AudioStore } from './AudioStore';
import { PomodoroTimerStore } from './PomodoroTimerStore';
import { UIStore } from './UIStore';

export class MainStore {
	pomodoroTimerStore: PomodoroTimerStore = new PomodoroTimerStore();
	audioStore: AudioStore = new AudioStore();
	uiStore: UIStore = new UIStore();
}
