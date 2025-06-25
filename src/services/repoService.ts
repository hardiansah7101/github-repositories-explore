import axios from "axios"
import { BASE_URL } from "../constants/url"

const repoService = {

    getListUser: async (username: string) => {
        try {
            const response = await axios.get(`${BASE_URL}/users${username !== '' ? `/${username}` : ''}`)
            return {
                success: true,
                data: response.data
            }
        } catch (error) {
            return {
                success: false,
                message: 'Unable to procceed'
            }
        }
    },

    getListRepo: async (username: string) => {
        try {
            const response = await axios.get(`${BASE_URL}/users/${username}/repos`)
            return {
                success: true,
                data: response.data
            }
        } catch (error) {
            return {
                success: false,
                message: 'Unable to procceed'
            }
        }
    },


}

export default repoService