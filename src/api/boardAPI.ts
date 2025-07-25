import axios from "axios";
import { BoardData } from "../types/boardTypes";

const API_URL = "http://localhost:8000/api/board";

export const getBoardData = async (): Promise<BoardData> => {
    const response = await axios.get(API_URL);
    return response.data;
};