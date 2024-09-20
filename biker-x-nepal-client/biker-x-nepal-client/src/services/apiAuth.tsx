import axios from "axios";
import { ILogin } from "../moduls";

axios.defaults.baseURL = "http://localhost:8080";

export const login = async ({ loginEmail, loginPassword }: ILogin) => {
    try {
        const response = await axios.post("/authenticate", {
            email: loginEmail,
            password: loginPassword,
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};
