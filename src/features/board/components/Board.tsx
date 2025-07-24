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


    }
}