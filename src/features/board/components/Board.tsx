import React, { useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { initialData, BoardData } from "../mockData";
import { Column } from "./Column";

export const Board = () => {
    const [boardData, setBoardData] = useState<BoardData>(initialData);

    const onDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        )
            return;

        const start = boardData.columns[source.droppableId];
        const finish = boardData.columns[destination.droppableId];

        if (start === finish ) {
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = { ...start, taskIds: newTaskIds };
            setBoardData((prev) => ({
                ...prev,
                columns: {
                    ...prev.columns,
                    [newColumn.id]: newColumn,
                },
            }));
            return;
        }

        // Moving to another column
        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart = { ...start, taskIds: startTaskIds };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = { ...finish, taskIds: finishTaskIds };

        setBoardData((prev) => ({
            ...prev,
            columns: {
                ...prev.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            },
        }));
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex gap-4 p-6">
                {boardData.columnOrder.map((columnId) => {
                    const column = boardData.columns[columnId];
                    const tasks = column.taskIds.map((taskId) => boardData.tasks[taskId]);
                    return <Column key={column.id} column={column} tasks={tasks} />;
                })}
            </div>
        </DragDropContext>
    );
};