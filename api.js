import axios from 'axios';

export const api = {
	key: process.env.API_KEY,
	baseUrl: process.env.API_BASE_URL
}

export const fetchFromApi = function(endpoint, params = {}) {
	return axios.get(`${api.baseUrl}${endpoint}`, {params : {
		...params,
		appid : api.key
	}})

    // axios.get(`${api.baseUrl}/weather?q=${input}&units=metric&appid=${api.key}`)

    // axios.get(`${api.baseUrl}/weather`, {params : {
    // 	q : input,
    // 	units : "metric",
    // 	appid : api.key
    // }})
}