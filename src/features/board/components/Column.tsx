import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import { TaskCard } from "./TaskCard";
import { Task } from "../mockData";

interface Props {
    column: {
        id: string;
        title: string;
        taskIds: string[];
    };
    tasks: Task[];
}

export const Column = ({ column, tasks }: Props) => {
    return (
        <div className="bg-gray-100 rounded p-4 w-72">
            <h3 className="font-semibold mb-2">{column.title}</h3>
            <Droppable droppableId={column.id}>
                {(provided) => (
                    <div
                        className="min-h-[100px]"
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
        </div>
    );
};
