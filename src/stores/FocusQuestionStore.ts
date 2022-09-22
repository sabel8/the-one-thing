import { makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import { IFocusQuestion } from '../models/IFocusQuestion';

export class FocusQuestionStore {
	focusQuestion: IFocusQuestion = { firstPart: '', secondPart: '' };
	isEditing: boolean = true;

	constructor() {
		makeAutoObservable(this);
		makePersistable(this, {
			name: 'FocusQuestionStore',
			properties: ['focusQuestion', 'isEditing'],
			storage: window.localStorage,
		});
	}

	onChangeFocusQuestion(part: keyof IFocusQuestion, value: string) {
		this.focusQuestion[part] = value;
	}

	setEditing(editing: boolean) {
		this.isEditing = editing;
	}

	get focusQuestionReadonly(): string {
		return `The One Thing I Can Do is ${this.focusQuestion.firstPart || '...'}, with doing this ${
			this.focusQuestion.secondPart || '...'
		}.`;
	}
}
