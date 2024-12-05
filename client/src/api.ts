import axios from 'axios'
import { BASE_URL } from './config'
//get 
export const productLists=async()=>{
    try {
        const response=await axios.get(`${BASE_URL}/productLists`)
        return response.data
    }
    catch(error) {
        return Promise.reject(error)
    }
}

