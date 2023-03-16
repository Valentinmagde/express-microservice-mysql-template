import axios from 'axios';
// import CONSTANTS from './../config/constants.js';

class ApiHandler{

	getUserInformation(userId){
		return axios(`http://localhost:4000/getUserDetails/${userId}`);
	}

	async getProductInformation(productId){
		return axios(`http://localhost:3000/product/${productId}`);
	}
}

const apiHandler = new ApiHandler();
export default apiHandler;
