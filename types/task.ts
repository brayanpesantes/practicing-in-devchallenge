export interface Task {
  id: number;
  title: string;
  description?: string;
  icon: string;
  status:
    | Status.COMPLETED
    | Status.DEFAULT
    | Status.IN_PROGRESS
    | Status.WONT_DO;
}
export enum Status {
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  WONT_DO = "WONT_DO",
  DEFAULT = "DEFAULT",
}
