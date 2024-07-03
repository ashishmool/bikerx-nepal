import axios from "axios";

export const getTours = async () => {
    try {
        const response = await axios.get("http://13.48.249.115:8080/tour/getAll");
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch tours");
    }
};
