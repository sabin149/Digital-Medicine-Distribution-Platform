import axios from 'axios'

export const API=axios.create({
    baseURL:"https://backend-emedicine-platform.herokuapp.com"
})