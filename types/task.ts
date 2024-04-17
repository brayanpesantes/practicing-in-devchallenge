import { Status } from "@/app/task-board/components/TaskForm";

export interface Task {
    id: number;
    title: string;
    description?: string;
    icon:string
    type: Status.COMPLETED|Status.DEFAULT|Status.IN_PROGRESS|Status.WONT_DO
}