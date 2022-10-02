import axios from "axios"
import appUrl from "./../config/appUrl";

export const urlHome = appUrl ;

const productsUrl =  urlHome +'/api/v1/products';

// let headers = { 'Content-Type': 'multipart/form-data' }
 
export const allProduct = async (id) => {
    id = id || '';
    return await axios.get(`${productsUrl}/${id}`);
}

export const addProd = async (Product, atoken) => {
    return await axios.post(`${productsUrl}` , Product, { headers: { token: atoken } });
}
export const updateProd = async (id, Product, atoken) => {
    return await axios.put(`${productsUrl}/${id}`, Product, { headers: { token: atoken } });
}


export const deleteProduct = async (id, atoken) => {
    return await axios.delete(`${productsUrl}/${id}`, { headers: { token: atoken } });
}

export const editProduct = async (id, Product) => {
    return await axios.put(`${productsUrl}/${id}`, Product)
}
 