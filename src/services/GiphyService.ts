import giphyApi, { GIFObject, Giphy } from 'giphy-api';

class GiphyService {
	apiKey: string;
	giphyApi: Giphy;

	constructor() {
		this.apiKey = 'CxIkmEyU8lFUstY1oRJP61pV9VCCA1Ai';
		//todo kivinni
		this.giphyApi = giphyApi(this.apiKey);
	}

	async get(searchTerm: string): Promise<GIFObject> {
		const response = await this.giphyApi.random(searchTerm);
		return response.data;
	}
}

export default new GiphyService();
