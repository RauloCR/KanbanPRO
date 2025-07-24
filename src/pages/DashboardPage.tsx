import React from "react";
import { Board } from "../features/board/components/Board";

export const DashboardPage = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
            <h1 className="text-x1 font-bold px-6 pt-6">Mi Tablero Kanban</h1>
            <Board />
        </div>
    );
};

export default DashboardPage;