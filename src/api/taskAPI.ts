import axios from "./axiosInstance";
import { Task } from "../types/boardTypes";

export const fetchTasks = async (boardId: string): Promise<Task[]> => {
    const response = await axios.get(`/boards/${boardId}/tasks`);
    return response.data;
};

export const createTask = async (columnId: string, data: Partial<Task>) => {
    return axios.post(`/columns/${columnId}/tasks`, data);
};

export const updateTaskPosition = async (
    taskId: string,
    destinationColumnId: string,
    position: number
)=> {
    return axios.put(`/tasks/${taskId}/move`, {
        columnId: destinationColumnId,
        position,
    });
};

