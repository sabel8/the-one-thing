import { makeAutoObservable } from 'mobx';
import { IFocusQuestion } from '../models/IFocusQuestion';

const FOCUS_QUESTION_CACHE_KEY: string = 'focusQuestion';

export class FocusQuestionStore {
	focusQuestion: IFocusQuestion;
	isEditing: boolean;

	constructor() {
		this.isEditing = !localStorage[FOCUS_QUESTION_CACHE_KEY];
		this.focusQuestion = this.isEditing
			? { firstPart: '', secondPart: '' }
			: JSON.parse(localStorage[FOCUS_QUESTION_CACHE_KEY]);
		makeAutoObservable(this);
	}

	onChangeFocusQuestion(part: keyof IFocusQuestion, value: string) {
		this.focusQuestion[part] = value;
	}

	submitEditing() {
		this.isEditing = false;
		localStorage[FOCUS_QUESTION_CACHE_KEY] = JSON.stringify(this.focusQuestion);
	}

	goEditing() {
		this.isEditing = true;
		localStorage.removeItem(FOCUS_QUESTION_CACHE_KEY);
	}

	get focusQuestionReadonly(): string {
		return `The One Thing I Can Do is ${this.focusQuestion.firstPart || '...'}, with doing this ${
			this.focusQuestion.secondPart || '...'
		}.`;
	}
}
