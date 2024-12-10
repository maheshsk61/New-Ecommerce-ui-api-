import axios from "axios";
import { BASE_URL } from "./config";
//get
export const productLists = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/productLists`);
    //console.log(response.data)
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const productType = async (params: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/productType/${params}`);
    //console.log(params)
    //console.log(response.data)
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

//post
export const user = async (payload: object) => {
  try {
    const response = await axios.post(`${BASE_URL}/newUser`, payload);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
