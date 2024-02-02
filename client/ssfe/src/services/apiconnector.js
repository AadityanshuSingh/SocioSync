import axios from "axios"

export const axiosInstance = axios.create({});

export const apiConnector = (method, url, bodyData, headers, params) => {
    console.log("connect waala data", bodyData);
    return axiosInstance({
        method:method,
        url:JSON.stringify(url),
        data: bodyData,
    });
}