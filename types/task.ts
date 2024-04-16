export interface Task {
    id: number;
    title: string;
    description?: string;
    icon:string
    type: 'completed'| 'in-progress'|'not-started'|'default';
}