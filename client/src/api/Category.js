import axios from "axios"
import { urlHome } from './Product';
 


const categoriesUrl = urlHome+'/api/v1/categories';

 
export const allCategory = async (id) => {
    id = id || '';
    return await axios.get(`${categoriesUrl}/${id}`);
}

export const addCategory = async (category, atoken) => {
    return await axios.post(`${categoriesUrl}`, category, { headers: { token: atoken } });
}

export const deleteCategory = async (id, atoken) => {
    return await axios.delete(`${categoriesUrl}/${id}`, { headers: { token: atoken } });
}

export const editCategory = async (id, category, atoken) => {
    return await axios.put(`${categoriesUrl}/${id}`, category, { headers: { token: atoken } });
}

