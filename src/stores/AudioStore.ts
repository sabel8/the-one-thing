import CHIME from '../assets/chime-sound.mp3';

export class AudioStore {
	private chime: HTMLAudioElement;
	constructor() {
		this.chime = new Audio(CHIME);
	}

	playChime = () => {
		this.chime.play();
	};
}
