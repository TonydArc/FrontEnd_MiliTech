/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-catch */
import axios from 'axios';
import { getAccessToken } from './untils';

const API_URL = 'http://127.0.0.1:8000/api/';

//products
export async function getProducts() {
    // eslint-disable-next-line no-useless-catch
    try {
        const products = await axios.get(API_URL + `products`)
        return products.data;
    } catch (error) {
        throw error;
    }
}
export async function getProductsDetail(id: number) {
    // eslint-disable-next-line no-useless-catch
    try {
        const products = await axios.get(API_URL + `products/` + id)
        return products.data;
    } catch (error) {
        throw error;
    }
}


export async function createOrder(formdata: {
    'CustomerId': number,
    'OrderDate': any,
    'StatusId': number,
    'TotalAmount': number,
    'OrderDetails': {
        'ProductId': number,
        'Quantity': number,
        'Price': number,
        'MethodId': number,
        'Address': string
    }[]
}) {
    const token = getAccessToken();
    try {
        const response = await axios.post(API_URL + `order`, formdata, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function getOrder(id :number) {
    const token = getAccessToken();
    try {
        const response = await axios.get(API_URL + `orders/user/` + id, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function getCatalog() {
    try {
        const response = await axios.get(API_URL + `catalog`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function getProductsByCatalog(catalog :string) {
    try {
        const response = await axios.get(API_URL + `products/catalog/` + catalog);
        return response.data;
    } catch (error) {
        throw error;
    }
}
