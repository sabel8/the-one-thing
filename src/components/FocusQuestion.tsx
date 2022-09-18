import React from 'react';
import Paper from '@mui/material/Paper';
import { IFocusQuestion } from '../models/IFocusQuestion';
import Fab from '@mui/material/Fab';
import { inject, observer } from 'mobx-react';
import { MainStore } from '../stores/MainStore';
import DoneIcon from '@mui/icons-material/Done';
import { Card, CardActions, TextField, Tooltip, Typography } from '@mui/material';
import { action, computed, makeAutoObservable, makeObservable, observable } from 'mobx';

interface IProps {
	MainStore?: MainStore;
}

@inject('MainStore')
@observer
export class FocusQuestion extends React.Component<IProps> {
	focusQuestion: IFocusQuestion;

	constructor(props: IProps) {
		super(props);
		this.focusQuestion = { firstPart: '', secondPart: '' };
		makeObservable(this, {
			focusQuestion: observable,
			onChangeFocusQuestion: action,
			focusQuestionReadonly: computed,
		});
	}

	onChangeFocusQuestion(part: keyof IFocusQuestion, value: string) {
		this.focusQuestion[part] = value;
	}

	get focusQuestionReadonly(): string {
		return `The One Thing I Can Do is ${this.focusQuestion.firstPart || '...'}, with doing this ${
			this.focusQuestion.secondPart || '...'
		}.`;
	}

	render() {
		return (
			<Card sx={{ padding: 5 }}>
				<Typography variant="h5">Focus question</Typography>
				<Tooltip
					title={`This will help you focus and figure out what you can do. The emphasis here is on
					being able to do it. The declarative mode is important!`}
				>
					<TextField
						variant="standard"
						fullWidth
						label="The One Thing I can do is ..."
						onChange={(event) => this.onChangeFocusQuestion('firstPart', event.target.value)}
					/>
				</Tooltip>
				<Tooltip
					title={`Here it is decided that you are just doing something or that it has some lofty, forward-looking purpose.`}
				>
					<TextField
						variant="standard"
						fullWidth
						label="with doing this..."
						onChange={(event) => this.onChangeFocusQuestion('secondPart', event.target.value)}
					/>
				</Tooltip>
				{/* <Typography variant='body1'>
					<b>WARNING! </b>
					Only proceed if you are sure that
					<i> everything else would be easier or completely unnecessary</i>!
				</Typography>
			*/}
				<Typography variant="h6">
					<b>{this.focusQuestionReadonly}</b>
				</Typography>

				<br />
				<CardActions dir="rtl">
					<Fab
						color="primary"
						onClick={() => {
							this.props.MainStore!.uiStore.setPrimaryColor('#554433');
						}}
					>
						<DoneIcon />
					</Fab>
				</CardActions>
			</Card>
		);
	}
}
