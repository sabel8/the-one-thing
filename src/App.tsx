import React from 'react';
import { Provider } from 'mobx-react';
import { Home } from './components/Home';
import { PomodoroTimerStore } from './stores/PomodoroTimerStore';
import { FocusQuestionStore } from './stores/FocusQuestionStore';
import { UIStore } from './stores/UIStore';

interface IStores {
	PomodoroTimerStore: PomodoroTimerStore;
	UIStore: UIStore;
	FocusQuestionStore: FocusQuestionStore;
}

class App extends React.Component {
	private stores: IStores;

	constructor(props: any) {
		super(props);

		this.stores = {
			PomodoroTimerStore: new PomodoroTimerStore(),
			UIStore: new UIStore(),
			FocusQuestionStore: new FocusQuestionStore(),
		};
	}

	render() {
		return (
			<Provider {...this.stores}>
				<Home />
			</Provider>
		);
	}
}

export default App;
