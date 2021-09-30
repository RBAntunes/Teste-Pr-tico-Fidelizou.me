import axios from 'axios';
import Beer from './Beer';

const address = 'http://localhost:8080'

export default class BeerAPI {
    async getAllData() {
        const response = await axios.get( `${address}/` );
        return response.data.map( beer => new Beer( beer ) );
    }

    async getRandomData() {
        const response = await axios.get( `${address}/random/247` );
        return response;
    }
}