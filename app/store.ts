import {create} from 'zustand';

type TasksState = {
    tasks: string[];
    addTask: (task: string) => void;
    removeTask: (task: string) => void;
}

export const useTasksStore = create<TasksState>((set) => ({
    tasks: [],
    addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
    removeTask: (task) => set((state) => ({ tasks: state.tasks.filter(t => t !== task) }))
}));