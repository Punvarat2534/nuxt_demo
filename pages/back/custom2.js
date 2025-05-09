﻿import axios from 'axios';

export default {
    data() {
        return {
            url_endpoint:"http://127.0.0.1:5000"
        };
    },mounted() {

    },
    computed: {
    },
    methods:{
		async xcrfstokens(){

			const config = {
					headers: {
					"x-api-key": "d5168cf6-d8e2-4701-9f8f-d51fe287d73a",
					},
				};
			
			const results = await axios.get(this.url_endpoint+"/xcrfstoken",config)
			.then(response => {	
				  this.tokens = response.data.token;   
				  return response.data.token;        
			}).catch(error => {
				  alert(error);
			});
	
			return results;
		}
	}
};