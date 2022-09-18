import React from 'react';
import { inject, observer } from 'mobx-react';
import { MainStore } from '../stores/MainStore';
import { Box, Card, IconButton, Typography } from '@mui/material';
import { FocusQuestionStore } from '../stores/FocusQuestionStore';
import { FocusQuestionEditing } from './FocusQuestionEditing';
import EditIcon from '@mui/icons-material/Edit';

interface IProps {
	MainStore?: MainStore;
}

@inject('MainStore')
@observer
export class FocusQuestion extends React.Component<IProps> {
	focusQuestionStore: FocusQuestionStore;
	constructor(props: IProps) {
		super(props);
		this.focusQuestionStore = props.MainStore!.focusQuestionStore;
	}
	render() {
		return (
			<Card sx={{ padding: 5 }}>
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
