import React from 'react';
import Fab from '@mui/material/Fab';
import { inject, observer } from 'mobx-react';
import DoneIcon from '@mui/icons-material/Done';
import { CardActions, TextField, Tooltip } from '@mui/material';
import { FocusQuestionStore } from '../stores/FocusQuestionStore';

interface IProps {
	FocusQuestionStore?: FocusQuestionStore;
}

@inject('FocusQuestionStore')
@observer
export class FocusQuestionEditing extends React.Component<IProps> {
	focusQuestionStore: FocusQuestionStore;
	constructor(props: IProps) {
		super(props);
		this.focusQuestionStore = props.FocusQuestionStore!;
	}
	render() {
		return (
			<>
				<Tooltip
					title={`This will help you focus and figure out what you can do. The emphasis here is on being able to do it. The declarative mode is important!`}
				>
					<TextField
						variant="standard"
						fullWidth
						label="The One Thing I can do is ..."
						value={this.focusQuestionStore.focusQuestion.firstPart}
						onChange={(event) =>
							this.focusQuestionStore.onChangeFocusQuestion('firstPart', event.target.value)
						}
					/>
				</Tooltip>
				<Tooltip
					title={`Here it is decided that you are just doing something or that it has some lofty, forward-looking purpose.`}
				>
					<TextField
						variant="standard"
						fullWidth
						label="with doing this..."
						value={this.focusQuestionStore.focusQuestion.secondPart}
						onChange={(event) =>
							this.focusQuestionStore.onChangeFocusQuestion('secondPart', event.target.value)
						}
					/>
				</Tooltip>
				<CardActions dir="rtl">
					<Fab color="primary" onClick={() => this.focusQuestionStore.submitEditing()}>
						<DoneIcon />
					</Fab>
				</CardActions>
			</>
		);
	}
}
