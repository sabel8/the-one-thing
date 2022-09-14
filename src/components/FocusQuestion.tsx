import React from 'react';
import { IFocusQuestion } from '../models/IFocusQuestion';

interface IProps {}

interface IState {
	focusQuestion: IFocusQuestion;
}

export class FocusQuestion extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			focusQuestion: { firstPart: '', secondPart: '' },
		};
	}

	onChangeFocusQuestion(part: keyof IFocusQuestion, e: React.ChangeEvent<HTMLInputElement>) {
		this.setState({ focusQuestion: { ...this.state.focusQuestion, [part]: e.target.value } });
	}

	get focusQuestion(): string {
		return `The One Thing I Can Do is ${
			this.state.focusQuestion.firstPart || '...'
		}, with doing this ${this.state.focusQuestion.secondPart || '...'}.`;
	}

	render() {
		return (
			<div>
				<h1>Focus question</h1>
				<h2>
					The <i>One Thing</i> I Can Do
				</h2>
				<p>
					This will help you focus and figure out what you can do. The emphasis here is on
					being able to do it. The declarative mode is important!
				</p>
				<input
					type="text"
					name="question"
					id="focusQuestionInput"
					placeholder="The One Thing is ..."
					onChange={(event) => this.onChangeFocusQuestion('firstPart', event)}
				/>
				<hr />
				<h2>with doing this...</h2>
				<p>
					Here it is decided that you are just doing something or that it has some lofty,
					forward-looking purpose.
				</p>
				<input
					type="text"
					name="question"
					id="focusQuestionInput"
					placeholder="with doing this..."
					onChange={(event) => this.onChangeFocusQuestion('secondPart', event)}
				/>
				<p>
					<b>WARNING!</b>
					<br />
					Only proceed if you are sure that
					<i> everything else would be easier or completely unnecessary</i>!
				</p>
				<b>{this.focusQuestion}</b>
			</div>
		);
	}
}
