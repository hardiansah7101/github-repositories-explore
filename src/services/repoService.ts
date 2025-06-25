/* eslint-disable @typescript-eslint/no-unused-vars */
import { axiosInstance } from "../helpers/request"

const repoService = {

    getListUser: async (username: string) => {
        try {
            const endpoint = `/search/users?q=${username}`
            const response = await axiosInstance.get(endpoint)
            return {
                success: true,
                data: response.data?.items ?? response.data
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
            const response = await axiosInstance.get(`/users/${username}/repos`)
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