import axios from 'axios'
const BASE = 'https://api.npoint.io'
const helpers = {
    helper1: async function () {
        const promise = axios.get(`${BASE}/68cb83657d7616957c3f`)

        // using .then, create a new promise which extracts the data
        const dataPromise = promise.then((response) => response.data)

        // return it
        return dataPromise

    },
    helper2: async function () {

        const promise = axios.get(`${BASE}/968ab3964e88978f2d51`)
        // using .then, create a new promise which extracts the data
        const dataPromise = promise.then((response) => response.data)

        // return it
        return dataPromise
    }
}
export default helpers;
