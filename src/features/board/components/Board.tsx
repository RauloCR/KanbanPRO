import React, {useEffect, useState} from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { Column as ColumnComponent } from "./Column";
import { BoardData } from "../../../types/boardTypes";
import { getBoardData } from "../../../api/boardAPI"


export const Board = () => {
    const [boardData, setBoardData] = useState<BoardData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getBoardData();
                setBoardData(data);
            } catch (error) {
                console.error("Error al obtener datos del board:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData()
    }, []);

    const onDragEnd = (result: DropResult) => {
        if (!boardData) return;

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

            const newColumn = {...start, taskIds: newTaskIds};
            setBoardData((prev) => prev ? {
                ...prev,
                columns: {
                    ...prev.columns,
                    [newColumn.id]: newColumn,
                },
            } : null);
        }

        // Moving to another column
        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart = { ...start, taskIds: startTaskIds };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = { ...finish, taskIds: finishTaskIds };

        setBoardData((prev) => prev ? {
            ...prev,
            columns: {
                ...prev.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            },
        } : null );
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex gap-4 p-6">
                {boardData && boardData.columnOrder.map((columnId) => {
                    const column = boardData.columns[columnId];
                    const tasks = column.taskIds.map((taskId) => boardData.tasks[taskId]);
                    return <ColumnComponent key={column.id} column={column} tasks={tasks} />;
                })}
            </div>
        </DragDropContext>
    );
};