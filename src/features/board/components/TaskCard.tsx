import React from "react";
import { Draggable } from "@hello-pangea/dnd";

interface Props {
    task: {
        id: string;
        title: string;
    };
    index: number;
}

export const TaskCard = ({ task, index }: Props) => {
    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided) => (
                <div
                    className="bg-white p-3 mb-2 rounded shadow"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <p className="text-sm font-medium">{task.title}</p>
                </div>
            )}
        </Draggable>
    );
};