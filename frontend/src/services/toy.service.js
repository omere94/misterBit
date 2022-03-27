import axios from 'axios';
import { httpService } from './http.service';

axios.defaults.withCredentials = true

export const toyService = {
    query,
    getById,
    remove,
    save,
    getEmptyToy
};

async function query(filterBy) {
    return await httpService.get('toy', filterBy)
}

async function getById(toyId) {
    return await httpService.get(`toy/${toyId}`)
}

async function remove(toyId) {
    return await httpService.delete(`toy/${toyId}`)
}

async function save(toy) {
    if (toy._id) {
        return await httpService.put(`toy/${toy._id}`, toy)
    } 
    else {
        return await httpService.post('toy', toy)
    }
}

function getEmptyToy() {
    return {
        name: '',
        price: 0,
        inStock: true,
        labels: [],
        url: ''
    };
}