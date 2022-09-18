import React from 'react';
import { Provider } from 'mobx-react';
import { MainStore } from './stores/MainStore';
import { Home } from './Home';

interface IStores {
	MainStore: MainStore;
}

class App extends React.Component {
	private stores: IStores;

	constructor(props: any) {
		super(props);

		this.stores = {
			MainStore: new MainStore(),
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
