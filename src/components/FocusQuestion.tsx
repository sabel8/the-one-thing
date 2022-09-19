import React from 'react';
import { inject, observer } from 'mobx-react';
import { Box, Card, IconButton, Typography } from '@mui/material';
import { FocusQuestionStore } from '../stores/FocusQuestionStore';
import { FocusQuestionEditing } from './FocusQuestionEditing';
import EditIcon from '@mui/icons-material/Edit';

interface IProps {
	FocusQuestionStore?: FocusQuestionStore;
}

@inject('FocusQuestionStore')
@observer
export class FocusQuestion extends React.Component<IProps> {
	focusQuestionStore: FocusQuestionStore;
	constructor(props: IProps) {
		super(props);
		this.focusQuestionStore = props.FocusQuestionStore!;
	}
	render() {
		return (
			<Card>
				<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
					<Typography variant="h5">Focus question</Typography>
					{!this.focusQuestionStore.isEditing && (
						<IconButton onClick={() => this.focusQuestionStore.goEditing()}>
							<EditIcon />
						</IconButton>
					)}
				</Box>
				{this.focusQuestionStore.isEditing ? (
					<FocusQuestionEditing />
				) : (
					<Typography variant="h6" sx={{ fontWeight: 'bold' }}>
						{this.focusQuestionStore.focusQuestionReadonly}
					</Typography>
				)}
			</Card>
		);
	}
}
