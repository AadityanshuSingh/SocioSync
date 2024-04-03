import axios from "axios";

export const axiosInstance = axios.create({});

export const apiConnector = (method, url, bodyData, file, headers, params) => {
  // console.log("connect waala data", bodyData);
  const formData = new FormData();
  if (file) {
    formData.append("file", file);

    for (const key in bodyData) {
      if (bodyData.hasOwnProperty(key)) {
        formData.append(key, bodyData[key]);
      }
    }
  }

  console.log("api me", bodyData);
  return axiosInstance({
    method: method,
    url: url,
    data: file ? formData : bodyData ? bodyData : null,
    headers: headers ? headers : null,
    params: params ? params : null,
  });
};
