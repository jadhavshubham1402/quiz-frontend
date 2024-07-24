import Axios from "./axios";

export const login = (data) => {
    return Axios.post("/api/login", data);
};

export const register = (data) => {
    return Axios.post("/api/register", data);
};

export const getAllTopic = (data) => {
    return Axios.post("/api/getAllTopic", data);
};