export interface Task {
    id: string;
    title: string;
    description?: string;
}

export interface Column {
    id: string;
    title: string;
    taskIds: string[];
}

export interface BoardData {
    tasks: Record<string, Task>;
    columns: Record<string, Column>;
    columnOrder: string[];
}

// DATOS DE PRUEBA

export const initialData: BoardData = {
    tasks: {
        'task-1': { id: 'task-1', title: 'Configurar proyecto', description: 'Inicializar estructura React' },
        'task-2': { id: 'task-2', title: 'Diseñar wireframe', description: 'Diseño visual del dashboard' },
        'task-3': { id: 'task-3', title: 'Instalar librerías' },
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'Por hacer',
            taskIds: ['task-1', 'task-2'],
        },
        'column-2': {
            id: 'column-2',
            title: 'En progreso',
            taskIds: ['task-3'],
        },
        'column-3': {
            id: 'column-3',
            title: 'Hecho',
            taskIds: [],
        },
    },
    columnOrder: ['column-1', 'column-2', 'column-3'],
};
