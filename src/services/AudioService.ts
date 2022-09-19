import CHIME from '../assets/chime-sound.mp3';

class AudioService {
	private chime: HTMLAudioElement;
	constructor() {
		this.chime = new Audio(CHIME);
	}

	playChime = () => {
		this.chime.play();
	};
}

export default new AudioService();
