const axios = require('axios').default;
const chalk = require('chalk');

module.exports = class {
	constructor(id, token) {
		this.token = token;
		this.id = id;
	}

	setID(id) {
		this.id = id;
		return this;
	}

	setToken(token) {
		this.token = token;
		return this;
	}

	async setup() {
		return {
			id: this.id,
			token: this.token,
			async getUser(secret) {
				let returnValue;
				await axios
					.post('https://auth.redcrafter07.de/api/getToken', {
						headers: {
							Authorization: this.token,
							ID: this.id,
							token: secret
						}
					})
					.then(res => (returnValue = res.data))
					.catch(e =>
						console.log(
							chalk.red(`[RE-AUTH-API]: API Error: ${e.response.status} | ${e.response.statusText}`),
							e.response
						)
					);

				return returnValue;
			},
			async validate() {
				let returnValue;
				await axios
					.get('https://auth.redcrafter07.de/api', {
						headers: {
							Authorization: this.token,
							ID: this.id
						}
					})
					.then(res => (returnValue = res.data))
					.catch(e =>
						console.log(
							chalk.red(`[RE-AUTH-API]: API Error: ${e.response.status} | ${e.response.statusText}`)
						)
					);

				return returnValue;
			}
		};
	}
};
