import React, { useState } from "react";
import { Droppable } from "@hello-pangea/dnd";
import { TaskCard } from "./TaskCard";
import { Task } from "../../../types/boardTypes";
import { createTask } from "../../../api/taskAPI";

interface Props {
    column: {
        id: string;
        title: string;
        taskIds: string[];
    };
    tasks: Task[];
    onTaskCreated: (task: Task, columnId: string) => void;
}

export const Column = ({ column, tasks, onTaskCreated }: Props) => {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTaskTitle.trim()) return;

        try {
            setLoading(true);
            const task = await createTask(column.id, newTaskTitle.trim());
            onTaskCreated(task, column.id);
            setNewTaskTitle("");
        } catch (error) {
            console.error("Error creating task:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-100 rounded p-4 w-72 flex flex-col">
            <h3 className="font-semibold mb-2">{column.title}</h3>

            <Droppable droppableId={column.id}>
                {(provided) => (
                    <div
                        className="min-h-[100px] flex flex-col gap-2"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {tasks.map((task, index) => (
                            <TaskCard key={task.id} task={task} index={index} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

            <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
                <input
                    type="text"
                    className="flex-grow px-2 py-1 border rounded"
                    placeholder="Nueva tarea"
                    value={newTaskTitle}
                    onChange={(e) =>
                        setNewTaskTitle((e.target as HTMLInputElement).value)}
                    disabled={loading}
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 disabled:opacity-50"
                    disabled={loading}
                >
                    +
                </button>
            </form>
        </div>
    );
};
