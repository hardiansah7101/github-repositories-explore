import axios from "axios";
import { BASE_URL } from "../constants/url";

const githubToken = import.meta.env.VITE_GITHUB_TOKEN ?? null

const headers = githubToken ? {
    Authorization: `Bearer ${githubToken}`
} : {}

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers
})

export {
    axiosInstance
}