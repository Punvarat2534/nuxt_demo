import axios from 'axios';

export const useGlobal = () => ({
	
	async url_endpoint() {
		return "http://localhost:5000";

	},
	hello: function () {
	  console.log('Hello')
	},
	async xcrfstokens(){

		const config = {
				headers: {
				"x-api-key": "d5168cf6-d8e2-4701-9f8f-d51fe287d73a",
				},
			};
		
		const results = await axios.get("http://localhost:5000/xcrfstoken",config)
		.then(response => {	
			  this.tokens = response.data.token;   
			  return response.data.token;        
		}).catch(error => {
			  alert(error);
		});

		//console.log(results);
		return results;
	}
});

